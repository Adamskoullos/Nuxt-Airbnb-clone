<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="home-images">
          <img
            v-for="image in home.images"
            :key="image"
            :src="image"
            alt="image"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="home-details">
          <p>{{ home.title }}</p>
          <p>$ {{ home.pricePerNight }} / night</p>
          <span
            ><img src="/images/marker.svg" alt="marker" />{{
              home.location.address
            }}</span
          >
          <span
            ><img src="/images/star.svg" alt="star" />{{
              home.reviewValue
            }}</span
          >
          <p>
            {{ home.guests }} guests, {{ home.bedrooms }} rooms,
            {{ home.beds }} beds, {{ home.bathrooms }} bathrooms
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="goog-map" ref="map"></div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import homes from "@/data/homes.json";

export default {
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOb6nm5BzKbLfwbH8nzCWvj9IIjqsQjAc&libraries=places&callback=initMap",
          hid: "map",
          async: true,
          skip: process.client && window.mapLoaded
        },
        {
          innerHTML: "window.initMap = function(){ window.mapLoaded = true }",
          hid: "map-init"
        }
      ]
    };
  },
  data() {
    return {
      home: {}
    };
  },
  methods: {
    showMap() {
      const mapOptions = {
        zoom: 18,
        center: new window.google.maps.LatLng(
          this.home._geoloc.lat,
          this.home._geoloc.lng
        ),
        disableDefaultUI: true,
        zoomControl: true
      };
      const map = new window.google.maps.Map(this.$refs.map, mapOptions);
      const position = new window.google.maps.LatLng(
        this.home._geoloc.lat,
        this.home._geoloc.lng
      );
      const marker = new window.google.maps.Marker({ position });
      marker.setMap(map);
    }
  },
  mounted() {
    const timer = setInterval(() => {
      if (window.mapLoaded) {
        clearInterval(timer);
        this.showMap();
      }
    }, 200);
  },
  created() {
    const home = homes.find(item => {
      return item.objectID == this.$route.params.id;
    });
    this.home = home;
  }
};
</script>

<style lang="scss" scoped>
.home-images {
  img {
    width: 200px;
  }
}
.home-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 15px;
    margin-right: 10px;
  }
  p {
    text-align: center;
    margin: auto;
  }
}
.goog-map {
  height: 800px;
  width: 800px;
}
</style>
