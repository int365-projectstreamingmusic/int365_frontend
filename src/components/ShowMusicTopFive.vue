<template>
  <div class="flex flex-row overflow-hidden cursor-pointer relative" @mouseover="upHere = true" @mouseleave="upHere = false" >
    <img :src="pic" v-bind:class="upHere?'transition delay-95 duration-700 scale-125':''" style="width:300px ; height: 150px; object-fit: cover;"/>
    <div class="grid">
      <transition name="fade"  >
        <div v-if="!upHere" class="absolute flex flex-row items-end justify-self-end justify-center ">
          <div class="bg-blackTopFive opacity-80" style="height: 150px; width: 60px;"></div>
          <div class="absolute pb-1 text-white text-7xl font-sansation-bold ">2</div>
        </div>
      <div v-else class="pl-6 pr-3 pb-4 bg-neutral-100 bg-opacity-80 absolute justify-self-end flex flex-row items-end justify-between " style="height: 150px; width: 300px; ">
        <div class=" flex flex-col font-sansation-regular text-sm tracking-widest text-blackcoal   opacity-100">
          <p>Name: Sparkle</p>
          <p>Artist: Radwimps</p>
          <p>Album: Your Name</p>
          <p>Released: 2016</p>
          <p>View: 142,169,846</p>
        </div>  
        <div class="text-white w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
          <span class="material-icons text-4xl">play_arrow</span>
        </div>     
      </div>         
      </transition> 

    </div>
  </div>
</template>
<script>
export default {
  props:{
    musicDes: {type:Object, required: false},
  },
  data() {
    return {
      upHere : false,
      pic:require('../assets/948523.png')
    }
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