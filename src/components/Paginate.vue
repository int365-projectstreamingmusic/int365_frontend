<template>
  <div class="flex flex-row justify-center items-center font-sansation-light space-x-4 mb-10">
    <div v-if="min<=0" class="icon-navbar-outside-prevent">
      <span class="material-icons text-gray-300 md:text-2xl text-lg">chevron_left</span>
    </div>
    <div v-else @click="previous()" class="icon-navbar-outside">
      <span class="material-icons md:text-2xl text-lg">chevron_left</span>
    </div>
    <div v-for="(page) in totalPages.slice(min,max)" :key="page">
      <p @click="page == currentPage ? '':selectPage(page)" :class="currentPage == page ?'page-number-outside-current':'page-number-outside'">{{page}}</p>
    </div>
    <div v-if="max>=(totalItems/itemsPerPage) || max == 0" class="icon-navbar-outside-prevent">
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
    totalItems:{type:Number,required:false},
    itemsPerPage:{type:Number,required:true},
    sizePage:{type:Number,required:false},
    maxPagesShow:{type:Number,required:true},
  },
  watch: { 
    totalItems: function(newVal) { 
      this.addPage()
    },
    sizePage: function(newVal){
      this.addSize(newVal)
    }
  },
  data() {
    return {
      totalPages: [],
      currentPage: 1,
      min: 0,
      max: 0,
      url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
    }
  },
  methods:{
    ...mapActions({
      handleView: 'homepage/handleView',
    }),
    selectPage(page){
      this.currentPage = page
      this.$emit('pageNum',page)
    },
    next(){
      if((this.max) < (this.totalItems/this.itemsPerPage) ){
        this.min = this.min+this.maxPagesShow
        this.max = this.max+this.maxPagesShow      
      }else{      
      }
    },
    previous(){
      if((this.min) > 0 ){
        this.min = this.min-this.maxPagesShow
        this.max = this.max-this.maxPagesShow       
      }else{       
      }
    },
    addSize(p){
      this.max = p
    },
    addPage(){
      for (let i = 0; i < (this.totalItems/this.itemsPerPage); i++) {
        this.totalPages[i] = i+1
      }
    }
  },
  created(){
    this.addPage()
    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
}
</script>

<style>

</style>