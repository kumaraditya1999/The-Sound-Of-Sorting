import * as sorting from './scripts/sorting.js';
import {swap, generateRandomArray, shuffleArray} from './scripts/util.js';

// constants
const height = 800;
const width = 800;
const colors = {    
    "comp": "red",
    "normal": "pink",
    "clear": "white",
    "placed": "purple",
    "swap": "red",
    "rep": "pink"
};


const minVal = 5;
const maxVal = height - minVal;
const maxDiff = maxVal - minVal;
const gap = 2;
const minFreq = 440;
const maxFreq = 15000;

// variables
var arraySize;
var barWidth;
var animTime;


// Canvas Setup

const canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

// dom elements

const sizeBar = $("#size");
const speedBar = $("#speed");
const startButton = $("#start");
const generateButton = $("#generate");
const stopButton = $("#stop");
const shuffle = $("#shuffle");

// the array setup

var array = [];
var copyArray = [...array];
var animList = [];

// the audio setup
var audioCtx;
var osc;
var timeoutList = [];

function getFrequency(diff){

    return Math.floor((diff/Math.pow(2*maxDiff,1)) * (maxFreq - minFreq)) + minFreq;
    
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
    if(type=="rep")
    {
        drawSlab(animList[i].fi,animList[i].si,colors[type]);

    }else{
        drawSlab(animList[i].fi, array[animList[i].fi], colors[type]);
        drawSlab(animList[i].si, array[animList[i].si], colors[type]);
    }
    
}

function clearBars(i)
{
    if(animList[i].type=="rep")
    {
        drawSlab(animList[i].fi, array[animList[i].fi], colors["clear"]);
    }else{
        drawSlab(animList[i].fi, array[animList[i].fi], colors["clear"]);
        drawSlab(animList[i].si, array[animList[i].si], colors["clear"]);
    }
}

function animate(animList,osc,audioCtx)
{   
    console.log(animList);
    for(let i = 0; i < animList.length; i++)
    {
        let myVar = setTimeout( function timer(){

            clearScreen();
            drawRectangles();

            if(animList[i].type=="comp")
            {   
                drawBars(i, "comp");
            }
            else if(animList[i].type=="rep")
            {
                clearBars(i);
                array[animList[i].fi] = animList[i].si;
                drawBars(i,"rep");
            }
            else
            {   
                clearBars(i);
                [array[animList[i].fi], array[animList[i].si]] = swap(array[animList[i].fi], array[animList[i].si]);
                drawBars(i, "swap");

            }


            osc.frequency.setValueAtTime(getFrequency( Math.pow(array[animList[i].fi] + animList[i].diff,1) ),(i)*animTime/1000);

            if(i==animList.length-1){
                clearScreen();
                drawRectangles();
                animList = [];
            }

        },i*animTime);

        timeoutList.push(myVar);

    }
}

function init()
{   
    arraySize = Number(sizeBar[0].value);
    barWidth = (width -  (gap)* (arraySize +1 ))/arraySize;
    animTime = Number(speedBar[0].max) - Number(speedBar[0].value) + Number(speedBar[0].min);

    clearScreen();
    array = [];
    generateRandomArray(array, arraySize, minVal, maxVal);
    copyArray = [...array];
    animList = [];
    drawRectangles();
}

function start(){

    animList = [];

    let cntr = 1;

    let choice = $("#algorithmMenu")[0].value;
    switch(choice) {
        case "Insertion Sort":
            console.log("Insertion Sort");
            sorting.insertionSort(animList, copyArray, arraySize);            
            break;
        case "Selection Sort":
            console.log("Selection Sort");
            sorting.selectionSort(animList, copyArray, arraySize);
            break;
        case "Bubble Sort":
            console.log("Bubble Sort");
            sorting.bubbleSort(animList, copyArray, arraySize);
            break;
        case "Merge Sort":
            console.log("Merge Sort");
            sorting.mergeSort(animList, copyArray, arraySize);
            break;
        case "Quick Sort":
            console.log("Quick Sort");
            sorting.quickSort(animList, copyArray, arraySize);
            break;
        case "Heap Sort":
            console.log("Heap Sort");
            sorting.heapSort(animList, copyArray, arraySize);
            break;
        default:
            alert("Please Choose an Algorithm!!!");
        
    }

    if(cntr)
    {
        // start audio
        audioCtx = new AudioContext(); 
        osc = audioCtx.createOscillator();
        osc.start();
        osc.connect(audioCtx.destination);

        // start animation
        animate(animList,osc,audioCtx);

        // stop sudio
        osc.stop(animTime*animList.length/1000);
    }
        
}

generateButton.click(function(){
    init();
});

startButton.click(function(){
    start();
});

sizeBar.on('input',function(){
    init();
});

speedBar.on('input', function(){
    animTime = Number(speedBar[0].max) - Number(speedBar[0].value) + Number(speedBar[0].min);
});

stopButton.click(function(){
    for(var i = 0; i < timeoutList.length; i++)
    {
        clearTimeout(timeoutList[i]);
    }
    timeoutList = [];
    osc.stop();
    copyArray = [...array];
});

shuffle.click(function(){
    shuffleArray(array,arraySize);
    clearScreen();
    drawRectangles();
    copyArray = [...array];
});

init();



/* TODO:
0. Change the anim class
1. Make the selection buttons
3. Check merge sort for stray animation
4. Completed marker
*/