// main.js

window.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById('party-horn-form');
  let slider = document.getElementById('volume-slider');
  let numInput = document.getElementById('volume-number');
  let airHorn = document.getElementById('radio-air-horn');
  let carHorn = document.getElementById('radio-car-horn');
  let hornSound = document.getElementById('horn-sound');
  let soundImage = document.getElementById('sound-image');
  let honkBtn = document.getElementById('honk-btn');
  slider.addEventListener('input', () => {
    numInput.value = slider.value;
    hornSound.volume = slider.value / 100;
    updateVolumeIcon();
  
    if(numInput.value == 0) { 
      honkBtn.setAttribute('disabled', true); 
    } else { 
      honkBtn.removeAttribute('disabled'); 
    }
  });
  
  numInput.addEventListener('input', () => {
    slider.value = numInput.value;
    hornSound.volume = slider.value / 100;
    updateVolumeIcon();
  
    if(numInput.value == 0) { 
      honkBtn.setAttribute('disabled', true); 
    } else { 
      honkBtn.removeAttribute('disabled'); 
    }
  });
  
  airHorn.addEventListener('change', () => {
    soundImage.src = "./assets/media/images/air-horn.svg";
    hornSound.src = "./assets/media/audio/air-horn.mp3";
  });
  
  carHorn.addEventListener('change', () => {
    soundImage.src = "./assets/media/images/car.svg";
    hornSound.src = "./assets/media/audio/car-horn.mp3";
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hornSound.play();
  });
})

function updateVolumeIcon() {
  let slider = document.getElementById('volume-slider');
  let volumeIcon = document.getElementById('volume-image');
  volumeIcon.src = formatVolumeIconPath(slider.value);
}

function formatVolumeIconPath(volumeValue) {
  if (volumeValue > 66) {
    iconLevel = "3";
  } else if (volumeValue > 33) {
    iconLevel = "2";
  } else if (volumeValue > 0) {
    iconLevel = "1";
  } else {
    iconLevel = "0";
  }
  return `./assets/media/icons/volume-level-${iconLevel}.svg`
}

module.exports = formatVolumeIconPath;
