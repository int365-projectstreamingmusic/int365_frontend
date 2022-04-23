<template>
  <div class="z-0">
    <div class="carousel-inner items-center overflow-hidden w-full ">
      <div v-for="(img, i) in images" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`" class="carousel-item w-full h-44 sm:h-80 transform transition-all duration-500 ease-in-out">
        <img class="block w-full items-center " :src="img"  />

      </div>
    </div>
  </div>
</template>
<script>
   export default {
  
  data() {
    return {
       images: [
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c1f6eff2-2254-4eb2-b962-057fb6c27464/ddv7db7-81f4a1b3-4b99-433a-b655-1ef813b9ac18.jpg/v1/fill/w_1280,h_800,q_75,strp/cute_anime_girl_wallpaper_by_fatemagister_ddv7db7-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvYzFmNmVmZjItMjI1NC00ZWIyLWI5NjItMDU3ZmI2YzI3NDY0XC9kZHY3ZGI3LTgxZjRhMWIzLTRiOTktNDMzYS1iNjU1LTFlZjgxM2I5YWMxOC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Gg9xr2F-txwtyjAlg7Vdb21lmgLzDmVM16FO3Jg7tTs",
      "https://wallpaperaccess.com/full/6295757.jpg",
      "https://c4.wallpaperflare.com/wallpaper/84/515/763/iu-k-pop-wallpaper-preview.jpg",
      "https://wallup.net/wp-content/uploads/2017/05/29/279853-K-pop-G-Dragon-BIGBANG-Asian-748x421.png",
      "https://www.brighttv.co.th/wp-content/uploads/2020/11/%E0%B8%A8%E0%B8%B4%E0%B8%A5%E0%B8%9B%E0%B8%B4%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2.png",
      "https://2.bp.blogspot.com/-13xL4o2oHw0/V9IegIZiMyI/AAAAAAAA-5c/UUz1nt5TmFYTsVV12nGzxrcIyuLA0EB2QCLcB/s1600/11.jpg",
      "https://www.livetracklist.com/wp-content/uploads/the-chainsmokers-closer-pic.jpg"
      
    ],
    active: 0
    };
  },
 mounted() {
    let i = 0;
    setInterval(() => {
      if (i > this.images.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 3000);
  }
  }
</script>

<style>
.carousel-item {
    float: left;
    position: relative;
    display: block;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
  }
  .carousel-item.active {
    left: 0;
  }
</style>
