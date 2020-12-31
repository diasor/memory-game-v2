<template>
	<div class="results-container">  
		<div class="result-title">{{ result.title }}</div>
		<div class="result-text">{{ result.text }}</div>
		<div class="result-image">
			<img :src="result.image" />
		</div>
	</div>
</template>
<script>
export default {
	name: "AboutResults",

	props: {
		result: {
			type: Object,
			required: false
		}
	},

	computed: {
		imageHeight () {
			return (this.result.imageHeight) ? this.result.imageHeight : "100%"
		},
		
		imageWidth () {
			return (this.result.width) ? this.result.width : "85%"
		}
	}
}
</script>
<style lang="scss" scoped>
	.results-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.result-title {
		display: flex;
		flex-direction: row;
		font-size: 16px;
		font-weight: 700;
		color: black;
		margin: 0 1rem;
	}

	.result-text {
		display: flex;
		flex-direction: row;
		font-size: 14px;
		font-weight: 400;
		color: grey;
		margin: 0 1rem;
		padding-bottom: 1rem;
	}

	.result-image {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: auto 0 auto 0;

		> img {
			width: 85%;
			height: 100%;
			max-height: 550px;
			background-size: cover;
			border-radius: 10px;
		}
	}
</style>
