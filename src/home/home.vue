<template lang="pug">
  .content
    .switch-container
      <el-switch v-model="subscribe" on-color="#13ce66" off-color="#ff4949"></el-switch>
      span.agree-info 同意订阅?
    .subscription
    .kind-info
</template>
<script src="./home.js"></script>
<style lang="scss" scoped  src="./home.scss"></style>