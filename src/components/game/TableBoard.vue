<template>
  <div>
    <!--  v-if="turn=='define'" -->
    <div>
      <h3>לוח מילים</h3>
      <table class="table table-bordered text-center words">
        <tbody>
          <tr v-for="(i, index_i) in Math.ceil(table_board.length / 5)" :key="i">
            <td
              v-for="(word, index_j) in table_board.slice((i - 1) * 5, i * 5)"
              :key="word.id"
              :class="map_player[(index_i * 5 ) + index_j]"
            >
              <span v-if="map_player[(index_i * 5 ) + index_j]=='black'" style="color: white;">
                <b>{{ word }}</b>
              </span>
              <span v-else>
                <b>{{ word }}</b>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  v-else -->
    <!-- <div> 
            <h3> לוח ריק, של היריב</h3>
            <table class="table table-bordered text-center words">
                <tbody>
                    <tr v-for="i in Math.ceil(table_board.length / 5)" :key="i">
                        <td v-for="word in table_board.slice((i - 1) * 5, i * 5)" :key="word.id">
                            {{ word }} 
                                </td>
                    </tr>
                </tbody>
            </table> 
    </div>-->
    <!-- <div else>
            <p>
                תור היריב
            </p>

    </div>-->
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "TableBoard",
  props: { conected_player: null, ref_db: null },
  data() {
    return {
      map_player: [],
      table_board: [],
      turn: "guess"
    };
  },
  created() {
    this.get_table_and_map();
  },
  mounted() {
    this.get_turn();
  },
  methods: {
    get_table_and_map() {
      var getDoc = this.ref_db
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such game document!");
          } else {
            // console.log('Document data:', doc.data());
            this.table_board = doc.data().table_board;
            var alias_player_one = doc.data().alias_player_one;
            var alias_player_two = doc.data().alias_player_two;

            //First check if it's player two becuase player one most to be in this level
            if (alias_player_one == this.conected_player) {
              this.map_player = doc.data().map_player_one;
            } else if (alias_player_two == this.conected_player) {
              this.map_player = doc.data().map_player_two;
            }
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
    },
    get_turn() {
      this.ref_db.onSnapshot(doc => {
        this.turn = doc.data().turn;
        console.log(" turn in firebase: ", this.turn);
      });
    }
  }
};
</script>

<style scoped>
td {
  text-align: center;
}
</style>