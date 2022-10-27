<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <div
            class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl sm:pt-10 pt-5 pb-5">
            <div class="sm:mx-10 mx-5 flex flex-row justify-between relative">
              <div class=" flex flex-row ">
                <div
                  class="overflow-hidden rounded-2xl shadow-lg xgl:w-44.5 xgl:h-52.5 md:w-36 md:h-40 sm:w-28 sm:h-32 w-20 h-24">
                  <img
                    v-show="this.onePlaylist.playlist.thumbnail != '' && this.onePlaylist.playlist.thumbnail != null && this.onePlaylist.playlist.thumbnail != undefined"
                    :src="url + 'api/streaming/image/' + this.onePlaylist.playlist.thumbnail"
                    class="xgl:w-44.5 xgl:h-52.5 md:w-36 md:h-40 sm:w-28 sm:h-32 w-20 h-24"
                    style=" object-fit: cover;" />

                </div>
                <div class="flex items-end ">
                  <div
                    class="xgl:w-96 md:w-80 sm:w-54 w-40 xgl:ml-7 sm:ml-4 ml-2 xgl:mr-7 xgl:space-y-3 space-y-1 flex flex-col ">
                    <div
                      class="font-sansation-bold text-blackTopFive leading-tight xgl:text-lg md:text-base sm:text-ss text-mxs">
                      {{ this.onePlaylist.playlist.playlistName }}</div>
                    <div class="font-sansation-regular md:text-ss ms:text-xs sm:text-ss text-mxs text-blackTopFive">
                      {{ this.onePlaylist.playlist.playlistDesc }}</div>
                    <div
                      class="md:w-24 md:h-6 sm:h-5 h-4 sm:w-20 w-15 font-sansation-light bg-violetdark md:text-ss sm:text-xs text-xxs text-white flex justify-center item-center rounded-3xl cursor-pointer">
                      <p>play now</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer select-none z-30 static">
                <span
                  class="material-icons active:text-violetdark hover:text-violetdark transition duration-200 flex justify-end lg:text-3xl md:text-2xl sm:text-xl text-lg"
                  @click="optionPlaylist('option')">more_vert</span>
                <transition name="fade">
                  <div v-if="optionPlayl"
                    class="md:w-44 sm:w-32 w-24 py-1 md:mt-2  absolute  right-0 font-sansation-regular space-y-0 border border-gray-200 rounded-md bg-white md:text-sm sm:text-ss text-xxs shadow-md">
                    <div @click="editInfoPlaylist()"
                      class="text-right text-red-500 hover:text-shadow-xl  p-1 xgl:pl-8 md:pr-2 pr-1 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">
                      <router-link to="/addmusic">
                        edit playlist</router-link>
                    </div>
                    <div @click="managePlaylist('manage')"
                      class="text-right text-blackcoal hover:text-shadow-xl hover:text-violetdark p-1 xgl:pl-8 md:pr-2 pr-1 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">
                      manage playlist</div>
                    <div @click="deletePlaylist('del')"
                      class="text-right text-red-500 hover:text-shadow-xl  p-1 xgl:pl-8 md:pr-2 pr-1 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">
                      delete playlist</div>
                  </div>
                </transition>
                <!-- v-if="optionPlayl" -->
              </div>
            </div>
            <div class=" font-sansation-light sm:mx-10 mx-5 mt-7">
              <div class="2xl:w-1120 w-full text-center h-full  overflow-y-auto">
                <div class="border-b-2 border-violetdark sm:text-sm text-xxs ">
                  <div class="2xl:w-1120 w-full h-9 flex flex-row">
                    <div class="w-6 pb-1 pr-1"></div>
                    <div class="2xl:w-10 w-4  pb-1">#</div>
                    <div class="text-left md:px-3 sm:px-2 px-1 pb-1 2xl:w-669 ">name</div>
                    <div class="2xl:w-54 pb-1  md:w-36 sm:w-20 w-15">album</div>
                    <div class="2xl:w-32 pb-1 md:w-28 sm:w-24 w-17">release</div>
                  </div>
                </div>
                <div class="sm:text-sm text-xxs">
                  <div v-for="(item, index) in this.onePlaylist.tracksInfo.content" :key="index"
                    class="2xl:w-1120 w-full h-9 my-2 flex flex-row">
                    <div v-show="!manPlaylist" class="w-6 pr-1"></div>
                    <div v-show="manPlaylist" class="w-6 pr-1 cursor-pointer">
                      <!-- <span class="material-icons text-sm text-blackcoal">radio_button_unchecked</span> -->
                      <span
                        class="material-icons  text-violetdark  xl:text-xl sm:text-base text-sm ">check_circle</span>
                    </div>
                    <div class="2xl:w-10 w-4">{{ index + 1 }}</div>
                    <div class="2xl:w-669 md:px-3 sm:px-2 px-1 text-left  truncate ">{{ item.trackName }}</div>
                    <div class="2xl:w-54 md:w-36 sm:w-20 w-15 truncate">xxxxxxxxxxxx</div>
                    <div class="2xl:w-32  md:w-28 sm:w-24 w-17">14-08-2000</div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-between mt-8 items-center">
                <div class="sm:text-base text-xxs text-gray-400 font-sansation-regular tracking-wider">
                  {{ this.onePlaylist.tracksInfo.content.length }}/20</div>
                <div v-show="delPlayl"
                  class="flex flex-row  sm:space-x-3 space-x-2 justify-end xl:text-sm sm:text-ss text-xxs">
                  <div
                    class="bg-black text-center xl:w-24 xl:h-7 sm:w-20 w-14 sm:h-6 h-4 rounded-full text-white flex items-center justify-center cursor-pointer">
                    Delete</div>
                  <div @click="deletePlaylist()"
                    class="bg-black xl:w-24 xl:h-7 sm:w-20 w-14 sm:h-6 h-4 text-center  rounded-full text-white flex items-center justify-center cursor-pointer">
                    Cancel</div>
                </div>
                <div v-show="manPlaylist"
                  class="flex flex-row  sm:space-x-3 space-x-2 justify-end xl:text-sm sm:text-ss text-xxs">
                  <div
                    class="bg-black text-center xl:w-24 xl:h-7 sm:w-20 w-14 sm:h-6 h-4 rounded-full text-white flex items-center justify-center cursor-pointer">
                    Delete</div>
                  <div @click="managePlaylist()"
                    class="bg-black xl:w-24 xl:h-7 sm:w-20 w-14 sm:h-6 h-4 text-center  rounded-full text-white flex items-center justify-center cursor-pointer">
                    Cancel</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="mx-10 w-1200">
            <div class="mx-9 ">
              <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row justify-between ">
                  <div class="font-sansation-light text-2xl">Playground</div>
                </div>
                <div class="font-sansation-light text-sm text-blackcoal hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl">filter</div>                 
              </div>
            </div>
          </div>   
          <div class="bg-gray-50 rounded-2xl mx-10 w-1200 px-10 py-7 my-5">
              <div class="grid grid-cols-5 gap-x-11.3 gap-y-5">
                <music-card></music-card>
                <music-card></music-card>  
                <music-card></music-card>  
                <music-card></music-card>  
                <music-card></music-card>
                <music-card></music-card>         
              </div>
          </div> -->
          <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 lg:mx-10">Playground
          </div>
          <div
            class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl h-fit sm:px-10 px-5 py-5 flex flex-col space-y-2 font-sansation-light">
            <div v-if="notfoundPG"
              class="sm:h-7 h-5 flex flex-row items-center justify-center lg:text-base md:text-sm text-xxs ">
              "you not have music in your playground"
            </div>
            <loading v-if="playground == '' && !notfoundPG"></loading>
            <div v-if="!notfoundPG">
              <div v-for="(playgrounds, index) in playground" :key="playgrounds.track.id"
                class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base md:text-sm text-xxs ">
                <div @click="acceptData(playgrounds.track)"
                  class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200">
                  <div class="sm:w-10 w-5 text-center">{{ index + 1 }}.</div>
                  <p class="2xl:w-800 xgl:w-504 xl:w-100 md:w-74 sm:w-44 w-32 truncate ">{{ playgrounds.track.trackName
                  }}
                  </p>
                </div>
                <div class="flex flex-row md:space-x-3 space-x-2">
                  <div 
                    class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer">
                    add</div>
                  <div @click="deletePlayground(playgrounds.track.id)"
                    class="md:w-20 sm:w-17 w-12 text-center bg-red-500 font-sansation-light text-white rounded-full cursor-pointer">
                    delete</div>
                </div>
              </div>
            </div>
          </div>
          <paginate :totalItems="totalPG" :sizePage="totalPagePG" :itemsPerPage="15" :maxPagesShow="4"
            @pageNum="resPageNumPG"></paginate>
          <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 mb-20 ">
            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5">Comment</div>
            <div class="flex flex-row items-center sm:space-x-4 space-x-2 mx-3 mb-5">
              <div class="overflow-hidden rounded-full shadow-lg md:w-13 md:h-13 w-10 h-10">
                <img :src="pic" class="md:w-13 md:h-13 w-10 h-10" style=" object-fit: cover;" />
              </div>
              <input type="text"
                class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-10 h-7 2xl:w-504 lg:w-466  w-56 md:px-6 sm:px-2 px-1 font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                placeholder="Comment" v-model="comment" />
            </div>
            <div class="bg-neutral-50 rounded-lg p-3 h-full flex flex-row">
              <div class="overflow-hidden rounded-full shadow-lg md:w-13 md:h-13 w-10 h-10">
                <img :src="pic" class="md:w-13 md:h-13 w-10 h-10" style=" object-fit: cover;" />
              </div>
              <div class="2xl:w-1120 xgl:w-800 md:w-600 sm:w-96 w-64 sm:pl-5 pl-2 font-sansation-light">
                <div class="flex flex-row space-x-2 items-center">
                  <div class="font-sansation-bold md:text-lg text-sm text-blackcoal">LiOzAsDus</div>
                  <div class="md:text-xs text-mxs tracking-widest">1/10/65</div>
                </div>
                <div class="md:text-base leading-tight sm:text-sm text-xxs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tincidunt cursus neque nascetur sit
                  velit etiam rutrum. Amet, purus donec lectus semper molestie amet vitae scelerisque sit. Facilisi
                  facilisis nisl lacus eu pharetra ultrices ipsum ipsum orci.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   
<script>
import MusicCard from "../components/MusicCard.vue";
import Loading from "../components/Loading.vue";
import Paginate from "../components/Paginate.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    MusicCard,
    Paginate,
    Loading
  },
  data() {
    return {
      optionPlayl: false,
      delPlayl: false,
      manPlaylist: false,
      pic: require('../assets/948523.png'),
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
    }
  },
  methods: {
    optionPlaylist(e) {
      if (e == 'option') {
        this.optionPlayl = !this.optionPlayl
      } else {
        this.optionPlayl = false
      }
    },
    managePlaylist(e) {
      if (e == 'manage') {
        this.manPlaylist = true
        this.optionPlaylist()
      } else {
        this.manPlaylist = false
      }
    },
    deletePlaylist(e) {
      if (e == 'del') {
        this.delPlayl = true
        this.optionPlaylist()
      } else {
        this.delPlayl = false
      }
    },
    acceptData(e) {
      console.log(e);
      console.log(e.trackName, e.trackFile, e.trackThumbnail)
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    resPageNumPG(e) {
      console.log(e - 1)
      this.pageCurrent = e - 1
      this.$store.dispatch('myplaylist/getAllFavorites', e - 1)
    },
    editInfoPlaylist() {
      localStorage.setItem("idPlaylist", this.onePlaylist.playlist.id);
      localStorage.setItem("addOrUp", "editPlaylist");
    },
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne',
      getOnePlaylist: 'oneplaylist/getOnePlaylist',
      getPlayground: 'myplaylist/getAllPlayground',
      deletePlayground: 'myplaylist/delPlayground',
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
      onePlaylist: 'oneplaylist/onePlaylist',
      notfoundPG: 'myplaylist/notfoundPG',
      playground: 'myplaylist/playground',
      totalPG: 'myplaylist/totalPG',
      totalPagePG: 'myplaylist/totalPagePG',
    })
  },
  async created() {
    this.getPlayground({ pagenum: 0, pagesize: 10 });
    this.handleView();
    this.getOnePlaylist();
    window.addEventListener("resize", this.handleView);
  }
}
</script> 
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  /* transition-duration: 0.2s;
  transition-timing-function: linear; */
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0
}

table {
  display: flex;
  flex-flow: column;
  height: 400px;

}

thead {
  flex: 0 0 auto;
}

tbody {
  flex: 1 1 auto;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
}

tr {
  display: table;
  table-layout: fixed;
}
</style>