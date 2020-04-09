<template>
  <div class="background" id="app">
    <el-row>
      <el-col :sm="{offset:4, span:16}" :xs="{offset:0, span:24}">
        <el-container>
          <el-main>
            <HelloWorld msg="Welcome to Your Vue.js App"/>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
  body {
    background-color: #001427;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    background-color: #f9fafc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
