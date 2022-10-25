<template>
  <div class="h-screen" :class="sideBarShow ? 'lg:ml-75' : 'lg:ml-36 ml-5'">
    <div class="flex flex-col">
      <div class="">
        <!-- Account Profile chagne password -->
        <div class="lg:mx-36 md:ml-16">
          <div class="md:text-2xl text-lg font-sansation-bold flex justify-center lg:justify-start my-7">
            Account
          </div>
          <div class="flex flex-col lg:flex-row justify-center items-center">
            <div class="rounded-lg flex flex-col justify-center items-center">
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

            <div class="font-sansation-light text-sm md:w-4/6 w-full md:ml-10 my-5">
              <div class="flex flex-row justify-start items-start">
                <p class="text-xs text-gray-500 font-bold tracking-wide">
                  Profile
                </p>
              </div>
              <div class="space-y-2 my-3 flex flex-col">
                <div class="flex flex-row space-x-3">
                  <p class="w-20">Full name</p>
                  <p class="w-81 pl-3" v-if="data.firstName != null">
                    {{ data.firstName }} {{ data.lastName }}
                  </p>
                  <p class="w-81 pl-3" v-else>{{ UserName }}</p>
                </div>
                <div class="flex flex-row space-x-3">
                  <p class="w-20">Username</p>
                  <p class="w-81 pl-3">{{ data.username }}</p>
                </div>
                <div class="flex flex-row space-x-3">
                  <p class="w-20">Email</p>
                  <p class="w-81 px-3 text-left break-all">
                    {{ data.email }}
                  </p>
                </div>
              </div>
              <div class="flex flex-row space-x-5">
                <div @click="editProfile" v-if="!isEdit && !isChange"
                  class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center">
                  edit profile
                </div>

                <div @click="changePass" v-if="!isChange && !isEdit"
                  class="cursor-pointer text-sm w-36 h-6 flex items-center justify-center rounded-lg bg-violetlight text-white text-center">
                  chagne password
                </div>
              </div>
            </div>
          </div>

          <div class="lg:ml-75 font-sansation-light text-sm md:-mt-8 -mt-5">
            <div v-if="isChange" class="w-82 md:ml-8">
              <div>
                <p class="text-xs text-gray-500 font-bold tracking-wide">
                  Change Password
                </p>
              </div>
              <form @submit.prevent="userChangePassword">
                <div class="my-2 flex flex-row">
                  <p class="text-md my-2 md:mx-5 mx-2 w-32">
                    Current Password :
                  </p>
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
            <div v-if="isEdit" class="w-82 md:ml-8">
              <div>
                <p class="text-xs text-gray-500 font-bold tracking-wide">
                  Edit Profile
                </p>
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
        <!-- Account Profile chagne password -->
        <!-- My song -->
        <div class="flex flex-row items-end font-sansation-light justify-between mt-36 mx-3 md:mx-36">
          <div class="flex flex-row items-end" @click="page1('up')">
            <div class="md:text-xl text-base md:mr-12 mr-3">My Song</div>
            <router-link to="/addmusic"
              class="text-sm font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">
              upload song
            </router-link>
          </div>
          <div class="text-sm">filter</div>
        </div>
        <div class="font-sansation-light px-10 py-7 bg-gray-50 rounded-lg mt-5 md:mx-36 mx-3">
          <div class="sm:my-4 my-2">
            <div
              class="lg:text-lg md:text-base sm:text-sm text-ss flex flex-row font-sansation-regular tracking-wider border-b-2 border-violetdark text-center select-none 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 pb-1 space-x-1">
              <p class="w-1/12 md:w-1/6">#</p>
              <p class="w-6/12 md:w-3/6 flex justify-start">Name</p>
              <p class="w-2/12 md:w-1/6">Album</p>
              <p class="w-2/12 md:w-1/6">Release</p>
              <span class="w-16 material-icons text-red-600" @click="deleteStatus()">
                delete
              </span>
            </div>
            <div v-for="(item, index) in mySong" :key="index"
              class="space-x-1 flex flex-row items-center font-sansation-regular tracking-wider text-center cursor-pointer 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 sm:py-2 py-1 my-1 rounded-full hover:bg-slate-100 hover:text-violetdark transition duration-500">
              <p class="w-1/12 md:w-1/6 sm:text-sm text-xs">{{index+1}}</p>
              <p class="truncate w-6/12 md:w-3/6 sm:text-sm text-xs flex justify-start">
                {{item.trackName}}
              </p>
              <p class="truncate w-3/12 md:w-2/6 sm:text-sm text-xs">Honne</p>
              <p class="truncate w-2/12 md:w-1/6 sm:text-sm text-xs">
                {{item.timestamp.substr(0, 10)}}
              </p>
              <span v-if="statusDelete" class="w-16 material-icons text-red-600" @click="deleteMusic(item.id)">
                delete
              </span>
            </div>
          </div>
          <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 2xl:mb-10">
            <div class="icon-navbar-outside">
              <span class="material-icons md:text-2xl text-lg">chevron_left</span>
            </div>
            <div>
              <p class="page-number-outside">1</p>
            </div>
            <div class="icon-navbar-outside">
              <span class="material-icons md:text-2xl text-lg">chevron_right</span>
            </div>
          </div>
        </div>
        <!-- My song -->
        <!-- History -->
        <div class="flex flex-row items-end font-sansation-light mt-10 md:mx-36 mx-3">
          <div class="flex flex-row items-end">
            <div class="md:text-xl text-base md:mr-12 mr-3">History</div>
            <div @click="clearHistory()"
              class="text-sm font-sansation-regular text-violetlight hover:text-violetdark transition duration-200 cursor-pointer">
              clear history
            </div>
          </div>
        </div>
        <div class="font-sansation-light px-10 py-7 bg-gray-50 rounded-lg mt-5 md:mx-36 mx-3">
          <div class="sm:my-4 my-2">
            <div
              class="lg:text-lg md:text-base sm:text-sm text-ss flex flex-row font-sansation-regular tracking-wider border-b-2 border-violetdark text-center select-none 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 pb-1 space-x-1">
              <p class="w-1/12 md:w-1/6">#</p>
              <p class="w-6/12 md:w-3/6 flex justify-start">Name</p>
              <p class="w-3/12 md:w-2/6">album</p>
              <p class="w-2/12 md:w-1/6">release</p>
            </div>
            <div v-for="(item, index) in this.history" :key="index"
              class="space-x-1 flex flex-row items-center font-sansation-regular tracking-wider text-center cursor-pointer 2xl:pl-10 2xl:pr-10 sm:pl-5 sm:pr-5 pl-1 pr-3 sm:py-2 py-1 my-1 rounded-full hover:bg-slate-100 hover:text-violetdark transition duration-500">
              <p class="w-1/12 md:w-1/6 sm:text-sm text-xs">{{index+1}}</p>
              <p class="truncate w-6/12 md:w-3/6 sm:text-sm text-xs flex justify-start">
                {{item.track.trackName}}
              </p>
              <p class="truncate w-3/12 md:w-2/6 sm:text-sm text-xs">Honne</p>
              <p class="truncate w-2/12 md:w-1/6 sm:text-sm text-xs">
                {{item.timestamp.substr(0, 10)}}
              </p>
            </div>
          </div>
          <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 2xl:mb-10">
            <div class="icon-navbar-outside">
              <span class="material-icons md:text-2xl text-lg">chevron_left</span>
            </div>
            <div>
              <p class="page-number-outside">1</p>
            </div>
            <div class="icon-navbar-outside">
              <span class="material-icons md:text-2xl text-lg">chevron_right</span>
            </div>
          </div>
        </div>
        <!-- History -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {

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
      mySong: {},
      file: "",
      image: "",
      history: {},
      inputImage: "",
      url: `${process.env.VUE_APP_MY_ENV_VARIABLE}`,
      profileIamge: "",
      imageholderEnable: false,
      statusDelete: false,

    };
  },
  methods: {
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
    page1(data) {
      localStorage.setItem("addOrUp", data);
      this.$router.go();
    },
    deleteStatus(){
      this.statusDelete = !this.statusDelete
    },
    async deleteMusic(id){
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
      let formData = new FormData();
      formData.append("profileImage", this.image);
      await axios
        .put(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/profile-image`,
          formData
        )
        .then((response) => {
        });
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
      let regisJson = JSON.stringify(this.profileForm);
      let errorCode = 0;
      await axios
        .put(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/myProfile`,
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
    async getProfile() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/myProfile`)
        .then((response) => {
          this.profileForm = response.data;
          this.profileForm.firstName = response.data.firstName;
          this.profileForm.lastName = response.data.lastName;
          this.profileForm.userBios = response.data.userBios;
          this.profileForm.profileName = response.data.profileName;
          this.profileIamge = response.data.profileIamge;
        });
    },
    async getHistory() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/MyHistory`)
        .then((response) => {
          this.history = response.data.content;
        });
    },
    async clearHistory() {
      await axios
        .delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/Clear`)
        .then((response) => {
        });
    },
    async getMySong() {
      await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/artist/track?page=0&pageSize=0&searchContent`)
        .then((response) => {
          this.mySong = response.data.content;

        });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      data: "authentication/data",
      sideBarShow: "homepage/sideBarShow",
      smView: "homepage/smView",
    }),
  },
  mounted() {
    this.getHistory();
    this.getMySong();
  },
};
</script>
<style>

</style>
