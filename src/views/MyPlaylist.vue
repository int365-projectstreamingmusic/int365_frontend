<template>
  <div class="h-screen" :class="sideBarShow ?'lg:ml-75':''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center ">
        <div class="flex 2xl:flex-row flex-col lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 2xl:space-x-1 ">
          <div class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80 ">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">Playground</div>
            <div class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80 my-6  bg-gray-50 rounded-2xl  px-5 2xl:py-10 md:py-5 py-3 flex flex-col font-sansation-light space-y-2">
              <div v-if="notfoundPG" class="sm:h-7 h-5 flex flex-row items-center justify-center lg:text-base md:text-sm text-xxs ">
                "you not have music in your playground"
              </div>
              <loading v-if="playground == '' && !notfoundPG"></loading>
              <div v-if="!notfoundPG" class="space-y-1.5">         
                <div v-for="(playgrounds,index) in playground" :key="playgrounds.track.id" class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base md:text-sm text-xxs ">
                  <div @click="acceptData(playgrounds.track)" class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200">
                    <div class="w-5 text-center">{{index+1}}.</div>
                    <p class="2xl:w-56 xgl:w-504 xl:w-100 md:w-74 sm:w-44 w-32 truncate ">{{playgrounds.track.trackName}}</p>                
                  </div>
                  <div class="flex flex-row md:space-x-1 space-x-2">
                    <div class="md:w-17 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer">add</div>
                    <div @click="deletePlayground(playgrounds.track.id)" class="md:w-20 sm:w-17 w-12 text-center bg-red-500 font-sansation-light text-white rounded-full cursor-pointer">delete</div>
                  </div>
                </div>
              </div>   
            </div>
            <paginate :totalItems="totalPG" :sizePage="totalPagePG" :itemsPerPage="15" :maxPagesShow="4" @pageNum="resPageNum"></paginate>
          </div>
          <div class="2xl:w-720 xgl:w-962 md:w-698 sm:w-466 w-80 ">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">My Playlist</div>
            <div class="2xl:w-720  xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl  md:px-10 md:py-10 p-5 flex flex-col justify-between font-sansation-light">
              <div  class="grid md:gap-x-10 md:gap-y-6.5 gap-y-3 gap-x-3 md:grid-cols-3 grid-cols-2  justify-items-center">
                <div @click="page1('add')">
                  <router-link to="/addmusic" >
                    <empty-card></empty-card> 
                  </router-link>
                </div>  
                <loading v-if="myplaylist == '' && !notfoundPL"></loading>
                <div v-for="(playlist) in myplaylist" :key="playlist.id">
                  <playlist-card v-if="myplaylist != ''" :musicDes="playlist" @music="acceptData" ></playlist-card>
                </div>        
              </div>  
            </div>
            <paginate :totalItems="totalPL" :sizePage="totalPagePL" :itemsPerPage="15" :maxPagesShow="4" @pageNum="resPageNumPL"></paginate>
          </div> 
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import PlaylistCard from "../components/PlaylistCard.vue";
import EmptyCard from "../components/EmptyCard.vue";
import Loading from "../components/Loading.vue";
import Paginate from "../components/Paginate.vue";
export default {
  components: {
    PlaylistCard,
    EmptyCard,
    Paginate,
    Loading
  },
    methods:{
    page1(data){
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    },
    acceptData(e) {
      this.$emit('music',{name:e.trackFile,image:e.trackThumbnail,nameShow:e.trackName})
    },
    resPageNum(e){
      this.pageCurrent = e-1
      this.$store.dispatch('myplaylist/getAllFavorites',e-1)
    },
    resPageNumPL(e){
      this.pageCurrent = e-1
      this.$store.dispatch('myplaylist/getAllMyPlaylist',e-1)
    },
    deletePlaylist(e){
      if(e == 'del' ){
        this.delPlayl = true
        this.optionPlaylist()
      } else {
        this.delPlayl = false 
      }  
    },
    optionPlaylist(e){
      if(e == 'option'){
        this.optionPlayl = !this.optionPlayl 
      }else{
        this.optionPlayl = false
      }
    },
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne',
      getPlayground: 'myplaylist/getAllPlayground',
      deletePlayground: 'myplaylist/delPlayground',
      getAllMyPlaylist: 'myplaylist/getAllMyPlaylist'
    }),
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
      notfoundPG: 'myplaylist/notfoundPG',
      playground: 'myplaylist/playground',
      totalPG: 'myplaylist/totalPG',
      totalPagePG: 'myplaylist/totalPagePG',
      myplaylist: 'myplaylist/myplaylist',
      totalPL: 'myplaylist/totalPL',
      totalPagePL: 'myplaylist/totalPagePL',
      notfoundPL: 'myplaylist/notfoundPL'
    })
  },
  async created() {
    this.handleView();
    this.getPlayground({pagenum:0,pagesize:20});
    this.getAllMyPlaylist();
    window.addEventListener("resize", this.handleView);
 }
}

</script>
