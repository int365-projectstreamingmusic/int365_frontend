<template>
  <div class="ml-75 h-screen">
    <div class="flex flex-col w-full">
      <!-- recent played -->
      <div class="flex justify-center">
        <div>
          <div class="mx-10 w-1200 mt-3 my-6 space-y-3">
            <div class="flex flex-row justify-between items-end">
            <div class="font-sansation-light text-2xl">Recent Played</div>
            <div class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">see more</div>               
            </div>
            <div class="grid grid-cols-6 gap-3.6">
              <music-card></music-card>
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>
              <music-card></music-card>           
            </div>
          </div>
        </div>
      </div>
      <!-- recent played -->
      <!-- all song -->
      <div class="flex justify-center">
        <div class="mx-10 w-1200 mt-3 my-6 space-y-3">
          <div class="flex flex-row justify-between items-end w-1200">
           <div class="font-sansation-light text-2xl">All Song</div>
           <div class="font-sansation-light text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">filter</div>               
          </div>
          <div class="grid grid-cols-6 gap-3.6 w-1200">
            <music-card></music-card>
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>
            <music-card></music-card>   
            <music-card></music-card>
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>
            <music-card></music-card>  
            <music-card></music-card>
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>  
            <music-card></music-card>
            <music-card></music-card>    
          </div>
        </div>       
      </div>
      <!-- number page -->
      <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 mb-10">
        <div>
          <button >
            <div class="icon-navbar-outside">
              <span class="material-icons text-2xl">chevron_left</span>
            </div>
          </button>
        </div>
        <div>
          <button >
            <div >
              <p class="page-number-outside">1</p>
            </div>
          </button>
        </div>
        <div>
          <button >
            <div >
              <p class="page-number-outside">2</p>
            </div>
          </button>
        </div>
        <div>
          <button >
            <div >
              <p class="page-number-outside">3</p>
            </div>
          </button>
        </div>
        <div>
          <button >
            <div >
              <p class="page-number-outside">4</p>
            </div>
          </button>
        </div>  
        <div>
          <button >
            <div class="icon-navbar-outside">
              <span class="material-icons text-2xl">chevron_right</span>
            </div>
          </button>
        </div>
      </div>
      <!-- number page -->
      <!-- all song -->
    </div>
  </div>
</template>
<script>

import MusicCard from "../components/MusicCard.vue";
export default {
  components: {
    MusicCard
  },
  data() {
    return {

    }
  },
 methods:{

 }
}
</script>
<style >

</style>