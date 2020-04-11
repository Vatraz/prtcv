<template>
  <div>
    <el-button type="success" @click="dialogVisible = true">Add</el-button>
    <el-dialog title="Add panel" :visible.sync="dialogVisible">
      <el-select :default-first-option="true" v-model="panelAddedType">
        <el-option v-for="panelType in panelTypes" 
          :key="panelType" :value="panelType" :label="panelType"/>
      </el-select>
      <CVEditColor v-if="panelAddedType==='COLOR'" v-model="panelAddedParams"/>
      <CVEditBlur v-else-if="panelAddedType==='BLUR'" v-model="panelAddedParams"/>
      <CVEditThresh v-else-if="panelAddedType==='THRESH'" v-model="panelAddedParams"/>

      <p>
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="success" @click="add">Add</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import {CVPanelsLib} from '@/config.js';
import CVEditBlur from '@/components/CVEditBlur.vue';
import CVEditColor from '@/components/CVEditColor.vue';
import CVEditThresh from '@/components/CVEditThresh.vue';

export default {
  name: 'CVPanelAddDialog',
  components: {
    CVEditBlur,
    CVEditColor,
    CVEditThresh,
  },
  model: {
    prop: 'panels',
    event: 'change'
  },
  props: {
    panels: Array,
  },
  data: function(){
    return {
      dialogVisible: false,
      panelTemplates: CVPanelsLib.panelTemplates,
      panelTypes: [],
      panelAddedType: '',
      panelAddedParams: {},
      panelAddedAccept: false,
    }
  },
  methods:{
    add() {
      let newPanel = {}
      Object.assign(newPanel, {
        type: this.panelAddedType,
        params: this.panelAddedParams,
        visible: false
        })
      this.panels.push(newPanel)
      
      this.dialogVisible = false
      this.panelAddedParams = {}
      this.panelAddedType = ''
    },
  },
  watch: {
    panelAddedType(newValue, oldValue) {
      if (oldValue == newValue) return
      this.panelAddedParams = {}
      for (let panelTemplate of CVPanelsLib.panelTemplates) {
        if (panelTemplate.type === this.panelAddedType){
          this.panelAddedParams = JSON.parse(JSON.stringify(panelTemplate.params))
        }
      }
    }, 
  },
  mounted() {
    for (let panelTemplate of CVPanelsLib.panelTemplates) {
      this.panelTypes.push(panelTemplate.type) 
    }
  },
}
</script>

<style scoped>
.el-dialog {
  width: 80%;
}
</style>
