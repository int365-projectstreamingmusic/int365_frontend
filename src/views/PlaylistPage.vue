<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <!-- my playlist -->
      <!-- <div class="flex justify-center">
        <div>
          <div
            class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3"
          >
            <div class="flex flex-row justify-between items-end">
              <div  class="font-sansation-light xgl:text-2xl md:text-xl text-lg" @click="page1('add')">
                My Playlist
                <router-link  to="/addmusic" 
                  class="text-sm font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer"
                >
                  new playlist
                </router-link>
              </div>

              <div
                class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss"
              >
                see more
              </div>
            </div>
            <div
              class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center"
            >
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <music-card></music-card>
              <empty-card></empty-card>
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="notfoundPL" class="flex justify-center">

      </div>
      <div v-if="authenticated && !notfoundPL" class="flex justify-center">
        <div>
          <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
            <div class="flex flex-row justify-between items-end">
              <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">Recent Played</div>
              <router-link to="/myplaylist">
                <div
                  class="underline underline-offset-1 font-sansation-light text-violetlight hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss">
                  see more</div>
              </router-link>
            </div>
            <loading v-if="myplaylist == '' && !notfoundPL"></loading>
            <div v-if="myplaylist != ''"
              class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center">
              <div v-for="(playlist) in myplaylist" :key="playlist.id">
                <playlist-card :musicDes="playlist" @playlist="acceptDataArr"></playlist-card>
              </div>
              <div @click="page1('add')">
                <router-link to="/addmusic">
                  <empty-card></empty-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- my playlist -->
      <!-- playlist -->
      <div class="flex justify-center">
        <div class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="flex flex-row justify-between items-end 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">All Playlist</div>
            <!-- <div class="font-sansation-light text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss">filter</div>                -->
          </div>
          <loading v-if="allPlaylist == '' && !notfoundAPL"></loading>
          <div v-if="allPlaylist != ''"
            class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div v-for="(playlist) in allPlaylist" :key="playlist.id">
              <playlist-card :musicDes="playlist" @playlist="acceptDataArr"></playlist-card>
            </div>
          </div>
        </div>
      </div>
      <paginate :totalItems="totalPlaylist" :sizePage="totalPageAPL" :itemsPerPage="15" :maxPagesShow="4"
        @pageNum="resPageNum"></paginate>
    </div>
  </div>
  <!-- <div class="playlist pl-80">
    <div @click="passMusic()">Playasd</div>
  </div>
  <div class="playlist pl-80">
    <div @click="passMusicQeue()">playQueue</div>
  </div> -->
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Paginate from "../components/Paginate.vue";
import Loading from "../components/Loading.vue"
import EmptyCard from "../components/EmptyCard.vue";
import PlaylistCard from "../components/PlaylistCard.vue";

export default {
  components: {
    PlaylistCard,
    Paginate,
    Loading,
    EmptyCard,
  },
  emits: ["music", "musicQ", "playlist"],
  computed: {
    ...mapGetters({
      topFive: "homepage/topFive",
      topFrist: "homepage/topFrist",
      sideBarShow: "homepage/sideBarShow",
      mobile: "homepage/mobile",
      logo: "homepage/logo",
      topOne: "homepage/topOne",
      smView: "homepage/smView",
      allPlaylist: "allplaylist/allPlaylist",
      totalPlaylist: 'allplaylist/totalPlaylist',
      totalPageAPL: 'allplaylist/totalPageAPL',
      notfoundAPL: 'allplaylist/notfoundAPL',
      authenticated: "authentication/authenticated",
      myplaylist: 'myplaylist/myplaylist',
      totalPL: 'myplaylist/totalPL',
      totalPagePL: 'myplaylist/totalPagePL',
      notfoundPL: 'myplaylist/notfoundPL',
      authenticated: "authentication/authenticated",
    }),
  },
  methods: {
    ...mapActions({
      // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: "homepage/handleView",
      getAllPlaylist: 'allplaylist/getAllPlaylist',
      getAllMyPlaylist: 'myplaylist/getAllMyPlaylist'
    }),
    acceptDataArr(e) {
      this.$emit('playlist', e)
    },
    // passMusic() {
    //   this.$emit("music", { name: "audio1.mp3", image: "sadasd" });
    // },
    passMusicQeue() {
      this.$emit("musicQ", { name: "audio1.mp3", image: "sadasd" });
    },
    resPageNum(e) {
      this.pageCurrent = e - 1
      this.$store.dispatch('allplaylist/getAllPlaylist', { pagenum: e - 1, pagesize: 17 })
    },
    page1(data) {
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    }
  },
  async created() {
    this.handleView();
    this.getAllPlaylist();
    if(this.authenticated){
      this.getAllMyPlaylist({ pagenum: 0, pagesize: 5 });
    }
    window.addEventListener("resize", this.handleView);
  },
};
</script>
