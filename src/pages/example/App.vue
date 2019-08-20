<template>
  <div>
    <!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
    <mention v-bind:sb-list="personList" v-bind:topics="topicList"></mention>
  </div>
</template>
<script>
import mention from '../mentions/mention.vue'
export default {
  components:{
    'mention':mention
  },
  data(){
    return {
      personList:[{
        id:"001",
        text:'sb1'
      },{
        id:"002",
        text:'sb2'
      },{
        id:"003",
        text:'sb3'
      },{
        id:"004",
        text:'sb4'
      },{
        id:"005",
        text:'sb5'
      },{
        id:"006",
        text:'sb6'
      }],
      topicList:[
        {
          id:'001',
          text:'话题1'
        }, 
        {
          id:'002',
          text:'话题2'
        }, 
        {
          id:'003',
          text:'话题3'
        }, 
        {
          id:'004',
          text:'话题4'
        }
      ]
    }
  },
  mounted() {
    console.log('appmounted')
  }
}
</script>