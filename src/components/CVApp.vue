<template>
  <div>
    <el-row>
      <input type="file" id="file" name="files" @change="selectIMG" accept="image/*"/>
      <button @click="loadIMG">Load</button>
      <el-button @click="processIMG">Process</el-button>
    </el-row>
    <CVPanelsBrief v-model="panels"></CVPanelsBrief>
    <el-collapse>
      <el-collapse-item title="CV flow" name="4">
        <CVPanelsEdit v-model="panels"></CVPanelsEdit>
      </el-collapse-item>
    </el-collapse>
    <el-container>
        <el-col span:12>
          <img src="@/assets/logo.png" ref="img" class="image">
        </el-col>
        <el-col span:12>
          <canvas id="dstimg" ref="dstimg" class="imgcanvas"></canvas>
        </el-col>
    </el-container>
  </div>
</template>

<script>
import CVPanelsBrief from '@/components/CVPanelsBrief.vue';
import CVPanelsEdit from '@/components/CVPanelsEdit.vue';
import {CVPanelsLib} from '@/config.js';

export default {
  name: 'CVApp',
  components: {
    CVPanelsBrief,
    CVPanelsEdit,
  },
  props: {
  },
  data: function() {
    return {
      panelTemplates: CVPanelsLib.panelTemplates,
      panels: [],
      imgurl: '',
      dialogPanelsVisible: false,
    }
  },
  methods:{
    selectIMG(evt) {
      let files = evt.target.files
      if (!files.length) return
      this.imgurl = URL.createObjectURL(files[0])
    },
    loadIMG() {
      if (typeof this.imgurl === 'undefined') return
      this.$refs.img.src = this.imgurl
    },
    lloadIMG() {
      if (typeof this.imgurl === 'undefined') return
      this.$refs.img.src = this.imgurl
    },
    processIMG() {
      let cv = this.$cv
      let dst = cv.imread(this.$refs.img)

      console.log('procesik')
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
.image {
  max-width: 100%;
  height: auto;
}
</style>
