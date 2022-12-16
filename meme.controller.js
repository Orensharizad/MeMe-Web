'use strict'
let gElCanvas
let gCtx
let gStartPos



function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    // resizeCanvas()
    addListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
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
}
function renderMemeImg() {
    const imgURL = getCurrImgUrl()
    let img = new Image()
    img.src = imgURL
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLine()

}
// function renderLine() {
//     const meme = getMeme()
//     const lines = meme.lines
//     lines.forEach((line, idx) => {

//         if (!idx) {
//             gCtx.beginPath()
//             gCtx.font = `${line.size}px impact`
//             gCtx.fillStyle = line.color
//             gCtx.strokeStyle = 'black'
//             gCtx.lineWidth = 2
//             gCtx.textAlign = 'center'
//             gCtx.textBaseline = 'middle'
//             gCtx.fillText(line.txt, line.x, line.y)
//             gCtx.strokeText(line.txt, line.x, line.y)
//             gCtx.closePath()
//         }
//         if (idx === 1) {
//             gCtx.beginPath()
//             gCtx.font = `${line.size}px impact`
//             gCtx.fillStyle = line.color
//             gCtx.strokeStyle = 'black'
//             gCtx.lineWidth = 2
//             gCtx.textAlign = 'center'
//             gCtx.textBaseline = 'middle'
//             gCtx.fillText(line.txt, line.x, line.y)
//             gCtx.strokeText(line.txt, line.x, line.y)
//             gCtx.closePath()
//         }
//         else {
//             gCtx.beginPath()
//             gCtx.font = `${line.size}px impact`
//             gCtx.fillStyle = line.color
//             gCtx.strokeStyle = 'black'
//             gCtx.lineWidth = 2
//             gCtx.textAlign = 'center'
//             gCtx.textBaseline = 'middle'
//             gCtx.fillText(line.txt, line.x, line.y)
//             gCtx.strokeText(line.txt, line.x, line.y)
//             gCtx.closePath()
//         }
//     })
// }
function renderLine() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {
        gCtx.beginPath()
        gCtx.font = `${line.size}px impact`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        if (idx === meme.selectedLineIdx) {
            gCtx.strokeRect(line.x - 200, line.y - 40, 450, 80);
        }
        gCtx.closePath()
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
    renderMeme()
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()

}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    setLineFoucs(true)
    // gStartPos = pos
    document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
    const meme = getMeme()
    const { selectedLineIdx, lines } = meme
    const isDrag = lines[selectedLineIdx].isDrag
    if (!isDrag) return
    const pos = getEvPos(ev)
    moveLine(pos)
    renderMeme()
}
function onUp() {
    setLineDrag(false)
    setLineFoucs(false)
    document.body.style.cursor = 'default'

}
function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    // if (TOUCH_EVS.includes(ev.type)) {
    //     console.log('ev:', ev)
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //     }
    // }
    return pos
}
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}
function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}
function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function onClearText() {
    clearText()
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onSaveMeme() {
    const memeURL = gElCanvas.toDataURL()
    saveMeme(memeURL)
}
