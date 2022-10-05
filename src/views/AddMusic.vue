<template>
  <div class="h-screen"  :class="sideBarShow ?'lg:ml-75':''" >
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">Add Music</div>
          <!-- <form @submit.prevent="addImage"> -->
            
          <!-- </form> -->
          <label for="input-audio" class="font-sansation-light">
            <p>upload music</p>
            <input id="input-audio" type="file" class="hidden" accept="audio/*" @change="handleFileUpload( $event )"/>
          </label>
          <audio id="audio-preview" controls v-show="file != ''"/>
          <label for="input-image" class="font-sansation-light">
            <p>upload image</p>
            <input id="input-image" type='file' class="hidden" accept="image/*" @change="handleImageUpload( $event );" />
          </label>  
          <img id="image-preview" alt="your image" v-show="image != ''" class="md:w-44.5 md:h-52.5 w-36 h-40 rounded-3xl object-cover" />
        </div> 
      </div> 
    </div> 
  </div> 
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      file:'',
      image:''
    }
  },
  methods:{
    ...mapActions({
        hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
        handleView: 'homepage/handleView',
    }),
    handleImageUpload( event ){
      this.image = event.target.files[0]
      this.previewImage();
      console.log(this.image)
    },
    previewImage(){
      let pic = document.getElementById('image-preview');
      let reader = new FileReader();
      reader.readAsDataURL( this.image );
      reader.addEventListener('load', function(){
        pic.src = reader.result;
      });
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
      this.previewAudio();
    },
    previewAudio(){
      let audio = document.getElementById('audio-preview');
      let reader = new FileReader();
      reader.readAsDataURL( this.file );
      reader.addEventListener('load', function(){
        audio.src = reader.result;
      });
    }
  },
  computed: {
    ...mapGetters({
        sideBarShow: 'homepage/sideBarShow',
        mobile: 'homepage/mobile',
        logo: 'homepage/logo', 
        smView: 'homepage/smView'
    })
  },
  async created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
 }
}
</script>

<style>

</style>

