import {
  getPasteText,
} from './paste-handle.js';
import {
  UA
} from './util.js';
import selectionAPI from './selection.js';
// import Api from '@/api/common.js';

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
      let xhr = new XMLHttpRequest();
      let form = new FormData();
      form.append('file', file);
      xhr.open('post', '/api/upload', true)
      xhr.onload = () => {
        if (xhr.status === 200) {
          var obj = JSON.parse(xhr.responseText);
          let url = obj.data.url
          $this.setLastRange();
          let img_str = `<div> <img src="${url}"></div>`;
          document.execCommand('insertHTML', false, img_str);
        }
      };
      xhr.onerror = e => {}
      xhr.send(form)

    } else {
      // 获取粘贴的文字
      let pasteText = getPasteText(e);
      pasteText = pasteText.replace(/\n/gm, '<br>');
      // let items = (e.clipboardData || window.clipboardData).items;
      $this.setLastRange();
      document.execCommand('insertHTML', false, `${pasteText}`);
    }
  });
}
export default handlePaste;