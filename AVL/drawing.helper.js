const fs = require('fs')

LEFT_CHILD_ANGLE_G= -180
RIGHT_CHILD_ANGLE_G = -360
INTER_NODE_LENGTH_G = 1500
INTER_NODE_LENGTH_Y_G = 10

function drawCircle(X, Y, canvas,text ,level,radius = 20) {
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    let LEFT_CHILD_ANGLE = LEFT_CHILD_ANGLE_G -20 * level 
    let RIGHT_CHILD_ANGLE = RIGHT_CHILD_ANGLE_G + 20 * level
    let INTER_NODE_LENGTH = INTER_NODE_LENGTH_G/(level*level) 
    let INTER_NODE_LENGTH_Y= INTER_NODE_LENGTH_Y_G+10*level
    ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.strokeText(text.toString(), X - 10, Y)
  
    let leftChild = { 
        line:{ 
            start:{x:X + radius * Math.cos(LEFT_CHILD_ANGLE * Math.PI / 180) * 1,y:Y + radius * Math.sin(LEFT_CHILD_ANGLE * Math.PI / 180) * 1}, 
            end: { x: X + radius * Math.cos(LEFT_CHILD_ANGLE * Math.PI / 180) * 1 -INTER_NODE_LENGTH ,y:Y + radius * Math.sin(LEFT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH_Y }
        }, 
        center: {
            x: X + radius * Math.cos(LEFT_CHILD_ANGLE * Math.PI / 180) * 1 -INTER_NODE_LENGTH - radius * Math.cos(45 * Math.PI / 180 ), 
            y: Y + radius * Math.sin(LEFT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH_Y + radius * Math.sin(45 * Math.PI /180 )
        }
    }
    let rightChild = { 
        line:{
            start:{
                x: X + radius * Math.cos(RIGHT_CHILD_ANGLE * Math.PI / 180) *1, 
                y:Y + radius * Math.sin(RIGHT_CHILD_ANGLE * Math.PI / 180) * 1
  
            },
            end:{
                x: X + radius * Math.cos(RIGHT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH , 
               y: Y + radius * Math.sin(RIGHT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH_Y
  
            }
        }, 
        center:{ 
            x: X + radius * Math.cos(RIGHT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH + radius * Math.cos(45 * Math.PI / 180 ), 
            y: Y + radius * Math.sin(RIGHT_CHILD_ANGLE * Math.PI / 180) * 1 +INTER_NODE_LENGTH_Y + radius * Math.sin(45 * Math.PI /180 )
        }
    }
    return {
      leftChild, 
      rightChild
    }
  
  }
function drawLine(start,end,canvas) { 
    let  ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x , end.y);
    ctx.stroke();
  
  
}
function writeToFile(canvas,ele){
    let data ='<img src="' + canvas.toDataURL() + '" />' 
    console.log('done')
    fs.writeFileSync(`./output/sample-${ele}.html`,data)
  
}  
function traversal(root,center,canvas) {
    if(root == null ) {
        return  
    }
    let parent = drawCircle(center.x,center.y,canvas,root.data.toString() +':'+root.balance  ,root.level)
    if (root.left != null ){
        drawLine(parent.leftChild.line.start, parent.leftChild.line.end,canvas)

    }
    if (root.right != null ){
        drawLine(parent.rightChild.line.start, parent.rightChild.line.end,canvas)

    }

    traversal(root.left,parent.leftChild.center,canvas)
    traversal(root.right,parent.rightChild.center,canvas) 

}


module.exports = { 
    drawCircle , 
    drawLine, 
    writeToFile, 
    traversal
}