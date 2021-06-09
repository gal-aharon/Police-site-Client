<template>
    <div fluid>
        <div class="text-h3 d-flex justify-center ma-5">דיווחים</div>
        <div v-show="!reports.length">
            לא נמצאו תוצאות
        </div>
        <div v-show="reports.length">
            <v-select
          :items="types"
          label="בחר סוג אירוע"
          solo
          v-model="type"
        ></v-select>
        </div>
        <v-main class="grey darken-1 fill-height">
            <v-card v-for="(report, index) in sortedReports" :key="index" outline elevation = "4" class="ma-2 pa-3">
                <v-dialog v-model="dialog[report.report_id]" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="card-content">
                            <div></div>
                            {{ report.ev_type }} {{ report.ev_time }}
                        </div>
                        <v-btn color="blue lighten-2" dark v-bind="attrs" v-on="on">
                        לעוד מידע
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text class='text-h6'>
                            סוג האירוע: {{ report.ev_type }} <br>
                            <div v-if="report.ev_type === 'דקירה'">
                                סוג נשק: {{ report.weapon_type }} <br>
                                מספר נפגעים: {{ report.casualties_num }} <br>
                                מספר תעודת זהות הדוקר: {{ report.stabber_id }} <br>
                            </div>
                            <div v-if="report.ev_type === 'ירי'">
                                סוג נשק: {{ report.weapon_type }} <br>
                                מספר נפגעים: {{ report.casualties_num }} <br>
                                מספר תעודת זהות היורה: {{ report.shooter_id }} <br>
                            </div>
                            <div v-if="report.ev_type === 'חטיפה'">
                                מספר תעודת זהות של החוטף: {{ report.kidnapper_id }} <br>
                                מספר תעודת זהות של הנחטף: {{ report.kidnapped_id }} <br>
                                מיקום ידוע אחרון: {{ report.last_place_known }} <br>
                            </div>
                            <div v-if="report.ev_type === 'תאונה'">
                                מספר תעודת זהות של הפוגע: {{ report.hitter_id }} <br>
                                מספר תעודת זהות של הנפגע: {{ report.hit_id }} <br>
                                מספר נפגעים: {{ report.casualties_num }} <br>
                            </div>
                            
                            זמן אירוע: {{ report.ev_time }} <br>
                            זמן הדיווח: {{ report.evreporttime }} <br>
                            תעודת זהות של המדווח: {{ report.reporter_id }}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog[report.report_id] = false">
                                חזרה לדיווחים
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-main>
    </div>
</template>

<script>
import api from '../api.js';

export default {
    name: 'Reports',
    data() {
        return {
            reports: [],
            policemen: [],
            dialog: {},
            types: ['חטיפה', 'דקירה', 'תאונה', 'ירי'],
            type: ''
        };
    },
    created() {
        api.policeStation().getReports()
            .then(({ data }) => { 
                const test = [...data];
                test.forEach(report => {
                    if (report.ev_type === 'חטיפה') {
                        api.policeStation().getKidnappingReport(report.report_id).then(({ data }) => report = Object.assign(report, data));
                    } else if (report.ev_type === 'דקירה') {
                        api.policeStation().getStabbingReport(report.report_id).then(({ data }) => report = Object.assign(report, data));
                    } else if (report.ev_type === 'ירי') {
                        api.policeStation().getShootingReport(report.report_id).then(({ data }) => report = Object.assign(report, data));
                    } else if (report.ev_type === 'תאונה') {
                        api.policeStation().getAccidentReport(report.report_id).then(({ data }) => report = Object.assign(report, data));
                    }
                });
                this.reports = test;
            })
            .catch((err) => console.log(`${err} couldn't get the reports.`));
        api.policeStation().getCops()
            .then(({ data }) => { this.policemen = data })
            .catch((err) => console.log(`${err} couldn't get the policemen.`));
    },
    computed: {
        sortedReports() {
            const sortedReportList = this.filterByTypeArray();
            const sortedReportListByDate = this.sortByDateArray(sortedReportList);

            return sortedReportListByDate; 
        },
    },
    methods: {
        sortByDateArray(sortedReportList) {
            return sortedReportList.sort((r1, r2) => {return Date.parse(r1.evreporttime) < Date.parse(r2.evreporttime) ?-1:1});
        },
        filterByTypeArray() {
            if(this.type !== '') {
                return this.reports.filter((report) => report.ev_type === this.type);
                } 
             return this.reports;
        }
    }
}
</script>

<style>

</style>