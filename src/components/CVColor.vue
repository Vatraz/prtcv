<template>
  <div>
    <p>Type:</p>
    <el-select :default-first-option="true" v-model="params.type">
      <el-option v-for="typeValue in typeValues" 
        :key="typeValue.text" :value="typeValue.value" :label="typeValue.text"/>
    </el-select>
    <!-- <p v-if="visible === true">
      <el-button  @click="$emit('update:visible', false)">Cancel</el-button>
    </p> -->
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
    // visible: {
    //   type: Boolean,
    //   default: false,
    //   required: false,
    // }
  },
  data: function() {
    return {
      typeValues : [
        {text:'BRG > GRAY', value: this.$cv.COLOR_RGBA2GRAY},
        {text:'GRAY > BRG', value: this.$cv.COLOR_GRAY2RGBA},
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
