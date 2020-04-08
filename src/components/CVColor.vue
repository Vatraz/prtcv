<template>
  <div>
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
      typeValuess : [
        {text:'BRG -> GRAY', value: this.$cv.COLOR_RGBA2GRAY},
        {text:'GRAY -> BRG', value: this.$cv.COLOR_GRAY2RGBA},
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
