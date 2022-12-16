'use strict'
let gIdx = 0
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const STORAGE_KEY = 'memeDB'

// let gImgs = [
//     { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
//     { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
//     { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
//     { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
//     { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
//     { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
//     { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
//     { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
//     { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
//     { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
//     { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
//     { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] },
//     { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] },
//     { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] },
//     { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] },
//     { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
//     { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'cat'] },
//     { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cat'] },
// ]
let gUserSavedMeme = loadFromStorage(STORAGE_KEY) || []
let gImgs = []
let gMeme = {
    id: makeId(),
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 60,
            align: 'center',
            color: 'white',
            isFocus: true,
            isDrag: false,
            x: 200,
            y: 50
        },
        {
            txt: 'Secand Line',
            size: 60,
            align: 'center',
            color: 'white',
            isFocus: false,
            isDrag: false,
            x: 200,
            y: 400

        }
    ]
}

createImgs()

function getUserSavedMeme() {
    console.log('gUSerSavrd', gUserSavedMeme)
    return gUserSavedMeme
}

function createImgs() {
    for (var i = 1; i < 19; i++) {
        const img = createImg()
        gImgs.push(img)
    }
}
function createImg() {
    const img = {
        id: gIdx++,
        url: `imgs/${gIdx}.jpg`,
        keywords: ['funny', 'cat']
    }
    return img
}
function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}
function setLineTxt(val) {
    if (!val) return
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].txt = val
}
function setImgId(imgId) {
    gMeme.selectedImgId = imgId
}
function setColor(val) {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].color = val
}
function increaseFont() {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].size++
}
function setDecreaseFont() {
    let selectedLine = gMeme.selectedLineIdx
    gMeme.lines[selectedLine].size--
}
function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0

}

function isLineClicked(clickedPos) {
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    const distance = Math.sqrt((line.x - clickedPos.x) ** 2 + (line.y - clickedPos.y) ** 2)
    return distance <= line.size
}

function moveLine(pos) {
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    line.x = pos.x
    line.y = pos.y
}
function setLineDrag(isDrag) {
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    line.isDrag = isDrag
    line.isFocus = isDrag
}
function setLineFoucs(isFocus) {
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    line.isFocus = isFocus
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}

function clearText() {
    const lines = gMeme.lines
    lines.forEach(line => line.txt = '')
}

function saveMeme(imgURL) {
    gMeme.url = imgURL
    const savedMeme = { ...gMeme }
    savedMeme.id = makeId()
    gUserSavedMeme.push(savedMeme)
    console.log('Saved', gUserSavedMeme)
    saveMemeToStorage()
}

function saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gUserSavedMeme)
}

function getMemeFromSaved(memeId) {
    const meme = gUserSavedMeme.find(savedMeme => savedMeme.id === memeId)
    const memeToLoad = { ...meme }
    memeToLoad.id = gIdx++
    console.log('savedMeme', meme)
    gMeme = memeToLoad

}

function addLine() {
    const line = {
        txt: 'new line added',
        size: 60,
        align: 'center',
        color: 'white',
        isFocus: false,
        isDrag: false,
        x: 200,
        y: 200
    }
    if (gMeme.lines.length === 3) return
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = 2
}



function removeMeme(imgId) {
    const memeIdx = gUserSavedMeme.findIndex(meme => meme.id === imgId)
    gUserSavedMeme.splice(memeIdx, 1)
    saveMemeToStorage()
}


