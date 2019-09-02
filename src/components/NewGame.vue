<template>
    <div class="new-message">
    <form @submit.prevent="addGame">
        <button class="btn deep-purple"> add_game</button>  
    </form>
    <p v-if="newGame"> {{ newGame }} </p>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import { constants } from 'fs';
export default {
  name: 'NewGame',
  props: ['alias'],
  data(){
    return{
      newGame: null,
      words_list: []

    }
  },
  created () {
///////////////////////////////////////////////////
  // this to for add new words to fire base

  //   var word_list = ['שלט', 'צינור', 'פלסטיק', 'לוח', 'גביע', 'כפתור', 'רשת', 'מכסה', 'בז', 'אביב', 'סוס', 'שעה', 'כיפה', 'לפיד', 'גולם', 'צופר', 'גבול', 'נגן', 'כף', 'מתג', 'עגור', 'מסך', 'מחוג', 'כח', 'ירדן', 'מפתח', 'חלל', 'מנוע', 'דמות', 'גל', 'איל', 'תנועה', 'קבלה', 'נייר', 'ריק', 'ארץ', 'פרי', 'ריקוד', 'יער', 'עגול', 'טרול', 'לב', 'קש', 'שלג', 'מודל', 'כתר', 'מפגש', 'טייס', 'משפט', 'תיאטרון', 'אור', 'קרח', 'מלך', 'חצר', 'מלחמה', 'דרור', 'אמה', 'נעל', 'בן', 'מזלג', 'מורה', 'לבנה', 'חייל', 'כריש', 'חור', 'שן', 'איבר', 'גמל', 'מעבדה', 'גוש', 'צלחת', 'שטר', 'כדור', 'אגודל', 'סכין', 'שמש', 'מרגל', 'משולש', 'זהב', 'מטה', 'מעבר', 'טבעת', 'צב', 'לוחם', 'יום', 'שוטף', 'פעמון', 'כתם', 'מושב', 'זכוכית', 'חלק', 'טורקי', 'מאזניים', 'נעץ', 'תוקף', 'ברלין', 'שוט', 'עופרת', 'חד קרן', 'אמבולנס', 'נקניק', 'זריקה', 'שמן', 'סרט', 'לונדון', 'כיסוי', 'רוח', 'זנב', 'חוף', 'כנס', 'נקודה', 'קצב', 'איצטדיון', 'קול', 'טוקיו', 'גרב', 'ירושלים', 'שקל', 'גמד', 'כנען', 'נמל', 'גיבור על', 'עקב', 'מברשת', 'ברווזון', 'סילון', 'נשר', 'אפיקומן', 'גב', 'דוקטור', 'בדיקה', 'תולעת', 'מחבט', 'מיטה', 'הפיכה', 'פנים', 'אגוז', 'ראש', 'סין', 'אמריקה', 'אישון', 'עורב', 'נס', 'אוניה', 'זית', 'תא', 'כלב', 'מצנח', 'צבר', 'כסא', 'ורד', 'דבש', 'נעל', 'לייזר', 'ישן', 'מחלה', 'ארנבת', 'גיל', 'לחש', 'קו', 'ממותה', 'תג', 'רב', 'רעל', 'מצרים', 'פסיפס', 'קברן', 'צל', 'חליפה', 'פה', 'מלכה', 'חוזה', 'מלון', 'תיכון', 'הדר', 'טיל', 'חגורה', 'קור', 'פירמידה', 'שנהב', 'שוק', 'נגע', 'ביאליק', 'ערד', 'לחץ', 'כוכב', 'אטלנטיס', 'עין', 'חנה', 'בריכה', 'ענק', 'מחשב', 'אדמה', 'קשר', 'שתיל', 'מטוס', 'מראה', 'איפור', 'דוב', 'פרק', 'שולחן', 'מחט', 'נעול', 'שרשרת', 'מידה', 'חליל', 'צרפת', 'דבש', 'סושי', 'פיל', 'מסע', 'לווין', 'יומן', 'אביר', 'חלף', 'מועדון', 'אוסטרליה', 'אופרה', 'כסף', 'יהלום', 'תיק', 'עקרב', 'חייזר', 'תאילנד', 'קניון', 'צדק', 'אירופה', 'שבתאי', 'סיני', 'איש-שלג', 'ביצה', 'מופע', 'מלאך', 'בירה', 'מכבי', 'דינוזאור', 'חדש', 'מים', 'בר', 'חומה', 'תפוח', 'לילה', 'דואר', 'גשר', 'עלילה', 'גזר', 'שדה', 'מכונית', 'מקדש', 'קטשופ', 'יורה', 'מליונר', 'קרס', 'אריה', 'אויר', 'סרטן', 'מנה', 'טבח', 'בית חולים', 'שוקולד', 'תל אביב', 'כפפה', 'רולטה', 'סיבוב', 'אדר', 'פאי', 'חנוכה', 'פיראט', 'בית ספר', 'נסיכה', 'חתול', 'ירוק', 'גאון', 'שרת', 'כותל', 'ריבה', 'ספר', 'הודו', 'אנטרטיקה', 'אנטיביוטיקה', 'מדען', 'רכב', 'לילית', 'קזינו']
  //  word_list.forEach( word => {
  //         db.collection("words").doc("test_group").update({
  //         words_list: firebase.firestore.FieldValue.arrayUnion(word)
  //     });
  //  })
/////////////////////////////////////////////////////

    var getDoc = db.collection("words").doc("test_group");
    getDoc.get()
    .then(doc => {
        var temp_words;
        if (!doc.exists) {
        console.log('No table_board!');
        } else {
                temp_words = doc.data().words_list
                temp_words.forEach( (element) => {
                  this.words_list.push(element)
        })
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });


  },
  methods: {
    addGame()
    {
      if(this.alias == null)
      {
        this.feedback = 'Please singup or singin before adding a game (guest can not create a new game)'
        window.alert("Please singup or singin before adding a game (guest can not create a new game")
        return;
      }

      //If not a guest
      let refGames = db.collection('games').doc(this.alias)
      refGames.get().then(doc => {
        if(doc.exists){
          this.feedback = 'This player already have a live game'
          window.alert("This player already have a live game")
        }        
        else{
          db.collection('table_of_players').doc(this.alias).set({
              player1: this.alias,
              player2: "",
              countPlayers: 1,
              time: Date.now()
          }).catch(err => {
              console.log(err)
          })

          this.newGame = null
          
          var words = this.words_list
          var randomCell;
          var tableBoard = new Array();
          var black_list_one = new Array();
          var black_list_two = new Array();
          var blue_list_one = new Array();
          var blue_list_two = new Array();
          var map_board_player_one = new Array(25);
          var map_board_player_two = new Array(25);

          while(tableBoard.length != 25) // exectaly 25 words to board game
          {
            randomCell = Math.floor(Math.random() * words.length);
            if(!tableBoard.includes(words[randomCell]))
            {
              tableBoard.push(words[randomCell])
            }              
          }

          // exectaly 4 different words to each black list
          while(black_list_one.length != 4) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_one.includes(tableBoard[randomCell]))
            {
              black_list_one.push(tableBoard[randomCell])
            }              
          }

          while(black_list_two.length != 4) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && !black_list_one.includes(tableBoard[randomCell]))
            {
              black_list_two.push(tableBoard[randomCell])
            }              
          }

          // exectaly 8 different words to each blue list
          while(blue_list_one.length != 8) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && 
                !black_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_one.includes(tableBoard[randomCell]))
            {
              blue_list_one.push(tableBoard[randomCell])
            }              
          }

          while(blue_list_two.length != 8) 
          {
            randomCell = Math.floor(Math.random() * tableBoard.length);
            if(!black_list_two.includes(tableBoard[randomCell]) && 
                !black_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_one.includes(tableBoard[randomCell]) &&
                !blue_list_two.includes(tableBoard[randomCell]))
            {
              blue_list_two.push(tableBoard[randomCell])
            }              
          }
          
          var i;
          //Moving on the table words board and mapping the 2 players map game.
          for(i=0; i < 25; i++)
          {
            //Mapping conditations for player one
            if(black_list_one.includes(tableBoard[i])) // not exceed from black list
            {
              map_board_player_one[i] = "black"
              continue;
            }
            else if(blue_list_one.includes(tableBoard[i]))
            {
              map_board_player_one[i] = "blue"
              continue;
            }
            else
            {
              map_board_player_one[i] = "empty"
              continue;
            }
          }

          for(i=0; i < 25; i++)
          {
            //Mapping conditations for player two
            if(black_list_two.includes(tableBoard[i])) 
            {
              map_board_player_two[i] = "black"
              continue;
            }
            else if(blue_list_two.includes(tableBoard[i]))
            {
              map_board_player_two[i] = "blue"
              continue;
            }
            else
            {
              map_board_player_two[i] = "empty"
              continue;
            }
          }          

          //TODO: Need to add the Moves and Chat as new collections
          refGames.set({
                alias_player_one: this.alias,
                alias_player_two: "",
                black_words_player_one: black_list_one,
                black_words_player_two: black_list_two,
                blue_words_player_one: blue_list_one,
                blue_words_player_two: blue_list_two,
                map_player_one: map_board_player_one,
                map_player_two: map_board_player_two,
                num_of_moves: 0,
                table_board: tableBoard,
                turn: "define"
            }).catch(err => {
                console.log(err)
          })

          // move to game after create row:
          this.$router.push({ name: 'Game', params: {player_one_alias: this.alias, turn:this.alias, conected_player: this.alias}}) 
        }
      })
    }
  }

  // לוח חדש, 
}
</script>

<style>

</style>
