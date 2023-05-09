<template>
  <div class="collect-container">
    <!-- <Header :indexHeader="false"></Header> -->
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.age = 12;
    });
  },
  mounted() {
    console.log('this.age', this.age);
  },
};
</script>
<style lang="scss" scoped></style>
