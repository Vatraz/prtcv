<template>
  <div>
      <el-tag effect="dark" size="mini">SRC <i class="el-icon-caret-right"/></el-tag>
      <el-tag v-for="panel in panels" :key="panel.id" size="mini">{{ panel.type }} <i class="el-icon-caret-right"/></el-tag>
      <el-tag effect="dark" size="mini">OUT</el-tag>
  </div>
</template>

<script>
export default {
  name: 'CVPanelEdit',
  components: {
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
div {
  text-align:center;
  margin-bottom: 1%;
}
</style>
