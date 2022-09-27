<template>
  <div class="overflow-hidden md:w-44.5 md:h-52.5 w-36 h-40 rounded-3xl  flex flex-row  items-end cursor-pointer shadow-xl" @mouseover="upHere = true" @mouseleave="upHere = false">
    <transition name="fade">
    <div v-if="!upHere" class=" absolute flex flex-row justify-center items-center text-shadow-2xl text-center z-10 md:w-44.5 w-36 bg-blackcoal bg-opacity-60 md:h-16 h-12 text-white rounded-b-3xl">
      <div class="space-y-1 mx-6 mb-1">
        <div class=" md:w-40 w-28 font-sansation-light text-sm tracking-wider truncate">a Racing into the night</div>
        <div class="font-sansation-light md:text-xxs text-mxs tracking-wider">BOWKYLION</div>     
      </div>
    </div>
    <div v-else class="absolute md:w-44.5 md:h-52.5 w-36 h-40 bg-blackcoal bg-opacity-60 z-10 flex flex-row justify-center items-center rounded-3xl">
      <div class="space-y-2 md:w-36 w-28">
        <div class="text-white ">
          <div class="font-sansation-light text-sm tracking-wider truncate"> Racing into the night asdasda</div>
          <div class="font-sansation-light text-xxs tracking-wider">BOWKYLION</div>          
        </div>
        <div class="flex flex-row justify-between items-center">   
          <span class="material-icons md:text-3xl text-2xl text-white hover:text-yellow-400 transition duration-500">grade</span>
          <div class=" cursor-pointer text-white md:w-12 md:h-12 w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-white hover:text-violetlight transition duration-500 ">
              <span class="material-icons md:text-4xl text-3xl">play_arrow</span>
          </div> 
          <span class="material-icons md:text-3xl text-2xl text-white hover:text-yellow-400 transition duration-500">playlist_add</span>   
        </div> 
      </div>
    </div>
    </transition>   
    <img :src="pic" v-bind:class="upHere?'transition delay-95 duration-700 scale-125 md:w-52 md:h-52.5 w-36 h-40':'md:w-52 md:h-52.5 w-36 h-40'" style="object-fit: cover;"/>
  </div>
  
</template>
<script>
export default {

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
  transition: opacity 0.5s  ease;
 
  /* transition-duration: 0.2s;
  transition-timing-function: linear; */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>