'use strict'
const gMemeWords = [

]
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
function onRenderSavedMeme() {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.editor-container').classList.add('hidden')
    const imgs = getUserSavedMeme()
    console.log(imgs)
    const strHTMLs = imgs.map(img => `
    <div class="item">
    <img onclick="onMemeSelect('${img.id}')" src=${img.url} alt="">
    <button onclick="onRemoveMeme('${img.id}')" class="remove-meme">X</button>
    </div>
    `)

    const elGrid = document.querySelector('.saved-gallery-grid')
    elGrid.innerHTML = strHTMLs.join('')


}
function onMemeSelect(memeId) {
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.saved-gallery-grid').classList.add('hidden')
    getMemeFromSaved(memeId)
    renderMeme()
}
function onRemoveMeme(imgId) {
    removeMeme(imgId)
    onRenderSavedMeme()
}
function onMoveGalleryPage() {
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.saved-meme-container').classList.add('hidden')
}

