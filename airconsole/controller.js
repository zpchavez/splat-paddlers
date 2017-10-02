!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};t.m=e,t.c=n,t.p="/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(1),c=n(6),s=o(c),f=n(3),p=o(f),h=n(5),d=o(h),_=n(4),b=o(_),y=n(2),v=o(y),m=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return v.default.onMessage=function(e,t){if(e===AirConsole.SCREEN&&t.controller)switch(t.controller){case"MainMenu":n.setState({controller:b.default,props:t.props});break;case"AdvancedController":n.setState({controller:p.default});break;case"SimpleController":n.setState({controller:d.default,props:t.props});break;case"Waiting":n.setState({controller:s.default})}},n.state={controller:s.default,props:{}},n}return u(t,e),a(t,[{key:"render",value:function(){return(0,l.h)(this.state.controller,this.state.props)}}]),t}(l.Component);(0,l.render)((0,l.h)(m,null),document.body)},function(e,t,n){!function(){"use strict";function t(){}function n(e,n){var o,r,i,u,a=A;for(u=arguments.length;u-- >2;)M.push(arguments[u]);for(n&&null!=n.children&&(M.length||M.push(n.children),delete n.children);M.length;)if((r=M.pop())&&void 0!==r.pop)for(u=r.length;u--;)M.push(r[u]);else"boolean"==typeof r&&(r=null),(i="function"!=typeof e)&&(null==r?r="":"number"==typeof r?r=String(r):"string"!=typeof r&&(i=!1)),i&&o?a[a.length-1]+=r:a===A?a=[r]:a.push(r),o=i;var l=new t;return l.nodeName=e,l.children=a,l.attributes=null==n?void 0:n,l.key=null==n?void 0:n.key,void 0!==N.vnode&&N.vnode(l),l}function o(e,t){for(var n in t)e[n]=t[n];return e}function r(e,t){return n(e.nodeName,o(o({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function i(e){!e.__d&&(e.__d=!0)&&1==W.push(e)&&(N.debounceRendering||R)(u)}function u(){var e,t=W;for(W=[];e=t.pop();)e.__d&&S(e)}function a(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&l(e,t.nodeName):n||e._componentConstructor===t.nodeName}function l(e,t){return e.__n===t||e.nodeName.toLowerCase()===t.toLowerCase()}function c(e){var t=o({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function s(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.__n=e,n}function f(e){var t=e.parentNode;t&&t.removeChild(e)}function p(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===U.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var u=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,d,u):e.removeEventListener(t,d,u),(e.__l||(e.__l={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)h(e,t,null==o?"":o),null!=o&&!1!==o||e.removeAttribute(t);else{var a=r&&t!==(t=t.replace(/^xlink\:?/,""));null==o||!1===o?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function h(e,t,n){try{e[t]=n}catch(e){}}function d(e){return this.__l[e.type](N.event&&N.event(e)||e)}function _(){for(var e;e=L.pop();)N.afterMount&&N.afterMount(e),e.componentDidMount&&e.componentDidMount()}function b(e,t,n,o,r,i){D++||(V=null!=r&&void 0!==r.ownerSVGElement,z=null!=e&&!("__preactattr_"in e));var u=y(e,t,n,o,i);return r&&u.parentNode!==r&&r.appendChild(u),--D||(z=!1,i||_()),u}function y(e,t,n,o,r){var i=e,u=V;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),m(e,!0))),i.__preactattr_=!0,i;var a=t.nodeName;if("function"==typeof a)return j(e,t,n,o);if(V="svg"===a||"foreignObject"!==a&&V,a=String(a),(!e||!l(e,a))&&(i=s(a,V),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),m(e,!0)}var c=i.firstChild,f=i.__preactattr_,p=t.children;if(null==f){f=i.__preactattr_={};for(var h=i.attributes,d=h.length;d--;)f[h[d].name]=h[d].value}return!z&&p&&1===p.length&&"string"==typeof p[0]&&null!=c&&void 0!==c.splitText&&null==c.nextSibling?c.nodeValue!=p[0]&&(c.nodeValue=p[0]):(p&&p.length||null!=c)&&v(i,p,n,o,z||null!=f.dangerouslySetInnerHTML),w(i,t.attributes,f),V=u,i}function v(e,t,n,o,r){var i,u,l,c,s,p=e.childNodes,h=[],d={},_=0,b=0,v=p.length,g=0,w=t?t.length:0;if(0!==v)for(var C=0;C<v;C++){var T=p[C],E=T.__preactattr_,O=w&&E?T._component?T._component.__k:E.key:null;null!=O?(_++,d[O]=T):(E||(void 0!==T.splitText?!r||T.nodeValue.trim():r))&&(h[g++]=T)}if(0!==w)for(var C=0;C<w;C++){c=t[C],s=null;var O=c.key;if(null!=O)_&&void 0!==d[O]&&(s=d[O],d[O]=void 0,_--);else if(!s&&b<g)for(i=b;i<g;i++)if(void 0!==h[i]&&a(u=h[i],c,r)){s=u,h[i]=void 0,i===g-1&&g--,i===b&&b++;break}s=y(s,c,n,o),l=p[C],s&&s!==e&&s!==l&&(null==l?e.appendChild(s):s===l.nextSibling?f(l):e.insertBefore(s,l))}if(_)for(var C in d)void 0!==d[C]&&m(d[C],!1);for(;b<=g;)void 0!==(s=h[g--])&&m(s,!1)}function m(e,t){var n=e._component;n?k(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||f(e),g(e))}function g(e){for(e=e.lastChild;e;){var t=e.previousSibling;m(e,!0),e=t}}function w(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||p(e,o,n[o],n[o]=void 0,V);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||p(e,o,n[o],n[o]=t[o],V)}function C(e){var t=e.constructor.name;(G[t]||(G[t]=[])).push(e)}function T(e,t,n){var o,r=G[e.name];if(e.prototype&&e.prototype.render?(o=new e(t,n),x.call(o,t,n)):(o=new x(t,n),o.constructor=e,o.render=E),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.__b=r[i].__b,r.splice(i,1);break}return o}function E(e,t,n){return this.constructor(e,n)}function O(e,t,n,o,r){e.__x||(e.__x=!0,(e.__r=t.ref)&&delete t.ref,(e.__k=t.key)&&delete t.key,!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.__c||(e.__c=e.context),e.context=o),e.__p||(e.__p=e.props),e.props=t,e.__x=!1,0!==n&&(1!==n&&!1===N.syncComponentUpdates&&e.base?i(e):S(e,1,r)),e.__r&&e.__r(e))}function S(e,t,n,r){if(!e.__x){var i,u,a,l=e.props,s=e.state,f=e.context,p=e.__p||l,h=e.__s||s,d=e.__c||f,y=e.base,v=e.__b,g=y||v,w=e._component,C=!1;if(y&&(e.props=p,e.state=h,e.context=d,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(l,s,f)?C=!0:e.componentWillUpdate&&e.componentWillUpdate(l,s,f),e.props=l,e.state=s,e.context=f),e.__p=e.__s=e.__c=e.__b=null,e.__d=!1,!C){i=e.render(l,s,f),e.getChildContext&&(f=o(o({},f),e.getChildContext()));var E,j,x=i&&i.nodeName;if("function"==typeof x){var P=c(i);u=w,u&&u.constructor===x&&P.key==u.__k?O(u,P,1,f,!1):(E=u,e._component=u=T(x,P,f),u.__b=u.__b||v,u.__u=e,O(u,P,0,f,!1),S(u,1,n,!0)),j=u.base}else a=g,E=w,E&&(a=e._component=null),(g||1===t)&&(a&&(a._component=null),j=b(a,i,f,n||!y,g&&g.parentNode,!0));if(g&&j!==g&&u!==w){var M=g.parentNode;M&&j!==M&&(M.replaceChild(j,g),E||(g._component=null,m(g,!1)))}if(E&&k(E),e.base=j,j&&!r){for(var A=e,R=e;R=R.__u;)(A=R).base=j;j._component=A,j._componentConstructor=A.constructor}}if(!y||n?L.unshift(e):C||(e.componentDidUpdate&&e.componentDidUpdate(p,h,d),N.afterUpdate&&N.afterUpdate(e)),null!=e.__h)for(;e.__h.length;)e.__h.pop().call(e);D||r||_()}}function j(e,t,n,o){for(var r=e&&e._component,i=r,u=e,a=r&&e._componentConstructor===t.nodeName,l=a,s=c(t);r&&!l&&(r=r.__u);)l=r.constructor===t.nodeName;return r&&l&&(!o||r._component)?(O(r,s,3,n,o),e=r.base):(i&&!a&&(k(i),e=u=null),r=T(t.nodeName,s,n),e&&!r.__b&&(r.__b=e,u=null),O(r,s,1,n,o),e=r.base,u&&e!==u&&(u._component=null,m(u,!1))),e}function k(e){N.beforeUnmount&&N.beforeUnmount(e);var t=e.base;e.__x=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?k(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.__b=t,f(t),C(e),g(t)),e.__r&&e.__r(null)}function x(e,t){this.__d=!0,this.context=t,this.props=e,this.state=this.state||{}}function P(e,t,n){return b(n,e,{},!1,t,!1)}var N={},M=[],A=[],R="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,U=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,W=[],L=[],D=0,V=!1,z=!1,G={};o(x.prototype,{setState:function(e,t){var n=this.state;this.__s||(this.__s=o({},n)),o(n,"function"==typeof e?e(n,this.props):e),t&&(this.__h=this.__h||[]).push(t),i(this)},forceUpdate:function(e){e&&(this.__h=this.__h||[]).push(e),S(this,2)},render:function(){}});var H={h:n,createElement:n,cloneElement:r,Component:x,render:P,rerender:u,options:N};e.exports=H}()},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=new AirConsole},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=n(2),c=function(e){return e&&e.__esModule?e:{default:e}}(l),s=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={touches:0,touching:null},n.onTouchStart=n.onTouchStart.bind(n),n.onTouchEnd=n.onTouchEnd.bind(n),n}return i(t,e),u(t,[{key:"componentDidUpdate",value:function(e,t){t.touching!==this.state.touching&&(t.touching&&t.touching.split("-").forEach(function(e){c.default.message(AirConsole.SCREEN,"release-"+e)}),this.state.touching&&this.state.touching.split("-").forEach(function(e){c.default.message(AirConsole.SCREEN,"press-"+e)}))}},{key:"sendMessage",value:function(e){c.default.message(AirConsole.SCREEN,e)}},{key:"onTouchStart",value:function(e){var t=this;this.setState(function(n){var o=Object.assign({},n);return"action"===e.target.getAttribute("id")?t.sendMessage("press-action"):(o.touching=e.target.getAttribute("id"),o.touches+=1),o})}},{key:"onTouchEnd",value:function(e){this.setState(function(t){var n=Object.assign({},t);if("action"!==e.target.getAttribute("id"))return n.touches-=1,0===n.touches&&(n.touching=null),n})}},{key:"render",value:function(){var e=1*screen.width,t=1*screen.height,n={margin:0,padding:0,fontSize:"2em",border:"1px solid black"};return(0,a.h)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",height:t,marginTop:"3em"}},(0,a.h)("button",{id:"left-up",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/3},n)},"↑"),(0,a.h)("button",{id:"action",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/6},n)},"Release"),(0,a.h)("button",{id:"right-down",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/3},n)},"↓"),(0,a.h)("div",{style:{width:12,height:t-10}}))}}]),t}(a.Component);t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=n(2),c=function(e){return e&&e.__esModule?e:{default:e}}(l),s=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"startGame",value:function(e){c.default.message(AirConsole.SCREEN,e)}},{key:"render",value:function(){var e=this.props.activePlayers,t={border:"1px solid black",width:"100%",height:"3em",fontSize:"2em",marginBottom:"1em"};return(0,a.h)("div",null,(0,a.h)("h1",null,"Splat Paddlers"),(0,a.h)("div",null,(0,a.h)("button",{style:t,onClick:this.startGame.bind(this,"1-player")},"1 Player (PRACTICE)")),(0,a.h)("div",null,(0,a.h)("button",{disabled:e<2,style:t,onClick:this.startGame.bind(this,"2-players")},"2 Players")),(0,a.h)("div",null,(0,a.h)("button",{disabled:e<4,style:t,onClick:this.startGame.bind(this,"4-players-teams")},"4 Players (Teams)")),(0,a.h)("div",null,(0,a.h)("button",{disabled:e<4,style:t,onClick:this.startGame.bind(this,"4-players-vs")},"4 Players (Vs)")))}}]),t}(a.Component);t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=n(2),c=function(e){return e&&e.__esModule?e:{default:e}}(l),s=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={touches:0,touching:null},n.onTouchStart=n.onTouchStart.bind(n),n.onTouchEnd=n.onTouchEnd.bind(n),n}return i(t,e),u(t,[{key:"componentDidUpdate",value:function(e,t){t.touching!==this.state.touching&&(t.touching&&c.default.message(AirConsole.SCREEN,"release-"+t.touching),this.state.touching&&c.default.message(AirConsole.SCREEN,"press-"+this.state.touching))}},{key:"sendMessage",value:function(e){c.default.message(AirConsole.SCREEN,e)}},{key:"onTouchStart",value:function(e){var t=this;this.setState(function(n){var o=Object.assign({},n);return"action"===e.target.getAttribute("id")?t.sendMessage("press-action"):(o.touching=e.target.getAttribute("id"),o.touches+=1),o})}},{key:"onTouchEnd",value:function(e){this.setState(function(t){var n=Object.assign({},t);if("action"!==e.target.getAttribute("id"))return n.touches-=1,0===n.touches&&(n.touching=null),n})}},{key:"render",value:function(){var e=1*screen.width,t=1*screen.height,n={margin:0,padding:0,fontSize:"2em",border:"1px solid black"};return(0,a.h)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",height:t,marginTop:"3em"}},(0,a.h)("button",{id:"horizontal"===this.props.orientation?"left":"up",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/3},n)},"↑"),(0,a.h)("button",{id:"action",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/6},n)},"Release"),(0,a.h)("button",{id:"horizontal"===this.props.orientation?"right":"down",onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,style:Object.assign({width:e-32,height:t/3},n)},"↓"))}}]),t}(a.Component);t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(1),l=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return(0,a.h)("h1",null,"Waiting for Player 1 to make a selection")}}]),t}(a.Component);t.default=l}]);