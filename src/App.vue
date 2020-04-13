<template>
  <div id="app">
    <el-col :xl="{offset:4, span:16}" :lg="{offset:2, span:20}" :sm="{offset:1, span:22}" :xs="{offset:0, span:24}">
      <el-container>
        <el-header >
          <b>SIUP</b>
        </el-header>
        <el-container>
          <CVApp/>
        </el-container>
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
  },
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
  .el-container .el-container{
    height: calc(100vh - 60px);
    width: 100%;
  }
  div {
    font-family: "Helvetica Neue",Helvetica, Arial,sans-serif;
  }
  .el-col {
    border-radius: 4px;
    background-color: #ffffff;
}
  
</style>
