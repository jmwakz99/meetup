<template>
  <v-container>
    <v-row no-gutters v-if="error">
      <v-col cols="12" md="6" class="mx-auto">
        <alert-app :text="error" @dismissed="onClear"></alert-app>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-container>
            <form @submit.prevent="onSignUp">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    label="Mail"
                    type="email"
                    v-model="email"
                    id="email"
                    name="email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                    name="password"
                    id="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    label="Confirm Password"
                    type="password"
                    v-model="confirmPassword"
                    :rules="[comparePassword]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-btn
                    type="submit"
                    class="white--text"
                    large
                    :loading="loading"
                    :disabled="loading"
                    style="background-color: #2f3640"
                  >
                    Sign up
                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                  <span class="ml-3">OR</span>
                  <v-btn
                    text
                    to="/signin"
                    style="background-color: #2f3640"
                    class="white--text ml-3"
                  >Signin</v-btn>
                </v-col>
              </v-row>
            </form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "Password did not match!"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      if (this.password !== this.confirmPassword) {
        return;
      }
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onClear() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
