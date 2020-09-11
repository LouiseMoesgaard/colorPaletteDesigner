"use strict";

window.addEventListener("DOMContentLoaded", initColorPicker)


function initColorPicker(){
    document.querySelector("#colorPicker").addEventListener("input", event => {

        modelController(event.target.value); // dette er vores hex-værdi
    });
}

function modelController(hex) { 
    let rgb = hexToRgb(hex);
    let hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    getColorArray(getHarmony(hsl));
}

function hexToRgb(hex) {
    let r = hex.substring(1, 3);
    let g = hex.substring(3, 5);
    let b = hex.substring(5, 7);

    r = Number.parseInt(r, 16);
    g = Number.parseInt(g, 16);
    b = Number.parseInt(b, 16);
    
    return {r, g, b};
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

    h = parseInt(h);
    l = parseInt(l);
    s = parseInt(s);
  
    return {h, s, l};
}

function getHarmony(hsl) {
    let select = document.querySelector("select");
    let selectedValue = select.options[select.selectedIndex].value;

    let hslArray; 

    switch(selectedValue){
      case 'analogous':
       hslArray = getAnalogue(hsl);
      break;

      case 'monochromatic':
        hslArray = getMonochromatic(hsl);
      break;

      case 'triad':
        hslArray = getTriad(hsl);
      break;

      case 'complementary':
        hslArray = getComplementary(hsl);
      break;

      case 'compound':
        hslArray = getCompound(hsl);
      break;

      case 'shades':
        hslArray = getShades(hsl);
      break;
    }

    return hslArray;

}

function getAnalogue(hsl) {

  let hslArray = new Array(5);
  hslArray[2] = hsl;

  hslArray[0] = {h: hsl.h - 40, s: hsl.s, l: hsl.l};
  hslArray[1] = {h: hsl.h - 20, s: hsl.s, l: hsl.l};
  hslArray[3] = {h: hsl.h + 20, s: hsl.s, l: hsl.l};
  hslArray[4] = {h: hsl.h + 40, s: hsl.s, l: hsl.l};

  return hslArray;

}
// function getMonochromatic(hsl) {
// }

// function getTriad(hsl) {
// }

// function getComplementary(hsl) {
// }

// function getCompound(hsl) {
// }

// function getShades(hsl) {
// }


function getColorArray(hslArray) {

  let colorArray = hslArray.map(hsl => {
    let rgb = hslToRgb(h, s, l);
    let hex = rgbToHex(rgb);
    
    return {hsl, hex, rgb};
  });

  console.log(colorArray);

  
}


function hslToRgb(h, s, l) {

    h = h;
    s = s / 100;
    l = l / 100;
    
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {r, g, b};
}


function rgbToHex(rgb) {

    let hex1 = rgb.r.toString(16).length == 1 ? "0" + rgb.r.toString(16): rgb.r.toString(16);
    let hex2 = rgb.g.toString(16).length == 1 ? "0" + rgb.g.toString(16): rgb.g.toString(16);
    let hex3 = rgb.b.toString(16).length == 1 ? "0" + rgb.b.toString(16): rgb.b.toString(16);;


    return "#" + hex1 + hex2 + hex3;
}


function viewController(array) {
}

function showColorCodes(){
}

function showBackgroundColor(hex) {
  document.querySelector(".color").style.backgroundColor = hex;
}

