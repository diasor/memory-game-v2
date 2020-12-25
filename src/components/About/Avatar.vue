<template>
    <div class="text-center">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
          <v-img
            max-height="150"
            max-width="250"
            src="../../assets/diana-avatar.png"
            ></v-img>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    I accept
                </v-btn>
            </v-card-actions>
      </v-card>
  </div>
</template>
<script>
export default {
  name: "Avatar"
}
</script>
