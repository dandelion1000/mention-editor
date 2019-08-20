import $ from './dom-core.js';
import {
  getPasteText,
  getPasteHtml,
} from './paste-handle.js';
import {
  UA
} from './util.js';
import selectionAPI from './selection.js';
import Api from '@/api/common.js';

function handlePaste($textElem, $this) {
  $textElem.selection = new selectionAPI();
  let pasteTime = 0;

  function canDo() {
    let now = Date.now();
    let flag = false;
    if (now - pasteTime >= 100) {
      // 间隔大于 100 ms ，可以执行
      flag = true;
    }
    pasteTime = now;
    return flag;
  }

  function resetTime() {
    pasteTime = 0;
  }
  // 粘贴文字
  $textElem.addEventListener('paste', e => {
    if (UA.isIE()) {
      return;
    } else {
      // 阻止默认行为，使用 execCommand 的粘贴命令
      e.preventDefault();
    }

    // 粘贴图片和文本，只能同时使用一个
    if (!canDo()) {
      return;
    }
    var items = (e.clipboardData || window.clipboardData).items;
    let file = null;
    if (items && items.length) {
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    if (file) {
      Api.uploadFile(file).then((res) => {
        $this.setLastRange();
        let img_str = `<div> <img src="${res.url}"></div>`;
        document.execCommand('insertHTML', false, img_str);
        // document.execCommand('insertImage', false, res.url )

      });
    } else {
      // 获取粘贴的文字
      // let pasteHtml = getPasteHtml(e, false, true);
      let pasteText = getPasteText(e);
      pasteText = pasteText.replace(/\n/gm, '<br>');
      let items = (e.clipboardData || window.clipboardData).items;
      console.log('items', items);
      // console.log(pasteText);

      $this.setLastRange();
      document.execCommand('insertHTML', false, `${pasteText}`);
    }
  });



  // // 粘贴图片
  // $textElem.addEventListener('paste', e => {
  //     console.log('pasteimg',e)
  //     if (UA.isIE()) {
  //         return
  //     } else {
  //         e.preventDefault()
  //     }
  //
  //     // 粘贴图片和文本，只能同时使用一个
  //     if (!canDo()) {
  //         return
  //     }
  //     var items = (e.clipboardData || window.clipboardData).items;
  //     var file = null;
  //     if (items && items.length) {
  //         // 搜索剪切板items
  //         for (var i = 0; i < items.length; i++) {
  //             if (items[i].type.indexOf('image') !== -1) {
  //                 file = items[i].getAsFile();
  //                 break;
  //             }
  //         }
  //     }
  //     console.log('file',file);
  //     if (!file) {
  //         return;
  //     }
  //
  //
  //     Api.uploadFile(file).then((res) => {
  //         $this.setLastRange();
  //         let img_str = `<div> <img src="${res.url}"></div>`;
  //         document.execCommand('insertHTML', false, img_str );
  //         // document.execCommand('insertImage', false, res.url )
  //
  //     });
  //
  // })


}
export default handlePaste;