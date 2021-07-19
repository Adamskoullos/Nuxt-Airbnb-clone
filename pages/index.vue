<template>
  <v-row align="center" class="homes-container">
      <HomeCard v-for="home in homes" :key="home.objectID" :home="home"/>
  </v-row>
</template>

<script>
import homes from '@/data/homes.json';

  export default {
    data(){
      return{
        homes: homes.slice(0,3)
      }
    },
    head(){
      return{
          title: 'Home Page',
          meta: [{
              name: 'description', 
          }]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>