<template>
  <div class="section is-light">
        <div class="container">
            <div v-show="!activities.length">
                לא נמצאו תוצאות
            </div>
            <div v-for="(activity, index) in sortedActivities" :key="index" class="card">
                <div class="card-content" @click="showActivity(activity)">
                    {{ activity }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConvoyTable',
    data() {
        return {
            activities: ['car blockade', 'ambush']
        };
    },
    computed: {
        sortedActivities() {
            return this.activities; 
        },
    },
    methods: {
        showActivity(activity) {
            alert(activity);
        }
    }
}
</script>

<style>

</style>