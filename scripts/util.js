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
