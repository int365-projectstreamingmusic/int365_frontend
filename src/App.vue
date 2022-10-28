<template>
  <div>
    <nav-bar @music="acceptData"></nav-bar>
    <router-view @music="acceptData" @playlist="acceptArr" @musicQ="passMusicQeue"></router-view>
    <SideBar :music="music" :playlist="playlist" :addQueue="addQueue"></SideBar>
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
      playlist: null,
      addQueue: null,
    };
  },
  mounted() { },
  computed: {},
  methods: {
    acceptArr(e) {
      this.playlist = e;
    },
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
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
