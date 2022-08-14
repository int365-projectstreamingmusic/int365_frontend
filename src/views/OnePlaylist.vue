<template>
  <div class="ml-75 h-screen" >
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <div class="mx-10 w-1200 my-6 bg-gray-50 rounded-2xl pt-10 pb-8">
            <div class="mx-10 flex flex-row justify-between">
              <div class=" flex flex-row ">
                <div class="overflow-hidden rounded-2xl shadow-lg" style="width:186px;">
                  <img src="../assets/yourname.png" style="width:186px ; height: 219px; object-fit: cover;"/>                
                </div>
                <div class="flex items-end ">
                  <div class="w-96 mx-7 space-y-3 flex flex-col ">
                    <div class="font-sansation-bold text-blackTopFive leading-tight">YOASOBIのベストソング - YOASOBIメドレー - Best Songs Of YOASOBI Collection 2021 </div>
                    <div class="font-sansation-regular text-ss text-blackTopFive">My Dress-Up Darling  </div>
                    <div class="w-24 h-6 font-sansation-light bg-violetdark text-ss text-white flex justify-center item-center rounded-3xl cursor-pointer">
                      <p>play now</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer select-none" >
                <span class="material-icons active:text-violetdark hover:text-violetdark transition duration-200 flex justify-end" @click="optionPlaylist('option')">more_vert</span>
                <transition name="fade">
                  <div v-if="optionPlayl" class=" py-1 mt-2  font-sansation-regular space-y-0 border border-gray-200 rounded-md bg-white text-sm shadow-md" >
                    <div  class="text-right text-blackcoal hover:text-shadow-xl hover:text-violetdark p-1 pl-8 pr-2 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">manage playlist</div>
                    <div @click="deletePlaylist('del')" class="text-right text-red-500 hover:text-shadow-xl  p-1 pl-8 pr-2 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">delete playlist</div>
                  </div>
                </transition>
                <!-- v-if="optionPlayl" -->
              </div>
            </div>
            <div class=" font-sansation-light mx-10 mt-7">
              <table class="w-1120 text-center  ">
                <thead class="border-b-2 border-violetdark text-sm ">
                  <tr class="w-1120">
                    <th class="w-6 pb-1"></th>
                    <th class="w-10 pb-1">#</th>
                    <th class="text-left pl-3 pb-1 w-669">name</th>
                    <th class="w-54 pb-1 py-3">album</th>
                    <th class="w-32 pb-1">release</th>
                  </tr>
                </thead>
                <tbody class="text-sm ">
                  <tr class="w-1120 ">
                    <th v-show="!delPlayl" class="w-6 pb-1  " ></th>
                    <th v-show="delPlayl" class="w-6 pb-1 pt-2 h-9 cursor-pointer">
                      <!-- <span class="material-icons text-sm text-blackcoal">radio_button_unchecked</span> -->
                      <span class="material-icons  text-violetdark  ">check_circle</span>
                    </th>
                    <td class="w-10 py-3">1</td>
                    <td class="w-669 text-left pl-2 py-3 truncate ">$100asdasdsadadadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</td>
                    <td class="w-54 px-5 py-3 truncate">Januarydsfsfsdfsdfsfsfdsasdasdasdadadaasdsadas</td>
                    <td class="w-32 py-3 ">14-08-2000</td>
                  </tr>

                </tbody>
              </table>
              <div v-if="delPlayl" class="flex flex-row mt-8 space-x-3 justify-end">
                <div class="bg-black w-24 text-center h-7 rounded-full text-white flex items-center justify-center cursor-pointer">Delete</div>
                <div @click="deletePlaylist()" class="bg-black w-24 text-center h-7 rounded-full text-white flex items-center justify-center cursor-pointer">Cancel</div>
              </div>
            </div>
          </div>
          <div class="mx-10 w-1200">
            <div class="mx-9 ">
              <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row justify-between ">
                  <div class="font-sansation-light text-2xl">Playground</div>
                </div>
                <div class="font-sansation-light text-sm text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">filter</div>                 
              </div>
            </div>
          </div>   
          <div class="bg-gray-50 rounded-2xl mx-10 w-1200 px-10 py-7 my-5">
              <div class="grid grid-cols-5 gap-x-11.3 gap-y-5">
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
      optionPlayl: false,
      delPlayl: false
    }
  },
  methods:{
    optionPlaylist(e){
      if(e == 'option'){
        this.optionPlayl = !this.optionPlayl 
      }else{
        this.optionPlayl = false
      }
      
     
    },
    deletePlaylist(e){
      if(e == 'del' ){
        this.delPlayl = true
        this.optionPlaylist()
      } else {
        this.delPlayl = false 
      } 
     
    }

  },
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

table {
    display: flex;
    flex-flow: column;
    height: 400px;
    
}

thead {
    flex: 0 0 auto;
}

tbody {
    flex: 1 1 auto;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
}

tr {
    display: table;
    table-layout: fixed;
}
</style>