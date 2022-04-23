<template>
  <div>
    <nav-bar fixedNav="fixed"></nav-bar>
  </div>
  <div class="flex row">
    <div class="flex col w-2/12 z-40">
      <SideBar fixedNav="fixed"></SideBar>
    </div>
    <div class="flex col w-10/12 "><router-view /></div>
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
    return {};
  },
  methods: {},
};
</script>
