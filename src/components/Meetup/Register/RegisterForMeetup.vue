<template>
  <div class="mb-2 mt-1">
    <v-dialog v-model="dialog" width="350px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="green--text">{{isMeetupRegistered ? 'Unregister' : 'Register'}}</v-btn>
      </template>

      <v-card>
        <v-card-title primary-title v-if="isMeetupRegistered">Unregister from the meetup?</v-card-title>
        <v-card-title primary-title v-else>Register for the meetup?</v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="12">You can always change your decision later on</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn xs="12" color="red white--text" @click="dialog = false">Cancel</v-btn>
          <v-btn xs="12" color="green white--text" @click="onAgree">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    isMeetupRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetup => {
          return meetup === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.isMeetupRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }

      this.dialog = false;
    }
  }
};
</script>
