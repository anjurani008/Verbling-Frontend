(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[15],{2081:function(n,e){var t=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");n.exports=function(n){return t.test(n)}},2155:function(n,e,t){var r=t(827),o=t(2426),i=t(2081),u=t(66),a=t(2427),c=t(2429),s=t(2432),f=t(379),l=t(802),d=/\w*$/;n.exports=function(n,e){var t=30,v="...";if(u(e)){var p="separator"in e?e.separator:p;t="length"in e?f(e.length):t,v="omission"in e?r(e.omission):v}var m=(n=l(n)).length;if(i(n)){var g=s(n);m=g.length}if(t>=m)return n;var x=t-c(v);if(x<1)return v;var h=g?o(g,0,x).join(""):n.slice(0,x);if(void 0===p)return h+v;if(g&&(x+=h.length-x),a(p)){if(n.slice(x).search(p)){var w,y=h;for(p.global||(p=RegExp(p.source,l(d.exec(p))+"g")),p.lastIndex=0;w=p.exec(y);)var S=w.index;h=h.slice(0,void 0===S?x:S)}}else if(n.indexOf(r(p),x)!=x){var b=h.lastIndexOf(p);b>-1&&(h=h.slice(0,b))}return h+v}},2426:function(n,e,t){var r=t(799);n.exports=function(n,e,t){var o=n.length;return t=void 0===t?o:t,!e&&t>=o?n:r(n,e,t)}},2427:function(n,e,t){var r=t(2428),o=t(257),i=t(393),u=i&&i.isRegExp,a=u?o(u):r;n.exports=a},2428:function(n,e,t){var r=t(190),o=t(143);n.exports=function(n){return o(n)&&"[object RegExp]"==r(n)}},2429:function(n,e,t){var r=t(2430),o=t(2081),i=t(2431);n.exports=function(n){return o(n)?i(n):r(n)}},2430:function(n,e,t){var r=t(828)("length");n.exports=r},2431:function(n,e){var t="[\\ud800-\\udfff]",r="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",o="\\ud83c[\\udffb-\\udfff]",i="[^\\ud800-\\udfff]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",a="[\\ud800-\\udbff][\\udc00-\\udfff]",c="(?:"+r+"|"+o+")"+"?",s="[\\ufe0e\\ufe0f]?"+c+("(?:\\u200d(?:"+[i,u,a].join("|")+")[\\ufe0e\\ufe0f]?"+c+")*"),f="(?:"+[i+r+"?",r,u,a,t].join("|")+")",l=RegExp(o+"(?="+o+")|"+f+s,"g");n.exports=function(n){for(var e=l.lastIndex=0;l.test(n);)++e;return e}},2432:function(n,e,t){var r=t(2433),o=t(2081),i=t(2434);n.exports=function(n){return o(n)?i(n):r(n)}},2433:function(n,e){n.exports=function(n){return n.split("")}},2434:function(n,e){var t="[\\ud800-\\udfff]",r="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",o="\\ud83c[\\udffb-\\udfff]",i="[^\\ud800-\\udfff]",u="(?:\\ud83c[\\udde6-\\uddff]){2}",a="[\\ud800-\\udbff][\\udc00-\\udfff]",c="(?:"+r+"|"+o+")"+"?",s="[\\ufe0e\\ufe0f]?"+c+("(?:\\u200d(?:"+[i,u,a].join("|")+")[\\ufe0e\\ufe0f]?"+c+")*"),f="(?:"+[i+r+"?",r,u,a,t].join("|")+")",l=RegExp(o+"(?="+o+")|"+f+s,"g");n.exports=function(n){return n.match(l)||[]}},4368:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(0);function o(){return(o=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}function i(n){var e=n.viewSize,t=n.align,r={start:function(){return 0},center:function(n){return o(n)/2},end:o};function o(n){return e-n}return{measure:function(n){return"number"==typeof t?e*Number(t):r[t](n)}}}function u(n){return n?n/Math.abs(n):0}function a(n,e){return Math.abs(n-e)}function c(n){var e=Math.pow(10,n);return function(n){return Math.round(n*e)/e}}function s(n){return Object.keys(n).map(Number)}function f(n,e){var t=n.classList;e&&t.contains(e)&&t.remove(e)}function l(n,e){var t=n.classList;e&&!t.contains(e)&&t.add(e)}function d(n){var e=n.start,t=n.limit,r=n.loop,o=t.min,i=t.max,a=t[r?"loop":"constrain"],c=a(e);function s(){return c}function f(n){return c=a(n),l}var l={add:function n(e){if(0!==e){var t=u(e);return f(s()+t),n(e+-1*t)}return l},clone:function(){return d({start:s(),limit:t,loop:r})},get:s,max:i,min:o,set:f};return l}function v(){var n=[];var e={add:function(t,r,o,i){return void 0===i&&(i=!1),t.addEventListener(r,o,i),n.push((function(){return t.removeEventListener(r,o,i)})),e},removeAll:function(){return n=n.filter((function(n){return n()})),e}};return e}function p(n){var e=n;function t(n){return e/=n,o}function r(n){return"number"==typeof n?n:n.get()}var o={add:function(n){return e+=r(n),o},divide:t,get:function(){return e},multiply:function(n){return e*=n,o},normalize:function(){return 0!==e&&t(e),o},set:function(n){return e=r(n),o},subtract:function(n){return e-=r(n),o}};return o}function m(n){var e=n.target,t=n.scrollBody,r=n.dragFree,o=n.animation,i=n.axis,c=n.scrollTo,s=n.root,f=n.dragTracker,l=n.location,d=n.events,m=n.limit,g=n.direction,x=i.scroll,h=i.cross,w=["INPUT","SELECT","TEXTAREA"],y=p(0),S=p(0),b=p(0),T=v(),M=v(),E={mouse:2.5,touch:3.5},A={mouse:5,touch:7},z=r?5:12,D=!1,P=!1,O=!1,I=!1;function L(n){if(!(I="mousedown"===n.type)||0===n.button){var r,o,i=a(e.get(),l.get())>=2,u=I||!i,c=(r=n.target,o=r.nodeName||"",!(w.indexOf(o)>-1)),v=i||I&&c;D=!0,f.pointerDown(n),b.set(e),e.set(l),t.useBaseMass().useSpeed(80),function(){var n=I?document:s;M.add(n,"touchmove",B).add(n,"touchend",C).add(n,"mousemove",B).add(n,"mouseup",C)}(),y.set(f.readPoint(n,x)),S.set(f.readPoint(n,h)),d.emit("pointerDown"),u&&(O=!1),v&&n.preventDefault()}}function B(n){if(!P&&!I){if(!n.cancelable)return C();var t=f.readPoint(n,x).get(),r=f.readPoint(n,h).get(),i=a(t,y.get()),u=a(r,S.get());if(!(P=i>u)&&!O)return C()}var c=f.pointerMove(n);!O&&c&&(O=!0),o.start(),e.add(g.applyTo(c)),n.preventDefault()}function C(){var o=f.pointerUp()*(r?A:E)[I?"mouse":"touch"],i=function(e){var t=n.scrollTarget,o=n.index,i=!(t.byDistance(0,!1).index!==o.get())&&Math.abs(e)>4,a=e+l.get();if(i&&!r&&!m.reachedAny(a)){var c=o.clone().add(-1*u(e));return t.byIndex(c.get(),0).distance}return t.byDistance(e,!r).distance}(g.applyTo(o)),s=function(n,e){if(0===n||0===e)return 0;if(Math.abs(n)<=Math.abs(e))return 0;var t=a(Math.abs(n),Math.abs(e));return Math.abs(t/n)}(o,i);a(e.get(),b.get())>=.5&&!I&&(O=!0),P=!1,D=!1,M.removeAll(),t.useSpeed(z+z*s),c.distance(i,!r),I=!1,d.emit("pointerUp")}function k(n){O&&n.preventDefault()}return{addActivationEvents:function(){var n=s;T.add(n,"touchmove",(function(){})).add(n,"touchend",(function(){})).add(n,"touchstart",L).add(n,"mousedown",L).add(n,"touchcancel",C).add(n,"contextmenu",C).add(n,"click",k)},clickAllowed:function(){return!O},pointerDown:function(){return D},removeAllEvents:function(){T.removeAll(),M.removeAll()}}}function g(n){var e=n.axis,t=n.pxToPercent,r=e.scroll,o={x:"clientX",y:"clientY"},i=p(0),u=p(0),a=p(0),c=p(0),s=[],f=(new Date).getTime(),l=!1;function d(n,e){l=!n.touches;var t=o[e],r=l?n[t]:n.touches[0][t];return c.set(r)}return{pointerDown:function(n){var e=d(n,r);return i.set(e),a.set(e),t.measure(i.get())},pointerMove:function(n){var e=d(n,r),o=(new Date).getTime(),i=o-f;return i>=10&&(i>=100&&(s=[]),s.push(e.get()),f=o),u.set(e).subtract(a),a.set(e),t.measure(u.get())},pointerUp:function(){var n=(new Date).getTime()-f,e=a.get(),r=s.slice(-5).map((function(n){return e-n})).sort((function(n,e){return Math.abs(n)<Math.abs(e)?1:-1}))[0];return a.set(n>100||!r?0:r),s=[],t.measure(a.get())},readPoint:d}}function x(n){var e=n.min,t=n.max,r=Math.abs(e-t);function o(n){return n<e}function i(n){return n>t}function u(n){return o(n)||i(n)}return{constrain:function(n){return u(n)?o(n)?e:t:n},length:r,loop:function(n){return u(n)?o(n)?t:e:n},max:t,min:e,reachedAny:u,reachedMax:i,reachedMin:o,removeOffset:function(n){if(e===t)return n;for(;o(n);)n+=r;for(;i(n);)n-=r;return n}}}function h(n){var e=n.location,t=n.speed,r=n.mass,o=c(2),i=p(0),a=p(0),s=p(0),f=0,l=t,d=r;function v(n){return l=n,g}function m(n){return d=n,g}var g={direction:function(){return f},seek:function(n){s.set(n).subtract(e);var t,r,o=s.get(),c=(r=0)+(o-(t=0))/(100-t)*(l-r);return f=u(s.get()),s.normalize().multiply(c).subtract(i),function(n){n.divide(d),a.add(n)}(s),g},settle:function(n){var t=n.get()-e.get(),r=!o(t);return r&&e.set(n),r},update:function(){i.add(a),e.add(i),a.multiply(0)},useBaseMass:function(){return m(r)},useBaseSpeed:function(){return v(t)},useMass:m,useSpeed:v};return g}function w(n){var e=n.limit,t=n.location,r=n.scrollBody,o=!1;return{constrain:function(n,i){if(function(n){return!o&&(!!e.reachedAny(n.get())&&!!e.reachedAny(t.get()))}(n)){var u=i?.7:.4,a=n.get()-t.get();n.subtract(a*u),!i&&Math.abs(a)<10&&(n.set(e.constrain(n.get())),r.useSpeed(10).useMass(3))}},toggleActive:function(n){o=!n}}}function y(n){var e=n.alignment,t=n.contentSize,r=n.viewSize,o=x({min:-t+r,max:0}),i=[e.measure(t)],u=t>r;return{measure:function(n,e){var t=n.map(o.constrain),r=function(n){var e=n[0],t=n[n.length-1];return x({min:n.lastIndexOf(e)+1,max:n.indexOf(t)})}(t),a=r.min,c=r.max;return u?e?t.slice(a-1,c+1):t:i}}}function S(n){var e=n.contentSize,t=n.location,r=n.limit,o=n.pxToPercent,i=x({min:r.min+o.measure(.1),max:r.max+o.measure(.1)}),u=i.reachedMin,a=i.reachedMax;return{loop:function(n,r){if(function(n){return 1===n?a(t.get()):-1===n&&u(t.get())}(r)){var o=e*(-1*r);n.forEach((function(n){return n.add(o)}))}}}}function b(n){var e=n.loop,t=n.limit,r=n.scrollSnaps,o=n.contentSize,i=t.reachedMax,u=t.reachedAny,a=t.removeOffset;function c(n,e){return Math.abs(n)<Math.abs(e)?n:e}function s(n,t){var r=n,i=n+o,u=n-o;if(!e)return r;if(!t)return c(c(r,i),u);var a=c(r,1===t?i:u);return Math.abs(a)*t}return{byDistance:function(t,o){var c=n.target.get()+t,f=function(n){var e=a(n);return{index:r.map((function(n){return n-e})).map((function(n){return s(n,0)})).map((function(n,e){return{diff:n,index:e}})).sort((function(n,e){return Math.abs(n.diff)-Math.abs(e.diff)}))[0].index,distance:e}}(c),l=function(t,r){if(!(!e&&u(t)))return r;var o=n.index,a=o.min,c=o.max;return i(t)?a:c}(c,f.index),d=!e&&u(c);return!o||d?{index:l,distance:t}:{index:l,distance:t+s(r[l]-f.distance,0)}},byIndex:function(e,t){return{index:e,distance:s(r[e]-n.target.get(),t)}},shortcut:s}}function T(n){var e,t=n.axis,r=n.location,o=n.slidesInView,i=n.direction,u=n.contentSize,a=n.viewSize,c=n.slideSizes,f=n.scrollSnaps,l=s(c),d=s(c).reverse(),v=(e=f[0]-1,x(g(d,e),"end")).concat(function(){var n=a-f[0]-1;return x(g(l,n),"start")}()),p="x"===t.scroll?"left":"top";function m(n,e){return n.reduce((function(n,e){return n-c[e]}),e)}function g(n,e){return n.reduce((function(n,t){return m(n,e)>0?n.concat([t]):n}),[])}function x(n,e){var t="start"===e,i=t?-u:u,a=o.findSlideBounds(i);return n.map((function(n){var e=t?0:-u,o=t?u:0,i=a.filter((function(e){return e.index===n}))[0][t?"end":"start"];return{point:i,getTarget:function(){return r.get()>i?e:o},index:n,location:-1}}))}return{canLoop:function(){return v.every((function(n){var e=n.index;return m(l.filter((function(n){return n!==e})),a)<=0}))},clear:function(n){v.forEach((function(e){var t=e.index;n[t].style[p]=""}))},loop:function(n){v.forEach((function(e){var t=e.getTarget,r=e.location,o=e.index,u=t();u!==r&&(n[o].style[p]=i.applyTo(u)+"%",e.location=u)}))},loopPoints:v}}function M(n){var e=n.scrollTo,t=n.slidesToScroll,r=n.root,o=v(),i=o.removeAll,u=0;function a(n){9===n.keyCode&&(u=(new Date).getTime())}function c(n,i){o.add(n,"focus",(function(){if(!((new Date).getTime()-u>10)){r.scrollLeft=0;var n=Math.floor(i/t);e.index(n,0)}}),!0)}return{addActivationEvents:function(n){o.add(document,"keydown",a,!1),n.forEach(c)},removeAllEvents:i}}function E(n){var e=n.axis,t=n.container,r=n.direction,o=t.style,i="x"===e.scroll?function(n){return"translate3d("+n+"%,0px,0px)"}:function(n){return"translate3d(0px,"+n+"%,0px)"},u=c(2),a=!1,s=0;return{clear:function(){o.transform="",s=0},to:function(n){var e=u(n.get());a||s===e||(getComputedStyle(t).transform,o.transform=i(r.applyTo(e)),s=e)},toggleActive:function(n){a=!n}}}function A(n,e,t,r,o){var u,a,c,f,l,v=r.align,A=r.axis,z=r.direction,D=r.startIndex,P=r.inViewThreshold,O=r.loop,I=r.speed,L=r.dragFree,B=r.slidesToScroll,C=r.containScroll,k=function(n){var e="y"===n?"y":"x";return{cross:"y"===n?"x":"y",measure:function(n){var t=n.getBoundingClientRect(),r=t.width,o=t.height;return"x"===e?r:o},scroll:e}}(A),_=(u=k.measure(e),{measure:function(n){return n/u*100},totalPercent:100}),j=_.totalPercent,N=t.map(k.measure).map(_.measure),U=s(N),V=function(n,e){for(var t=[],r=0;r<n.length;r+=e)t.push(n.slice(r,r+e));return t}(N,B).map((function(n){return n.reduce((function(n,e){return n+e}))})),F=N.reduce((function(n,e){return n+e}),0),R=i({align:v,viewSize:j}),H=function(n){var e,t=n.snapSizes,r=n.alignment,o=n.loop,i=t.map(r.measure),u=(e=d({limit:x({min:0,max:t.length-1}),start:0,loop:o}),t.map((function(n,t){var r=e.set(t+1).get();return n+i[t]-i[r]})));return{measure:function(n){return u.slice(0,n).reduce((function(n,e){return n-e}),i[0])}}}({snapSizes:V,alignment:R,loop:O}),q=s(V).map(H.measure),K=y({alignment:R,contentSize:F,viewSize:j}),X=!O&&""!==C,G="trimSnaps"===C,Y=K.measure(q,G),$=X?Y:q,J=function(n){var e=n.contentSize,t=n.loop;return{measure:function(n){var r=n[0],o=n[n.length-1];return x({min:t?r-e:o,max:r})}}}({loop:O,contentSize:F}).measure($),Q=function(n){var e="rtl"===n?-1:1;return{applyTo:function(n){return n*e}}}(z),W=d({limit:x({min:0,max:Math.max(0,$.length-1)}),start:D,loop:O}),Z=W.clone(),nn=function(n){var e=0;function t(n,t){return function(){n===!!e&&t()}}function r(){e=window.requestAnimationFrame(n)}return{proceed:t(!0,r),start:t(!1,r),stop:t(!0,(function(){window.cancelAnimationFrame(e),e=0}))}}((function(){O||fn.scrollBounds.constrain(rn,fn.dragHandler.pointerDown()),fn.scrollBody.seek(rn).update();var n=fn.scrollBody.settle(rn);n&&!fn.dragHandler.pointerDown()&&(fn.animation.stop(),o.emit("settle")),n||o.emit("scroll"),O&&(fn.scrollLooper.loop(on,fn.scrollBody.direction()),fn.slideLooper.loop(t)),fn.translate.to(tn),fn.animation.proceed()})),en=$[W.get()],tn=p(en),rn=p(en),on=[tn,rn],un=h({location:tn,speed:I,mass:1}),an=b({contentSize:F,index:W,limit:J,loop:O,scrollSnaps:$,target:rn}),cn=function(n){var e=n.index,t=n.scrollTarget,r=n.animation,o=n.indexPrevious,i=n.events,u=n.target;function a(n){var t=n.distance,a=n.index!==e.get();t&&(r.start(),u.add(t)),a&&(o.set(e.get()),e.set(n.index),i.emit("select"))}return{distance:function(n,e){a(t.byDistance(n,e))},index:function(n,r){var o=e.clone().set(n);a(t.byIndex(o.get(),r))}}}({animation:nn,events:o,index:W,indexPrevious:Z,scrollTarget:an,target:rn}),sn=function(n){var e=n.contentSize,t=n.slideSizes,r=n.viewSize,o=n.inViewThreshold,i=n.loop,u=Math.min(Math.max(o,.01),.99),a=s(t).map((function(n){return t.slice(0,n).reduce((function(n,e){return n-e}),0)})),c=(i?[0,e,-e]:[0]).reduce((function(n,e){return n.concat(f(e,u))}),[]);function f(n,e){var o=t.map((function(n){return n*(e||0)}));return a.map((function(e,i){return{start:e-t[i]+o[i]+n,end:e+r-o[i]+n,index:i}}))}return{check:function(n){return c.reduce((function(e,t){var r=t.index,o=t.start,i=t.end;return!(-1!==e.indexOf(r))&&(o<n&&i>n)?e.concat([r]):e}),[])},findSlideBounds:f}}({contentSize:F,inViewThreshold:P,loop:O,slideSizes:N,viewSize:j}),fn={animation:nn,axis:k,direction:Q,dragHandler:m({animation:nn,axis:k,direction:Q,dragFree:L,dragTracker:g({axis:k,pxToPercent:_}),root:n,events:o,index:W,limit:J,location:tn,scrollBody:un,scrollTo:cn,scrollTarget:an,target:rn}),pxToPercent:_,index:W,indexPrevious:Z,limit:J,location:tn,options:r,scrollBody:un,scrollBounds:w({limit:J,location:tn,scrollBody:un}),scrollLooper:S({contentSize:F,limit:J,location:tn,pxToPercent:_}),scrollProgress:(a={limit:J},c=a.limit,f=c.max,l=c.length,{get:function(n){return(n-f)/-l}}),scrollSnaps:$,scrollTarget:an,scrollTo:cn,slideFocus:M({root:n,scrollTo:cn,slidesToScroll:B}),slideLooper:T({axis:k,contentSize:F,direction:Q,location:tn,scrollSnaps:$,slideSizes:N,slidesInView:sn,viewSize:j}),slidesInView:sn,slideIndexes:U,target:rn,translate:E({axis:k,container:e,direction:Q})};return fn}var z={align:"center",axis:"x",containScroll:"",containerSelector:"*",direction:"ltr",dragFree:!1,draggable:!0,draggableClass:"is-draggable",draggingClass:"is-dragging",inViewThreshold:0,loop:!1,selectedClass:"is-selected",slidesToScroll:1,speed:10,startIndex:0};function D(n,e){var t,r,i,u,a,c,s=function(){var n={destroy:[],pointerDown:[],pointerUp:[],init:[],reInit:[],resize:[],scroll:[],select:[],settle:[]},e={emit:function(t){return n[t].forEach((function(n){return n(t)})),e},off:function(t,r){return n[t]=n[t].filter((function(n){return n!==r})),e},on:function(t,r){return n[t]=n[t].concat([r]),e}};return e}(),d=v(),p=(t=function(){if(h){var e=u.axis.measure(n);y!==e&&E(),s.emit("resize")}},r=500,i=0,function(){window.clearTimeout(i),i=window.setTimeout(t,r)||0}),m=E,g=s.on,x=s.off,h=!1,w=o({},z),y=0;function S(e){if(function(){if(!n)throw new Error("Missing root node 😢");var e=w.containerSelector,t=n.querySelector(e);if(!t)throw new Error("Missing container node 😢");a=t,c=Array.prototype.slice.call(a.children)}(),w=o(w,e),u=A(n,a,c,w,s),y=u.axis.measure(n),d.add(window,"resize",p),u.translate.to(u.location),w.loop){if(!u.slideLooper.canLoop())return M(),S({loop:!1});u.slideLooper.loop(c)}w.draggable&&c.length&&(u.dragHandler.addActivationEvents(),w.draggableClass&&l(n,w.draggableClass),w.draggingClass&&s.on("pointerDown",b).on("pointerUp",b)),c.length&&u.slideFocus.addActivationEvents(c),w.selectedClass&&(T(),s.on("select",T).on("pointerUp",T)),h||(setTimeout((function(){return s.emit("init")}),0),h=!0)}function b(e){var t=w.draggingClass;"pointerDown"===e?l(n,t):f(n,t)}function T(){var n=w.selectedClass,e=D(!0);P(!0).forEach((function(e){return f(c[e],n)})),e.forEach((function(e){return l(c[e],n)}))}function M(){u.dragHandler.removeAllEvents(),u.slideFocus.removeAllEvents(),u.animation.stop(),d.removeAll(),u.translate.clear(),u.slideLooper.clear(c),f(n,w.draggableClass),c.forEach((function(n){return f(n,w.selectedClass)})),s.off("select",T),s.off("pointerUp",T),s.off("pointerDown",b),s.off("pointerUp",b)}function E(n){if(h){var e=o({startIndex:I()},n);M(),S(e),s.emit("reInit")}}function D(n){var e=u[n?"target":"location"].get(),t=w.loop?"removeOffset":"constrain";return u.slidesInView.check(u.limit[t](e))}function P(n){var e=D(n);return u.slideIndexes.filter((function(n){return-1===e.indexOf(n)}))}function O(n,e){u.scrollBody.useBaseMass().useBaseSpeed(),h&&u.scrollTo.index(n,e||0)}function I(){return u.index.get()}return S(e),{canScrollNext:function(){return u.index.clone().add(1).get()!==I()},canScrollPrev:function(){return u.index.clone().add(-1).get()!==I()},clickAllowed:function(){return u.dragHandler.clickAllowed()},containerNode:function(){return a},dangerouslyGetEngine:function(){return u},destroy:function(){h&&(M(),h=!1,s.emit("destroy"))},off:x,on:g,previousScrollSnap:function(){return u.indexPrevious.get()},reInit:m,scrollNext:function(){O(u.index.clone().add(1).get(),-1)},scrollPrev:function(){O(u.index.clone().add(-1).get(),1)},scrollProgress:function(){return u.scrollProgress.get(u.location.get())},scrollSnapList:function(){return u.scrollSnaps.map(u.scrollProgress.get)},scrollTo:O,selectedScrollSnap:I,slideNodes:function(){return c},slidesInView:D,slidesNotInView:P}}e.useEmblaCarousel=function(n){void 0===n&&(n={});var e=r.useState(),t=e[0],o=e[1],i=r.useState(),u=i[0],a=i[1],c=r.useRef(n),s=r.useMemo((function(){var e,t;return e=c.current,t=n,Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every((function(n){return!!t.hasOwnProperty(n)&&e[n]===t[n]}))||(c.current=n),c.current}),[c,n]);return r.useEffect((function(){if("undefined"!=typeof window&&window.document&&window.document.createElement&&u){var n=D(u,s);return o(n),function(){return n.destroy()}}o(void 0)}),[u,s,o]),[a,t]}}}]);