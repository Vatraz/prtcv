<template>
  <div>
    <p>Kernel size:</p>
    <p>
      <el-input-number v-model="params.ksize[0]" :min="1" :max="10"/>
      <el-input-number v-model="params.ksize[1]" :min="1" :max="10"/>
    </p>
    <p>Anchor:</p>
    <p>
      <el-input-number v-model="params.anchor[0]" :min="-1" :max="10"/>
      <el-input-number v-model="params.anchor[1]" :min="-1" :max="10"/>
    </p>
    <p>Border type:</p>
    <el-select v-model="params.borderType">
      <el-option v-for="i in borderTypes" 
        :key="i.text" :value="i.value" :label="i.text"/>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'CVEditBlur',
  model: {
    prop: 'params',
    event: 'change',
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
      borderTypes : [
        // {text:'Constant', value: window.cv.BORDER_CONSTANT},
        {text:'Default', value: window.cv.BORDER_DEFAULT},
        {text:'Replicate', value: window.cv.BORDER_REPLICATE},
      ]
    }
  },
}
</script>

<style scoped>
.el-input-number {
  size: "mini";
}
</style>
