<template>
  <div>
    <el-row class="panels" v-for="(panel, index) in panels" :key=index>
        <el-button-group>
            <el-button type="primary" size="mini" @click="panel.visible = true">{{ panel.type }}</el-button>
                <el-dialog :title="panel.type" :visible.sync="panel.visible">
                    <CVThresh v-if="panel.type==='THRESH'" v-model="panel.params"/>
                    <CVColor v-else-if="panel.type==='COLOR'" v-model="panel.params"/>
                </el-dialog>
            <el-button type="info" size="mini" @click="down(index)" :disabled="index==panels.length-1?true:false" 
                icon="el-icon-arrow-down"></el-button>
            <el-button type="info" size="mini" @click="up(index)" :disabled="index==0?true:false" 
                icon="el-icon-arrow-up"></el-button>
            <el-button type="danger" size="mini" @click="remove(index)" icon="el-icon-delete"></el-button>
        </el-button-group>
    </el-row>          
        <CVPanelAdd v-model="panels"></CVPanelAdd>
  </div>
</template>

<script>
import CVColor from '@/components/CVColor.vue';
import CVThresh from '@/components/CVThresh.vue';
import CVPanelAdd from '@/components/CVPanelAdd.vue';


export default {
  name: 'CVPanelEdit',
  components: {
    CVThresh,
    CVColor,
    CVPanelAdd,
  },
  model: {
    prop: 'panels',
    event: 'change'
  },
  data: function() {
    return{
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
</style>
