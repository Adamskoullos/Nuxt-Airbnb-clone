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
    };
  },
  data() {
    return {
      home: {}
    };
  },
  methods: {
  },
  mounted() {
      this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
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
