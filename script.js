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
    buttonSayTheInput.hidden = true;
    button.hidden = true;
    inputText.hidden = true;

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
  buttonSayTheInput.hidden = false;
  inputText.hidden = false;
}

function sayTheTextButton() {
  const text = inputText.value;
  if (text !== null && text.trim().length > 0) {
    sayTheText(text);
    buttonSayTheInput.hidden = true;
    button.hidden = true;
    inputText.hidden = true;
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toogleButton);
buttonSayTheInput.addEventListener('click',sayTheTextButton);
