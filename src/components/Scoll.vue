<template>
  <div class="Scoll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Scoll",
  data(){
    return {
      // bscorll:null
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
/*---隐藏滚动条-----*/
::-webkit-scrollbar {
  display: none;
}

.Scoll {
  width: 100%;
  height: 100%;
  /*border-radius: 0 0 0 10px;*/
  overflow: scroll;
  /* background: #42b983; */
}
</style>