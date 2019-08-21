<template>
  <div class="um-container-editor white-bg">
    <div 
      class="tribute-container" 
      v-show="isPop"
    >
      <ul >
        <li 
          v-for="(elem,index) in mentions" :key="index"
          data-index="0" 
          :class="{'highlight':curIndex==index}"  
          @click="insertTp($event,index)">
          {{elem.text}}
        </li>
      </ul>
    </div>
    <div class="pp-editor">
      <div id="um-editor"
           class="editor-content"
           contenteditable="true"
           placeholder="#悠一下# 今天摸鱼了吗"
           @keyup="dealMentionPop"
           @input="editorInput"
           @click="getFocus"
      >
      </div>
      <div class="editor-icon" v-if="emotj">
        <i class="icon-emoij" @click="showEmotj"></i>
      </div>
      <div class="emot-icons" v-if="showEmo" @click="stopFlase">
        <div class="emotj-item" v-for="(elem, index) in emotjlist" :key="index" >
          <b class="pointer" @click="clickEmotion(index)">{{elem.char}}</b>
        </div>
      </div>
    </div>

    <div class="u-tags pull-left" v-if="topics.length">
      <template v-for="item in topics.slice(0,3)">
        <a :key="item.id" class="labels" @click="clickLabel">#{{ item.text }}#</a>
      </template>
    </div>
  </div>
</template>
<script>
import handlePaste from './utils/deal-paste.js';
import posxy from './getFocusPos';
import emotjson from './emojis.js'
export default {
  props: {
    emotj:{
      type: Boolean,
      default: false
    },
    sbList:{
      type:Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default:function(){
        return []
      }
    },
    topics:{
      type:Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default:function(){
        return []
      }
      // validator: function (value) {
      //   // 这个值必须匹配下列字符串中的一个
      //   return value.length!==0
      // }
  
    },
  },
  data() {
    return {
      isPop: false,
      mentions:[],
      showEmo:false,
      editorHtml: '',
      curIndex:0,
      disnone: false,
      lastEditRange: null,
      currentSelection: null,
      topicList: [],
      poxobj: {},
      emotjlist: [],
      curMentionType: ''
    };
  },
  mounted() {
    let $textElem = document.querySelector('#um-editor'), $self = this;
    handlePaste($textElem, this);
    this.emotjlist = emotjson;
    document.addEventListener('click', function ($event) {
      let event = $event || window.event;
      $self.showEmo = false;
      event.stopPropagation();
    });
  },
  methods: {
    stopFlase(){
      event.stopPropagation();
    },
    showEmotj($event) {
      let event = $event || window.event;
      this.showEmo = true;
      event.stopPropagation();
    },
    clickEmotion(elem) {
      this.setLastRange();
      document.execCommand('insertText', false, `:${elem}:`);
      this.showEmo = false;
    },
    /*
        光标位置插入选定标签文本
        */
    clickLabel($event, type) {
      let val = $event.target.innerText;
      let mention = this.curMentionType
      let distext = mention==='#' ? `${val}# ` : `${val} `
      let text = (type == 1) ? (distext) : ` ${val} `;
      this.setLastRange();
      document.execCommand('insertText', false, text);
    },

    getFocus() {
      //保存每次光标变动时候的位置，只需要记录文本的click事件
      const sels = window.getSelection();
      // 设置最后光标对象
      const range = sels.getRangeAt(0);
      this.lastEditRange = range;

    },
    editorInput() {
      //编辑文本input事件的时候获取光标的位置
      const sels = window.getSelection();
      const range = sels.getRangeAt(0);
      if (range.startOffset > 0) {
        this.lastEditRange = range;
      }
      this.poxobj = posxy.getSelectionCoords();
    },
    dealMentionPop($event) {
      if ($event.keyCode == 32) {
        this.isPop = false;
      }
      this.popWhichMention($event)
      if (!this.isPop) {
        return
      }
      if ($event.key === 'ArrowUp') {
        this.dealArrowCode(-1);
      }
      // prev
      if ($event.key === 'ArrowDown') {
        this.dealArrowCode(1);
      }
    },
    popWhichMention($event){
      // console.log('$event.key',$event.key)
      // console.log('this.sbList',this.sbList)
      const show = ()=>{
        document.querySelector('.tribute-container').style.cssText = `top: ${this.poxobj.y+18}px;left: ${this.poxobj.x}px`;
        setTimeout(() => {
          this.isPop = true;
        });
      }
      if ($event.key === '#' && this.topics.length>0) {
        this.curMentionType = '#'
        this.mentions = this.topics
        show()
      } else if($event.key === '@' && this.sbList.length>0){
        this.curMentionType = '@'
        this.mentions = this.sbList
        show()
      }
    },
    dealArrowCode(direction){
      const optionIndex = this.topics.length -1
      const cur = this.curIndex
      if (direction > 0) {
        if(cur-optionIndex<0){
          this.curIndex++
        }else {
          this.curIndex = 0
        }
      } else {
        if (cur===0) {
          this.curIndex = optionIndex
        }else {
          this.curIndex--
        }
      }
    },
    insertTp($event) {
      this.clickLabel($event, 1);
      this.closePop();
    },
    closePop() {
      this.isPop = false;
    },
    setLastRange() {
      const editor = document.querySelector('#um-editor');
      editor.focus();
      const sels = window.getSelection();
      // 判断是否有最后光标对象存在
      if (this.lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        sels.removeAllRanges();
        sels.addRange(this.lastEditRange);
      }
    },

    /*添加代码段``` ```时光标位置*/
    resetRange(startContainer, startOffset, endContainer, endOffset) {
      let selection = window.getSelection();
      selection.removeAllRanges();
      let range = document.createRange();
      range.setStart(startContainer, startOffset);
      range.setEnd(endContainer, endOffset);
      selection.addRange(range);
    },


  }
};
</script>
<style lang="less">
/*修改聚焦时的边框*/
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
*:focus,*:active ,*:link{
    outline: none;
}
.um-container-editor {
  font-family: Avenir,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
    .u-tags {
        margin-top: 20px;
        text-align: left;
        font-size: 13px;
        a {
            color: #76808e;
            margin-right: 10px;
            &:hover {
                color: #323a45;
            }
        }

    }
    .pp-editor {
        position: relative;
        min-height: 130px;
        border: 1px solid #eee;
        border-radius: 5px;
        text-align: left;
        .emot-icons {
            z-index: 100;
            width: 300px;
            position: absolute;
            right: -1px;
            border: 1px solid #eee;
            background: #fff;
            /* border-radius: 4px; */
            text-align: left;
            padding: 10px;
            .emotj-item {
                font-size: 18px;
                display: inline-block;
            }
        }
        .editor-content {
            padding: 10px 10px 30px;
            min-height: 130px;
            word-break: break-all;
            word-wrap: break-word;
            .hixl {
                padding: 5px;
                background: #efefef;
                border-radius: 5px;
            }
            img {
                // width: 100%;
                max-width: 100%;
                // max-height: 200px;
            }
        }
        .editor-icon {
            height: 30px;
            line-height: 30px;
            position: absolute;
            bottom: 5px;
            right: 5px;
            font-size: 20px;
            .icon-emoij {
                display: inline-block;
                width: 25px;
                height: 22px;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url(./assets/emoij.png);
                background-size: 25px 22px;
            }
        }
    }

}

// Tribute-specific styles
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 13px;
  cursor: pointer;
  font-size: 15px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
