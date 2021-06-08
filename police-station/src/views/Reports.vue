<template>
    <div fluid>
        <div class="text-h2 d-flex justify-center ma-5">דיווחים</div>
        <div v-show="!activities.length">
            לא נמצאו תוצאות
        </div>
        <v-main class="grey darken-1 fill-height">
            <v-card v-for="(report, index) in sortedReports" :key="index" outline elevation = "4" class="ma-2 pa-3">
                <v-dialog v-model="dialog[report.actId]" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="card-content">
                            <div></div>
                            {{ report.actType }} {{ report.actTime }}
                        </div>
                        <v-btn color="blue lighten-2" dark v-bind="attrs" v-on="on">
                        לעוד מידע
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text class='text-h6'>
                            סוג האירוע: {{ report.actType }} <br>
                            סוג נשק: {{ report.actTime }} <br>
                            נפגעים: {{ report.status }} <br>
                            זמן אירוע: {{ presentCopNames(report.poList) }} <br>
                            זמן הדיווח: {{ report.actGoal }} <br>
                            שם המדווח: {{ presentCopNames(report.actApprover) }}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog[activity.actId] = false">
                                חזרה ללוח
                            </v-btn>
                            <v-btn v-if="(activity.status !== 'פעילות בביצוע')" color="blue darken-1" text @click="startActivity(activity.actId)">
                                הוצאת הפעילות לפועל
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-main>
    </div>
</template>

<script>
export default {
    name: 'Activities',
    data() {
        return {
            reports: [{}, 
                {}],
            policemen: [{}],
            dialog: {},
        };
    },
    computed: {
        sortedReports() {
            return this.reports; 
        },
        copNames() {
            return ['names'];
        }
    },
    methods: {
        presentCopNames(copIndexes) {
            return copIndexes;
        },
        getPoliceIndexes(cops) {
            return cops;
        }
    }
}
</script>

<style>

</style>