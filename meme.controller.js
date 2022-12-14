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
    gElCanvas.width = elContainer.offsetWidth - 20
    renderMeme()

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
    renderLine()
}
function renderMemeImg() {
    const imgURL = getCurrImgUrl()
    let img = new Image()
    img.src = imgURL
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function renderLine() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {

        if (!idx) {
            gCtx.beginPath()
            gCtx.font = `${line.size}px impact`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'
            gCtx.fillText(line.txt, 200, 50)
            gCtx.strokeText(line.txt, 200, 50)
            gCtx.closePath()

        }
        if (idx === 1) {
            gCtx.beginPath()
            gCtx.font = `${line.size}px impact`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'
            gCtx.fillText(line.txt, 200, 400)
            gCtx.strokeText(line.txt, 200, 400)
            gCtx.closePath()


        }

    })
}
function onSetIncreaseFont() {
    increaseFont()
    renderMeme()
}
function onSetDecreaseFont() {
    setDecreaseFont()
    renderMeme()
}
function onSwitchLine() {
    switchLine()
}
