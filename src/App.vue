<template>
  <v-app>
    <!-- Navigation for small screens  -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list dense>
        <v-list-item
          link
          v-for="navigationItem in navigationItems"
          :key="navigationItem.title"
          router
          :to="navigationItem.link"
        >
          <v-list-item-action>
            <v-icon>{{ navigationItem.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ navigationItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserAuthenticated">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Navigation for big screens  -->
    <v-app-bar app color="white--text" style="background-color: #2f3640">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up white--text" />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">MEETUPS</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          text
          router
          :to="navigationItem.link"
          class="hidden-sm-and-down white--text"
          v-for="navigationItem in navigationItems"
          :key="navigationItem.title"
        >
          <v-icon left>{{ navigationItem.icon }}</v-icon>
          {{ navigationItem.title }}
        </v-btn>
        <v-btn
          v-if=" isUserAuthenticated"
          text
          @click="onLogout"
          class="hidden-sm-and-down white--text"
        >
          <v-icon left>mdi-exit-to-app</v-icon>Logout
        </v-btn>
      </div>
    </v-app-bar>
    <main class="mt-10">
      <router-view class="mt-6"></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    // This will open and close the drawer
    drawer: null
    // Dynamic Navigation
  }),
  computed: {
    navigationItems() {
      let menuItems = [];
      if (this.isUserAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor",
            title: "View Meetups",
            link: "/meetups"
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetups",
            link: "/meetup/new"
          },
          {
            icon: "mdi-account",
            title: "Profile",
            link: "/profile"
          }
        ];
      } else {
        menuItems = [
          { icon: "mdi-face", title: "Sign Up", link: "/signup" },
          { icon: "mdi-lock", title: "Sign In", link: "/signin" }
        ];
      }
      return menuItems;
    },
    isUserAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped></style>
