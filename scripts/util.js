//  helper functions and classes

export function swap(a, b){
    return [b, a];
}

export class Anim
{
    constructor(type,fi,si,diff,pl)
    {
        this.type = type;
        this.fi = fi;
        this.si = si;
        this.diff = Math.abs(diff);
        this.pl = pl;
    }
}

export function insert(animList,type,fi,si,diff,pl)
{
    let temp = new Anim(type,fi,si,diff,pl);
    animList.push(temp);
}

export function generateRandomValues(minVal, maxVal)
{
    return Math.floor(Math.random() * ( maxVal - minVal + 1)) + minVal;
}

export function generateRandomArray(array, arraySize, minVal, maxVal)
{

    for(var i = 0; i < arraySize ; i++ )
    {
        array.push(generateRandomValues(minVal, maxVal));
    }

}

export function shuffleArray(arr, arraySize)
{
    for(var i=0;i<arraySize;i++)
    {
        let temp = generateRandomValues(0,i);
        [arr[i],arr[temp]] = swap(arr[i],arr[temp]);
    }
}

export function makePowerOf2(arr, copyArray, arraySize, minVal, maxVal)
{   
    if(arr.length > 256)
    {
        while((arr.length & (arr.length - 1)))
        {   
            arr.pop();
            copyArray.pop();
        }
    }
    while((arr.length & (arr.length - 1)))
    {   
        let rval = generateRandomValues(minVal,maxVal);
        arr.push(rval);
        copyArray.push(rval);
    }
}

export function check(arr1, arr2)
{
    // check if arr2 is a sorted version of arr1 or not

    let arrx = [...arr1];
    arrx.sort(function(a, b){return a - b});

    for(let i=0;i<arr1.length;i++)
        if(arrx[i]!=arr2[i])
            return false;
    
    return true;
}
