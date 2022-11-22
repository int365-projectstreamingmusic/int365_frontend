<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : 'lg:ml-36 ml-5'">
    <div class="flex flex-col">
      <div class="">
        <!-- Account Profile chagne password -->
        <div class="lg:mx-36 md:ml-16">
          <div class="md:text-2xl text-lg font-sansation-bold flex justify-center lg:justify-start my-7">
            Account
          </div>
          <div class="flex flex-col lg:flex-row justify-center md:items-start items-center">
            <div class="rounded-lg flex flex-col  ">
              <img v-if="image == '' && data.profileIamge == ''" src="../assets/user_icon.png"
                style="width: 262px; height: 175px; object-fit: cover" />
              <img v-show="!imageholderEnable" :src="url + 'api/streaming/image/' + data.profileIamge"
                style="width: 262px; height: 175px; object-fit: cover" />
              <img id="image-preview" alt="your image" v-show="image != ''"
                style="width: 262px; height: 175px; object-fit: cover" />

              <label for="inputImage" class="font-sansation-light" v-if="isEdit">
                <div v-if="isEdit"
                  class="cursor-pointer text-sm w-24 h-6 my-3 mx-12 rounded-lg bg-neutral-100 text-black text-center">
                  upload image
                </div>
                <input id="inputImage" type="file" class="hidden" accept="image/*"
                  @change="handleImageUpload($event)" />
              </label>
            </div>

            <div
              class="font-sansation-light text-sm md:w-4/6 w-82  md:ml-10 my-5 flex justify-center flex-col items-center md:items-start">
              <div class="flex flex-row justify-start items-start">
                <p class="text-xs text-gray-500 font-bold tracking-wide">
                  Profile
                </p>
              </div>
              <div class="space-y-2 my-3 flex flex-col   ">
                <div class="flex flex-row space-x-3 justify-center md:justify-start ">
                  <div class="w-20">Full name</div>
                  <div class="pl-3" v-if="data.firstName != null">
                    {{ data.firstName }} {{ data.lastName }}
                  </div>
                  <div class=" pl-3" v-else>{{ UserName }}</div>
                </div>
                <div class="flex flex-row space-x-3">
                  <p class="w-20">Username</p>
                  <p class="pl-3">{{ data.username }}</p>
                </div>
                <div class="flex flex-row space-x-3">
                  <p class="w-20">Email</p>
                  <p class="px-3 text-left break-all">
                    {{ data.email }}
                  </p>
                </div>
              </div>
              <div class="flex flex-row space-x-5  ">
                <div @click="editProfile" v-if="!isEdit && !isChange"
                  class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                  edit profile
                </div>

                <div @click="changePass" v-if="!isChange && !isEdit"
                  class="cursor-pointer text-sm w-36 h-6 flex items-center justify-center rounded-lg bg-violetlight text-white text-center">
                  chagne password
                </div>
              </div>
              <div class="font-sansation-light text-sm flex justify-center items-center">
                <div v-if="isChange" class="w-82 flex justify-center md:items-start flex-col">
                  <div>
                    <p class="text-xs text-gray-500 font-bold tracking-wide">
                      Change Password
                    </p>
                  </div>
                  <form @submit.prevent="userChangePassword">
                    <div class="my-2 flex flex-row">
                      <div class="text-md my-2 md:mx-5 mx-2 w-32">
                        Current Password :
                      </div>
                      <input v-model="passwordForm.oldPassword" type="password" name="Current Password"
                        placeholder="Current Password" required
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 w-32">New Password :</p>
                      <input v-model="passwordForm.newPassword" type="password" name="NewPassword"
                        placeholder="New Password" required
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 w-32">
                        Confrim Password :
                      </p>
                      <input v-model="passwordForm.confirmationPassword" type="password" name="confirmationPassword"
                        placeholder="Confrim Password" required
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="text-red-500 text-sm font-mono mx-5">
                      {{ this.invalid.duplicated.errorMessage }}
                    </div>
                    <div class="flex md:justify-end md:items-end justify-center items-center flex-row space-x-5">
                      <button
                        class="cursor-pointer text-sm md:w-48 w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                        save
                      </button>
                      <button @click="editClose"
                        class="cursor-pointer text-sm md:w-48 w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
                <div v-if="isEdit" class="w-82 flex flex-col md:items-start items-center ">
                  <div class="flex md:items-start items-center">
                    <div class="text-xs text-gray-500 font-bold tracking-wide ">
                      Edit Profile
                    </div>
                  </div>
                  <form @submit.prevent="userEditProfile">
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 md:w-32 w-24">
                        Profile Name :
                      </p>
                      <input v-model="profileForm.profileName" type="text" name="profileName" placeholder="ProfileName"
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 md:w-32 w-24">
                        Firstname :
                      </p>
                      <input v-model="profileForm.firstName" type="text" name="firstName" placeholder="Firstname"
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 md:w-32 w-24">
                        Lastname :
                      </p>
                      <input v-model="profileForm.lastName" type="text" name="lastName" placeholder="Lastname"
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        " />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 md:mx-5 mx-2 md:w-32 w-24">Bio :</p>
                      <textarea v-model="profileForm.userBios" type="text" name="userBios" placeholder="userBios"
                        class="w-48 h-24 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        ">
                  </textarea>
                    </div>
                    <div class="text-red-500 text-sm font-mono mx-5">
                      {{ this.invalid.duplicated.errorMessage }}
                    </div>
                    <div class="flex md:justify-end md:items-end justify-start items-start flex-row space-x-5">
                      <button
                        class="cursor-pointer text-sm md:w-48 w-36 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                        save
                      </button>
                      <button @click="editClose"
                        class="cursor-pointer text-sm md:w-48 w-36 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Account Profile chagne password -->
        <!-- My song -->
        <div class="flex flex-row items-end font-sansation-light justify-between mt-36 mx-3 md:mx-36">
          <div class="flex flex-row justify-center items-end " @click="page1('up')">
            <div class="md:text-2xl text-lg font-sansation-bold flex justify-center lg:justify-start">My Song
              <router-link to="/addmusic"
                class="text-sm font-sansation-regular pt-2 pl-5 flex justify-center text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">
                upload song
              </router-link>
            </div>

          </div>
          <div class="text-sm">filter</div>
        </div>
        <div class="font-sansation-light md:px-10 px-3 py-7 bg-gray-50 rounded-lg mt-5 md:mx-36 mx-3">
          <loading v-if="mySong == ''" class="flex items-center justify-center"></loading>
          <div v-if="mySong != ''" class="sm:my-4 my-2 ">
            <div
              class="lg:text-lg md:text-base sm:text-sm text-ss flex flex-row font-sansation-regular tracking-wider border-b-2 border-violetdark text-center select-none  pb-1 space-x-1">
              <p class="w-8 md:w-16">#</p>
              <p class="w-6/12 md:w-3/6 flex justify-start">Name</p>
              <p class="w-1/12 invisible lg:visible md:w-2/6">Album</p>
              <p class="w-3/12 md:w-1/6">Release</p>
              <span class="w-20 flex justify-center items-center material-icons text-red-600 " @click="editStatus()">
                edit
              </span>
            </div>

            <div v-for="(item, index) in mySong" :key="index"
              class="space-x-1 flex flex-row items-center font-sansation-regular tracking-wider text-center cursor-pointer  py-2 my-1 rounded-full hover:bg-slate-100 hover:text-violetdark transition duration-500">
              <p class="w-8 md:w-16 sm:text-sm text-xs">{{ index + 1 }}</p>
              <p @click="acceptData(item)"
                class="truncate w-6/12 md:w-3/6 sm:text-sm text-xs flex justify-start overflow-x-scroll">
                {{ item.trackName }}
              </p>
              <p v-if="item.albums != null" class="truncate w-1/12 md:w-2/6 sm:text-sm text-xs invisible lg:visible">
                {{ item.albums.albumName }}
              </p>
              <p v-else class="truncate w-1/12 md:w-2/6 sm:text-sm text-xs invisible lg:visible">-</p>
              <p class="truncate w-3/12 md:w-1/6 sm:text-sm text-xs">
                {{ item.timestamp.substr(0, 10) }}
              </p>
              <div class="w-20 flex flex-row ">
                <div><span v-if="statusEdit" class="mx-1 material-icons text-red-600" @click="showPopupConfirm()">
                    delete
                  </span></div>
                <div><span v-if="statusEdit" class="mx-1 material-icons text-red-600" @click="editMusic(item.id)">
                    edit
                  </span></div>
              </div>
              <popupCard v-if="showClicked" :message="this.message" @close="closeClicked()"
                  @confirm="deleteMusic(item.id)"></popupCard>
            </div>
          </div>
          <paginate :totalItems="totalSongMySong" :sizePage="totalPageMySong" :itemsPerPage="15" :maxPagesShow="4"
            @pageNum="resPageNum"></paginate>
        </div>
        <!-- My song -->
        <!-- History -->

        <div class="flex flex-row items-end font-sansation-light mt-10 md:mx-36 mx-3">
          <div class="flex flex-row items-end">
            <div class="md:text-2xl text-lg font-sansation-bold flex justify-center lg:justify-start my-7">History
              <div @click="clearHistory()"
                class="text-sm font-sansation-regular pt-2 pl-5 text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">
                clear history
              </div>
            </div>

          </div>
        </div>

        <div class="font-sansation-light px-10 py-7 bg-gray-50 rounded-lg mt-5 md:mx-36 mx-3">
          <loading v-if="myHistory == ''"></loading>
          <div v-if="myHistory != ''" class="sm:my-4 my-2">
            <div
              class="lg:text-lg md:text-base sm:text-sm text-ss flex flex-row font-sansation-regular tracking-wider border-b-2 border-violetdark text-center select-none 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 pb-1 space-x-1">
              <p class="w-1/12 md:w-1/6">#</p>
              <p class="w-6/12 md:w-3/6 flex justify-start">Name</p>
              <p class="w-3/12 md:w-2/6">album</p>
              <p class="w-2/12 md:w-1/6">release</p>
            </div>

            <div v-for="(item, index) in myHistory" :key="index"
              class="space-x-1 flex flex-row items-center font-sansation-regular tracking-wider text-center cursor-pointer 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 sm:py-2 py-1 my-1 rounded-full hover:bg-slate-100 hover:text-violetdark transition duration-500">
              <p class="w-1/12 md:w-1/6 sm:text-sm text-xs">{{ index + 1 }}</p>
              <p class="truncate w-6/12 md:w-3/6 sm:text-sm text-xs flex justify-start">
                {{ item.track.trackName }}
              </p>
              <p v-if="item.track.albums != null" class="truncate w-3/12 md:w-2/6 sm:text-sm text-xs">
                {{ item.track.albums.albumName }}
              </p>
              <p v-else class="truncate w-3/12 md:w-2/6 sm:text-sm text-xs">-</p>
              <p class="truncate w-2/12 md:w-1/6 sm:text-sm text-xs">
                {{ item.timestamp.substr(0, 10) }}
              </p>
            </div>
          </div>
          <paginate :totalItems="totalSongMyHistory" :sizePage="totalPageMyHistory" :itemsPerPage="15"
            :maxPagesShow="4" @pageNum="resPageNumHis"></paginate>
        </div>
        <!-- History -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { musicAuthen } from "../store/musicAuthen.js";
import Paginate from "../components/Paginate.vue";
import Loading from "../components/Loading.vue"
import PopupCard from '../components/PopUpCard.vue';
export default {
  components: {
    Paginate,
    Loading,
    musicAuthen,
    PopupCard
  },
  emits: ['music'],
  data() {
    return {
      path: "",
      isEdit: false,
      isChange: false,
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmationPassword: "",
      },
      profileForm: {
        firstName: "",
        lastName: "",
        profileName: "",
        userBios: "",
      },
      invalid: {
        duplicated: {
          showErrorBox: false,
          errorMessage: "",
        },
      },
      file: "",
      image: "",
      history: {},
      inputImage: "",
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
      profileIamge: "",
      imageholderEnable: false,
      statusEdit: false,
      showClicked: false,
      message: {
        header: '',
        body: '',
        status: '',
        button1: '',
        button2: '',
      },
    };
  },
  methods: {
    resPageNum(e) {
      this.$store.dispatch('musicAuthen/getMySong', e - 1)
    },
    acceptData(e) {
      this.$emit('music', { name: e.trackFile, image: e.trackThumbnail, nameShow: e.trackName })
    },
    resPageNumHis(e) {
      this.$store.dispatch('musicAuthen/getMyHistory', e - 1)
    },
    editProfile() {
      this.isEdit = !this.isEdit;
      this.getProfile();
    },
    changePass() {
      this.isChange = !this.isChange;
    },
    editClose() {
      this.isChange = false;
      this.isEdit = false;
      passwordForm = {
        oldPassword: null,
        newPassword: null,
        confirmationPassword: null,
      };
    },
    editMusic(data) {
      localStorage.setItem("idTrack", data);
      localStorage.setItem("addOrUp", "editMusic");
      this.$router.push('/addmusic')
    },
    page1(data) {
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    },
    closeClicked() {
      this.showClicked = false;
    },
    showPopupConfirm() {
        this.showClicked = true;
        this.message.header = "Are sure for delete music ?"
        this.message.body = ""
        this.message.button1 = 'Confirm'
        this.message.button2 = 'Cancle'
    },
    editStatus() {
      this.statusEdit = !this.statusEdit
    },
    async deleteMusic(id) {
      await axios
        .delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/artist/track/delete?trackId=${id}`)
        .then((response) => {
          this.getMySong();
        });
    },
    handleImageUpload(event) {
      this.profileIamge = null;
      this.image = event.target.files[0];
      this.previewImage();
    },
    async previewImage() {
      let pic = document.getElementById("image-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.addEventListener("load", function () {
        pic.src = reader.result;
      });
      this.imageholderEnable = true;

    },
    async userChangePassword() {
      let regisJson = JSON.stringify(this.passwordForm);
      let errorCode = 0;
      await axios
        .put(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/authen/changepassword`,
          regisJson,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function () {
          errorCode = 0;
        })
        .catch((error) => {
          errorCode = error.response.data.exceptionCode;
          this.invalid.duplicated.showErrorBox = true;
          switch (errorCode) {
            case 3011:
              this.invalid.duplicated.errorMessage = "Passwords do NOT match.";
              break;
            case 3001:
              this.invalid.duplicated.errorMessage = "Incorrect password";
              break;
            default:
              this.invalid.duplicated.errorMessage =
                "An unknown error occures at API.";
              break;
          }
        });
      if (errorCode === 0) {
        this.$router.go();
      }
    },
    async userEditProfile() {
      const regisJson = new Blob([JSON.stringify(this.profileForm)], {
        type: 'application/json'
      })
      let formData = new FormData;
      formData.append('profile', regisJson)
      if (this.image != null && this.image != "") {
        formData.append('profileImage', this.image)
      }
      let errorCode = 0;
      await axios
        .put(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/myProfile`,
          formData,
        )
        .then(function () {
          errorCode = 0;
        })
        .catch((error) => {
          errorCode = error.response.data.exceptionCode;
          this.invalid.duplicated.showErrorBox = true;
          switch (errorCode) {
            case 3011:
              this.invalid.duplicated.errorMessage = "Passwords do NOT match.";
              break;
            case 3001:
              this.invalid.duplicated.errorMessage = "Incorrect password";
              break;
            default:
              this.invalid.duplicated.errorMessage =
                "An unknown error occures at API.";
              break;
          }
        });
      if (errorCode === 0) {
        this.$router.go();
      }
    },
    async getProfile() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/myProfile`)
        .then((response) => {
          this.profileForm.firstName = response.data.firstName;
          this.profileForm.lastName = response.data.lastName;
          this.profileForm.userBios = response.data.userBios;
          this.profileForm.profileName = response.data.profileName;
          this.profileIamge = response.data.profileIamge;
        });
    },
    async clearHistory() {
      await axios
        .delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/Clear`)
        .then((response) => {
        });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      data: "authentication/data",
      sideBarShow: "homepage/sideBarShow",
      smView: "homepage/smView",
      mySong: 'musicAuthen/mySong',
      notfoundMySong: 'musicAuthen/notfoundMySong',
      totalSongMySong: 'musicAuthen/totalSongMySong',
      totalPageMySong: 'musicAuthen/totalPageMySong',
      myHistory: 'musicAuthen/myHistory',
      notfoundMyHistory: 'musicAuthen/notfoundMyHistory',
      totalSongMyHistory: 'musicAuthen/totalSongMyHistory',
      totalPageMyHistory: 'musicAuthen/totalPageMyHistory'
    }),
    getContent() {
      if (this.authenticated) {
        this.$store.dispatch('homepage/getRecentplayed', 6)
      }
      this.$store.dispatch('musicAuthen/getMySong');
      this.$store.dispatch('musicAuthen/getMyHistory');
    }
  },
  mounted(){
    this.getContent();
  }
};
</script>
<style>

</style>
