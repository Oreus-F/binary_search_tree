import { buildTree, randomArray } from "./binarySearchTree.js";


function printNode(node){
    console.log(`Node Value: ${node.value}`);
    console.log(node)
    console.log('_______________________')
    console.log('')

}


let tree = buildTree(randomArray(4, 1, 100));
tree.prettyPrint()
console.log(`tree is balanced: ${tree.isBalanced()}`);
tree.levelOrderForEach(printNode);
tree.preOrderForEach(printNode);
tree.inOrderForEach(printNode);
tree.postOrderForEach(printNode);
tree.insert(101);
tree.insert(102);
tree.insert(110);
tree.prettyPrint();
console.log(`tree is balanced: ${tree.isBalanced()}`);
tree = tree.rebalanced();
console.log(`tree is balanced: ${tree.isBalanced()}`);
tree.levelOrderForEach(printNode);
tree.preOrderForEach(printNode);
tree.inOrderForEach(printNode);
tree.postOrderForEach(printNode);
tree.prettyPrint();