<template>
  <div v-if="$route.path != '/login'">
    <nav-bar></nav-bar>
    <router-view @music="acceptData" @musicQ="passMusicQeue"></router-view>
    <SideBar :music="music" :addQueue="addQueue"></SideBar>
  </div>
  <div v-if="$route.path == '/login'">
    <LogIn></LogIn>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import LogIn from "./views/LogIn.vue";
export default {
  components: {
    NavBar,
    SideBar,
    LogIn,
  },

  data() {
    return {
      music: null,
      addQueue: null,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    acceptData(e) {
      this.music = e;
    },
    passMusicQeue(e) {
      this.addQueue = e;
    },
  },
};
</script>
<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
