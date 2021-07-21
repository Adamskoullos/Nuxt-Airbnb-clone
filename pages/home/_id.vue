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
      <v-row>
          <v-col>
              <div v-for="review in reviews" :key="review.objectID">
                  <img :src="review.reviewer.image" alt="person">
                  <h6>{{ review.reviewer.name }}</h6>
                  <h6>{{ formateDate(review.date) }}</h6>
                  <h6>{{ review.comment }}</h6>
              </div>
          </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
      this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
  },
  async asyncData({ params, $dataApi }) {
      const homeResponse = await $dataApi.getHome(params.id);
      const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
    return{ home: homeResponse, reviews: reviewResponse.hits }
  },
  methods: {
    formateDate(dateStr){
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { 
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'  
      });
    }
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
