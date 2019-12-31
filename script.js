import * as sorting from './scripts/sorting.js';
import {swap} from './scripts/util.js';

// Canvas Setup

const canvas = document.getElementById("canvas");
const height = 700;
const width = 700;
canvas.width = width;
canvas.height = height;

const startTime = 50;
const audioLength = 100;

const ctx = canvas.getContext('2d');

const colors = {
    "swap": "red",
    "normal": "pink",
    "comp": "black",
    "clear": "white"
};



var mySound = document.getElementById('sound');

mySound.addEventListener('timeupdate', function(){
    if(mySound.currentTime >= startTime/1000 + audioLength/1000){
        console.log(mySound.currentTime);
        mySound.pause();
    }
})

var arraySize = 20;
const minVal = 5;
const maxVal = height - minVal;

function generateRandomValues(maxVal, minVal)
{
    return Math.floor(Math.random() * ( maxVal - minVal + 1)) + minVal;
}

function generateRandomArray(arraySize){

    var array = [];

    for(var i = 0; i < arraySize ; i++ )
    {
        array.push(generateRandomValues(maxVal, minVal));
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

function getSoundSrc(a, b){
    let diff = Math.abs(a-b);

    let maxDiff = maxVal - minVal;

    let ans = Math.ceil((diff/maxDiff) * (2000 - 300) + 300);

    ans = Math.ceil(ans/100)*100;

    let src = ans+".wav";
    return src;

}

function animate(animList)
{   
    console.log(animList);
    for(let i = 0; i < animList.length; i++)
    {
        setTimeout( function timer(){

            ctx.clearRect(0,0,canvas.width, canvas.height);
            drawRectangles();

            if(animList[i].type=="rep")
            {
                drawSlab(animList[i].a, array[animList[i].a], colors["clear"]);
                drawSlab(animList[i].b, array[animList[i].b], colors["clear"]);
                [array[animList[i].a], array[animList[i].b]] = swap(array[animList[i].a], array[animList[i].b]);
                drawSlab(animList[i].a, array[animList[i].a], colors["swap"]);
                drawSlab(animList[i].b, array[animList[i].b], colors["swap"]);
            }
            else if(animList[i].type=="comp")
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

            console.log(mySound.currentTime);
            mySound.src = "./audio/" + getSoundSrc(array[animList[i].a], array[animList[i].b]);
            console.log(mySound.src);

            
            
            mySound.currentTime = startTime/1000;
             var promise = mySound.play();

             if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                    console.log("playing");
                }).catch(error => {
                    console.log(mySound);
                    console.log(error);
                });
            }

        },1000 + i*100);

    }
}

animate(animList);
