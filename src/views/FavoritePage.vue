<template>
  <div class="h-screen"  :class="sideBarShow ?'lg:ml-75':''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center">
        <div v-if="authenticated" class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div v-if="favorites == '' || notfound" class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-center">" Hmm.. , you don't seem to have your favorite song yet. "</div>
          <div v-if="notfound" class="flex flex-row items-center justify-center space-x-3">
            <div class="font-sansation-light xgl:text-xl md:text-lg text-base">Cilck Here -></div>
            <router-link v-if="favorites == ''" to="/allsong" @click="pathPage('/allsong')" >
              <div class="font-sansation-regular hover:text-violetdark transition duration-200 underline underline-offset-4  xgl:text-2xl md:text-xl text-lg text-center" v-bind:class="this.path == '/allsong' ? '' : ''">All Song Page</div>
            </router-link>
          </div>
          <div v-if="favorites != ''" class="flex flex-row justify-between items-end 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
           <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">Favorites</div>
           <div class="font-sansation-light text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss">filter</div>               
          </div>
          <div v-if="favorites != ''" class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div v-for="(musics) in favorites" :key="musics.id">
              <music-card :musicDes="musics.track" @music="acceptData"></music-card>
            </div>  
          </div>
        </div>
        <div v-else class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3  flex flex-col items-center">
          <div class="font-sansation-bold md:text-2xl text-base flex flex-row space-x-2">
            <div>" Please Login or Register "</div>
          </div>
        </div>        
      </div>
    <paginate v-if="authenticated && favorites != ''" :totalItems="110" :itemsPerPage="15" :maxPagesShow="4"></paginate>
    </div>
  </div>    
</template>
<script>
import {useRoute} from 'vue-router'
import { mapGetters,mapActions } from "vuex";
import MusicCard from "../components/MusicCard.vue";
import EmptyCard from "../components/EmptyCard.vue";
import Paginate from "../components/Paginate.vue";
export default {
  components: {
    MusicCard,
    EmptyCard,
    Paginate
  },
  emits: ['music','musicQ','path'],
  mounted(){
    const route=useRoute();
    this.$emit('path',route.path)
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
      notfound: 'favoritepage/notfound',
      favorites: 'favoritepage/favorites',
      authenticated: "authentication/authenticated",
    })
  },
  methods:{
    ...mapActions({
    // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
    }),
    passMusic(){
     this.$emit('music',{name:'audio1.mp3',image:'sadasd'})
    },
    passMusicQeue(){
     this.$emit('musicQ',{name:'audio1.mp3',image:'sadasd'})
    },
    getContent(){
      this.$store.dispatch('favoritepage/getAllFavorites')
    },
    acceptData(e) {
      console.log(e);
      this.$emit('music',{name:e.trackFile,image:e.trackThumbnail,nameShow:e.trackName})
    },
  },
  async created() {
    this.getContent();
    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
}
</script>