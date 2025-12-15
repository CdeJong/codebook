<script setup lang="ts"></script>

<template>
		<header>
		<div class="container">
			<nav>
				<RouterLink to="/" >Home</RouterLink>
				<RouterLink to="/create" >Create</RouterLink>
				<RouterLink to="/overview" >Overview</RouterLink>
				<RouterLink to="/order" >Order</RouterLink>
			</nav>
		</div>
	</header>

	<div class="container">
		<RouterView />
	</div>
</template>

<style scoped></style>
