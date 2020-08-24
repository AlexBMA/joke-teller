'use strict';

import { apikey } from './config.js';

import {voiceRSS} from './utils/voice.js'

// VoiceRSS Javascript SDK

const VoiceRSS = voiceRSS;
const APIKEY = apikey;

const button = document.getElementById('button');
const audioElement = document.getElementById('audioElement');

const apiUrl =
  'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single';

async function getJokes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const joke = data.joke;
    button.hidden = true;

    VoiceRSS.speech({
      key: APIKEY,
      src: joke,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    });
  } catch (error) {
    console.log('Whoops', error);
  }
}


function toogleButton(){
    button.hidden = false;
}

button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toogleButton);

