<template>
    <div fluid>
        <div class="text-h2 d-flex justify-center ma-5">פעילויות</div>
        <div v-show="!activities.length">
            לא נמצאו תוצאות
        </div>
        <v-main class="grey darken-1 fill-height">
            <v-card v-for="(activity, index) in sortedActivities" :key="index" outline elevation = "4" class="ma-2 pa-3">
                <v-dialog v-model="dialog[activity.actId]" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="card-content">
                            <div></div>
                            {{ activity.actType }} {{ activity.actTime }}
                        </div>
                        <v-btn color="blue lighten-2" dark v-bind="attrs" v-on="on">
                        לעוד מידע
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-text class='text-h6'>
                            סוג פעילות: {{ activity.actType }} <br>
                            זמן מתכונן לפעילות: {{ activity.actTime }} <br>
                            סטטוס: {{ activity.status }} <br>
                            שוטרים משתתפים: {{ presentCopNames(activity.poList) }} <br>
                            מטרת הפעילות: {{ activity.actGoal }} <br>
                            שם המאשר: {{ presentCopNames(activity.actApprover) }}
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
                                <v-date-picker cols="12" sm="6" v-model="activityDate"></v-date-picker>
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
export default {
    name: 'Activities',
    data() {
        return {
            activities: [{actType:'מחסום מכוניות', actTime:'1/10/2021 13:30:00', poList: [2,1], actGoal:'לחסום כביש לצורכי עבודה בדרך', status:'פעילות עבר', actApprover: 2, actLocX: 24.1, actLocY: 12.2, actId: 1}, 
                {actType:'אמבוש', actTime:'12/12/2021 12:00:00', poList: [3,1], actGoal:'לתפוס חשודים', status:'פעילות עתידית', actApprover: 1, actLocX: 12.2, actLocY: 24.1, actId: 4}],
            policemen: [{}],
            dialog: {},
            activityType: '',
            activityDate: new Date().toISOString().substr(0, 10),
            activityGoal: '',
            copList: [],
            activityApprover: ''
        };
    },
    computed: {
        sortedActivities() {
            return this.activities; 
        },
        copNames() {
            return ['names'];
        }
    },
    methods: {
        startActivity(activityId) {
            this.dialog[activityId] = false;
            this.activities.find(activity => activity.actId === activityId).status = 'פעילות בביצוע';
        },
        presentCopNames(copIndexes) {
            return copIndexes;
        },
        addActivity() {
            this.dialog.addActivity = false;
            const newActivity = {
                actType: this.activityType,
                actTime: this.activityDate,
                actGoal: this.activityGoal,
                poList: this.getPoliceIndexes(this.copList),
                status: 'פעילות עתידית',
                actApprover: this.activityApprover,
            }
            this.activityType = '';
            this.activityDate = new Date().toISOString().substr(0, 10);
            this.activityGoal = '';
            this.copList = [];
            this.activityApprover = '';
            this.activities.push(newActivity);
            console.log(newActivity);
        },
        getPoliceIndexes(cops) {
            return cops;
        }
    }
}
</script>

<style>

</style>