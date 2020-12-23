<template>
    <v-card
      class="container"
      min-width="800"
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
          tabindex="-1"
        >
          <div class="select-container">
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
          </div>

          <!-- <div class="deck-container"> -->
            <div class="deck-layout">
              <div
                v-for="(card, index) in this.deck.cards"
                 :key="index"
                class="deck-cards"
              >
                <Card
                  :aria-label="[card.flipped ? card.name : '']"
                  :card="card"
                  :index="index"
                  :extended="extended"
                  @onFlip="flipThisCard(card, index)"
                />
              </div>
            </div>
          <!-- </div> -->
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

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100vw;
  }

  main {
    // display: flex;
    // flex-direction: column;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  .select-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: auto;
  }

  // .deck-container {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   // width: 100%;
  //   margin: auto;
  //   background-color: peru;
  // }

  .deck-layout {
    display: grid;
    grid-template-columns: 40% 40%;
    width: 100vw;
    margin: auto;
    padding: auto;

      @media screen and (min-width: 450px) {
          margin: auto;
          padding: 0;
          width: 75vw !important;
      }

      @media screen and (min-width: 600px) {
          grid-template-columns: 30% 30% 30%;
          margin: auto;
          padding: 0;
      }

      @media screen and (min-width: 900px) {
          grid-template-columns: 25% 25% 25% 250%;
          margin: auto ;
          padding: 0 1rem;
      }
  }

  .deck-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 150px;
    padding: 0;
    margin: 1rem;

    @media screen and (min-width: 720px) {
        margin: 1rem 0;
        padding: 0;
    }

    @media screen and (min-width: 900px) {
        margin: 0 1rem 2rem 1rem;
    }
  }

  [role='status'] {
    height: 0;
    margin: 0;
    overflow: hidden;
    font-weight: bold;
  }
</style>
