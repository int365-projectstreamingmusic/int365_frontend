<template>
  <div class="flex flex-col sticky top-0 z-50 bg-white  justify-center items-center">
    <div class="flex flex-row">
      <div v-show="!sideBarShow" class="2xl:w-75 z-50 bg-white md:mr-10 mr-2  mb-5 mt-7 h-9 flex flex-row items-center">
        <div class="sticky top-0 z-50 ">
          <div class="flex flex-row items-center justify-center md:space-x-5 space-x-2 ">
            <span @click="hideSideBar()"
              class="material-icons md:text-3xl text-2xl   cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
            <div v-show="!logo" class="font-sansation-light md:text-3xl text-xl text-center text-black   sticky top-0">
              GARDEN</div>
          </div>
        </div>
      </div>
      <!-- <div v-show="sideBarShow" class="bg-white md:w-52.1 ">
      </div>  -->
      <div class="text-gray-700 z-50 mt-7 mb-5 h-9 flex flex-row items-center"
        :class="sideBarShow ? '2xl:ml-75 lg:ml-64' : ''">
        <div class="flex justify-center bg-white 2xl:w-1200">
          <div
            class=" w-full flex flex-row 2xl:space-x-20 lg:space-x-10 md:space-x-4 sm:space-x-2 space-x-2 2xl:justify-between justify-center ">
            <div class="flex flex-row lg:space-x-3 sm:space-x-2 space-x-1  h-5 md:h-full items-center">
              <input type="text"
                class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-8 h-5 2xl:w-504 lg:w-64 md:w-32 sm:w-24 w-20 md:pl-6 sm:pl-2 pl-1 font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                placeholder="Search" v-model="searchName" />
              <div @click="searchMusic()"
                v-bind:class="this.searchName == '' ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-100 hover:text-violetlight  hover:bg-blackcoal'"
                class="flex items-center md:text-base  cursor-pointer sm:text-xs text-xxs justify-center  hover:font-sansation-regular  transition duration-300 rounded-full 2xl:w-36 md:w-24 md:h-8 sm:w-15 w-11 h-5">
                <p class="font-sansation-light">Search</p>
              </div>
              <router-link to="/allsong" @click="pathPage('/allsong')">
                <div v-bind:class="this.path == '/allsong' ? 'bg-blackcoal text-violetlight' : 'bg-neutral-100'"
                  class="flex items-center md:text-base sm:text-xs text-xxs justify-center hover:font-sansation-regular hover:text-violetlight  hover:bg-blackcoal transition duration-300 rounded-full 2xl:w-36 md:w-24 md:h-8 sm:w-15 w-11 h-5">
                  <div class="font-sansation-light" v-bind:class="this.path == '/allsong' ? '' : ''">Song</div>
                </div>
              </router-link>
            </div>
            <!-- ยังไม่ได้ทำ responsive -->
            <div class="select-none font-sansation-light  lg:w-56 md:w-40 w-24 cursor-pointer " v-if="authenticated">
              <div class="bg-gray-700 rounded-full md:h-9 h-5  text-white font-sansation-light text-sm flex flex-col">
                <div
                  class="flex flex-row items-center justify-between sm:px-2 px-1 md:mt-1 space-x-1 focus:text-violetlight hover:text-violetlight"
                  @click="isOpen = !isOpen">
                  <img :src="url + 'api/streaming/image/' + data.profileIamge" class="rounded-xl md:h-6 md:w-6  w-3 h-3"
                    style="object-fit: cover" />
                  <p class="lg:w-32 sm:w-20 w-15 truncate md:text-base sm:text-xs text-mxs">{{ username }}</p>
                  <span class="material-icons md:text-lg text-sm" v-if="isOpen">expand_less</span>
                  <span class="material-icons md:text-lg text-sm" v-else> expand_more </span>
                </div>
                <div
                  class="text-gray-800 flex items-end md:text-base text-xxs flex-col w-full md:mt-2 mt-1 bg-white  rounded-xl border-2 border-gray-100 z-50"
                  v-if="isOpen">
                  <div @click="isOpen = !isOpen"
                    class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/accountprofile">Account</router-link>
                  </div>
                  <div @click="isOpen = !isOpen" v-if="this.admin"
                    class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/managereport">Manage Report</router-link>
                  </div>
                  <div @click="isOpen = !isOpen"
                    class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/myplaylist">My playlist</router-link>
                  </div>
                  <div
                    class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right"
                    @click="signOut">
                    <p>Sign out</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- ยังไม่ได้ทำ responsive -->
            <router-link v-else to="/login"
              class="flex flex-row items-center sm:space-x-2 font-sansation-light md:text-base sm:text-ss text-xs md:w-28.1   w-24 space-x-1">
              <p @click="routerLogin('1')" class="cursor-pointer hover:text-violetlight transition duration-300"> Log in
              </p>
              <p>|</p>
              <p @click="routerLogin('2')" class="cursor-pointer hover:text-violetlight transition duration-300">
                Register</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-gray-700  mt-2 mb-5 flex flex-col items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 h-full z-20"
      :class="sideBarShow ? '2xl:ml-75 lg:ml-64' : ''">
      <div v-if="this.loading"
        class="fixed flex justify-center items-center h-1/6 w-full bg-neutral-50 bg-opacity-75 transition-opacity">
        <div class="flex justify-center">
          <div class="loader animate-prixClipFix"></div>
        </div>
      </div>
      <div v-if="found">
        <div class="flex flex-col justify-center bg-white 2xl:w-1200 w-full mb-3 space-y-2 sm:pl-3.5">
          <div class="flex flex-row">
            <div v-if="this.music == null" class="font-sansation-bold md:text-2xl text-xl text-blackcoal">Not Found
              {{ searchName }}</div>
            <div v-else class="font-sansation-bold md:text-2xl text-xl text-blackcoal">Found " {{ searchName }} "</div>
            <div @click="closeSearch()"
              class="px-2 ml-16 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-neutral-100 font-sansation-bold text-violetdark rounded-full cursor-pointer flex flex-row">
              Cancel
            </div>
          </div>
          <div v-if="this.music != null" class="flex flex-col h-32 space-y-2 overflow-y-auto ">
            <div v-for="(item, index) in this.music" :key="index"
              class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs font-sansation-light">
              <div
                class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
                <input v-if="authenticated" type="radio" @click="addTracks(item.id)">
                <div class="sm:w-10 w-5 text-center">{{ index + 1 }}</div>
                <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52  truncate ">{{ item.trackName }}</p>
                <div @click="acceptData(item)"
                  class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">
                  play
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="authenticated" class="flex flex-row bg-white 2xl:w-1200 sm:space-x-3 space-x-1 w-full">
          <div
            class="space-x-1 sm:w-32 w-20 sm:h-6 h-5 text-center lg:text-base sm:text-sm text-xxs items-center justify-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
            <input type="radio" @click="addPlayground()">
            <div>playground</div>
          </div>
          <div
            class="space-x-1 sm:w-24 w-16 sm:h-6 h-5 text-center lg:text-base sm:text-sm text-xxs items-center justify-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
            <input type="radio" @click="addFavorite()">
            <div>favorite</div>
          </div>
          <div class="flex flex-row items-center sm:h-6 h-5 font-sansation-light space-x-4 ">
            <select v-model="setTrack.id"
              class="rounded-full bg-neutral-100 md:w-36 sm:w-22 w-17 h-6 text-center lg:text-base sm:text-sm text-xxs">
              <option value="" disabled selected class="hidden ">My Playlist</option>
              <option v-for="(item, index) in this.playList" :key="index" :value="item.id">
                {{ item.playlistName }}
              </option>
            </select>
          </div>
          <div @click="sendData()"
            class="md:w-20 sm:w-15 w-10 sm:h-6 h-5 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
            add
          </div>
          <div @click="closeSearch()"
            class="md:w-20 sm:w-17 w-13 sm:h-6 h-5 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
            cancel
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  emits: ['music'],
  data() {
    return {
      path: "",
      isOpen: false,
      role: false,
      found: false,
      searchName: "",
      music: [],
      playList: [],
      trackIdList: { trackId: [] },
      setTrack: {
        id: '',
        trackIdList: [],
      },
      trackForPlaylist: [],
      favorite: '',
      playground: '',
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
      loading: false,
    };
  },
  methods: {
    pathPage(path) {
      this.path = path;
      this.role = false;
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    routerLogin(active) {
      localStorage.setItem("logInActive", active);
    },
    ...mapActions({
      signOutAction: "authentication/singOut",
      hideSideBar: 'homepage/hideSideBar',
    }),
    signOut() {
      this.isOpen = !this.isOpen
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "hometest",
        });
      });
    },
    addTracks(data) {
      this.trackForPlaylist.push(({ "trackId": data }));
      this.trackIdList.trackId.push((data));
    },
    addPlayground() {
      this.playground = true;
    },
    addFavorite() {
      this.favorite = true;
    },
    async searchMusic() {
      this.getPlaylist();
      this.loading = true;
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track?page=0&pageSize=0&searchContent=${this.searchName}`)
        .then((response) => {
          this.music = response.data.content;
          this.found = !this.found;
          this.loading = false;
        }).catch((error) => {
          this.music = null
          this.found = !this.found
        }
        );
    },
    async getPlaylist() {
      if (this.authenticated) {
        await axios
          .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist`)
          .then((response) => {
            this.playList = response.data.content;
          })
      }
    },
    async sendData() {
      this.loading = true;
      if (this.authenticated) {
        if (this.setTrack.id != null || this.setTrack.id != '') {
          this.setTrack.trackIdList = this.trackForPlaylist;
          axios
            .put(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/add-track`,
              this.setTrack,
            ).then((response) => {
              this.closeSearch()
            });
        }
        if (this.playground == true) {
          axios
            .post(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground/add`, this.trackIdList
            ).then((response) => {
              this.closeSearch()
            });
        }
        if (this.favorite == true) {
          axios
            .post(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Favorite/add`, this.trackIdList
            ).then((response) => {
              this.closeSearch()
            });
        }
      }
    },
    closeSearch() {
      this.searchName = '';
      this.found = false;
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      username: "authentication/UserName",
      roles: "authentication/roles",
      data: "authentication/data",
      admin: "authentication/admin",
      sideBarShow: 'homepage/sideBarShow',
      logo: 'homepage/logo',
      smView: 'homepage/smView',
    }),
  },
};
</script>
