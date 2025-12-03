// 每个组件单独一个ts文件，组件内不同模块可以单独导出，默认导出为组件主题变量全部
// 变量命名 `${组件类型}-${组件模块(可选)}-${组件属性}`： `${默认值}`
export default {
  's-i-w-padding': '.6em',
  's-i-w-bg': 'rgb(255, 255, 255)',
  's-i-w-border-radius': '.5em',
  's-i-w-box-shadow': '0px 5px 10px 1px rgba(184, 209, 243, 0.1)',
  's-i-w-border-width': '1px',
  's-i-w-border-color': 'rgba(44, 128, 248, 1)',

  's-i-height': '2.25em',
  's-i-color': 'rgba(55, 65, 81, 1)',
  's-i-line-height': '1.25em',
  's-i-font-size': '.875em',
  's-i-padding': '.5em 4em .5em 1.5em',

  's-p-d-bg-image': 'url(../../assets/send-default.svg)',
  's-p-a-bg-image': 'url(../../assets/send-can.svg)',

  's-b-pending-background-bg': 'rgba(0, 110, 255, 0.2)',
  's-b-pending-background-width': '2em',
  's-b-pending-background-height': '2em',

  's-b-pending-bg': 'linear-gradient(90.00deg, rgb(133, 104, 254), rgb(44, 128, 248) 100%)',
  's-b-pending-width': '2em',
  's-b-pending-height': '2em',

  's-b-pending-inner-width': '.6em',
  's-b-pending-inner-height': '.6em',
}