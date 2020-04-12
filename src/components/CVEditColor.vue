<template>
  <div>
    <p>Type:</p>
    <el-select :default-first-option="true" v-model="params.type">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text"/>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CVEditColor',
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
        {text:'BRG > GRAY', value: window.cv.COLOR_RGBA2GRAY},
        {text:'GRAY > BRG', value: window.cv.COLOR_GRAY2RGBA},
      ]
    }
  },
}
</script>

<style scoped>
</style>
