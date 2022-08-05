<template>
  <div class="ml-75 h-screen">
    <div class="flex flex-col w-full">
      <!-- playground -->
      <div class="flex flex-row justify-center space-x-2 mb-5">
        <div class="bg-gray-50 rounded-2xl ">
          <div class="mx-9 w-98 mt-6 my-6 space-y-3">
            <div class="flex flex-row justify-between items-end">
              <div class="flex flex-row justify-between items-end space-x-3">
                <div class="font-sansation-light text-2xl">Recent Played</div>
                <div class="font-sansation-light ">add song</div>
              </div>
              <div class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">see more</div>               
            </div>
            <div class="grid grid-cols-2 gap-6.5 ">
              <music-card></music-card>
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>
              <music-card></music-card>
              <empty-card></empty-card>           
            </div>
          </div>
        </div>
        <!-- my playlist -->
        <div class="bg-gray-50 rounded-2xl">
          <div class="mx-10 w-640 mt-6 my-6 space-y-3">
            <div class="flex flex-row justify-between items-end">
              <div class="flex flex-row justify-between items-end space-x-3">
                <div class="font-sansation-light text-2xl">Recent Played</div>
                <div class="font-sansation-light ">add song</div>
              </div>
              <div class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">see more</div>               
            </div>
            <div class="grid grid-cols-3 gap-x-10 gap-y-6.5 ">
              <music-card></music-card>
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>  
              <music-card></music-card>
              <music-card></music-card>
              <empty-card></empty-card>           
            </div>
          </div>
        </div>
        <!-- my playlist -->  
      </div>
      <!-- playground -->

    </div>
  </div>  
</template>
<script>

import MusicCard from "../components/MusicCard.vue";
import EmptyCard from "../components/EmptyCard.vue";
export default {
  components: {
    MusicCard,
    EmptyCard
  },
}

</script>
