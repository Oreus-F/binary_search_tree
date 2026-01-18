class Node{
    constructor(value){
        this.value = value,
        this.left = null,
        this.right = null
    }
}


class Tree{
    constructor(root){
        this.root = root
    }
}


function removeDuplicate(array){
    return array.filter((item, index) => array.indexOf(item) === index);
}


function mergeSort(array, start = 0, end = array.length - 1){
    const mid = Math.floor((start + end)/2)

    if(start < end){
        mergeSort(array, start, mid)
        mergeSort(array, mid + 1, end);
        merge(array, start, mid, end)
    }

    return array
}


function merge(array, start, mid, end){
    const temp = [];
    let left = start;
    let right = mid +1 

    while(left <= mid && right <= end){
        if(array[left] <= array[right]){
            temp.push(array[left])
            left++
        } else {
            temp.push(array[right]);
            right++
        }
    };

    while(left <= mid){
        temp.push(array[left]);
        left++
    }

    while(right <= end){
        temp.push(array[right]);
        right++
    }

    for(x = start; x <= end; x++){
        array[x] = temp[x - start]
    }
}


function randomArray(length, min, max){
    const array = []
    for(let x = 0; x <= length; x++){
        const numb = Math.floor(Math.random() * (max - min + 1)) + min;
        array.push(numb)
    }

    return array
}


function buildTree(array){
    array = removeDuplicate(array);
    array = mergeSort(array)
    console.log(array)

}


buildTree(randomArray(10, 1, 100))

