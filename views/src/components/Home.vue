<template lang="html">
  <div class="container">
    <el-row :gutter="20">
      <el-col :md="18">
        <router-view name="posts"></router-view>
      </el-col>
      <el-col :md="6">
        <router-view name="sidebar"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
