<template>
  <v-container>
    <v-row no-gutters v-if="loading">
      <v-col cols="12" md="6" class="mx-auto text-center">
        <v-progress-circular class="mx-auto" :size="70" :width="7" indeterminate color="green"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ meetup.title }}
            <template>
              <v-spacer></v-spacer>
              <app-edit-details v-if="isUserCreator" :meetup="meetup"></app-edit-details>
            </template>
          </v-card-title>

          <v-img height="400px" :src="meetup.imageUrl"></v-img>
          <v-card-subtitle>
            <h4>{{ meetup.date | date }} - {{ meetup.location }}</h4>
            <div>
              <v-row no-gutters>
                <v-col cols="4" md="2" xs="4" sm="2" class="mr-4">
                  <app-edit-date v-if="isUserCreator" :meetup="meetup"></app-edit-date>
                </v-col>
                <v-col cols="4" md="2" xs="4" sm="2" class="ml-3">
                  <app-edit-time v-if="isUserCreator" :meetup="meetup"></app-edit-time>
                </v-col>
              </v-row>
            </div>

            <div>{{ meetup.description }}</div>
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup :meetupId="meetup.id" v-if="isUserAuthenticated && !isUserCreator"></app-register-meetup>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isUserAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    isUserCreator() {
      if (!this.isUserAuthenticated) {
        return;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    }
  }
};
</script>