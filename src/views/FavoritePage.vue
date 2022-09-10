<template>
  <div class="pl-80">
    <h1>FAV</h1>
  </div>
</template>
<script>
import {useRoute} from 'vue-router'
export default {
    emits: ['path'],
    mounted(){
    const route=useRoute();
    this.$emit('path',route.path)
    console.log(this.$route.name)
  },
}
</script>