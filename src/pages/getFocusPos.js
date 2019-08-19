/*js how to get rich-text  px position*/
const getSelectionCoords = (win) => {
  /**
     * 获取输入光标在页面中的坐标
     * @param        {HTMLElement}    输入框元素
     * @return        {Object}        返回left和top,bottom
     */
  //https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
  //https://bugs.webkit.org/show_bug.cgi?id=65324
  win = win || window;
  let doc = win.document;
  let sel = doc.selection,
    range, rects, rect;
  let x = 0,
    y = 0;
  if (sel) {
    if (sel.type != 'Control') {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {
        range.collapse(true);
        rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }
        // 光标在行首时，rect为undefined
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
      // Fall back to inserting a temporary element
      if ((x == 0 && y == 0) || rect === undefined) {
        let span = doc.createElement('span');
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'));
          range.insertNode(span);
          rect = span.getClientRects()[0];
          x = rect.left;
          y = rect.top;
          let spanParent = span.parentNode;
          spanParent.removeChild(span);

          // Glue any broken text nodes back together
          spanParent.normalize();
        }
      }
    }
  }
  return {
    x: x,
    y: y
  };
}




export default {
  getSelectionCoords
};