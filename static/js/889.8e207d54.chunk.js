"use strict";(self.webpackChunkgenshin_optimizer=self.webpackChunkgenshin_optimizer||[]).push([[889],{10889:function(e,t,r){r.d(t,{ZP:function(){return oe}});var a=r(4942),n=r(63366),o=r(87462),i=r(72791),l=r(28182),s=r(75878),u=r(21217);function c(e){return(0,u.Z)("MuiSlider",e)}var d=(0,s.Z)("MuiSlider",["root","active","focusVisible","disabled","dragging","marked","vertical","trackInverted","trackFalse","rail","track","mark","markActive","markLabel","markLabelActive","thumb","valueLabel","valueLabelOpen","valueLabelCircle","valueLabelLabel"]),v=r(80184);var m=function(e){var t=e.children,r=e.className,a=e.value,n=e.theme,o=function(e){var t=e.open;return{offset:(0,l.Z)(t&&d.valueLabelOpen),circle:d.valueLabelCircle,label:d.valueLabelLabel}}(e);return i.cloneElement(t,{className:(0,l.Z)(t.props.className)},(0,v.jsxs)(i.Fragment,{children:[t.props.children,(0,v.jsx)("span",{className:(0,l.Z)(o.offset,r),theme:n,"aria-hidden":!0,children:(0,v.jsx)("span",{className:o.circle,children:(0,v.jsx)("span",{className:o.label,children:a})})})]}))},f=r(90183),p=r(20627),h=r(94419),b=r(93433),g=r(29439),Z=r(99723),x=r(58959),k=r(45372),w=r(47563),S=r(75721),y=r(58956),L={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};function z(e,t){return e-t}function R(e,t,r){return null==e?t:Math.min(Math.max(t,e),r)}function C(e,t){var r;return(null!=(r=e.reduce((function(e,r,a){var n=Math.abs(t-r);return null===e||n<e.distance||n===e.distance?{distance:n,index:a}:e}),null))?r:{}).index}function A(e,t){if(void 0!==t.current&&e.changedTouches){for(var r=e,a=0;a<r.changedTouches.length;a+=1){var n=r.changedTouches[a];if(n.identifier===t.current)return{x:n.clientX,y:n.clientY}}return!1}return{x:e.clientX,y:e.clientY}}function M(e,t,r){return 100*(e-t)/(r-t)}function N(e,t,r){var a=Math.round((e-r)/t)*t+r;return Number(a.toFixed(function(e){if(Math.abs(e)<1){var t=e.toExponential().split("e-"),r=t[0].split(".")[1];return(r?r.length:0)+parseInt(t[1],10)}var a=e.toString().split(".")[1];return a?a.length:0}(t)))}function P(e){var t=e.values,r=e.newValue,a=e.index,n=t.slice();return n[a]=r,n.sort(z)}function V(e){var t,r,a,n=e.sliderRef,o=e.activeIndex,i=e.setActive,l=(0,Z.Z)(n.current);null!=(t=n.current)&&t.contains(l.activeElement)&&Number(null==l||null==(r=l.activeElement)?void 0:r.getAttribute("data-index"))===o||(null==(a=n.current)||a.querySelector('[type="range"][data-index="'.concat(o,'"]')).focus());i&&i(o)}var I,E={horizontal:{offset:function(e){return{left:"".concat(e,"%")}},leap:function(e){return{width:"".concat(e,"%")}}},"horizontal-reverse":{offset:function(e){return{right:"".concat(e,"%")}},leap:function(e){return{width:"".concat(e,"%")}}},vertical:{offset:function(e){return{bottom:"".concat(e,"%")}},leap:function(e){return{height:"".concat(e,"%")}}}},T=function(e){return e};function j(){return void 0===I&&(I="undefined"===typeof CSS||"function"!==typeof CSS.supports||CSS.supports("touch-action","none")),I}function F(e){var t=e["aria-labelledby"],r=e.defaultValue,a=e.disabled,n=void 0!==a&&a,l=e.disableSwap,s=void 0!==l&&l,u=e.isRtl,c=void 0!==u&&u,d=e.marks,v=void 0!==d&&d,m=e.max,f=void 0===m?100:m,p=e.min,h=void 0===p?0:p,I=e.name,F=e.onChange,O=e.onChangeCommitted,D=e.orientation,Y=void 0===D?"horizontal":D,B=e.ref,X=e.scale,q=void 0===X?T:X,H=e.step,_=void 0===H?1:H,W=e.tabIndex,$=e.value,G=i.useRef(),J=i.useState(-1),K=(0,g.Z)(J,2),Q=K[0],U=K[1],ee=i.useState(-1),te=(0,g.Z)(ee,2),re=te[0],ae=te[1],ne=i.useState(!1),oe=(0,g.Z)(ne,2),ie=oe[0],le=oe[1],se=i.useRef(0),ue=(0,x.Z)({controlled:$,default:null!=r?r:h,name:"Slider"}),ce=(0,g.Z)(ue,2),de=ce[0],ve=ce[1],me=F&&function(e,t,r){var a=e.nativeEvent||e,n=new a.constructor(a.type,a);Object.defineProperty(n,"target",{writable:!0,value:{value:t,name:I}}),F(n,t,r)},fe=Array.isArray(de),pe=fe?de.slice().sort(z):[de];pe=pe.map((function(e){return R(e,h,f)}));var he=!0===v&&null!==_?(0,b.Z)(Array(Math.floor((f-h)/_)+1)).map((function(e,t){return{value:h+_*t}})):v||[],be=he.map((function(e){return e.value})),ge=(0,k.Z)(),Ze=ge.isFocusVisibleRef,xe=ge.onBlur,ke=ge.onFocus,we=ge.ref,Se=i.useState(-1),ye=(0,g.Z)(Se,2),Le=ye[0],ze=ye[1],Re=i.useRef(),Ce=(0,w.Z)(we,Re),Ae=(0,w.Z)(B,Ce),Me=function(e){return function(t){var r,a=Number(t.currentTarget.getAttribute("data-index"));ke(t),!0===Ze.current&&ze(a),ae(a),null==e||null==(r=e.onFocus)||r.call(e,t)}},Ne=function(e){return function(t){var r;xe(t),!1===Ze.current&&ze(-1),ae(-1),null==e||null==(r=e.onBlur)||r.call(e,t)}};(0,S.Z)((function(){var e;n&&Re.current.contains(document.activeElement)&&(null==(e=document.activeElement)||e.blur())}),[n]),n&&-1!==Q&&U(-1),n&&-1!==Le&&ze(-1);var Pe=function(e){return function(t){var r;null==(r=e.onChange)||r.call(e,t);var a=Number(t.currentTarget.getAttribute("data-index")),n=pe[a],o=be.indexOf(n),i=t.target.valueAsNumber;if(he&&null==_&&(i=i<n?be[o-1]:be[o+1]),i=R(i,h,f),he&&null==_){var l=be.indexOf(pe[a]);i=i<pe[a]?be[l-1]:be[l+1]}if(fe){s&&(i=R(i,pe[a-1]||-1/0,pe[a+1]||1/0));var u=i;i=P({values:pe,newValue:i,index:a});var c=a;s||(c=i.indexOf(u)),V({sliderRef:Re,activeIndex:c})}ve(i),ze(a),me&&me(t,i,a),O&&O(t,i)}},Ve=i.useRef(),Ie=Y;c&&"horizontal"===Y&&(Ie+="-reverse");var Ee=function(e){var t,r,a=e.finger,n=e.move,o=void 0!==n&&n,i=e.values,l=Re.current.getBoundingClientRect(),u=l.width,c=l.height,d=l.bottom,v=l.left;if(t=0===Ie.indexOf("vertical")?(d-a.y)/c:(a.x-v)/u,-1!==Ie.indexOf("-reverse")&&(t=1-t),r=function(e,t,r){return(r-t)*e+t}(t,h,f),_)r=N(r,_,h);else{var m=C(be,r);r=be[m]}r=R(r,h,f);var p=0;if(fe){p=o?Ve.current:C(i,r),s&&(r=R(r,i[p-1]||-1/0,i[p+1]||1/0));var b=r;r=P({values:i,newValue:r,index:p}),s&&o||(p=r.indexOf(b),Ve.current=p)}return{newValue:r,activeIndex:p}},Te=(0,y.Z)((function(e){var t=A(e,G);if(t)if(se.current+=1,"mousemove"!==e.type||0!==e.buttons){var r=Ee({finger:t,move:!0,values:pe}),a=r.newValue,n=r.activeIndex;V({sliderRef:Re,activeIndex:n,setActive:U}),ve(a),!ie&&se.current>2&&le(!0),me&&me(e,a,n)}else je(e)})),je=(0,y.Z)((function(e){var t=A(e,G);if(le(!1),t){var r=Ee({finger:t,move:!0,values:pe}).newValue;U(-1),"touchend"===e.type&&ae(-1),O&&O(e,r),G.current=void 0,Oe()}})),Fe=(0,y.Z)((function(e){if(!n){j()||e.preventDefault();var t=e.changedTouches[0];null!=t&&(G.current=t.identifier);var r=A(e,G);if(!1!==r){var a=Ee({finger:r,values:pe}),o=a.newValue,i=a.activeIndex;V({sliderRef:Re,activeIndex:i,setActive:U}),ve(o),me&&me(e,o,i)}se.current=0;var l=(0,Z.Z)(Re.current);l.addEventListener("touchmove",Te),l.addEventListener("touchend",je)}})),Oe=i.useCallback((function(){var e=(0,Z.Z)(Re.current);e.removeEventListener("mousemove",Te),e.removeEventListener("mouseup",je),e.removeEventListener("touchmove",Te),e.removeEventListener("touchend",je)}),[je,Te]);i.useEffect((function(){var e=Re.current;return e.addEventListener("touchstart",Fe,{passive:j()}),function(){e.removeEventListener("touchstart",Fe,{passive:j()}),Oe()}}),[Oe,Fe]),i.useEffect((function(){n&&Oe()}),[n,Oe]);var De=function(e){return function(t){var r;if(null==(r=e.onMouseDown)||r.call(e,t),!n&&!t.defaultPrevented&&0===t.button){t.preventDefault();var a=A(t,G);if(!1!==a){var o=Ee({finger:a,values:pe}),i=o.newValue,l=o.activeIndex;V({sliderRef:Re,activeIndex:l,setActive:U}),ve(i),me&&me(t,i,l)}se.current=0;var s=(0,Z.Z)(Re.current);s.addEventListener("mousemove",Te),s.addEventListener("mouseup",je)}}},Ye=M(fe?pe[0]:h,h,f),Be=M(pe[pe.length-1],h,f)-Ye,Xe=function(e){return function(t){var r;null==(r=e.onMouseOver)||r.call(e,t);var a=Number(t.currentTarget.getAttribute("data-index"));ae(a)}},qe=function(e){return function(t){var r;null==(r=e.onMouseLeave)||r.call(e,t),ae(-1)}};return{active:Q,axis:Ie,axisProps:E,dragging:ie,focusVisible:Le,getHiddenInputProps:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a={onChange:Pe(r||{}),onFocus:Me(r||{}),onBlur:Ne(r||{})},i=(0,o.Z)({},r,a);return(0,o.Z)({tabIndex:W,"aria-labelledby":t,"aria-orientation":Y,"aria-valuemax":q(f),"aria-valuemin":q(h),name:I,type:"range",min:e.min,max:e.max,step:e.step,disabled:n},i,{style:(0,o.Z)({},L,{direction:c?"rtl":"ltr",width:"100%",height:"100%"})})},getRootProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={onMouseDown:De(e||{})},r=(0,o.Z)({},e,t);return(0,o.Z)({ref:Ae},r)},getThumbProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={onMouseOver:Xe(e||{}),onMouseLeave:qe(e||{})},r=(0,o.Z)({},e,t);return(0,o.Z)({},r)},marks:he,open:re,range:fe,trackLeap:Be,trackOffset:Ye,values:pe}}var O=["aria-label","aria-valuetext","className","component","classes","disableSwap","disabled","getAriaLabel","getAriaValueText","marks","max","min","name","onChange","onChangeCommitted","onMouseDown","orientation","scale","step","tabIndex","track","value","valueLabelDisplay","valueLabelFormat","isRtl","components","componentsProps"],D=function(e){return e},Y=function(e){return e.children},B=i.forwardRef((function(e,t){var r,a,s,u,d,b,g,Z=e["aria-label"],x=e["aria-valuetext"],k=e.className,w=e.component,S=e.classes,y=e.disableSwap,L=void 0!==y&&y,z=e.disabled,R=void 0!==z&&z,C=e.getAriaLabel,A=e.getAriaValueText,N=e.marks,P=void 0!==N&&N,V=e.max,I=void 0===V?100:V,E=e.min,T=void 0===E?0:E,j=e.onMouseDown,B=e.orientation,X=void 0===B?"horizontal":B,q=e.scale,H=void 0===q?D:q,_=e.step,W=void 0===_?1:_,$=e.track,G=void 0===$?"normal":$,J=e.valueLabelDisplay,K=void 0===J?"off":J,Q=e.valueLabelFormat,U=void 0===Q?D:Q,ee=e.isRtl,te=void 0!==ee&&ee,re=e.components,ae=void 0===re?{}:re,ne=e.componentsProps,oe=void 0===ne?{}:ne,ie=(0,n.Z)(e,O),le=(0,o.Z)({},e,{marks:P,classes:S,disabled:R,isRtl:te,max:I,min:T,orientation:X,scale:H,step:W,track:G,valueLabelDisplay:K,valueLabelFormat:U}),se=F((0,o.Z)({},le,{ref:t})),ue=se.axisProps,ce=se.getRootProps,de=se.getHiddenInputProps,ve=se.getThumbProps,me=se.open,fe=se.active,pe=se.axis,he=se.range,be=se.focusVisible,ge=se.dragging,Ze=se.marks,xe=se.values,ke=se.trackOffset,we=se.trackLeap;le.marked=Ze.length>0&&Ze.some((function(e){return e.label})),le.dragging=ge;var Se=null!=(r=null!=w?w:ae.Root)?r:"span",ye=(0,f.Z)(Se,(0,o.Z)({},ie,oe.root),le),Le=null!=(a=ae.Rail)?a:"span",ze=(0,f.Z)(Le,oe.rail,le),Re=null!=(s=ae.Track)?s:"span",Ce=(0,f.Z)(Re,oe.track,le),Ae=(0,o.Z)({},ue[pe].offset(ke),ue[pe].leap(we)),Me=null!=(u=ae.Thumb)?u:"span",Ne=(0,f.Z)(Me,oe.thumb,le),Pe=null!=(d=ae.ValueLabel)?d:m,Ve=(0,f.Z)(Pe,oe.valueLabel,le),Ie=null!=(b=ae.Mark)?b:"span",Ee=(0,f.Z)(Ie,oe.mark,le),Te=null!=(g=ae.MarkLabel)?g:"span",je=(0,f.Z)(Te,oe.markLabel,le),Fe=ae.Input||"input",Oe=(0,f.Z)(Fe,oe.input,le),De=de(),Ye=function(e){var t=e.disabled,r=e.dragging,a=e.marked,n=e.orientation,o=e.track,i=e.classes,l={root:["root",t&&"disabled",r&&"dragging",a&&"marked","vertical"===n&&"vertical","inverted"===o&&"trackInverted",!1===o&&"trackFalse"],rail:["rail"],track:["track"],mark:["mark"],markActive:["markActive"],markLabel:["markLabel"],markLabelActive:["markLabelActive"],valueLabel:["valueLabel"],thumb:["thumb",t&&"disabled"],active:["active"],disabled:["disabled"],focusVisible:["focusVisible"]};return(0,h.Z)(l,c,i)}(le);return(0,v.jsxs)(Se,(0,o.Z)({},ye,ce({onMouseDown:j}),{className:(0,l.Z)(Ye.root,ye.className,k),children:[(0,v.jsx)(Le,(0,o.Z)({},ze,{className:(0,l.Z)(Ye.rail,ze.className)})),(0,v.jsx)(Re,(0,o.Z)({},Ce,{className:(0,l.Z)(Ye.track,Ce.className),style:(0,o.Z)({},Ae,Ce.style)})),Ze.filter((function(e){return e.value>=T&&e.value<=I})).map((function(e,t){var r,a=M(e.value,T,I),n=ue[pe].offset(a);return r=!1===G?-1!==xe.indexOf(e.value):"normal"===G&&(he?e.value>=xe[0]&&e.value<=xe[xe.length-1]:e.value<=xe[0])||"inverted"===G&&(he?e.value<=xe[0]||e.value>=xe[xe.length-1]:e.value>=xe[0]),(0,v.jsxs)(i.Fragment,{children:[(0,v.jsx)(Ie,(0,o.Z)({"data-index":t},Ee,!(0,p.Z)(Ie)&&{markActive:r},{style:(0,o.Z)({},n,Ee.style),className:(0,l.Z)(Ye.mark,Ee.className,r&&Ye.markActive)})),null!=e.label?(0,v.jsx)(Te,(0,o.Z)({"aria-hidden":!0,"data-index":t},je,!(0,p.Z)(Te)&&{markLabelActive:r},{style:(0,o.Z)({},n,je.style),className:(0,l.Z)(Ye.markLabel,je.className,r&&Ye.markLabelActive),children:e.label})):null]},e.value)})),xe.map((function(e,t){var r=M(e,T,I),a=ue[pe].offset(r),n="off"===K?Y:Pe;return(0,v.jsx)(i.Fragment,{children:(0,v.jsx)(n,(0,o.Z)({},!(0,p.Z)(n)&&{valueLabelFormat:U,valueLabelDisplay:K,value:"function"===typeof U?U(H(e),t):U,index:t,open:me===t||fe===t||"on"===K,disabled:R},Ve,{className:(0,l.Z)(Ye.valueLabel,Ve.className),children:(0,v.jsx)(Me,(0,o.Z)({"data-index":t},Ne,ve(),{className:(0,l.Z)(Ye.thumb,Ne.className,fe===t&&Ye.active,be===t&&Ye.focusVisible),style:(0,o.Z)({},a,{pointerEvents:L&&fe!==t?"none":void 0},Ne.style),children:(0,v.jsx)(Fe,(0,o.Z)({},De,{"data-index":t,"aria-label":C?C(t):Z,"aria-valuenow":H(e),"aria-valuetext":A?A(H(e),t):x,value:xe[t]},!(0,p.Z)(Fe)&&{ownerState:(0,o.Z)({},le,Oe.ownerState)},Oe,{style:(0,o.Z)({},De.style,Oe.style)}))}))}))},t)}))]}))})),X=B,q=r(12065),H=r(31402),_=r(66934),W=r(13967),$=r(43465),G=r(14036),J=["component","components","componentsProps","color","size"],K=(0,o.Z)({},d,(0,s.Z)("MuiSlider",["colorPrimary","colorSecondary","thumbColorPrimary","thumbColorSecondary","sizeSmall","thumbSizeSmall"])),Q=(0,_.ZP)("span",{name:"MuiSlider",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,t["color".concat((0,G.Z)(r.color))],"medium"!==r.size&&t["size".concat((0,G.Z)(r.size))],r.marked&&t.marked,"vertical"===r.orientation&&t.vertical,"inverted"===r.track&&t.trackInverted,!1===r.track&&t.trackFalse]}})((function(e){var t,r=e.theme,n=e.ownerState;return(0,o.Z)({borderRadius:12,boxSizing:"content-box",display:"inline-block",position:"relative",cursor:"pointer",touchAction:"none",color:r.palette[n.color].main,WebkitTapHighlightColor:"transparent"},"horizontal"===n.orientation&&(0,o.Z)({height:4,width:"100%",padding:"13px 0","@media (pointer: coarse)":{padding:"20px 0"}},"small"===n.size&&{height:2},n.marked&&{marginBottom:20}),"vertical"===n.orientation&&(0,o.Z)({height:"100%",width:4,padding:"0 13px","@media (pointer: coarse)":{padding:"0 20px"}},"small"===n.size&&{width:2},n.marked&&{marginRight:44}),(t={"@media print":{colorAdjust:"exact"}},(0,a.Z)(t,"&.".concat(K.disabled),{pointerEvents:"none",cursor:"default",color:r.palette.grey[400]}),(0,a.Z)(t,"&.".concat(K.dragging),(0,a.Z)({},"& .".concat(K.thumb,", & .").concat(K.track),{transition:"none"})),t))})),U=(0,_.ZP)("span",{name:"MuiSlider",slot:"Rail",overridesResolver:function(e,t){return t.rail}})((function(e){var t=e.ownerState;return(0,o.Z)({display:"block",position:"absolute",borderRadius:"inherit",backgroundColor:"currentColor",opacity:.38},"horizontal"===t.orientation&&{width:"100%",height:"inherit",top:"50%",transform:"translateY(-50%)"},"vertical"===t.orientation&&{height:"100%",width:"inherit",left:"50%",transform:"translateX(-50%)"},"inverted"===t.track&&{opacity:1})})),ee=(0,_.ZP)("span",{name:"MuiSlider",slot:"Track",overridesResolver:function(e,t){return t.track}})((function(e){var t=e.theme,r=e.ownerState,a="light"===t.palette.mode?(0,q.$n)(t.palette[r.color].main,.62):(0,q._j)(t.palette[r.color].main,.5);return(0,o.Z)({display:"block",position:"absolute",borderRadius:"inherit",border:"1px solid currentColor",backgroundColor:"currentColor",transition:t.transitions.create(["left","width","bottom","height"],{duration:t.transitions.duration.shortest})},"small"===r.size&&{border:"none"},"horizontal"===r.orientation&&{height:"inherit",top:"50%",transform:"translateY(-50%)"},"vertical"===r.orientation&&{width:"inherit",left:"50%",transform:"translateX(-50%)"},!1===r.track&&{display:"none"},"inverted"===r.track&&{backgroundColor:a,borderColor:a})})),te=(0,_.ZP)("span",{name:"MuiSlider",slot:"Thumb",overridesResolver:function(e,t){var r=e.ownerState;return[t.thumb,t["thumbColor".concat((0,G.Z)(r.color))],"medium"!==r.size&&t["thumbSize".concat((0,G.Z)(r.size))]]}})((function(e){var t,r=e.theme,n=e.ownerState;return(0,o.Z)({position:"absolute",width:20,height:20,boxSizing:"border-box",borderRadius:"50%",outline:0,backgroundColor:"currentColor",display:"flex",alignItems:"center",justifyContent:"center",transition:r.transitions.create(["box-shadow","left","bottom"],{duration:r.transitions.duration.shortest})},"small"===n.size&&{width:12,height:12},"horizontal"===n.orientation&&{top:"50%",transform:"translate(-50%, -50%)"},"vertical"===n.orientation&&{left:"50%",transform:"translate(-50%, 50%)"},(t={"&:before":(0,o.Z)({position:"absolute",content:'""',borderRadius:"inherit",width:"100%",height:"100%",boxShadow:r.shadows[2]},"small"===n.size&&{boxShadow:"none"}),"&::after":{position:"absolute",content:'""',borderRadius:"50%",width:42,height:42,top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},(0,a.Z)(t,"&:hover, &.".concat(K.focusVisible),{boxShadow:"0px 0px 0px 8px ".concat((0,q.Fq)(r.palette[n.color].main,.16)),"@media (hover: none)":{boxShadow:"none"}}),(0,a.Z)(t,"&.".concat(K.active),{boxShadow:"0px 0px 0px 14px ".concat((0,q.Fq)(r.palette[n.color].main,.16))}),(0,a.Z)(t,"&.".concat(K.disabled),{"&:hover":{boxShadow:"none"}}),t))})),re=(0,_.ZP)(m,{name:"MuiSlider",slot:"ValueLabel",overridesResolver:function(e,t){return t.valueLabel}})((function(e){var t,r=e.theme,n=e.ownerState;return(0,o.Z)((t={},(0,a.Z)(t,"&.".concat(K.valueLabelOpen),{transform:"translateY(-100%) scale(1)"}),(0,a.Z)(t,"zIndex",1),(0,a.Z)(t,"whiteSpace","nowrap"),t),r.typography.body2,{fontWeight:500,transition:r.transitions.create(["transform"],{duration:r.transitions.duration.shortest}),transformOrigin:"bottom center",transform:"translateY(-100%) scale(0)",position:"absolute",backgroundColor:r.palette.grey[600],borderRadius:2,color:r.palette.common.white,display:"flex",alignItems:"center",justifyContent:"center",padding:"0.25rem 0.75rem"},"horizontal"===n.orientation&&{top:"-10px","&:before":{position:"absolute",content:'""',width:8,height:8,transform:"translate(-50%, 50%) rotate(45deg)",backgroundColor:"inherit",bottom:0,left:"50%"}},"vertical"===n.orientation&&{right:"30px",top:"25px","&:before":{position:"absolute",content:'""',width:8,height:8,transform:"translate(-50%, 50%) rotate(45deg)",backgroundColor:"inherit",right:"-20%",top:"25%"}},"small"===n.size&&{fontSize:r.typography.pxToRem(12),padding:"0.25rem 0.5rem"})})),ae=(0,_.ZP)("span",{name:"MuiSlider",slot:"Mark",shouldForwardProp:function(e){return(0,_.Dz)(e)&&"markActive"!==e},overridesResolver:function(e,t){return t.mark}})((function(e){var t=e.theme,r=e.ownerState,a=e.markActive;return(0,o.Z)({position:"absolute",width:2,height:2,borderRadius:1,backgroundColor:"currentColor"},"horizontal"===r.orientation&&{top:"50%",transform:"translate(-1px, -50%)"},"vertical"===r.orientation&&{left:"50%",transform:"translate(-50%, 1px)"},a&&{backgroundColor:t.palette.background.paper,opacity:.8})})),ne=(0,_.ZP)("span",{name:"MuiSlider",slot:"MarkLabel",shouldForwardProp:function(e){return(0,_.Dz)(e)&&"markLabelActive"!==e},overridesResolver:function(e,t){return t.markLabel}})((function(e){var t=e.theme,r=e.ownerState,a=e.markLabelActive;return(0,o.Z)({},t.typography.body2,{color:t.palette.text.secondary,position:"absolute",whiteSpace:"nowrap"},"horizontal"===r.orientation&&{top:30,transform:"translateX(-50%)","@media (pointer: coarse)":{top:40}},"vertical"===r.orientation&&{left:36,transform:"translateY(50%)","@media (pointer: coarse)":{left:44}},a&&{color:t.palette.text.primary})})),oe=i.forwardRef((function(e,t){var r,a,i,s,u=(0,H.Z)({props:e,name:"MuiSlider"}),d="rtl"===(0,W.Z)().direction,m=u.component,f=void 0===m?"span":m,p=u.components,h=void 0===p?{}:p,b=u.componentsProps,g=void 0===b?{}:b,Z=u.color,x=void 0===Z?"primary":Z,k=u.size,w=void 0===k?"medium":k,S=(0,n.Z)(u,J),y=function(e){var t=e.color,r=e.size,a=e.classes,n=void 0===a?{}:a;return(0,o.Z)({},n,{root:(0,l.Z)(n.root,c("color".concat((0,G.Z)(t))),n["color".concat((0,G.Z)(t))],r&&[c("size".concat((0,G.Z)(r))),n["size".concat((0,G.Z)(r))]]),thumb:(0,l.Z)(n.thumb,c("thumbColor".concat((0,G.Z)(t))),n["thumbColor".concat((0,G.Z)(t))],r&&[c("thumbSize".concat((0,G.Z)(r))),n["thumbSize".concat((0,G.Z)(r))]])})}((0,o.Z)({},u,{color:x,size:w}));return(0,v.jsx)(X,(0,o.Z)({},S,{isRtl:d,components:(0,o.Z)({Root:Q,Rail:U,Track:ee,Thumb:te,ValueLabel:re,Mark:ae,MarkLabel:ne},h),componentsProps:(0,o.Z)({},g,{root:(0,o.Z)({},g.root,(0,$.Z)(h.Root)&&{as:f,ownerState:(0,o.Z)({},null==(r=g.root)?void 0:r.ownerState,{color:x,size:w})}),thumb:(0,o.Z)({},g.thumb,(0,$.Z)(h.Thumb)&&{ownerState:(0,o.Z)({},null==(a=g.thumb)?void 0:a.ownerState,{color:x,size:w})}),track:(0,o.Z)({},g.track,(0,$.Z)(h.Track)&&{ownerState:(0,o.Z)({},null==(i=g.track)?void 0:i.ownerState,{color:x,size:w})}),valueLabel:(0,o.Z)({},g.valueLabel,(0,$.Z)(h.ValueLabel)&&{ownerState:(0,o.Z)({},null==(s=g.valueLabel)?void 0:s.ownerState,{color:x,size:w})})}),classes:y,ref:t}))}))},43465:function(e,t,r){var a=r(20627);t.Z=function(e){return!e||!(0,a.Z)(e)}}}]);
//# sourceMappingURL=889.8e207d54.chunk.js.map