<template>
  <div>
    <p>Threshold:</p>
    <el-input-number v-model="params.thresh" :min="0" :max="255"/>
    <el-slider size="mini" v-model.number="params.thresh" :min="0" :max="255"/>
    <p>Max Value:</p>
    <el-input-number v-model="params.maxval" :min="0" :max="255"/>
    <el-slider size="mini" v-model.number="params.maxval" :min="0" :max="255"/>
    <p>Type:</p>
    <el-select v-model="params.type">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text">
      </el-option>
    </el-select>
    <p v-if="visible === true">
      <el-button  @click="$emit('update:visible', false)">Cancel</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CVEditThresh',
  model: {
    prop: 'params',
    event: 'change'
  },
  props: {
    params: Object,
    visible: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  data: function() {
    return {
      typeValues : [
        {text:'Binary', value: window.cv.THRESH_BINARY},
        {text:'Binary Inv', value: window.cv.THRESH_BINARY_INV},
        {text:'Tozero', value: window.cv.THRESH_TOZERO},
        {text:'Tozero Inv', value: window.cv.THRESH_TOZERO_INV},
        {text:'Trunc', value: window.cv.THRESH_TRUNC},
      ]
    }
  },
}
</script>

<style scoped>

</style>
