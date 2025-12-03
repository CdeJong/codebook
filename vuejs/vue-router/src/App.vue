<script setup>
</script>

<template>
	<header>
		<div class="container">
			<nav>
				<RouterLink to="/" >Home</RouterLink>
				<RouterLink to="/create" >Create</RouterLink>
				<RouterLink to="/overview" >Overview</RouterLink>
			</nav>
		</div>
	</header>

	<div class="container">
		<RouterView />
	</div>
	
	

</template>

<style scoped></style>
