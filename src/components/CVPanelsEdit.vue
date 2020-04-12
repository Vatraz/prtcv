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
              <el-button type="warning" size="mini" @click="panelVisibleIdx = null">{{ panel.type }}</el-button>
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
          <CVEditBlur v-if="panel.type==='BLUR'" v-model="panel.params"/>
          <CVEditCanny v-else-if="panel.type==='CANNY'" v-model="panel.params"/>
          <CVEditColor v-else-if="panel.type==='COLOR'" v-model="panel.params"/>
          <CVEditErodeDilate v-else-if="panel.type==='DILATE'" v-model="panel.params"/>
          <CVEditErodeDilate v-else-if="panel.type==='ERODE'" v-model="panel.params"/>
          <CVEditSobel v-else-if="panel.type==='SOBEL'" v-model="panel.params"/>
          <CVEditThresh v-else-if="panel.type==='THRESH'" v-model="panel.params"/>
        </template>
      </p>
    </el-col>
  </div>
</template>

<script>
import CVEditBlur from '@/components/CVEditBlur.vue';
import CVEditCanny from '@/components/CVEditCanny.vue';
import CVEditColor from '@/components/CVEditColor.vue';
import CVEditErodeDilate from '@/components/CVEditErodeDilate.vue';
import CVEditSobel from '@/components/CVEditSobel.vue';
import CVEditThresh from '@/components/CVEditThresh.vue';
import CVPanelAddDialog from '@/components/CVPanelAddDialog.vue';


export default {
  name: 'CVPanelsEdit',
  components: {
    CVEditBlur,
    CVEditCanny,
    CVEditColor,
    CVEditErodeDilate,
    CVEditSobel,
    CVEditThresh,
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
}
p {
    margin-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;

}
</style>
