<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col class="home-images">
                    <img v-for="image in home.images" :key="image" :src="image" alt="image">
                </v-col>
            </v-row>
            <v-row>
                <v-col class="home-details">
                    <p>{{ home.title }}</p>
                    <p>$ {{ home.pricePerNight }} / night</p>
                    <span><img src="/images/marker.svg" alt="marker">{{ home.location.address }}</span>
                    <span><img src="/images/star.svg" alt="star">{{ home.reviewValue }}</span>
                    <p>{{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bathrooms</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="goog-map" ref="map">

                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import homes from '@/data/homes.json';

    export default {
        head(){
            return{
                title: this.home.title,
                script: [{src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOb6nm5BzKbLfwbH8nzCWvj9IIjqsQjAc&libraries=places"}],
                hid: "map",
                defer: true,
            }
        },
        data(){
            return {
                home: {}
            }
        },
        mounted(){
            const mapOptions = {
                zoom: 18,
                center: window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
            }
            const map = new window.google.maps.Map(this.$refs.map, mapOptions);
        },
        created(){
            const home = homes.find(item =>{
                return item.objectID == this.$route.params.id
            });
            this.home = home;  
        },
    }
</script>

<style lang="scss" scoped>
.home-images{
    img{
        width: 200px;
    }
}
.home-details{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 15px;
        margin-right: 10px;
    }
    p{
        text-align: center;
        margin: auto;
    }
}
.goog-map{
    height: 800px;
    width: 800px;
}
</style>