<template>
  <!-- bg-gray-100  -->
  <div class="ml-75 text-gray-700 sticky top-0 z-50 h-full">
    <div class="flex justify-center pt-8 pb-5 bg-white">
      <div class="w-1200 flex flex-row space-x-20">
        <div class="flex flex-row space-x-3">
          <div>
            <router-link to="/">
              <button>
                <div class="icon-navbar-outside">
                  <span class="material-icons text-xl">home</span>
                </div>
              </button>
            </router-link>
          </div>
          <div>
            <button>
              <div class="icon-navbar-outside">
                <span class="material-icons text-2xl">chevron_left</span>
              </div>
            </button>
          </div>
          <div>
            <button>
              <div class="icon-navbar-outside">
                <span class="material-icons text-2xl">chevron_right</span>
              </div>
            </button>
          </div>
          <div class="cursor-pointer">
            <input
              type="text"
              class="bg-neutral-100 rounded-full appearance-none border-2 border-gray-100 h-8 w-504 pl-6 font-sansation-light text-sm focus:outline-none focus:bg-white focus:border-violetlight"
              placeholder="Search music name, album, artist ... "
              v-model="searchName"
            />
          </div>
          <div>
            <button>
              <div
                class="flex items-center bg-neutral-100 text-base justify-center hover:font-sansation-regular hover:text-violetlight hover:bg-blackcoal transition duration-300 rounded-full w-36 h-8"
              >
                <p class="font-sansation-light">Streaming</p>
              </div>
            </button>
          </div>
          <div>
            <router-link to="/allsong" @click="pathPage('/allsong')">
              <button>
                <div
                  v-bind:class="
                    this.path == '/allsong'
                      ? 'bg-blackcoal text-violetlight'
                      : 'bg-neutral-100'
                  "
                  class="flex items-center text-base justify-center hover:font-sansation-regular hover:text-violetlight hover:bg-blackcoal transition duration-300 rounded-full w-36 h-8"
                >
                  <p
                    class="font-sansation-light"
                    v-bind:class="this.path == '/allsong' ? '' : ''"
                  >
                    Song
                  </p>
                </div>
              </button>
            </router-link>
          </div>
        </div>

        <div
          class="flex flex-row justify-center cursor-pointer items-center font-sansation-light space-x-2 text-base w-42"
          v-if="authenticated"
        >
          <div
            class="bg-gray-700 rounded-full appearance-none border-2 h-8 w-full px-2 text-white font-sansation-light text-sm focus:outline-none focus:border-violetlight flex items-center flex-col"
          >
            <div
              class="flex flex-row items-center justify-center focus:text-violetlight hover:text-violetlight"
              @click="isOpen = !isOpen"
            >
              <img
                src="../assets/ImgTmp1.png"
                class="rounded-xl mt-1 mr-1"
                style="width: 30px; height: 23px; object-fit: cover"
              />
              {{ UserName }}
              <span class="material-icons ml-2" v-if="isOpen">
                expand_less
              </span>
              <span class="material-icons ml-2" v-else> expand_more </span>
            </div>
            <div
              class="text-gray-800 flex items-end flex-col w-full mt-2 bg-white"
              v-if="isOpen"
            >
              <div
                class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1"
              >
                <router-link to="/accountprofile">Account</router-link>
              </div>
              <div
                v-if="checkRole"
                class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1"
              >
                <router-link to="/managereport">Manage Report</router-link>
              </div>
              <div
                v-else
                class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1"
              >
                <router-link to="/myplaylist">My playlist</router-link>
              </div>

              <div
                class="font-sansation-regular hover:text-violetlight hover:underline underline-offset-1"
                @click="signOut"
              >
                <p>Sign out</p>
              </div>
            </div>
          </div>
        </div>

        <router-link
          v-else
          to="/login"
          class="flex flex-row items-center space-x-2 font-sansation-light text-base w-28.1"
        >
          <p
            @click="routerLogin('1')"
            class="cursor-pointer hover:text-violetlight transition duration-300"
          >
            Log in
          </p>
          <p>|</p>
          <p
            @click="routerLogin('2')"
            class="cursor-pointer hover:text-violetlight transition duration-300"
          >
            Register
          </p>
        </router-link>
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
      checkRole = false;
    },
    routerLogin(active) {
      localStorage.setItem("logInActive", active);
    },

    ...mapActions({
      signOutAction: "authentication/singOut",
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "hometest",
        });
      });
    },
  },

  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      UserName: "authentication/UserName",
      roles: "authentication/roles",
    }),
  },
  checkRole() {
    roles.forEach((element) => {
      console.log(element);
      if (element === "admin") {
        checkRole = true;
      }
    });
  },
};
</script>
