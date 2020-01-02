//  helper functions and classes

export function swap(a, b){
    return [b, a];
}

export class Anim
{
    constructor(type,fi,si,diff)
    {
        this.type = type;
        this.fi = fi;
        this.si = si;
        this.diff = Math.abs(diff);
    }
}

export function insert(animList,type,fi,si,diff)
{
    let temp = new Anim(type,fi,si,diff);
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
