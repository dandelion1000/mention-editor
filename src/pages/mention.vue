<template>
  <div id="app" class="um-container-editor white-bg">
    <div 
      class="tribute-container" 
      v-if="isPop"
    >
      <ul >
        <li 
          v-for="(elem,index) in labels" :key="index"
          data-index="0" 
          :class="{'highlight':curIndex==index}"  
          @click="insertTp">
          {{elem.title}}
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
           @paste="onPaste"
      >
      </div>
      <div class="editor-icon">
        <i class="icon-emoij" @click="showEmotj"></i>
      </div>
      <div class="emot-icons" v-if="showEmo" @click="stopFlase">
        <div class="emotj-item" v-for="(elem, index) in emotjlist" :key="index" >
          <b class="pointer" @click="clickEmotion(index)">{{elem.char}}</b>
        </div>
      </div>
    </div>

    <div class="u-tags pull-left">
      <template v-for="item in labels.slice(0,4)">
        <a :key="item.id" class="labels" @click="clickLabel">#{{ item.title }}#</a>
      </template>
    </div>
  </div>
</template>
<script>
import { getPasteText } from './utils/paste-handle.js';

import posxy from './getFocusPos';
import emotjson from './emojis.js'
export default {
  props: {
    html: String,
  },
  data() {
    return {
      isPop: false,
      showEmo:false,
      editorHtml: '',
      curIndex:0,
      labels: [{
        id:'001',
        title:'悠一下'
      }, 
      {
        id:'002',
        title:'开心一刻'
      }, 
      {
        id:'003',
        title:'摸鱼咯'
      }, 
      {
        id:'004',
        title:'打卡'
      }],
      disnone: false,
      lastEditRange: null,
      currentSelection: null,
      topicList: [],
      poxobj: {},
      emotjlist:[]
    };
  },
  mounted() {
    this.emotjlist = emotjson;
    let $self = this;
    document.addEventListener('click', function ($event) {
      let event = $event || window.event;
      $self.showEmo = false;
      event.stopPropagation();
    });
  },
  methods: {
    onPaste($event) {
      $event.preventDefault();
      let editor = $event.target;
      editor.focus();
      // let pasteHtml = getPasteHtml($event, false, true);
      let pasteText = getPasteText($event);
      pasteText = pasteText.replace(/\n/gm, '<br>');
      document.execCommand('insertHTML', false,  `${pasteText}`);
    },
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
      let text = (type == 1) ? (`${val}# `) : ` ${val} `;
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
      if ($event.key === '#') {
        this.isPop = true;
        setTimeout(() => {
          document.querySelector('.tribute-container').style.cssText = `top: ${this.poxobj.y+18}px;left: ${this.poxobj.x}px`;
        });
      }
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
    dealArrowCode(direction){
      const optionIndex = this.labels.length -1
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
#app {
    font-family: Avenir,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
/*修改聚焦时的边框*/
*:focus,*:active ,*:link{
    outline: none;
}
.um-container-editor {
  width:600px;
  margin: 30px;
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
        min-height: 150px;
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
            min-height: 120px;
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
                background-image: url(../assets/emoij.png);
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
  font-size: 14px;
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
