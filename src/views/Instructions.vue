<template>
    <main class="instructions-container" id="main" tabindex="-1" aria-labelledby="instructionsTitle">
      <v-card flat>
        <v-card-title id="instructionsTitle">Instructions</v-card-title>
        <v-divider class="ma-0"></v-divider>
        <v-card-text>
          <div class="instructions-subtitle">Playing is very simple. Rules: </div>

          <v-list flat>
              <v-list-item
                v-for="(instruction, index) in instructions"
                :key="index"
              >
                <v-list-item-icon>
                  <v-icon v-text="instruction.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content >{{instruction.text }}</v-list-item-content>
              </v-list-item>
          </v-list>

          <v-list>
            <v-list-item>
              <v-list-item-content
                v-for="(score, index) in scores"
                :key="index"
              >
                <v-list-item-title>Scoring</v-list-item-title>
                <v-list-item-subtitle>
                  {{score.value}}
                      <v-icon
                        center
                        color="#827717"
                      >
                        fa-star
                      </v-icon>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

      </v-card>
    </main>
</template>

<script>
export default {
  name: "Instructions",

  data () {
    return {
      instructions: [
        { text: "Click on a card to flip it over.", icon: "fas fa-hand-pointer" },
        { text: "If the two cards match, they will remain flipped.", icon: "fas fa-equals" },
        { text: "If they don't match, they will be turned over.", icon: "fas fa-not-equal" },
        { text: "Remember what was on each card and where it was.", icon: "fas fa-lightbulb" },
        { text: "The game is over when all the cards have been matched.", icon: "fas fa-user-check" },
        { text: "Every flipped card counts as a move.", icon: "far fa-thumbs-up" }
      ],

      scores: [
        { value: 3, description: "Win with 30 moves or less" },
        { value: 2, description: "Win with 40 moves or less" },
        { value: 1, description: "Win with 50 moves or less" }
      ]
    }
  }
}
</script>

<style lang="scss" >
  .instructions-container {
    width: 80vw;
    max-width: 600px;
    margin: auto;
  }

  .instructions-subtitle {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.87);
  }
</style>
