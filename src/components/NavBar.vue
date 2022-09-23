<template>
  <div  class="flex flex-row sticky top-0 z-50 bg-white  justify-center items-center">
    <div v-show="!sideBarShow" class="2xl:w-75 z-50 bg-white md:mr-10 mr-2 mb-5 mt-7">
      <div class="sticky top-0 z-20 ">
        <div class="flex flex-row items-center justify-center md:space-x-5 space-x-2 ">
          <span @click="hideSideBar()" class="material-icons md:text-3xl text-xl   cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
          <div class="font-sansation-light md:text-3xl text-xl text-center text-black   sticky top-0">GARDEN</div>
        </div>
      </div>
    </div>
    <div v-show="sideBarShow" class="bg-white md:w-52.1">
    </div> 
    <div class="text-gray-700 z-50 ">
      <div class="flex justify-center mt-7 mb-5 bg-white ">
        <div class="2xl:w-1200 w-full flex flex-row 2xl:space-x-20 lg:space-x-10 md:space-x-4 space-x-2 2xl:justify-between justify-center ">
          <div class="flex flex-row lg:space-x-3 space-x-2 2xl:ml-10 h-5 md:h-full items-center">
            <router-link to="/">
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-xl text-sm">home</span>
              </div>
            </router-link>
            <router-link to="/">
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-sm">chevron_left</span>
              </div>
            </router-link> 
            <router-link to="/">
              <div class="icon-navbar-outside">
                <span class="material-icons md:text-2xl text-sm">chevron_right</span>
              </div>
            </router-link> 
            <div class="cursor-pointer">
              <input
                type="text"
                class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-8 h-5 2xl:w-504 lg:w-64 md:w-32 w-24 md:pl-6 pl-2 font-sansation-light md:text-sm sm:text-xs text-xxs focus:outline-none focus:bg-white focus:border-violetlight"
                placeholder="Search here"
                v-model="searchName"
              />
            </div>
            <router-link to="/allsong" @click="pathPage('/allsong')" >
              <div v-bind:class="this.path=='/allsong'?'bg-blackcoal text-violetlight':'bg-neutral-100'"
                 class="flex items-center md:text-base sm:text-xs text-xxs justify-center hover:font-sansation-regular hover:text-violetlight  hover:bg-blackcoal transition duration-300 rounded-full 2xl:w-36 md:w-24 md:h-8 w-15 h-5">
                <div class="font-sansation-light" v-bind:class="this.path == '/allsong' ? '' : ''">Song</div>
              </div>
            </router-link> 
          </div>
          <div class="flex flex-row justify-center items-center font-sansation-light space-x-2 text-base w-42" v-if="authenticated">
            <div class="bg-gray-700 rounded-full appearance-none border-2 h-8 w-full px-2 text-white font-sansation-light text-sm focus:outline-none focus:border-violetlight flex items-center flex-col">
              <div class="flex flex-row items-center justify-center focus:text-violetlight hover:text-violetlight" @click="isOpen = !isOpen">
                <img src="../assets/ImgTmp1.png" class="rounded-xl mt-1 mr-1" style="width: 30px; height: 23px; object-fit: cover"/>
                {{ UserName }}
                <span class="material-icons ml-2" v-if="isOpen">expand_less</span>
                <span class="material-icons ml-2" v-else> expand_more </span>
              </div>
              <div class="text-gray-800 flex items-end flex-col w-full mt-2 bg-white" v-if="isOpen">
                <div class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1">
                  <router-link to="/accountprofile">Account</router-link>
                </div>
                <div v-if="checkRole" class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1">
                  <router-link to="/managereport">Manage Report</router-link>
                </div>
                <div v-else class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1">
                  <router-link to="/myplaylist">My playlist</router-link>
                </div>
                <div class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1" @click="signOut">
                  <p>Sign out</p>
                </div>
              </div>
            </div>
          </div>
          <router-link v-else to="/login" class="flex flex-row items-center space-x-2 font-sansation-light md:text-base text-ss md:w-28.1 w-24 ">
            <p @click="routerLogin('1')" class="cursor-pointer hover:text-violetlight transition duration-300"> Log in</p>
            <p>|</p>
            <p @click="routerLogin('2')" class="cursor-pointer hover:text-violetlight transition duration-300">Register</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      path: "",
      isOpen: false,

    };
  },
  methods: {
    pathPage(path) {
      this.path = path;
      checkRole=false;
    },
    routerLogin(active) {
      localStorage.setItem("logInActive", active);
    },

    ...mapActions({
      signOutAction: "authentication/singOut",
       hideSideBar: 'homepage/hideSideBar',
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "hometest",
        });
      });
    },

    checkRole(){
      roles.forEach(element => {
        if (element === "admin") {
            checkRole = true;
          }
      });
    }
  },

  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      UserName: "authentication/UserName",
      roles: "authentication/roles",
      sideBarShow: 'homepage/sideBarShow',
    }),
  },
};


</script>
