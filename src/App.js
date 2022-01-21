import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LCDClient } from '@terra-money/terra.js';

import './App.scss';

const defaultQuery = { address: 'terra183lxcc3gca9gmpt538muelexh7whm982y7y7pq' };
const defaultError = '';

function App() {
  const [query, setQuery] = useState(defaultQuery);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(defaultError);

  const terra = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12',
  });

  const onQueryChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  const onQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      setError(defaultError);
      if (await terra.auth.accountInfo(query.address) == null) {
        throw new Error("address not valid");
      }

      let balance = await terra.bank.balance(query.address);
      balance = balance[0]._coins;

      // reset coin state in case a new address is being submitted
      setCoins([]);
      let temp_coins = [];

      Object.entries(balance).forEach(coin => {
        coin = coin[1];
        // to get non-micro version -> multiply string amount by -> 10 ** (-6)
        // need to set state all at once to prevent an override loop (unconventional i know)
        let denom = [coin.denom];
        let count = coin.amount.toString();
        temp_coins[denom] = count;
      });

      temp_coins = Object.entries(temp_coins).map(coin => {
        coin[1] = coin[1] * 10 ** (-6); // convert to non-micro coin equivalent

        switch (coin[0]) {
          case 'ukrw': coin[0] = 'KRW'; break;
          case 'uluna': coin[0] = 'LUNA'; break;
          case 'usdr': coin[0] = 'SDR'; break;
          case 'uusd': coin[0] = 'UST'; break;
          default: coin[0] = 'UNKNOWN COIN';
        }

        return { [coin[0]]: coin[1] };
      });

      // for verifying authenticity
      console.log(temp_coins);

      setCoins(temp_coins);
      setQuery(defaultQuery);
    } catch {
      setCoins([]);
      setError('Could not complete request; is the address correct?');
    }
  }

  return (
    <div id='app'>
      <form id='form' onSubmit={ onQuerySubmit }>
        <input
          name='address'
          value={ query.address }
          onChange={ onQueryChange }
          placeholder='address'
          spellCheck='false'
          autoComplete='off'
        />
      </form>
      <div id='error'>{ error }</div>
      <main>
        {
          coins.map(coin => {
            return (
              <div className='coin' key={ Object.keys(coin)[0] }>
                <div className='denom'>{ Object.keys(coin)[0] }</div>
                <div className='count'>{ Object.values(coin)[0].toFixed(3) }</div>
              </div>
            )
          })
        }
      </main>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
document.getElementById('root')
);

/*
  Theme:
    Bluish: #20232A
    Dark Bluish: #0D1117
    Dark Gray: #181A1B
    Near Black: #0D0D0D
*/