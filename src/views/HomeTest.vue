<template>
  <!-- :class="sideBarShow ?'2xl:ml-75':''" -->
    <div class="hometest h-full" :class="sideBarShow ?'lg:ml-75':''" >
      <div class="flex flex-col w-full ">
        <!-- <div class=" flex  " > -->
          <!-- Top5music -->
          <div v-if='!mobile' class="flex justify-center mb-15">
            <loading v-if="topFive == ''"></loading>
            <div v-if="topFive != ''">
              <div class="font-sansation-bold text-4xl text-blackcoal mx-10 mt-3 mb-6">Top 5 Music ALL Time</div>
              <div class="mx-10 2xl:w-1200 w-962 ">
                <div class="flex flex-row relative" >
                  <div class="absolute flex flex-row items-end z-10 justify-between 2xl:w-780 xl:w-962 "  @mouseover="setTopOne(true)" @mouseleave="setTopOne(false)">
                    <div class="bg-blackTopFive opacity-80" style="height: 350px; width: 60px;"></div>
                    <div class="absolute  pl-4 pb-5 text-white text-8xl font-sansation-bold ">1</div>
                    <div v-if="topOne" class="absolute  2xl:bottom-0 right-0 mb-5 2xl:mr-4 mr-80 cursor-pointer text-white w-14 h-14 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
                      <span class="material-icons text-4xl" @click="acceptData(topFrist)">play_arrow</span>
                    </div> 
                  </div>          
                  <div class="overflow-hidden 2xl:w-780 xl:w-962"  style=" height: 350px;">
                    <img :src="url+'api/streaming/image/'+topFrist.trackThumbnail" v-bind:class="topOne?'transition delay-95 duration-700 scale-110 2xl:w-780 xl:w-962':'2xl:w-780 xl:w-962'" style=" height: 350px; object-fit: cover;"/>
                  </div>
                  <div class="bg-blackTopFive  text-slate-50 font-sansation-light text-sm tracking-widest flex items-end w-100" >
                    <div class="mb-6 2xl:ml-9 ml-7 flex flex-col space-y-0.5">
                      <div v-if="topFive != '' && topFrist.trackName">Name: {{topFrist.trackName}}</div>
                      <div v-if="topFive != '' && topFrist.artistTracks[0]">Artist: {{topFrist.artistTracks[0].artistsModel.artistName}}</div>
                      <!-- <div>Album: you name</div> -->
                      <div v-if="topFive && topFive.albums">Album: {{topFive.albums.albumName}}</div>
                      <div v-if="topFive != '' && topFrist.timestamp">Released: {{topFrist.timestamp}}</div>
                      <div v-if="topFive != '' && topFrist.viewCount">Views: {{topFrist.viewCount}}</div>
                    </div> 
                  </div>
                </div>
                <div class="flex flex-row">
                  <div v-for="(musics,index) in topFive" :key="musics.id">
                    <ShowMusicTopFive :musicDes="musics" :count="index" @music="acceptData"></ShowMusicTopFive>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          <!-- mobile top5 -->
          <div v-if='mobile' class="flex justify-center sm:mb-15 mb-8">
            <loading v-if="topFive == ''"></loading>
            <div v-if="topFive != ''">
              <div class="font-sansation-bold md:text-2xl text-xl text-blackcoal lg:mx-10 mt-3 sm:mb-6 mb-3 bg-white">Top 5 Music</div>
              <div class="lg:mx-10 md:w-698 sm:w-466 w-80">
                <div class="flex flex-row relative" >
                  <div class="absolute flex flex-row items-end z-10 justify-between  md:w-698 sm:w-466 w-80"  @mouseover="setTopOne(true)" @mouseleave="setTopOne(false)">
                    <div class="bg-blackTopFive opacity-80 md:h-74 sm:h-60 h-44 md:w-15 sm:w-10 w-6" ></div>
                    <div class="absolute  md:pl-5 sm:pl-4 pl-2 md:pb-5 pb-3 text-white md:text-6xl text-3xl font-sansation-bold ">1</div>
                    <div v-if="topOne" class="absolute  bottom-0  md:mb-6 mb-4 md:ml-81 sm:ml-60 ml-32 cursor-pointer text-white md:w-14 md:h-14 sm:h-10 sm:w-10 w-8 h-8 item-center bg-blackcoal rounded-full shadow-lg hover:bg-violetdark transition duration-500 ">
                      <span class="material-icons md:text-4xl text-3xl" @click="acceptData(topFrist)">play_arrow</span>
                    </div> 
                    <!-- v-if="!topOne" -->
                  </div>          
                  <div class="overflow-hidden md:w-698 sm:w-466 w-80 md:h-74 sm:h-60 h-44">
                    <img :src="url+'api/streaming/image/'+topFrist.trackThumbnail" v-bind:class="topOne?'transition delay-95 duration-700 scale-110 md:h-74 sm:h-60 h-44 md:w-698 sm:w-466 w-60':'md:w-698 sm:w-466 w-60 md:h-74 sm:h-60 h-44'" style="object-fit: cover;"/>
                  </div>
                  <div class="bg-blackTopFive  text-slate-50 font-sansation-light md:text-sm sm:text-xs text-xxs md:tracking-widest flex items-end md:w-100 w-64" >
                    <div class="md:mb-6 mb-4 md:mx-4 ml-3 mr-2 flex flex-col space-y-0.5">
                      <div v-if="topFive != '' && topFrist.trackName">Name: {{topFrist.trackName}}</div>
                      <div v-if="!logo && topFive != '' && topFrist.artistTracks[0] ">Artist: {{topFrist.artistTracks[0].artistsModel.artistName}}</div>
                      <!-- <div v-if="!logo && topFive != ''">Album: you name</div> -->
                      <div v-if="!logo && topFive.albums && topFive != ''">Album: {{topFive.albums.albumName}}</div>
                      <div v-if="!logo && topFive != '' && topFrist.timestamp">Released: {{topFrist.timestamp}}</div>
                      <div v-if="topFive != '' && topFrist.viewCount">Views: {{topFrist.viewCount}}</div>
                    </div> 
                  </div>
                </div>
              </div>
              <div v-for="(musics,index) in topFive" :key="musics.id">
                <ShowMusicTopFive :musicDes="musics" :count="index" @music="acceptData"></ShowMusicTopFive>
              </div>  
            </div>
          </div>
          <!-- /mobile top5 -->
          <!-- /Top5music style="height: 350px; width: 330px;"-->
          <!-- recommend -->
          <!-- v-if='!mobile' -->
          <div  class="flex justify-center sm:mb-15 mb-8">
            <loading v-if="TopFiveInSevenDays == ''"></loading>
            <div v-if="TopFiveInSevenDays != ''" class=" 2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80" >
              <div class="font-sansation-bold  text-blackcoal mb-3 xgl:text-4xl md:text-2xl text-xl">Top 5 Music in 7 Days</div>
              <!-- <div class=" font-sansation-regular mb-6 xgl:text-base text-sm space-y-2" >
                <div class=" ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies eget proin arcu pulvinar. 
                  Nisi, velit luctus ultrices in leo. Sit id interdum tempus, </div>
              </div> -->
              <div class="grid 2xl:grid-cols-6 sm:grid-cols-3 grid-cols-2  gap-4 justify-items-center">
                <div v-for="(musics) in TopFiveInSevenDays" :key="musics.id">
                  <music-card :musicDes="musics" @music="acceptData" @passAddOrDelFavorite="addOrDelFavorite($event)" @passAddOrDelPlayground="addOrDelPlayground($event)"></music-card>
                </div>
              </div>      
            </div>
          </div>       
          <div v-show="authenticated " :class="recentplayed == ''?'':'bg-blackcoal'" class=" w-full flex flex-row justify-center sm:mb-15 mb-8 " >
            <loading v-if="recentplayed == '' && !notfoundRP"></loading>
            <div v-if="recentplayed != '' && recentplayed == 'NOTFOUNDRP' && notfoundRP" class="2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
              <div class="font-sansation-bold  text-white mb-3 xgl:text-4xl md:text-2xl text-xl mt-3">" Not have Recent Played In History "</div>
            </div>
            <div v-if="recentplayed != '' && recentplayed != 'NOTFOUNDRP' && !notfoundRP" class="2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
              <div class="font-sansation-bold  text-white mb-3 xgl:text-4xl md:text-2xl text-xl mt-10">Recent Played</div>
              <div class="grid 2xl:grid-cols-6 sm:grid-cols-3 grid-cols-2  gap-4 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 mb-12">
                <div v-for="(musics) in recentplayed" :key="musics.id">
                  <music-card :musicDes="musics.track" @music="acceptData" @passAddOrDelFavorite="addOrDelFavorite($event)" @passAddOrDelPlayground="addOrDelPlayground($event)"></music-card>
                </div>
              </div>
            </div>
          </div>
          <!--/recommend -->
          <!-- recent releases -->    
          <div  class="flex justify-center mb-20" >
            <loading v-if="recentReleases == ''"></loading>
            <div  v-if="recentReleases != ''" class="2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
                  <div class="font-sansation-bold xgl:text-4xl md:text-2xl text-xl text-blackcoal ">Recent Releases</div>
                  <div class="sm:my-4 my-2">
                    <div class="md:text-base sm:text-sm text-ss flex flex-row justify-between font-sansation-regular tracking-wider border-b-2 border-violetdark text-center  select-none 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 pb-1 space-x-1">
                      <div class="w-10">#</div>
                      <div class="xgl:w-600 md:w-96 w-52">Name</div>
                      <div v-if="smView" class="xgl:w-44 md:w-36 w-20">Artist</div>
                      <div class="xgl:w-20 sm:w-14 w-10"></div>
                    </div>
                    <div v-for="(musics,index) in recentReleases" :key="musics.id">
                      <div @click.self="acceptData(musics)" v-if="musics!=''" class="space-x-1 flex flex-row justify-between items-center font-sansation-regular tracking-wider text-center cursor-pointer 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 sm:py-2 py-1 my-1 rounded-full hover:bg-slate-100 hover:text-violetdark transition duration-500">
                        <div @click.self="acceptData(musics)" class="w-10  md:text-base sm:text-sm text-xs">{{index+1}}</div>
                        <p @click.self="acceptData(musics)" class="truncate xgl:w-600 md:w-96 w-52  md:text-base sm:text-sm text-xs">{{musics.trackName}}</p>
                        <p @click.self="acceptData(musics)" v-if="smView  && musics.artistTracks[0]" class="truncate xgl:w-44 md:w-36  md:text-base sm:text-sm text-xs w-20">{{musics.artistTracks[0].artistsModel.artistName}}</p>
                        <p @click.self="acceptData(musics)" v-if="smView  && !musics.artistTracks[0]" class="truncate xgl:w-44 md:w-36  md:text-base sm:text-sm text-xs w-20">-</p>
                        <div class="xgl:w-20 sm:w-14 w-10 z-30">
                          <div v-if="authenticated" class="flex flex-row justify-between space-x-1 text-blackcoal">
                            <span @click="addOrDelFavorite(musics)" :class="musics.favorite?'text-yellow-400 hover:text-blackcoal' : 'text-blackcoal hover:text-yellow-400'" class="material-icons sm:text-2xl text-base transition duration-500">grade</span>
                            <span @click="addOrDelPlayground(musics)" :class="musics.playground?'text-yellow-400 hover:text-blackcoal' : 'text-blackcoal hover:text-yellow-400'" class="material-icons sm:text-2xl text-base transition duration-500">playlist_add</span> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                  <router-link to="/allsong">
                    <div class="underline underline-offset-1 xgl:text-base text-ss font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">see more</div>
                  </router-link>
            </div> 
          </div> 
          <!-- /recent releases -->
      </div>
    </div>
  </template>
  <script>
  import ShowMusicTopFive from "../components/ShowMusicTopFive.vue";
  import MusicCard from "../components/MusicCard.vue";
  import { mapGetters,mapActions } from "vuex";
  import Loading from "../components/Loading.vue"
  export default {
    components: {
      ShowMusicTopFive,
      MusicCard,
      Loading
    },
    emits: ['music'],
    computed: {
      ...mapGetters({
        topFive: 'homepage/topFive',
        topFrist: 'homepage/topFrist',
        sideBarShow: 'homepage/sideBarShow',
        mobile: 'homepage/mobile',
        logo: 'homepage/logo', 
        topOne: 'homepage/topOne',
        smView: 'homepage/smView',
        TopFiveInSevenDays: 'homepage/topFiveInSevenDays',
        recentplayed: 'homepage/recentplayed',
        authenticated: "authentication/authenticated",
        recentReleases: 'homepage/recentReleases',
        notfound: 'allsong/notfound',
        notfoundRP: 'homepage/notfoundRP'
      })
    },
    data() {
      return {
        music: null,
        streamingI:false,
        url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
      }
    },
   methods:{
    ...mapActions({
        hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
        handleView: 'homepage/handleView',
        setTopOne: 'homepage/setTopOne'
    }),
    // async addOrDelFavorite(music){
    //   if(this.authenticated){
    //     let boolean = music.favorite
    //     console.log(music.id)
    //     if(music.favorite == false){
    //        await this.$store.dispatch('favoritepage/addFavorites',music.id)
    //     } else if(music.favorite == true) {
    //        await this.$store.dispatch('favoritepage/delFavorites',music.id) 
    //     }
    //     this.$store.dispatch('homepage/getRecentReleases')
    //     this.$store.dispatch('homepage/checkFavAndPlay',{idFav:music.id,booleanFav:boolean})
    //   }else{
    //     this.$router.push({ name: 'login' })
    //   }   
    // },
    async addOrDelPlayground(music){
      if(this.authenticated){
        let boolean = music.playground
        await this.$store.dispatch('myplaylist/addOrDelPlayground',music)
        await this.$store.dispatch('homepage/checkFavAndPlay',{idFav:music.id,booleanFav:boolean})
      }else{
        this.$router.push({ name: 'login' })
      }
    },
    async addOrDelFavorite(music){
      // ทำต่อ

      // console.log(feature)
      if(this.authenticated){

        let boolean = music.favorite
        await this.$store.dispatch('favoritepage/addOrDelFavorites',music)
        await this.$store.dispatch('homepage/checkFavAndPlay',{idFav:music.id,booleanFav:boolean})
        // if(this.music.favorite == false){
        //   await  this.$store.dispatch('favoritepage/addFavorites',music.id)
        // } else if(this.music.favorite == true) {
        //   await this.$store.dispatch('favoritepage/delFavorites',music.id) 
        // }
      }else{
        this.$router.push({ name: 'login' })
      }
    },
    acceptData(e) {
        this.$emit('music',{name:e.trackFile,image:e.trackThumbnail,nameShow:e.trackName})
    },
    getContent(){
      this.$store.dispatch('homepage/getTopFive',5)
      this.$store.dispatch('homepage/getTopFiveInSevenDays',{num:6,day:7})
      if(this.authenticated){
        this.$store.dispatch('homepage/getRecentplayed',6)
      }
      this.$store.dispatch('homepage/getRecentReleases')
    }
   },
    created() {
    this.getContent();
    this.handleView();
    window.addEventListener("resize", this.handleView);
   }
  }
  </script>
  <style >
  
  </style>