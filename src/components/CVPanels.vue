<template>
  <div>
    <el-row class="panels" v-for="(panel, index) in panels" :key=index>
      <el-button type="primary" size="mini" @click="panel.visible = true">{{ panel.type }}</el-button>
      <el-dialog :title="panel.type" :visible.sync="panel.visible">
          <CVThresh v-if="panel.type==='THRESH'" v-model="panel.params"/>
          <CVColor v-else-if="panel.type==='COLOR'" v-model="panel.params"/>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import CVColor from '@/components/CVColor.vue';
import CVThresh from '@/components/CVThresh.vue';

export default {
  name: 'CVPanelEdit',
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
  methods:{
  },
}
</script>

<style scoped>
</style>
