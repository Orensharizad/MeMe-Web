'use strict'
let gIdx = 0
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


let gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
]
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 60,
            align: 'center',
            color: 'white',
            isFocus: true
        },
        {
            txt: '',
            size: 60,
            align: 'center',
            color: 'white',
            isFocus: false
        }
    ]
}
function getImgs() {
    return gImgs
}
function getMeme() {
    return gMeme
}
function setLineTxt(val) {
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
    // if (gCurrLine === 0) gCurrLine = 1
    // else gCurrLine = 0
    // console.log(gCurrLine)
    // gMeme.lines.forEach(line => line.isFocus = !isFocus)
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++
    } else {
        gMeme.selectedLineIdx = 0
    }

}
