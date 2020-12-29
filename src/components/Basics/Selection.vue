<template>
    <div class="select-container">
        <div class="select-image">
            <img
                v-if="item.icon===''"
                max-width="30px" max-height="30px"
                class="icon-image"
                :src="imageSource(item.image)"
            />
            <v-icon v-else size="20px" :color="iconColor">{{item.icon}}</v-icon>
        </div>
        <div class="select-information">
            <span>{{ item.text }}</span>
        </div>
    </div>

</template>

<script>
export default {
    name: "Selection",

    props: {
        item: {
            type: Object,
            required: true
        },

        isSelected: {
            type: Boolean,
            require: true
        }
    },

    computed: {
        iconColor () {
            return (this.isSelected) ? "#009688" : "#a9a9a9"
        }
    },

    methods: {
        imageSource (imageName) {
            return (imageName === "") ? "" : require(`../../assets/${imageName}`)
        }
    }
}
</script>
<style lang="scss" scoped>
    .select-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .select-image {
            display: flex;
            width: 20%;
        }

        .select-information {
            display: flex;
            width: 80%;
        }
    }
</style>
