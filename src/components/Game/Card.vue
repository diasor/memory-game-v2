<template>
  <section>
    <button
      aria-describedby="gameUpdate"
      :aria-label="[ card.flipped ? card.name + ' flipped' : 'card ' + (index + 1)]"
      :class="cardClass"
      @click="flipCard()"
      :disabled="card.match"
    >
      <div v-if="!card.flipped" class="card" :style="cssBackCard" />
      <div v-else-if="card.icon !== null" :class="card.icon"></div>
      <div v-else-if="card.useText" class="card__text">{{card.img }}</div>
      <div v-else :class="[ extended ? 'card__svg-extended': 'card__svg']">
        <img v-if="card.img" :src="imageSource" />
      </div>
    </button>
  </section>
</template>

<script>
export default {
  name: "Card",

  props: {
    card: {
      type: Object,
      default: () => {}
    },

    index: {
      type: Number,
      required: true
    },

    extended: {
      type: Boolean,
      required: false
    }
  },

  data: () => ({
    cssBackCard: {
      backgroundBlendMode: "overlay",
      backgroundImage: `url(${require("@/assets/img/joker2.png")}), linear-gradient(to bottom, #424242, #B2DFDB)`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
  }),

  computed: {
    imageSource () {
      return this.card.img ? require(`../../assets/${this.card.img}`) : ""
    },

    cardClass () {
      const extendedClass = this.extended ? "card__extended" : ""
      if (this.card.match) {
        return `card ${extendedClass} match`
      } else if (this.card.flipped) {
        return `card ${extendedClass} show`
      } else if (this.card.close) {
        return `card ${extendedClass} close`
      } else {
        return `card ${extendedClass}`
      }
    }
  },

  methods: {
    flipCard () {
      this.$emit("onFlip")
    }
  }
}
</script>

<style lang="scss" scoped>
  $icon-size: 50px;
  $card-small-size: 90px;
  $card-image-medium-size: 112px;
  $card-size: 125px;
  $icon-background-color: #00695C;

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $card-small-size;
    width: $card-small-size;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
    &:focus {
      outline: none;
    }

    @media screen and (min-width: 450px) {
      height: $card-size;
      width: $card-size;
    }

    &__text {
      font-family: 'Carter One', cursive;
      font-size: 60px;
      color: whitesmoke;
    }

    &__svg {
      height: $card-small-size;
      width: $card-small-size;
      padding: 0;
      border-radius: 0.5rem;
      background-color: white !important;
      margin: 0;
      padding: 0;

      @media screen and (min-width: 450px) {
          height: $card-size;
          width: $card-size;
      }

      > img {
        height: $card-small-size;
        width: $card-small-size;
        padding: 0.3rem;
        border-radius: 0.5rem;

        @media screen and (min-width: 450px) {
          height: $card-size;
          width: $card-size;
        }
      }
    }

    &__extended {
      height: $card-small-size;
      width: $card-small-size;

      @media screen and (min-width: 450px) {
          height: $card-image-medium-size;
          width: $card-image-medium-size;
      }
    }

    &__svg-extended {
      height: $card-image-medium-size;
      width: $card-image-medium-size;
      padding: 0;
      border-radius: 0.5rem;

      > img {
        height: $card-image-medium-size;
        width: $card-image-medium-size;
        margin: 0;
        padding: 0;
        border-radius: 0.5rem;

        @media screen and (min-width: 450px) {
          height: $card-size;
          width: $card-size;
        }
      }
    }
  }

  .show {
    font-size: $icon-size;
    background-blend-mode: soft-light;
    background:  $icon-background-color url(/img/fabric.5959b418.png);
  }

  .match {
    font-size: $icon-size;
    background-blend-mode: soft-light;
    background:  $icon-background-color url(/img/fabric.5959b418.png);
    animation-name: match-animation;
    -webkit-animation-name: match-animation;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    transform-origin: 70% 70%;
    animation-iteration-count: 1000ms;
    animation-timing-function: linear;
  }

  .close {
    cursor: default;
    animation-name: close;
    -webkit-animation-name: close;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    &:hover,
    &:focus {
      background-blend-mode: hard-light;
      color: $icon-background-color;
      border: 2px solid $icon-background-color;
    }
  }

  @keyframes match-animation {
    0%,
    100% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.9);
    }
  }

  @keyframes close {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
  }
</style>
