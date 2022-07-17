<template>
  <div class="playlist pl-80">
    <div @click="passMusic()">Playasd</div>
  </div>
  <div class="playlist pl-80">
    <div @click="passMusicQeue()">playQueue</div>
  </div>
</template>
<script>
export default {
  emits: ['music','musicQ'],
  methods:{
    passMusic(){
     this.$emit('music',{name:'audio1.mp3',image:'sadasd'})
    },
    passMusicQeue(){
     this.$emit('musicQ',{name:'audio1.mp3',image:'sadasd'})
    },
  },
}
</script>