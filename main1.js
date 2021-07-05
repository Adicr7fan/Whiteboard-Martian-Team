
    // Getting the canvas
const board = document.getElementById('canvas');
board.height = window.innerHeight - 70;
board.width = window.innerWidth - 20;
const ctx = board.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineJoin = "round";
ctx.lineCap = "round";
let active = "";
let color = "";
let working = false;
let x_initial, y_initial;
let x_final, y_final;
let flag = 0;
var undoStack = [];
var redoStack = [];
var index=-1
var r_index=-1
var pen_style
var x
var x1,y1,x2,y2
let painting=false
var button=0

// Pencil Input........
const pencil = document.querySelector('.slider-pencil');
// Thickness of pencil
ctx.lineWidth = pencil.value;

let pencilWidth = pencil.value;

// Updating the thickness of the pencil on changing pencil input slider
pencil.oninput = () => {
   // pencilWidth = pencil.value
   if(x==="random" || x==="circle"||x==="square")
    ctx.lineWidth = pencil.value;
}

// Eraser Input.......
const eraser = document.querySelector('.slider-eraser');
// Thickness of eraser
ctx.lineWidth = eraser.value;
let eraserWidth = eraser.value;

// Updating the thickness of the eraser on changing eraser input silder
eraser.oninput = () => {
    eraserWidth = eraser.value;
    if (active === 'eraser') {
        ctx.lineWidth = eraser.value;
    }
}


// Changing the strokestyle color
document.querySelector('.dropdown-color').addEventListener('click', (e) => {
    console.log(e.target.parentElement.getAttribute('value'));
    ctx.strokeStyle = e.target.parentElement.getAttribute('value');
    pen_style=ctx.strokeStyle
})
//for making a stroke

function start(e){
    painting=true;
//    e.draw

const DOMRect = board.getBoundingClientRect();
    x1 = e.clientX- DOMRect.left;
     y1= e.clientY - DOMRect.top;
    


}

function draw(e){
  
    if(!painting)return;
    x2=e.clientX- DOMRect.left
    y2=e.clientY- DOMRect.top

    
    if(x==="random"){

     ctx.lineCap="round"
    const DOMRect = board.getBoundingClientRect();
    ctx.moveTo(x1,y1)

    ctx.lineTo(e.clientX- DOMRect.left,e.clientY- DOMRect.top)
    ctx.stroke()
    x1=e.clientX- DOMRect.left
    y1=e.clientY- DOMRect.top

}

}



function stop(e,y){
    painting=false;
    const DOMRect = board.getBoundingClientRect();
    ctx.lineWidth = pencil.value;
  
    x2=e.clientX- DOMRect.left;
    y2=e.clientY- DOMRect.top;
    ctx.beginPath();
    if(y==="square"){
       
   ctx.moveTo(x1,y1)
   var a = Math.min(x2,  x1),
   b = Math.min(y2,y1),
   c = Math.abs(x2-x1),
   d = Math.abs(y2-y1);
    ctx.strokeRect(a,b,c,d);
}
  if(y==="triangle"){
   
    ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x1,y2);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x1,y2);
ctx.lineTo(x2,y2);
ctx.stroke();
ctx.beginPath()
}


   
    if(y==="circle"){
        ctx.beginPath();
        ctx.lineWidth = pencil.value;
      
        ctx.lineCap="round"
    
        var x_center=(x2+x1)/2;
        var y_center=(y2+y1)/2;
       
        const r=Math.pow(Math.pow(x2-x1,2)+Math.pow(y2-y1,2),0.5)/2;
        ctx.moveTo(x_center+r,y_center);
         ctx.arc(x_center,y_center,r,0,Math.PI*2)
         ctx.stroke()
       
    }
    if(y==="line"){
        ctx.moveTo(x1,y1)
        ctx.lineTo(x2,y2)
        ctx.stroke()
    }
    // let t=button
    // while(t>0){
    //     undoStack.pop()
    //     t-=1
    // }
      if( e.type!=="mouseout"){
          //undoStack.pop()
      
      undoStack.push(ctx.getImageData(0,0,board.width,board.height))
      index+=1
      //let t=button
  
     
      console.log(undoStack.length)
      }
    
}

function triangles(){
    
    button+=1
    console.log("trbut"+button)
    x="triangle"
    ctx.strokeStyle=pen_style
    ctx.lineWidth = pencil.width;
    board.addEventListener("mousedown",start)
board.addEventListener("mouseup",(e)=>stop(e,x))

}
function square(){
    button+=1
    console.log("sqbut"+button)
console.log("active")
    x="square"
    ctx.strokeStyle=pen_style
    ctx.lineWidth = pencil.width;

board.addEventListener("mousedown",start)

board.addEventListener("mouseup",(e)=>stop(e,x))
// draw a red line
}
function circle(){
    button+=1
    console.log("crsbut"+button)
    x="circle"
    ctx.strokeStyle=pen_style
    ctx.lineWidth = pencil.width;
    board.addEventListener("mousedown",start)
    board.addEventListener("mouseup",(e)=>stop(e,x))
   
   
}
function line(){
    button+=1
    x="line"
    console.log("linbut"+button)
    ctx.strokeStyle=pen_style
    ctx.lineWidth = pencil.width;
    board.addEventListener("mousedown",start)
   
    board.addEventListener("mouseup",(e)=>stop(e,x))
}
function random(){
    button+=1
    console.log("rbut"+button)
    x="random"
    ctx.strokeStyle=pen_style
    ctx.lineWidth = pencil.width;
    board.addEventListener("mousedown",start)
    board.addEventListener("mousemove",draw) 
    board.addEventListener("mouseup",(e)=>stop(e,x))
   
}
function eraser1(){
    x="eraser"
    ctx.lineWidth = eraserWidth;
    ctx.strokeStyle="white"
    board.addEventListener("mousedown",start)
    board.addEventListener("mousemove",draw) 
    board.addEventListener("mouseup",(e)=>stop(e,x))
   
}

document.querySelector('.square .fa-square').addEventListener('click',square)

document.querySelector('.circle .fa-circle').addEventListener('click',circle)
document.querySelector('.triangle .fa-play').addEventListener('click',triangles)



document.querySelector('.fa-marker').addEventListener('click',random)


document.querySelector('.fa-eraser').addEventListener('click',eraser1)
document.querySelector('.fa-heart').addEventListener('click',line)

// document.querySelector('.fa-eraser').addEventListener('click',random)
function clear_cvs(){
    ctx.clearRect(0,0,board.width,board.height)
    undoStack=[]
    index=-1
}
function undo(){
        
   
   if(index>0){
       index-=1
      let d= undoStack.pop()
      redoStack.push(d)
       ctx.putImageData(undoStack[index],0,0)
       r_index+=1
   }
   else {
       clear_cvs()
   }
}

function redo(){
    if(r_index>=0){
        index+=1
       
       console.log("redo me hu")
       ctx.putImageData(redoStack[r_index],0,0)

        let d=redoStack.pop()
        undoStack.push(d)
        console.log(redoStack[r_index])
        r_index-=1
    }
   
}
document.querySelector(".undo").addEventListener("click",undo)
document.querySelector(".redo").addEventListener("click",redo)

    
 
document.querySelector('.fa-trash').addEventListener('click', clear_cvs);

// Sticky Note

const stickyNote = document.querySelector('.sticky-note');
const note = document.querySelector('.note-text');

// Displayig the sticky note on the screen
document.querySelector('.fa-sticky-note').addEventListener('click', () => {
    stickyNote.style.display = 'block';
    document.querySelector('.fa-sticky-note').classList.add('active');
});

// Minimizing and maximimzing the sticky note
document.querySelector('.min-note').addEventListener('click', () => {
    //Minimize
    console.log('note');
    if (note.style.display === 'block')
        note.style.display = 'none';
    //Maximize
    else if (note.style.display = 'none')
        note.style.display = 'block';
});

// Closing the sticky note
document.querySelector('.close-note').addEventListener('click', () => {
    stickyNote.style.display = 'none';
    note.value = '';
    document.querySelector('.fa-sticky-note').classList.remove('active');
});

// Moving the sticky note

let stickyX_inital, stickyY_initial;
let stickyPressed = false;

// When mouse is pressed down on sticky-note
document.querySelector('.sticky-note').addEventListener('mousedown', (e) => {
    stickyX_inital = e.clientX;
    stickyY_inital = e.clientY;
    stickyPressed = true;
});

// Handling the event of mousemove
document.querySelector('.sticky-note').addEventListener('mousemove', (e) => {
    if (stickyPressed === true) {
        const stickyX_final = e.clientX;
        const stickyY_final = e.clientY;
        const distX = stickyX_final - stickyX_inital;
        const distY = stickyY_final - stickyY_inital;
        const DOMRect = stickyNote.getBoundingClientRect();
        stickyNote.style.top = DOMRect.top + distY + 'px';
        stickyNote.style.left = DOMRect.left + distX + 'px';
        stickyX_inital = stickyX_final;
        stickyY_inital = stickyY_final;
    }
});

let imageX_inital, imageY_initial;
let imagePressed = false;


// When mouse is pressed down on image-note
document.body.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('image-selected')) {
        imageX_inital = e.clientX;
        imageY_inital = e.clientY;
        imagePressed = true;
    }
});

// Handling the event of mousemove
document.body.addEventListener('mousemove', (e) => {
    if (e.target.classList.contains('image-selected')) {
        if (imagePressed === true) {
            const imageX_final = e.clientX;
            const imageY_final = e.clientY;
            const distX = imageX_final - imageX_inital;
            const distY = imageY_final - imageY_inital;
            const DOMRect = e.target.getBoundingClientRect();
            e.target.style.top = DOMRect.top + distY + 'px';
            e.target.style.left = DOMRect.left + distX + 'px';
            imageX_inital = imageX_final;
            imageY_inital = imageY_final;
        }
    }
});

document.addEventListener('mouseup', () => {
    console.log('mouseup');
    imagePressed = false;
    stickyPressed = false;
});


// Importing image
document.querySelector('.fa-image').addEventListener('click', () => {
    document.getElementById('image-input').click();
});

// When an image is selected
document.getElementById('image-input').addEventListener('change', (e) => {
    const image = e.currentTarget.files[0];
    // console.log(image);
    const img = document.createElement('img');
    img.className = 'image-selected';
    img.src = URL.createObjectURL(image);
    img.draggable = 'false';
    img.height = 350;
    img.width = 350;
    document.body.appendChild(img);
    img.onload = () => {
        URL.revokeObjectURL(this.src);
    }
});

// For Downloading
document.querySelector('.fa-download').addEventListener('click', () => {
    const el = document.createElement('a');
    el.href = board.toDataURL('image/jpeg', 0.5);
    console.log(el.href);
    el.download = 'image.jpg';
    el.click();
});

// // Undo..................
// let interval;



// // Ending undo
// document.querySelector('.undo').addEventListener('mouseup', () => {
//     clearInterval(interval);
// });

