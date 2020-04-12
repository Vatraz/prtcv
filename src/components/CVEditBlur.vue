<template>
  <div>
    <p>Type:</p>
    <el-select v-model="params.borderType">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text"/>
    </el-select>
    <p>Kernel size:</p>
    <p>
      <el-input-number v-model="params.ksize[0]" :min="1" :max="10"></el-input-number>
      <el-input-number v-model="params.ksize[1]" :min="1" :max="10"></el-input-number>
    </p>
    <p>Anchor:</p>
    <p>
      <el-input-number v-model="params.anchor[0]" :min="-1" :max="10"></el-input-number>
      <el-input-number v-model="params.anchor[1]" :min="-1" :max="10"></el-input-number>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CVBlur',
  model: {
    prop: 'params',
    event: 'change',
    size: 'mini',
  },
  props: {
    params: Object,
  },
  data: function() {
    return {
      typeValues : [
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
