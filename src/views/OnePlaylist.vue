<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <div class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl  pt-5 pb-5">
            <loading v-if="onePlaylist == ''"></loading>
            <div v-if="onePlaylist != ''" class="sm:mx-10 mx-5 flex flex-row justify-between relative">
              <div class=" flex flex-row ">
                <div
                  class="overflow-hidden rounded-2xl shadow-lg xgl:w-44.5 xgl:h-52.5 md:w-36 md:h-40 sm:w-28 sm:h-32 w-20 h-24">
                  <img v-if="onePlaylist != ''" :src="url + 'api/streaming/image/' + onePlaylist.playlist.thumbnail"
                    class="xgl:w-44.5 xgl:h-52.5 md:w-36 md:h-40 sm:w-28 sm:h-32 w-20 h-24"
                    style=" object-fit: cover;" />
                </div>
                <div class="flex items-end ">
                  <div
                    class="xgl:w-600 md:w-100 sm:w-54 w-40 xgl:ml-7 sm:ml-4 ml-2 xgl:mr-7 xgl:space-y-3 space-y-1 flex flex-col ">
                    <div
                      class="font-sansation-bold text-blackTopFive leading-tight xgl:text-lg md:text-base text-ss truncate">
                      {{ this.onePlaylist.playlist.playlistName }}</div>
                    <div
                      class="font-sansation-regular md:text-ss ms:text-xs sm:text-ss text-mxs  text-blackTopFive sm:h-20 h-11 text-clip overflow-y-scroll">
                      {{ this.onePlaylist.playlist.playlistDesc }} </div>
                    <div @click="acceptDataArr()"
                      class="md:w-24 md:h-6 sm:h-5 h-4 sm:w-20 w-15 font-sansation-light bg-violetdark md:text-ss sm:text-xs text-xxs text-white flex justify-center item-center rounded-3xl cursor-pointer">
                      <p>play now</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="userId != null && onePlaylist.playlist.userAccountModel != undefined && userId == onePlaylist.playlist.userAccountModel.accountId"
                class="cursor-pointer select-none z-30 static">
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
                    <div @click="changeShowpopup()"
                      class="text-right text-red-500 hover:text-shadow-xl  p-1 xgl:pl-8 md:pr-2 pr-1 mx-2 hover:bg-gray-100 transition duration-200 rounded-md">
                      delete playlist</div>
                  </div>
                </transition>
                <!-- v-if="optionPlayl" -->
              </div>
            </div>
            <div v-if="onePlaylist != ''" class=" font-sansation-light sm:mx-10 mx-5 sm:mt-7 mt-4">
              <div class="2xl:w-1120 w-full text-center h-full">
                <div class="border-b-2 border-violetdark sm:text-sm text-xxs ">
                  <div
                    class="2xl:w-1120  xl:w-full md:w-600 w-full sm:h-9 h-6 flex flex-row justify-center items-center">
                    <!-- <div class="w-6 pb-1 pr-1"></div> -->
                    <div class="2xl:w-10 w-4  pb-1">#</div>
                    <div class="text-left md:px-3 sm:px-2 px-1 pb-1 2xl:w-669 xl:w-504 md:w-74 w-36">name</div>
                    <div class="2xl:w-54 pb-1 xl:w-36 md:w-32 sm:w-20 w-15">album</div>
                    <div class="2xl:w-32 pb-1 md:w-28 sm:w-24 w-17">release</div>
                  </div>
                </div>
                <div class="sm:text-sm text-xxs">
                  <div @click="acceptData(item)" v-for="(item, index) in onePlaylist.tracksInfo.content" :key="index"
                    class="2xl:w-1120  xl:w-full md:w-600 w-full sm:h-9 h-6 md:my-2 my-1 flex flex-row justify-center items-center hover:text-violetdark hover:bg-slate-100 cursor-pointer transition duration-200 rounded-full">
                    <div class="2xl:w-10 w-4">{{ index + 1 }}</div>
                    <div class="2xl:w-669 xl:w-504 md:w-74 w-36 md:px-3 sm:px-2 px-1 text-left  truncate ">{{
                        item.trackName
                    }}</div>
                    <div class="2xl:w-54 xl:w-36 md:w-32 sm:w-20 w-15 truncate">{{ item.albums.albumName }}</div>
                    <div class="2xl:w-32  md:w-28 sm:w-24 w-17">{{ item.timestamp }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showPopupDel"
            class="fixed z-40 sm:top-0 sm:bottom-0 sm:left-0 sm:right-0  -top-65 bottom-0 left-0 right-0 font-sansation-light">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div class="fixed inset-0 bg-neutral-50 bg-opacity-75 transition-opacity"></div>
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              <div
                class="border-2 border-gray-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div v-if="!loadingDel && (confirm || errorDel)" class="m-8">
                  <div v-if="!loadingDel && confirm" class="flex justify-center mb-5">
                    SUCCESSFULLY
                  </div>
                  <div v-if="!loadingDel && errorDel" class="flex justify-center mb-5">
                    ERROR
                  </div>
                  <div class="flex justify-center">
                    <div @click="changeShowpopup('myplaylist')"
                      class="w-36 h-12 cursor-pointer transition duration-200 rounded-md bg-violetdark text-white hover:shadow-xl hover:border-violet-800 hover:text-shadow-xl hover:border-2 flex justify-center item-center font-sansation-regular">
                      close
                    </div>
                  </div>
                </div>
                <loading v-if="loadingDel && !confirm" class="my-8"></loading>
                <div v-if="!loadingDel && !confirm && !errorDel" class="m-8">
                  <div class="flex justify-center text-sm">
                    please type text
                  </div>
                  <div v-if="onePlaylist != ''" class="flex justify-center text-lg font-semibold select-none">
                    "{{ this.onePlaylist.playlist.playlistName }}"
                  </div>
                  <div class="flex justify-center text-sm">
                    for confirm to delete
                  </div>
                  <div class="flex justify-center mt-5 " :class="textWrong ? 'mb-3' : 'mb-5'">
                    <input v-model="message" placeholder="write your playlist name"
                      :class="textWrong ? 'border-2 border-red-500 text-red-500' : ''"
                      class="w-80 h-10 text-center hover-focus-input transition duration-200 rounded-md border-2 text-sm md:text-base" />
                  </div>
                  <div v-show="textWrong" class="text-sm text-red-500 text-center mb-3">error: does not match with text
                  </div>
                  <div class="flex flex-row space-x-3 justify-center items-center select-none">
                    <div @click="changeShowpopup()"
                      class="w-36 h-9 cursor-pointer transition duration-200 rounded-md bg-neutral-500 hover:shadow-xl hover:border-blackcoal hover:border-2 hover:text-shadow-xl  text-white flex justify-center item-center font-sansation-light">
                      cancel
                    </div>
                    <div @click="delToPlaylist()"
                      class="w-36 h-9 cursor-pointer transition duration-200 rounded-md bg-red-500 hover:shadow-xl hover:border-red-700 hover:text-shadow-xl hover:border-2  text-white flex justify-center item-center font-sansation-ligth">
                      delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="authenticated && onePlaylist != '' && onePlaylist.playlist.userAccountModel != undefined && userId == onePlaylist.playlist.userAccountModel.accountId"
            class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5 lg:mx-10">Playground</div>

          <div
            v-if="authenticated && onePlaylist != '' && onePlaylist.playlist.userAccountModel != undefined && userId == onePlaylist.playlist.userAccountModel.accountId"
            class="lg:mx-10 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 my-6 bg-gray-50 rounded-2xl h-fit sm:px-10 px-5 py-5 flex flex-col space-y-2 font-sansation-light">
            <div v-if="notfoundPG"
              class="sm:h-7 h-5 flex flex-row items-center justify-center lg:text-base md:text-sm text-xxs ">
              "you not have music in your playground"
            </div>
            <loading v-if="playground == '' && !notfoundPG"></loading>
            <div v-if="playground != '' && !notfoundPG">
              <div v-for="(playgrounds, index) in playground" :key="playgrounds.track.id"
                class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base md:text-sm text-xxs ">
                <div @click="acceptData(playgrounds.track)"
                  class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200">
                  <div class="sm:w-10 w-5 text-center">{{ index + 1 }}.</div>
                  <p class="2xl:w-800 xgl:w-504 xl:w-100 md:w-74 sm:w-44 w-32 truncate ">{{ playgrounds.track.trackName
                  }}
                  </p>
                </div>
                <div class="flex flex-row md:space-x-3 space-x-2 select-none">
                  <div @click="addToMyPalylist(playgrounds.track.id)"
                    class="md:w-20 sm:w-15 w-10 text-center transition duration-200 bg-blackcoal hover:bg-violetdark active:bg-violet-800 font-sansation-light text-white rounded-full cursor-pointer">
                    add</div>
                  <div @click="deletePlayground(playgrounds.track.id)"
                    class="md:w-20 sm:w-17 w-12 text-center transition duration-200 bg-white border-1 border-red-500 hover:bg-red-500 active:bg-red-800 hover:text-white font-sansation-light text-blackcoal rounded-full cursor-pointer">
                    delete</div>
                </div>
              </div>
            </div>

          </div>
          <paginate v-show="authenticated && onePlaylist != '' && onePlaylist.playlist.userAccountModel != undefined && userId == onePlaylist.playlist.userAccountModel.accountId
          && playground != '' && !notfoundPG" :totalItems="totalPG" :sizePage="totalPagePG" :itemsPerPage="10"
            :maxPagesShow="4" @pageNum="resPNComment"></paginate>
          <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 mb-20 ">
            <!-- v-if="authenticated" -->

            <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg text-blackcoal my-5">Comment</div>
            <div v-if="authenticated">
              <div class="flex flex-row items-center sm:space-x-4 space-x-2 mx-3 mb-5">
                <div class="overflow-hidden rounded-full shadow-lg md:w-13 md:h-13 w-10 h-10">
                  <img v-if="data != null" :src="url + 'api/streaming/image/' + data.profileIamge"
                    class="md:w-13 md:h-13 w-10 h-10" style=" object-fit: cover;" />
                </div>
                <input type="text"
                  class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-10 h-7 2xl:w-504 lg:w-466  md:w-56 w-40 md:px-6 sm:px-2 px-1 font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                  placeholder="Comment" v-model="commentInput" />
                <div @click="addOneComment()"
                  class="select-none hover:text-white active:text-white text-blackcoal flex justify-center item-center bg-neutral-100 rounded-full md:h-10 h-7 sm:w-24 w-17 font-sansation-light md:text-base text-xs cursor-pointer transition duration-200 hover:bg-violetdark active:bg-violet-800">
                  <p>comment</p>
                </div>
              </div>
            </div>
            <div>
              <loading v-if="comment == '' && !notfoundCM"></loading>
              <div v-if="comment != '' && !notfoundCM">
                <div v-for="(onecomment) in comment" :key="onecomment.id"
                  class="bg-neutral-50 rounded-lg p-3 my-2 h-full flex flex-row">
                  <div class="overflow-hidden rounded-full shadow-lg md:w-13 md:h-13 w-10 h-10">
                    <img v-if="comment != ''" :src="url + 'api/streaming/image/' + onecomment.user.profileIamge"
                      class="md:w-13 md:h-13 w-10 h-10" style=" object-fit: cover;" />
                  </div>
                  <div class="2xl:w-1120 xgl:w-962 md:w-600 sm:w-96 w-64 sm:pl-5 pl-2 font-sansation-light">
                    <div class="flex flex-row justify-between">
                      <div class="flex flex-col space-y-1 ">
                        <div class="font-sansation-bold md:text-lg text-sm text-blackcoal">{{ onecomment.user.username }}
                        </div>
                        <div class="md:text-xs text-mxs tracking-widest">{{ onecomment.timestamp }}</div>
                      </div>
                      <div class="flex flex-row space-x-0.5 select-none">
                        <!-- v-if="authenticated && onecomment.user.accountId != userId" -->
                        <span @click="addReportComment(onecomment.id)"
                          v-if="authenticated && onecomment.user.accountId != userId"
                          class="cursor-pointer material-icons md:text-xl text-lg text-blackcoal hover:text-orange-500 active:text-orange-800 transition duration-200">report</span>
                        <span @click="editShow(onecomment.id, onecomment.comment)"
                          :class="editTime && editId == onecomment.id ? 'text-violetdark' : ''"
                          v-if="authenticated && onecomment.user.accountId == userId"
                          class="cursor-pointer material-icons md:text-xl text-lg text-blackcoal hover:text-violetdark active:text-violet-800 transition duration-200">edit</span>
                        <span @click="delComment(onecomment.id)"
                          v-if="authenticated && onecomment.user.accountId == userId"
                          class="cursor-pointer material-icons md:text-xl text-lg text-blackcoal hover:text-red-500 active:text-red-800 transition duration-200">close</span>
                      </div>
                    </div>
                    <div v-if="!(editId == onecomment.id)" class="md:text-base leading-tight sm:text-sm text-xxs pt-1">
                      {{ onecomment.comment }}
                    </div>
                    <div v-if="editTime && editId == onecomment.id"
                      class="md:text-base leading-tight sm:text-sm text-xxs pt-1">
                      <textarea
                        class="p-2 bg-neutral-100 rounded-md appearance-none border-2 border-violetdark w-full h-20 inline font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                        v-model="commentEditInput" />
                    </div>
                    <div v-if="editTime && editId == onecomment.id"
                      class="flex flex-row md:space-x-3 space-x-2 select-none">
                      <div @click="submitEditComment(onecomment.id)"
                        class="md:w-20 sm:w-15 w-10 text-center  bg-blackcoal hover:bg-violetdark active:bg-violet-800 font-sansation-light text-white rounded-md cursor-pointer transition duration-200">
                        edit</div>
                      <div @click="cancelEdit()"
                        class="md:w-20 sm:w-17 w-12 text-center bg-white border-1 border-red-500 hover:bg-red-500 active:bg-red-800 hover:text-white font-sansation-light text-blackcoal rounded-md cursor-pointer transition duration-200">
                        cancel</div>
                    </div>
                  </div>
                </div>
              </div>
              <paginate v-show="comment != '' && !notfoundCM" :totalItems="totalComment.totalElements"
                :sizePage="totalComment.totalPages" :itemsPerPage="10" :maxPagesShow="4" @pageNum="resPNComment">
              </paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   
<script>
import Loading from "../components/Loading.vue";
import Paginate from "../components/Paginate.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Paginate,
    Loading
  },
  emits: ["music", "playlist", "musicQ"],
  data() {
    return {
      focused: false,
      optionPlayl: false,
      delPlayl: false,
      manPlaylist: false,
      pic: require('../assets/948523.png'),
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
      id: this.$route.params.id,
      showPopupDel: false,
      message: '',
      textWrong: false,
      loadingDel: false,
      confirm: false,
      errorDel: false,
      commentInput: '',
      commentEditInput: '',
      editTime: false,
      editId: '',
      errorAddToplalyist: false
    }
  },
  methods: {
    addReportComment(data) {
      console.log(data)
      this.addReport({
        reportMsg: 'This comment contains profanity, sexual harassment, and inappropriate language.',
        reportGroupId: 0,
        reportTitle: '',
        reportType: 2001,
        targetRef: data
      })
    },
    async addToMyPalylist(data) {
      console.log(data)
      let trackList = []
      trackList.push({ trackId: data })
      var boolean = await this.addMusicToPalylist({ "id": this.id, "trackIdList": trackList })
      if (boolean) {
        this.errorAddToplalyist = false
        await this.getOnePlaylist(this.id);
      } else {
        this.errorAddToplalyist = true
      }
    },
    cancelEdit() {
      this.editTime = false
    },
    editShow(id, oldComment) {
      this.cancelEdit()
      this.editId = id
      this.editTime = !this.editTime
      this.commentEditInput = oldComment
    },
    async submitEditComment(id) {
      console.log(id)
      console.log(this.commentEditInput)
      var boolean = await this.editComment({ id: id, comment: this.commentEditInput })
      if (boolean) {
        this.cancelEdit()
        this.commentEditInput = ''
        this.editId = ''
        await this.getComment({ id: this.id, pagenum: 0, pagesize: 10 })

      } else {

      }
    },
    async delComment(id) {
      await this.delComment(id)
    },
    async addOneComment() {
      if (this.commentInput.trim() != '') {
        console.log(this.commentInput)
        var boolean = await this.addComment({ id: this.id, comment: this.commentInput })
        console.log(boolean)
        if (boolean) {
          this.commentInput = ''
        } else {

        }
      }
    },
    async delToPlaylist() {
      if (this.onePlaylist.playlist.playlistName === this.message) {
        this.loadingDel = true
        this.textWrong = false
        var boolean = await this.delOnePlaylist()
        if (boolean) {
          this.confirm = true
          this.loadingDel = false
        } else {
          this.loadingDel = false
          this.errorDel = true
        }
      } else {
        this.textWrong = true
      }
    },
    changeShowpopup(e) {
      this.showPopupDel = !this.showPopupDel
      if (e == 'myplaylist') {
        this.$router.push({
          name: e,
        });
      }
    },
    acceptDataArr() {
      let playlist = this.onePlaylist.tracksInfo.content
      let arrPlaylist = []
      for (let index = 0; index < playlist.length; index++) {
        arrPlaylist.push({ name: playlist[index].trackFile, image: playlist[index].trackThumbnail, nameShow: playlist[index].trackName })
      }
      this.$emit('playlist', arrPlaylist)
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
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
    resPageNumPG(e) {
      this.$store.dispatch('myplaylist/getAllPlayground', { pagenum: e - 1, pagesize: 6 })
    },
    resPNComment(e) {
      this.$store.dispatch('oneplaylist/getComment', { pagenum: e - 1, pagesize: 10 })
    },
    editInfoPlaylist() {
      localStorage.setItem("idPlaylist", this.onePlaylist.playlist.id);
      localStorage.setItem("addOrUp", "editPlaylist");
    },
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar',
      handleView: 'homepage/handleView',
      setTopOne: 'homepage/setTopOne',
      getOnePlaylist: 'oneplaylist/getOnePlaylist',
      getPlayground: 'myplaylist/getAllPlayground',
      deletePlayground: 'myplaylist/delPlayground',
      addMusicToPalylist: 'myplaylist/addMusicToPalylist',
      delOnePlaylist: 'oneplaylist/delOnePlaylist',
      editComment: 'oneplaylist/editComment',
      addComment: 'oneplaylist/addComment',
      delComment: 'oneplaylist/delComment',
      getComment: 'oneplaylist/getComment',
      addReport: 'oneplaylist/addReport'
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
      userId: 'authentication/userId',
      authenticated: "authentication/authenticated",
      data: "authentication/data",
      notfoundCM: 'oneplaylist/notfoundCM',
      totalComment: 'oneplaylist/totalComment',
      comment: 'oneplaylist/comment',
      plid: 'oneplaylist/id'
    })
  },
  async created() {
    this.$store.commit('oneplaylist/SET_ID', this.id)
    if (this.authenticated) {
      this.getPlayground({ pagenum: 0, pagesize: 10 });
    }
    this.handleView();
    this.getComment({ id: this.id, pagenum: 0, pagesize: 10 })
    this.getOnePlaylist(this.id);
    window.addEventListener("resize", this.handleView);
  }
}
</script> 
