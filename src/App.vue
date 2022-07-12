<template>
  <!-- <div>
    <nav-bar fixedNav="fixed"></nav-bar>
  </div>
  <div class="flex row">
    <div class="flex col w-2/12 z-40 ">
      <SideBar></SideBar>
    </div>
    <div class="flex col w-10/12 " ><router-view /></div>
  </div> -->
  <nav-bar ></nav-bar>
  <router-view @music='acceptData' @musicQ='passMusicQeue'></router-view>
  <div >
    <div></div>
    
    <SideBar :music='music' :addQueue='addQueue'></SideBar>
    <!-- <div class="relative">asd</div> -->
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
export default {
  components: {
    NavBar,
    SideBar,
  },
  
  data() {
    return {
      music:null,
      addQueue:null
    };
  },
  mounted(){
    
  },
  computed:{

  },
  methods: {
    acceptData(e){
      console.log(e)
     this.music = e 
     console.log(this.music)
    },
    passMusicQeue(e){
      this.addQueue = e 
    }
  },
};
</script>
<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>