<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col class="text-center">
        <v-card>
          <v-card-text>
            <v-card-title color="red--text">UserId: {{user.id}}</v-card-title>

            <v-row no-gutters>
              <v-col class="mx-auto" cols="12" xs="12" sm="12" md="6">
                <v-list dense>
                  <v-subheader style="color: #2f3640">REGISTERED MEETUPS</v-subheader>
                  <v-list-item-group
                    color="primary"
                    v-for="profile in user.registeredMeetups"
                    :key="profile"
                    class="mb-8"
                  >
                    <v-list-item @click="goToMeetup(profile)">
                      <v-avatar size="60">
                        <v-img :src="meetup(profile).imageUrl"></v-img>
                      </v-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="mb-3">Title: {{meetup(profile).title}}</v-list-item-title>
                        <v-list-item-title>Description: {{meetup(profile).description}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    meetup() {
      return this.$store.getters.loadedMeetup;
    }
  },
  methods: {
    goToMeetup(profile) {
      this.$router.push("/meetups/" + profile);
    }
  }
};
</script>