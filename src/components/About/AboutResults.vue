<template>
	<div class="results-container">  
		<div class="result-title">{{ result.title }}</div>
		<div class="result-text">{{ result.text }}</div>
		<div class="result-image">
			<img :src="result.image" :style="imageStyle" />
			<!-- <img :src="result.image" /> -->
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
		},

		imageStyle () {
			return {
				width: this.imageWidth,
				height: this.imageHeight,
				"max-height": "550px",
				"background-size": "cover",
				"border-radius": "10px"
			}
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
		// max-height: 500px;
		// overflow: hidden;
		margin: auto 0 auto 0;
		
		// > img {
		// 	border-radius: 10px;
		// 	width: 90%;
		// 	height: 90%;
		// 	object-fit: cover;
		// 	// max-height: 250px;
		// 	// max-width: 90%;

		// 	// @media screen and (min-width: 400px) {
		// 	// 	// height: 600px !important;
		// 	// 	max-height: 700px;

		// 	// }
		// }
	}
</style>
