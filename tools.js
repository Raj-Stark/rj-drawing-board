const optionsCont = document.querySelector(".options-cont");

const toolsCont = document.querySelector(".tools-cont");
const pencilToolCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
const pencilBtn = document.querySelector(".pencil");
const eraserBtn = document.querySelector(".eraser");
const stickyBtn = document.querySelector(".sticky-notes");
const stickyNotes = document.querySelector(".sticky-cont");

const uploadBtn = document.querySelector(".upload");

optionsCont.addEventListener("click", (e) => {
  toolsCont.classList.add("scale-tools");

  const iconElem = optionsCont.children[0];
  iconElem.classList.toggle("fa-times");
  if (iconElem.classList.contains("fa-times")) {
    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.visibility = "hidden";
  } else {
    toolsCont.style.display = "flex";
  }
});

let pencilTool = false;
pencilBtn.addEventListener("click", () => {
  pencilTool = !pencilTool;

  if (pencilTool) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

let eraserTool = false;
eraserBtn.addEventListener("click", () => {
  eraserTool = !eraserTool;

  if (eraserTool) {
    eraserToolCont.style.visibility = "visible";
  } else {
    eraserToolCont.style.visibility = "hidden";
  }
});

stickyBtn.addEventListener("click", (e) => {
  const stickyHTML = `<div class="header-cont">
  <div class="minimize"></div>
  <div class="remove"></div>
</div>
<div class="note-cont">
  <textarea></textarea>
</div>`;

  createSticky(stickyHTML);
});

uploadBtn.addEventListener("click", (e) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change", (e) => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    const stickyHTML = `<div class="header-cont">
       <div class="minimize"></div>
       <div class="remove"></div>
     </div>
     <div class="note-cont">
     <img src=${url}>
     </div>`;

    createSticky(stickyHTML);
  });
});

const createSticky = (stickyHTML) => {
  const stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = `${stickyHTML}`;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (e) {
    dragAndDrop(stickyCont, e);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
};

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    // ! Important Property
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
