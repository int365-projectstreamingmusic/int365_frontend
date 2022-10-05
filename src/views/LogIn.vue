<template>
  <div
    class="h-screen flex item-center flex-col font-sansation-light"
    :class="sideBarShow ? 'xl:ml-75' : ''"
  >
    <div
      class="lg:w-2/6 h-5/6 p-12 flex flex-col justify-center item-center cursor-pointer transition duration-200"
    >
      <div class="flex flex-row items-center space-x-2 text-3xl">
        <div
          @click="click('1')"
          class="cursor-pointer hover:text-violetlight transition duration-300"
          key=""
          :class="this.localbox == 1 ? 'text-violetlight' : ''"
        >
          <p v-if="isChange">Reset Password</p>
          <p v-else>Sign in</p>
        </div>
        <p v-if="!isChange">|</p>
        <p
          v-if="!isChange"
          @click="click('2')"
          class="cursor-pointer hover:text-violetlight transition duration-300"
          :class="this.localbox == 2 ? 'text-violetlight' : ''"
        >
          Register
        </p>
      </div>
      <div class="w-5/6 my-6" v-if="this.logIn">
        <div v-if="isChange">
          <form @submit.prevent="userChangePassword">
            <div class="my-2">
              <p class="text-md my-2 mx-5">Username or Email:</p>

              <input
                v-model="passwordForm.Username"
                type="text"
                name="Username"
                placeholder="Username or Email"
                required
                class="w-full h-12 pl-6 cursor-pointer duration-200 border-zinc-400 hover-focus-input rounded-md border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
                "
              />
            </div>
            <div class="my-2">
              <p class="text-md my-2 mx-5">New Password :</p>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                name="NewPassword"
                placeholder="New Password"
                required
                class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-zinc-400 hover-focus-input border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
                "
              />
            </div>
            <div class="my-2">
              <p class="text-md my-2 mx-5">Confrim Password :</p>
              <input
                v-model="passwordForm.confirmationPassword"
                type="password"
                name="confirmationPassword"
                placeholder="Confrim Password"
                required
                class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-zinc-400 hover-focus-input border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
                "
              />
            </div>
            <div class="text-red-500 text-sm font-mono mx-5">
              {{ this.invalid.duplicated.errorMessage }}
            </div>
            <div class="flex flex-row space-x-3">
              <button
                class="w-full h-12 cursor-pointer transition duration-200 rounded-md bg-violetlight text-white flex justify-center item-center"
              >
                save
              </button>
              <button
                @click="editClose"
                class="w-full h-12 cursor-pointer transition duration-200 rounded-md bg-gray-600 text-white flex justify-center item-center"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <form action="" @submit.prevent="doLogin">
            <div class="my-2">
              <p class="text-md my-2 mx-5">Username</p>
              <input
                v-model="logform.userName"
                type="text"
                name="userName"
                placeholder="USERNAME OR EMAIL "
                required
                class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-zinc-400 hover-focus-input border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
                "
              />
            </div>
            <div class="my-2">
              <p class="text-md my-2 mx-5">Password</p>
              <input
                v-model="logform.password"
                type="password"
                name="password"
                placeholder="PASSWORD"
                required
                class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-zinc-400 hover-focus-input border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
                "
              />
            </div>
            <div class="text-red-500 text-sm font-mono">
              {{ this.invalid.duplicated.errorMessage }}
            </div>
            <div class="my-4 flex justify-center item-center">
              <button
                class="w-full h-12 cursor-pointer transition duration-200 rounded-md bg-gray-600 text-white flex justify-center item-center"
              >
                LOGIN
                <span class="material-icons text-violetlight"
                  >chevron_right</span
                >
              </button>
            </div>
            <div @click="changePass">Forgot password</div>
          </form>
        </div>
      </div>
      <div v-else class="w-5/6 my-6">
        <form action="" @submit.prevent="doRegister">
          <div class="my-2">
            <p class="text-md my-2 mx-5">Username</p>
            <input
              v-model="regisform.username"
              type="text"
              name="username"
              placeholder="USERNAME OR EMAIL "
              required
              class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400 hover-focus-input text-xs md:text-base"
              :class="
                this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
              "
            />
          </div>
          <div class="my-2">
            <p class="text-md my-2 mx-5">Email</p>
            <input
              v-model="regisform.email"
              type="text"
              name="email"
              placeholder="EMAIL ADDRESS "
              required
              class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400 hover-focus-input text-xs md:text-base"
              :class="
                this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
              "
            />
          </div>
          <div class="my-2">
            <p class="text-md my-2 mx-5">Password</p>
            <input
              v-model="regisform.user_passcode"
              type="password"
              name="user_passcode"
              placeholder="PASSWORD"
              required
              class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400 hover-focus-input text-xs md:text-base"
              :class="
                this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
              "
            />
          </div>
          <div class="my-2">
            <input
              v-model="confirmPass"
              type="password"
              name="confirmPass"
              placeholder="CONFIRM PASSWORD"
              required
              class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400 hover-focus-input text-xs md:text-base"
              :class="
                this.invalid.duplicated.showErrorBox ? 'border-red-500' : ''
              "
            />
          </div>
          <div class="text-red-500 text-sm font-mono">
            {{ this.invalid.duplicated.errorMessage }}
          </div>
          <div class="my-4 flex justify-center item-center">
            <button
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md bg-gray-600 text-white flex justify-center item-center"
            >
              Register
              <span class="material-icons text-violetlight">chevron_right</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      registerActive: false,
      registerSuccess: false,
      logform: {
        userName: "",
        password: "",
      },
      regisform: {
        username: "",
        user_passcode: "",
        email: "",
      },
      localbox: "",
      logIn: true,
      confirmPass: "",
      invalid: {
        duplicated: {
          showErrorBox: false,
          errorMessage: "",
        },
      },
      passwordForm: {
        Username: "",
        newPassword: "",
        confirmationPassword: "",
      },
      isChange: false,
    };
  },
  mounted() {
    this.localbox = localStorage.getItem("logInActive");
    this.localbox == 1 ? (this.logIn = true) : (this.logIn = false);
  },
  methods: {
    ...mapActions({
      signIn: "authentication/signIn",
      sideBarShow: "homepage/sideBarShow",
    }),
    click(active) {
      this.regisform = {
        username: "",
        user_passcode: "",
        email: "",
      };
      (this.confirmPass = ""),
        (this.logform = {
          userName: "",
          password: "",
        }),
        (this.invalid = {
          duplicated: {
            showErrorBox: false,
            errorMessage: "",
          },
        }),
        localStorage.setItem("logInActive", active);
      this.localbox = localStorage.getItem("logInActive");
      this.localbox == 1 ? (this.logIn = true) : (this.logIn = false);
    },
    changePass() {
      this.isChange = !this.isChange;
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
          this.$router.go(this.$router.currentRoute);
        })
        .catch((error) => {
          errorCode = error.response.data.exceptionCode;
          this.invalid.duplicated.showErrorBox = true;
        });
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
    },
    editClose() {
      this.isChange = false;
      passwordForm = {
        oldPassword: null,
        newPassword: null,
        confirmationPassword: null,
      };
    },
    async doLogin() {
      let response = await this.signIn(JSON.stringify(this.logform));
      let checkRole;
      if (response.data.roles != null) {
        response.data.roles.forEach((element) => {
          if (element === "admin") {
            checkRole = true;
          }
        });
      }

      if (response.data.token && checkRole === true) {
        this.$router.replace({
          name: "managereport",
        });
      } else if (response.data.exceptionCode === 3001) {
        this.invalid.duplicated.showErrorBox = true;
        this.invalid.duplicated.errorMessage =
          "Username or Password is incorrect.";
      } else {
        this.$router.replace({
          name: "hometest",
        });
      }
    },
    async doRegister() {
      if (this.regisform.user_passcode === this.confirmPass) {
        let regisJson = JSON.stringify(this.regisform);
        let errorCode = 0;
        await axios
          .post(
            `${process.env.VUE_APP_MY_ENV_VARIABLE}api/authen/signup`,
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
          });
        switch (errorCode) {
          case 3002:
            this.invalid.duplicated.errorMessage =
              "This username is taken by another user.";
            break;
          case 3009:
            this.invalid.duplicated.errorMessage =
              "This email is taken by another user.";
            break;
          default:
            this.invalid.duplicated.errorMessage =
              "An unknown error occures at API.";
            break;
        }
      } else {
        this.invalid.duplicated.errorMessage = "Passwords do NOT match.";
      }
    },
  },
};
</script>
