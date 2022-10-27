<template>
  <div class="h-screen" :class="sideBarShow ?'lg:ml-75':''">
    <div class="flex flex-col w-full">
      <!-- recent played -->
      <div v-if="notfoundRP" class="flex justify-center">
        
      </div>
      <div v-if="authenticated && !notfoundRP" class="flex justify-center">
        <div>
          <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
            <div class="flex flex-row justify-between items-end">
              <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">Recent Played</div>
              <div class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss">see more</div>               
            </div>
            <loading v-if="recentplayed == ''"></loading>
            <div v-if="recentplayed != ''" class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center">
              <div v-for="(musics) in recentplayed" :key="musics.id">
                <music-card :musicDes="musics.track" @music="acceptData"></music-card>
              </div>          
            </div>
          </div>
        </div>
      </div>
      <!-- recent played -->
      <!-- all song -->
      <div class="flex justify-center">
        <div class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="flex flex-row justify-between items-end 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
           <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">All Song</div>
           <!-- <div class="font-sansation-light text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss">filter</div>                -->
          </div>
          <loading v-if="allSong == ''"></loading>
          <div v-if="allSong != ''" class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div v-for="(musics) in allSong" :key="musics.id">
              <music-card :musicDes="musics" @music="acceptData" @passAddOrDelFavorite="addOrDelFavorite($event)"></music-card>
            </div>    
          </div>
        </div>       
      </div>
      <paginate :totalItems="totalSong" :sizePage="totalPage" :itemsPerPage="15" :maxPagesShow="4" @pageNum="resPageNum"></paginate>
      <!-- all song -->
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import MusicCard from "../components/MusicCard.vue";
import Paginate from "../components/Paginate.vue";
import Loading from "../components/Loading.vue"
export default {
  components: {
    MusicCard,
    Paginate,
    Loading
  },
  data() {
    return {
      pageCurrent: 0
    }
  },
  computed: {
    ...mapGetters({
      topFive: 'homepage/topFive',
      topFrist: 'homepage/topFrist',
      sideBarShow: 'homepage/sideBarShow',
      mobile: 'homepage/mobile',
      logo: 'homepage/logo', 
      topOne: 'homepage/topOne',
      smView: 'homepage/smView',
      recentplayed: 'homepage/recentplayed',
      authenticated: "authentication/authenticated",
      allSong: 'allsong/allSong',
      notfound: 'allsong/notfound',
      notfoundRP: 'homepage/notfoundRP',
      totalSong: 'allsong/totalSong',
      totalPage: 'allsong/totalPage'
    })
  },
  methods:{
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne'
    }),
    resPageNum(e){
      console.log(e-1)
      this.pageCurrent = e-1
      this.$store.dispatch('allsong/getAllSong',e-1)
    },
    acceptData(e) {
      console.log(e);
      this.$emit('music',{name:e.trackFile,image:e.trackThumbnail,nameShow:e.trackName})
    },
    getContent(){
      if(this.authenticated){
        this.$store.dispatch('homepage/getRecentplayed',6)
      }
      this.$store.dispatch('allsong/getAllSong')
    },
    async addOrDelFavorite(music){
      if(this.authenticated){
        let boolean = music.favorite
        await this.$store.dispatch('favoritepage/addOrDelFavorites',music)
        await this.$store.dispatch('homepage/checkFavAndPlay',{idFav:music.id,booleanFav:boolean})
        await this.$store.dispatch('allsong/getAllSong',this.pageCurrent)
      }else{
        this.$router.push({ name: 'login' })
      }
    },
  },
  async created() {
    this.getContent();
    this.handleView();
    window.addEventListener("resize", this.handleView);
 }

}
</script>
<style>

</style>