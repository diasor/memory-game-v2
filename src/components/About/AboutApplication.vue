<template>
	<v-card class="about-container">
		<v-card-text>
			This application offers a memory game where the user can find card matches through the randomly
			displayed cards. What it is interesting about it, is that it also offers WAI-ARIA accessibility
			that reads to the user the progress of the game. <br /><br />

			It was originally cloned from <a href="https://github.com/mlama007/Vue-Memory-Game" target="_blank">
			this</a> application presented on the Amsterdam Vue conference 2019.
			At that talk I was really impressed with the speaker's approach towars accessibility and vue. How that
			issue was(is) extremely important and how we can approach it within Vue applications.
			So I cloned the code and I checked it out. After playing with it for a while, I made several improvements
			to it and this application is the result of that.
		</v-card-text>

		<v-card-title>Theme extension</v-card-title>
		<v-card-text>
			With this application you can still play the original memory game, where
			the user attempts to find matches between two cards.

			Furthermore, this application was expanded so not only can the user play with the default icon game,
			but also there are several themes defined, kind of like card decks. There are currently 5:
			<ul>
				<li> <b>Default theme</b> (with font awesome icons)</li>
				<li> <b>Animals theme</b> (with font awesome animal icons)</li>
				<li> <b>House theme</b> (with font awesome household icons)</li>
				<li> <b>Vehicles theme</b> (with font awesome vehicle icons)</li>
				<li> <b>Disney theme</b> (with Disney images)</li>
				<li> <b>Harry Potter theme</b> (with Harry Potter images)</li>
				<li> <b>Alphabet</b> (the system generates 3 sets of different cuts of the alphabet ramdomically)</li>
				<li> <b>Star Wars theme</b> (with Star Wars images)</li>
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
				<li>
					<b>State:</b> added Vuex to handle the state of the game, the decks, the score, etc.
					Particularly, I made a better use of the state management by redefining the state into: the accessibility properties,
					the game fields properties and the new template properties.
					This allows for a clearer overview and should the application grow, it will also simplify the process of separating
					these properties into different Vuex modules.
				</li>
				<li>
					<b>Separation of concerns:</b> shipped the logic to the actions and make a bit more explicit use of the the
					Vuex commits. This also cleans the components code, and provides future resusability of the functions
					defined as action. I also added the GameBoard component that allowed me to clean up the Home and separate
					what was Card and the Winning component, from the rest.
				</li>
				<li>
					<b>Modules:</b> organized code into modules. For instance, I converted the "Card" into a new component, including it's logic,
					it's scss, it's state and it's actions.
				</li>
				<li>
					<b>Vuetify:</b> added Vuetify to make it more visually nice and cleaned up the styles. I also made it
					fully responsive.
				</li>
				<li>
					<b>About:</b> added this About section, with some insights both into the application as well as some details
					about myself.
				</li>
			</ul>
		</v-card-text>

		<v-card-title>Tools & technologies</v-card-title>
		<v-card-text>
			<v-chip-group column>
				<v-chip>Vue</v-chip>
				<v-chip>Vuex</v-chip>
				<v-chip>Vue Router</v-chip>
				<v-chip>Vuetify</v-chip>
				<v-chip>Accessibility (ARIA)</v-chip>
			</v-chip-group>
		</v-card-text>

		<v-card-title>This game in action </v-card-title>
		<v-card-text pb-0>
			Here I leave some images of how the game actually looks like (in case you don't want to play to 
			see it through).
		</v-card-text>
		<v-card-subtitle mt-0 ml-0>Theme Selection</v-card-subtitle>
		<v-card-text>
			First of all, the application offers a dropdown list where the user user can choose the theme 
			you want to play with. This selection list shows the name of the theme but also an icon. 
			This was done thinking of the user experience. Particularly, my 5 year old son loves to play with it, 
			and the icon helps him select the theme by himself.
			<div class="theme-container">
				<img :src="themeImage" class="theme-image" />
			</div>
		</v-card-text>
		<v-carousel class="carousel-container" height="100%">  
			<v-carousel-item
				v-for="(result,i) in resultsContent"
				:key="i"
				reverse-transition="fade-transition"
				transition="fade-transition"
			>
				<about-results :result="result" />
			</v-carousel-item>
		</v-carousel>
	</v-card>
</template>

<script>
import AboutResults from "./AboutResults.vue"

export default {
	name: "AboutApplication",

	components: {
		AboutResults
	},

	computed: {
		themeImage () {
			return require("../../assets/img/results/theme-selection.png")
		},

        resultsContent () {
			return [
				{
					title: "Full Deck",
					text: `When the user opens the application a full page is presented with a set of face-down cards
						that look like this:`,
					image: require("../../assets/img/results/full-deck.png")
				},
				{
					title: "Default theme selection",
					text: `By default the application selects the "Default" theme with several different icons to play with.
						If the user plays with this one and wins, the application will look like this:`,
					image: require("../../assets/img/results/default-win.png")
				},
				{
					title: "Disney theme selection",
					text: "If the user selects the Disney theme and wins, the application will look like this:",
					image: require("../../assets/img/results/disney-win.png")
				},
				{
					title: "Harry Potter theme selection",
					text: "If the user selects the Harry Potter theme and wins, the application will look like this:",
					image: require("../../assets/img/results/harry-potter-win.png")
				},
				{
					title: "Star Wars theme selection",
					text: "If the user selects the Star Wars theme and wins, the application will look like this:",
					image: require("../../assets/img/results/star-wars-win.png")
				},
				{
					title: "Vehicles theme selection",
					text: "If the user selects the Vehicles theme and wins, the application will look like this:",
					image: require("../../assets/img/results/vehicles-win.png")
				},
				{
					title: "Alphabet theme selection",
					text: "If the user selects the Alphabet theme and wins, the application will look like this:",
					image: require("../../assets/img/results/alphabet-win.png")
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
	.about-container {
		& ul, li {
			max-width: 98%;
		}
	}

	.theme-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.theme-image {
		height: 400px;
		width: 300px;
	}
</style>

<style lang="scss">
	.carousel-container {
		max-width: 100vw;
		height: 300px;
		margin: 0;
		padding: 0;

		@media screen and (min-width: 400px) {
			height: 580px;
		}
	}
</style>
