const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const canvas = createCanvas(200, 200)

drawCircle(canvas.width/2 ,20,canvas)
writeToFile(canvas)


function writeToFile(canvas){
  let data ='<img src="' + canvas.toDataURL() + '" />' 
  console.log('done')
  fs.writeFileSync('./sample.html',data)

}

function drawCircle(X, Y, canvas,text ,radius = 20) {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FF0000';
  ctx.stroke()
  ctx.lineWidth = 1
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.strokeText(text.toString(), X - 10, Y)

  let leftChild = { 
      line:{ 
          start:{x:X + radius * Math.cos(-225 * Math.PI / 180) * 1,y:Y + radius * Math.sin(-225 * Math.PI / 180) * 1}, 
          end: { x: X + radius * Math.cos(-225 * Math.PI / 180) * 1 -10 ,y:Y + radius * Math.sin(-225 * Math.PI / 180) * 1 +10 }
      }, 
      center: {
          x: X + radius * Math.cos(-225 * Math.PI / 180) * 1 -10 - radius * Math.cos(45 * Math.PI / 180 ), 
          y: Y + radius * Math.sin(-225 * Math.PI / 180) * 1 +10 + radius * Math.sin(45 * Math.PI /180 )
      }
  }
  let rightChild = { 
      line:{
          start:{
              x: X + radius * Math.cos(-315 * Math.PI / 180) *1, 
              y:Y + radius * Math.sin(-315 * Math.PI / 180) * 1

          },
          end:{
              x: X + radius * Math.cos(-315 * Math.PI / 180) * 1 +10 , 
             y: Y + radius * Math.sin(-315 * Math.PI / 180) * 1 +10

          }
      }, 
      center:{ 
          x: X + radius * Math.cos(-315 * Math.PI / 180) * 1 +10 + radius * Math.cos(45 * Math.PI / 180 ), 
          y: Y + radius * Math.sin(-315 * Math.PI / 180) * 1 +10 + radius * Math.sin(45 * Math.PI /180 )
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
