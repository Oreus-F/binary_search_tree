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


function buildTree(array){
    array = array.filter((item, index) => array.indexOf(item) === index);

}

