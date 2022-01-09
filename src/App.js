import { useState } from 'react';
import React from 'react-router-dom';

// import { LCDClient, Coin } from '@terra-money/terra.js';
// import { common } from 'protobufjs';

import './App.scss';

function App() {
  const [query, setQuery] = useState({ address: "" });

  // const terra = new LCDClient({
  //   URL: 'https://bombay-lcd.terra.dev',
  //   chainID: 'bombay-12',
  // });

  // const terra = new LCDClient({
  //   URL: 'http://localhost:1317',
  //   chainID: 'localterra'
  // });

  // const offerCoin = new Coin('uusd', '1000000');
  // terra.market.swapRate(offerCoin, 'ukrw').then(c => {
  //   console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
  // });

  const onQueryChange = e => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  const onQuerySubmit = e => {
    setQuery({ ...query, [e.target.name]: "" });
  }

  return (
    <div id='app'>
      <form onSubmit={ onQuerySubmit }>
        <input
          name='address'
          value={ query.address }
          onChange={ onQueryChange }
          placeholder='address'
          spellCheck='false'
          autoComplete='off'
        />
      </form>
    </div>
  )
}

export default App;

/*
  Theme:
    Bluish: #20232A
    Dark Bluish: #0D1117
    Dark Gray: #181A1B
    Near Black: #0D0D0D
*/