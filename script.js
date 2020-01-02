import * as sorting from './scripts/sorting.js';
import {swap} from './scripts/util.js';

// constants
const startTime = 50;
const audioLength = 100;
const height = 700;
const width = 700;
const colors = {    
    "comp": "red",
    "normal": "pink",
    "clear": "white",
    "placed": "purple",
    "swap": "red",
    "rep": "pink"
};

const arraySize = 100;
const minVal = 5;
const maxVal = height - minVal;
const gap = 2;
const barWidth = (width -  (gap) * (arraySize +1 ))/arraySize;
const animTime = 10;



// Canvas Setup

const canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

// array setup

function generateRandomValues(maxVal, minVal)
{
    return Math.floor(Math.random() * ( maxVal - minVal + 1)) + minVal;
}

function generateRandomArray(arraySize)
{

    var array = [];

    for(var i = 0; i < arraySize ; i++ )
    {
        array.push(generateRandomValues(maxVal, minVal));
    }

    return array;
}


// the animation array and array

var array = generateRandomArray(arraySize);
var copyArray = [...array];
var animList = [];
sorting.mergeSort(animList, copyArray, arraySize);


function getSoundSrc(a, b){
    let diff = Math.abs(a-b);

    let maxDiff = maxVal - minVal;

    let ans = Math.ceil((diff/maxDiff) * (2000 - 300) + 300);

    ans = Math.ceil(ans/100)*100;

    let src = ans+".wav";
    return src;

}

//  the draw methods

function drawSlab(pos, height, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(gap*(pos+1) + barWidth*pos, 0, barWidth, height);
    ctx.fill();
}

function drawRectangles()
{
    for(var i = 0; i < arraySize; i++)
    {   
        drawSlab(i, array[i], colors["normal"]);
    }
}

function clearScreen()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawBars(i, type)
{
    drawSlab(animList[i].a, array[animList[i].a], colors[type]);
    drawSlab(animList[i].b, array[animList[i].b], colors[type]);
}

function animate(animList)
{   
    console.log(animList);
    for(let i = 0; i < animList.length; i++)
    {
        setTimeout( function timer(){

            clearScreen();
            drawRectangles();

            if(animList[i].type=="comp")
            {   
                drawBars(i, "comp");
            }
            else if(animList[i].type=="rep")
            {
                drawBars(animList[i].a,"clear");
                array[animList[i].a] = animList[i].b;
                drawBars(animList[i].a,"rep");
            }
            else
            {   
                drawBars(i,"clear");
                [array[animList[i].a], array[animList[i].b]] = swap(array[animList[i].a], array[animList[i].b]);
                drawBars(i, "swap");

            }

            

            if(i==animList.length-1){
                clearScreen();
                drawRectangles();
                console.log(array);
            }

        },1000 + i*animTime);

        

    }
}

animate(animList);


/* TODO:
0. Change the anim class
1. Make the selection buttons
2. Add sound
3. Check merge sort for stray animation
*/