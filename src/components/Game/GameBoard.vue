<template>
    <v-card
      class="container"
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
                :items="gameThemeItems"
                @input="changeTemplate(gameTheme)"
				class="selection-container"
            >
              <template v-slot:selection="{ item }" >
                <selection :item="item" :isSelected="true" />
              </template>
              <template v-slot:item="{ item }" >
                <selection :item="item" :isSelected="false" />
              </template>
            </v-select>
          </div>

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
                @onFlip="flipThisCard(card, index)"
              />
            </div>
          </div>
        </main>
    </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import Card from "./Card.vue"
import Winning from "./Winning.vue"
import Selection from "../Basics/Selection.vue"

export default {
	name: "Home",

	components: {
		Card,
		Winning,
		Selection
	},

	data: () => ({
		gameTheme: "",
		columns: 0,
		gameThemeItems:
		[{
			text: "Default",
			icon: "fa fa-heart",
			image: ""
		},
		{
			text: "Animals",
			icon: "fa fa-dog",
			image: ""
		},
		{
			text: "House",
			icon: "fa fa-home",
			image: ""
		},
		{
			text: "Vehicles",
			icon: "fa fa-helicopter",
			image: ""
		},
		{
			text: "Disney",
			icon: "",
			image: "img/disney/mickey.png"
		},
		{
			text: "Alphabet",
			icon: "",
			image: "img/alphabet.png"
		},
		{
			text: "Harry Potter",
			icon: "",
			image: "img/harry-potter/head.png"
		},
		{
			text: "Star Wars",
			icon: "",
			image: "img/star-wars/darth-vader.png"
		}]
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

		...mapGetters(["deck", "gameUpdate"])
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
				if (this.amountCardsFlipped === 2 && this.cardsFlipped[0].name === this.cardsFlipped[1].name) {
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
				} else if (this.amountCardsFlipped === 2 && this.cardsFlipped[0].name !== this.cardsFlipped[1].name) {
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
	}

	main {
		max-width: 100vw;
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

	.deck-layout {
		display: grid;
		grid-template-columns: 40% 40%;
		max-width: 100% !important;
		padding: 0;
		overflow:hidden !important;

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

	.icon-image {
		height: 20px;
		width: 20px;
		border-radius: 3px;
		margin-right: 10px;
	}

	.v-menu__content  {
		max-height: 4500px !important;
	}
</style>
