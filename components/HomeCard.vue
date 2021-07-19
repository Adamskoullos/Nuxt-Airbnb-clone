<template>
    <v-col cols="12">
        <NuxtLink :to="`/home/${home.objectID}`"><img :src="home.images[0]" alt="cabin" class="cabin"></NuxtLink>
        <h3>{{ home.title }}</h3>
        <h6>{{ home.location.address }}</h6>
        <h6>{{ home.guests }}: Guests</h6>
        <h6>{{ home.pricePerNight }} /night</h6>
    </v-col>
</template>

<script>
    
    export default {
        props: ['home'],
    }
</script>

<style lang="scss" scoped>
 img.cabin{
   width: 200px;
 }

 div.row.homes-container{
   .col{
     flex:1;
     display: flex;
     flex-direction: column;
     align-items: center;
   }
 }
</style>