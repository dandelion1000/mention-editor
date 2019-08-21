<template>
  <div class="app">
    <!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
    <mention emotj v-bind:sb-list="personList" v-bind:topics="topicList"></mention>
  </div>
</template>
<script>
import mention from 'mentioneditor'
// import mention from '../mentions/mention.vue'
export default {
  components:{
    'mention':mention
  },
  data(){
    return {
      personList:[{
        id:"001",
        text:'安格勒'
      },{
        id:"002",
        text:'冯小小'
      },{
        id:"003",
        text:'umor官方'
      },{
        id:"004",
        text:'小明'
      },{
        id:"005",
        text:'王小二'
      },{
        id:"006",
        text:'赵大福'
      }],
      topicList:[
        {
          id:'001',
          text:'热门话题1'
        }, 
        {
          id:'002',
          text:'热门话题2'
        }, 
        {
          id:'003',
          text:'热门话题3'
        }, 
        {
          id:'004',
          text:'热门话题4'
        }
      ]
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">
  .app{
    margin: 30px;
    max-width: 560px
  }
</style>