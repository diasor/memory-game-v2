<template>
  <div id="memory-page">
    <header>
      <ul class="skip-links">
        <li>
          <a href="#main" ref="skipLink">Skip to main content</a>
        </li>
      </ul>
    </header>
    <p role="status">{{ routeAccessibilityMessage }}</p>
    <game-board />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import GameBoard from "../components/Game/GameBoard.vue"

export default {
  name: "Home",

  components: {
    GameBoard
  },

  computed: {
    ...mapState(["routeAccessibilityMessage"])
  },

  watch: {
    // watching the route changes to provide proper accessibility message
    $route: function () {
      this.$refs.skipLink.focus()
      this.announceRoute({ message: this.$route.name + " page loaded" })

      this.$nextTick(function () {
        const navLinks = this.$refs.nav
        navLinks.querySelectorAll("[aria-current]").forEach(current => {
          current.removeAttribute("aria-current")
        })

        navLinks
          .querySelectorAll(".router-link-exact-active")
          .forEach(current => {
            current.setAttribute("aria-current", "page")
          })
      })
    }
  },

  methods: {
    ...mapActions(["updateRouteAccessibilityMessage"]),

    announceRoute (message) {
      this.updateRouteAccessibilityMessage(message)
    }
  }
}
</script>

<style lang="scss" scoped>

  #memory-page {
    max-width: 100vw;
  }

  // Skip to Main
  .skip-links {
    margin: 0;
    list-style: none;
    padding: 0;
    position: absolute;
    white-space: nowrap;

    a {
      background-blend-mode: color-burn;
      display: block;
      opacity: 0;
      font-size: 1em;
      font-weight: bold;

      &:focus {
        opacity: 1;
        padding: 1em;
      }

      &:visited {
        color: white;
      }
    }
  }
</style>
