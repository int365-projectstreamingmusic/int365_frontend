<template>
  <div class="hometest ml-75 h-screen">
    <div class="flex flex-col w-full">
      <!-- <div class=" flex  " > -->
        <!-- Top5music -->
        <div class="flex justify-center">
          <div>
            <div class="font-sansation-bold text-4xl text-blackcoal mx-10 mt-3">Top 5 Music</div>
            <div class="mx-10">
              <!-- <Suspense> -->
              <div class="flex flex-row relative" >
                <div class="absolute flex flex-row items-end z-10 justify-between " style="width: 780px;" @mouseover="topOne = true" @mouseleave="topOne = false">
                  <div class="bg-blackTopFive opacity-80" style="height: 350px; width: 60px;"></div>
                  <div class="absolute  pl-4 pb-5 text-white text-8xl font-sansation-bold ">1</div>
                  <div v-if="topOne" class="absolute  bottom-0 right-0 mb-5 mr-4 cursor-pointer text-white w-14 h-14 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
                    <span class="material-icons text-4xl" @click="acceptData(topFrist)">play_arrow</span>
                  </div> 
                </div>          
                <div class="overflow-hidden"  style="width:780px ; height: 350px;">
                  <img :src="`${process.env.VUE_APP_MY_ENV_VARIABLE}`+'api/streaming/image/'+topFrist.trackThumbnail" v-bind:class="topOne?'transition delay-95 duration-700 scale-110':''" style="width:780px ; height: 350px; object-fit: cover;"/>
                </div>
                <div class="bg-blackTopFive  text-slate-50 font-sansation-light text-sm tracking-widest flex items-end w-100" >
                  <div class="mb-6 ml-9 flex flex-col space-y-0.5">
                    <div>Name: {{topFrist.trackName}}</div>
                    <div>Artist: {{topFrist.userAccountModel.username}}</div>
                    <div>Album: you name</div>
                    <div>Released: {{topFrist.timestamp}}</div>
                    <div>View: 142,169,846</div>
                  </div> 
                </div>
              </div>
              <!-- <template #fallback>
                Loading...
              </template>
              </Suspense> -->
              <div class="flex flex-row">
                <!--เปลี่ยนเป็น v-for -->
                <div v-for="musics in topFive" :key="musics.id">
                  <ShowMusicTopFive :musicDes="musics" @music="acceptData"></ShowMusicTopFive>
                </div> 

                <!-- 
                <ShowMusicTopFive :musicDes={} @music="acceptData"></ShowMusicTopFive>
                <ShowMusicTopFive :musicDes={} @music="acceptData"></ShowMusicTopFive>
                <ShowMusicTopFive :musicDes={} @music="acceptData"></ShowMusicTopFive> -->
              </div>
            </div>
          </div>
        </div>
        <!-- /Top5music style="height: 350px; width: 330px;"-->
        <!-- recommend -->
        <div class="flex justify-center">
          <div class="mx-10 w-1200">
            <div class="font-sansation-bold text-4xl text-blackcoal ">Recommend</div>
            <div class="flex flex-row items-end justify-between font-sansation-regular" >
              <div class="w-4/6 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eget proin arcu pulvinar. 
                Nisi, velit luctus ultrices in leo. Sit id interdum tempus, </div>
              <div @click="ClickMood()" v-if="!selectMood" class="w-2/6 text-right underline underline-offset-1 text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">let’s start for setting mood today</div>  
            </div>
            <div v-show="!selectMood" class="flex flex-row space-x-3.6 ">
              <music-card></music-card>
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
            <div class="flex flex-row space-x-3.6 w-1200" >
              <music-card></music-card>
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
                    <td class=" w-9"><p >1</p></td>
                    <td><p class="truncate w-82 px-5 ">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td class="w-24"><p class="w-20 truncate ">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td class=" w-9"><p >1</p></td>
                    <td><p class="truncate w-82 px-5 ">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td class="w-24"><p class="w-20 truncate ">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td class=" w-9"><p >1</p></td>
                    <td><p class="truncate w-82 px-5 ">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td class="w-24"><p class="w-20 truncate ">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td class=" w-9"><p >1</p></td>
                    <td><p class="truncate w-82 px-5 ">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td class="w-24"><p class="w-20 truncate ">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                  <tr class=" cursor-pointer text-center font-sansation-regular h-10 text-sm bg-gray-100 hover:bg-white hover:text-violetdark transition duration-500" >
                    <td class=" w-9"><p >1</p></td>
                    <td><p class="truncate w-82 px-5 ">好きだから。（feat.れん）/ 『ユイカ』【MV】asdsadad</p></td>
                    <td class="w-24"><p class="w-20 truncate ">『ユイカ』asdsadada</p></td>
                    <td class="w-20"><span class="material-icons text-2xl text-blackcoal hover:text-yellow-400 transition duration-500">grade</span></td>
                  </tr>
                </table>
                <div class="underline underline-offset-1 font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">see more</div>
              </div>
              <div class="w-504">
                <div class="ml-14">
                  <div class="font-sansation-bold text-4xl text-blackcoal ">Streaming</div>
                  <div class="overflow-hidden w-448 rounded-lg h-56.5 "  @mouseover="streamingI = true" @mouseleave="streamingI = false">
                    <div v-if="streamingI">
                      <div class="z-20 h-56.5 w-448 font-sansation-bold flex justify-center items-center absolute text-whiteghost text-4xl tracking-wider">
                        <div class="cursor-pointer flex flex-row justify-center items-center hover:text-white transition duration-300">
                          <p>LET'S GO</p>
                          <span class="material-icons text-5xl">chevron_right</span>
                        </div>
                      </div>
                      <div class="z-10 h-56.5 w-448 opacity-40 bg-blackcoal absolute rounded-lg"></div>
                    </div>                   
                    <img src="../assets/yourname.png" v-bind:class="streamingI?'transition delay-95 duration-1000 scale-110':''" style="width:448px ; height: 232px; object-fit: cover;"/>
                  </div>
                  
                </div>  
                <!-- <div>{{topFrist}}</div> -->
              </div>
              <!-- <div>{{topFive}}</div>  -->
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
import { mapGetters } from "vuex";

export default {
  components: {
    ShowMusicTopFive,
    MusicCard
  },
  emits: ['music'],
  computed: {
    ...mapGetters({
      topFive: 'homepage/topFive',
      topFrist: 'homepage/topFrist'
    })
  },
  data() {
    return {
      music: null,
      topOne:false,
      selectMood:false,
      streamingI:false
    }
  },
 methods:{
  // passMusic(e){
  //     console.log(e)
  //    this.$emit('music',{name:'audio1.mp3',image:'sadasd'})
  // },
  acceptData(e) {
      console.log(e);
      // this.music = e;
      this.$emit('music',{name:e.trackFile,image:e.trackThumbnail,nameShow:e.trackName})
      // console.log(this.music);
  },
  ClickMood(){
    this.selectMood = !this.selectMood
  },
  async getContent(){
    await this.$store.dispatch('homepage/getTopFive')
  }
 },
 async created() {
  await this.getContent();
 }
}
</script>
<style >

</style>