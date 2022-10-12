<template>
  <div class="h-screen"  :class="sideBarShow ?'lg:ml-75':''" >
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div class="2xl:w-1200 xgl:w-962 lg:mx-10 md:w-698 sm:w-466 w-80 mt-3 my-6 space-y-3">
          <div class="font-sansation-light xgl:text-2xl md:text-xl text-lg">upload music</div>
          <img v-show="image == ''" src="../assets/user_icon.png" class="md:w-44.5 md:h-52.5 w-36 h-40 rounded-3xl object-cover"/>
          <img id="image-preview" alt="your image" v-show="image != ''"  />
          <label for="input-image" class="font-sansation-light">
            <p>upload image</p>
            <input id="input-image" type='file' class="hidden" accept="image/*" @change="handleImageUpload( $event );" />
          </label>  
          

          <!-- <form @submit.prevent="addImage"> -->
            <form @submit.prevent="">
              <div class="my-2">
              <p class="text-md my-2 mx-5">Username</p>
              <input
                v-model="logform.userName"
                type="text"
                name="userName"
                placeholder="USERNAME OR EMAIL "
                required
                class="w-full h-12 pl-6 cursor-pointer transition duration-200 rounded-md hover-focus-input focus:border-violetlight border-2 text-xs md:text-base"
                :class="
                  this.invalid.duplicated.showErrorBox ? 'border-red-500' : 'focus:border-violetlight'
                "
              />
            </div>
            </form>
          <!-- </form> -->
          <label for="input-audio" class="font-sansation-light">
            <p>upload music</p>
            <input id="input-audio" type="file" class="hidden" accept="audio/*" @change="handleFileUpload( $event )"/>
          </label>
          <audio id="audio-preview" controls v-show="file != ''"/>
         
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

