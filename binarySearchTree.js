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


    prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '"--- ' : ',--- '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true);
        }
    };


    insert(value, node = this.root){
        if (value === node.value) return node

        if(value < node.value){
            if(node.left === null){
                node.left = new Node(value);
                return node;
            }
            node.left = this.insert(value, node.left)
        } else {
            if(node.right === null){
                node.right = new Node(value)
                return node;
            }
            node.right = this.insert(value, node.right)
        }

        return node
    }


    getSuccessor(curr){
        curr = curr.right;
        while(curr.left !== null && curr !== null){
            curr = curr.left
        }
        return curr
    }


    deleteItem(value, node = this.root){
        if(node === null) return node

        if(value < node.value){
            node.left = this.deleteItem(value, node.left)
        } else if(value > node.value){
            node.right = this.deleteItem(value, node.right);
        } else {
            if(node.left === null) return node.right
            if(node.right === null) return node.left

            const succ = this.getSuccessor(node);
            node.value = succ.value;
            node.right = this.deleteItem(succ.value, node.right)

        }


        return node
    }

    find(value, node = this.root){
        if(node === null) {return null}
        if(value > node.value) {return this.find(value, node.right)}
        if(value < node.value) {return this.find(value, node.left)}
        if(value === node.value) {return node}
    }

    levelOrderForEach(callback, currNode = this.root, queue = [currNode]){
        if(callback === undefined){
            throw new Error('A callback is required')
        }

        if(currNode === null) return


        /* Recursion version */
        // if(currNode.left) queue.push(currNode.left);
        // if(currNode.right) queue.push(currNode.right);
        
        // callback(queue[0]);
        // queue.shift();

        // if(queue.length === 0) return
        // this.levelOrderForEach(callback, queue[0], queue)


        /* Iteration version */


        while(queue.length > 0){
            const node = queue[0];

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);

            callback(node)
            queue.shift()
        }
    }


    inOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error('A callback is required')
        }

        if(node === null) return

        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }


    preOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error('A callback is required')
        }

        if(node === null) return

        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }


    postOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error('A callback is required')
        }

        if(node === null) return

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }


    height(value){
        const node = this.find(value);
        if(node === null) return undefined;

        return this.heightRec(node)
    }


    heightRec(node){
        if(node === null) return -1;


        let lHeigth = this.heightRec(node.left);
        let rHeigth = this.heightRec(node.right);

        return Math.max(lHeigth, rHeigth) + 1
    }


    // depth by recursion

    isBalanced(root = this.root){
        return this.isBalancedRec(root) >= 0
    }

    isBalancedRec(node){
        if(node === null) return 0

        const lHeigth = this.isBalancedRec(node.left);
        const rHeigth = this.isBalancedRec(node.right);

        if(lHeigth === -1 || rHeigth === -1 || Math.abs(lHeigth - rHeigth) > 1) return -1

        return Math.max(lHeigth, rHeigth) +1 

    }

    rebalanced(){
        if(!this.isBalanced()){
            let temp = [];

            this.levelOrderForEach((node)=>{temp.push(node.value)});
            return tree = buildTree(temp);

        } else {
            return tree
        }
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

function buildTree(array){
    array = removeDuplicate(array);
    array = mergeSort(array);

    const tree = new Tree();
    const bsTree = createBranches(array, tree);

    return bsTree
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

let tree = buildTree([4,6,12,45,85,25,12,35,65,75,42,15]);
tree.insert(74);
tree.insert(73);
tree.deleteItem(75)
tree.insert(1);

console.log(tree.depth(65))

tree = tree.rebalanced();
tree.prettyPrint()
