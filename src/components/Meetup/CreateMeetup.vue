<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="mx-auto" cols="12" xs="12" md="6">
        <h2 class="grey--text">Create New Meetup</h2>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-text-field v-model="title" label="Title" id="title" name="title"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-text-field v-model="location" label="Location" id="location" name="location"></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-btn
                class="white--text"
                style="background-color: #2f3640"
                @click="onPickFile"
              >Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <img :src="imageUrl" height="150px" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-textarea
                v-model="description"
                label="Description"
                id="description"
                name="description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <h2 class="grey--text">Add Date & Time</h2>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-date-picker color="#2f3640" v-model="date"></v-date-picker>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-time-picker color="#2f3640" v-model="time" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col cols="12" xs="12" md="6" class="mx-auto">
              <v-btn
                type="submit"
                style="background-color: #2f3640"
                class="white--text"
                :disabled="!isFormValid"
              >Create Meetup</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null
    };
  },
  computed: {
    isFormValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== "" &&
        this.date !== "" &&
        this.time !== ""
      );
    },
    submittableDateTime(isFormValid) {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        let minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours);
        date.setMinutes(this.time.getMinutes);
      }

      return date;
    }
  },

  methods: {
    onCreateMeetup() {
      if (!this.isFormValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
