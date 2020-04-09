<template>
  <div>
    <p>Threshold:</p>
    <el-slider show-input v-model.number="params.thresh" :min="0" :max="255"/>
    <p>Max Value:</p>
    <el-slider show-input v-model.number="params.maxval" :min="0" :max="255"/>
    <p>Type:</p>
    <el-select :default-first-option="true" v-model="params.type">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CVThresh',
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
        {text:'Binary', value: this.$cv.THRESH_BINARY},
        {text:'Binary Inv', value: this.$cv.THRESH_BINARY_INV},
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
