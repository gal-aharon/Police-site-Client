<template>
	<v-toolbar color="blue-grey darken-3" dark rtl>
		<img class="navbar-item" alt="Police Station logo" src="../assets/policelogo.png" height="100%">
		<v-spacer></v-spacer>
		<v-toolbar-title class="text-h2">תחנת המשטרה</v-toolbar-title>
		<v-spacer></v-spacer>
		<a><router-link to="/reports" exact><strong>דיווחים</strong></router-link></a>
		<a><router-link to="/map" exact><strong>מפה</strong></router-link></a>
		<a><router-link to="/" exact><strong>פעילויות</strong></router-link></a>
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
	a, a:link, a:hover, a:active {
		color: white !important;
		margin: 0.3%;
		font-size: x-large;
		cursor:pointer;
	}
	.router-link-active {
		font-weight: bold;
	}
</style>