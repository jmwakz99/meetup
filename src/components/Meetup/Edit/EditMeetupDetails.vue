<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300px">
      <template v-slot:activator="{ on }">
        <v-btn fab v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title primary-title>Edit Meetup</v-card-title>

        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="12">
              <v-text-field v-model="editedTitle" label="Title" id="title" name="title"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="12">
              <v-textarea
                v-model="editedDescription"
                label="Description"
                id="description"
                name="description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onSaveChanges() {
      this.$store.dispatch("updateMeetup", {
        title: this.editedTitle,
        description: this.editedDescription,
        id: this.meetup.id
      });
      this.dialog = false;
    }
  }
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 57px;
  padding: 20px;
  left: 40%;
  font-size: 2em;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
@media (max-width: 780px) {
  .title {
    left: 20%;
  }
}
@media (min-width: 412px) {
  .title {
    left: 30%;
  }
}
@media (min-width: 600px) {
  .title {
    left: 35%;
  }
}
@media (min-width: 768px) {
  .title {
    left: 40%;
  }
}
</style>