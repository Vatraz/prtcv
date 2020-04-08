<template>
  <div>
    <h1>{{ msg }} a pierwszy to {{ items }}</h1>
    <div>
      <input type="file" id="file" name="files" @change="selectIMG" accept="image/*"/>
      <button @click="loadIMG">Load</button>
    </div>
    <ul>
      <li v-for="(item, index) in items" :key=index>
        <CVThresh v-if="item.text==='THRESH'" v-model="item.params"/>
        <CVColor v-else-if="item.text==='COLOR'" v-model="item.params"/>
        <button @click="up(index)">up</button>
        <button @click="down(index)">down</button>
        <button @click="remove(index)">delete</button>
      </li>
    </ul>
    <button @click="processIMG">Process</button>
    <div>
      <img src="@/assets/logo.png" ref="img" class="img">
      <canvas id="dstimg" ref="dstimg" class="imgcanvas"></canvas>
    </div>
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
      panelTypes: [
        {text:'THRESH', params: {thresh:0, maxval:0, type:0}},
        {text:'COLOR', params: {type:11}}
      ],
      items: [
        {text:'COLOR', params: {type:11}},
        {text:'THRESH', params: {thresh:0, maxval:0, type:0}},
      ]
    }
  },
  methods:{
    selectIMG(evt) {
      console.log(this.$refs)
      let files = evt.target.files
      if (!files.length) return
      this.imgurl = URL.createObjectURL(files[0])
      console.log('file',files[0])
    },
    loadIMG() {
      if (typeof this.imgurl === 'undefined') return
      this.$refs.img.src = this.imgurl
    },
    processIMG() {
      let cv = this.$cv
      let dst = cv.imread(this.$refs.img)

      console.log('procesik')
      for (let item of this.items){
        let p = item.params

        if (item.text === 'THRESH'){
          cv.threshold(dst, dst, p.thresh, p.maxval, p.type)
        }else if (item.text === 'COLOR'){
          
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
      let temp = this.items[index]
      this.items[index] = this.items[index+1]
      this.items[index+1] = temp
    },
    remove(index) {
      this.items.splice(index, 1)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
