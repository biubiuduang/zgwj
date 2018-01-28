<template>
    <div>
      <p @click="getId">detail</p>
    </div>
</template>
<script>
    export default {
      data() {
        return {

        }
      },
      activated() {
        this.getId();
      },
      methods: {
        getId: function(){
          console.log(this.$route.params.id);
        }
      }
    }
</script>
<style>

</style>
