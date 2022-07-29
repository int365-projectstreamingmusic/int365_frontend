<template>
  <div class="hometest ml-75 h-screen">
    <div class="flex flex-col w-full">
      <!-- <div class=" flex  " > -->
        <!-- Top5music -->
        <div class="flex justify-center">
          <div>
            <div class="font-sansation-bold text-4xl text-blackcoal mx-10 mt-28">Top 5 Music</div>
            <div class="mx-10">
              <div class="flex flex-row relative" >
                <div class="absolute flex flex-row items-end z-10 justify-between " style="width: 780px;" @mouseover="topOne = true" @mouseleave="topOne = false">
                  <div class="bg-blackTopFive opacity-80" style="height: 350px; width: 60px;"></div>
                  <div class="absolute  pl-4 pb-5 text-white text-8xl font-sansation-bold ">1</div>
                  <div v-if="topOne" class="absolute  bottom-0 right-0 mb-5 mr-4 cursor-pointer text-white w-14 h-14 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
                    <span class="material-icons text-4xl">play_arrow</span>
                  </div> 
                </div>          
                <div class="overflow-hidden"  style="width:780px ; height: 350px;">
                  <img src="../assets/yourname.png" v-bind:class="topOne?'transition delay-95 duration-700 scale-110':''" style="width:780px ; height: 350px; object-fit: cover;"/>
                </div>
                <div class="bg-blackTopFive  text-slate-50 font-sansation-light text-sm tracking-widest flex items-end w-100" >
                  <div class="mb-6 ml-9 flex flex-col space-y-0.5">
                    <div>Name: Sparkle</div>
                    <div>Artist: Radwimps</div>
                    <div>Album: Your Name</div>
                    <div>Released: 2016</div>
                    <div>View: 142,169,846</div>
                  </div> 
                </div>
              </div>
              <div class="flex flex-row">
                <!--เปลี่ยนเป็น v-for -->
                <ShowMusicTopFive :musicDes={}></ShowMusicTopFive>
                <ShowMusicTopFive :musicDes={}></ShowMusicTopFive>
                <ShowMusicTopFive :musicDes={}></ShowMusicTopFive>
                <ShowMusicTopFive :musicDes={}></ShowMusicTopFive>
              </div>
            </div>
          </div>
        </div>
        <!-- /Top5music style="height: 350px; width: 330px;"-->
        <!-- recommend -->
        <div class="flex justify-center">
          <div class="mx-10 w-1200">
            <div class="font-sansation-bold text-4xl text-blackcoal ">Reccommend</div>
            <div class="flex flex-row items-end justify-between font-sansation-regular" >
              <div class="w-4/6 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eget proin arcu pulvinar. 
                Nisi, velit luctus ultrices in leo. Sit id interdum tempus, </div>
              <div @click="ClickMood()" v-if="!selectMood" class="w-2/6 text-right underline underline-offset-1 text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">let’s start for setting mood today</div>  
            </div>
            <div v-show="!selectMood" class="flex flex-row space-x-15">
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
            </div>      
          </div>
        </div>       
        <div v-show="selectMood" class="bg-blackcoal w-full flex flex-row justify-center" >
          <div>
            <div class="flex justify-end cursor-pointer " @click="ClickMood()">
              <span class="material-icons text-scarlet hover:text-red-500 transition duration-500">close</span>
            </div>
            <div class="flex flex-row w-1200">
              <div>
                select mood
              </div>
              <div class="font-sansation-regular text-white">
                <div>Guide</div>
                <div class="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget enim nulla lobortis posuere scelerisque. Ultricies varius risus vulputate libero nisl fames. Elementum amet massa sapien commodo sed eros vulputate massa.</div>
              </div>
            </div>
            <div class="flex flex-row space-x-15 w-1200" >
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
            </div>
          </div>
        </div>
        <!--/recommend -->
        <!-- recent releases -->    
        <div class="flex justify-center">
          <div class="mx-10 w-1200">
            <!-- <div class="font-sansation-bold text-4xl text-blackcoal ">Recent Releases</div> -->
            <div class="flex flex-row">
              <div>
                <div class="font-sansation-bold text-4xl text-blackcoal ">Recent Releases</div>
                <table class="w-696">
                  <tr class="h-8 font-sansation-light text-white bg-blackcoal antialiased text-sm tracking-wider ">
                    <th class="w-9">#</th>
                    <th class="w-96">Name</th>
                    <th class="w-24">Artist</th>
                    <th class="w-20">Favorite</th>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td><p class="mx-1">1</p></td>
                    <td><p class="truncate w-96 mx-5">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td><p class="truncate w-24">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td><p class="mx-1">1</p></td>
                    <td><p class="truncate w-96 mx-5">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td><p class="truncate w-24">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td><p class="mx-1">1</p></td>
                    <td><p class="truncate w-96 mx-5">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td><p class="truncate w-24">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td><p class="mx-1">1</p></td>
                    <td><p class="truncate w-96 mx-5">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td><p class="truncate w-24">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td><p class="mx-1">1</p></td>
                    <td><p class="truncate w-96 mx-5">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td><p class="truncate w-24">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                </table>
                <div class="underline underline-offset-1 font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">see more</div>
              </div>
              <div class="w-504">
                <div class="ml-14">
                  <div class="font-sansation-bold text-4xl text-blackcoal ">Streaming</div>
                  <div class=" bg-black w-full rounded-lg">sad</div>
                </div>  
              </div> 
            </div>
          </div>
        </div> 
        <!-- /recent releases -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import ShowMusicTopFive from "../components/ShowMusicTopFive.vue";
import MusicCard from "../components/MusicCard.vue";

export default {
  components: {
    ShowMusicTopFive,
    MusicCard
  },
  data() {
    return {
      topOne:false,
      selectMood:false,
    }
  },
 methods:{
  ClickMood(){
    this.selectMood = !this.selectMood
  }
 }
}
</script>
<style >

</style>