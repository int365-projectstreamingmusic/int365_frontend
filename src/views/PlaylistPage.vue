<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <!-- my playlist -->
      <div class="flex justify-center">
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
      </div>
      <!-- my playlist -->
      <!-- playlist -->
      <div class="flex justify-center">
        <div
          class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3"
        >
          <div
            class="flex flex-row justify-between items-end 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80"
          >
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">
              Playlist
            </div>
            <div
              class="font-sansation-light text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl md:text-base text-ss"
            >
              filter
            </div>
          </div>
          <div
            class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80"
          >
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
            <music-card></music-card>
          </div>
        </div>
      </div>
      <!-- number page -->
      <div
        class="flex flex-row justify-center items-center font-sansation-light space-x-4 mb-10"
      >
        <div class="icon-navbar-outside">
          <span class="material-icons md:text-2xl text-lg">chevron_left</span>
        </div>
        <div>
          <p class="page-number-outside">1</p>
        </div>
        <div>
          <p class="page-number-outside">2</p>
        </div>
        <div>
          <p class="page-number-outside">3</p>
        </div>
        <div>
          <p class="page-number-outside">4</p>
        </div>
        <div class="icon-navbar-outside">
          <span class="material-icons md:text-2xl text-lg">chevron_right</span>
        </div>
      </div>
      <!-- number page -->
      <!-- all song -->
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
import MusicCard from "../components/MusicCard.vue";
import EmptyCard from "../components/EmptyCard.vue";
export default {
  components: {
    MusicCard,
    EmptyCard,
  },
  emits: ["music", "musicQ"],
  computed: {
    ...mapGetters({
      topFive: "homepage/topFive",
      topFrist: "homepage/topFrist",
      sideBarShow: "homepage/sideBarShow",
      mobile: "homepage/mobile",
      logo: "homepage/logo",
      topOne: "homepage/topOne",
      smView: "homepage/smView",
    }),
  },
  methods: {
    ...mapActions({
      // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: "homepage/handleView",
    }),
    passMusic() {
      this.$emit("music", { name: "audio1.mp3", image: "sadasd" });
    },
    passMusicQeue() {
      this.$emit("musicQ", { name: "audio1.mp3", image: "sadasd" });
    },
    page1(data){
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    }
  },
  async created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>
