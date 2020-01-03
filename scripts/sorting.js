import {swap, insert, generateRandomValues} from './util.js';

// insertion sort

export function insertionSort(animList, arr, n, left, right){

    let st = 0, en = n-1;
    let cntr = 1;

    if(left!=undefined)
    {
        st = left;
        en = right;
        cntr=0;
    }
    
    for( var i = st+1; i <= en; i++ )
    {
        let ptr = i;
        for( var j = i-1;j>=st;j--)
        {
            if(arr[ptr]<arr[j]){
                insert(animList,"swap",ptr,j,arr[ptr]-arr[j]);
                [arr[ptr],arr[j]] = swap(arr[ptr],arr[j]);
                ptr=j;
            }else{
                insert(animList,"comp",ptr,j,arr[ptr]-arr[j]);
                break;
            }
        }
    }

    if(cntr)
        for( var i = n-1; i >=0; i--)
            insert(animList,"comp",i,i,arr[i],i);  

}

// selection sort

export function selectionSort(animList, arr, n)  
{  
    
    var i, j, min_idx; 

    for (i = 0; i < n-1; i++)  
    {  

        min_idx = i;  
        for (j = i+1; j < n; j++)
        {   
            insert(animList,"comp",j,min_idx,arr[j]-arr[min_idx]);
            if (arr[j] < arr[min_idx])
            {   
                min_idx = j; 
            }   
        }
        
        insert(animList,"swap",i,min_idx, arr[i]-arr[min_idx],i);
        [arr[min_idx], arr[i]] = swap(arr[min_idx], arr[i]);
    }

    insert(animList,"swap",n-1,n-1, 0,n-1);
}  

// bubblesort

export function bubbleSort(animList, arr,n)  
{   
    var i, j; 
    
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)  
        {
            if (arr[j] > arr[j+1])
            {   
                insert(animList,"swap",j,j+1,arr[j]-arr[j+1]);
                [arr[j], arr[j+1]] = swap(arr[j], arr[j+1]);
            } else {
                insert(animList,"comp",j,j+1,arr[j]-arr[j+1]);
            } 

        }
        insert(animList,"comp",n-i-1,n-i-1,0,n-i-1);  
    } 
    insert(animList,"comp",0,0,0,0);     
        
}  

// merge sort

function merge(animList, arr, l, m, r) 
{ 
    let i, j, k; 
    let n1 = m - l + 1; 
    let n2 =  r - m; 
  
    let L = [];
    let R = []; 

    let lastPiece = 0;

    if(l==0 && r==arr.length-1){
        lastPiece = 1;
    }

    for (i = 0; i < n1; i++) 
        L.push(arr[l + i]); 
    for (j = 0; j < n2; j++) 
        R.push(arr[m + 1+ j]); 
  
    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) 
    {   
        insert(animList,"comp",m+1+j,l+i,L[i]-R[j]);
        if (L[i] <= R[j]) 
        {
            insert(animList,"rep",k,L[i],arr[k]-L[i]);
            insert(animList,"comp",k,l+i,arr[k]-L[i]);
            arr[k] = L[i];
            if(lastPiece)
                insert(animList,"comp",k,k,arr[k],k);
            i++; 
        } 
        else
        {   
            insert(animList,"rep",k,R[j],arr[k]-R[j]);
            insert(animList,"comp",k,m+1+j,arr[k]-R[j]);
            arr[k] = R[j]; 
            if(lastPiece)
                insert(animList,"comp",k,k,arr[k],k);
            j++; 
        } 
        k++; 
    } 

    while (i < n1) 
    {  
        insert(animList,"rep",k,L[i],arr[k]-L[i]);
        insert(animList,"comp",k,l+i,arr[k]-L[i]);
        arr[k] = L[i]; 
        if(lastPiece)
                insert(animList,"comp",k,k,arr[k],k);
        i++; 
        k++; 
    } 
  
    while (j < n2) 
    {   
        insert(animList,"rep",k,R[j],arr[k]-R[j]);
        insert(animList,"comp",k,m+1+j,arr[k]-R[j]);
        arr[k] = R[j];
        if(lastPiece)
                insert(animList,"comp",k,k,arr[k],k);
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
            insert(animList,"swap",i,j,arr[i]-arr[j]);
            [arr[i],arr[j]] = swap(arr[i],arr[j]);
        }else{
            insert(animList,"comp",j,high,arr[j]-arr[high]);
        }
    }
    insert(animList,"swap",i+1,high,arr[i+1]-arr[high]);
    [arr[i+1],arr[high]] = swap(arr[i+1],arr[high]);

    return (i + 1); 
} 


function partition_r(animList, arr, low, high) 
{ 
    let random = generateRandomValues(low, high);
    insert(animList,"swap",random,high,arr[random]-arr[high]);
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
        insert(animList,"comp",pi,pi,arr[pi],pi);
        quickSort(animList, arr, arraySize, low, pi - 1);
        quickSort(animList, arr, arraySize, pi + 1, high); 
    }else if(low==high) {
        insert(animList,"comp",low,low,arr[low],low);
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
        insert(animList,"swap",i,largest,arr[i]-arr[largest]);
        [arr[i], arr[largest]] = swap(arr[i], arr[largest]); 
        heapify(animList, arr, n, largest); 
    }else{
        insert(animList,"comp",largest,i,arr[i]-arr[largest]);
    } 
} 
  
export function heapSort(animList, arr, n) 
{ 

    for (let i = n / 2 - 1; i >= 0; i--) 
        heapify(animList, arr, n, i); 
  
    for (let i=n-1; i>=0; i--) 
    { 
        insert(animList,"swap",0,i,arr[0]-arr[i]); 
        [arr[0],arr[i]] = swap(arr[0], arr[i]);
        insert(animList,"comp",i,i,arr[i],i); 
  
        heapify(animList,arr, i, 0); 
    } 
} 

// Radix Sort

function countSortR(animList, arr, n, exp, final) 
{ 
    let output = [];
    for( let i = 0; i < n ; i++)
        output.push(0);

    let i;
    let count = [];
    
    for(i = 0; i < 10; i++)
        count.push(0);
  

    for (i = 0; i < n; i++) 
        count[ Math.floor(arr[i]/exp)%10 ]++; 
  
    for (i = 1; i < 10; i++) 
        count[i] += count[i - 1]; 
  
    for (i = n - 1; i >= 0; i--) 
    { 
        insert(animList,"comp",i, count[ Math.floor(arr[i]/exp)%10 ] - 1,arr[i]-output[count[ Math.floor(arr[i]/exp)%10 ] - 1]);
        output[count[ Math.floor(arr[i]/exp)%10 ] - 1] = arr[i]; 
        count[ Math.floor(arr[i]/exp)%10 ]--;
    } 
  
    for (i = 0; i < n; i++)
    {   
        if(final)
            insert(animList,"rep",i,output[i],arr[i]-output[i],i);
        else
            insert(animList,"rep",i,output[i],arr[i]-output[i]);

        arr[i] = output[i];  
    }
        
} 
  
export function radixSort(animList,arr, n) 
{ 
    var m = Math.max(...arr);
    let final = 0;
  
    for (let exp = 1; Math.floor(m/exp) > 0; exp *= 10)
    {   
        if(Math.floor(m/(exp*10))<=0)
            final = 1;
        countSortR(animList, arr, n, exp, final);
    }
        
}

// Count Sort

export function countSort(animList, arr, n) 
{ 
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max-min+1;

    let count = [];
    for(let i = 0; i < range; i++)
        count.push(0);
    
    let output = [];
    for(let i = 0; i < n; i++)
        output.push(0);

    for(let i = 0; i < n; i++) 
        count[arr[i]-min]++; 
          
    for(let i = 1; i < range; i++) 
        count[i] += count[i-1]; 
    
    for(let i = n-1; i >= 0; i--) 
    {  
        insert(animList,"comp",i,count[arr[i]-min] -1,output[ count[arr[i]-min] -1 ] - arr[i]);
        output[ count[arr[i]-min] -1 ] = arr[i];  
        count[arr[i]-min]--;  
    } 
      
    for(let i=0; i < n; i++) 
    {
        insert(animList,"rep",i,output[i],output[i] - arr[i],i);
        arr[i] = output[i]; 
    }
            
} 

// shell sort

export function shellSort(animList, arr, n) 
{ 

    for (let gap = n/2; gap > 0; gap = Math.floor(gap/2)) 
    { 
        for (let i = gap; i < n; i += 1) 
        { 
            let temp = arr[i]; 
  
            let j;             
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
            {   
                insert(animList,"comp",i,j,arr[j-gap]-temp);
                insert(animList,"rep",j,arr[j-gap],arr[j]-arr[j-gap]);
                arr[j] = arr[j - gap];
            } 
                 
            insert(animList,"rep",j,temp,arr[j]-temp); 
            arr[j] = temp; 
        } 
    } 

    for( var i = 0; i < n; i++)
        insert(animList,"comp",i,i,arr[i],i); 

} 

// Tim Sort 

export function timSort(animList, arr, n) 
{ 
    const RUN = 32;

    for (let i = 0; i < n; i+=RUN) 
        insertionSort(animList, arr, 0 , i, Math.min((i+31), (n-1))); 
    
    for (let size = RUN; size < n; size = 2*size) 
    { 
        for (let left = 0; left < n; left += 2*size) 
        { 
            let mid = left + size - 1; 
            let right = Math.min((left + 2*size - 1), (n-1)); 
            merge(animList, arr, left, mid, right); 
        }
    } 
}