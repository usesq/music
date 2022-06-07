<template>
  <Scoll :key="new Date().getTime()" class="gundong">
    <Gequ :momsan='$store.state.SosJg'></Gequ>
  </Scoll>
</template>

<script>

import Scoll from "@/components/Scoll";

import Gequ from '@/views/Song_d_list/Ge_qu'

export default {
  components: {
    Scoll,
    Gequ
  },
  data(){
    return {
      hois:1
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
.gundong{
  height: 650px;
  background: rgba(15, 44, 88, 0.192);
  border-radius: 0 0 10px 0;
}
</style>