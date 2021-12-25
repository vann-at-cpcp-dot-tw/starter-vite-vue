export const isEmpty = function( value ){
  return  value === undefined || value === null || ( typeof value === 'object' && Object.keys( value ).length === 0 ) || ( typeof value === 'string' && value.trim().length === 0 )

      // // test results
      // //---------------
      // // []        true, empty array
      // // {}        true, empty object
      // // null      true
      // // undefined true
      // // ""        true, empty string
      // // ''        true, empty string
      // // 0         false, number
      // // true      false, boolean
      // // false     false, boolean
      // // Date      false
      // // function  false

      // if (value === undefined){
      //     return true
      // }
      // if (typeof (value) == 'function' || typeof (value) == 'number' || typeof (value) == 'boolean' || Object.prototype.toString.call(value) === '[object Date]'){
      //     return false
      // }
      // if (value == null || value.length === 0){
      //     return true
      // }
      // if (typeof (value) == "object") {
      //     // empty object
      //     var r = true
      //     for (var f in value){
      //         r = false
      //     }
      //     return r
      // }
      // return false
}

export const shareFb = function(url) {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url))

}

export const shareLine = function(url, title) {
  window.open('http://line.naver.jp/R/msg/text/?' + title + '%0D%0A' + url)
}

export const shareLinkedin = function(url) {
  window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url)
}

export const shareGoogle = function(url) {
  window.open('https://plus.google.com/share?url=' + url)
}

export const numberWithCommas = function(x, digits = 0) {
  var size = Math.pow(10, digits)
  x = Math.round(x * size) / size
  if( digits != 0 ){
      if( String(x).split('.').length == 1 ){ //整數
          x = Number.parseFloat(x).toFixed(2)
      }
  }
  return isNaN(parseInt(x))?'0' :x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const numberWithKMB = function(num, digits) {

      var calcNum = num<0 ?num*-1 :num
      var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "K" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "B" },
      ]
      var rx = /$[0-9]+$/
      var i

      for (i = si.length-1; i>0; i--) {
      if (calcNum >= si[i].value) {
          break
      }
      }

      num = num / si[i].value

      return parseFloat(num).toFixed(digits) + si[i].symbol;
}

//帶小數的四捨五入，第一參數：整數或浮點數，第二參數：小數位數
export const  roundDecimal = function(val, precision=0) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
}

//取隨機數
export const rand = function(min, max){
  return Math.floor( Math.random() * (max - min + 1) ) + min
}

//創建陣列(可調增幅)
export const arrayGenerate = function(start, end, step=1){
  return Array.from(Array.from(Array(Math.ceil((end+1-start)/step)).keys()), x => start+ x*step)
}

//打亂陣列
export const arrayShuffle = function(a){
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
//產生一組不重複隨機數，需要打亂陣列和創建陣列
export const arrayRandom = function({min=0, max=2, length=2, step=1} = {min:0, max:2, length:2, step:1}){
  let arry = this.arrayGenerate(min, max, step)
  this.arrayShuffle(arry)
  return arry.slice(0, length)
}

//array chunk
export const arrayChunk = function(myArray, chunk_size){
  var index = 0
  var arrayLength = myArray.length
  var tempArray = []

  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size)
      // Do something if you want with the group
      tempArray.push(myChunk)
  }
  return tempArray
}

//取得小數點位數
export const getDecimalPlace = function(num){
  if( num!==undefined && !isNaN(num) ){
      var sep = String(23.32).match(/\D/)[0]
      var b = String(num).split(sep)
      return b[1]? b[1].length : 0
  }
}

//滾動到特定 el
export const scrollToSection = function({el, speed=800, offset=0, callback=function(){}}){

  if( $(el).length>0 ){
      $('html, body').animate({
          scrollTop: $(el).offset().top-Number($('body').css('padding-top').split('px')[0])+offset
      }, speed, function(){
          callback()
      })
  }
}

//取得 el 在螢幕上的％數
export const getItemPositionInViewport = function({el, based='top'}){
  if( $(el).length>0 ){
      switch(based){
          case 'top':
          return Math.round(($(el).offset().top-$(window).scrollTop()) * 100 / $(window).height())

          case 'bottom':
              let el_bottom_position = $(el).offset().top - $(el).outerHeight();
          return  Math.round(100*(el_bottom_position-$window.scrollTop())/($(window).height()+$(el).outerHeight()))
      }
  }
}

//補 0
export const padLeft = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

  //how to use
  // pad(10, 4);      // 0010
  // pad(9, 4);       // 0009
  // pad(123, 4);     // 0123
  // pad(10, 4, '-'); // --10
}


export const charBytes = function(str){
  return str.replace(/[^\x00-\xff]/g,"xx").length
}

export const isElInViewport = (el) => {
  // Special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

export const strWidth = function(text='', fontCssProps = '1rem'){
  const dom = $('<div></div>')
  .text(text)
  .css({
      'position': 'absolute',
      'white-space': 'nowrap',
      'visibility': 'hidden',
      'font': fontCssProps
  })
  .appendTo($('body'))
  const width = dom.width();
  dom.remove();
  return width
}


