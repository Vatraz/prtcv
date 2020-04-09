<template>
  <div>
    Type
    <el-select v-model="params.type">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text"/>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CVColor',
  model: {
    prop: 'params',
    event: 'change'
  },
  props: {
    params: Object,
  },
  data: function() {
    return {
      typeValues : [
        {text:'BRG > GRAY', value: this.$cv.COLOR_RGBA2GRAY},
        {text:'GRAY > BRG', value: this.$cv.COLOR_GRAY2RGBA},
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
