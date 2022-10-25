<template>
  <div class="h-screen flex justify-center" :class="sideBarShow ? 'lg:ml-75' : ''">
    <div class="flex justify-center flex-col w-full font-sansation-light">
      <div class="flex justify-center h-full">
        <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="2xl:w-1200 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3 flex justify-center flex-col">
            <div class="flex justify-between items-center">
              <div>
                <div v-if="addOrUp=='add'" class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  Add Playlist
                </div>
                <div v-else class="xgl:text-2xl md:text-xl text-lg font-sansation-bold ">
                  upload music
                </div>
              </div>
              <div v-if="addOrUp=='add'" class="bg-gray-500 lg:p-4 p-1 text-white xgl:text-lg md:text-md text-sm ">
                5/20
              </div>
            </div>
            <div class="lg:w-5/6 w-full flex justify-center items-center flex-col xgl:text-lg md:text-md text-sm ">
              <img v-show="image == ''" src="../assets/upload_icon.png"
                class="md:w-44.5 md:h-52.5 w-36 h-40  rounded-3xl object-cover mt-3" />
              <img id="image-preview" alt="your image" v-show="image != ''"
                class="md:w-44.5 md:h-52.5 w-36 h-40 rounded-3xl object-cover mb-3" />
              <label for="input-image" class="font-sansation-light">
                <p class="bg-gray-200 p-2 px-3 rounded-2xl">upload image</p>
                <input id="input-image" type="file" class="hidden" accept="image/*"
                  @change="handleImageUpload($event)" />
              </label>

              <!-- <form @submit.prevent="addImage"> -->
              <form @submit.prevent="addMusicInfo" class="w-4/6 my-5">
                <div class="my-2">
                  <p class="text-md my-2">Title*</p>
                  <input v-model="musicInfo.title" type="text" name="title" placeholder="TITLE " required
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2" v-if="addOrUp=='up'">
                  <p class="text-md my-2">Album</p>
                  <input v-model="musicInfo.album" type="text" name="album" placeholder="ALBUM "
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2" v-if="addOrUp=='up'">
                  <p class="text-md my-2">Artist</p>
                  <input v-model="musicInfo.artist" type="text" name="artist" placeholder="ARTIST "
                    class="w-full h-12 pl-4 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base" />
                </div>
                <div class="my-2">
                  <p class="text-md my-2">Mood</p>
                  <select v-model="musicInfo.mood"
                    class="w-full h-12 px-4 text-gray-400 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base">
                    <option disabled value="">SELECT MOOD</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
                <div class="my-2">
                  <p class="text-md my-2">Tags</p>
                  <select v-model="musicInfo.tags"
                    class="w-full h-12 px-4 text-gray-400 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base">
                    <option disabled value="">SELECT TAG</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>

                <!-- </form> -->
                <div class="flex md:flex-row md:justify-start flex-col items-center w-full space-x-4"
                  v-if="addOrUp=='up'">
                  <div>
                    <label for="input-audio" class="font-sansation-light">
                      <p>upload music</p>
                      <input id="input-audio" type="file" class="hidden" accept="audio/*"
                        @change="handleFileUpload($event)" />
                    </label>
                  </div>
                  <div>
                    <audio id="audio-preview" controls v-show="file != ''" />
                  </div>
                </div>
                <div class="my-3 flex md:flex-row flex-col ">
                  <div>
                    <p class="md:mr-2" v-if="addOrUp=='up'">music will be</p>
                    <p class="md:mr-2" v-else>playlist will be</p>
                  </div>
                  <div class="md:flex md:flex-row">
                    <div>
                      <input type="radio" v-model="musicInfo.pub" value="public" />
                      <label for="musicInfo.pub" class="mx-2 m">public</label>
                    </div>
                    <div>
                      <input type="radio" v-model="musicInfo.pub" value="private" />
                      <label for="musicInfo.pub" class="mx-2">private</label>
                    </div>
                  </div>
                </div>
                <div v-if="addOrUp=='add'">
                  <input type="radio" v-model="musicInfo.confirm" value="autoAdd" />
                  <label for="musicInfo.confirm" class="mx-2">auto add music in this playlist
                  </label>
                </div>
                <div><input type="radio" v-model="isActive" @click="activeClick()" value="false" />
                  <label for="isActive" class="mx-2">I have read and agree to the website
                    <a class="text-violetlight font-sansation-bold underline underline-offset-1">terms and
                      conditions</a>
                  </label>
                </div>
                <div class="flex flex-row space-x-3 justify-center items-center my-5">
                  <button :disabled="isActive" @click="showPopupConfirm()"
                    :class="isActive ? 'bg-violet-200':'bg-violetlight' "
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
import popupCard from '../components/PopUpCard.vue'
export default {
  components: {
    popupCard,
  },
  data() {
    return {
      file: "",
      image: "",
      musicInfo: {
        title: "",
        album: "",
        artist: "",
        mood: "",
        tags: "",
        pub: "",
        confirm: "",
      },
      addOrUp: null,
      showClicked: false,
      editProducts: [],
      message: {
        header: '',
        body: '',
        status: '',
        button1: '',
        button2: '',
      },
      isActive: true,
    };
  },
  methods: {
    ...mapActions({
      hideSideBar: "homepage/hideSideBar", // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: "homepage/handleView",
    }),
    handleImageUpload(event) {
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
      });
    },
    showMessageClicked(value) {
      this.showClicked = !value;
    },
    routerClicked() {
      this.$router.push('/hometest')
    },
    closeClicked() {
      this.showClicked = false;
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
    addMusicInfo() { },

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
};
</script>

<style>

</style>
