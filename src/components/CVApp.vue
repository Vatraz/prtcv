<template>
  <div>
    <el-container>
      <el-col :span="2">
        <el-switch v-model="srcImageCol" :active-value="12" :inactive-value="0">
        </el-switch>
      </el-col>
      <el-col :span="20">
        <div class="image">
          <el-popover placement="bottom" title="Load image" width="300" trigger="hover">
            <input type="file" id="file" name="files" @change="selectIMG" accept="image/*"/>
            <el-tag slot="reference" class="button"  effect="dark" type="success" size="mini"><i class="el-icon-upload2"/></el-tag>
          </el-popover>
          <el-tag effect="dark" size="mini">SRC <i class="el-icon-caret-right"/></el-tag>
          <el-tag v-for="panel in panels" :key="panel.id" size="mini">{{ panel.type }} <i class="el-icon-caret-right"/></el-tag>
          <el-tag effect="dark" size="mini">OUT</el-tag>
          <a download="output.png" :href="saveIMGurl()">
            <el-tag class="button" effect="dark" type="success" size="mini"><i class="el-icon-download"/></el-tag>
          </a>
        </div>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-container>
    <!-- IMAGES -->
    <el-container>
      <el-col :hidden="!Boolean(srcImageCol)" :span="srcImageCol">
        <img src="@/assets/cats.png" ref="img">
      </el-col>
      <el-col :span="24 - srcImageCol">
        <canvas id="dstimg" ref="dstimg" class="imgcanvas"></canvas>
      </el-col>
    <!-- PANELS EDIT -->
    </el-container>
    <el-divider content-position="left">Edit OpenCV components</el-divider>
    <CVPanelsEdit v-model="panels"></CVPanelsEdit>
  </div>
</template>

<script>
import CVPanelsEdit from '@/components/CVPanelsEdit.vue';
import {CVPanelsLib} from '@/config.js';

export default {
  name: 'CVApp',
  components: {
    CVPanelsEdit,
  },
  props: {
  },
  data: function() {
    return {
      panelTemplates: CVPanelsLib.panelTemplates,
      panels: [],
      timerSet: false,
      timerValueChanged: false,
      timerValue: 500,
      srcImageCol: 12,
    }
  },
  watch: {
    srcImageCol: {
      handler(newValue, oldValue) {
        if (newValue > oldValue) return
        this.processIMGschedule()
      }
    },
    panels: {
      handler() {
        this.processIMGschedule()
      },
      deep: true,
    },
  },
  methods:{
    selectIMG(evt) {
      let files = evt.target.files
      if (!files.length) return
      this.imgurl = URL.createObjectURL(files[0])
      if (typeof this.imgurl === 'undefined') return
      this.$refs.img.onload = this.processIMG
      this.$refs.img.src = this.imgurl
    },
    saveIMGurl() {
      if (typeof this.$refs.dstimg === 'undefined')
        return '#'
      let url = this.$refs.dstimg.toDataURL('image/png')
      return url
    },
    processIMGschedule() {
      if (!this.timerSet){
        this.timerSet = true
        setTimeout(this.timerStopFun, this.timerValue)
      } else {
        this.timerValueChanged = true
      }
    },
    timerStopFun() {
      if (this.timerValueChanged){
        this.timerValueChanged = false
        setTimeout(this.timerStopFun, this.timerValue)
      } else {
        this.timerSet = false
        this.processIMG()
      }
    },
    processIMG() {
      let cv = this.$cv
      let dst = cv.imread(this.$refs.img)
      for (let panel of this.panels){
        let p = panel.params
        if (panel.type === 'THRESH'){
          cv.threshold(dst, dst, p.thresh, p.maxval, p.type)
        }else if (panel.type === 'COLOR'){
          cv.cvtColor(dst, dst, p.type)
        }else if (panel.type === 'BLUR'){
          let ksize = new cv.Size(p.ksize[0], p.ksize[1]);
          let anchor = new cv.Point(p.anchor[0], p.anchor[1]);
          cv.blur(dst, dst, ksize, anchor, p.borderType)
        }
      }
      cv.imshow(this.$refs.dstimg, dst)
    },
  },
  mounted() {
    let obj = {}
    Object.assign(obj, CVPanelsLib.panelTemplates[0])
    this.panels.push(obj)
  },
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
a{
  margin-left: 2px;
}
div.image{
  text-align: center;
  margin-bottom: 5px;
}
.el-tag + .el-tag {
  margin-left: 2px;
}
.el-tag.button
{
  cursor: pointer;
  margin-right: 2px;
}
.el-container {
  margin-top: 2px;
}
canvas {
  max-width: 100%;
  height: auto;
}
</style>
