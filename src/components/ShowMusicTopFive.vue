<template>
  <div v-if='!mobile' class="flex flex-row overflow-hidden cursor-pointer relative" @mouseover="upHere = true" @mouseleave="upHere = false" >
    <img :src="url+'api/streaming/image/'+musicDes.trackThumbnail" v-bind:class="upHere?'transition delay-95 duration-700 scale-125':''" style="width:300px ; height: 150px; object-fit: cover;"/>
    <div class="grid">
      <transition name="fade"  >
        <div v-if="!upHere" class="absolute flex flex-row items-end justify-self-end justify-center ">
          <div class="bg-blackTopFive opacity-80 2xl:w-15 w-13" style="height: 150px; "></div>
          <div class="absolute pb-1 text-white 2xl:text-7xl text-5xl font-sansation-bold ">{{count+2}}</div>
        </div>
      <div v-else class="2xL:pl-6 pl-2 2xl:pr-3 pr-2 pb-4 bg-neutral-100 bg-opacity-80 absolute justify-self-end flex flex-row items-end justify-between 2xl:w-74 w-full" style="height: 150px;  ">
        <div class="2xl:w-56 w-44 flex flex-col font-sansation-regular text-sm 2xl:tracking-widest text-blackcoal opacity-100">
          <div v-if="musicDes && musicDes.trackName" ><p class="truncate">Name: {{musicDes.trackName}}</p></div>
          <div v-if="musicDes && musicDes.artistTracks[0]">Artist: {{musicDes.artistTracks[0].artistsModel.artistName}}</div>
          <div v-if="musicDes && musicDes.albums">Album: {{musicDes.albums.albumName}}</div>
          <div v-if="musicDes && musicDes.timestamp">Released: {{musicDes.timestamp}}</div>
          <div v-if="musicDes && musicDes.viewCount">Views: {{musicDes.viewCount}}</div>
        </div>  
        <div class="text-white w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
          <span class="material-icons text-4xl" @click="passMusic(musicDes)">play_arrow</span>
        </div>     
      </div>         
      </transition> 
    </div>
  </div>
  <!-- mobile, tablet -->
  <div v-if='mobile' class="flex flex-row overflow-hidden cursor-pointer relative md:w-698 sm:w-466 w-80 lg:mx-10" @mouseover="upHere = true" @mouseleave="upHere = false">
    
    <div class="grid ">
      <transition name="fade"  >
        <div v-if="!upHere" class="absolute flex flex-row items-end justify-self-start justify-center z-10">
          <div class="bg-blackTopFive opacity-80 md:w-15 sm:w-10 w-6 md:h-17 h-12" ></div>
          <div class="absolute md:pb-4 pb-2  text-white md:text-4xl sm:text-2xl text-xl font-sansation-bold ">{{count+2}}</div>
        </div>
      <div v-else class="sm:pl-20 pl-6 pr-3 md:pb-3 pb-1 bg-neutral-100 bg-opacity-80 absolute justify-self-start z-10 flex flex-row md:items-end items-center justify-between  md:w-698 sm:w-466 w-80 md:h-15 h-12" >
        <div class="w-56 flex flex-col font-sansation-regular sm:text-sm text-xs sm:tracking-widest text-blackcoal opacity-100">
          <div v-if="musicDes && musicDes.trackName" ><p class="truncate">Name: {{musicDes.trackName}}</p></div>
          <!-- <div>Artist: {{musicDes.userAccountModel.username}}</div> -->
          <!-- <div>Album: you name</div> -->
          <!-- <div>Released: {{musicDes.timestamp}}</div> -->
          <div v-if="musicDes && musicDes.viewCount">Views: {{musicDes.viewCount}}</div>
        </div>  
        <div class="mr-5 text-white md:w-10 md:h-10 sm:w-8 sm:h-8 w-6 h-6 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
          <span class="material-icons md:text-4xl sm:text-2xl text-xl" @click="passMusic(musicDes)">play_arrow</span>
        </div>     
      </div>         
      </transition> 
    </div>
    <img :src="url+'api/streaming/image/'+musicDes.trackThumbnail" v-bind:class="upHere?'transition delay-95 duration-700 scale-125 z-0 md:w-698 sm:w-466 w-80 md:h-15 h-12':'md:w-698 sm:w-466 w-80 md:h-15 h-12'" style="object-fit: cover;"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props:{
    musicDes: {type:Object, required: true},
    count: {type:Number,required: false}
  },
  emits: ['music','count'],
  data() {
    return {
      upHere : false,
      url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
    }
  },
  computed: {
    ...mapGetters({
      mobile: 'homepage/mobile'
    })
  },
  methods:{
    passMusic(e){
     this.$emit('music',{trackFile:e.trackFile,trackThumbnail:e.trackThumbnail,trackName:e.trackName})
    },
  }
} 
</script>
<style >

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s 
  /* ease; */
  /* transition-duration: 0.2s;
  transition-timing-function: linear; */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>