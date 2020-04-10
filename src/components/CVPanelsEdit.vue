<template>
  <div>
    <el-col :span=12>
      <p v-for="(panel, index) in panels" :key=index>
        <el-button-group>
            <el-button type="danger" size="mini" @click="remove(index)" icon="el-icon-delete"></el-button>
            <el-button type="info" size="mini" @click="down(index)" :disabled="index==panels.length-1?true:false" 
                icon="el-icon-arrow-down"></el-button>
            <el-button type="info" size="mini" @click="up(index)" :disabled="index==0?true:false" 
                icon="el-icon-arrow-up"></el-button>
            <template v-if="panelVisibleIdx === index">
              <el-button type="info" size="mini" @click="panelVisibleIdx = null">{{ panel.type }}</el-button>
            </template>
            <template v-else>
              <el-button type="primary" size="mini" @click="panelVisibleIdx = index">{{ panel.type }}</el-button>
            </template>
        </el-button-group>
      </p>
      <p><CVPanelAddDialog v-model="panels"></CVPanelAddDialog></p>
    </el-col>
    <el-col :class="{ bcg: editActive}" :span=12>
      <p v-for="(panel, index) in panels" :key=index>
        <template v-if="panelVisibleIdx === index">
          <CVThresh v-if="panel.type==='THRESH'" v-model="panel.params"/>
          <CVBlur v-else-if="panel.type==='BLUR'" v-model="panel.params"/>
          <CVColor v-else-if="panel.type==='COLOR'" v-model="panel.params"/>
        </template>
      </p>
    </el-col>
  </div>
</template>

<script>
import CVBlur from '@/components/CVBlur.vue';
import CVColor from '@/components/CVColor.vue';
import CVThresh from '@/components/CVThresh.vue';
import CVPanelAddDialog from '@/components/CVPanelAddDialog.vue';


export default {
  name: 'CVPanelEdit',
  components: {
    CVBlur,
    CVColor,
    CVThresh,
    CVPanelAddDialog,
  },
  model: {
    prop: 'panels',
    event: 'change'
  },
  data: function() {
    return{
      panelVisibleIdx: null,
    }
  },
  computed: {
    editActive() {
      if (this.panelVisibleIdx === null) return false
      if (this.panelVisibleIdx > this.panels.length - 1) return false
      return true
    }
  },
  props: {
    panels: Array,
  },
  methods:{
    up(index) {
      if (index === 0) return
      let rows = [this.panels[index], this.panels[index-1]]
      this.panels.splice(index-1, 2, rows[0], rows[1] )
    },
    down(index) {
      if (index === this.panels.length-1) return
      let rows = [this.panels[index], this.panels[index+1]]
      this.panels.splice(index, 2, rows[1], rows[0] )
    },
    remove(index) {
      this.panels.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.el-row {
    margin-bottom: 5px;
}
.bcg {
  background: 5px #C0C4CC;
}
div.center {
  text-align:center;  
  /* margin-bottom: 1%; */
}
p {
    margin-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;

}
</style>
