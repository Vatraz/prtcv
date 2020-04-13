<template>
  <div>
    <p>Threshold:</p>
    <el-slider size="mini" show-input v-model.number="params.thresh" :min="0" :max="255"/>
    <p>Max Value:</p>
    <el-slider show-input v-model.number="params.maxval" :min="0" :max="255"/>
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
      ]
    }
  },
}
</script>

<style scoped>

</style>
