'use strict'

import {quotesFunc} from "./quotes.js";

const settingsBtn = document.querySelector('.settings-button'),
      settingsBlock = document.querySelector('.settings'),
      settingsCloseBtn = document.querySelector('.settings__close'),
      appLangRadios = document.querySelectorAll('input[name="lang"]'),
      appHideBlocksChekboxes = document.querySelectorAll('.hide-block input[type="checkbox"]'),
      imagesAPISelect = document.querySelector('#images-api');


settingsBtn.addEventListener('click', () => {
    settingsBlock.classList.toggle('open');
})
settingsCloseBtn.addEventListener('click', () => {
    settingsBlock.classList.remove('open');
})

// change language
appLangRadios.forEach(item => {
    item.addEventListener('change', () => changeLanguage())
})

function changeLanguage() {
    if(appLangRadios[1].checked) {
        timeGreeting('ru-Ru', translate.russian.greetings.greeting, translate.russian.greetings.day, translate.russian.greetings.placeholder)
        weatherFunc('ru', translate.russian.weather.wind, translate.russian.weather.windMS, translate.russian.weather.humidity, translate.russian.weather.inputErr, translate.russian.weather.defaulCity)
        quotesFunc('./js/quotes_ru.json')
        translateSettings(translate.russian.settings.languageTitle, translate.russian.settings.hideBlocksTitle, translate.russian.settings.eng, translate.russian.settings.rus, translate.russian.settings.hiddenBlocksLabels, translate.russian.settings.imagesAPITitle)
    } else if (appLangRadios[0].checked) {
        timeGreeting()
        weatherFunc()
        quotesFunc()
        translateSettings()
    }
}

// hide blocks

appHideBlocksChekboxes.forEach(item => {
    item.addEventListener('change', () => {
        hideBlock(item.name)
    })
})

function hideBlock(target) {
    let targetBlock = document.querySelector(`.${target}`);
    
    targetBlock.classList.contains('hidden') ?
        targetBlock.classList.remove('hidden') :
            targetBlock.classList.add('hidden');

}

// set language from localStorage if available
function setSettingsFromStorage() {
    // set language
    if (localStorage.getItem('language') === 'rus') {
        appLangRadios[1].checked = true;
    } else if (localStorage.getItem('language') === 'eng') {
        appLangRadios[0].checked = true;
    }
    // set hidden blocks
    appHideBlocksChekboxes.forEach(item => {
        if (localStorage.getItem(item.name) === item.name) {
            item.checked = true;
        }
    })
    // set images api 
    if(localStorage.getItem('api') === 'github') {
        imagesAPISelect.value = 'github';
        changeImagesAPI();
    } else if (localStorage.getItem('api') === 'unsplash') {
        imagesAPISelect.value = 'unsplash';
        changeImagesAPI();
    }
}

// set settings after reload 
setSettingsFromStorage()

appHideBlocksChekboxes.forEach(target => {
    if(target.checked) {
        hideBlock(target.name)
    }
})

changeLanguage();

// Choose images API

imagesAPISelect.addEventListener('change', changeImagesAPI)

function changeImagesAPI() {
    if(imagesAPISelect.value === 'github') {
        prevSlide.removeEventListener('click', getPrevUnsplashSlide);
        nextSlide.removeEventListener('click', getNextUnsplashSlide);
        setBg();
    } else if (imagesAPISelect.value === 'unsplash') {
        prevSlide.removeEventListener('click', getPrevSlide);
        nextSlide.removeEventListener('click', getNextSlide); 
        setBGImageFromUnsplash();
    }
}

// change Language in settings popup
function translateSettings(
    langTitleVal = translate.english.settings.languageTitle,
    hideTitleVal = translate.english.settings.hideBlocksTitle,
    engLangVal = translate.english.settings.eng,
    rusLangVal = translate.english.settings.rus,
    hideBlocksLabelsVal = translate.english.settings.hiddenBlocksLabels,
    sourceImages = translate.english.settings.imagesAPITitle,
    ) {
    const langTitle = document.querySelector('.language__text'),
          hideTitle = document.querySelector('.hide-title'),
          sourceImagesTitle = document.querySelector('.images-path-title'),
          hideBlocksLabels = document.querySelectorAll('.hide-block label'),
          engLang = document.querySelector('.eng label'),
          rusLang = document.querySelector('.rus label');

    langTitle.textContent = langTitleVal;
    hideTitle.textContent = hideTitleVal;
    sourceImagesTitle.textContent = sourceImages;
    engLang.textContent = engLangVal;
    rusLang.textContent = rusLangVal;

    hideBlocksLabels.forEach((item, i) => {
        item.textContent = hideBlocksLabelsVal[i];
    })
}

// save settings before page reload
window.addEventListener('beforeunload', () => {
    // save language
    appLangRadios.forEach(item => {
        if(item.checked) {
            localStorage.setItem('language', item.value)
        }
    })
    // save hidden blocks
    saveSettingsToStorage()
    // save images API
    saveImagesApiToLocalStorage()
})

function saveSettingsToStorage() {
    appHideBlocksChekboxes.forEach(item => {
        if (item.checked) {
            localStorage.setItem(item.name, item.name)
        } else if (!item.checked) {
            localStorage.removeItem(item.name)
        }
    })
}

// save img API to localsorage
function saveImagesApiToLocalStorage() {
    if(imagesAPISelect.value === 'github') {
        localStorage.setItem('api', 'github');
    } else if (imagesAPISelect.value === 'unsplash') {
        localStorage.setItem('api', 'unsplash');
    }
}

console.log(`
Ваша оценка - 142 балла

Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) в качестве источника изображений может использоваться Flickr API 

2) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото 

3) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным 

Выполненные пункты:
1) время выводится в 24-часовом формате, например: 21:01:00 

2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) 

3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" 

4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток 

5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется 

6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз 

7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) 

8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) 

9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения 

10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage 

11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел 

12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) 

13) при загрузке страницы приложения отображается рандомная цитата и её автор 

14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) 

15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause 

16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play 

17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) 

18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем 

19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. 

20) добавлен прогресс-бар в котором отображается прогресс проигрывания 

21) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека 

22) над прогресс-баром отображается название трека 

23) отображается текущее и общее время воспроизведения трека 

24) есть кнопка звука при клике по которой можно включить/отключить звук 

25) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука 

26) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте 

27) переводится язык и меняется формат отображения даты 

28) переводится приветствие и placeholder 

29) переводится прогноз погоды в т.ч описание погоды и город по умолчанию 

30) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая 

31) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется 

32) в качестве источника изображений может использоваться Unsplash API 

33) в настройках приложения можно указать язык приложения (en/ru или en/be)  

34) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API 

35) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал 

36) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их 

37) настройки приложения сохраняются при перезагрузке страницы 

`)