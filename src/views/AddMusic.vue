<template>
  <div class="h-screen flex justify-center" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex justify-center flex-col w-full font-sansation-light">
      <div class="flex justify-center h-full">
        <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="2xl:w-1200 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3 flex justify-center flex-col">
            <div class="flex justify-between items-center">
              <div>
                <div v-if="addOrUp == 'add'" class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  Add Playlist
                </div>
                <div v-if="addOrUp == 'editMusic'" class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  Edit music
                </div>
                <div v-if="addOrUp == 'editPlaylist'" class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  Edit Playlist
                </div>
                <div v-if="addOrUp == 'up'" class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  upload music
                </div>
              </div>
            </div>
            <div class="lg:w-5/6 w-full flex justify-center items-center flex-col xgl:text-lg md:text-md text-sm ">
              <img v-show="image == '' && this.imageFromData == ''" src="../assets/upload_icon.png"
                class="md:w-44.5 md:h-52.5 w-36 h-40  rounded-3xl object-cover mt-3" />
              <img id="image-preview" alt="your image" v-show="image != ''"
                style="width: 262px; height: 175px; object-fit: cover" />
              <img v-show="this.imageFromData != '' && this.image == ''"
                :src="url + 'api/streaming/image/' + this.imageFromData"
                style="width: 262px; height: 175px; object-fit: cover" />
              <label for="input-image" class="font-sansation-light">
                <p class="bg-gray-200 p-2 px-3 rounded-2xl mt-2">upload image</p>
                <input id="input-image" type="file" class="hidden" accept="image/*"
                  @change="handleImageUpload($event)" />
              </label>

              <!-- <form @submit.prevent="addImage"> -->
              <form @submit.prevent="addOrUpMusicInfo()" class="w-4/6 my-5">
                <div class="my-2">
                  <p class="text-md my-2">Title*</p>
                  <input v-model="musicInfo.trackName" type="text" name="trackName" placeholder="TITLE " required
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2" v-if="addOrUp == 'up' || addOrUp == 'editMusic'">
                  <p class="text-md my-2">Album</p>
                  <input v-model="musicInfo.albumName" type="text" name="albumName" placeholder="ALBUM "
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2" v-if="addOrUp == 'up' || addOrUp == 'editMusic'">
                  <p class="text-md my-2">Artist</p>
                  <input v-model="musicInfo.artist" type="text" name="artist" placeholder="ARTIST "
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2">
                  <p class="text-md my-2">Mood</p>
                  <div>
                    <select v-model="musicInfo.moodList"
                      class="w-full h-12 px-4 text-gray-400 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base">
                      <option value="" disabled selected class="hidden ">Mood</option>
                      <option v-for="(item, index) in this.moodList" :key="index" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="my-2">
                  <p class="text-md my-2">Tags</p>
                  <select v-model="musicInfo.genreList"
                    class="w-full h-12 px-4 text-gray-400 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base">
                    <option value="" disabled selected class="hidden ">Tags</option>
                    <option v-for="(item, index) in this.genreList" :key="index" :value="item">
                      {{ item.genreName }}
                    </option>
                  </select>
                </div>

                <!-- </form> -->
                <div class="flex md:flex-row md:justify-start flex-col items-center w-full space-x-4 mt-4"
                  v-if="addOrUp == 'up' || addOrUp == 'editMusic'">
                  <div class="bg-neutral-100 p-2 rounded-xl" v-if="this.addOrUp != 'editMusic'">
                    <label for="input-audio" class="font-sansation-light ">
                      <p>Upload music</p>
                      <input id="input-audio" type="file" class="hidden" accept="audio/*"
                        @change="handleFileUpload($event)" />
                    </label>
                  </div>
                  <div v-else class="font-sansation-light ">
                    <p>Music</p>
                  </div>
                  <div v-if="this.file == ''" class="ml-5 text-violetlight cursor-pointer"
                    @click="acceptData(this.trackInfo)">{{ this.trackInfo.trackFile }}</div>
                  <div>
                    <audio id="audio-preview" controls v-show="file != ''" />
                  </div>
                </div>
                <div class="my-3 flex md:flex-row flex-col ">
                  <div>
                    <p class="md:mr-2" v-if="addOrUp == 'up' || addOrUp == 'editMusic'">music will be</p>
                    <p class="md:mr-2" v-else>playlist will be</p>
                  </div>
                  <div v-if="addOrUp == 'up' || addOrUp == 'editMusic'" class="md:flex md:flex-row">
                    <div>
                      <input type="radio" v-model="musicInfo.statusId" value="1001" />
                      <label for="musicInfo.statusId" class="mx-2 m">public</label>
                    </div>
                    <div>
                      <input type="radio" v-model="musicInfo.statusId" value="1002" />
                      <label for="musicInfo.statusId" class="mx-2">private</label>
                    </div>
                  </div>
                  <div v-else class="md:flex md:flex-row">
                    <div>
                      <input type="radio" v-model="musicInfo.statusId" value="2001" />
                      <label for="musicInfo.statusId" class="mx-2 m">public</label>
                    </div>
                    <div>
                      <input type="radio" v-model="musicInfo.statusId" value="2002" />
                      <label for="musicInfo.statusId" class="mx-2">private</label>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="addOrUp == 'add'">
                  <input type="radio" v-model="autoAdd" value="true" />
                  <label for="autoAdd" class="mx-2">Auto add music in this playlist
                  </label>
                </div> -->
                <div v-if="addOrUp == 'add' || addOrUp == 'editPlaylist'">
                  <input type="radio" v-model="confirm" value="true" />
                  <label for="confirm" class="mx-2">Search music to add in playlist
                  </label>
                  <div v-if="confirm == 'true'">
                    <div class="flex flex-row">
                      <input type="text"
                        class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-8 h-5 w-3/4 md:pl-6 sm:pl-2 pl-1 mx-2 font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                        placeholder="Search" v-model="searchName" />
                      <div @click="searchMusic"
                        v-bind:class="this.searchName == '' ? 'bg-neutral-100 text-neutral-500' : 'bg-neutral-100 hover:text-violetlight  hover:bg-blackcoal'"
                        class="flex items-center md:text-base  cursor-pointer sm:text-xs text-xxs justify-center  hover:font-sansation-regular  transition duration-300 rounded-full 2xl:w-36 md:w-24 md:h-8 sm:w-15 w-11 h-5">
                        <p class="font-sansation-light">Search</p>
                      </div>
                    </div>
                    <div v-if="found" class="text-gray-700 w-full mt-2  flex flex-col items-center h-full z-20">
                      <div class="flex flex-col justify-center bg-white mb-3 space-y-2 w-full">
                        <div v-if="this.music == null" class="font-sansation-bold md:text-2xl text-xl text-blackcoal ">
                          Not Found {{ searchName }}
                        </div>
                        <div v-else class="font-sansation-bold md:text-2xl text-xl text-blackcoal ">Found "{{ searchName
                        }} "</div>
                        <div v-if="this.music != null"
                          class="flex flex-col h-36 space-y-2 overflow-y-auto bg-neutral-100 rounded-lg ">
                          <div v-for="(item, index) in this.music" :key="index"
                            class="sm:h-7 h-5 flex flex-row items-center lg:text-base sm:text-sm text-xxs font-sansation-light mt-5">
                            <div
                              class="flex flex-row justify-between w-full hover:text-violetdark cursor-pointer transition duration-200 items-center">
                              <div class="w-5 text-center">{{ index + 1 }}</div>
                              <p @click="acceptData(item)"  class="w-4/6 h-5 truncate ">{{ item.trackName }}</p>
                            </div>
                            <div @click="addTracks(item)"
                              class="w-1/6 sm:h-6 h-5 text-center flex items-center justify-center lg:text-base sm:text-sm text-xxs bg-violet-500 text-white rounded-full cursor-pointer">
                              add
                            </div>
                          </div>
                        </div>
                        <div @click="closeSearch()"
                          class="sm:h-6 h-5 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
                          cancel
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="this.trackIdList != null && this.trackIdList != '' || this.trackList != null" class="my-5">
                    <p class="">Music In Playlist</p>
                    <div v-if="this.music != null"
                      class="flex flex-col h-36 overflow-y-auto bg-neutral-100 rounded-lg py-1 px-2">
                      <div v-for="(item, index) in this.trackList" :key="index"
                        class="sm:h-7 h-5 flex flex-row items-center lg:text-base sm:text-sm text-xxs font-sansation-light mt-5">
                        <div
                          class="flex flex-row justify-between w-full hover:text-violetdark cursor-pointer transition duration-200 items-center">
                          <div class="w-5 text-center">{{ index + 1 }}</div>
                          <div  @click="acceptData(item)" class="w-4/6 h-5 truncate ">{{ item.trackName }}</div>
                          <div @click="deleteTracks(index)"
                            class="w-1/6 sm:h-6 h-5 text-center flex items-center justify-center lg:text-base sm:text-sm text-xxs bg-violet-500 text-white rounded-full cursor-pointer">
                            Delete
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div><input type="radio" v-model="isActive" @click="activeClick()" value="false" />
                  <label for="isActive" class="mx-2">I have read and agree to the website
                    <a class="text-violetlight font-sansation-bold underline underline-offset-1">terms and
                      conditions</a>
                  </label>
                </div>
                <div class="flex flex-row space-x-3 justify-center items-center my-5">
                  <button :class="isActive == 'false' ? 'bg-violetlight' : 'bg-neutral-300'"
                    class="w-36 h-12 cursor-pointer transition duration-200 rounded-md  text-white flex justify-center item-center font-sansation-bold">
                    Upload
                  </button>
                  <button @click="showPopupCancle()"
                    class="w-36 h-12 cursor-pointer transition duration-200 rounded-md bg-gray-600 text-white flex justify-center item-center font-sansation-bold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <popupCard v-if="showClicked" :message="this.message" @close="closeClicked()" @confirm="routerClicked()"></popupCard>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import popupCard from '../components/PopUpCard.vue';
import axios from "axios";
export default {
  components: {
    popupCard,
  },
  emits: ['music'],
  data() {
    return {
      file: "",
      image: "",
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
      isActive: true,
      moodList: [],
      genreList: [],
      trackFile: [],
      music: [],
      found: false,
      searchName: "",
      trackIdList: [],
      trackList: [],
      imageFromData: '',
      addOrUp: null,
      showClicked: false,
      trackInfo: [],
      playListInfo: [],
      musicInfo: {
        trackName: "",
        albumName: "",
        artist: "",
        moodList: "",
        genreList: "",
        statusId: "",
        trackDesc: "",
        id: "",
      },
      confirm: false,
      playlistInfo: {
        playlistName: "",
        moods: "",
        genres: "",
        statusId: "",
        playlistDesc: "",
      },
      message: {
        header: '',
        body: '',
        status: '',
        button1: '',
        button2: '',
      },
      setTrack: {
        id: '',
        trackIdList: [],
      },
      musicInPlaylist: [],
    };
  },
  methods: {
    ...mapActions({
      hideSideBar: "homepage/hideSideBar",
      handleView: "homepage/handleView",
    }),
    handleImageUpload(event) {
      this.image = ''
      this.image = event.target.files[0];
      this.previewImage();
    },
    previewImage() {
      let pic = document.getElementById("image-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.addEventListener("load", function () {
        pic.src = reader.result;
      });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.previewAudio();
    },
    previewAudio() {
      let audio = document.getElementById("audio-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        audio.src = reader.result;
        this.trackFile = audio.src;
      });
    },
    acceptData(e) {
      console.log(e)
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    showMessageClicked(value) {
      this.showClicked = !value;
    },
    routerClicked() {
      this.$router.push('/hometest')
    },
    closeClicked() {
      this.showClicked = false;
      this.routerClicked();
    },
    activeClick() {
      this.isActive = false;
    },
    showPopupCancle() {
      this.showClicked = !this.showClicked;
      this.message.header = "Are sure for cancle ?"
      this.message.body = "Lorem ipsum dolor sit"
      this.message.button1 = 'Confirm'
      this.message.button2 = 'Cancle'
    },
    showPopupConfirm() {
      this.showClicked = true;
      this.message.header = "Successfully executed!"
      this.message.body = ""
      this.message.button1 = ''
      this.message.button2 = 'Close'
    },
    closeSearch() {
      this.searchName = "";
      this.found = !this.found
    },
    addTracks(data) {
      this.trackIdList.push(({ "trackId": data.id }));
      this.trackList.push(data);
    },
    deleteTracks(data) {
      this.trackList.splice(data, 1);;
    },
    async addOrUpMusicInfo() {
      let tmpGenreList = [];
      tmpGenreList.push((this.musicInfo.genreList));
      let tmpMoodsList = [];
      tmpMoodsList.push((this.musicInfo.moodList));
      this.musicInfo.genreList = tmpGenreList;
      this.musicInfo.moodList = tmpMoodsList;
      if (this.addOrUp == "up" || this.addOrUp == "editMusic") {
        const regisJson = new Blob([JSON.stringify(this.musicInfo)], {
          type: 'application/json'
        })
        let formData = new FormData;
        formData.append('imageFile', this.image)
        if (this.addOrUp == "up" && this.musicInfo.id != null) {
          formData.append('newTrack', regisJson)
          formData.append('trackFile', this.file)
          await axios
            .post(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/artist/track`,
              formData,
            ).then((response) => {
              this.showPopupConfirm()
            });
        } else {
          formData.append('track', regisJson)
          await axios
            .put(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/artist/track/edit`,
              formData,
            ).then((response) => {
              this.showPopupConfirm()
            });
        }
      } else {
        this.playlistInfo.playlistName = this.musicInfo.trackName;
        this.playlistInfo.moods = this.musicInfo.moodList;
        this.playlistInfo.genres = this.musicInfo.genreList;
        this.playlistInfo.statusId = this.musicInfo.statusId;
        this.playlistInfo.playlistDesc = this.musicInfo.trackDesc;
        const regisJson = new Blob([JSON.stringify(this.playlistInfo)], {
          type: 'application/json'
        })
        let formData = new FormData;
        formData.append('form', regisJson)
        formData.append('image', this.image)
        if (this.playlistInfo.id != null && this.playlistInfo.id != '' && this.playlistInfo.id != undefined) {
          await axios
            .put(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist`,
              formData,
            ).then((response) => {
              this.setTrack.id = response.data.id;
              this.setTrack.trackIdList = this.trackIdList;
              axios
                .put(
                  `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/add-track`,
                  this.setTrack,
                ).then((response) => {
                  this.showPopupConfirm()
                });
            });
        } else {
          await axios
            .post(
              `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist`,
              formData,
            ).then((response) => {
              this.setTrack.id = response.data.id;
              this.setTrack.trackIdList = this.trackIdList;
              axios
                .put(
                  `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/add-track`,
                  this.setTrack,
                ).then((response) => {
                  this.showPopupConfirm()
                });
            });
        }
      }
    },
    async getMoodList() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/mood?page=0&pageSIze=0&searchContent`)
        .then((response) => {
          this.moodList = response.data.content
        });
    },
    async getGenreList() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/genres?page=0&pageSIze=0&searchContent`)
        .then((response) => {
          this.genreList = response.data.content
        });
    },
    async searchMusic() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track?page=0&pageSize=0&searchContent=${this.searchName}`)
        .then((response) => {
          this.music = response.data.content;
          this.found = !this.found
        }).catch((error) => {
          this.music = null
          this.found = !this.found
        }
        );
    },
    async getTrack() {
      this.addOrUp = localStorage.getItem("addOrUp");
      if (this.addOrUp == 'editPlaylist') {
        localStorage.removeItem("idTrack",);
        let id = localStorage.getItem("idPlaylist")
        await axios
          .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/25`)
          .then((response) => {
            this.playlistInfo.id = response.data.playlist.id;
            this.musicInfo.trackName = response.data.playlist.playlistName;
            this.imageFromData = response.data.playlist.thumbnail;
            this.musicInfo.statusId = response.data.playlist.playTrackStatus.id;
            this.trackList = response.data.tracksInfo.content;
            this.genreList.forEach((element) => {
              response.data.playlist.genres.forEach((element2) => {
                if (element.genreId == element2.id.genreId) {
                  this.musicInfo.genreList = element
                }
              })
            });
            this.moodList.forEach((element) => {
              response.data.playlist.moods.forEach((element2) => {
                if (element.id == element2.id.moodId) {
                  this.musicInfo.moodList = element
                }
              })
            });
          })
      } else {
        if (this.addOrUp == 'editMusic') {
          let id = localStorage.getItem("idTrack");
          await axios
            .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track/${id}`)
            .then((response) => {
              this.trackInfo = response.data;
              this.musicInfo.id = response.data.id
              this.musicInfo.trackName = response.data.trackName
              this.musicInfo.albumName = response.data.albums.albumName
              this.musicInfo.statusId = response.data.playTrackStatus.id

              if (response.data.moods[0] != null) {
                this.musicInfo.moodList = response.data.moods[0].id.trackId
              }
              response.data.artistTracks.forEach((element) => {
                this.musicInfo.artist = element.artistsModel.artistName
              }
              )
              this.imageFromData = response.data.trackThumbnail;
              this.genreList.forEach((element) => {
                if (element.genreId == response.data.genreTrack[0].genre.genreId) {
                  this.musicInfo.genreList = element
                }
              });
              this.moodList.forEach((element) => {
                response.data.moods.forEach((element2) => {
                  if (element.id == element2.id.moodId) {
                    this.musicInfo.moodList = element
                  }
                })
              });
              this.previewAudio();
            })
        }
      }

    }

  },
  mounted() {
    this.addOrUp = localStorage.getItem("addOrUp");
  },
  computed: {
    ...mapGetters({
      sideBarShow: "homepage/sideBarShow",
      mobile: "homepage/mobile",
      logo: "homepage/logo",
      smView: "homepage/smView",
    }),
  },
  async created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
  async created() {
    this.getMoodList();
    this.getGenreList();
    this.getTrack();
  }
};
</script>
