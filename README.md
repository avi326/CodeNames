# code_name

> A Vue.js project 

The project saved and hosted in Firebase web under the address:
https://console.firebase.google.com/project/code-names-project/overview
Also it's included users authentication database storage and analytics. 

The game is online and enabled to play in this address:
https://code-names-project.firebaseapp.com
The game is available on PC and also in mobile (beta). You can find in the game menu also a guide for the game rules.
Also you can find more explanation about the game here and and in the guide file: codenames-rules-he.pdf.

Main game screens:

The main screen is the first screen the players seeing and choose to register, learn or play the game: 
![MainScreen](https://user-images.githubusercontent.com/53214548/65393263-3c176380-dd87-11e9-829c-9ab40debb664.JPG)

After register or login the table of the active games is opened and available to open a new game or join other game if the player there is waiting for other player:
![TableOfGames](https://user-images.githubusercontent.com/53214548/65393264-3caffa00-dd87-11e9-980e-d5fb0e57ff1c.JPG)

This is the board game in active game:
![LiveGame](https://user-images.githubusercontent.com/53214548/65393261-3c176380-dd87-11e9-95c7-7f79dcbf7376.JPG)

This is a focus of the words board with the 25 (5X5 grid) randomly words:
![BoardOfGame](https://user-images.githubusercontent.com/53214548/65393257-3588ec00-dd87-11e9-8f7d-2e9d56bb8adf.JPG)

This is the game map of the board game example above.
![GameMap](https://user-images.githubusercontent.com/53214548/65393260-39b50980-dd87-11e9-978b-1ca48d8dc525.JPG)



# Data

The data found under the project address in 'Database' tab (https://console.firebase.google.com/project/code-names-project/database).
The input data (the games words) and the output data (the collected words and connections) is found in the tables.

Please notice we added full viewer permission for the known emails (so need to have Firebase account):
openu.nlp.course@gmail.com (Invitation already approved to view project because google account)
reutts@openu.ac.il (Need to your approve to the invitation and than view)
matansa@openu.ac.il (Need to your approve to the invitation and than view)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
