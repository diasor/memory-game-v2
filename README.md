# memory-card-game

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Project implementation details

This project was originally forked from `https://github.com/mlama007/Vue-Memory-Game`

### How to use it
If you would like just to test the matching game, just feel free to select a game, and start playing.

[Here](https://dsormani.com/my-projects/memory-game/#) you can see it running. And [here](https://dsormani.com/my-projects/memory-game/#/about) you can find detailed documentation of the project. 

If you would like to test its accessibility capabilities, you will need to install some screen reader on Chrome (like for instance ChromeVox or ScreenReader). If you install such a plugin, every time the user clicks on a card, the system will feedback to the user. Check it out.

### Some Improvements
I made several changes to:

- make a better use of the state management by redefining the state into:

  - the accessibility properties.
  - the game fields properties.
  - the new template properties.

  This allows for a clearer overview and should the application grow, it will also simplify the process of separating these properties into different Vuex modules.

- make separation of concerns: ship the logic to the actions and make a bit more explicit use of the the Vuex commits. This also cleans the components code, and provides future resusability of the functions defined as actions.

- organize code into modules (logic, scss, state, etc):

  - particularly convert the "Card" into a new component, including it's logic, it's scss, it's state and it's actions.
  - cleaning the "Home" view a bit.
  - allowing the card to have more clean logic.
  - redefining the props of the Winning component and its logic. Namely: not sending a function as parameter, and defining what is needed for the component, within it.

- <b>add the posibility of templates by theme</b>:

  - send the card loading based on the template to a fake api (this will allow to have the templates and card loading eventually done from an actual api, or a JSON file or another interface -away from the state -).
  - remove the type loading from the state.
  - loading the templates.
  - reshufle with a new template.

- <b>added an animation when the user wins</b>:

  - added a confetti animation when the Winning component is loaded.
  - stopped the animation before destroy.

- improve the code with the use of ES6.

- <b>added Vuetify</b>:
    - nicer look and feel, color palette, etc.
    - several style changes to allow the use of images on the new templates, as well as some other styles improvements.
    - responsiveness

- <b>added the feature of an extended templates by theme</b>:

  - added more columns on the extended theme
  - added a new theme with more cards
  - fixed the styles
  - improved some other previous styles

- added a template for animal icons

For more details, take a look at the "About"section.

### Solved game

This section shows how the game looks like with some of the new templates.

### New Harry Potter (extended) deck theme solved game

![alt text](src/assets/img/results/harry-potter-extended-win.png?raw=true 'Harry Potter solved game')

### New Disney deck theme solved game

![alt text](src/assets/img/results/disney-win.png?raw=true 'Disney solved game')

### Alphabet deck theme solved game

![alt text](src/assets/img/results/alphabet-win.png?raw=true 'Alphabet solved game')

### Star Wars deck theme solved game

![alt text](src/assets/img/results/star-wars-win.png?raw=true 'Star Wars solved game')

### Default icon theme solved game

![alt text](src/assets/img/results/default-win.png?raw=true 'Default icon solved game')

### Full deck

![alt text](src/assets/img/results/full-deck.png?raw=true 'Full deck')