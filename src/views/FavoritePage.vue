<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center">
        <div v-if="authenticated" class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div v-if="notfound" class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-center">" Hmm.. , you
            don't seem to have your favorite song yet. "</div>
          <div v-if="notfound" class="flex flex-row items-center justify-center space-x-3">
            <div class="font-sansation-light xgl:text-xl md:text-lg text-base">Cilck Here -></div>
            <router-link v-if="favorites == ''" to="/allsong" @click="pathPage('/allsong')">
              <div
                class="font-sansation-regular hover:text-violetdark transition duration-200 underline underline-offset-4  xgl:text-2xl md:text-xl text-lg text-center"
                v-bind:class="this.path == '/allsong' ? '' : ''">All Song Page</div>
            </router-link>
          </div>
          <div class="flex flex-row justify-between items-end 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">Favorites</div>
          </div>
          <loading v-if="favorites == '' && !notfound"></loading>
          <div v-if="favorites != ''"
            class="grid 2xl:grid-cols-6 xgl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3.6 gap-2 justify-items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80">
            <div v-for="(musics) in favorites" :key="musics.id">
              <music-card :musicDes="musics.track" @music="acceptData" @passAddOrDelFavorite="addOrDelFavorite($event)">
              </music-card>
            </div>
          </div>
        </div>
        <div v-else
          class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3  flex flex-col items-center">
          <div class="font-sansation-bold md:text-2xl text-base flex flex-row space-x-2">
            <div>" Please Login or Register "</div>
          </div>
        </div>
      </div>
      <paginate :totalItems="totalFav" :sizePage="totalPage" :itemsPerPage="15" :maxPagesShow="4" @pageNum="resPageNum">
      </paginate>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { mapGetters, mapActions } from "vuex";
import MusicCard from "../components/MusicCard.vue";
import Paginate from "../components/Paginate.vue";
import Loading from "../components/Loading.vue"
export default {
  components: {
    MusicCard,
    Paginate,
    Loading
  },
  emits: ['music', 'musicQ', 'path'],
  mounted() {
    const route = useRoute();
    this.$emit('path', route.path)
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
      totalFav: 'favoritepage/totalFav',
      totalPage: 'favoritepage/totalPage'
    })
  },
  data() {
    return {
      pageCurrent: 0
    }
  },
  methods: {
    ...mapActions({
      handleView: 'homepage/handleView',
    }),
    async addOrDelFavorite(music) {
      if (this.authenticated) {
        await this.$store.dispatch('favoritepage/addOrDelFavorites', music)
        await this.$store.dispatch('favoritepage/getAllFavorites')
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    passMusic() {
      this.$emit('music', { name: 'audio1.mp3', image: 'sadasd' })
    },
    resPageNum(e) {
      this.pageCurrent = e - 1
      this.$store.dispatch('favoritepage/getAllFavorites', e - 1)
    },
    passMusicQeue() {
      this.$emit('musicQ', { name: 'audio1.mp3', image: 'sadasd' })
    },
    getContent() {
      this.$store.dispatch('favoritepage/getAllFavorites')
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
  },
  async created() {
    this.getContent();
    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
}
</script>