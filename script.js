import * as sorting from './scripts/sorting.js';
import {swap, generateRandomArray, shuffleArray, makePowerOf2, check} from './scripts/util.js';

// constants
const width = Math.ceil(window.innerWidth * .80);
const height = Math.floor(Math.min(window.innerHeight * .80,width));
const colors = {    
    "comp": "red",
    "normal": "pink",
    "clear": "white",
    "placed": "purple",
    "swap": "red",
    "rep": "violet"
};


const minVal = 5;
const maxVal = height - minVal;
const maxDiff = maxVal - minVal;
var gap = 1;
const minFreq = 440;
const maxFreq = 15000;

// variables
var arraySize;
var barWidth;
var animTime;
var offset;


// Canvas Setup

const canvas = document.getElementById("canvas");
canvas.width = width+10;
canvas.height = height+10;
const ctx = canvas.getContext('2d');
const borderWidth = 2;

// dom elements

const sizeBar = $("#size");
const speedBar = $("#speed");
const startButton = $("#start");
const generateButton = $("#generate");
const stopButton = $("#stop");
const shuffle = $("#shuffle");
const menu = $("#algorithmMenu");
const error = $("#error-text");
const oscillator = $("#oscillator");
const noOfElements = $("#noOfElements");
const speedOfAnimation = $("#speedOfAnimation");
const bitonicText = $("#bitonicText");

// the array setup

var array = [];
var copyArray = [...array];
var animList = [];
var placed = [];

// the audio setup
var audioCtx;
var osc;
var timeoutList = [];

function getFrequency(diff){

    return Math.floor((diff/maxDiff) * (maxFreq - minFreq)) + minFreq;
    
}

//  the draw methods

function drawSlab(pos, height, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(offset + gap + gap*(pos+1) + barWidth*pos, borderWidth, barWidth, height);
    ctx.fill();
}

function drawBorders()
{
    ctx.fillStyle = "black";
    // horizontal up
    ctx.beginPath();
    ctx.rect(offset - gap , 0, width - 2*offset + 6*gap, borderWidth);
    ctx.fill();

    // horizontal down
    ctx.beginPath();
    ctx.rect(offset - gap , height-borderWidth, width - 2*offset + 6*gap, borderWidth);
    ctx.fill();

    // vertical left
    ctx.beginPath();
    ctx.rect(offset - gap , 0, borderWidth, height - borderWidth);
    ctx.fill();

    // vertical right
    ctx.beginPath();
    ctx.rect(width - offset + 3*gap , 0, borderWidth, height - borderWidth);
    ctx.fill();


}

function drawRectangles()
{
    for(var i = 0; i < arraySize; i++)
    {   
        if(!placed[i])
            drawSlab(i, array[i], colors["normal"]);
        else
            drawSlab(i, array[i], colors["placed"]);
    }

    drawBorders();
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

function animate(animList,osc)
{   
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

            if(animList[i].pl!=undefined)
            {   
                placed[animList[i].pl] = 1;
            }

            osc.frequency.setValueAtTime(getFrequency( animList[i].diff ),(i)*animTime/1000);

            if(i==animList.length-1){
                clearScreen();
                drawRectangles();
                enableButtons();
                animList = [];
            }

        },i*animTime);

        timeoutList.push(myVar);

    }
}

function recalcuate()
{
    arraySize = array.length;
    barWidth = Math.floor((width -  (gap)* (arraySize +1 ))/arraySize);
    offset  = Math.round((width -  barWidth*arraySize - gap*(arraySize-1))/2);

    if(width <= 640){
        // for small screen
        gap=0;
        barWidth = (width -  (gap)* (arraySize +1 ))/arraySize;
        offset=0;
    }else{
        gap=1;
    }

    noOfElements[0].innerText = arraySize;

    clearScreen();
    drawRectangles();
}

function init()
{   
    arraySize = Number(sizeBar[0].value);
    barWidth = Math.floor((width -  (gap)* (arraySize +1 ))/arraySize);
    animTime = getSpeed();
    offset  = Math.round((width -  barWidth*arraySize - gap*(arraySize-1))/2);

    if(width <= 640){
        // for small screen
        gap=0;
        barWidth = (width -  (gap)* (arraySize +1 ))/arraySize;
        offset=0;
    }else{
        gap=1;
    }

    noOfElements[0].innerText = sizeBar[0].value;
    speedOfAnimation[0].innerText = animTime*10 +"ms per op (exp.)";

    clearScreen();
    array = [];
    generateRandomArray(array, arraySize, minVal, maxVal);
    placed = [];
    generateRandomArray(placed,arraySize,0,0);
    copyArray = [...array];
    animList = [];
    drawRectangles();
}

function getSpeed()
{   
    return Number(speedBar[0].max) - Number(speedBar[0].value) + Number(speedBar[0].min);
}

function start(){


    animList = [];
    placed = [];
    generateRandomArray(placed,arraySize,0,0);

    var cntr = 1;

    let choice = menu[0].value;
    error.removeClass("no-display");

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
        case "Radix Sort":
            console.log("Radix Sort");
            sorting.radixSort(animList, copyArray, arraySize);
            break;
        case "Count Sort":
            console.log("Count Sort");
            sorting.countSort(animList, copyArray, arraySize);
            break;
        case "Shell Sort":
            console.log("Shell Sort");
            sorting.shellSort(animList, copyArray, arraySize);
            break;
        case "Tim Sort":
            console.log("Tim Sort");
            sorting.timSort(animList, copyArray, arraySize);
            break;
        case "Comb Sort":
            console.log("Comb Sort");
            sorting.combSort(animList,copyArray, arraySize);
            break;
        case "Pigeonhole Sort":
            console.log("Pigeonhole Sort");
            sorting.pigeonholeSort(animList, copyArray, arraySize);
            break;
        case "Cocktail Sort":
            console.log("Cocktail Sort");
            sorting.cocktailSort(animList, copyArray, arraySize);
            break;
        case "Pancake Sort":
            console.log("Pancake Sort");
            sorting.pancakeSort(animList, copyArray, arraySize);
            break;
        case "Cycle Sort":
            console.log("Cycle Sort");
            sorting.cycleSort(animList, copyArray, arraySize);
            break;
        case "Bitonic Sort":
            console.log("Bitonic Sort");
            makePowerOf2(array, copyArray,arraySize, minVal, maxVal);
            recalcuate();
            sorting.bitonicSort(animList, copyArray, arraySize);
            break;
        case "Gnome Sort":
            console.log("Gnome Sort");
            sorting.gnomeSort(animList, copyArray, arraySize)
            console.log(array, copyArray);
            break;
        case "Stooge Sort":
            console.log("Stooge Sort");
            sorting.stoogeSort(animList, copyArray, arraySize);
            break;
        case "Odd Even Sort":
            console.log("Odd Even Sort");
            sorting.oddEvenSort(animList, copyArray, arraySize);
            break;
        default:
            cntr=0;
            enableButtons();
            
    }

        if(cntr)
        {
            // start audio
            audioCtx = new AudioContext(); 
            osc = audioCtx.createOscillator();
            osc.type = oscillator[0].value;
            osc.connect(audioCtx.destination);
            osc.start();
            
            // start animation
            error.addClass("no-display");
            animate(animList,osc,audioCtx);

            // stop audio
            osc.stop(animTime*animList.length/1000);
        }
        
}

function disableButtons()
{   
    speedBar.attr("disabled",true);
    speedBar.addClass("disabled");

    sizeBar.attr("disabled",true);
    sizeBar.addClass("disabled");

    startButton.attr("disabled",true);
    startButton.addClass("disabled");

    generateButton.attr("disabled",true);
    generateButton.addClass("disabled");

    menu.attr("disabled",true);
    menu.addClass("disabled");

    shuffle.attr("disabled",true);
    shuffle.addClass("disabled");

    stopButton.attr("disabled",false);
    stopButton.removeClass("disabled");

}

function enableButtons()
{   
    speedBar.attr("disabled",false);
    speedBar.removeClass("disabled");

    sizeBar.attr("disabled",false);
    sizeBar.removeClass("disabled");

    startButton.attr("disabled",false);
    startButton.removeClass("disabled");

    generateButton.attr("disabled",false);
    generateButton.removeClass("disabled");

    menu.attr("disabled",false);
    menu.removeClass("disabled");

    shuffle.attr("disabled",false);
    shuffle.removeClass("disabled");

    stopButton.attr("disabled",true);
    stopButton.addClass("disabled");
}

menu.change(function(){
    if(menu[0].value == "Bitonic Sort")
    {
        bitonicText.removeClass("no-display");
    }else{
        bitonicText.addClass("no-display");
    }
});

generateButton.click(function(){
    init();
});

startButton.click(function(){
    disableButtons();
    start();
});

sizeBar.on('input',function(){
    init();
});

speedBar.on('input', function(){
    animTime = getSpeed(Number(speedBar[0].value));
    speedOfAnimation[0].innerText = animTime*10 +"ms per op (exp.)";
});

stopButton.click(function(){
    for(var i = 0; i < timeoutList.length; i++)
    {
        clearTimeout(timeoutList[i]);
    }
    timeoutList = [];
    osc.stop()
    enableButtons();
    copyArray = [...array];
});

shuffle.click(function(){
    shuffleArray(array,arraySize);
    placed = [];
    generateRandomArray(placed,arraySize,0,0);
    clearScreen();
    drawRectangles();
    copyArray = [...array];
});

init();

// TODO:
// 1. Figure Out Bucket Sort