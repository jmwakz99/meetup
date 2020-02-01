<template>
  <v-dialog v-model="dialog" width="290px" class="mt-0" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" style="color: #2f3640">Edit Date</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row justify="center">
          <v-card-title primary-title>Edit Meetup Date</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-date-picker v-model="editableDate" style="width: 100%" color="#2f3640">
            <template>
              <v-btn text xs="12" color="red white--text" @click="dialog = false">Cancel</v-btn>
              <v-btn text xs="12" color="#2f3640" @click="onSaveChanges">Save</v-btn>
            </template>
          </v-date-picker>
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
      editableDate: null
    };
  },
  created() {
    let date = new Date(this.meetup.date); //set Date to the date of meetup

    let day = date.getUTCDate() - 1; // +1 cuz the days are counted from 0-30
    let month = date.getUTCMonth() + 1; // +1 cuz the months are counted from 0 to 11
    let year = date.getUTCFullYear();

    this.editableDate = year + "-" + month + "-" + day;
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetup", {
        date: newDate,
        id: this.meetup.id
      });
      this.dialog = false;
    }
  }
};
</script>
