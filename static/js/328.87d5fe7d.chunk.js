"use strict";(self.webpackChunkgenshin_optimizer=self.webpackChunkgenshin_optimizer||[]).push([[328],{10600:function(e,t,n){n.d(t,{CC:function(){return v},ZP:function(){return Z}});var r=n(29439),i=n(1413),l=n(45987),a=n(66934),o=n(4834),c=n(24518),s=n(72791),u=n(80184),d=["children","disableRipple","disableFocusRipple","disableTouchRipple"],f=["value","onChange","disabled","float"],x=(0,a.ZP)(o.ZP)((function(e){var t=e.theme;return{backgroundColor:t.palette.primary.main,transition:"all 0.5s ease","&:hover":{backgroundColor:t.palette.primary.dark},"&.Mui-focused":{backgroundColor:t.palette.primary.dark},"&.Mui-disabled":{backgroundColor:t.palette.primary.dark}}})),h=(0,a.ZP)(c.Z)((function(e){return{backgroundColor:e.theme.palette.primary.main,padding:0,overflow:"hidden",div:{width:"100%",height:"100%"}}}));function v(e){var t=e.children,n=(e.disableRipple,e.disableFocusRipple,e.disableTouchRipple,(0,l.Z)(e,d));return(0,u.jsx)(h,(0,i.Z)((0,i.Z)({disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0},n),{},{children:t}))}function Z(e){var t=e.value,n=void 0===t?0:t,a=e.onChange,o=e.disabled,c=void 0!==o&&o,d=e.float,h=void 0!==d&&d,v=(0,l.Z)(e,f),Z=(0,s.useState)(n),p=(0,r.Z)(Z,2),y=p[0],j=p[1],b=(0,s.useState)(!1),g=(0,r.Z)(b,2),m=g[0],k=g[1],w=(0,s.useMemo)((function(){return h?parseFloat:parseInt}),[h]),C=(0,s.useCallback)((function(){a(y),k(!1)}),[a,y,k]),S=(0,s.useCallback)((function(){k(!0)}),[k]);(0,s.useEffect)((function(){return j(n)}),[n,j]);var E=(0,s.useCallback)((function(e){return j(w(e.target.value)||0)}),[j,w]),K=(0,s.useCallback)((function(e){return"Enter"===e.key&&C()}),[C]);return(0,u.jsx)(x,(0,i.Z)({value:m&&!y?"":y,"aria-label":"custom-input",type:"number",inputProps:{step:h?.1:1},onChange:E,onBlur:C,onFocus:S,disabled:c,onKeyDown:K},v))}},55221:function(e,t,n){var r=n(1413),i=n(45987),l=n(53174),a=n(54483),o=n(68870),c=n(96106),s=n(80184),u=["className"];t.Z=function(e){var t=e.className,n=(0,i.Z)(e,u);return(0,s.jsx)(c.Z,(0,r.Z)((0,r.Z)({placement:"top"},n),{},{className:t,children:(0,s.jsx)(o.Z,{component:"span",sx:{cursor:"help"},children:(0,s.jsx)(a.G,{icon:l.sqG})})}))}},14525:function(e,t,n){n.d(t,{Z:function(){return K},b:function(){return P}});var r,i,l=n(29439),a=n(30168),o=n(4942),c=n(1413),s=n(53174),u=n(54483),d=n(39504),f=n(20890),x=n(2199),h=n(23786),v=n(24518),Z=n(52791),p=n(72791),y=n(22020),j=n(2693),b=n(26138),g=n(79406),m=n(9274),k=n(71310),w=n(10600),C=n(33890),S=n(55221),E=n(80184);function K(e){var t=e.disabled,n=void 0!==t&&t,s=(0,y.$)("page_character").t,u=(0,p.useContext)(j.R),x=u.data,h=u.character.key,v=(0,m.ZP)(h),g=v.buildSetting.statFilters,w=v.buildSettingDispatch,C=(0,p.useCallback)((function(e){return w({statFilters:e})}),[w]),K=["atk","hp","def","eleMas","critRate_","critDMG_","heal_","enerRech_"];"catalyst"!==x.get(b.ri.weaponType).value&&K.push("physical_dmg_");var M=x.get(b.ri.charEle).value;K.push("".concat(M,"_dmg_"));var _=K.filter((function(e){return!Object.keys(g).some((function(t){return t===e}))})),F=(0,p.useCallback)((function(e,t){return C((0,c.Z)((0,c.Z)({},g),{},(0,o.Z)({},e,t)))}),[g,C]);return(0,E.jsxs)(Z.Z,{children:[(0,E.jsx)(k.Z,{children:(0,E.jsxs)(d.Z,{sx:{display:"flex",gap:1,justifyContent:"space-between"},children:[(0,E.jsx)(f.Z,{children:s(r||(r=(0,a.Z)(["tabOptimize.constraintFilter.title"])))}),(0,E.jsx)(S.Z,{title:(0,E.jsx)(f.Z,{children:s(i||(i=(0,a.Z)(["tabOptimize.constraintFilter.tooltip"])))})})]})}),(0,E.jsxs)(Z.Z,{display:"flex",flexDirection:"column",gap:.5,children:[Object.entries(g).map((function(e){var t=(0,l.Z)(e,2),r=t[0],i=t[1];return(0,E.jsx)(P,{statKey:r,statKeys:_,setFilter:F,disabled:n,value:i,close:function(){delete g[r],C((0,c.Z)({},g))}},r)})),(0,E.jsx)(P,{value:void 0,close:void 0,statKeys:_,setFilter:F,disabled:n})]})]})}function P(e){var t=e.statKey,n=e.statKeys,r=void 0===n?[]:n,i=e.value,l=void 0===i?0:i,a=e.close,o=e.setFilter,c=e.disabled,d=void 0!==c&&c,f="%"===g.ZP.unit(t),Z=(0,p.useCallback)((function(e){return t&&o(t,e)}),[o,t]);return(0,E.jsxs)(x.Z,{sx:{width:"100%"},children:[(0,E.jsx)(C.Z,{title:t?g.ZP.get(t):"New Stat",disabled:d,color:t?"success":"secondary",children:r.map((function(e){return(0,E.jsx)(h.Z,{onClick:function(){null===a||void 0===a||a(),o(e,l)},children:g.ZP.get(e)},e)}))}),(0,E.jsx)(w.CC,{sx:{flexBasis:30,flexGrow:1},children:(0,E.jsx)(w.ZP,{disabled:!t||d,float:f,value:l,placeholder:"Min Value",onChange:Z,sx:{px:2}})}),!!a&&(0,E.jsx)(v.Z,{color:"error",onClick:a,disabled:d,children:(0,E.jsx)(u.G,{icon:s.I7k})})]})}},20323:function(e,t,n){function r(){return{tcMode:!1}}n.d(t,{c:function(){return r}})},72838:function(e,t,n){n.d(t,{N:function(){return X},Z:function(){return U}});var r,i,l,a,o=n(30168),c=n(29439),s=n(53174),u=n(54483),d=n(40117),f=n(62002),x=n(63204),h=n(66647),v=n(68870),Z=n(47047),p=n(20890),y=n(13400),j=n(81918),b=n(39504),g=n(2199),m=n(40165),k=n(24518),w=n(72791),C=n(22020),S=n(95614),E=n(71310),K=n(31038),P=n(40020),M=n(91702),_=n(20005),F=n(55221),R=n(25617),A=n(10157),G=n(75545),O=n(19272),D=n(31148),N=n(56928),z=n(79406),I=n(63372),V=n(42320),B=n(50765),T=n(60393),q=n(46797),L=n(44217),H=n(80184),W=(0,w.lazy)((function(){return Promise.all([n.e(788),n.e(213)]).then(n.bind(n,66585))})),Q=new Set(B._);function U(e){var t,n,B,T,U=e.artifactId,X=e.artifactObj,J=e.onClick,Y=e.onDelete,ee=e.mainStatAssumptionLevel,te=void 0===ee?0:ee,ne=e.effFilter,re=void 0===ne?Q:ne,ie=e.probabilityFilter,le=e.disableEditSetSlot,ae=void 0!==le&&le,oe=e.editor,ce=void 0!==oe&&oe,se=e.canExclude,ue=void 0!==se&&se,de=e.canEquip,fe=void 0!==de&&de,xe=e.extraButtons,he=(0,C.$)(["artifact","ui"]).t,ve=(0,w.useContext)(N.t).database,Ze=(0,I.Z)(U),pe=(0,V.Z)(D.y.get(null===(t=null!==X&&void 0!==X?X:Ze)||void 0===t?void 0:t.setKey),[X,Ze]),ye=!X,je=(0,w.useState)(!1),be=(0,c.Z)(je,2),ge=be[0],me=be[1],ke=(0,w.useCallback)((function(){return me(!1)}),[me]),we=(0,w.useCallback)((function(){return ye&&me(!0)}),[ye,me]),Ce=(0,w.useCallback)((function(e){return(0,H.jsx)(h.Z,{onClick:function(){return U&&(null===J||void 0===J?void 0:J(U))},sx:{flexGrow:1,display:"flex",flexDirection:"column"},children:e})}),[J,U]),Se=(0,w.useCallback)((function(e){return(0,H.jsx)(v.Z,{sx:{flexGrow:1,display:"flex",flexDirection:"column"},children:e})}),[]),Ee=null!==X&&void 0!==X?X:Ze;if(!Ee)return null;var Ke=Ee.id,Pe=Ee.lock,Me=Ee.slotKey,_e=Ee.rarity,Fe=Ee.level,Re=Ee.mainStatKey,Ae=Ee.substats,Ge=Ee.exclude,Oe=Ee.location,De=void 0===Oe?"":Oe,Ne=Math.max(Math.min(te,4*_e),Fe),ze=z.ZP.unit(Re),Ie="roll"+(Math.floor(Math.max(Fe,0)/4)+1),Ve=O.Z.getArtifactEfficiency(Ee,re),Be=Ve.currentEfficiency,Te=Ve.maxEfficiency,qe=0!==Te,Le=null===pe||void 0===pe?void 0:pe.getSlotName(Me),He=null===pe||void 0===pe?void 0:pe.getSlotDesc(Me),We=He&&(0,H.jsx)(F.Z,{title:(0,H.jsxs)(v.Z,{children:[(0,H.jsx)(w.Suspense,{fallback:(0,H.jsx)(Z.Z,{variant:"text",width:100}),children:(0,H.jsx)(p.Z,{variant:"h6",children:Le})}),(0,H.jsx)(p.Z,{children:He})]})}),Qe=null===pe||void 0===pe?void 0:pe.setEffects,Ue=pe&&Qe&&(0,H.jsx)(F.Z,{title:(0,H.jsx)("span",{children:Object.keys(Qe).map((function(e){return(0,H.jsxs)("span",{children:[(0,H.jsx)(p.Z,{variant:"h6",children:(0,H.jsx)(R.Z,{color:"success",children:he("artifact:setEffectNum",{setNum:e})})}),(0,H.jsx)(p.Z,{children:pe.setEffectDesc(e)})]},e)}))})});return(0,H.jsxs)(w.Suspense,{fallback:(0,H.jsx)(Z.Z,{variant:"rectangular",sx:{width:"100%",height:"100%",minHeight:350}}),children:[ce&&(0,H.jsx)(w.Suspense,{fallback:!1,children:(0,H.jsx)(W,{artifactIdToEdit:ge?U:"",cancelEdit:ke,disableEditSetSlot:ae})}),(0,H.jsxs)(E.Z,{sx:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,H.jsxs)(_.Z,{condition:!!J,wrapper:Ce,falseWrapper:Se,children:[(0,H.jsxs)(v.Z,{className:"grad-".concat(_e,"star"),sx:{position:"relative",width:"100%"},children:[!J&&(0,H.jsx)(y.Z,{color:"primary",disabled:!ye,onClick:function(){return ve.updateArt({lock:!Pe},Ke)},sx:{position:"absolute",right:0,bottom:0,zIndex:2},children:Pe?(0,H.jsx)(d.Z,{}):(0,H.jsx)(f.Z,{})}),(0,H.jsxs)(v.Z,{sx:{pt:2,px:2,position:"relative",zIndex:1},children:[(0,H.jsxs)(v.Z,{component:"div",sx:{display:"flex",alignItems:"center",gap:1,mb:1},children:[(0,H.jsx)(j.Z,{size:"small",label:(0,H.jsx)("strong",{children:" +".concat(Fe)}),color:Ie}),!Le&&(0,H.jsx)(Z.Z,{variant:"text",width:100}),Le&&(0,H.jsx)(p.Z,{noWrap:!0,sx:{textAlign:"center",backgroundColor:"rgba(100,100,100,0.35)",borderRadius:"1em",px:1},children:(0,H.jsx)("strong",{children:Le})}),!We&&(0,H.jsx)(Z.Z,{width:10}),We]}),(0,H.jsx)(p.Z,{color:"text.secondary",variant:"body2",children:(0,H.jsx)(S.ZP,{slotKey:Me})}),(0,H.jsx)(p.Z,{variant:"h6",color:"".concat(z.ZP.getVariant(Re),".main"),children:(0,H.jsxs)("span",{children:[G.Z[Re]," ",z.ZP.get(Re)]})}),(0,H.jsx)(p.Z,{variant:"h5",children:(0,H.jsx)("strong",{children:(0,H.jsxs)(M.Z,{color:Ne!==Fe?"warning":void 0,children:[(0,z.qs)(null!==(n=O.Z.mainStatValue(Re,_e,Ne))&&void 0!==n?n:0,z.ZP.unit(Re)),ze]})})}),(0,H.jsx)(A.t,{stars:_e,colored:!0})]}),(0,H.jsx)(v.Z,{sx:{height:"100%",position:"absolute",right:0,top:0},children:(0,H.jsx)(v.Z,{component:"img",src:null!==(B=null===pe||void 0===pe?void 0:pe.slotIcons[Me])&&void 0!==B?B:"",width:"auto",height:"100%",sx:{float:"right"}})})]}),(0,H.jsxs)(b.Z,{sx:{flexGrow:1,display:"flex",flexDirection:"column",pt:1,pb:0,width:"100%"},children:[Ae.map((function(e){return(0,H.jsx)($,{stat:e,effFilter:re,rarity:_e},e.key)})),(0,H.jsxs)(v.Z,{sx:{display:"flex",my:1},children:[(0,H.jsx)(p.Z,{color:"text.secondary",component:"span",variant:"caption",sx:{flexGrow:1},children:he(r||(r=(0,o.Z)(["artifact:editor.curSubEff"])))}),(0,H.jsx)(q.Z,{value:Be,max:900,valid:qe})]}),Be!==Te&&(0,H.jsxs)(v.Z,{sx:{display:"flex",mb:1},children:[(0,H.jsx)(p.Z,{color:"text.secondary",component:"span",variant:"caption",sx:{flexGrow:1},children:he(i||(i=(0,o.Z)(["artifact:editor.maxSubEff"])))}),(0,H.jsx)(q.Z,{value:Te,max:900,valid:qe})]}),(0,H.jsx)(v.Z,{flexGrow:1}),ie&&(0,H.jsxs)("strong",{children:["Probability: ",(100*(0,L.B)(Ee,ie)).toFixed(2),"%"]}),(0,H.jsxs)(p.Z,{color:"success.main",children:[null!==(T=null===pe||void 0===pe?void 0:pe.name)&&void 0!==T?T:"Artifact Set"," ",Ue]})]})]}),(0,H.jsxs)(v.Z,{sx:{p:1,display:"flex",gap:1,justifyContent:"space-between",alignItems:"center"},children:[ye&&fe?(0,H.jsx)(K.Z,{sx:{flexGrow:1},size:"small",showDefault:!0,defaultIcon:(0,H.jsx)(x.Z,{}),defaultText:he("ui:inventory"),value:De,onChange:function(e){return ve.setArtLocation(U,e)}}):(0,H.jsx)(P.Z,{location:De}),ye&&(0,H.jsxs)(g.Z,{sx:{height:"100%"},children:[ce&&(0,H.jsx)(m.Z,{title:(0,H.jsx)(p.Z,{children:he(l||(l=(0,o.Z)(["artifact:edit"])))}),placement:"top",arrow:!0,children:(0,H.jsx)(k.Z,{color:"info",size:"small",onClick:we,children:(0,H.jsx)(u.G,{icon:s.Xcf,className:"fa-fw"})})}),ue&&(0,H.jsx)(m.Z,{title:(0,H.jsx)(p.Z,{children:he(a||(a=(0,o.Z)(["artifact:excludeArtifactTip"])))}),placement:"top",arrow:!0,children:(0,H.jsx)(k.Z,{onClick:function(){return ve.updateArt({exclude:!Ge},Ke)},color:Ge?"error":"success",size:"small",children:(0,H.jsx)(u.G,{icon:Ge?s.gPx:s.Stf,className:"fa-fw"})})}),!!Y&&(0,H.jsx)(k.Z,{color:"error",size:"small",onClick:function(){return Y(Ke)},disabled:Pe,children:(0,H.jsx)(u.G,{icon:s.I7k,className:"fa-fw"})}),xe]})]})]})]})}function $(e){var t,n,r,i=e.stat,l=e.effFilter,a=e.rarity;if(!i.value)return null;var o=null!==(t=null===(n=i.rolls)||void 0===n?void 0:n.length)&&void 0!==t?t:0,c=i.key?O.Z.maxSubstatValues(i.key):0,s=i.key?O.Z.getSubstatRollData(i.key,a):[],u=7-s.length,d="roll".concat((0,T.uZ)(o,1,6)),f=null!==(r=i.efficiency)&&void 0!==r?r:0,x=(0,T.V2)(.5+f/500*.5),h=z.ZP.getStr(i.key),Z=z.ZP.unit(i.key),y=i.key&&l.has(i.key);return(0,H.jsxs)(v.Z,{display:"flex",gap:1,alignContent:"center",children:[(0,H.jsxs)(p.Z,{sx:{flexGrow:1},color:o?"".concat(d,".main"):"error.main",component:"span",children:[G.Z[i.key]," ",h,"+".concat((0,z.qs)(i.value,z.ZP.unit(i.key))).concat(Z)]}),y&&(0,H.jsx)(v.Z,{display:"flex",gap:.25,height:"1.3em",children:i.rolls.sort().map((function(e,t){return(0,H.jsx)(X,{value:100*e/c,color:"roll".concat((0,T.uZ)(u+s.indexOf(e),1,6),".main")},"".concat(t).concat(e))}))}),(0,H.jsx)(p.Z,{sx:{opacity:x,minWidth:40,textAlign:"right"},children:y?"".concat(f.toFixed(),"%"):"-"})]})}function X(e){var t=e.color,n=void 0===t?"red":t,r=e.value,i=void 0===r?50:r;return(0,H.jsx)(v.Z,{sx:{width:7,height:"100%",bgcolor:n,overflow:"hidden",borderRadius:1,display:"inline-block"},children:(0,H.jsx)(v.Z,{sx:{width:10,height:"".concat(100-(0,T.uZ)(i,0,100),"%"),bgcolor:"gray"}})})}},44824:function(e,t,n){n.d(t,{Af:function(){return u},EM:function(){return x},OQ:function(){return c},bq:function(){return s},sZ:function(){return d},x3:function(){return f}});var r=n(37762),i=n(93433),l=n(24351),a=n(19272),o=n(44217),c=["rarity","level","artsetkey","efficiency","mefficiency","probability"],s=["probability"];function u(){return{artSetKeys:[],rarity:(0,i.Z)(l.En),levelLow:0,levelHigh:20,slotKeys:(0,i.Z)(l.eV),mainStatKeys:[],substats:[],location:"",exclusion:["excluded","included"],locked:["locked","unlocked"]}}var d=function(){return{filterOption:u(),ascending:!1,sortType:c[0]}};function f(e,t){return{rarity:{getValue:function(e){var t;return null!==(t=e.rarity)&&void 0!==t?t:0},tieBreaker:"level"},level:{getValue:function(e){var t;return null!==(t=e.level)&&void 0!==t?t:0},tieBreaker:"artsetkey"},artsetkey:{getValue:function(e){var t;return null!==(t=e.setKey)&&void 0!==t?t:""},tieBreaker:"level"},efficiency:{getValue:function(t){return a.Z.getArtifactEfficiency(t,e).currentEfficiency}},mefficiency:{getValue:function(t){return a.Z.getArtifactEfficiency(t,e).maxEfficiency}},probability:{getValue:function(e){if(!Object.keys(t).length)return 0;var n=e.probability;return void 0===n?(0,o.B)(e,t):n}}}}function x(){return{exclusion:function(e,t){return!(!t.includes("included")&&!e.exclude)&&!(!t.includes("excluded")&&e.exclude)},locked:function(e,t){return!(!t.includes("locked")&&e.lock)&&!(!t.includes("unlocked")&&!e.lock)},location:function(e,t){return!t||("Inventory"===t&&!e.location||(!("Equipped"!==t||!e.location)||t===e.location))},artSetKeys:function(e,t){return!t.length||t.includes(e.setKey)},slotKeys:function(e,t){return t.includes(e.slotKey)},mainStatKeys:function(e,t){return!t.length||t.includes(e.mainStatKey)},levelLow:function(e,t){return t<=e.level},levelHigh:function(e,t){return t>=e.level},rarity:function(e,t){return t.includes(e.rarity)},substats:function(e,t){var n,i=(0,r.Z)(t);try{var l=function(){var t=n.value;if(t&&!e.substats.some((function(e){return e.key===t})))return{v:!1}};for(i.s();!(n=i.n()).done;){var a=l();if("object"===typeof a)return a.v}}catch(o){i.e(o)}finally{i.f()}return!0}}}},46797:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(29439),i=n(25617),l=n(60393),a=n(80184);function o(e){var t=e.value,n=e.max,o=void 0===n?1:n,c=e.valid,s="number"===typeof t?["roll".concat((0,l.uZ)(Math.floor(t/o*10)-4,1,6)),t.toFixed()+"%"]:["secondary",t],u=(0,r.Z)(s,2),d=u[0],f=u[1];return c||(d="error"),(0,a.jsx)(i.Z,{color:d,children:f})}},44217:function(e,t,n){n.d(t,{B:function(){return g}});var r=n(29439),i=n(37762),l=n(4942),a=n(1413),o=n(93433),c=n(60393),s=n(19272),u=n(12354),d=[3,4,6],f={hp:6,atk:6,def:6,hp_:4,atk_:4,def_:4,eleMas:4,enerRech_:4,critRate_:3,critDMG_:3},x={};function h(e,t,n,r){if(5!==e.length)for(var i=0,s=d;i<s.length;i++){var u=s[i];t[u]>0&&h([].concat((0,o.Z)(e),[u]),(0,a.Z)((0,a.Z)({},t),{},(0,l.Z)({},u,t[u]-u)),n-u,r*t[u]/n)}else(0,c.SR)(x,e,r)}h([0],{3:6,4:20,6:18},44,1),h([3],{3:3,4:20,6:18},41,1),h([4],{3:6,4:16,6:18},40,1),h([6],{3:6,4:20,6:12},38,1);for(var v=Array(6).fill(0).map((function(e,t){for(var n=[1],r=0,i=1;++r<=t;)i*=t-r+1,i/=r,n.push(i);return n})),Z=[[1]],p=function(){var e=Z[Z.length-1],t=Array(e.length+3).fill(0);e.forEach((function(e,n){for(var r=0,i=[0,1,2,3];r<i.length;r++){t[n+i[r]]+=e}})),Z.push(t.map((function(e){return e/4})))};Z.length<6;)p();for(var y=function(){var e=b[j],t=e.reduce((function(e,t){return e+t}));e.forEach((function(e,n,r){r[n]=t,t-=e}))},j=0,b=Z;j<b.length;j++)y();function g(e,t){if(e.rarity<=2)return NaN;var n=e.rarity,o=e.level,h=e.substats,p=(0,a.Z)({},t),y=new Set(Object.keys(p)),j=0,b=e.mainStatKey;if(b in p){var g=4*n;if(u[n][b][g]<p[b])return 0;delete p[b],y.delete(b)}var m,k=(0,i.Z)(h);try{for(k.s();!(m=k.n()).done;){var w=m.value,C=w.key,S=w.value;C?y.has(C)&&(y.delete(C),p[C]>S?p[C]-=S:delete p[C]):j+=1}}catch(D){k.e(D)}finally{k.f()}if(j+=4-h.length,y.size>j||Object.keys(p).length>4)return 0;for(var E=s.Z.rollsRemaining(o,n)-j,K=0,P=Object.entries(p);K<P.length;K++){var M=(0,r.Z)(P[K],2),_=M[0],F=M[1];p[_]=Math.max(Math.ceil(10*F/s.Z.maxSubstatValues(_,n)),1)}var R=0,A=Object.entries(p).map((function(e){var t=(0,r.Z)(e,2),n=t[0],i=t[1],l=y.has(n)?1:0,a=Math.ceil(i/10)-l;return R+=a,{target:i,filler:l,minUpgrade:a}})).reverse();if(R>E)return 0;var G=(0,l.Z)({},E,1),O=E-R;return A.forEach((function(e,t){for(var n,i,l,a=e.target,o=e.filler,c=e.minUpgrade,s={},u=c;u<=c+O;u++)for(var d=a-7*(u+o),f=d>0?Z[u+o][d]:1,x=0,h=Object.entries(G);x<h.length;x++){var p,y=(0,r.Z)(h[x],2),j=y[0],b=y[1],g=parseInt(j);if(!(g<u)){var m=(i=u,l=4-t,v[n=g][i]*Math.pow(l-1,n-i)/Math.pow(l,n)),k=g-u;s[k]=(null!==(p=s[k])&&void 0!==p?p:0)+b*f*m}}G=s})),function(e,t,n){var r,l,a=null!==(r=f[e])&&void 0!==r?r:0,o=0,s={3:2,4:5,6:3},u=x[a],h=(0,i.Z)(t);try{for(h.s();!(l=h.n()).done;){var Z=l.value.key;if(Z){var p=f[Z];u=u[p],s[p]-=1}}}catch(D){h.e(D)}finally{h.f()}a&&(s[a]-=1);var y,j={3:0,4:0,6:0},b=(0,i.Z)(n);try{for(b.s();!(y=b.n()).done;){var g=y.value;j[f[g]]+=1}}catch(D){b.e(D)}finally{b.f()}var m=0;(0,c.Q1)(u,[],(function(e){return"number"===typeof e}),(function(e,t){m+=e;var n,r={3:0,4:0,6:0},l=(0,i.Z)(t);try{for(l.s();!(n=l.n()).done;){r[n.value]+=1}}catch(D){l.e(D)}finally{l.f()}var a,c=e,s=(0,i.Z)(d);try{for(s.s();!(a=s.n()).done;){var u=a.value,f=r[u],x=j[u];if(f<x)return;c*=v[f][x]}}catch(D){s.e(D)}finally{s.f()}o+=c}));var k,w=(0,i.Z)(d);try{for(w.s();!(k=w.n()).done;){var C=k.value;o/=v[s[C]][j[C]]}}catch(D){w.e(D)}finally{w.f()}return o/m}(e.mainStatKey,h,y)*Object.values(G).reduce((function(e,t){return e+t}))}},63372:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(29439),i=n(72791),l=n(56928);function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=(0,i.useContext)(l.t),n=t.database,a=(0,i.useState)(n._getArt(e)),o=(0,r.Z)(a,2),c=o[0],s=o[1];return(0,i.useEffect)((function(){return s(n._getArt(e))}),[n,e]),(0,i.useEffect)((function(){return e?n.followArt(e,s):void 0}),[e,s,n]),c}}}]);
//# sourceMappingURL=328.87d5fe7d.chunk.js.map