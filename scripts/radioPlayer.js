export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
    radioCover__img = document.querySelector('.radio-cover__img'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioStop = document.querySelector('.radio-stop'),
    radioVolume = document.querySelector('.radio-volume'),
    radioVolIcon = document.querySelector('.radio-icon');

    const audio = new Audio();
    audio.type = 'audio/aac';
    radioStop.disabled = true;
    let saveValue = 1;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }
    
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);
        
        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        const urlImg = parent.querySelector('.radio-img').src;
        radioCover__img.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();

    };

    const swapIcon = () => {
        if (audio.volume < 0.5) {
            radioVolIcon.classList.remove('fa-volume-up');
            radioVolIcon.classList.add('fa-volume-down');
        } 
        else {
            radioVolIcon.classList.add('fa-volume-up');
            radioVolIcon.classList.remove('fa-volume-down');
        }
        if (audio.volume === 0) {
            radioVolIcon.className = 'fa fa-volume-off video-icon';
        } 
    }


    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        saveValue =  audio.volume;
        swapIcon();
    });
    audio.volume = 1;
    radioVolume.value =  audio.volume * 100;

    radioVolIcon.addEventListener('click', () => {
        
        if (audio.volume > 0) {
            audio.volume = 0;
            radioVolume.value = 0;
            swapIcon();
        } else {
            audio.volume = saveValue;
            radioVolume.value = saveValue * 100;
            swapIcon();
        }
    });
}