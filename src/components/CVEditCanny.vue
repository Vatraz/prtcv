<template>
  <div>
    <p>Threshold 1:</p>
      <el-slider show-input v-model.number="params.threshold1" :min="0" :max="255"/>
    <p>Threshold 2:</p>
      <el-slider show-input v-model.number="params.threshold2" :min="0" :max="255"/>
    <p>Aperture size:</p>
      <el-input-number v-model="params.apertureSize" :min="1" :max="10"/>
    <p>Edge gradient:</p>
      <el-select v-model="params.L2gradient">
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
  name: 'CVEditCanny',
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
      typeValues : [
        {text:'|Gx|+|Gy|', value: false},
        {text:'sqrt(Gx2 + Gy2)', value: true},
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
