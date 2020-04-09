<template>
  <div>
    <el-button type="success" size="mini" @click="dialogVisible = true">Add</el-button>
    <el-dialog title="Add panel" :visible.sync="dialogVisible">
      <el-select :default-first-option="true" v-model="panelAddedType">
        <el-option v-for="panelType in panelTypes" 
          :key="panelType" :value="panelType" :label="panelType"/>
      </el-select>
      <CVThresh v-if="panelAddedType==='THRESH'" v-model="panelAddedParams"/>
      <CVColor v-else-if="panelAddedType==='COLOR'" v-model="panelAddedParams"/>

      <p>
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="success" size="medium" @click="add">Add</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import {CVPanelsLib} from '@/config.js';
import CVThresh from '@/components/CVThresh.vue';
import CVColor from '@/components/CVColor.vue';

export default {
  name: 'CVPanelAddDialog',
  components: {
    CVThresh,
    CVColor,
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
      let newPanel = {
        type: this.panelAddedType,
        params: this.panelAddedParams,
        visible: false,
      }
      this.panels.push(newPanel)
    },
  },
  watch: {
    panelAddedType() {
      this.panelAddedParams = {}
      for (let panelTemplate of CVPanelsLib.panelTemplates) {
        if (panelTemplate.type === this.panelAddedType){
          Object.assign(this.panelAddedParams, panelTemplate.params)
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
</style>
