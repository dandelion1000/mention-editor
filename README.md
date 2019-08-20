
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
```
when we need @sb,we just v-bind:sb-list="xxxList" 
```
![图片](https://coding-net-production-pp-ci.codehub.cn/66a1f353-8db2-4357-90b7-82fc0fa080c9.png)

```
when we need mention #some topic,we just v-bind:topics is ok
```
![图片](https://coding-net-production-pp-ci.codehub.cn/3dc08130-4814-48c4-b82c-677d013c3446.png)
