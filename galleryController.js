'use strict'


function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <div class="item"><img onclick="onImgSelect(${img.id})" src=${img.url} alt=""></div>
    `)

    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strHTMLs.join('')

}

function onImgSelect(imgId) {
    setImgId(imgId)
    renderMemeImg()
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
}

function getCurrImgUrl() {
    const imgs = getImgs()
    const meme = getMeme()
    const currImg = imgs.find(img => img.id === meme.selectedImgId)
    return currImg.url
}


function onRenderRandomMeme() {
    const randomImgId = getRandomInt(1, 18)
    onImgSelect(randomImgId)
    const { selectedLineIdx, lines } = getMeme()
    lines[selectedLineIdx].txt = 'hello World'
    renderMeme()
}

