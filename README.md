
```
npm 地址:https://www.npmjs.com/package/mentioneditor

```
##### install
```
yarn add mentioneditor
```
##### how to use 
```javascript
<template>
  <div>
    <mention-editor :topics="list1"></mention-editor>
  </div>
</template>
<script>
import mentionEditor from 'mentioneditor'
export default {
  components:{
    'mention-editor':mentionEditor
  },
  data(){
    return {
      list1:[
        {
          id:'001',
          text:'话题1'
        },
        {
          id:'002',
          text:'话题2'
        }
      ]
    }
  }
}
</script>
```
when we need @sb,we just v-bind:sb-list="xxxList" 
when we neew mention #some topic,we just v-bind:topics is ok