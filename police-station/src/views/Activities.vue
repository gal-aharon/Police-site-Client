<template>
    <div fluid>
        <div class="text-h3 d-flex justify-center ma-5">פעילויות</div>
        <div v-show="!activities.length">
            לא נמצאו תוצאות
        </div>
        <v-main class="grey darken-1 fill-height">
            <v-card v-for="(activity, index) in sortedActivities" :key="index" outline elevation = "4" class="ma-2 pa-3">
                <v-dialog v-model="dialog[activity.act_id]" width="500">
                    <template v-slot:activator="{ on, attrs }" class="current_activity">
                        <div class="card-content" :class="{ 'current_activity' : activity.status === 'פעילות בביצוע'}">
                            {{ activity.act_type }} {{ formattedDate(activity.act_time) }}
                        </div>
                        <v-btn color="blue lighten-2" dark v-bind="attrs" v-on="on">
                        לעוד מידע
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text class='text-h6'>
                            סוג פעילות: {{ activity.act_type }} <br>
                            זמן מתכונן לפעילות: {{ formattedDate(activity.act_time) }} <br>
                            סטטוס: {{ activity.status }} <br>
                            שוטרים משתתפים: {{ presentCopNames(activity.po_list) }} <br>
                            מטרת הפעילות: {{ activity.act_goal }} <br>
                            שם המאשר: {{ presentCopNames([activity.act_approver]) }}
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog[activity.act_id] = false">
                                חזרה ללוח
                            </v-btn>
                            <v-btn v-if="(activity.status === 'פעילות עתידית')" color="blue darken-1" text @click="startActivity(activity.act_id)">
                                הוצאת הפעילות לפועל
                            </v-btn>
                            <v-btn v-if="(activity.status === 'פעילות בביצוע')" color="blue darken-1" text @click="endActivity(activity.act_id)">
                                סיום הפעילות
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>

            <v-dialog v-model="dialog.addActivity" persistent max-width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="blue darken-1" dark v-bind="attrs" v-on="on">
                        הוסף פעילות
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">הוספת פעילות</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="activityType" :items="['מחסום מכוניות', 'מארב', 'פטרול']" label="סוג הפעילות" required></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-datetime-picker v-model="activityDate" label="Select date and time" required> </v-datetime-picker>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="activityGoal" label="מטרת הפעילות" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete v-model="copList" :items="copNames" label="כוח מתוכנן" hint="ניתן לבחור כמה שוטרים" persistent-hint multiple></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="activityApprover" :items="copNames" label="מאשר הפעילות" required></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="addActivity()">
                            הוסף
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="dialog.addActivity = false">
                            סגור
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-main>
    </div>
</template>

<script>
import api from '../api.js';

export default {
    name: 'Activities',
    data() {
        return {
            activities: [],
            policemen: [],
            dialog: {},
            activityType: '',
            activityDate: '',
            activityGoal: '',
            copList: [],
            activityApprover: ''
        };
    },
    created() {
        api.policeStation().getActivities()
            .then(({ data }) => { this.activities = data })
            .catch((err) => console.log(`${err} couldn't get the activities.`));
        api.policeStation().getCops()
            .then(({ data }) => { this.policemen = data })
            .catch((err) => console.log(`${err} couldn't get the policemen.`));
    },
    computed: {
        sortedActivities() {
            return this.activities; 
        },
        copNames() {
            return this.policemen.map(cop => cop.name);
        }
    },
    methods: {
        formattedDate(date) {
            return new Date(date).toLocaleString('en-US', { hour12: false });
        },
        startActivity(activityId) {
            this.dialog[activityId] = false;
            const activity = this.activities.find(activity => activity.act_id === activityId);
            activity.status = 'פעילות בביצוע';
            activity.act_time = new Date().toLocaleString('en-US', { hour12: false });
        },
        endActivity(activityId) {
            this.dialog[activityId] = false;
            this.activities.find(activity => activity.act_id === activityId).status = 'פעילות עבר';
        },
        addActivity() {
            this.dialog.addActivity = false;
            const newActivity = {
                act_type: this.activityType,
                act_time: this.activityDate,
                act_goal: this.activityGoal,
                po_list: this.getPoliceIndexes(this.copList),
                status: this.activityDate >= new Date ? 'פעילות עתידית' : 'פעילות עבר',
                act_approver: this.getPoliceIndexes(this.activityApprover)[0],
            }
            newActivity.act_id = new Date(newActivity.act_time) % 100;
            this.activityType = '';
            this.activityDate = '';
            this.activityGoal = '';
            this.copList = [];
            this.activityApprover = '';
            this.activities.push(newActivity);
        },
        presentCopNames(copIndexes) {
            return copIndexes.map(cop => cop.name).join(', ');
        },
        getPoliceIndexes(copNames) {
            return copNames.map(cop => cop.id);
        }
    }
}
</script>

<style>
    .current_activity {
        background-color: greenyellow;
    }
</style>