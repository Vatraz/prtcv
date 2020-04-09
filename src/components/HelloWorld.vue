<template>
  <div>
    <el-row>
      <input type="file" id="file" name="files" @change="selectIMG" accept="image/*"/>
      <button @click="loadIMG">Load</button>
    </el-row>
    <el-row>
      <el-button @click="processIMG">Process</el-button>
    </el-row>
    <el-row>
      <el-col :span=10>
        <el-row v-for="(item, index) in items" :key=index>
          <el-card shadow="hover">
            <el-col :span=16>
              <el-button type="primary" @click="item.visible = true">{{ item.type }}</el-button>
              <el-dialog :title="item.type" :visible.sync="item.visible">
                <CVThresh v-if="item.type==='THRESH'" v-model="item.params"/>
                <CVColor v-else-if="item.type==='COLOR'" v-model="item.params"/>
              </el-dialog>
            </el-col>
            <el-col align="right" :span=8>
              <el-button-group>
                <el-button type="info" size="mini" @click="down(index)" :disabled="index==items.length-1?true:false" 
                  icon="el-icon-arrow-down"></el-button>
                <el-button type="info" size="mini" @click="up(index)" :disabled="index==0?true:false" 
                  icon="el-icon-arrow-up"></el-button>
              </el-button-group>
              <el-button-group>
                <el-button type="primary" size="mini" @click="item.visible = true" icon="el-icon-edit"></el-button>
                  <el-dialog :title="item.type" :visible.sync="item.visible">
                    <CVThresh v-if="item.type==='THRESH'" v-model="item.params"/>
                    <CVColor v-else-if="item.type==='COLOR'" v-model="item.params"/>
                  </el-dialog>
                <el-button type="danger" size="mini" @click="remove(index)" icon="el-icon-delete"></el-button>
              </el-button-group>
            </el-col>
          </el-card>
        </el-row>
      </el-col>
      <el-col align="center" :span=14>
        <el-row>
          <img src="@/assets/logo.png" ref="img" class="image">
        </el-row>
        <el-row>
          <canvas id="dstimg" ref="dstimg" class="imgcanvas"></canvas>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CVColor from '@/components/CVColor.vue';
import CVThresh from '@/components/CVThresh.vue';

export default {
  name: 'HelloWorld',
  components: {
    CVThresh,
    CVColor,
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      fileList: [],
      panelTypes: [
        {type:'THRESH', params: {thresh:100, maxval:255, type:0}, visible:false},
        {type:'COLOR', params: {type:11}, visible:false}
      ],
      items: [
        {type:'COLOR', params: {type:11}, visible:false},
        {type:'THRESH', params: {thresh:100, maxval:255, type:0}, visible:false},
      ],
      imgurl: '',
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
      console.log(this.$refs.img.src)
      console.log(typeof this.$refs.img.src)
      this.$refs.img.src = this.imgurl
    },
    lloadIMG() {
      if (typeof this.imgurl === 'undefined') return
      console.log(this.$refs.img.src)
      console.log(typeof this.$refs.img.src)
      this.$refs.img.src = this.imgurl
    },
    processIMG() {
      let cv = this.$cv
      let dst = cv.imread(this.$refs.img)

      console.log('procesik')
      for (let item of this.items){
        let p = item.params

        if (item.type === 'THRESH'){
          cv.threshold(dst, dst, p.thresh, p.maxval, p.type)
        }else if (item.type === 'COLOR'){
          
          cv.cvtColor(dst, dst, p.type)
        }
      }
      cv.imshow(this.$refs.dstimg, dst)
      dst.delete()
    },
    up(index) {
      if (index === 0) return
      let rows = [this.items[index], this.items[index-1]]
      this.items.splice(index-1, 2, rows[0], rows[1] )
    },
    down(index) {
      if (index === this.items.length-1) return
      let rows = [this.items[index], this.items[index+1]]
      this.items.splice(index, 2, rows[1], rows[0] )
    },
    remove(index) {
      this.items.splice(index, 1)
    },
  },
  mounted() {
    this.imgsrc = this.$refs.img.src
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.image {
  max-width: 100%;
  height: auto;
}
</style>
