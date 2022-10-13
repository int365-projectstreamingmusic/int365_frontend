<template>
  <div  class="flex flex-col sticky top-0 z-50 bg-white  justify-center items-center">
    <div class="flex flex-row">
      <div v-show="!sideBarShow" class="2xl:w-75 z-50 bg-white md:mr-10 mr-2  mb-5 mt-7 h-9 flex flex-row items-center">
        <div class="sticky top-0 z-20 ">
          <div class="flex flex-row items-center justify-center md:space-x-5 space-x-2 ">
            <span @click="hideSideBar()" class="material-icons md:text-3xl text-2xl   cursor-pointer hover:text-violetdark transition delay-75 select-none">menu</span>
            <div v-show="!logo" class="font-sansation-light md:text-3xl text-xl text-center text-black   sticky top-0">GARDEN</div>
          </div>
        </div>
      </div>
      <!-- <div v-show="sideBarShow" class="bg-white md:w-52.1 ">
      </div>  -->
      <div class="text-gray-700 z-50 mt-7 mb-5 h-9 flex flex-row items-center" :class="sideBarShow ?'2xl:ml-75 lg:ml-64':''">
        <div class="flex justify-center bg-white 2xl:w-1200">
          <div class=" w-full flex flex-row 2xl:space-x-20 lg:space-x-10 md:space-x-4 sm:space-x-2 space-x-2 2xl:justify-between justify-center ">
            <div class="flex flex-row lg:space-x-3 sm:space-x-2 space-x-1  h-5 md:h-full items-center">
              <router-link to="/">
                <div class="icon-navbar-outside">
                  <span class="material-icons md:text-xl sm:text-sm text-xs">home</span>
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
              <input
                  type="text"
                  class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 md:h-8 h-5 2xl:w-504 lg:w-64 md:w-32 sm:w-24 w-20 md:pl-6 sm:pl-2 pl-1 font-sansation-light md:text-sm text-xxs  focus:outline-none focus:bg-white focus:border-violetlight"
                  placeholder="Search"
                  v-model="searchName"
              />
              <router-link to="/allsong" @click="pathPage('/allsong')" >
                <div v-bind:class="this.path=='/allsong'?'bg-blackcoal text-violetlight':'bg-neutral-100'"
                  class="flex items-center md:text-base sm:text-xs text-xxs justify-center hover:font-sansation-regular hover:text-violetlight  hover:bg-blackcoal transition duration-300 rounded-full 2xl:w-36 md:w-24 md:h-8 sm:w-15 w-11 h-5">
                  <div class="font-sansation-light" v-bind:class="this.path == '/allsong' ? '' : ''">Song</div>
                </div>
              </router-link> 
            </div>
            <!-- ยังไม่ได้ทำ responsive -->   
            <div class="select-none font-sansation-light  lg:w-56 md:w-40 w-24 cursor-pointer " v-if="authenticated">
              <div class="bg-gray-700 rounded-full md:h-9 h-5  text-white font-sansation-light text-sm flex flex-col">
                <div class="flex flex-row items-center justify-between sm:px-2 px-1 md:mt-1 space-x-1 focus:text-violetlight hover:text-violetlight" @click="isOpen = !isOpen" >
                  <img  src="../assets/ImgTmp1.png" class="rounded-xl md:h-6 md:w-6  w-3 h-3"  style="object-fit: cover"/>
                  <p class="lg:w-32 sm:w-20 w-15 truncate md:text-base sm:text-xs text-mxs">{{ UserName }}</p>
                  <span class="material-icons md:text-lg text-sm" v-if="isOpen">expand_less</span>
                  <span class="material-icons md:text-lg text-sm" v-else> expand_more </span>
                </div>
                <div class="text-gray-800 flex items-end md:text-base text-mxs flex-col w-full md:mt-2 mt-1 bg-white  rounded-xl border-2 border-gray-100"  v-if="isOpen">
                  <div class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/accountprofile">Account</router-link>
                  </div>
                  <div v-if="checkRole" class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/managereport">Manage Report</router-link>
                  </div>
                  <div class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right">
                    <router-link to="/myplaylist">My playlist</router-link>
                  </div>
                  <div class="font-sansation-regular hover:text-violetdark hover:underline underline-offset-1 py-1 rounded-xl hover:bg-slate-100 w-full pr-4 text-right" @click="signOut">
                    <p>Sign out</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- ยังไม่ได้ทำ responsive -->
            <router-link v-else to="/login" class="flex flex-row items-center sm:space-x-2 font-sansation-light md:text-base sm:text-ss text-xs md:w-28.1   w-24 space-x-1">
              <p @click="routerLogin('1')" class="cursor-pointer hover:text-violetlight transition duration-300"> Log in</p>
              <p>|</p>
              <p @click="routerLogin('2')" class="cursor-pointer hover:text-violetlight transition duration-300">Register</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="found" class="text-gray-700 z-50 mt-2 mb-5 flex flex-col items-center 2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 h-full " :class="sideBarShow ?'2xl:ml-75 lg:ml-64':''">
      <div class="flex flex-col justify-center bg-white 2xl:w-1200 w-full mb-3 space-y-2 sm:pl-3.5">
        <div class="font-sansation-bold md:text-2xl text-xl text-blackcoal">Found " Angel With a short gun  "</div>
        <div class="flex flex-col justify-center h-32 space-y-2 overflow-y-scroll ">
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52   truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52    truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52    truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52    truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52    truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        <div class="sm:h-7 h-5 flex flex-row items-center justify-between lg:text-base sm:text-sm text-xxs ">
          <div class="flex flex-row space-x-2 mr-2 hover:text-violetdark cursor-pointer transition duration-200 items-center">
            <span class="material-icons md:text-sm text-xs text-blackcoal">radio_button_unchecked</span>
            <div class="sm:w-10 w-5 text-center">1.</div>
            <p class="2xl:w-800 xgl:w-504 xl:w-100 w-52    truncate ">ฝนตกไหม - Three Man Down |Lyric Video|</p>                
          </div>
          <div class="md:w-20 sm:w-15 w-10 text-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer sm:h-6 h-4 flex items-center justify-center">play</div>
        </div>
        </div>
      </div>
      <div class="flex flex-row bg-white 2xl:w-1200 sm:space-x-3 space-x-1 w-full">
        <div class="space-x-1 sm:w-32 w-20 sm:h-6 h-5 text-center lg:text-base sm:text-sm text-xxs items-center justify-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
          <span class="material-icons md:text-sm text-xxs text-blackcoal">radio_button_unchecked</span>
          <div>playground</div>
        </div>
        <div class="space-x-1 sm:w-24 w-16 sm:h-6 h-5 text-center lg:text-base sm:text-sm text-xxs items-center justify-center bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
          <span class="material-icons md:text-sm text-xxs text-blackcoal">radio_button_unchecked</span>
          <div>favorite</div>
        </div>
        <div class="flex flex-row items-center sm:h-6 h-5 font-sansation-light space-x-4 ">
          <select class="rounded-full bg-neutral-100 md:w-36 sm:w-22 w-17 h-6 text-center lg:text-base sm:text-sm text-xxs" >
            <option value="" disabled selected class="hidden ">My Playlist</option>
            <option >Counted: min > max</option>
            <option >Counted: max > min</option>
            <option >Latest</option>
          </select>                
        </div>
        <div class="md:w-20 sm:w-15 w-10 sm:h-6 h-5 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
          add
        </div>
        <div class="md:w-20 sm:w-17 w-13 sm:h-6 h-5 text-center items-center justify-center lg:text-base sm:text-sm text-xxs  bg-violet-500 font-sansation-light text-white rounded-full cursor-pointer flex flex-row">
        cancel
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
      logo: 'homepage/logo',
      smView: 'homepage/smView',
      found: 'search/found'
    }),
  },
};


</script>
