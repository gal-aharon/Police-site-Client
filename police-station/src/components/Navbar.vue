<template>
	<v-toolbar color="blue-grey darken-3" dark rtl>
		<img class="navbar-item" alt="Police Station logo" src="../assets/policelogo.png" height="100%">
		<v-spacer></v-spacer>
		<v-toolbar-title>תחנת המשטרה</v-toolbar-title>
		<v-spacer></v-spacer>
		<li><router-link to="/reports" exact><strong>דיווחים</strong></router-link></li>
		<li><router-link to="/map" exact><strong>מפה</strong></router-link></li>
		<li><router-link to="/" exact><strong>פעילויות</strong></router-link></li>
	</v-toolbar>
</template>

<script>

export default {
	name: 'nav-bar',
	computed: {
		
	},
}
</script>

<style scoped>
	.router-link-active{
		color: #000;
	}
</style>