<template>
  <div class="main">
  <el-container element-loading-text="Loading OpenCV..." v-loading="loading">
    <!-- PANELS EDIT -->
    <el-aside v-if="!hiddenAside" width="230px">
      <CVPanelsEdit v-model="panels"/>
    </el-aside>
    <!-- IMG COLUMN -->
    <el-main>
      <!-- if aside is hidden -->
      <el-row v-if="hiddenAside" style="text-align:right">
        <el-button  @click="hiddenAsideVisible = true" type="text">
          EDIT COMPONENTS
        </el-button>
        <el-drawer direction="ltr" size="230px" :visible.sync="hiddenAsideVisible" :with-header="false">
          <CVPanelsEdit v-model="panels"/>
        </el-drawer>
      </el-row>
      <!-- component brief -->
      <el-row>
        <el-col :span="3">
          <el-switch v-model="srcImageCol" :active-value="12" :inactive-value="0">
          </el-switch>
        </el-col>
        <el-col :span="18">
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
        <el-col :span="3">
        </el-col>
      </el-row>
      <!-- IMAGES -->
      <el-row >
        <el-col :hidden="!Boolean(srcImageCol)" :span="srcImageCol">
          <img  src="@/assets/cats.png" ref="img" class="center"/>
        </el-col>
        <el-col :span="24 - srcImageCol">
          <canvas id="dstimg" ref="dstimg" class="center"/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import CVPanelsEdit from '@/components/CVPanelsEdit.vue'
import { CVPanelsLib } from '@/config.js'
import { Notification } from 'element-ui';

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
      loading: true,
      hiddenAside: false,
      hiddenAsideVisible: false,
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
      let cv = window.cv
      let dst = cv.imread(this.$refs.img)
      for (let panel of this.panels){
        let p = panel.params
        if (panel.type === 'THRESH'){
          cv.threshold(dst, dst, p.thresh, p.maxval, p.type)
        } 
        else if (panel.type === 'COLOR'){
          cv.cvtColor(dst, dst, p.type)
        } 
        else if (panel.type === 'BLUR'){
          let ksize = new cv.Size(p.ksize[0], p.ksize[1]);
          let anchor = new cv.Point(p.anchor[0], p.anchor[1]);
          cv.blur(dst, dst, ksize, anchor, p.borderType)
        } 
        else if (panel.type === 'CANNY'){
          if (!this.validInputIMG(dst, panel, 1)) break
          cv.Canny(dst, dst, p.threshold1, p.threshold2, p.apertureSize, p.L2gradient)
        } 
        else if (panel.type === 'DILATE' || panel.type === 'ERODE'){
          if (!this.validInputIMG(dst, panel, 1)) break
          let M = cv.Mat.ones(p.kernel[0], p.kernel[1], cv.CV_8U)
          let anchor = new cv.Point(p.anchor[0], p.anchor[1]);
          if (panel.type === 'ERODE')
            cv.erode(dst, dst, M, anchor, p.iterations, p.borderType, cv.morphologyDefaultBorderValue())
          else
            cv.dilate(dst, dst, M, anchor, p.iterations, p.borderType, cv.morphologyDefaultBorderValue())
        } 
        else if (panel.type === 'SOBEL'){
          if (!this.validInputIMG(dst, panel, 1)) break
          cv.Sobel(dst, dst, p.ddepth, p.dx, p.dy, p.ksize, p.scale, p.delta, p.borderType)
        }
      }
      cv.imshow(this.$refs.dstimg, dst)
    },
    validInputIMG(image, panel, channelEx) {
      if (image.channels() !== channelEx) {
        Notification.error({
          title: 'Error',
          message: `Panel ${panel.type}:
          input image has ${image.channels()} channels (expected ${channelEx})`,
        })
        return false
      }
      return true
    },
    onloadOpenCV() {  
      window.cv['onRuntimeInitialized'] = () => {
        let obj = {}
        Object.assign(obj, CVPanelsLib.panelTemplates[2])
        this.panels.push(obj)  
        this.loading = false
      }
    },
    onResize() {
      if (window.innerWidth < 768)
        this.hiddenAside = true
      else 
        this.hiddenAside = false
    }
  },
  mounted() {
    // load OpenCV
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = 'async'
    script.src = `opencv.js`
    script.onload = this.onloadOpenCV
    document.body.appendChild(script)

    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>

<style scoped>
.center {
  max-width: 100%;
  height: auto;
  display: block;
  margin-block-start: 2%;
  margin-left: auto;
  margin-right: auto;
}

a{
  margin-left: 2px;
}
div.main {
  width: 100%
}
div.image{
  text-align: center;

    align-items: center;
  margin-bottom: 5px;
}
.el-row {
  margin: 1px;
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
  height: 100%;
}
.el-aside {
  height: 100%;
  margin: 0px;
  border-right: 1px dotted #909399;
  background-color: #F0F0F0;
}
.el-main {
  width: 100%;
  height: 100%;
}
</style>
