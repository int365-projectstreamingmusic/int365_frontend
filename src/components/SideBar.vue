
<template>
  <div v-show="sideBarShow" class=" bg-neutral-50 fixed inset-y-0 left-0 w-75 no-scrollbar overflow-y-scroll   z-50">
    <div class="sticky top-0 z-20">
      <div class="flex flex-row items-center justify-center space-x-5">
        <span @click="hideSideBar()" class="material-icons text-3xl mt-7 pb-0 cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
        <div class="font-sansation-light text-3xl text-center mt-7 bg-neutral-50 text-black  pb-0  sticky top-0">GARDEN</div>
      </div>
      <div class="h-8 bg-gradient-to-b from-neutral-50 "></div>
    </div>
    <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">menu</div>
    <div class="py-7">
      <router-link to="/" @click="pathPage('/')">
        <div class="mb-4 pl-10 border-x-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2 "  >
              <span class="material-icons" v-bind:class="(this.path == '/')?'text-violetlight':'text-blackcoal'">home</span>
              <div class="font-sansation-regular grid content-center text-base" v-bind:class="(this.path == '/')?'text-violetlight ':'text-blackcoal'" >Home</div>
          </div>
        </div>
      </router-link>
      <router-link to="/playlist"  @click="pathPage('/playlist')">
        <div class="mb-4 pl-10 border-x-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2"  >
              <span class="material-icons" v-bind:class="(this.path == '/playlist')?'text-violetlight':'text-blackcoal'">playlist_play</span>
              <div class="font-sansation-regular grid content-center text-base" v-bind:class="(this.path == '/playlist')?'text-violetlight':'text-blackcoal'">Playlist</div>
          </div>
        </div>
      </router-link>
      <router-link to="/favorite"  @click="pathPage('/favorite')">
        <div class=" pl-10 border-l-8 border-neutral-50 hover:border-x-8 transition delay-75 hover:border-violetlight">
          <div class="flex flex-row space-x-2"  >
              <span class="material-icons" v-bind:class="(this.path == '/favorite')?'text-violetlight':'text-blackcoal'">grade</span>
              <div class="font-sansation-regular grid content-center text-base" v-bind:class="(this.path == '/favorite')?'text-violetlight':'text-blackcoal'">Favorite</div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-show="mediaPlayer">
      <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">now playing</div>
      <div class="flex flex-row justify-center py-8">
        <div class="bg-neutral-50 rounded-full h-8 w-8 z-10 self-center absolute"></div>
        <img :src="url+'api/streaming/image/'+playImage" class="rounded-full h-44 w-44 drop-shadow-xl animate-pulse" />
      </div>
      <div v-for="nameMusics in nameMusic" :key="nameMusics" class="font-sansation-bold text-black px-7 text-sm text-center text-shadow-xl">{{nameMusics}}</div>
      <div class="font-sansation-regular text-black py-3 text-sm text-center tracking-wide">My Dress-Up Darling</div>
      <div class="px-7 w-75">
        <div @click="seek($event)" ref="progress" class="h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-400">
          <div class="flex w-full justify-end h-1 bg-gradient-to-r from-violet-500 to-violet-700 rounded-full " :style="{'width' : step + '%'}"></div>
        </div>
        <div class="flex justify-end h-1 rounded-full ml-3" :style="{'width' : step + '%'}">
          <span class="w-4 h-4 bg-gradient-to-r from-violet-500 to-violet-700 absolute -mt-2.5 rounded-full shadow"></span>
        </div>
      </div>
      <div class="flex justify-between px-7 py-2 font-sansation-regular text-sm text-black">
        <div>
          <p>{{timer}}</p>
        </div>    
        <div>
          <p>{{duration}}</p>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center px-9 text-blackcoal cursor-pointer select-none">
        <span @click="shuffle()" class="material-icons hover:text-violetdark transition delay-75">shuffle</span>
        <div class="item-center">
          <span v-if="emptyPlayed" class="material-icons text-gray-400 cursor-not-allowed">fast_rewind</span>
          <span v-else @click="previous()" class="material-icons hover:text-violetdark transition delay-75 ">fast_rewind</span>
        </div>
        <span @click="seek(-10)" class="material-icons hover:text-violetdark transition delay-75">replay_10</span>
        <div class="text-white w-10 h-10 item-center bg-gray-500 rounded-full shadow-lg hover:bg-violetdark transition delay-75">
          <span v-if="!pauseTrack" @click="playTest()" class="material-icons text-3xl">play_arrow</span>
          <span v-else @click="pause()" class="material-icons text-3xl">pause</span>
        </div>
        <span @click="seek(10)" class="material-icons hover:text-violetdark transition delay-75">forward_10</span>
        <span @click="next('NEXT')" class="material-icons hover:text-violetdark transition delay-75">fast_forward</span>
        <div class="item-center w-6 place-content-center">
          <span v-if="loopType == 'NOTLOOP' "  @click="loop('ONLYONE')" class="material-icons hover:text-violetdark transition delay-75">all_inclusive</span>
          <span v-else-if="loopType == 'ONLYONE'" @click="loop('LOOPALL')" class="text-base place-items-center font-sansation-bold text-violetdark">one</span>
          <span v-else-if="loopType == 'LOOPALL'" @click="loop('NOTLOOP')" class="text-base place-items-center font-sansation-bold text-violetdark">All</span>
        </div>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <div class="font-sansation-bold text-zinc-500 pl-7 text-sm py-3">next play</div>
        <div class="flex flex-row items-center space-x-2" @mouseover="showVolBar = true" @mouseleave="showVolBar = false">
          <div class="cursor-pointer pt-2" @click="mute()">
            <span v-if="mutePlayer" class="material-icons text-xl text-red-600" @mouseover="showVolBar = false">volume_mute</span>
            <span v-else class="material-icons text-xl text-violet-600" >volume_up</span>
          </div>
          <div class="w-28" v-show="showVolBar" >
            <div @click="volume($event)" ref="volBar" class=" mt-1 h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-500 relative" >
              <div class="flex justify-end h-1 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full relative" :style="{'width' : volumeProgress + '%'}"></div>
            </div>
            <div class="flex justify-end h-1 mb-1 rounded-full -mt-2" :style="{'width' : volumeProgress + '%'}">
              <span id="progressButtonVolume" class="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 absolute rounded-full shadow"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="px-10 mb-10 tracking-wide space-y-1 cursor-pointer">
        <div class=" flex flex-row text-ss hover:text-violetdark font-sansation-regular space-x-2" v-for="(value,index) in playApi" :key="index" >
          <div v-if="(index+1)==1" class="flex flex-row space-x-2 items-center" >
            <div>{{index+1}}</div>
            <div class="truncate w-48 " @click="next(index)">{{value.nameShow}}</div>
            <span class="material-icons text-sm text-neutral-50 hover:text-red-500"  @click="deleteMusic(index)">close</span>
          </div>
          <div v-else class="flex flex-row space-x-2" >
            <div>{{index+1}}</div>
            <div class="truncate w-48" @click="next(index)">{{value.nameShow}}</div>
            <span class="material-icons text-sm text-neutral-50 hover:text-red-500" @click="deleteMusic(index)">close</span>
          </div>
        </div>
      </div>
      <!-- <div>{{music}}</div> -->
    </div>
    <div v-show="!mediaPlayer">
      <div class="font-sansation-bold text-zinc-500 pl-7 text-sm">play now</div>
      <div class="font-sansation-bold text-zinc-400 border-zinc-300 border border-dashed mx-9 my-5 py-7 text-center text-ss ">Click music And <br> i will play music for you! </div>
      <!-- <div>{{url}}</div> -->
    </div>
 </div>
 <!-- <div v-show="!sideBarShow" class="fixed inset-y-0 left-0 w-75 no-scrollbar overflow-y-scroll  z-50">
    <div class="sticky top-0 z-20">
      <div class="flex flex-row items-center justify-center space-x-5">
        <span @click="hideSideBar()" class="material-icons text-4xl mt-5 pb-0 cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
        <div class="font-sansation-light text-logo text-center text-black pt-5 pb-0  sticky top-0">GARDEN</div>
      </div>
    </div>
 </div> -->
 
</template>

<script>
// var cursor = document.getElementById('cursor');
//           document.addEventListener('mousemove',function(e){ 
//             cursor.style.left = e.clientX + "px";
//             cursor.style.top = e.clientX + "px";})
//           ;
import { mapGetters, mapActions } from "vuex";
import {
  ref,
  // ,reactive
  // computed
} from "vue";
// import {useRoute} from 'vue-router'
import {
  Howl,
  Howler
} from "howler";
export default {
  props:{
    music: {type:Object, required: false},
    addQueue: {type:Object, required: false},
    // pathC:{type:String, required:false}
  },
  watch: { 
    music: function(newVal) { // watch it
      // if(this.music != null){
      // console.log("thsoundis.")
      // // this.sound == undefined ? console.log(this.sound) : this.sound.playing() ? this.sound.stop() : console.log('asd')
      // // this.sound.value.pause()
      // this.mediaPlayer = true
      // this.playApi.splice(0, 0,newVal)
      // // this.playApi.push(newVal)
      // this.fristPlayed = true
      // this.stopPlayer()
      // }
      if(this.checkPlayer()){
        this.$store.dispatch('homepage/setMediaPlayer',true)
        this.playApi.splice(0, 0,newVal)
        this.fristPlayed = true
        this.stopPlayer()
        
      }else{
        this.playApi.push(newVal)
        
      }
    },
    addQueue: function(newVal) { // watch it
      if(this.checkPlayer()){
        this.$store.dispatch('homepage/setMediaPlayer',true)
        this.playApi.splice(0, 0,newVal)
        this.fristPlayed = true
        this.stopPlayer()
      }else{
        this.playApi.push(newVal)
      }
    }
  },
  computed: {
    ...mapGetters({
      mediaPlayer: 'homepage/mediaPlayer',
      sideBarShow: 'homepage/sideBarShow'
    })
  },
  data() {
    return {
      path:'',
      showVolBar:false,
      // mediaPlayer:false,
      url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
      // url:process.env.VUE_APP_URL
      // playApi:[],
      // playNow:''
    }
  },
  methods:{
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    pathPage(path){
      this.path = path
    }

  },
  mounted(){
    // const route=useRoute();
    this.path = window.location.pathname
    // console.log()
    console.log(this.pathC)
    // if(this.music != null && this.music != undefined){
    //   this.playApi.value.push(this.music)
    // } 
    
    // var barWidth = (0.9 * 100) / 100;
    // this.sliderBtnVol = (this.volBar.offsetWidth * barWidth + this.volBar.offsetWidth * 0.05 - 25);
  },
  created(){
    // this.playApi.push({name:'audio1.mp3'},{name:'audio2.mp3'},{name:'audio3.mp3'})
  },
  setup() {
 
     
    // netstat -ano | findstr 8080
    // taskkill /F /PID 8080
    // const posx = ref(null);
        const step =  ref(0);
        const nextButton = ref(true);
        const prevButton = ref(true);
        // const random = ref(false);
        // const repeat = ref(false);
        // const index = ref(0);
        const duration = ref('00:00');
        const timer = ref('00:00');
        const pauseTrack = ref(false);
        const progress = ref(null);
        const sound = ref(null)
        const volBar = ref(null);
        // const sliderBtn = ref(0);
        const sliderBtnVol = ref(null);
        const volumeProgress = ref(100);
        const mutePlayer = ref(false);
        const playNow = ref(null)
        const playImage = ref(null)
        const playApi = ref([])
        const played = ref([])
        const fristPlayed = ref(true)
        const emptyPlayed = ref(true)
        const loopType = ref('NOTLOOP')
        const nameMusic = ref([])
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
    function loop(param){
      // console.log(param)
      // console.log(loopType.value)
      if(param == 'ONLYONE'){
        loopType.value = 'ONLYONE'
      } else if(param == 'LOOPALL'){
        loopType.value = 'LOOPALL'
      } else if(param == 'NOTLOOP'){
        loopType.value = 'NOTLOOP'
      }
    }
     
    function checkPlayer(){
      return sound.value == null ? true : false
    }
    function stopPlayer() {
      if(sound.value != null){
      sound.value.stop()
      sound.value = null        
      }
      playTest()
    }
    function playTest() {
      // console.log(playApi.value)
      
      // var audio = audios.value[index.value];
      if (sound.value == null) {
        if(fristPlayed.value == true && sound.value == null){
          // console.log(`ใน play ${playApi.value.length}`) 
          // console.log('1sttime')
          nameMusic.value[0] = playApi.value[0].nameShow
          playNow.value = playApi.value[0].name ? playApi.value[0].name : ''
          playImage.value = playApi.value[0].image
          played.value.push(playApi.value[0])
          playApi.value = playApi.value.filter((m) => m != playApi.value[0])
          fristPlayed.value = false
          played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
          // console.log(playApi.value) 
        }
      // console.log(`ใน paly ${playNow.value}`) 
        sound.value = new Howl({
        src:[`${process.env.VUE_APP_MY_ENV_VARIABLE}api/streaming/getContent/${playNow.value}`],
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
        onend: function() {
          next();
        },
        });
      }else{
      // state.audioPlaying[index.value] = false;   
      // http://localhost:8080/audiovideo/audios/audio1.mp3
      // console.log("เข้า")
      // console.log(`ใน playtest ${playApi.value.length}`) 
      //  console.log(sound.value )
      }
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
    
    function shuffle(){
      // console.log(playApi.value)
      // playApi.value[Math.floor(Math.random()*items.length)]
      var round = playApi.value.length
      var oldPlay = playApi.value
      var random = []
      // var gap 
      // console.log(oldPlay[Math.floor(Math.random()*oldPlay.length)])
      for (let index = 0; index < round; index++) {
        // gap = 
        // console.log(gap)
        random.push(oldPlay[Math.floor(Math.random()*oldPlay.length)]) 
        // playApi.value[index] = random 
        // console.log(random)
        oldPlay = oldPlay.filter((m) => m != random[index]  )
        // console.log(oldPlay)
      }
      playApi.value = random
      // console.log(playApi.value)
      // console.log(oldPlay)
    }
    function deleteMusic(index){
      playApi.value = playApi.value.filter((m) => m != playApi.value[index])
    }
    function previous(){
      if(played.value.length != 0){
          // console.log(played.value)
          // console.log(played.value[played.value.length-1].nameShow)
          // console.log(played.value[played.value.length-2].image)
          playApi.value.splice(0, 0,{name:playNow.value,nameShow:played.value[played.value.length-1].nameShow,image:played.value[played.value.length-1].image})
          playNow.value = played.value[played.value.length-2].name
          playImage.value = played.value[played.value.length-2].image
          nameMusic.value[0] = played.value[played.value.length-2].nameShow
          console.log(playApi.value[0])
          played.value = played.value.filter((m) => m != played.value[played.value.length-1]  )
        //  && m != played.value[played.value.length-2]
          // console.log(playApi.value)
          played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
          loopType.value = 'NOTLOOP'
          // next()
        }
      sound.value == null ? '' : sound.value.stop()
      sound.value = null
      playTest();
    }
    function next(index) {
      if(index == 'NEXT'){
        loopType.value == 'LOOPALL' ? loopType.value = 'LOOPALL': loopType.value = 'NOTLOOP'
        next()
      } else {
        if(sound.value && index == undefined ){
          if(playApi.value.length != 0){
            if(loopType.value != 'ONLYONE'){
              // console.log('1')
              nameMusic.value[0] = playApi.value[0].nameShow
              playNow.value = playApi.value[0].name
              playImage.value = playApi.value[0].image
              played.value.push(playApi.value[0])
              console.log(played.value)
              playApi.value = playApi.value.filter((m) => m != playApi.value[0])
            }
          }else{
            // console.log('2')
            //loopall กำลังคิดยุว่ามีดีไหมหรือหมดกะหมุน auto
            loopType.value == 'LOOPALL' ? playApi.value = played.value : playNow.value = null ;
            played.value = []
            // sound.value = null
            next(0)
          }  
        }else{
          // console.log('3')
          loopType.value == 'LOOPALL' ? loopType.value = 'LOOPALL' :  loopType.value = 'NOTLOOP'
          // console.log(nameMusic.value[0])
          nameMusic.value[0] = playApi.value[index].nameShow
          // console.log(nameMusic.value[0])
          playNow.value = playApi.value[index].name
          playImage.value = playApi.value[0].image
        }
      }
      console.log('4')
      sound.value == null ? '' : sound.value.stop()
      sound.value = null
      played.value.length == 1 ? emptyPlayed.value = true : emptyPlayed.value = false
      playNow.value == null ? null : playTest();
    }   
    function seek(event) {
      // var sound = audios.value[index.value].howl;
      if (sound.value) {
        var jumptime; 
        event.type == 'click'? 
          jumptime = sound.value.duration() * (event.offsetX / progress.value.clientWidth) :
          jumptime = sound.value.seek() + event;
        // console.log(jumptime);
        if (sound.value.playing()) {
          sound.value.pause();
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration() ? sound.value.seek(sound.value.duration()-1) : sound.value.seek(jumptime);
          sound.value.play();
        } else {
          jumptime <= 0 ? sound.value.seek(0) : sound.value.seek(jumptime);
          jumptime >= sound.value.duration() ? sound.value.seek(sound.value.duration()) : sound.value.seek(jumptime);
        }
      }
    }
    const posx = ref(null)
    function test(){
      // console.log(event.clientX,event.clientY,event.clientWidth);
      posx.value =  posx.value+ 1;
    }
    function move(event){
      // console.log(event.clientX,event.clientY)
      var cursor = document.getElementById('cursor')
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
     
    }
    function volume(event){
      var per = event.layerX / parseFloat(volBar.value.scrollWidth);
      var barWidth = (per * 100) / 100;
      volumeProgress.value = barWidth * 100;
      sliderBtnVol.value = (volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25);
      Howler.volume(per);
    }
    function mute() {
      // console.log('mute')
      var audio = sound.value;
      if (audio) {
      mutePlayer.value  = !mutePlayer.value;
      mutePlayer.value ? audio.mute(true) : audio.mute(false)
      }            
    }
    return { playTest,pause,duration,formatTime,audios,pauseTrack,
            timer,step,stepFunction,seek,progress
            ,test,posx,move,mute,mutePlayer,volBar,sliderBtnVol,volumeProgress,volume,playNow,next
            ,playApi,fristPlayed,previous,emptyPlayed,shuffle,loop,loopType,stopPlayer,checkPlayer,deleteMusic,nameMusic,playImage
            };
  },

};
</script>

<style>

</style>