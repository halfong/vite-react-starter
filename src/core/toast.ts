import { Toastify } from 'toastify-js'
import "toastify-js/src/toastify.css"
import util from './util'

/**
 * @param {string} text
 * @param {string} level 'info' or 'error'
 * @returns 
 */
const speed = 60/260 * 1000 * 1.2 // 260 is the read speed by words per minute
const CONFIGS:{ [key:string]:object } = {
  info : {
    style : {
      background: '#1c2127', // 'rgba(17,136,238,.05)',
      color:'#1188EE',
      border:'1px #1188EE solid',
    }
  },
  error : {
    style : {
      background: '#1f1b1c', // 'rgba(255,51,51,.02)',
      color:'#ff3333',
      border:'1px #ff3333 solid',
    }
  }
}

const toast = function( text:string, level = 'info' ){
  Toastify(util.arrObj.merge(
    {
      duration: level === 'error' ? 3000 :  speed * text.split(/\s+/).length + 1000,
      close: true,
      gravity:'bottom',
      position:'right',
      text,
      // config.node = typeof text === 'string' ? defaultNode( text ) : text
      // @ts-ignore
      // onClick(){ toast.hideToast() },
      style: {
        fontSize: '16px',
        borderRadius: '16px',
        width:'92%',
        maxWidth:'400px',
      },
      
    },
    CONFIGS[level] || CONFIGS['info']
  )).showToast()
  return true
}

// const defaultNode = ( text, style = {} )=>{
//   const node = document.createElement("p");
//   node.className = 'tapable'
//   node.onclick = Toastify().hideToast
//   node.innerText = text
//   Object.keys( style ).forEach( _k => node.style[_k] = style[_k] )
//   return node
// }

export default toast