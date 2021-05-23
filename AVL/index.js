const AVLTree = require('./AVL')
const { createCanvas } = require('canvas')
const drawHelper = require('./drawing.helper')
const fs = require('fs')
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);



let avl = new AVLTree()


let insertElements = [] 
for(let i=0 ;i<100000;i++){
    insertElements.push(i)

}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(insertElements)

bar1.start(insertElements.length,0)
let i= 0 
fs.writeFileSync('./input',insertElements)
for(let _element of insertElements){
    try {
    // console.log(`inserting ${_element}`)
    avl.insert(_element)
    // const canvas = createCanvas(5000, 2000)
    // avl._assign_level()
    // drawHelper.traversal(avl.root,{x:2500,y:50},canvas)
    // drawHelper.writeToFile(canvas,_element)
    bar1.update(i++)
    }
    catch(e){
        console.log(return_allNodes(avl.root).length)
        console.log(insertElements.length)
    }
}
// avl.printTree()

bar1.stop()
console.log('before import ')

const canvas = createCanvas(5000, 2000)
avl._assign_level()
console.log(insertElements.length)
console.log(return_allNodes(avl.root).length)
function return_allNodes(root){
    let nodes =[] 
    function appender(root) {
        if(root == null ){
            return 

        } 
        nodes.push(root.data)
        appender(root.left)
        appender(root.right)


    }
    appender(root)
    return nodes

}




// avl.insert(40)