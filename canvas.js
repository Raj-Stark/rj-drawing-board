const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pencilColor = document.querySelectorAll(".pencil-color");
const pencilWidthElem = document.querySelector(".pencil-width");
const eraserWidthElem = document.querySelector(".eraser-width");
const download = document.querySelector(".download");
const redo = document.querySelector(".redo");
const undo = document.querySelector(".undo");

let penColor = "black";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;


let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array

const tool = canvas.getContext("2d");

tool.strokeStyle = pencilColor;
tool.lineWidth = penWidth;

// Mouse down start new path

let mouseDown = false;

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  beginPath(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {

    let color = eraserTool ? eraserColor : penColor
    let width = eraserTool ? eraserWidth : penWidth

    drawStroke(e , color , width);
  }
});
canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  const url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;

});

const beginPath = (e) => {
  const canvasRect = canvas.getBoundingClientRect();
  const offsetX = e.clientX - canvasRect.left;
  const offsetY = e.clientY - canvasRect.top;
  tool.beginPath();
  tool.moveTo(offsetX, offsetY);
};

const drawStroke = (e , color , width) => {
    tool.strokeStyle = color;
    tool.lineWidth = width;
  const canvasRect = canvas.getBoundingClientRect();
  const offsetX = e.clientX - canvasRect.left;
  const offsetY = e.clientY - canvasRect.top;
  tool.lineTo(offsetX, offsetY);
  tool.stroke();
};

pencilColor.forEach((colorEle) => {
  colorEle.addEventListener("click", (e) => {
    const color = colorEle.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});


eraserBtn.addEventListener("click", (e) => {
  if (eraserTool) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});

download.addEventListener('click' , (e)=>{
    const url = canvas.toDataURL();

    const a = document.createElement("a");
    a.href = url;
    a.download = "rj-board.jpg";
    a.click();

})


undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    // track action

})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length-1) track++;
    // track action
  
})
