<template>
  <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 mb-10">
    <div v-if="min<=0" class="icon-navbar-outside-prevent">
      <span class="material-icons text-gray-300 md:text-2xl text-lg">chevron_left</span>
    </div>
    <div v-else @click="previous()" class="icon-navbar-outside">
      <span class="material-icons md:text-2xl text-lg">chevron_left</span>
    </div>
    <div v-for="(page) in totalPages.slice(min,max)" :key="page">
      <p @click="selectPage(page)" :class="currentPage == page ?'page-number-outside-current':'page-number-outside'">{{page}}</p>
    </div>
    <div v-if="max>=(totalItems/itemsPerPage)" class="icon-navbar-outside-prevent">
      <span class="material-icons text-gray-300 md:text-2xl text-lg">chevron_right</span>
    </div>
    <div v-else @click="next()" class="icon-navbar-outside">
      <span class="material-icons md:text-2xl text-lg">chevron_right</span>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  props:{
    totalItems:{type:Number,required:true},
    itemsPerPage:{type:Number,required:true},
    maxPagesShow:{type:Number,required:true},
  },
  data() {
    return {
      totalPages: [],
      currentPage: 1,
      min: 0,
      max: this.maxPagesShow,
      url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
    }
  },
  methods:{
    ...mapActions({
      handleView: 'homepage/handleView',
    }),
    selectPage(page){
      console.log(page)
      this.currentPage = page
    },
    next(){
      if((this.max) < (this.totalItems/this.itemsPerPage) ){
        this.min = this.min+this.maxPagesShow
        this.max = this.max+this.maxPagesShow      
      }else{
        console.log(this.max)         
      }
    },
    previous(){
      if((this.min) > 0 ){
        this.min = this.min-this.maxPagesShow
        this.max = this.max-this.maxPagesShow       
      }else{
        console.log(this.min)         
      }
    }
  },
  created(){
    for (let i = 0; i < (this.totalItems/this.itemsPerPage); i++) {
      this.totalPages[i] = i+1
    }
    console.log(this.totalPages)
    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
}
</script>

<style>

</style>