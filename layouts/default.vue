<template>
  <v-app>
    <header class="top-header">
      <NuxtLink to="/">Home</NuxtLink>
    </header>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.theme--dark.v-application{
  background: rgb(228, 228, 228);
  color: rgb(58, 58, 58);
}

.top-header{
  background: rgb(196, 196, 196);
}
</style>
