<template>
  <div>
    <p>Order of the derivative x:</p>
      <el-input-number show-input v-model.number="params.dx" :min="0" :max="2"/>
    <p>Order of the derivative y:</p>
      <el-input-number v-model="params.dy" :min="0" :max="2"/>
    <p>Kernel size:</p>
      <el-select v-model="params.ksize">
        <el-option v-for="i in kernelValues" 
          :key="i.text" :value="i.value" :label="i.text">
        </el-option>
      </el-select>
    <p>Scale factor:</p>
      <el-input-number v-model="params.scale" :min="1" :max="10"/>
    <p>Delta:</p>
      <el-input-number v-model="params.delta" :min="0" :max="10"/>
    <p>Output depth:</p>
      <el-select v-model="params.ddepth">
        <el-option v-for="i in ddepthValues" 
          :key="i.text" :value="i.value" :label="i.text">
        </el-option>
      </el-select>
    <p>Border type:</p>
      <el-select v-model="params.borderType">
        <el-option v-for="i in borderTypes" 
          :key="i.text" :value="i.value" :label="i.text">
        </el-option>
      </el-select>
    <p v-if="visible === true">
      <el-button  @click="$emit('update:visible', false)">Cancel</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CVEditSobel',
  model: {
    prop: 'params',
    event: 'change',
    size: 'mini',
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
      kernelValues : [
        {text:'1', value: 1},
        {text:'3', value: 3},
        {text:'5', value: 5},
        {text:'7', value: 7},
      ],
      ddepthValues : [
        {text:'8U', value: window.cv.CV_8U},
        // {text:'16S', value: window.cv.CV_16S},
        // {text:'64F', value: window.cv.CV_64F},
      ],
      borderTypes : [
        {text:'Default', value: window.cv.BORDER_DEFAULT},
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
