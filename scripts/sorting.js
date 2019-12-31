import {anim, swap} from './util.js.js';

export function insertionSort(arr, n){
    
    for( var i = 1; i < n; i++ )
    {
        let key = arr[i];
        let j = i - 1;

        while ( j >= 0 && arr[j] > key)
        {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }

    console.log(arr);
}



export function selectionSort(array, n)  
{  
    
    var i, j, min_idx;  

    var animList = [];
    for (i = 0; i < n-1; i++)  
    {  

        min_idx = i;  
        for (j = i+1; j < n; j++)
        {
            if (arr[j] < arr[min_idx])
            {
                min_idx = j; 
            }   
        }  

        [arr[min_idx], arr[i]] = swap(arr[min_idx], arr[i]);
    }
    console.log(arr);  
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

