<template>
  <div
    id="congratulations"
    class="win-container"
    :aria-labelledby="winningMessage"
    aria-label="Congratulations! You have won!"
  >
      <h2 tabindex="-1">Congratulations!</h2>
      <ul class="stars" :aria-label="stars + ' stars left'">
        <li v-for="(star, index) in stars" :key="index">
          <v-icon
            center
            color="#827717"
          >
            fa-star
          </v-icon>
        </li>
      </ul>
      <p
        id="winningMsg"
        aria-label="Congratulations! You have won!"
        >{{ winningMessage }}
      </p>
      <v-btn
        color="#827717"
        @click="playAgain"
        >
        <span class="button-class">Play again!</span>
        <v-icon
          right
          dark
          color="white"
        >
          fa-play
        </v-icon>
      </v-btn>
    </div>
</template>

<script>
import Vue from "vue"
import { mapState, mapGetters } from "vuex"
import VueConfetti from "vue-confetti"
Vue.use(VueConfetti)

export default {
  name: "Winning",

  computed: {
    ...mapState(["stars", "templateName"]),
    ...mapGetters(["winningMessage"])
  },

  methods: {
    startConfetti () {
      this.$confetti.start()
    },

    stopConfetti () {
      this.$confetti.stop()
    },

    playAgain () {
      this.$emit("onPlayAgain")
    }
  },

  mounted () {
    this.startConfetti()
  },

  beforeDestroy () {
    this.stopConfetti()
  }
}
</script>

<style lang="scss">
  /* if you win */
  .win-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 0.8rem 0;
    padding: 0 0 0.5rem 0;

    > h2 {
      font-weight: bold;
      font-size: 30px;
      color: #827717 !important;
      border: none !important;
    }

  // .win {
  //   text-align: center;
  //   padding: auto;
  //   margin: auto;

    .stars {
      display: inline-block;
      margin: 0.5rem 5px 0 0;
      padding: 0;

      > li {
        list-style: none;
        display: inline-block;
      }
    }

    > p {
      padding: 0.2em;
    }

    .button-class {
      color: #ffffff;
      cursor: pointer;
    }
  }
</style>
