<template>
  <div class="h-screen w-full mt-16">
    <SlideShow class="w-full"></SlideShow>
    <div class="flex flex-row w-full ">
      <div class="flex-col w-4/6 h-96">
        <ShowListMusic class="w-full"></ShowListMusic>
      </div>
      <div class="flex-col  w-2/6 h-96">
      <MusicSelect></MusicSelect></div>
    </div>
    <div class="flex-co w-full  h-auto">
      <ShowPlayList></ShowPlayList>
    </div>
  </div>
</template>

<script>
import SlideShow from "../components/SlideShow.vue";
import ShowListMusic from "../components/ShowListMusic.vue";
import ShowPlayList from "../components/ShowPlayList.vue";
import MusicSelect from "../components/MusicSelect.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    SlideShow,
    ShowListMusic,
    ShowPlayList,
    MusicSelect,
  },
};
</script>
