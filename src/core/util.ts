const local = {

  saveArray( k , arr, limit = 100 ){
    arr = arr.slice( -limit )
    return this.save( k , arr )
  },

  save( k, data) {
    return localStorage.setItem( k, JSON.stringify( data ));
  },

  remove(k){
    return localStorage.removeItem( k );
  },

  // set to null equal delete
  get( k, fill = null ){
    try{
      const _v = JSON.parse( localStorage.getItem(k) )
      return _v !== null ? _v : fill
    }catch(e){
      return fill
    }
  },
  
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

const arrObj = {
  merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          arrObj.merge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return arrObj.merge(target, ...sources);
  },

  groupBy(array, key) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      if (!acc[property]) {
        acc[property] = [];
      }
      acc[property].push(obj);
      return acc;
    }, {});
  },

  findIndex( arr, condition ){
    for( let k in arr ){
      if( condition( arr[k] ) ) return k
    }
  },

  delete( arr, key, pkey = 'id' ){
    const newArr = arr ? arr.slice() : []
    const idx = newArr.findIndex( _i => _i[pkey] === key  )
    idx > -1 && newArr.splice( idx, 1 )
    return newArr
  },

  update( arr, items, pkey = 'id' ){
    return arrObj.upsert( arr, items, pkey, false )
  },
  
  presert(  arr, items, pkey = 'id'  ){
    return arrObj.upsert( arr, items, pkey, true, true )
  },

  upsert( arr, items, pkey = 'id', canInsert = true, unshift = false ){
    const newArr = arr ? arr.slice() : []
    if( !Array.isArray(items) ) items = [items]
    items.forEach( item => {
      const index = newArr.findIndex(_i => _i[pkey] === item[pkey]);
      if (index !== -1) newArr[index] = { ...newArr[index], ...item };
      else canInsert && ( unshift ? newArr.unshift( item ) : newArr.push( item ) )
    })
    return newArr
  },
}

const copyText = function (text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return true;
}

const text = {
  omitMiddle( str, len = 8){
    if( str.length <= len ) return str
    let l = str.slice(0, len/2)
    let r = str.slice( str.length - len/2 , str.length )
    return `${l}..${r}`
  }
}

const statics = {
  'bot_avatar' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/hui.jpg',
  'logo' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/logo.svg',
  'energy' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/energy.svg',
  'icon-google' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/icon-google.svg',
  'wemp_qrcode' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/wemp_half_qrcode.jpg',
  'wxqun' : 'https://appstatic0520.oss-cn-shenzhen.aliyuncs.com/aihui/wxqun.jpg',
}

const searchParams = searchStr => {
  let re = {}
  try{
    if( searchStr.indexOf('=') > 0 ){
      searchStr.replace('?','').split('&')
        .map( _kv => _kv.split('=') )
        .forEach( _arr => re[_arr[0]] = _arr[1] )
    }
  }catch(e){}
  return re
}

function uuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 || 0x8)
    return v.toString(16)
  })
}

async function delay( ms, returnValue = null ){
  return new Promise( res => window.setTimeout( () => res( returnValue ), ms ) )
}

async function sepWords(element){
  var words = element.innerHTML.split(" ");
  for (var i = 0; i < words.length; i++) {
    var word = words[i].trim();
    if (/^[a-zA-Z]+$/.test(word)) { // 只处理纯英文单词
      var link = document.createElement("a");
      link.href = "#";
      link.innerHTML = word;
      link.onclick = function() {
        alert("You clicked on: " + element);
      };
      element.replaceChild(link, document.createTextNode(word));
    }
  }
}

const time = {

  /**
   * 2024-08-04T03:29:22.522Z => 23min ago, 2hours ago, 3days ago
   */
  ago(timestampStr) {
    const now = new Date().getTime();
    const timestamp = new Date(timestampStr).getTime();
    const diff = (now - timestamp) / 1000; // Convert to seconds
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    if (diff < minute) {
        return "just now";
    } else if (diff < hour) {
        const minutesAgo = Math.floor(diff / minute);
        return `${minutesAgo} mins ago`;
    } else if (diff < day) {
        const hoursAgo = Math.floor(diff / hour);
        return `${hoursAgo} hours ago`;
    } else {
        const daysAgo = Math.floor(diff / day);
        return `${daysAgo} days ago`;
    }
  },
  
  /**
   * 00:01:07,00 => 67.00
   * @param {string} timeString
   */
  time2seconds( timeString ){
    const [hours, minutes, seconds, milliseconds] = timeString.split(/:|,/)
    return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds) + (+milliseconds) / 1000
  },

  /**
   * 67.00 => 00:01:07,00
   * @param {number} seconds
   */
  seconds2time( seconds, withHour = false ){
    const pad = num => ("0" + num).slice(-2)
    var date = new Date(0, 0, 0, 0, 0, Number(seconds), 0);
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var secs = pad(date.getSeconds());
    // var milliseconds = date.getMilliseconds();
    return ( withHour ? ( hours + ":" ) : '' ) + minutes + ":" + secs // + "," + pad(milliseconds);
  },
}

const obj = {

  deepAssign(json, keyPath, value) {
    const keys = keyPath.split('.')
    function assignValue(obj, keys, value) {
      const key = keys[0]
      if (keys.length === 1) obj[key] = value
      else {
        if (!obj[key]) obj[key] = {}
        assignValue(obj[key], keys.slice(1), value)
      }
    }
    assignValue(json, keys, value);
    return json;
  },
  
  deepEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = obj.isObject(val1) && obj.isObject(val2);
      if ( ( areObjects && !obj.deepEqual(val1, val2) ) || ( !areObjects && val1 !== val2) ){
        return false;
      }
    }
    return true;
  },

  isObject(object){
    return object != null && typeof object === 'object';
  },
}

const repeat = ( count = 5, callback )=>{
  const res = []
  while( count > 0 ){
    res.push( callback( count ) )
    count--
  }
  return res
}

/**
   * @param {*} element 
   * @returns {Object} { ab_x, ab_y, atL, atT, ... }
   */
const getElementPosition = (element)=>{

  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  
  Object.assign(rect,{
    ab_x: rect.left + window.scrollX,
    ab_y: rect.top + window.scrollY,  
  })

  Object.assign(rect,{
    atL: rect.left < viewWidth/2,
    atT: rect.top < viewHeight/2
  })

  return rect
}

/**
 * 
 * @param {*} id element's id 
 * @param {*} classes to change
 * @param {*} revert default is add then remove, when true is remove then add.
 */
const tickClasses = ( id='theID', classes=[], revert = false )=>{
  const ele = document.getElementById(id)
  if( !ele ) console.error(`tickClasses(): no element found: #${id}`)
  else{
    classes.forEach( _c => ele.classList[ !revert ? 'add' : 'remove' ](_c) )
    window.setTimeout( () => classes.forEach( _c => ele.classList[ !revert ? 'remove' : 'add' ](_c) ), 10 )
  }
}

const util = {
  text,
  local,
  obj,
  arrObj,
  copyText,
  statics,
  searchParams,
  uuid,
  delay,
  sepWords,
  repeat,
  tickClasses,
  time,
  getElementPosition
}

export default util