<template>
  <div class="flex flex-col h-full bg-gray-200 text-black fixed w-1/6">
    <div class="align-item-center mt-2 mb-2">
      <div class="w-5/6">
        <div class="my-2 pr-2 item-center">
          <h1 class="sm:text-2xl lg:text-4xl font-bold">Test</h1>
        </div>
        <hr class="bg-gray-500 h-0.5" />
        <div class="item-center mt-2">
          <ul class="align-item-center flex-col w-5/6">
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">home</i>
              </span>
              <a href="#" class="mt-1">
                <span class="head-name-botton-bar">Home</span>
              </a>
            </li>
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">playlist_play</i>
              </span>
              <a href="#" class="mt-1">
                <span class="head-name-botton-bar">Playlist</span>
              </a>
            </li>
            <li
              class="icon-defult-outside hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              <span>
                <i class="material-icons icon-defult-inside">favorite</i>
              </span>
              <a href="#" class="item-center">
                <span class="head-name-botton-bar">Favorite</span>
              </a>
            </li>
          </ul>
        </div>
        <hr class="bg-gray-500 h-0.5" />
        <div class="mt-3 ml-3 flex flex-col">
          <div class="head-title-for-bar">
            <p>Now Playing</p>
          </div>
          <div>
            <div
              class="item-center my-3 rounded-full relative"
            >
              <img
                src="../assets/ImgTmp1.png"
                class="rounded-full animate-spin"
                width="100px"
              />
              <p class="w-5 h-5 bg-white rounded-full absolute"></p>
            </div>
            <div
              class="item-center flex-col mt-6 rounded-full relative"
            >
              <p class="head-name-music-bar">
                「その着せ替え人形は恋をする」その着せ替え人形は恋をする」
              </p>
              <p class="text-xs mt-3">My Dress-Up Darling</p>
            </div>
          </div>
        </div>

        <div class="item-center flex-col my-3">
          <div class="mt-1 relative w-full">

            <div @click="seek($event)" ref="progress" class="h-1 bg-grey-dark cursor-pointer bg-gray-500 rounded-full">
              <div class="flex w-full justify-end h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full relative " :style="{'width' : step + '%'}"></div>
            </div>

            <div class="flex w-full justify-start h-1 rounded-full relative" :style="{'width' : step + '%'}">
              <span
                id="progressButtonTimer"
                class="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 absolute pin-r pin-b -mt-2.5 rounded-full shadow"
              ></span>
            </div>

            <div class="flex flex-row w-full mt-1">
              <div
                class=" text-ss text-gray-500 w-full font-semibold"
              >
                <p>{{ timer }}</p>
                <!-- <p>0.00</p> -->
              </div>
              <div class="text-ss text-right text-gray-500 w-full font-semibold">
                <p>{{ duration }}</p>
                <!-- <p>4.36</p> -->
              </div>
          </div>
          </div>

          <div class="flex justify-between items-center w-full my-3">
            <div>
              <i class="material-icons icon-defult-inside">shuffle</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">fast_rewind</i>
            </div>
            <div @click="seek(-10)">
              <i class="material-icons icon-defult-inside">replay_10</i>
            </div>
            <div
              class="text-white w-10 h-10 item-center bg-gray-500 rounded-full shadow-lg"
            >
              <i  v-if="!pauseTrack" @click="playTest()" class="material-icons icon-defult-inside-play text-2xl"
                >play_arrow</i
              >
              <i v-else @click="pause()" class="material-icons icon-defult-inside-play text-2xl"
                >pause</i
              >
            </div>
            <div @click="seek(10)">
              <i class="material-icons icon-defult-inside">forward_10</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">fast_forward</i>
            </div>
            <div>
              <i class="material-icons icon-defult-inside">all_inclusive</i>
            </div>
          </div>
          
        </div>

        <div class="mt-3 ml-3 flex flex-col">
          <div class="head-title-for-bar">
            <p>Next play</p>
          </div>

          <!-- when call api show with loop -->
          <div class="flex flex-col justify-start overflow-auto h-36 mb-5" >
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              1.ロクデナシ / Rokudenashi
            </p>
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              2.BLACKPINK - '불장난
            </p>
             <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              3.ロクデナシ / Rokudenashi
            </p>
            <p
              class="head-name-music-bar-List hover:text-black hover:bg-yellow-200 hover:font-bold"
            >
              4.BLACKPINK - '불장난
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var cursor = document.getElementById('cursor');
//           document.addEventListener('mousemove',function(e){ 
//             cursor.style.left = e.clientX + "px";
//             cursor.style.top = e.clientX + "px";})
//           ;
import {
  ref,
  // ,reactive
  // // ,computed
} from "vue";

import {
  Howl,
  //  Howler
} from "howler";

export default {
  setup() {
    // netstat -ano | findstr 8080
    // taskkill /F /PID 8080
    // const posx = ref(null);
        const step =  ref(0);
        const nextButton = ref(true);
        const prevButton = ref(true);
        // const random = ref(false);
        // const repeat = ref(false);
        const index = ref(0);
        const duration = ref('00:00');
        const timer = ref('00:00');
        const pauseTrack = ref(false);
        const progress = ref(null);
        const sound = ref(null)
        // const volBar = ref(null);
        // const sliderBtn = ref(0);
        // const sliderBtnVol = ref(null);
        // const volumeProgress = ref(90);
        // const mutePlayer = ref(false);

        // const state = reactive({
        //     audioPlaying: []
        // })
        const audios = ref([]);
    // const sliderBtn = ref(0);

    function stepFunction() {
      var seek = sound.value.seek();
      timer.value = formatTime(Math.round(seek));
      step.value = (seek * 100) / sound.value.duration();
      if (sound.value.playing()) {
        window.requestAnimationFrame(stepFunction.bind(this));
      }
    }
    function formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
      return (
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
      );
    }
    function playTest() {
      

      var audio = audios.value[index.value];
      if (audio) {
        // sound = audio.howl
      }else{
      // state.audioPlaying[index.value] = false;   
      console.log("เข้า")
      sound.value = new Howl({
      src:["http://20.213.128.1:8086/api/trackstreaming/getcontent/testmusic115.mp3"],
      // src: ["http://localhost:8086/api/trackstreaming/getcontent/testmusic113.mp3"],
      html5: true,
      onplay: function () {
        pauseTrack.value = true;
        nextButton.value = true;
        prevButton.value = true;
        //แค่นำมาเทสยังไม่ได้ประกอบร่าง
        duration.value = formatTime(sound.value.duration());
        window.requestAnimationFrame(stepFunction.bind(this));
      },
      onpause: function () {
        pauseTrack.value = false;
      },
      onseek: function () {
        sound.value.seek();
         window.requestAnimationFrame(stepFunction.bind(this));
      },
    });}
      console.log(sound.value.play())
      sound.value.play();
      // state.audioPlaying[index.value] = true;
    }
    function pause() {
      if (sound.value) {
        sound.value.pause();
        pauseTrack.value = false;
        // state.audioPlaying[index.value] = false;   
      }
    }
    function seek(event) {
      // var sound = audios.value[index.value].howl;
      if (sound.value) {
        var jumptime; 
        event.type == 'click'? 
            jumptime = sound.value.duration() * (event.offsetX / progress.value.clientWidth) :
            jumptime = sound.value.seek() + event;
        console.log(jumptime);
        if (sound.value.playing()) {
          sound.value.pause();
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration()
            ? sound.value.seek(sound.value.duration()-1)
            : sound.value.seek(jumptime);
          sound.value.play();
        } else {
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration()
            ? sound.value.seek(sound.value.duration())
            : sound.value.seek(jumptime);
        }
      }
    }
    const posx = ref(null)
    function test(event){
      console.log(event.clientX,event.clientY,event.clientWidth);
      posx.value =  posx.value+ 1;
    }
    function move(event){
      console.log(event.clientX,event.clientY)
      var cursor = document.getElementById('cursor')
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
     
    }
    return { playTest,pause,duration,formatTime,audios,pauseTrack,
            timer,step,stepFunction,seek,progress
            ,test,posx,move
            };
  },    
};
</script>

<style>
#progressButtonTimer,
#progressButtonVolume {
  margin-top: -9px;
  right: -8px;
}

@media screen and (max-width: 768px) {
  #progressButtonTimer,
  #progressButtonVolume {
    margin-top: -8px;
    right: -7px;
  }
}
</style>
