class Node{
    constructor(value = null){
        this.value = value,
        this.left = null,
        this.right = null
    }
}


class Tree{
    constructor(root = null){
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
    for(let x = 0; x <= length - 1; x++){
        const numb = Math.floor(Math.random() * (max - min + 1)) + min;
        array.push(numb)
    }

    return array
}


function createBranches(array ,node, start = 0, end = array.length){
    const mid = Math.floor((start + end)/2);
    
    if(start < end){

        const newNode = new Node(array[mid]);

        if(node.root === null){
            node.root = newNode
        } else if(newNode.value < node.value){
            node.left = newNode;
        } else {
            node.right = newNode;
        }

        
        createBranches(array, newNode, start, mid);
        createBranches(array, newNode, mid+1, end)
    }

    return node
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '"--- ' : ',--- '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true);
    }
};

function buildTree(array){
    array = removeDuplicate(array);
    array = mergeSort(array);

    const tree = new Tree();
    const bsTree = createBranches(array, tree);

    return bsTree
}


function insert(value, node){
    if (value === node.value) return node

    if(value < node.value){
        if(node.left === null){
            node.left = new Node(value);
            return node;
        }
        node.left = insert(value, node.left)
    } else {
        if(node.right === null){
            node.right = new Node(value)
            return node;
        }
        node.right = insert(value, node.right)
    }

    return node
}


function getSuccessor(curr){
    curr = curr.right;
    while(curr.left !== null && curr !== null){
        curr = curr.left
    }
    return curr
}


function deleteItem(value, node){
    if(node === null) return node

    if(value < node.value){
        node.left = deleteItem(value, node.left)
    } else if(value > node.value){
        node.right = deleteItem(value, node.right);
    } else {
        if(node.left === null) return node.right
        if(node.right === null) return node.left

        const succ = getSuccessor(node);
        node.value = succ.value;
        node.right = deleteItem(succ.value, node.right)

    }


    return node
}


function find(value, node){
    if(node === null) {return null}
    if(value > node.value) {return find(value, node.right)}
    if(value < node.value) {return find(value, node.left)}
    if(value === node.value) {return node}
}


function levelOrderForEach(callback, root = null, queue = [root]){
    if(callback === undefined){
        throw new Error('A callback is required')
    }

    if(root === null) return


    /* Recursion version */
    // if(root.left) queue.push(root.left);
    // if(root.right) queue.push(root.right);
    
    // callback(queue[0]);
    // queue.shift();

    // if(queue.length === 0) return
    // levelOrderForEach(callback, queue[0], queue)


    /* Iteration version */


    while(queue.length > 0){
        const node = queue[0];

        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);

        callback(node)
        queue.shift()
    }
}


function inOrderForEach(callback, node = null){
    if(callback === undefined){
        throw new Error('A callback is required')
    }

    if(node === null) return

    inOrderForEach(callback, node.left);
    callback(node);
    inOrderForEach(callback, node.right);
}


function preOrderForEach(callback, node = null){
    if(callback === undefined){
        throw new Error('A callback is required')
    }

    if(node === null) return

    callback(node);
    preOrderForEach(callback, node.left);
    preOrderForEach(callback, node.right);
}


function postOrderForEach(callback, node = null){
    if(callback === undefined){
        throw new Error('A callback is required')
    }

    if(node === null) return

    postOrderForEach(callback, node.left);
    postOrderForEach(callback, node.right);
    callback(node);
}


function height(value, root){
    const node = find(value, root);
    if(node === null) return node;

    let height = 0;

    preOrderForEach((currentNode)=> {
        if(isLeaf(currentNode)){height = distanceTo(node, currentNode, height)}
    }, tree.root);



    return height
}


function isLeaf(node){
    if(node.left === null && node.right === null) return true
}


function distanceTo(depart, arrival, distance){
    let temp = depart;
    let counter = 0;

    
    while(temp.value !== arrival.value){
        if(temp.value < arrival.value) temp = temp.right;
        if(temp.value > arrival.value) temp = temp.left;
        counter++;
        if(counter > distance) distance = counter;
    }

    return distance
}


function depth(value, root){
    const node = find(value, root);
    if(node === null) return node;

    let depth = 0;

    depth = distanceTo(root, node, depth)

    return depth
}

function isBalanced(root){


}

let tree = buildTree([4,6,12,45,85,25,12,35,65,75,42,15]);
insert(5, tree.root);
insert(4, tree.root);

prettyPrint(tree.root);
console.log(height(35, tree.root));
console.log(depth(4, tree.root));
console.log(isBalanced(tree.root))