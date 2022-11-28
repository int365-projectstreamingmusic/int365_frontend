<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center ">
        <div
          class="flex 2xl:flex-row flex-col lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 my-6 2xl:space-x-1 ">
          <div class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80 ">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">Playground</div>
            <div
              class="2xl:w-466 xgl:w-962 md:w-698 sm:w-466 w-80 my-6  bg-gray-50 rounded-2xl  px-5 2xl:py-10 md:py-5 py-3 flex flex-col font-sansation-light space-y-2">
              <div v-if="notfoundPG"
                class="sm:h-7 h-5 flex flex-row items-center justify-center lg:text-base md:text-sm text-xxs ">
                "you not have music in your playground"
              </div>
              <loading v-if="playground == '' && !notfoundPG"></loading>
              <div v-if="!notfoundPG" class="space-y-1.5">
                <div v-for="(playgrounds, index) in playground" :key="playgrounds.track.id"
                  class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base md:text-sm text-xxs ">
                  <div @click="acceptData(playgrounds.track)"
                    class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200">
                    <div class="w-5 text-center">{{ index + 1 }}.</div>
                    <p class="2xl:w-56 xgl:w-504 xl:w-100 md:w-74 sm:w-44 w-32 truncate ">
                      {{ playgrounds.track.trackName }}</p>
                  </div>
                  <div class="flex flex-row md:space-x-1 space-x-2">
                    <div @click="preAddMusic(playgrounds.track)"
                      class="md:w-17 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer">
                      add</div>
                    <div @click="deletePlayground(playgrounds.track.id)"
                      class="md:w-20 sm:w-17 w-12 text-center bg-red-500 font-sansation-light text-white rounded-full cursor-pointer">
                      delete</div>
                  </div>
                </div>
              </div>
            </div>
            <paginate :totalItems="totalPG" :sizePage="totalPagePG" :itemsPerPage="15" :maxPagesShow="4"
              @pageNum="resPageNum"></paginate>
          </div>
          <div class="2xl:w-720 xgl:w-962 md:w-698 sm:w-466 w-80 ">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 ">My Playlist</div>
            <div
              class="2xl:w-720  xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl  md:px-10 md:py-10 p-5 flex flex-col justify-between font-sansation-light">
              <div
                class="grid md:gap-x-10 md:gap-y-6.5 gap-y-3 gap-x-3 md:grid-cols-3 grid-cols-2  justify-items-center">
                <div @click="page1('add')">
                  <router-link to="/addmusic">
                    <empty-card></empty-card>
                  </router-link>
                </div>
                <loading v-if="myplaylist == '' && !notfoundPL"></loading>
                <div v-for="(playlist) in myplaylist" :key="playlist.id">
                  <playlist-card v-if="myplaylist != ''" :musicDes="playlist" @playlist="acceptDataArr"></playlist-card>
                </div>
              </div>
            </div>
            <paginate :totalItems="totalPL" :sizePage="totalPagePL" :itemsPerPage="15" :maxPagesShow="4"
              @pageNum="resPageNumPL"></paginate>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showPopupAdd"
    class="fixed z-40 sm:top-0 sm:bottom-0 sm:left-0 sm:right-0  -top-65 bottom-0 left-0 right-0  font-sansation-light">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-neutral-50 bg-opacity-75 transition-opacity"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div
        class="border-2 border-gray-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div v-if="!loadingAdd && (confirm || errorAdd)" class="m-8">
          <div v-if="!loadingAdd && confirm" class="flex justify-center mb-5">
            SUCCESSFULLY
          </div>
          <div v-if="!loadingAdd && errorAdd" class="flex justify-center mb-5">
            ERROR
          </div>
          <div class="flex justify-center">
            <div @click="changeShowpopup()"
              class="w-36 h-12 cursor-pointer transition duration-200 rounded-md bg-violetdark text-white flex justify-center item-center font-sansation-regular">
              close
            </div>
          </div>
        </div>
        <loading v-if="loadingAdd && !confirm" class="my-8"></loading>
        <div v-if="!loadingAdd && !confirm && !errorAdd" class="m-8">
          <div v-for="track in track" :key="track.id">
            <div class="flex justify-center">
              <div class=" w-80 flex flex-row justify-center items-center space-x-1 text-sm">
                <div>ADD</div>
                <div class="truncate text-violetdark text-base">{{ track.trackName }}</div>
                <div>To</div>
              </div>
            </div>
          </div>
          <div class="flex justify-center my-5">
            <select v-model="selected" class="rounded-lg bg-neutral-100 w-80 h-6 text-center">
              <option :value="null" disabled selected class="hidden">
                - Select Playlist -
              </option>
              <option v-for="playlist in myplaylist" :key="playlist.id" :value="playlist.id">
                {{ playlist.playlistName }}
              </option>
            </select>
          </div>
          <div class="flex flex-row space-x-3 justify-center items-center select-none">
            <div @click="addToPlaylist()"
              class="w-36 h-9 cursor-pointer transition duration-200 rounded-md bg-green-500 text-white flex justify-center item-center font-sansation-regular">
              add
            </div>
            <div @click="changeShowpopup()"
              class="w-36 h-9 cursor-pointer transition duration-200 rounded-md bg-red-500 text-white flex justify-center item-center font-sansation-regular">
              cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  emits: ["music", "playlist", "musicQ"],
  data() {
    return {
      showPopupAdd: false,
      track: [],
      selected: null,
      loadingAdd: false,
      confirm: false,
      errorAdd: false
    }
  },
  methods: {
    async addToPlaylist() {
      let trackList = []
      for (let index = 0; index < this.track.length; index++) {
        trackList.push({ trackId: this.track[index].id })
      }
      this.loadingAdd = true
      var boolean = await this.addMusicToPalylist({ "id": this.selected, "trackIdList": trackList })
      if (boolean) {
        this.confirm = true
        this.loadingAdd = false
      } else {
        this.loadingAdd = false
        this.errorAdd = true
      }
    },
    changeShowpopup() {
      this.showPopupAdd = !this.showPopupAdd
      this.selected = null
      this.track = []
    },
    preAddMusic(music) {
      this.changeShowpopup()
      this.track.push(music)
    },
    acceptDataArr(e) {
      this.$emit('playlist', e)
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    page1(data) {
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    },

    resPageNum(e) {
      this.pageCurrent = e - 1
      this.$store.dispatch('myplaylist/getAllPlayground', { pagenum: e - 1, pagesize: 20 })
    },
    resPageNumPL(e) {
      this.pageCurrent = e - 1
      this.$store.dispatch('myplaylist/getAllMyPlaylist', { pagenum: e - 1, pagesize: 17 })
    },
    deletePlaylist(e) {
      if (e == 'del') {
        this.delPlayl = true
        this.optionPlaylist()
      } else {
        this.delPlayl = false
      }
    },
    optionPlaylist(e) {
      if (e == 'option') {
        this.optionPlayl = !this.optionPlayl
      } else {
        this.optionPlayl = false
      }
    },
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar',
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne',
      getPlayground: 'myplaylist/getAllPlayground',
      deletePlayground: 'myplaylist/delPlayground',
      getAllMyPlaylist: 'myplaylist/getAllMyPlaylist',
      addMusicToPalylist: 'myplaylist/addMusicToPalylist'
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
    this.getPlayground({ pagenum: 0, pagesize: 20 });
    this.getAllMyPlaylist();
    window.addEventListener("resize", this.handleView);
  }
}
</script>
