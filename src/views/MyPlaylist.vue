<template>
  <div class="h-screen" :class="sideBarShow ?'lg:ml-75':''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center mb-44">
        <div class="flex 2xl:flex-row flex-col lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 2xl:space-x-1 ">
          <div class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">Playground</div>
            <div class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80 my-6 2xl:h-full bg-gray-50 rounded-2xl  px-5 2xl:py-10 md:py-5 py-3 flex flex-col justify-between font-sansation-light">
              <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base md:text-sm text-xxs ">
                <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200">
                  <div class="w-5 text-center">1.</div>
                  <p class="2xl:w-52 xgl:w-504 xl:w-100 md:w-74 sm:w-44 w-32 truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
                </div>
                <div class="flex flex-row md:space-x-1 space-x-2">
                  <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer">add</div>
                  <div class="md:w-20 sm:w-17 w-12 text-center bg-red-500 font-sansation-light text-white rounded-full cursor-pointer">delete</div>
                </div>
              </div>   
            </div>
            <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 2xl:mb-10 mb-5">
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-lg">chevron_left</span>
              </div>
              <div>
                <p class="page-number-outside ">1</p>
              </div>
              <div>
                <p class="page-number-outside ">2</p>
              </div>
              <div>
                <p class="page-number-outside ">3</p>
              </div>
              <div>
                <p class="page-number-outside ">4</p>
              </div>
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-lg">chevron_right</span>
              </div>
            </div>
          </div>
          <div class="2xl:w-720 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">My Playlist</div>
            <div class="2xl:w-720  xgl:w-962 md:w-698 sm:w-466 w-80 my-6 h-full bg-gray-50 rounded-2xl  md:px-10 md:py-10 p-5 flex flex-col justify-between font-sansation-light">
              <div class="grid md:gap-x-10 md:gap-y-6.5 gap-y-3 gap-x-3 md:grid-cols-3 grid-cols-2  justify-items-center">
                <music-card></music-card>
                <music-card></music-card>  
                <music-card></music-card>  
                <music-card></music-card>  
                <music-card></music-card>
                <music-card></music-card>
                <empty-card></empty-card>           
              </div>  
            </div>
            <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 2xl:mb-10">
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-lg">chevron_left</span>
              </div>
              <div>
                <p class="page-number-outside ">1</p>
              </div>
              <div>
                <p class="page-number-outside ">2</p>
              </div>
              <div>
                <p class="page-number-outside ">3</p>
              </div>
              <div>
                <p class="page-number-outside ">4</p>
              </div>
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        <!-- my playlist -->
        <!-- <div class="bg-gray-50 rounded-2xl">
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
        </div> -->
        <!-- my playlist -->  
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import MusicCard from "../components/MusicCard.vue";
import EmptyCard from "../components/EmptyCard.vue";
export default {
  components: {
    MusicCard,
    EmptyCard
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
    },
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne'
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
      smView: 'homepage/smView'
    })
  },
  async created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
 }
}

</script>
