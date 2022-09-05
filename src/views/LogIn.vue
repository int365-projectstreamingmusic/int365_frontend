<template>
  <div
    class="h-screen w-screen flex justify-center item-center flex-col font-sansation-light"
  >
    <div class="flex justify-start lg:w-2/6 my-3">
      <router-link to="/" class="flex flex-row justify-center item-center">
        <span class="material-icons text-2xl">chevron_left</span>
        <p
          class="underline underline-offset-1 text-black hover:text-violetdark transition duration-200 cursor-pointer hover:text-shadow-xl"
        >
          Back to homepage
        </p>
      </router-link>
    </div>
    <div
      class="overflow-hidden lg:w-2/6 p-12 rounded-3xl bg-gray-100 shadow-xl flex flex-col justify-center item-center cursor-pointer transition duration-200"
    >
      <div class="flex flex-row items-center space-x-2 text-3xl">
        <p
          @click="click('1')"
          class="cursor-pointer hover:text-violetlight transition duration-300"
          key=""
          :class="this.localbox == 1 ? 'text-violetlight' : ''"
        >
          Log in
        </p>
        <p>|</p>
        <p
          @click="click('2')"
          class="cursor-pointer hover:text-violetlight transition duration-300"
          :class="this.localbox == 2 ? 'text-violetlight' : ''"
        >
          Register
        </p>
      </div>
      <div class="w-5/6 my-6" v-if="this.logIn">
        <form action="" @submit.prevent="doLogin">
          <div class="my-2">
            <p class="text-md my-2 mx-5">Username</p>
            <input
              v-model="logform.userName"
              type="text"
              name="userName"
              placeholder="      USERNAME OR EMAIL "
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
          </div>
          <div class="my-2">
            <p class="text-md my-2 mx-5">Password</p>
            <input
              v-model="logform.password"
              type="password"
              name="password"
              placeholder="      PASSWORD"
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
          </div>
          <div class="my-4 flex justify-center item-center">
            <button
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md bg-gray-600 text-white flex justify-center item-center"
            >
              LOGIN
              <span class="material-icons text-violetlight">chevron_right</span>
            </button>
          </div>
          <div>Forgot password</div>
        </form>
      </div>
      <div v-else class="w-5/6 my-6">
        <form action="" @submit.prevent="doRegister">
          <div class="my-2">
            <p class="text-md my-2 mx-5">Username</p>
            <input
              v-model="regisform.username"
              type="text"
              name="username"
              placeholder="      USERNAME OR EMAIL "
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
          </div>
          <div class="my-2">
            <p class="text-md my-2 mx-5">Email</p>
            <input
              v-model="regisform.email"
              type="text"
              name="email"
              placeholder="      EMAIL ADDRESS "
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
          </div>
          <div class="my-2">
            <p class="text-md my-2 mx-5">Password</p>
            <input
              v-model="regisform.user_passcode"
              type="password"
              name="user_passcode"
              placeholder="      PASSWORD"
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
          </div>
          <div class="my-2">
            <input
              v-model="confirmPass"
              type="password"
              name="confirmPass"
              placeholder="      CONFIRM PASSWORD"
              required
              class="w-full h-12 cursor-pointer transition duration-200 rounded-md border-2 border-zinc-400"
            />
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
import axios from "axios"

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
        user_passcode:"",
        email: "",
      },
      localbox: "",
      logIn: true,
      confirmPass: "",
    };
  },
  mounted() {
    this.localbox = localStorage.getItem("logInActive");
    this.localbox == 1 ? (this.logIn = true) : (this.logIn = false);
  },
  methods: {
    ...mapActions({
      signIn: "authentication/signIn",
    }),
    click(active) {
      this.regisform = {
        username: "",
        user_passcode:"",
        email: "",
      };
      this.confirmPass= "",
      this.logform = {
        userName: "",
        password: "",
      },
        localStorage.setItem("logInActive", active);
      this.localbox = localStorage.getItem("logInActive");
      this.localbox == 1 ? (this.logIn = true) : (this.logIn = false);
    },
   async doLogin() {
        let response = await this.signIn(JSON.stringify(this.logform));
        if (response.data.accessToken) {
          this.invalid.badcredentials = false;
          this.$router.replace({
            name: 'Home'
          })
        } else if (response.data.exceptionCode == 3007) {
          this.invalid.suspended = true;
          setTimeout(() =>{
              this.invalid.sus = true;
            },1000)
          // await setTimeout(() => {
          //   this.invalid.suspended = false;
          //   this.invalid.sus = false;
          //   this.$router.replace({
          //     name: 'ForbiddenSector'
          //   })
          // }, 2000);
        } else {
        }
      },
    async doRegister() {
      if(this.regisform.user_passcode=== this.confirmPass){
        // let formData = new FormData()
        let regisJson = JSON.stringify(this.regisform);
        // const regisBlob = new Blob([regisJson], {
        //   type: 'application/json'
        // })
        // formData.append('newUser', regisBlob)
        console.log(regisJson);
        await axios.post(`http://20.213.128.1:8086/api/authen/signup`, regisJson, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
        }else{
          
          console.log("password not match");
        }
    }
  },
};
</script>
