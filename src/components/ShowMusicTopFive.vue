<template>
  <div v-if='!mobile' class="flex flex-row overflow-hidden cursor-pointer relative" @mouseover="upHere = true" @mouseleave="upHere = false" >
    <img :src="'http://20.213.128.1:8086/api/streaming/image/'+musicDes.trackThumbnail" v-bind:class="upHere?'transition delay-95 duration-700 scale-125':''" style="width:300px ; height: 150px; object-fit: cover;"/>
    <div class="grid">
      <transition name="fade"  >
        <div v-if="!upHere" class="absolute flex flex-row items-end justify-self-end justify-center ">
          <div class="bg-blackTopFive opacity-80" style="height: 150px; width: 60px;"></div>
          <div class="absolute pb-1 text-white text-7xl font-sansation-bold ">{{count+2}}</div>
        </div>
      <div v-else class="pl-6 pr-3 pb-4 bg-neutral-100 bg-opacity-80 absolute justify-self-end flex flex-row items-end justify-between " style="height: 150px; width: 300px; ">
        <div class="w-56 flex flex-col font-sansation-regular text-sm tracking-widest text-blackcoal   opacity-100">
          <div><p class="truncate">Name: {{musicDes.trackName}}</p></div>
          <div>Artist: {{musicDes.userAccountModel.username}}</div>
          <div>Album: you name</div>
          <div>Released: {{musicDes.timestamp}}</div>
          <div>View: 142,169,846</div>
        </div>  
        <div class="text-white w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
          <span class="material-icons text-4xl" @click="passMusic(musicDes)">play_arrow</span>
        </div>     
      </div>         
      </transition> 
    </div>
  </div>
  <!-- mobile, tablet -->
  <div v-if='mobile' class="flex flex-row overflow-hidden cursor-pointer relative w-698 lg:mx-10" @mouseover="upHere = true" @mouseleave="upHere = false">
    
    <div class="grid ">
      <transition name="fade"  >
        <div v-if="!upHere" class="absolute flex flex-row items-end justify-self-start justify-center z-10">
          <div class="bg-blackTopFive opacity-80" style="height: 70px; width: 60px;"></div>
          <div class="absolute pb-3  text-white text-4xl font-sansation-bold ">{{count+2}}</div>
        </div>
      <div v-else class="pl-20 pr-3 pb-4 bg-neutral-100 bg-opacity-80 absolute justify-self-start z-10 flex flex-row items-end justify-between " style="height: 70px; width: 698px; ">
        <div class="w-56 flex flex-col font-sansation-regular text-sm tracking-widest text-blackcoal   opacity-100">
          <div><p class="truncate">Name: {{musicDes.trackName}}</p></div>
          <!-- <div>Artist: {{musicDes.userAccountModel.username}}</div> -->
          <!-- <div>Album: you name</div> -->
          <!-- <div>Released: {{musicDes.timestamp}}</div> -->
          <div>View: 142,169,846</div>
        </div>  
        <div class="mr-5 text-white w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
          <span class="material-icons text-4xl" @click="passMusic(musicDes)">play_arrow</span>
        </div>     
      </div>         
      </transition> 
    </div>
    <img :src="'http://20.213.128.1:8086/api/streaming/image/'+musicDes.trackThumbnail" v-bind:class="upHere?'transition delay-95 duration-700 scale-125 z-0':''" style="width:698px ; height: 70px; object-fit: cover;"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props:{
    musicDes: {type:Object, required: true},
    count: {type:String,required: false}
  },
  emits: ['music','count'],
  data() {
    return {
      upHere : false,
      pic:require('../assets/948523.png')
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