<script setup lang="ts"></script>

<template>
		<header>
		<div class="container">
			<nav>
				<RouterLink :to="{ name: 'product.home' }" >Home</RouterLink>
				<RouterLink :to="{ name: 'product.create' }" >Create</RouterLink>
				<RouterLink :to="{ name: 'product.overview' }" >Overview</RouterLink>
				<RouterLink :to="{ name: 'product.order' }" >Order</RouterLink>
			</nav>
		</div>
	</header>

	<div class="container">
		<RouterView />
	</div>
</template>

<style scoped></style>
