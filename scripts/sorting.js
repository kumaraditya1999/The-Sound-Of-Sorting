import {swap, insertIntoAnimList, generateRandomValues} from './util.js';

// insertion sort

export function insertionSort(animList, arr, n){
    
    for( var i = 1; i < n; i++ )
    {
        let ptr = i;
        for( var j = i-1;j>=0;j--)
        {
            if(arr[ptr]<arr[j]){
                insertIntoAnimList(animList,"swap",ptr,j);
                [arr[ptr],arr[j]] = swap(arr[ptr],arr[j]);
                ptr=j;
            }else{
                break;
            }
        }
    }

   console.log(arr,animList);
}

// selection sort

export function selectionSort(animList, arr, n)  
{  
    
    var i, j, min_idx;  
    let temp;

    for (i = 0; i < n-1; i++)  
    {  

        min_idx = i;  
        for (j = i+1; j < n; j++)
        {   
            insertIntoAnimList(animList,"comp",j,min_idx);
            if (arr[j] < arr[min_idx])
            {   
                min_idx = j; 
            }   
        }
        
        insertIntoAnimList(animList,"swap",i,min_idx);
        [arr[min_idx], arr[i]] = swap(arr[min_idx], arr[i]);
    }
}  

// bubblesort

export function bubbleSort(animList, arr,n)  
{   
    var i, j; 
    let temp;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)  
        {
            if (arr[j] > arr[j+1])
            {   
                insertIntoAnimList(animList,"swap",j,j+1);
                [arr[j], arr[j+1]] = swap(arr[j], arr[j+1]);
            } else {
                insertIntoAnimList(animList,"comp",j,j+1);
            } 

        }  
    }      
        
}  

// merge sort

function merge(animList, arr, l, m, r) 
{ 
    let i, j, k; 
    let n1 = m - l + 1; 
    let n2 =  r - m; 
  
    let L = [];
    let R = []; 

    for (i = 0; i < n1; i++) 
        L.push(arr[l + i]); 
    for (j = 0; j < n2; j++) 
        R.push(arr[m + 1+ j]); 
  
    i = 0;
    j = 0;
    k = l;
    let temp;
    while (i < n1 && j < n2) 
    {   
        insertIntoAnimList(animList,"comp",m+1+j,l+i);
        if (L[i] <= R[j]) 
        {
            insertIntoAnimList(animList,"rep",k,L[i]);
            insertIntoAnimList(animList,"comp",k,l+i);
            arr[k] = L[i];
            i++; 
        } 
        else
        {   
            insertIntoAnimList(animList,"rep",k,R[j]);
            insertIntoAnimList(animList,"comp",k,m+1+j);
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 

    while (i < n1) 
    {  
        insertIntoAnimList(animList,"rep",k,L[i]);
        insertIntoAnimList(animList,"comp",k,l+i);
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
  
    while (j < n2) 
    {   

        insertIntoAnimList(animList,"rep",k,R[j]);
        insertIntoAnimList(animList,"comp",k,m+1+j);
        arr[k] = R[j];
        j++;
        k++; 
    } 
} 
  
export function mergeSort(animList, arr, arraySize, l, r) 
{   
    if(l==undefined){
        l = 0;
        r = arraySize-1;
    }
    // console.log("sorting",l,r);
    if (l < r) 
    { 
        let m = l + Math.floor((r-l)/2); 
        mergeSort(animList, arr, arraySize, l, m); 
        mergeSort(animList, arr, arraySize, m+1, r); 
        merge(animList, arr, l, m, r); 
    } 
}

// quicksort

function partition(animList, arr, low, high) 
{ 
    var pivot = arr[high];
    var i = (low - 1); 
    
    for (var j = low; j <= high - 1; j++) { 
    
        if (arr[j] <= pivot) { 
            i++;
            insertIntoAnimList(animList,"swap",i,j);
            [arr[i],arr[j]] = swap(arr[i],arr[j]);
        }else{
            insertIntoAnimList(animList,"comp",j,high);
        }
    }
    insertIntoAnimList(animList,"swap",i+1,high);
    [arr[i+1],arr[high]] = swap(arr[i+1],arr[high]);

    return (i + 1); 
} 


function partition_r(animList, arr, low, high) 
{ 
    let random = generateRandomValues(low, high);
    insertIntoAnimList(animList,"swap",random,high);
    [arr[random], arr[high]] = swap(arr[random], arr[high]); 
    return partition(animList, arr, low, high);
} 

export function quickSort(animList, arr, arraySize, low, high) 
{   
    if (low == undefined) 
    {
        low = 0;
        high = arraySize-1;
    }
    
    if (low < high) {   
        var pi = partition_r(animList, arr, low, high);
        quickSort(animList, arr, arraySize, low, pi - 1); 
        quickSort(animList, arr, arraySize, pi + 1, high); 
    } 
} 

// heapsort

function heapify(animList, arr, n, i) 
{ 
    let largest = i; 
    let l = 2*i + 1; 
    let r = 2*i + 2;
  
    if (l < n && arr[l] > arr[largest]) 
        largest = l; 
  
    if (r < n && arr[r] > arr[largest]) 
        largest = r; 
   
    if (largest != i) 
    {   
        insertIntoAnimList(animList,"swap",i,largest);
        [arr[i], arr[largest]] = swap(arr[i], arr[largest]); 
        heapify(animList, arr, n, largest); 
    }else{
        insertIntoAnimList(animList,"comp",largest,i);
    } 
} 
  
export function heapSort(animList, arr, n) 
{ 

    for (let i = n / 2 - 1; i >= 0; i--) 
        heapify(animList, arr, n, i); 
  
    for (let i=n-1; i>=0; i--) 
    { 
        insertIntoAnimList(animList,"swap",0,i); 
        [arr[0],arr[i]] = swap(arr[0], arr[i]); 
  
        heapify(animList,arr, i, 0); 
    } 
} 