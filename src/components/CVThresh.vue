<template>
  <div>
    Threshold:
    <input type="range" id="thresh" v-model.number="params.thresh" min="0" max="255">
    Max Value
    <input type="range" id="thresh" v-model.number="params.maxval" min="0" max="255">
    Type
    <select v-model="params.type">
      <option v-for="typeValues in typeValuess" 
        :key="typeValues.text" :value="typeValues.value" >
        {{ typeValues.text }}
      </option>
    </select>
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
      typeValuess : [
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
