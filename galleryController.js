'use strict'


function renderGallery() {
    const imgs = getImgs()
    console.log(imgs)
    const strHTMLs = imgs.map(img => `
    <div class="item"><img onclick="onImgSelect(${img.id},this)" src=${img.url} alt=""></div>
    `)

    const elGrid = document.querySelector('.grid-container')
    console.log(elGrid)
    elGrid.innerHTML = strHTMLs.join('')

}

function onImgSelect(imgId, elImg) {
    setImg(imgId)
    console.log('elimg', elImg)
    const imgSrc = elImg.src
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    renderMeme(imgSrc)
}