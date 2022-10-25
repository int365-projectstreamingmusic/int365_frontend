<template>
  <div class="h-screen" :class="sideBarShow ?'lg:ml-75':''">
    <div class="flex flex-col w-full">
      <div class="flex justify-center h-full">
        <div>
          <div class="2xl:w-1200 xgl:w-962 md:w-698 sm:w-466 w-80 mt-3 space-y-5">
            <!-- head -->
            <div class="flex sm:flex-row flex-col justify-between space-y-3">
              <div class="flex flex-row space-x-3 font-sansation-light text-blackcoal items-end">
                <!-- <div class="cursor-pointer">All Reports</div>
                <div >|</div> -->
                <div @click="getReportCommend()" :class="reportComment ?'font-sansation-bold md:text-2xl text-lg text-violetdark':'md:text-base text-sm'" class=" cursor-pointer">Report Comment</div>
                <div >|</div>
                <div @click="getReportLicense()" :class="reportLicense ?'font-sansation-bold md:text-2xl text-lg text-violetdark':'md:text-base text-sm'" class="cursor-pointer">Report License</div>
              </div>
              <div class="flex flex-row items-center font-sansation-light space-x-4 md:text-base text-ss">
                <!-- รอเปลี่ยนเป็น v-for -->
                <select class="rounded-lg bg-neutral-100 md:w-48 w-36 h-6 text-center" >
                  <option value="" disabled selected class="hidden ">- Select your filter -</option>
                  <option >Counted: min > max</option>
                  <option >Counted: max > min</option>
                  <option >Latest</option>
                </select>                
              </div>
            </div>
            <!-- head -->
            <!-- body -->
            <div v-if="reportComment" class="bg-neutral-50 rounded-lg font-sansation-light py-5 sm:px-10 px-5 space-y-4 md:text-base text-sm">
              <div>
                <div class="flex flex-row justify-between">
                  <div>Owner : Bossza</div>
                  <div>Created : 14/08/2565</div>
                </div>
                <div>
                  Comment  :  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tincidunt cursus neque nascetur sit velit etiam rutrum. Amet, purus donec lectus semper molestie amet vitae scelerisque sit. Facilisi facilisis nisl lacus eu pharetra ultrices ipsum ipsum orci.
                </div>
                <div>Reported Count  : 133</div>
              </div>
              <div class="flex flex-row justify-end  md:space-x-5 space-x-2 font-sansation-regular ">
                <div class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-deletered text-white text-center">delete</div>
                <div class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-passgreen text-white text-center">pass</div>
              </div>
            </div>
            <div v-if="reportLicense" class="bg-neutral-50 rounded-lg font-sansation-light py-5  px-5 space-y-4 md:text-base text-sm">
              <div class="flex md:flex-row flex-col md:space-x-5 space-x-0 md:space-y-0 space-y-5">
                <div class="space-y-5 flex flex-col ">
                  <img :src="pic" class="md:w-32 w-full h-32 rounded-2xl" style=" object-fit: cover;"/>                
                  <div class="cursor-pointer text-sm w-32 h-6 flex items-center justify-center rounded-lg bg-violetdark text-white text-center">play music</div>
                </div>
                <div>
                  <div class="flex md:flex-row flex-col justify-between">
                    <div>Name Music : Bossza</div>
                    <div>Created : 14/08/2565</div>
                  </div>
                  <div>Owner Music : Bossza</div>
                  <div >
                    Copyright Infringement Details  :  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tincidunt cursus neque nascetur sit velit etiam rutrum. Amet, purus donec lectus semper molestie amet vitae scelerisque sit. Facilisi facilisis nisl lacus eu pharetra ultrices ipsum ipsum orci.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis tincidunt cursus neque nascetur sit velit etiam rutrum. Amet, purus donec lectus semper molestie amet vitae scelerisque sit. Facilisi facilisis nisl lacus eu pharetra ultrices ipsum ipsum orci.
                  </div>
                  <div>Reported Count  : 133</div>
                </div>
              </div>
              <!-- <div class="flex flex-row justify-between"> -->
                <!-- <div class="cursor-pointer text-sm w-32 h-6 flex items-center justify-center rounded-lg bg-violetdark text-white text-center">play music</div> -->
                <div class="flex flex-row justify-end md:space-x-5 space-x-2  font-sansation-regular ">
                  <div class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-deletered text-white text-center">delete</div>
                  <div class="cursor-pointer text-sm sm:w-24 w-20 h-6 flex items-center justify-center rounded-lg bg-passgreen text-white text-center">pass</div>
                </div>
              <!-- </div> -->
            </div>
            <!-- body -->
          </div>
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
      pic:require('../assets/948523.png')
    }
  },
  methods:{
    ...mapActions({
      hideSideBar: 'homepage/hideSideBar', // map `this.hideSideBar()` to `this.$store.dispatch('homepage/hideSideBar')`
      handleView: 'homepage/handleView',
      getReportCommend: 'managereport/getReportCommend',
      getReportLicense: 'managereport/getReportLicense',
    }),
  },
  computed: {
    ...mapGetters({
      sideBarShow: 'homepage/sideBarShow',
      mobile: 'homepage/mobile',
      logo: 'homepage/logo', 
      smView: 'homepage/smView',
      reportComment: 'managereport/reportComment',
      reportLicense: 'managereport/reportLicense'
    })
  },
  async created() {
    this.handleView();
    this.getReportCommend();
    window.addEventListener("resize", this.handleView);
 }
}
</script>
<style>
    
</style>  