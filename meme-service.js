'use strict'
let gIdx = 0
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] }

]
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red'
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
    gMeme.lines[0].txt = val
}
function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log(gMeme)
}


