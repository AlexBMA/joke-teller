'use strict';

import { apikey, jokesApiURL } from './config.js';
import { voiceRSS } from './utils/voice.js';

const VoiceRSS = voiceRSS;
const APIKEY = apikey;

const button = document.getElementById('button');
const audioElement = document.getElementById('audioElement');
const buttonSayTheInput = document.getElementById('sayText');
const inputText = document.getElementById('textInput');

const apiUrl = jokesApiURL;

async function getJokes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const joke = data.joke;
    button.hidden = true;

    sayTheText(joke);
  } catch (error) {
    console.log('Whoops', error);
  }
}

function sayTheText(text) {
    VoiceRSS.speech({
        key: APIKEY,
        src: text,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

function toogleButton() {
  button.hidden = false;
}

function sayTheTextButton() {
  const text = inputText.value;
  if (text !== null && text.trim().length > 0) {
    sayTheText(text);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toogleButton);
buttonSayTheInput.addEventListener('click',sayTheTextButton);
