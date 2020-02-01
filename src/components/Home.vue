<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="6" xs="12" class="mb-2">
        <div class="text-sm-right text-center mr-1">
          <v-btn router to="/meetups" color="white" large>EXPLORE MEETUPS</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="6" xs="12" class="mb-2">
        <div class="text-sm-left text-center">
          <v-btn
            router
            to="/meetup/new"
            style="background-color: #2f3640"
            dark
            large
          >ORGANIZE MEETUPS</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="loading">
      <v-col cols="12" md="6" class="mx-auto text-center">
        <v-progress-circular class="mx-auto" :size="70" :width="7" indeterminate color="green"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-col cols="12" xs="12">
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            @click="onLoadMeetup(meetup.id)"
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="carousel-item"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("meetups/" + id);
    }
  }
};
</script>
<style scoped>
.title {
  text-align: center;
  padding: 10px 20px;
  left: 40%;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>