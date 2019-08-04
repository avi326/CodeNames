<template>
    <div class="game">
        <div style="text-align: center">
            <h3 class="lead text-center"> לוח מילים</h3>
            <table class="table table-bordered text-center words">
                <tbody>
                    <tr>
                        <th class="text-center">גבוה</th>
                        <th class="text-center">נשיא</th>
                        <th class="text-center">עולם</th>
                        <th class="text-center">אדמה</th>
                        <th class="text-center">תרנגול</th>
                    </tr>
                    <tr>
                        <th class="text-center">פצצה</th>
                        <th class="text-center">גרגיר</th>
                        <th class="text-center">משחק</th>
                        <th class="text-center">דשא</th>
                        <th class="text-center">רמקול</th>
                    </tr>            
                    <tr>
                        <th class="text-center">אש</th>
                        <th class="text-center">ירושלים</th>
                        <th class="text-center">יד</th>
                        <th class="text-center">סרטן</th>
                        <th class="text-center">כנף</th>
                    </tr>
                    <tr>
                        <th class="text-center">תקרה</th>
                        <th class="text-center">ארוחה</th>
                        <th class="text-center">כוכב</th>
                        <th class="text-center">חזק</th>
                        <th class="text-center">איראן</th>
                    </tr>
                    <tr>
                        <th class="text-center">עציץ</th>
                        <th class="text-center">כדור</th>
                        <th class="text-center">עט</th>
                        <th class="text-center">חם</th>
                        <th class="text-center">דף</th>
                    </tr>
                </tbody>
            </table>
        </div>

            <div class="mapTable">
                <h3 class="lead text-center">מפת המשחק שלך</h3>
                <table style="width:15%" class="table table-bordered mapTable">
                    <tr>
                        <td class="black"></td>
                        <td ></td>
                        <td class="black"></td>
                        <td class="blue"> </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td ></td>
                        <td class="blue" ></td>
                        <td ></td>
                        <td class="black"></td>
                        <td ></td>
                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td class="blue" ></td>
                        <td ></td>
                        <td ></td>
                    </tr>
                    <tr>
                        <td ></td>
                        <td class="blue" ></td>
                        <td ></td>
                        <td class="black"></td>
                        <td ></td>
                    </tr>
                    <tr>
                        <td class="blue" ></td>
                        <td class="blue" ></td>
                        <td ></td>
                        <td ></td>
                        <td class="blue"></td>
                    </tr>
                </table>
            </div>

            <div class="MultiSelectWords">
                <MultiSelectWords/>
            </div>

        </div>
</template>

<script>
import MultiSelectWords from '@/components/game/MultiSelectWords'

export default {
name: 'Game',
components: {
    MultiSelectWords
}

}

</script>

<style>
div.game {
    direction: rtl;
    text-align: center
    
}
table.words {
    margin-left:auto; 
    margin-right:auto;
    text-align: center
}

table.mapTable {
    margin-left:auto; 
    margin-right:auto;
    text-align: center
}

table.mapTable {
    width: 10%;
    border-collapse: collapse;
    border: 1px solid black;
    background-color: rgb(221, 253, 255);
    margin: 0px auto;
}

table.mapTable.td {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(221, 200, 200);
}

table.mapTable.td.blue {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(0, 119, 255);
}

table.mapTable.td.black {
    float:left;
    width: 100%;
    padding-bottom: 100%; /* = width for a 1:1 aspect ratio */
    background-color: rgb(0, 0, 0);
}

div.MultiSelectWords {
    margin-left:auto; 
    margin-right:auto;
    text-align: center;
    width: 300px;
}
</style>
