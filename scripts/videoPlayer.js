export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    videoVolume = document.querySelector('.video-volume'),
    videoVolIcon = document.querySelector('.video-icon');

    let saveValue = 1;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else videoPlayer.pause();

        toggleIcon();
    }
    
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const addZero = n => n < 10 ? '0' + n : n;

    const swapIcon = () => {
        if (videoPlayer.volume < 0.5) {
            videoVolIcon.classList.remove('fa-volume-up');
            videoVolIcon.classList.add('fa-volume-down');
        } 
        else {
            videoVolIcon.classList.add('fa-volume-up');
            videoVolIcon.classList.remove('fa-volume-down');
        }
        if (videoPlayer.volume === 0) {
            videoVolIcon.className = 'fa fa-volume-off video-icon';
        } 
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let seconsdsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let seconsdsTotal = Math.floor(duration % 60);
        
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(seconsdsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(seconsdsTotal)}`;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
        saveValue =  videoPlayer.volume;
        swapIcon();
    });
    videoVolume.value =  videoPlayer.volume * 100;

    videoVolIcon.addEventListener('click', () => {
        
        if (videoPlayer.volume > 0) {
            videoPlayer.volume = 0;
            videoVolume.value = 0;
            swapIcon();
        } else {
            videoPlayer.volume = saveValue;
            videoVolume.value = saveValue * 100;
            swapIcon();
        }
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });


    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            videoPlayer.pause();
        }
    };


}