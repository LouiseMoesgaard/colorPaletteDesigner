"use strict";

window.addEventListener("DOMContentLoaded", initColorPicker)


function initColorPicker(){
    document.querySelector("#colorPicker").addEventListener("input", event => {
        console.log(event.target.value);

        hexDelegator(event.target.value); // dette er vores hex-værdi
    });
}

function hexDelegator(hex) { 
    showColor(hex);
    showHex(hex);
    hexToRgb(hex);
}

function showColor(hex) {
    document.querySelector(".color").style.backgroundColor = hex;
}

function showHex(hex) {
    document.querySelector(".HEX span").innerHTML = hex;
}

function hexToRgb(hex) {
    let r = hex.substring(1, 3);
    let g = hex.substring(3, 5);
    let b = hex.substring(5, 7);

    r = Number.parseInt(r, 16);
    g = Number.parseInt(g, 16);
    b = Number.parseInt(b, 16);
    
    rgbDelegator(r, g, b);
}

function rgbDelegator(r, g, b){
    showRgb(r, g, b);
    rgbToHsl(r, g, b);
}

function showRgb(r, g, b) {
    document.querySelector(".RGB span").innerHTML = r + ", " + g + ", " + b;
}

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;
  
    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
   
    if( max === min ) {
      h = 0;
    } else
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
      h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
      h = 60 * (4 + (r - g) / (max - min) );
    }
   
    if (h < 0) {h = h + 360; }
   
    l = (min + max) / 2;
   
    if (max === 0 || min === 1 ) {
      s = 0;
    } else {
      s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    //Tomas måde at fjerne komma-tal
    h = parseInt(h);
    l = parseInt(l);
    s = parseInt(s);
  
    showHsl(h, s, l);
}

function showHsl(h, s, l) {
    document.querySelector(".HSL span").innerHTML = `hsl(%${h}, %${s}, %${l})`;
}