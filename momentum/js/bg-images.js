'use strict'
const prevSlide = document.querySelector('.slide-prev'),
        nextSlide = document.querySelector('.slide-next');

let randomNum = getRandomNum(),
    randomNumForAPI,
    data;

function getRandomNum(quantity = 20) {
    let num = Math.floor(Math.random() * quantity);
    return String(num).padStart(2, 0);
}

function getPrevUnsplashSlide() {
    randomNumForAPI = (--randomNum) % data.length >= 1 ?
        (randomNum) % data.length : 
            data.length-1;

    const img = new Image();
    img.src = data[randomNumForAPI].urls.full;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${data[randomNumForAPI].urls.full}')`
    }
}

function getNextUnsplashSlide() {
    randomNumForAPI = (++randomNum) % data.length >= 1 ?
        (randomNum) % data.length : 
            data.length-1;

    const img = new Image();
    img.src = data[randomNumForAPI].urls.full;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${data[randomNumForAPI].urls.full}')`
    }
}

function getPrevSlide() {
    randomNum = (randomNum - 1) % 20 >= 1 ?
        String((randomNum - 1) % 20).padStart(2, 0) : 
            20;
    setBg()
}

function getNextSlide() {
    randomNum = (++randomNum) % 20 >= 1 ?
        String((randomNum) % 20).padStart(2, 0) : 
            20;
    setBg()
}

function setBg() {
    const timeOfDay = getTimeOfDayVal,
        img = new Image();
        
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg")`;
    }

    prevSlide.addEventListener('click', getPrevSlide);
    nextSlide.addEventListener('click', getNextSlide); 
}

setBg()

// setBGImageFromGitHub()

function setBGImageFromUnsplash() {
async function getUnsplashPhoto() {
    try {
        const res = await fetch('https://api.unsplash.com/photos/?client_id=vDHX60JttbOdprmFDvYon5uLQj6gs9RCtO_Ky-y4Yg8');
        data = await res.json();

        const img = new Image();

        randomNumForAPI = +getRandomNum(data.length);
        img.src = data[randomNumForAPI].urls.full;
        img.onload = () => {
            document.body.style.backgroundImage = `url('${data[randomNumForAPI].urls.full}')`
        }
    } catch(e) {
        console.error(e);
        console.error(data);
    } 
}

prevSlide.addEventListener('click', getPrevUnsplashSlide);
nextSlide.addEventListener('click', getNextUnsplashSlide);

getUnsplashPhoto()
}

