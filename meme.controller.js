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
function onSetColor(val) {
    setColor(val)
    renderMeme()
}
function renderMeme() {
    renderMemeImg()
    renderMemeText()
}

function renderMemeImg() {
    const imgURL = getCurrImgUrl()
    let img = new Image()
    img.src = imgURL
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMemeText() {
    const meme = getMeme()
    const text = meme.lines[0].txt
    const color = meme.lines[0].color
    const size = meme.lines[0].size
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.fillText(text, 150, 40);
}

function onSetIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onSetDecreaseFont() {
    setDecreaseFont()
    renderMeme()
}

