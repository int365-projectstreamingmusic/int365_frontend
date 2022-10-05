<template>
  <div class="h-screen flex items-center flex-col font-sansation-light" 
  >
    <div class="flex flex-col w-full my-16 bg-red-300" :class="sideBarShow ?'ml-75':''" >
      <!-- <div class=" flex  " > -->
      <!-- Top5music -->
      <div class="flex justify-center mb-8">
        <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80">
          <div class="flex flex-row items-start">
              <div class="rounded-lg overflow-hidden" style="width: 262px">
                <img
                  src="../assets/yourname.png"
                  style="width: 262px; height: 175px; object-fit: cover"
                />
              </div>
              <div class="font-sansation-light text-sm mx-10 w-4/6">
                <div class="">
                  <p class="text-xs text-gray-500 font-bold tracking-wide">
                    Profile
                  </p>
                </div>
                <div class="mx-4 space-y-2 my-3">
                  <div class="flex flex-row space-x-5">
                    <p class="w-20">Name</p>
                    <p class="w-81 pl-3 " v-if="data.firstName != null">
                      {{ data.firstName }}
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
                <div v-if="isChange" class="w-82">
                  <div>
                    <p class="text-xs text-gray-500 font-bold tracking-wide">
                      Change Password
                    </p>
                  </div>
                  <form @submit.prevent="userChangePassword">
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 mx-5 w-32">Current Password :</p>
                      <input
                        v-model="passwordForm.oldPassword"
                        type="password"
                        name="Current Password"
                        placeholder="Current Password"
                        required
                        class="w-48 h-8 pl-5  cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        "
                      />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 mx-5 w-32">New Password :</p>
                      <input
                        v-model="passwordForm.newPassword"
                        type="password"
                        name="NewPassword"
                        placeholder="New Password"
                        required
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        "
                      />
                    </div>
                    <div class="my-2 flex flex-row">
                      <p class="text-md my-2 mx-5 w-32">Confrim Password :</p>
                      <input
                        v-model="passwordForm.confirmationPassword"
                        type="password"
                        name="confirmationPassword"
                        placeholder="Confrim Password"
                        required
                        class="w-48 h-8 pl-5 cursor-pointer border-2 transition duration-200 rounded-md bg-zinc-100 text-xs md:text-sm"
                        :class="
                          this.invalid.duplicated.showErrorBox
                            ? 'border-red-500'
                            : ''
                        "
                      />
                    </div>
                    <div class="text-red-500 text-sm font-mono mx-5">
                      {{ this.invalid.duplicated.errorMessage }}
                    </div>
                    <div class="flex justify-end items-end flex-row space-x-5">
                      <button
                        class="cursor-pointer text-sm w-48 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center"
                      >
                        save
                      </button>
                      <button
                        @click="editClose"
                        class="cursor-pointer text-sm w-48 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center"
                      >
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
                <div class="flex flex-row space-x-5">
                  <div
                    @click="editProfile"
                    v-if="!isEdit && !isChange"
                    class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center"
                  >
                    edit profile
                  </div>
                  <div
                    v-if="isEdit"
                    class="cursor-pointer text-sm w-24 h-6 flex items-center justify-center rounded-lg bg-neutral-100 text-black text-center"
                  >
                    upload image
                  </div>
                  <div
                    @click="changePass"
                    v-if="!isChange"
                    class="cursor-pointer text-sm w-36 h-6 flex items-center justify-center rounded-lg bg-violetlight text-white text-center"
                  >
                    chagne password
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
  import { mapGetters, mapActions } from "vuex";
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
        invalid: {
          duplicated: {
            showErrorBox: false,
            errorMessage: "",
          },
        },
      };
    },
    methods: {
      editProfile() {
        this.isEdit = !this.isEdit;
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
          if(errorCode===0){
            this.$router.go() 
          }
      },
    },
    computed: {
      ...mapGetters({
        authenticated: "authentication/authenticated",
        data: "authentication/data",
      }),
      ...mapActions({
        sideBarShow: "homepage/sideBarShow",
      }),
    },
  };
  </script>
  <style></style>
  
  
  