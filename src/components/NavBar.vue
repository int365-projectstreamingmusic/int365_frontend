<template>
  <!-- bg-gray-100  -->
  <div class="ml-75 text-gray-700 sticky top-0 z-50 h-full">
    <div class="flex justify-center pt-8 pb-5 bg-white">
      <div class="w-1200 flex flex-row space-x-24">
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
          class="flex flex-row justify-center items-center font-sansation-light space-x-2 text-base w-42"
          v-if="authenticated"
        >
          <router-link
            to="/managereport"
            class="flex flex-row space-x-2 cursor-pointer hover:text-violetlight transition duration-300"
          >
            <div class="flex justify-center items-center">
              <span class="material-icons flex justify-center items-center">
                account_circle
              </span>
            </div>
            <div class="flex justify-center items-center">
              {{ UserName }}
            </div>
          </router-link>

          <p>|</p>

          <span
            @click="signOut"
            class="cursor-pointer hover:text-violetlight transition duration-300 material-icons flex justify-center items-center"
          >
            logout
          </span>
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
    };
  },
  methods: {
    pathPage(path) {
      this.path = path;
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
};
</script>
