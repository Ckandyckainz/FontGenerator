let mcan = document.getElementById("maincanvas");
let mctx = mcan.getContext("2d");
mcan.height = window.innerHeight*0.7;
mcan.width = mcan.height;
let mcw = mcan.width;
let mch = mcan.height;
let mca = 15;
let enterDiv = document.getElementById("enterdiv");
let genDiv = document.getElementById("generatediv");
let instruc = document.getElementById("instructions");
let textInput = document.getElementById("textinput");
let doneButton = document.getElementById("donebutton");
let generateButton = document.getElementById("generatebutton");

class LetterPath{
    constructor(l, path){
        this.l = l;
        this.path = path;
    }
}

class Font{
    constructor(letterPaths){
        this.letterPaths = [];
        this.imgdts = [];
    }
}

genDiv.style.display = "none";
mctx.lineWidth = mcw/20;
let counter = 0;
let mouseDown = false;
let downLong = false;
let l = 97;
let letterPaths = [];
let path = [];
instruc.innerText = "draw ".concat(String.fromCharCode(l));

function doneButtonClicked(){
    downLong = false;
    mctx.clearRect(0, 0, mcw, mch);
    letterPaths.push(new LetterPath(l, path));
    path = [];
    l ++;
    instruc.innerText = "draw ".concat(String.fromCharCode(l));
}
doneButton.addEventListener("click", doneButtonClicked);

function mouseDownEvent(){
    mouseDown = true;
}
mcan.addEventListener("mousedown", mouseDownEvent);

function mouseUpEvent(){
    mouseDown = false;
    downLong = false;
}
mcan.addEventListener("mouseup", mouseUpEvent);

function mouseMoveEvent(event){
    if (mouseDown) {
        if (counter%3 == 0) {
            let x = event.x-mca;
            let y = event.y-mca;
            let a = undefined;
            let m = undefined;
            if (downLong) {
                let oldX = path[path.length-1].x;
                let oldY = path[path.length-1].y;
                let dx = oldX-x;
                let dy = oldY-y;
                mctx.beginPath();
                mctx.moveTo(oldX, oldY);
                mctx.lineTo(x, y);
                mctx.stroke();
                a = Math.atan2(dy, dx);
                m = Math.sqrt((dx)**2+(dy)**2);
            } else {
                downLong = true;
            }
            path.push({x: x, y: y, a: a, m: m});
        }
        counter ++;
    }
}
mcan.addEventListener("mousemove", mouseMoveEvent);