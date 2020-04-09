<template>
  <div>
    Threshold:
    <el-slider show-input v-model.number="params.thresh" :min="0" :max="255"/>
    Max Value
    <el-slider show-input v-model.number="params.maxval" :min="0" :max="255"/>
    Type
    <el-select v-model="params.type">
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
  watch: {
    params() {
      let a = this.params.type
      console.log(a)
      this.parmas.describe = 'Hihih'
      console.log('zmiana')
    },
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
