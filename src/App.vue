<template>
  <div class="background" id="app">
    <el-col :lg="{offset:4, span:16}" :sm="{offset:1, span:22}" :xs="{offset:0, span:24}">
      <el-container>
        <el-header>
          <b>SIUP</b>
        </el-header>
        <el-main>
          <CVApp/>
        </el-main>
      </el-container>
    </el-col>
  </div>
</template>

<script>
import CVApp from './components/CVApp.vue'

export default {
  name: 'app',
  components: {
    CVApp
  }
}
</script>

<style scoped>
  .el-header {
    text-align: center;
    background-image: linear-gradient(to right, red, green, blue);
    color: white; 
    font-size: 22pt;
    line-height: 60px;
  }
</style>
