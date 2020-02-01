<template>
  <v-dialog v-model="dialog" width="290px" class="mt-0" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" style="color: #2f3640">Edit Time</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row justify="center">
          <v-card-title primary-title>Edit Meetup Time</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-time-picker v-model="editableTime" format="24hr" color="#2f3640">
            <v-btn text color="red white--text" @click="dialog = false">Cancel</v-btn>
            <v-btn text color="#2f3640" @click="onSaveChanges">Save</v-btn>
          </v-time-picker>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editableTime: null
    };
  },
  created() {
    let date = new Date(this.meetup.date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    this.editableTime = hours + ":" + minutes;
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);

      let hours = this.editableTime.match(/^(\d+)/)[1];
      let minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetup", {
        date: newDate,
        id: this.meetup.id
      });
      this.dialog = false;
    }
  }
};
</script>
