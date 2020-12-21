<template>
    <v-card
      min-width="800"
      class="ma-2 pl-10 pr-10 pb-2 pt-2"
      aria-label="Memory Game Board"
    >
        <p role="status" v-if="gameAccessibilityMessage">
            <b>Accessibilty Text:</b>
            {{ gameAccessibilityMessage }}
        </p>

        <winning
          v-if="win"
          @onPlayAgain="onPlayAgain"
        />

        <main
          id="main"
          class="container"
          tabindex="-1"
        >
            <v-select
                id="selection"
                v-model="gameTheme"
                aria-label="Theme selection"
                name="theme"
                label="Select Theme"
                :autofocus="true"
                :chips="true"
                solo
                :items="gameThemeOptions"
                @change="changeTemplate(gameTheme)"
            />
        <section aria-label="Memory Game Board" id="cards">
            <v-layout wrap row align-content-center  class="pa-1 deck-layout">
                <v-flex
                    xs6 sm4 md3 lg2
                    v-for="(card, index) in this.deck.cards"
                    :key="index"
                    :aria-label="[card.flipped ? card.name : '']"
                    class="deck-cards"
                >
                    <Card
                        :card="card"
                        :index="index"
                        :extended="extended"
                        @onFlip="flipThisCard(card, index)"
                    />
                </v-flex>
            </v-layout>
        </section>
        </main>
    </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import Card from "./Card.vue"
import Winning from "./Winning.vue"

export default {
  name: "Home",
  components: {
    Card,
    Winning
  },

  data: () => ({
    gameTheme: "",
    columns: 0,
    gameThemeOptions: ["Default", "Animals", "Furniture", "Disney", "Harry Potter", "Harry Potter Extended"]
  }),

  computed: {
    ...mapState([
      "gameAccessibilityMessage",
      "win",
      "stars",
      "cardsFlipped",
      "amountCardsFlipped",
      "amountMoves",
      "cardsMatched"
    ]),

    ...mapGetters(["deck", "gameUpdate"]),
    extended () {
      return this.deck.cards.length > 16
    }
  },

  methods: {
    ...mapActions([
      "updateAmountMoves",
      "updateCardsFlipped",
      "resetCardsFlipped",
      "shuffle",
      "flipCard",
      "closeCard",
      "markMatchedCards",
      "newGame",
      "updateAccessibilityMessage",
      "updateWin",
      "updateStars",
      "getTemplate"
    ]),

    flipThisCard (card, index) {
      if (card.flipped) {
        this.updateAccessibilityMessage({ message: "Card already flipped." })
        return
      } else {
        this.updateAmountMoves({ moves: this.amountMoves + 1 })
        this.updateStars()
      }
      // only allow flips if there are < or = 2 flipped cards
      if (this.amountCardsFlipped < 2) {
        if (this.amountCardsFlipped < 1) {
          this.updateAccessibilityMessage({ message: `${card.name} flipped.` })
        }
        this.flipCard({ index, flipped: true })
        this.updateCardsFlipped({ cards: card })
        // was there a match?
        if (
          this.amountCardsFlipped === 2 &&
          this.cardsFlipped[0].name === this.cardsFlipped[1].name
        ) {
          // there is a match
          this.markMatchedCards({ cardName: card.name })
          const remaining = this.deck.cards.length / 2 - this.cardsMatched
          this.updateAccessibilityMessage({
            message: `${card.name} flipped. Match found! ${remaining} matches left.`
          })

          // reset flipped cards
          this.resetCardsFlipped({ cards: this.cardsFlipped })
          if (this.cardsMatched === this.deck.cards.length / 2) {
            // if number of cards matched = number or cards, then win the game
            this.updateWin({ win: true })
            this.updateAccessibilityMessage({ message: this.winningMessage })
          }
        } else if (
          this.amountCardsFlipped === 2 &&
          this.cardsFlipped[0].name !== this.cardsFlipped[1].name
        ) {
          // if there was not match, wait before closing mismatched card
          this.updateAccessibilityMessage({
            message: `${card.name} flipped. No match. `
          })
          setTimeout(() => {
            for (let i = 0; i < this.deck.cards.length; i++) {
              if (this.deck.cards[i].flipped && !this.deck.cards[i].match) {
                this.closeCard({ index: i, flipped: false, close: true })
              }
            }
            this.resetCardsFlipped()
          }, 900)
        }
      }
    },

    changeTemplate (newTheme) {
      this.gameTheme = newTheme
      // get thee new theme information
      this.getTemplate(newTheme)
      // reset values
      this.newGame()
      // shuffle a new deck
      this.shuffle()
    },

    onPlayAgain () {
      this.changeTemplate("Default")
    }
  },

  created () {
    this.changeTemplate("Default")
  }
}
</script>

<style lang="scss" scoped>
    .deck-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        max-width: 90vw !important;

        @media (min-width: 600px) {
            padding: 1rem;
            max-width: 90vw !important;
        }

        @media (min-width: 1200px) {
            max-width: 70vw !important;
        }
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        max-width: 100vw;
        margin: 0;
        padding: 0;
    }

    .deck-cards {
        padding: 0;
        margin: 0.5rem 0;

        @media (min-width: 600px) {
            margin: 0 1rem 2rem 1rem !important;
        }
    }

    [role='status'] {
      height: 0;
      margin: 0;
      overflow: hidden;
      font-weight: bold;
    }
</style>
