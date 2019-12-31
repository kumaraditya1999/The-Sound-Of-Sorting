import * as sorting from './scripts/sorting.js.js';
import {swap} from './scripts/util.js.js';

// Canvas Setup

const canvas = document.getElementById("canvas");
const height = 700;
const width = 700;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

const colors = {
    "swap": "red",
    "normal": "pink",
    "comp": "black",
    "clear": "white"
};


var arraySize = 100;
const minVal = 5;
const maxValue = height - minVal;

function generateRandomValues(maxVal, minVal)
{
    return Math.floor(Math.random() * ( maxVal - minVal + 1)) + minVal;
}

function generateRandomArray(arraySize){

    var array = [];

    for(var i = 0; i < arraySize ; i++ )
    {
        array.push(generateRandomValues(maxValue, minVal));
    }

    return array;
}



var array = generateRandomArray(arraySize);
var copyArray = [...array];
var animList = sorting.bubbleSort(copyArray, arraySize);

console.log(array);
console.log(animList);

var gap = 2;
var barWidth = (width -  (gap) * (arraySize +1 ))/arraySize;
console.log(barWidth, gap);


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

drawRectangles();

function animate(animList)
{   
    console.log(animList);
    for(let i = 0; i < animList.length; i++)
    {
        setTimeout( function timer(){

            ctx.clearRect(0,0,canvas.width, canvas.height);
            drawRectangles();
            console.log(animList, i, animList[i]);
            
            if(animList[i].type=="comp")
            {   
                drawSlab(animList[i].a, array[animList[i].a], colors["comp"]);
                drawSlab(animList[i].b, array[animList[i].b], colors["comp"]);

            }else{
                drawSlab(animList[i].a, array[animList[i].a], colors["clear"]);
                drawSlab(animList[i].b, array[animList[i].b], colors["clear"]);
                [array[animList[i].a], array[animList[i].b]] = swap(array[animList[i].a], array[animList[i].b]);
                drawSlab(animList[i].a, array[animList[i].a], colors["swap"]);
                drawSlab(animList[i].b, array[animList[i].b], colors["swap"]);
            }

        },i*10);

    }
}

animate(animList);
