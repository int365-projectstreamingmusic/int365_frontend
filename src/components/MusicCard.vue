<template>
  <div class="overflow-hidden md:w-44.5 md:h-52.5 w-36 h-40 rounded-3xl  flex flex-row  items-end cursor-pointer shadow-xl" @mouseover="upHere = true" @mouseleave="upHere = false">
    <transition name="fade">
    <div v-if="!upHere" class=" absolute flex flex-row justify-center items-center text-shadow-2xl text-center z-10 md:w-44.5 w-36 bg-blackcoal bg-opacity-60 md:h-16 h-12 text-white rounded-b-3xl">
      <div class="space-y-1 mx-6 mb-1">
        <div v-if="musicDes && musicDes.trackName" class=" md:w-40 w-28 font-sansation-light text-sm tracking-wider truncate">{{musicDes.trackName}}</div>
        <div v-if="musicDes && musicDes.artistTracks[0]" class="font-sansation-light md:text-xxs text-mxs tracking-wider">{{musicDes.artistTracks[0].artistsModel.artistName}}</div>     
      </div>
    </div>
    <div v-else class="absolute md:w-44.5 md:h-52.5 w-36 h-40 bg-blackcoal bg-opacity-60 z-10 flex flex-row justify-center items-center rounded-3xl">
      <div @click="addReportTrack(musicDes)" class="absolute top-4 right-4 w-5 h-5 rounded-sm  select-none active:text-violet-800 flex transition duration-500 items-center justify-center">
          <span class="material-icons text-white hover:text-violet-500  hover:shadow-2xl transition duration-500">report</span>
      </div>
      <div class="space-y-2 md:w-36 w-28">
        <div class="text-white ">
          <div v-if="musicDes && musicDes.trackName" class="font-sansation-light text-sm tracking-wider truncate">{{musicDes.trackName}}</div>
          <div v-if="musicDes && musicDes.artistTracks[0]" class="font-sansation-light text-xxs tracking-wider">{{musicDes.artistTracks[0].artistsModel.artistName}}</div>          
        </div>
        <div class="flex flex-row  items-center" :class="authenticated?'justify-between':'justify-center'">   
          <span v-if="authenticated" @click="passAddOrDelFavorite(musicDes)" :class="musicDes.favorite?'text-yellow-400 hover:text-white' : 'text-white hover:text-yellow-400'" class="material-icons md:text-3xl text-2xl  transition duration-500">grade</span>
          <div @click="passMusic(musicDes)" class=" cursor-pointer text-white md:w-12 md:h-12 w-10 h-10 item-center bg-blackcoal rounded-full shadow-lg hover:bg-white hover:text-violetlight transition duration-500 ">
              <span class="material-icons md:text-4xl text-3xl">play_arrow</span>
          </div> 
          <span v-if="authenticated" @click="passAddOrDelPlayground(musicDes)" :class="musicDes.playground?'text-yellow-400 hover:text-white' : 'text-white hover:text-yellow-400'" class="material-icons md:text-3xl text-2xl transition duration-500">playlist_add</span>   
        </div> 
      </div>
    </div>
    </transition>   
    <img :src="url+'api/streaming/image/'+musicDes.trackThumbnail" v-bind:class="upHere?'transition delay-95 duration-700 scale-125 md:w-52 md:h-52.5 w-36 h-40':'md:w-52 md:h-52.5 w-36 h-40'" style="object-fit: cover;"/>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  props:{
    musicDes: {type:Object, required: true},
  },
  computed: {
    ...mapGetters({
      authenticated: "authentication/authenticated",
      token: "authentication/token"
    })
  },
  data() {
    return {
      upHere : false,
      url:`${process.env.VUE_APP_MY_ENV_VARIABLE}`
    }
  },
  methods:{
    ...mapActions({
      addReport: 'oneplaylist/addReport', 
    }),
    addReportTrack(data){
      this.addReport({
        reportMsg: 'This music copyright infringement',
        reportGroupId: 0,
        reportTitle: '',
        reportType: 1001,
        targetRef: data.id
      })
    },
    passAddOrDelPlayground(e){
      this.$emit('passAddOrDelPlayground',e)
    },
    passAddOrDelFavorite(e){
      this.$emit('passAddOrDelFavorite',e)
    },
    passMusic(e){
     this.$emit('music',{trackFile:e.trackFile,trackThumbnail:e.trackThumbnail,trackName:e.trackName})
    },
  }
} 
</script>
