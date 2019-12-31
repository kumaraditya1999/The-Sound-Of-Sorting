import {anim, swap} from './util.js';

export function insertionSort(arr, n){
    
    let temp;
    var animList = [];
    for( var i = 1; i < n; i++ )
    {
        let ptr = i;
        for( var j = i-1;j>=0;j--)
        {
            if(arr[ptr]<arr[j]){
                temp = new anim("swap",ptr,j);
                animList.push(temp);
                [arr[ptr],arr[j]] = swap(arr[ptr],arr[j]);
                ptr=j;
            }else{
                break;
            }
        }
    }

    console.log(arr);

    return animList;
}



export function selectionSort(arr, n)  
{  
    
    var i, j, min_idx;  
    let temp;

    var animList = [];
    for (i = 0; i < n-1; i++)  
    {  

        min_idx = i;  
        for (j = i+1; j < n; j++)
        {   
            temp = new anim("comp",j,min_idx);
            animList.push(temp);
            if (arr[j] < arr[min_idx])
            {   
                min_idx = j; 
            }   
        }
        
        temp = new anim("swap",i,min_idx);
        animList.push(temp);

        [arr[min_idx], arr[i]] = swap(arr[min_idx], arr[i]);
    }
    // console.log(arr); 
    return animList; 
}  



export function bubbleSort(arr,n)  
{   
    var i, j; 
    var animList = []; 
    let temp;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)  
        {
            if (arr[j] > arr[j+1])
            {   
                temp = new anim("swap",j,j+1);
                animList.push(temp);
                
                [arr[j], arr[j+1]] = swap(arr[j], arr[j+1]);
            } else {
                temp = new anim("comp",j,j+1);
                animList.push(temp);
            } 

        }  
    }      

    return animList;
        
}  

