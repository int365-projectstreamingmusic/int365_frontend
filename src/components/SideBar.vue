
<template>
  <div v-show="sideBarShow" class=" bg-neutral-50 fixed inset-y-0 left-0 w-75 no-scrollbar overflow-y-scroll   z-50">
    <div class="sticky top-0 z-20">
      <div class="flex flex-row items-center justify-center space-x-5 bg-neutral-50">
        <span @click="hideSideBar()"
          class="material-icons text-3xl mt-7 pb-0 cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
        <div class="font-sansation-light text-3xl text-center mt-7 bg-neutral-50 text-black  pb-0  sticky top-0">GARDEN
        </div>
      </div>
      <div class="h-8 bg-gradient-to-b from-neutral-50 "></div>
    </div>
    <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">menu</div>
    <div class="py-7">
      <router-link to="/" @click="pathPage('/')">
        <div
          class="mb-4 pl-10 border-x-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2 ">
            <span class="material-icons"
              v-bind:class="(this.path == '/') ? 'text-violetlight' : 'text-blackcoal'">home</span>
            <div class="font-sansation-regular grid content-center text-base"
              v-bind:class="(this.path == '/') ? 'text-violetlight ' : 'text-blackcoal'">Home</div>
          </div>
        </div>
      </router-link>
      <router-link to="/playlist" @click="pathPage('/playlist')">
        <div
          class="mb-4 pl-10 border-x-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2">
            <span class="material-icons"
              v-bind:class="(this.path == '/playlist') ? 'text-violetlight' : 'text-blackcoal'">playlist_play</span>
            <div class="font-sansation-regular grid content-center text-base"
              v-bind:class="(this.path == '/playlist') ? 'text-violetlight' : 'text-blackcoal'">Playlist</div>
          </div>
        </div>
      </router-link>
      <router-link to="/favorite" @click="pathPage('/favorite')" v-if="authenticated">
        <div class=" pl-10 border-l-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2">
            <span class="material-icons"
              v-bind:class="(this.path == '/favorite') ? 'text-violetlight' : 'text-blackcoal'">grade</span>
            <div class="font-sansation-regular grid content-center text-base"
              v-bind:class="(this.path == '/favorite') ? 'text-violetlight' : 'text-blackcoal'">Favorite</div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-show="mediaPlayer">
      <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">now playing</div>
      <div class="flex flex-row justify-center pt-8">
        <div class="bg-neutral-50 rounded-full h-8 w-8 z-10 self-center absolute"></div>
        <img :src="url + 'api/streaming/image/' + playImage" class="rounded-full h-44 w-44 drop-shadow-xl animate-pulse"
          style="object-fit: cover;" />
      </div>
      <div v-for="nameMusics in nameMusic" :key="nameMusics"
        class="font-sansation-bold text-blackcoal px-7 py-5 text-sm text-center text-shadow-xl">{{ nameMusics }}</div>
      <div class="px-7 w-75">
        <div @click="seek($event)" ref="progress" class="h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-400">
          <div class="flex w-full justify-end h-1 bg-gradient-to-r from-violet-500 to-violet-700 rounded-full "
            :style="{ 'width': step + '%' }"></div>
        </div>
        <div class="flex justify-end h-1 rounded-full ml-3" :style="{ 'width': step + '%' }">
          <span
            class="w-4 h-4 bg-gradient-to-r from-violet-500 to-violet-700 absolute -mt-2.5 rounded-full shadow"></span>
        </div>
      </div>
      <div class="flex justify-between px-7 py-2 font-sansation-regular text-sm text-black">
        <div>
          <p>{{ timer }}</p>
        </div>
        <div>
          <p>{{ duration }}</p>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center px-9 text-blackcoal cursor-pointer select-none">
        <span @click="shuffle()" class="material-icons hover:text-violetdark transition delay-75">shuffle</span>
        <div class="item-center">
          <span v-if="emptyPlayed" class="material-icons text-gray-400 cursor-not-allowed">fast_rewind</span>
          <span v-else @click="previous()"
            class="material-icons hover:text-violetdark transition delay-75 ">fast_rewind</span>
        </div>
        <span @click="seek(-10)" class="material-icons hover:text-violetdark transition delay-75">replay_10</span>
        <div
          class="text-white w-10 h-10 item-center bg-gray-500 rounded-full shadow-lg hover:bg-violetdark transition delay-75">
          <span v-if="!pauseTrack" @click="playTest()" class="material-icons text-3xl">play_arrow</span>
          <span v-else @click="pause()" class="material-icons text-3xl">pause</span>
        </div>
        <span @click="seek(10)" class="material-icons hover:text-violetdark transition delay-75">forward_10</span>
        <span @click="next('NEXT')" class="material-icons hover:text-violetdark transition delay-75">fast_forward</span>
        <div class="item-center w-6 place-content-center">
          <span v-if="loopType == 'NOTLOOP'" @click="loop('ONLYONE')"
            class="material-icons hover:text-violetdark transition delay-75">all_inclusive</span>
          <span v-else-if="loopType == 'ONLYONE'" @click="loop('LOOPALL')"
            class="text-base place-items-center font-sansation-bold text-violetdark">one</span>
          <span v-else-if="loopType == 'LOOPALL'" @click="loop('NOTLOOP')"
            class="text-base place-items-center font-sansation-bold text-violetdark">All</span>
        </div>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <div class="font-sansation-bold text-zinc-500 pl-7 text-sm py-3">next play</div>
        <div class="flex flex-row items-center space-x-2" @mouseover="showVolBar = true"
          @mouseleave="showVolBar = false">
          <div class="cursor-pointer pt-2" @click="mute()">
            <span v-if="mutePlayer" class="material-icons text-xl text-red-600"
              @mouseover="showVolBar = false">volume_mute</span>
            <span v-else class="material-icons text-xl text-violet-600">volume_up</span>
          </div>
          <div class="w-28" v-show="showVolBar">
            <div @click="volume($event)" ref="volBar"
              class=" mt-1 h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-500 relative">
              <div class="flex justify-end h-1 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full relative"
                :style="{ 'width': volumeProgress + '%' }"></div>
            </div>
            <div class="flex justify-end h-1 mb-1 rounded-full -mt-2" :style="{ 'width': volumeProgress + '%' }">
              <span id="progressButtonVolume"
                class="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 absolute rounded-full shadow"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="px-10 mb-10 tracking-wide space-y-1 cursor-pointer">
        <div class=" flex flex-row text-ss hover:text-violetdark font-sansation-regular space-x-2"
          v-for="(value, index) in playApi" :key="index">
          <div v-if="(index + 1) == 1" class="flex flex-row space-x-2 items-center">
            <div>{{ index + 1 }}</div>
            <div class="truncate w-48 " @click="next(index)">{{ value.nameShow }}</div>
            <span class="material-icons text-sm text-neutral-50 hover:text-red-500"
              @click="deleteMusic(index)">close</span>
          </div>
          <div v-else class="flex flex-row space-x-2">
            <div>{{ index + 1 }}</div>
            <div class="truncate w-48" @click="next(index)">{{ value.nameShow }}</div>
            <span class="material-icons text-sm text-neutral-50 hover:text-red-500"
              @click="deleteMusic(index)">close</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!mediaPlayer">
      <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">play now</div>
      <div
        class="font-sansation-bold text-zinc-400 border-zinc-300 border border-dashed mx-9 my-5 py-7 text-center text-ss ">
        Click music And <br> i will play music for you! </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions, useStore } from "vuex";
import {
  ref,
} from "vue";
import {
  Howl,
  Howler
} from "howler";
export default {
  props: {
    music: { type: Object, required: false },
    playlist: { type: Array, require: false },
    addQueue: { type: Object, required: false },
  },
  watch: {
    playlist: function (newVal) {
      if (this.checkPlayer()) {
        this.$store.dispatch('homepage/setMediaPlayer', true)
        this.playApi.splice(0, 0, newVal[0])
        this.fristPlayed = true
        this.stopPlayer()
        for (let index = 0; index < newVal.length; index++) {
          if (index != 0) {
            this.playApi.push(newVal[index])
          }
        }
      } else {
        for (let index = 0; index < newVal.length; index++) {
          this.playApi.push(newVal[index])
        }

      }
    },
    music: function (newVal) {
      if (this.checkPlayer()) {
        this.$store.dispatch('homepage/setMediaPlayer', true)
        this.playApi.splice(0, 0, newVal)
        this.fristPlayed = true
        this.stopPlayer()

      } else {
        this.playApi.push(newVal)

      }
    },
    addQueue: function (newVal) {
      if (this.checkPlayer()) {
        this.$store.dispatch('homepage/setMediaPlayer', true)
        this.playApi.splice(0, 0, newVal)
        this.fristPlayed = true
        this.stopPlayer()
      } else {
        this.playApi.push(newVal)
      }
    }
  },
  computed: {
    ...mapGetters({
      mediaPlayer: 'homepage/mediaPlayer',
      sideBarShow: 'homepage/sideBarShow',
      path: 'homepage/path',
      authenticated: "authentication/authenticated",
    })
  },
  data() {
    return {
      showVolBar: false,
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`
    }
  },
  methods: {
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar'
    }),
    pathPage(path) {
      this.$store.commit('homepage/SET_PATH', path)
    }
  },
  mounted() {
    this.$store.commit('homepage/SET_PATH', window.location.pathname)
  },
  setup() {
    const step = ref(0);
    const nextButton = ref(true);
    const prevButton = ref(true);
    const duration = ref('00:00');
    const timer = ref('00:00');
    const pauseTrack = ref(false);
    const progress = ref(null);
    const sound = ref(null)
    const volBar = ref(null);
    const sliderBtnVol = ref(null);
    const volumeProgress = ref(60);
    const mutePlayer = ref(false);
    const playNow = ref(null)
    const playImage = ref(null)
    const playApi = ref([])
    const played = ref([])
    const fristPlayed = ref(true)
    const emptyPlayed = ref(true)
    const loopType = ref('NOTLOOP')
    const nameMusic = ref([])
    const hisAndView = ref(true)
    const store = useStore();
    const audios = ref([]);
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
    function loop(param) {
      if (param == 'ONLYONE') {
        loopType.value = 'ONLYONE'
      } else if (param == 'LOOPALL') {
        loopType.value = 'LOOPALL'
      } else if (param == 'NOTLOOP') {
        loopType.value = 'NOTLOOP'
      }
    }

    function checkPlayer() {
      return sound.value == null ? true : false
    }
    function stopPlayer() {
      if (sound.value != null) {
        sound.value.stop()
        sound.value = null
      }
      playTest()
    }
    function playTest() {
      if (sound.value == null) {
        if (fristPlayed.value == true && sound.value == null) {
          nameMusic.value[0] = playApi.value[0].nameShow
          playNow.value = playApi.value[0].name ? playApi.value[0].name : ''
          playImage.value = playApi.value[0].image
          played.value.push(playApi.value[0])
          playApi.value = playApi.value.filter((m) => m != playApi.value[0])
          fristPlayed.value = false
          played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
        }
        if (hisAndView.value == true) {
          hisAndView.value = false
          let name = playNow.value
          store.dispatch("allsong/addHisAndView", name);
        }
        sound.value = new Howl({
          src: [`${process.env.VUE_APP_MY_ENV_VARIABLE}api/streaming/getContent/${playNow.value}`],
          html5: true,
          onplay: function () {
            pauseTrack.value = true;
            nextButton.value = true;
            prevButton.value = true;
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
          onend: function () {
            next();
          },
        });
      }
      sound.value.play();
    }
    function pause() {
      if (sound.value) {
        sound.value.pause();
        pauseTrack.value = false;
      }
    }

    function shuffle() {
      var round = playApi.value.length
      var oldPlay = playApi.value
      var random = []
      for (let index = 0; index < round; index++) {
        random.push(oldPlay[Math.floor(Math.random() * oldPlay.length)])
        oldPlay = oldPlay.filter((m) => m != random[index])
      }
      playApi.value = random
    }
    function deleteMusic(index) {
      playApi.value = playApi.value.filter((m) => m != playApi.value[index])
    }
    function previous() {
      if (played.value.length != 0) {
        playApi.value.splice(0, 0, { name: playNow.value, nameShow: played.value[played.value.length - 1].nameShow, image: played.value[played.value.length - 1].image })
        store.dispatch("allsong/addHisAndView", playNow.value);
        playNow.value = played.value[played.value.length - 2].name
        playImage.value = played.value[played.value.length - 2].image
        nameMusic.value[0] = played.value[played.value.length - 2].nameShow
        played.value = played.value.filter((m) => m != played.value[played.value.length - 1])
        played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
        loopType.value = 'NOTLOOP'
      }
      sound.value == null ? '' : sound.value.stop()
      sound.value = null
      playTest();
    }
    function next(index) {
      if (index == 'NEXT') {
        loopType.value == 'LOOPALL' ? loopType.value = 'LOOPALL' : loopType.value = 'NOTLOOP'
        next()
      } else {
        if (sound.value && index == undefined) {
          if (playApi.value.length != 0) {
            if (loopType.value != 'ONLYONE') {
              nameMusic.value[0] = playApi.value[0].nameShow
              playNow.value = playApi.value[0].name
              playImage.value = playApi.value[0].image
              played.value.push(playApi.value[0])
              playApi.value = playApi.value.filter((m) => m != playApi.value[0])
            }
          } else {
            loopType.value == 'LOOPALL' ? playApi.value = played.value : playNow.value = null;
            if (loopType.value != 'ONLYONE') {
              played.value = []
              next(0)
            }
          }
        } else {
          loopType.value == 'LOOPALL' ? loopType.value = 'LOOPALL' : loopType.value = 'NOTLOOP'
          nameMusic.value[0] = playApi.value[index].nameShow
          playNow.value = playApi.value[index].name
          playImage.value = playApi.value[index].image
          played.value.push(playApi.value[index])
          playApi.value = playApi.value.filter((m) => m != playApi.value[index])
        }
        hisAndView.value = true
      }
      sound.value == null ? '' : sound.value.stop()
      sound.value = null

      played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
      playNow.value == null ? null : playTest();
    }
    function seek(event) {
      if (sound.value) {
        var jumptime;
        event.type == 'click' ?
          jumptime = sound.value.duration() * (event.offsetX / progress.value.clientWidth) :
          jumptime = sound.value.seek() + event;
        if (sound.value.playing()) {
          sound.value.pause();
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration() ? sound.value.seek(sound.value.duration() - 1) : sound.value.seek(jumptime);
          sound.value.play();
        } else {
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration() ? sound.value.seek(sound.value.duration()) : sound.value.seek(jumptime);
        }
      }
    }
    const posx = ref(null)
    function test() {
      posx.value = posx.value + 1;
    }
    function move(event) {
      var cursor = document.getElementById('cursor')
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";

    }
    function volume(event) {
      var per = event.layerX / parseFloat(volBar.value.scrollWidth);
      var barWidth = (per * 100) / 100;
      volumeProgress.value = barWidth * 100;
      sliderBtnVol.value = (volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25);
      Howler.volume(per);
    }
    function mute() {
      var audio = sound.value;
      if (audio) {
        mutePlayer.value = !mutePlayer.value;
        mutePlayer.value ? audio.mute(true) : audio.mute(false)
      }
    }
    return {
      playTest, pause, duration, formatTime, audios, pauseTrack,
      timer, step, stepFunction, seek, progress
      , test, posx, move, mute, mutePlayer, volBar, sliderBtnVol, volumeProgress, volume, playNow, next
      , playApi, fristPlayed, previous, emptyPlayed, shuffle, loop, loopType, stopPlayer, checkPlayer, deleteMusic, nameMusic, playImage
      , hisAndView
    };
  },
};
</script>
