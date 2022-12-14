'use strict'
let gElCanvas
let gCtx


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth - 20
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}

function onSetLineTxt(val) {
    setLineTxt(val)
    renderMeme()
}

function renderMeme(imgSrc) {
    let img = new Image()
    img.src = imgSrc
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    const meme = getMeme()
    const text = meme.lines[0].txt
    gCtx.font = "40px Arial";
    gCtx.fillText(text, 150, 40);

}

