import * as buffer from 'buffer';
import process from './process-es6';

window.global = window;
window.Buffer = buffer.Buffer;
window.process = process;