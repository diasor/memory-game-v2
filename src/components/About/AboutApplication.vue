<template>
  <v-card flat>
    <v-card-text>
      This application was originally cloned from <a href="https://github.com/mlama007/Vue-Memory-Game" target="_blank">
      this</a> application presented on the Amsterdam Vue conference 2019.
      At that talk I was really impressed with the speaker's approach towars accessibility and vue. How that
      issue was(is) extremely important and how we can approach it within Vue applications.
      So I cloned the code and I checked it out. After playing with it for a while, I made several improvements
      to it, and this application is the result of that.

      <v-card-title>Theme extension</v-card-title>
      <v-card-text>With this application you can still play the original memory game, where
        the user attempts to find matches between two cards.

        Furthermore, this application was expanded so not only can the user play with the default icon game,
        but also there are several themes defined, kind of like card decks. There are currently 5:
          <ul>
            <li> - Default theme (with font awesome icons)</li>
            <li> - Animals theme (with font awesome animal icons)</li>
            <li> - Furniture theme (with font awesome furniture icons)</li>
            <li> - Disney theme (with Disney images)</li>
            <li> - Harry Potter theme (with Harry Potter images)</li>
            <li> - Harry Potter extended theme (with many more Harry Potter images)</li>
        </ul>

        This for once, made it more interesting (at least for my kids to play).
      </v-card-text>

      <v-card-title>Accessibility</v-card-title>
      <v-card-text>
        First of all, in order to make use the applications's accessibility feature, the user needs to have a screen reader.
        It can be simply a Chrome (or any navigator) pluggin. I used ChromeVox or the ScreenReader pluggin, and it worked
        like a charme.

        By using this, the user can hear the results of his/her actions on the screen.
        I also made several improvements in terms of how the accessibility information was being handled.
      </v-card-text>

      <v-card-title>Winning</v-card-title>
      <v-card-text>
        I added some confetti animations and details to be displayed when the user wins.
      </v-card-text>

      <v-card-title>Other improvements</v-card-title>
      <v-card-text>
        I really enjoyed working on this application so I changed a lot of things. Here are a few of them:
        <ul>
          <li><b>State:</b> added Vuex to handle the state of the game, the decks, the score, etc.
            Particularly, I made a better use of the state management by redefining the state into: the accessibility properties,
            the game fields properties and the new template properties.
             This allows for a clearer overview and should the application grow, it will also simplify the process of separating
             these properties into different Vuex modules.
          </li>
          <li><b>Separation of concerns:</b> shipped the logic to the actions and make a bit more explicit use of the the
            Vuex commits. This also cleans the components code, and provides future resusability of the functions
            defined as action. I also added the GameBoard component that allowed me to clean up the Home and separate
            what was Card and the Winning component, from the rest.
          </li>
          <li><b>Modules:</b> organized code into modules. For instance, I converted the "Card" into a new component, including it's logic,
            it's scss, it's state and it's actions.
          </li>
          <li><b>Vuetify:</b> added Vuetify to make it more visually nice and cleaned up the styles. I also made it
            fully responsive.
          </li>
          <li><b>About:</b> added this About section, with some insights both into the application as well as some details
          about myself.</li>
      </ul>
      </v-card-text>

      <v-card-title>Tools & technologies</v-card-title>
      <v-list>
        <v-item-group multiple>
          <v-list-item>
            <v-item>
              <v-chip class="mr-2">Vue</v-chip>
            </v-item>
            <v-item>
              <v-chip class="mr-2">Vuex</v-chip>
            </v-item>
            <v-item>
              <v-chip class="mr-2">Vue Router</v-chip>
            </v-item>
            <v-item>
              <v-chip class="mr-2">Vuetify</v-chip>
            </v-item>
            <v-item>
              <v-chip class="mr-2">Accessibility (ARIA)</v-chip>
            </v-item>
          </v-list-item>
        </v-item-group>
      </v-list>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "AboutApplication"
}
</script>
