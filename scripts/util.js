export function swap(a, b){
    return [b, a];
}

export class anim
{
    constructor(type,a,b)
    {
        this.type = type;
        this.a = a;
        this.b = b;
    }
}

export function insertIntoAnimList(animList,type,a,b)
{
    let temp = new anim(type,a,b);
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
