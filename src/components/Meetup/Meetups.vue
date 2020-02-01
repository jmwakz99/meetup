<template>
  <v-container>
    <v-row no-gutters v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-col cols="12" md="10" class="mx-auto">
        <v-card style="background-color: #2f3640">
          <v-row no-gutters>
            <v-col cols="12" xs="5" sm="6" md="4">
              <v-img height="150px" :src="meetup.imageUrl"></v-img>
            </v-col>
            <v-col cols="12" xs="7" sm="6" md="8">
              <v-card-title>
                <div class="white--text">
                  <h4>{{ meetup.title }}</h4>
                  <div>{{ meetup.date | date }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn text class="white--text" :to="'meetups/' + meetup.id">
                  <v-icon left>mdi-arrow-right</v-icon>View Meetup
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>
