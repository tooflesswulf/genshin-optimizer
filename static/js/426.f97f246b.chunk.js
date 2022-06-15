"use strict";(self.webpackChunkgenshin_optimizer=self.webpackChunkgenshin_optimizer||[]).push([[426],{52991:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(68870),i=t(20890),a=t(2191),o=t(31148),s=t(79406),c=t(42320),l=t(24351),u=t(96106),d=t(3992),f=t(25617),h=t(75545),x=t(50428),v=t(80184);function p(e){var n=e.artifactObj,t=e.slotKey,p=(0,c.Z)((null===n||void 0===n?void 0:n.setKey)&&o.y.get(n.setKey),[null===n||void 0===n?void 0:n.setKey]);if(!n||!p)return(0,v.jsx)(d.Z,{sx:{display:"flex",flexDirection:"column",height:"100%"},children:(0,v.jsx)(r.Z,{sx:{width:"100%",pb:"100%",position:"relative"},children:(0,v.jsx)(r.Z,{sx:{position:"absolute",width:"70%",height:"70%",left:"50%",top:"50%",transform:"translate(-50%, -50%)",opacity:.7},component:"img",src:a.Z.slot[t]})})});var m=n.mainStatKey,Z=n.rarity,g=n.level,j=n.mainStatVal,y="roll"+(Math.floor(Math.max(g,0)/4)+1),k=l.Kj.find((function(e){return n.mainStatKey.includes(e)})),b=null!==k&&void 0!==k?k:"secondary";return(0,v.jsxs)(d.Z,{sx:{display:"flex",flexDirection:"column",position:"relative"},children:[(0,v.jsx)(x.Z,{slotKey:t,sheet:p,children:(0,v.jsx)(r.Z,{component:"img",className:"grad-".concat(Z,"star"),src:p.slotIcons[t],maxWidth:"100%",maxHeight:"100%"})}),(0,v.jsx)(i.Z,{sx:{position:"absolute",m:-.2,lineHeight:1,pointerEvents:"none"},variant:"subtitle2",children:(0,v.jsxs)(f.Z,{color:y,children:["+",g]})}),(0,v.jsx)(i.Z,{variant:"h6",sx:{position:"absolute",bottom:0,right:0,lineHeight:1},children:(0,v.jsx)(u.Z,{placement:"top",title:(0,v.jsxs)(i.Z,{children:[(0,s.qs)(j,s.ZP.unit(m)),s.ZP.unit(m)," ",s.ZP.getStr(m)]}),disableInteractive:!0,children:(0,v.jsx)(f.Z,{color:b,sx:{p:.25},children:k?h.h[k]:h.Z[m]})})})]})}},50428:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(68870),i=t(47047),a=t(20890),o=t(72791),s=t(96106),c=t(95614),l=t(80184);function u(e){var n,t=e.slotKey,u=e.sheet,d=e.children,f=(0,l.jsxs)(r.Z,{children:[(0,l.jsx)(i.Z,{variant:"text",width:100}),(0,l.jsx)(i.Z,{variant:"text",width:100})]}),h=(0,l.jsx)(o.Suspense,{fallback:f,children:(0,l.jsxs)(r.Z,{children:[(0,l.jsx)(a.Z,{children:(0,l.jsx)("strong",{children:null===u||void 0===u?void 0:u.name})}),(0,l.jsxs)(a.Z,{children:[(0,c.Ir)(t)," ",null===u||void 0===u||null===(n=u.getSlotName)||void 0===n?void 0:n.call(u,t)]})]})});return(0,l.jsx)(s.Z,{placement:"top",title:h,disableInteractive:!0,children:d})}},96106:function(e,n,t){var r=t(4942),i=t(1413),a=t(45987),o=t(66934),s=t(40165),c=t(69293),l=t(80184),u=["className"],d=(0,o.ZP)((function(e){var n=e.className,t=(0,a.Z)(e,u);return(0,l.jsx)(s.Z,(0,i.Z)((0,i.Z)({},t),{},{arrow:!0,classes:{popper:n}}))}))((function(e){var n,t=e.theme;return n={},(0,r.Z)(n,"& .".concat(c.Z.arrow),{color:t.palette.common.black}),(0,r.Z)(n,"& .".concat(c.Z.tooltip),{backgroundColor:t.palette.common.black,maxWidth:500}),n}));n.Z=d},30865:function(e,n,t){t.d(n,{Z:function(){return z}});var r=t(29439),i=t(14361),a=t(90690),o=t(66647),s=t(47047),c=t(68870),l=t(13400),u=t(39504),d=t(61889),f=t(81918),h=t(20890),x=t(72791),v=t(2139),p=t(56928),m=t(2693),Z=t(26138),g=t(79406),j=t(84684),y=t(50920),k=t(47639),b=t(24351),C=t(60393),w=t(52991),S=t(71310),K=t(20005),I=t(88034),_=t(25617),E=t(10157),P=t(75545),D=t(77208),W=t(66218),R=t(73036),M=t(42320),N=t(3992),T=t(80184);function H(e){var n=e.weaponId,t=(0,x.useContext)(p.t).database._getWeapon(n),r=(0,M.Z)((null===t||void 0===t?void 0:t.key)&&W.Z.get(t.key),[null===t||void 0===t?void 0:t.key]),i=(0,x.useMemo)((function(){return r&&t&&(0,R.mP)([r.data,(0,R.v0)(t)])}),[r,t]);return t&&r&&i?(0,T.jsx)(N.Z,{children:(0,T.jsxs)(c.Z,{display:"flex",children:[(0,T.jsx)(c.Z,{flexShrink:1,maxWidth:"35%",display:"flex",flexDirection:"column",alignContent:"flex-end",className:"grad-".concat(r.rarity,"star"),children:(0,T.jsx)(c.Z,{component:"img",src:r.img,width:"100%",height:"auto",sx:{mt:"auto"}})}),(0,T.jsxs)(c.Z,{flexGrow:1,sx:{p:1},children:[(0,T.jsx)(h.Z,{variant:"body2",gutterBottom:!0,children:(0,T.jsx)("strong",{children:null===r||void 0===r?void 0:r.name})}),(0,T.jsxs)(h.Z,{variant:"subtitle1",sx:{display:"flex",gap:1},gutterBottom:!0,children:[(0,T.jsxs)(_.Z,{color:"primary",children:["Lv. ",W.Z.getLevelString(t)]}),r.hasRefinement&&(0,T.jsxs)(_.Z,{color:"info",children:["R",t.refinement]})]}),(0,T.jsxs)(h.Z,{variant:"subtitle1",sx:{display:"flex",gap:1},children:[(0,T.jsx)(O,{node:i.get(Z.ri.weapon.main)}),(0,T.jsx)(O,{node:i.get(Z.ri.weapon.sub)})]})]})]})}):null}function O(e){var n=e.node;if(!n.info.key)return null;var t=(0,g.EC)(n.value,n.unit,n.unit?void 0:0);return(0,T.jsxs)(_.Z,{color:"secondary",children:[P.Z[n.info.key]," ",t]})}function z(e){var n,t,r=e.characterKey,f=e.artifactChildren,h=e.weaponChildren,v=e.characterChildren,p=e.onClick,Z=e.onClickHeader,g=e.onClickTeammate,b=e.footer,w=e.isTeammateCard,I=(0,x.useContext)(m.R).teamData,_=null!==(n=(0,k.Z)(I?"":r))&&void 0!==n?n:I,E=null!==(t=null===_||void 0===_?void 0:_[r])&&void 0!==t?t:{},P=E.character,W=E.characterSheet,R=E.target,M=(0,x.useCallback)((function(){return r&&(null===p||void 0===p?void 0:p(r))}),[r,p]),N=(0,x.useCallback)((function(e){return(0,T.jsx)(o.Z,{onClick:M,sx:{flexGrow:1,display:"flex",flexDirection:"column"},children:e})}),[M]),O=(0,y.Z)(r);if(!_||!P||!W||!R)return null;var z={character:P,data:R,characterSheet:W,mainStatAssumptionLevel:0,teamData:_,characterDispatch:O};return(0,T.jsx)(x.Suspense,{fallback:(0,T.jsx)(s.Z,{variant:"rectangular",sx:{width:"100%",height:"100%",minHeight:350}}),children:(0,T.jsx)(m.R.Provider,{value:z,children:(0,T.jsxs)(S.Z,{sx:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,T.jsx)(c.Z,{sx:{display:"flex",position:"absolute",zIndex:2,opacity:.7},children:(0,T.jsx)(l.Z,{sx:{p:.5},onClick:function(e){return O({favorite:!P.favorite})},children:P.favorite?(0,T.jsx)(i.Z,{}):(0,T.jsx)(a.Z,{})})}),(0,T.jsxs)(K.Z,{condition:!!p,wrapper:N,children:[(0,T.jsx)(A,{onClick:p?void 0:Z}),(0,T.jsxs)(u.Z,{sx:{width:"100%",display:"flex",flexDirection:"column",gap:1,flexGrow:1},children:[(0,T.jsx)(B,{}),!w&&(0,T.jsxs)(d.ZP,{container:!0,columns:4,spacing:.75,children:[(0,T.jsx)(d.ZP,{item:!0,xs:1,height:"100%",children:(0,T.jsx)(D.Z,{weaponId:P.equippedWeapon})}),(0,C.w6)(0,2).map((function(e){return(0,T.jsx)(d.ZP,{item:!0,xs:1,height:"100%",children:(0,T.jsx)(j.Z,{characterKey:P.team[e],onClick:p?void 0:g,index:e})},e)}))]}),w&&(0,T.jsx)(H,{weaponId:P.equippedWeapon}),!w&&(0,T.jsx)(F,{}),h,f,v]})]}),b]})})})}function A(e){var n=e.onClick,t=(0,x.useContext)(m.R),r=t.data,i=t.characterSheet,a=r.get(Z.ri.charKey).value,s=r.get(Z.ri.charEle).value,l=r.get(Z.ri.lvl).value,u=r.get(Z.ri.constellation).value,p=r.get(Z.ri.asc).value,g=r.get(Z.ri.bonus.auto).value,j=r.get(Z.ri.bonus.skill).value,y=r.get(Z.ri.bonus.burst).value,k=r.get(Z.ri.total.auto).value,b=r.get(Z.ri.total.skill).value,C=r.get(Z.ri.total.burst).value,w=(0,x.useCallback)((function(e){return(0,T.jsx)(o.Z,{onClick:function(){return a&&(null===n||void 0===n?void 0:n(a))},sx:{flexGrow:1,display:"flex",flexDirection:"column"},children:e})}),[n,a]);return(0,T.jsx)(K.Z,{condition:!!n,wrapper:w,children:(0,T.jsxs)(c.Z,{display:"flex",position:"relative",className:"grad-".concat(i.rarity,"star"),sx:{"&::before":{content:'""',display:"block",position:"absolute",left:0,top:0,width:"100%",height:"100%",opacity:.7,backgroundImage:"url(".concat(i.bannerImg,")"),backgroundPosition:"center",backgroundSize:"cover"}},width:"100%",children:[(0,T.jsx)(c.Z,{flexShrink:1,sx:{maxWidth:{xs:"40%",lg:"40%"}},alignSelf:"flex-end",display:"flex",flexDirection:"column",zIndex:1,children:(0,T.jsx)(c.Z,{component:"img",src:i.thumbImg,width:"100%",height:"auto",maxWidth:256,sx:{mt:"auto"}})}),(0,T.jsxs)(c.Z,{flexGrow:1,sx:{py:1,pr:1},display:"flex",flexDirection:"column",zIndex:1,children:[(0,T.jsx)(f.Z,{label:(0,T.jsx)(h.Z,{variant:"subtitle1",children:i.name}),size:"small",color:s,sx:{opacity:.85}}),(0,T.jsxs)(d.ZP,{container:!0,spacing:1,flexWrap:"nowrap",children:[(0,T.jsxs)(d.ZP,{item:!0,sx:{textShadow:"0 0 5px gray"},children:[(0,T.jsxs)(h.Z,{component:"span",variant:"h6",whiteSpace:"nowrap",children:["Lv. ",l]}),(0,T.jsxs)(h.Z,{component:"span",variant:"h6",color:"text.secondary",children:["/",v.SJ[p]]})]}),(0,T.jsx)(d.ZP,{item:!0,children:(0,T.jsx)(h.Z,{variant:"h6",children:(0,T.jsxs)(_.Z,{children:["C",u]})})})]}),(0,T.jsxs)(d.ZP,{container:!0,spacing:1,flexWrap:"nowrap",children:[(0,T.jsx)(d.ZP,{item:!0,children:(0,T.jsx)(f.Z,{color:g?"info":"secondary",label:(0,T.jsx)("strong",{children:k})})}),(0,T.jsx)(d.ZP,{item:!0,children:(0,T.jsx)(f.Z,{color:j?"info":"secondary",label:(0,T.jsx)("strong",{children:b})})}),(0,T.jsx)(d.ZP,{item:!0,children:(0,T.jsx)(f.Z,{color:y?"info":"secondary",label:(0,T.jsx)("strong",{children:C})})})]}),(0,T.jsx)(h.Z,{mt:1,children:(0,T.jsx)(E.t,{stars:i.rarity,colored:!0})})]})]})})}function B(){var e=(0,x.useContext)(p.t).database,n=(0,x.useContext)(m.R).data,t=(0,x.useMemo)((function(){return b.eV.map((function(t){var r;return[t,e._getArt(null!==(r=n.get(Z.ri.art[t].id).value)&&void 0!==r?r:"")]}))}),[n,e]);return(0,T.jsx)(d.ZP,{direction:"row",container:!0,spacing:.75,columns:5,children:t.map((function(e){var n=(0,r.Z)(e,2),t=n[0],i=n[1];return(0,T.jsx)(d.ZP,{item:!0,xs:1,children:(0,T.jsx)(w.Z,{artifactObj:i,slotKey:t})},t)}))})}function F(){var e=(0,x.useContext)(m.R).data;return(0,T.jsxs)(c.Z,{sx:{width:"100%"},children:[Object.values(e.getDisplay().basic).map((function(e){return(0,T.jsx)(I.JW,{node:e},e.info.key)})),e.get(Z.ri.special).info.key&&(0,T.jsxs)(c.Z,{sx:{display:"flex",gap:1,alignItems:"center"},children:[(0,T.jsx)(h.Z,{flexGrow:1,children:(0,T.jsx)("strong",{children:"Specialized:"})}),P.Z[e.get(Z.ri.special).info.key],(0,T.jsx)(h.Z,{children:g.ZP.get(e.get(Z.ri.special).info.key)})]})]})}},84684:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(66647),i=t(47047),a=t(20890),o=t(68870),s=t(72791),c=t(2191),l=t(947),u=t(2139),d=t(13434),f=t(42320),h=t(96106),x=t(3992),v=t(20005),p=t(25617),m=t(75545),Z=t(80184);function g(e){var n=e.characterKey,t=void 0===n?"":n,g=e.index,j=void 0===g?-1:g,y=e.onClick,k=(0,f.Z)(l.Z.get(t),[t]),b=(0,d.Z)(t),C=(0,s.useCallback)((function(){return t&&(null===y||void 0===y?void 0:y(t))}),[t,y]),w=(0,s.useCallback)((function(e){return(0,Z.jsx)(r.Z,{onClick:C,children:e})}),[C]);if(k&&b){var S=(0,Z.jsx)(s.Suspense,{fallback:(0,Z.jsx)(i.Z,{variant:"text",width:100}),children:(0,Z.jsxs)(a.Z,{children:[k.elementKey&&m.Z[k.elementKey]," ",k.name]})});return(0,Z.jsx)(x.Z,{sx:{maxWidth:128,position:"relative",display:"flex",flexDirection:"column"},children:(0,Z.jsxs)(v.Z,{condition:!!y,wrapper:w,children:[(0,Z.jsx)(h.Z,{placement:"top",title:S,children:(0,Z.jsx)(o.Z,{display:"flex",className:"grad-".concat(k.rarity,"star"),children:(0,Z.jsx)(o.Z,{component:"img",src:k.thumbImgSide,maxWidth:"100%",maxHeight:"100%",sx:{transform:"scale(1.4)",transformOrigin:"bottom"}})})}),(0,Z.jsx)(a.Z,{variant:"subtitle1",sx:{position:"absolute",top:0,mt:-.2,lineHeight:1,pointerEvents:"none"},children:(0,Z.jsxs)(p.Z,{color:"primary",children:[b.level,"/",u.SJ[b.ascension]]})}),(0,Z.jsx)(a.Z,{variant:"subtitle1",sx:{position:"absolute",bottom:0,right:0,lineHeight:1,pointerEvents:"none"},children:(0,Z.jsxs)(p.Z,{color:"secondary",children:["C",b.constellation]})})]})})}return(0,Z.jsx)(x.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",py:"12.5%"},children:(0,Z.jsx)(o.Z,{component:"img",src:c.Z.team["team".concat(j+2)],sx:{width:"75%",height:"auto",opacity:.7}})})}},3082:function(e,n,t){t.d(n,{w:function(){return A}});var r=t(29439),i=t(14361),a=t(90690),o=t(39504),s=t(61889),c=t(58165),l=t(94721),u=t(47047),d=t(68870),f=t(13400),h=t(66647),x=t(20890),v=t(72791),p=t(22020),m=t(2191),Z=t(947),g=t(56928),j=t(26138),y=t(50920),k=t(68544),b=t(42320),C=t(47639),w=t(24351),S=t(50921),K=t(46956),I=t(3992),_=t(71310),E=t(68198),P=t(55942),D=t(9321),W=t(59215),R=t(25617),M=t(10157),N=t(75545),T=t(48510),H=t(73578),O=t(80184),z=["level","rarity","name"];function A(e){var n=e.show,t=e.onHide,i=e.onSelect,a=e.filter,u=void 0===a?function(){return!0}:a,d=e.newFirst,f=void 0!==d&&d,h=(0,v.useMemo)((function(){return f?["new"].concat(z):z}),[f]),x=(0,v.useContext)(g.t).database,m=(0,p.$)("page_character").t,j=(0,v.useState)(h[0]),y=(0,r.Z)(j,2),C=y[0],_=y[1],P=(0,v.useState)(!1),R=(0,r.Z)(P,2),M=R[0],N=R[1],A=(0,v.useState)(""),F=(0,r.Z)(A,2),L=F[0],Q=F[1],q=(0,v.useState)(""),V=(0,r.Z)(q,2),G=V[0],J=V[1],Y=(0,b.Z)(Z.Z.getAll,[]),U=(0,k.Z)(),X=(0,r.Z)(U,2),$=X[0],ee=X[1];(0,v.useEffect)((function(){return x.followAnyChar(ee)}),[x,ee]);var ne=(0,v.useState)(""),te=(0,r.Z)(ne,2),re=te[0],ie=te[1],ae=(0,v.useDeferredValue)(re),oe=(0,v.useMemo)((function(){return Y&&(0,S._L)(x,Y)}),[x,Y]),se=(0,v.useMemo)((function(){return Y&&$&&(0,S.zU)(x,Y)}),[$,x,Y]),ce=(0,v.useMemo)((function(){return Y?w.IV.filter((function(e){return u(x._getChar(e),Y[e])})):[]}),[x,Y,u]),le=(0,v.useMemo)((function(){return Y&&oe&&se?ce.filter((0,K.C)({element:L,weaponType:G,favorite:"yes",name:ae},se)).sort((0,K.e)(C,M,oe)).concat(ce.filter((0,K.C)({element:L,weaponType:G,favorite:"no",name:ae},se)).sort((0,K.e)(C,M,oe))):[]}),[Y,L,G,C,M,oe,se,ce,ae]);return Y?(0,O.jsx)(D.Z,{open:n,onClose:t,sx:{"& .MuiContainer-root":{justifyContent:"normal"}},children:(0,O.jsxs)(I.Z,{children:[(0,O.jsx)(o.Z,{sx:{py:1},children:(0,O.jsxs)(s.ZP,{container:!0,spacing:1,children:[(0,O.jsx)(s.ZP,{item:!0,children:(0,O.jsx)(H.Z,{sx:{height:"100%"},onChange:J,value:G,size:"small"})}),(0,O.jsx)(s.ZP,{item:!0,children:(0,O.jsx)(T.Z,{sx:{height:"100%"},onChange:Q,value:L,size:"small"})}),(0,O.jsx)(s.ZP,{item:!0,children:(0,O.jsx)(c.Z,{autoFocus:!0,value:re,onChange:function(e){return ie(e.target.value)},label:m("characterName")})}),(0,O.jsx)(s.ZP,{item:!0,flexGrow:1}),(0,O.jsx)(s.ZP,{item:!0,children:(0,O.jsx)(W.Z,{sx:{height:"100%"},sortKeys:h,value:C,onChange:_,ascending:M,onChangeAsc:N})}),(0,O.jsx)(s.ZP,{item:!0,children:(0,O.jsx)(E.Z,{onClick:t})})]})}),(0,O.jsx)(l.Z,{}),(0,O.jsx)(o.Z,{children:(0,O.jsx)(s.ZP,{container:!0,spacing:1,children:le.map((function(e){return(0,O.jsx)(s.ZP,{item:!0,xs:6,md:4,lg:3,children:(0,O.jsx)(B,{characterKey:e,characterSheet:Y[e],onClick:function(){t(),null===i||void 0===i||i(e)}},e)},e)}))})})]})}):null}function B(e){var n,t,r,o=e.onClick,s=e.characterKey,c=e.characterSheet,l=(0,C.Z)(s),p=(0,v.useContext)(g.t).database,k=(0,y.Z)(s),b=null===(n=p._getChar(s))||void 0===n?void 0:n.favorite,w=(null!==(t=null===l||void 0===l?void 0:l[s])&&void 0!==t?t:{}).target,S=c.rarity;return(0,O.jsx)(v.Suspense,{fallback:(0,O.jsx)(u.Z,{variant:"rectangular",height:130}),children:(0,O.jsxs)(d.Z,{children:[void 0!==b&&(0,O.jsx)(d.Z,{display:"flex",position:"absolute",alignSelf:"start",zIndex:1,children:(0,O.jsx)(f.Z,{sx:{p:.5},onClick:function(){return k({favorite:!b})},children:b?(0,O.jsx)(i.Z,{}):(0,O.jsx)(a.Z,{})})}),(0,O.jsx)(h.Z,{onClick:o,children:(0,O.jsxs)(_.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,O.jsx)(d.Z,{component:"img",src:c.thumbImg,sx:{width:130,height:"auto"},className:"grad-".concat(S,"star")}),(0,O.jsxs)(d.Z,{sx:{pl:1},children:[(0,O.jsx)(x.Z,{children:(0,O.jsx)("strong",{children:c.name})}),w?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(x.Z,{variant:"h6",children:[" ",c.elementKey&&N.Z[c.elementKey]," ",(0,O.jsx)(P.Z,{src:null===(r=m.Z.weaponTypes)||void 0===r?void 0:r[c.weaponTypeKey]})," ",Z.Z.getLevelString(w.get(j.ri.lvl).value,w.get(j.ri.asc).value)]}),(0,O.jsxs)(x.Z,{children:[(0,O.jsx)(R.Z,{color:"success",children:"C".concat(w.get(j.ri.constellation).value)})," ",(0,O.jsx)(R.Z,{color:w.get(j.ri.bonus.auto).value?"info":"secondary",children:(0,O.jsx)("strong",{children:w.get(j.ri.total.auto).value})})," ",(0,O.jsx)(R.Z,{color:w.get(j.ri.bonus.skill).value?"info":"secondary",children:(0,O.jsx)("strong",{children:w.get(j.ri.total.skill).value})})," ",(0,O.jsx)(R.Z,{color:w.get(j.ri.bonus.burst).value?"info":"secondary",children:(0,O.jsx)("strong",{children:w.get(j.ri.total.burst).value})})]})]}):(0,O.jsx)(O.Fragment,{children:(0,O.jsx)(x.Z,{variant:"h6",children:(0,O.jsx)(R.Z,{color:"primary",children:"NEW"})})}),(0,O.jsx)("small",{children:(0,O.jsx)(M.t,{stars:S,colored:!0})})]})]})})]})})}},88034:function(e,n,t){t.d(n,{lD:function(){return I},JW:function(){return K},ZP:function(){return C}});var r=t(35893),i=t(15021),a=t(68870),o=t(20890),s=t(47047),c=t(66934),l=t(90493),u=t(72791),d=t(2693),f=t(79406),h=t(60393),x=t(91702),v=t(1413),p=t(45987),m=t(53174),Z=t(54483),g=t(96106),j=t(80184),y=["className"],k=function(e){var n=e.className,t=(0,p.Z)(e,y);return(0,j.jsx)(g.Z,(0,v.Z)((0,v.Z)({placement:"top"},t),{},{className:n,children:(0,j.jsx)(a.Z,{component:"span",sx:{cursor:"help"},children:(0,j.jsx)(Z.G,{icon:m.Fuz})})}))},b=t(75545);function C(e){var n=e.fields;return(0,j.jsx)(I,{sx:{m:0},children:n.map((function(e,n){return(0,j.jsx)(w,{field:e,component:i.ZP},n)}))})}function w(e){var n=e.field,t=e.component,r=(0,u.useContext)(d.R),i=r.data,a=r.oldData;if(!(0,u.useMemo)((function(){var e,t;return null===(e=null===n||void 0===n||null===(t=n.canShow)||void 0===t?void 0:t.call(n,i))||void 0===e||e}),[n,i]))return null;if("node"in n){var o=i.get(n.node);if(o.isEmpty)return null;if(a){var s=a.get(n.node),c=s.isEmpty?0:s.value;return(0,j.jsx)(K,{node:o,oldValue:c,suffix:n.textSuffix,component:t})}return(0,j.jsx)(K,{node:o,suffix:n.textSuffix,component:t})}return(0,j.jsx)(S,{field:n,component:t})}function S(e){var n,t=e.field,r=e.component,i=(0,u.useContext)(d.R).data,s=(0,h.mY)(t.value,i),c=(0,h.mY)(t.variant,i),l=t.text&&(0,j.jsx)("span",{children:t.text}),f=t.textSuffix&&(0,j.jsx)("span",{children:t.textSuffix});return(0,j.jsxs)(a.Z,{width:"100%",sx:{display:"flex",justifyContent:"space-between",gap:1},component:r,children:[(0,j.jsxs)(o.Z,{color:"".concat(c,".main"),sx:{display:"flex",gap:1,alignItems:"center"},children:[l,f]}),(0,j.jsxs)(o.Z,{children:["number"===typeof s?null===(n=s.toFixed)||void 0===n?void 0:n.call(s,t.fixed):s,t.unit]})]})}function K(e){var n=e.node,t=e.oldValue,i=e.suffix,c=e.component;if(n.isEmpty)return null;i=i&&(0,j.jsx)("span",{children:i});var l=n.info.key&&b.Z[n.info.key],d=n.info.key?f.ZP.get(n.info.key):"",h=n.info.isTeamBuff,v=n.formula,p="";if(t){var m=n.value-t;p=(0,j.jsxs)("span",{children:[(0,f.EC)(t,n.unit),m>1e-4||m<-1e-4?(0,j.jsxs)(x.Z,{color:m>0?"success":"error",children:[" ",m>0?"+":"",(0,f.EC)(m,n.unit)]}):""]})}else p=(0,f.EC)(n.value,n.unit);var Z=!!n.formula&&(0,j.jsx)(k,{title:(0,j.jsx)(o.Z,{children:(0,j.jsx)(u.Suspense,{fallback:(0,j.jsx)(s.Z,{variant:"rectangular",width:300,height:30}),children:v})})});return(0,j.jsxs)(a.Z,{width:"100%",sx:{display:"flex",justifyContent:"space-between",gap:1},component:c,children:[(0,j.jsxs)(o.Z,{color:"".concat(n.info.variant,".main"),sx:{display:"flex",gap:1,alignItems:"center"},children:[!!h&&(0,j.jsx)(r.Z,{}),l,d,i]}),(0,j.jsxs)(a.Z,{sx:{display:"flex",gap:1,alignItems:"center"},children:[(0,j.jsx)(o.Z,{noWrap:!0,children:p}),Z]})]})}var I=(0,c.ZP)(l.Z)((function(e){var n=e.theme;return{borderRadius:n.shape.borderRadius,overflow:"hidden",margin:0,"> .MuiListItem-root:nth-of-type(even)":{backgroundColor:n.palette.contentDark.main},"> .MuiListItem-root:nth-of-type(odd)":{backgroundColor:n.palette.contentDarker.main}}}))},48510:function(e,n,t){t.d(n,{Z:function(){return v}});var r=t(1413),i=t(45987),a=t(72466),o=t(68870),s=t(72791),c=t(24351),l=t(66934),u=t(90388),d=(0,l.ZP)(u.Z,{shouldForwardProp:function(e){return"baseColor"!==e&&"selectedColor"!==e}})((function(e){var n=e.theme,t=e.baseColor,r=void 0===t?"secondary":t,i=e.selectedColor,a=void 0===i?"success":i;return{"&":{backgroundColor:n.palette[r].main,color:n.palette[r].contrastText},"&:hover":{backgroundColor:n.palette[r].dark},"&.Mui-selected":{backgroundColor:n.palette[a].main,color:n.palette[a].contrastText},"&.Mui-selected:hover":{backgroundColor:n.palette[a].dark},"&.Mui-disabled":{backgroundColor:n.palette[r].dark},"&.Mui-selected.Mui-disabled":{backgroundColor:n.palette[a].dark}}})),f=t(75545),h=t(80184),x=["value","onChange"];function v(e){var n=e.value,t=e.onChange,l=(0,i.Z)(e,x),u=(0,s.useCallback)((function(e,n){return t(n||"")}),[t]);return(0,h.jsx)(a.Z,(0,r.Z)((0,r.Z)({exclusive:!0,onChange:u,value:n||c.N},l),{},{children:c.N.map((function(e){return(0,h.jsx)(d,{value:e,selectedColor:e,children:(0,h.jsx)(o.Z,{sx:{fontSize:"2em",lineHeight:1},children:f.h[e]})},e)}))}))}},73578:function(e,n,t){t.d(n,{Z:function(){return h}});var r=t(1413),i=t(45987),a=t(90388),o=t(72791),s=t(2191),c=t(24351),l=t(55942),u=t(91839),d=t(80184),f=["value","onChange"];function h(e){var n=e.value,t=e.onChange,h=(0,i.Z)(e,f),x=(0,o.useCallback)((function(e,n){return t(n||"")}),[t]);return(0,d.jsx)(u.Z,(0,r.Z)((0,r.Z)({exclusive:!0,onChange:x,value:n||c.yd},h),{},{children:c.yd.map((function(e){var n;return(0,d.jsx)(a.Z,{value:e,children:(0,d.jsx)(l.Z,{src:null===(n=s.Z.weaponTypes)||void 0===n?void 0:n[e],size:2})},e)}))}))}},77208:function(e,n,t){t.d(n,{Z:function(){return m}});var r=t(68870),i=t(20890),a=t(72791),o=t(66218),s=t(56928),c=t(26138),l=t(73036),u=t(79406),d=t(42320),f=t(3992),h=t(25617),x=t(75545),v=t(41717),p=t(80184);function m(e){var n=e.weaponId,t=(0,a.useContext)(s.t).database._getWeapon(n),u=(0,d.Z)((null===t||void 0===t?void 0:t.key)&&o.Z.get(t.key),[null===t||void 0===t?void 0:t.key]),x=(0,a.useMemo)((function(){return u&&t&&(0,l.mP)([u.data,(0,l.v0)(t)])}),[u,t]);if(!t||!u||!x)return null;var m=(0,p.jsxs)(r.Z,{children:[(0,p.jsx)(Z,{node:x.get(c.ri.weapon.main)}),(0,p.jsx)(Z,{node:x.get(c.ri.weapon.sub)})]});return(0,p.jsxs)(f.Z,{sx:{height:"100%",maxWidth:128,position:"relative",display:"flex",flexDirection:"column"},children:[(0,p.jsx)(r.Z,{display:"flex",flexDirection:"column",alignContent:"flex-end",className:"grad-".concat(u.rarity,"star"),children:(0,p.jsx)(v.Z,{sheet:u,addlText:m,children:(0,p.jsx)(r.Z,{component:"img",src:u.img,maxWidth:"100%",maxHeight:"100%",sx:{mt:"auto"}})})}),(0,p.jsx)(i.Z,{variant:"subtitle1",sx:{position:"absolute",mt:-.2,lineHeight:1,pointerEvents:"none"},children:(0,p.jsx)(h.Z,{color:"primary",children:o.Z.getLevelString(t)})}),u.hasRefinement&&(0,p.jsx)(i.Z,{variant:"subtitle1",sx:{position:"absolute",bottom:0,right:0,lineHeight:1,pointerEvents:"none"},children:(0,p.jsxs)(h.Z,{color:"secondary",children:["R",t.refinement]})})]})}function Z(e){var n=e.node;if(!n.info.key)return null;var t=(0,u.EC)(n.value,n.unit,n.unit?void 0:0);return(0,p.jsxs)(i.Z,{children:[x.Z[n.info.key]," ",t]})}},41717:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(47047),i=t(20890),a=t(72791),o=t(2191),s=t(96106),c=t(55942),l=t(80184);function u(e){var n=e.sheet,t=e.addlText,u=e.children,d=(0,l.jsxs)(a.Suspense,{fallback:(0,l.jsx)(r.Z,{variant:"text",width:100}),children:[(0,l.jsxs)(i.Z,{children:[(0,l.jsx)(c.Z,{src:o.Z.weaponTypes[n.weaponType]})," ",n.name]}),t]});return(0,l.jsx)(s.Z,{placement:"top",title:d,disableInteractive:!0,children:u})}},31148:function(e,n,t){t.d(n,{i:function(){return g},y:function(){return Z}});var r=t(29439),i=t(93433),a=t(15671),o=t(43144),s=t(55942),c=t(25617),l=t(66624),u=t(26138),d=t(73036),f=t(24351),h=t(53343),x=t(80184),v=t.e(94).then(t.bind(t,39896)).then((function(e){return e.default})),p=function(e,n){return(0,x.jsx)(l.v,{ns:"artifact_".concat(e,"_gen"),key18:n})},m=v.then((function(e){return(0,d.b3)(Object.values(e).map((function(e){return e.data})))})),Z=function(){function e(n,t,r){var i=this;(0,a.Z)(this,e),this.sheet=void 0,this.key=void 0,this.data=void 0,this.getSlotName=function(e){return p(i.key,"pieces.".concat(e,".name"))},this.getSlotDesc=function(e){return p(i.key,"pieces.".concat(e,".desc"))},this.setEffectDesc=function(e){return p(i.key,"setEffects.".concat(e))},this.setEffectDocument=function(e){var n;return null===(n=i.sheet.setEffects[e])||void 0===n?void 0:n.document},this.hasEnough=function(e,n){var t;return(null!==(t=n.get(u.qH.artSet[i.key]).value)&&void 0!==t?t:0)>=e},this.sheet=t,this.key=n,this.data=r}return(0,o.Z)(e,[{key:"name",get:function(){return p(this.key,"setName")}},{key:"defIconSrc",get:function(){var e=this.slots[0];if(this.slotIcons[e])return this.slotIcons[e]}},{key:"defIcon",get:function(){return(0,x.jsx)(s.Z,{src:this.defIconSrc,sx:{fontSize:"1.5em"}})}},{key:"nameWithIcon",get:function(){var e=this.slots[0];return(0,x.jsxs)("span",{children:[(0,x.jsx)(s.Z,{src:this.slotIcons[e]})," ",p(this.key,"setName")]})}},{key:"nameRaw",get:function(){return this.sheet.name}},{key:"rarity",get:function(){return this.sheet.rarity}},{key:"slots",get:function(){switch(this.key){case"PrayersForDestiny":case"PrayersForIllumination":case"PrayersForWisdom":case"PrayersToSpringtime":return["circlet"];default:return(0,i.Z)(f.eV)}}},{key:"slotIcons",get:function(){return this.sheet.icons}},{key:"setEffects",get:function(){return this.sheet.setEffects}}],[{key:"get",value:function(e){return e?v.then((function(n){return n[e]})):void 0}},{key:"getAll",get:function(){return v}},{key:"getAllData",get:function(){return m}},{key:"setKeysByRarities",value:function(e){var n={};return Object.entries(e).forEach((function(e){var t=(0,r.Z)(e,2),a=t[0],o=t[1],s=Math.max.apply(Math,(0,i.Z)(o.rarity));n[s]?n[s].push(a):n[s]=[a]})),n}},{key:"setEffects",value:function(e,n){var t={};return Object.entries(e).forEach((function(e){var i=(0,r.Z)(e,2),a=i[0],o=i[1],s=Object.keys(o.setEffects).map((function(e){return parseInt(e)})).filter((function(e){return o.hasEnough(e,n)}));s.length&&(t[a]=s)})),t}}]),e}(),g=function(e,n){var t=function(n){return(0,x.jsx)(l.v,{ns:"artifact_".concat(e,"_gen"),key18:n})};return function(e){var r,i;return{title:t("setName"),icon:(0,x.jsx)(s.Z,{size:2,sx:{m:-1},src:null!==(r=null!==(i=n.flower)&&void 0!==i?i:n.circlet)&&void 0!==r?r:""}),action:(0,x.jsx)(c.Z,{color:"success",children:(0,h.st)("".concat(e,"set"))}),description:t("setEffects.".concat(e))}}}},11741:function(e,n,t){t.d(n,{J:function(){return M},Y:function(){return N}});var r,i=t(1413),a=t(75545),o=t(66624),s=t(26138),c=t(73036),l=t(78661),u=t(24351),d=t(60393),f=t(53343),h=t(80184),x=function(e){return(0,h.jsx)(o.v,{ns:"elementalResonance_gen",key18:e})},v=(0,d.Uq)(u.Kj,(function(e){return["".concat(e,"_res_"),(0,l.ew)(s.uK.ele,4,(0,l.aQ)(.15))]})),p={name:x("ProtectiveCanopy.name"),desc:x("ProtectiveCanopy.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.anemo," ",a.Z.geo," ",a.Z.pyro," ",a.Z.hydro," ",a.Z.cryo," ",a.Z.electro," x4"]}),canShow:function(e){return 4===u.N.filter((function(n){return e.get(s.uK[n]).value>=1})).length},sections:[{teamBuff:!0,fields:Object.values(v).map((function(e){return{node:e}}))}]},m=(0,l.ew)(s.uK.pyro,2,(0,l.aQ)(.25)),Z={name:x("FerventFlames.name"),desc:x("FerventFlames.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.pyro," ",a.Z.pyro]}),canShow:function(e){return e.get(s.uK.pyro).value>=2},sections:[{teamBuff:!0,fields:[{text:(0,f.st)("effectDuration.cryo"),value:-40,unit:"%"},{node:m}]}]},g=(0,l.ew)(s.uK.hydro,2,(0,l.aQ)(.3)),j={name:x("SoothingWater.name"),desc:x("SoothingWater.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.hydro," ",a.Z.hydro]}),canShow:function(e){return e.get(s.uK.hydro).value>=2},sections:[{teamBuff:!0,fields:[{text:(0,f.st)("effectDuration.pyro"),value:-40,unit:"%"},{node:g}]}]},y=["resonance","ShatteringIce"],k=(0,f.v9)(y),b=(0,l.ew)(s.uK.cryo,2,(0,l.Dg)(k,"on",(0,l.aQ)(.15))),C={name:x("ShatteringIce.name"),desc:x("ShatteringIce.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.cryo," ",a.Z.cryo]}),canShow:function(e){return e.get(s.uK.cryo).value>=2},sections:[{teamBuff:!0,fields:[{text:(0,f.st)("effectDuration.electro"),value:-40,unit:"%"}]},{teamBuff:!0,path:y,value:k,name:(r="ShatteringIce.cond",(0,h.jsx)(o.v,{ns:"elementalResonance",key18:r})),header:{title:x("ShatteringIce.name"),icon:a.Z.cryo},states:{on:{fields:[{node:b}]}}}]},w={name:x("HighVoltage.name"),desc:x("HighVoltage.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.electro," ",a.Z.electro]}),canShow:function(e){return e.get(s.uK.electro).value>=2},sections:[{teamBuff:!0,fields:[{text:(0,f.st)("effectDuration.hydro"),value:-40,unit:"%"}]}]},S=(0,l.ew)(s.uK.anemo,2,(0,l.aQ)(-.15)),K=(0,l.ew)(s.uK.anemo,2,(0,l.aQ)(.1)),I=(0,l.ew)(s.uK.anemo,2,(0,l.aQ)(-.05)),_={name:x("ImpetuousWinds.name"),desc:x("ImpetuousWinds.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.anemo," ",a.Z.anemo]}),canShow:function(e){return e.get(s.uK.anemo).value>=2},sections:[{teamBuff:!0,fields:[{node:S},{node:K},{node:I}]}]},E=["resonance","EnduringRock"],P=(0,f.v9)(E),D=(0,l.ew)(s.uK.geo,2,(0,l.aQ)(.15)),W=(0,l.ew)(s.uK.geo,2,(0,l.Dg)(P,"on",(0,l.aQ)(.15))),R=(0,l.ew)(s.uK.geo,2,(0,l.Dg)(P,"on",(0,l.aQ)(-.2))),M=[p,Z,j,C,w,_,{name:x("EnduringRock.name"),desc:x("EnduringRock.desc"),icon:(0,h.jsxs)("span",{children:[a.Z.geo," ",a.Z.geo]}),canShow:function(e){return e.get(s.uK.geo).value>=2},sections:[{teamBuff:!0,text:x("EnduringRock.desc"),fields:[{node:D}]},{teamBuff:!0,path:E,value:P,header:{title:x("EnduringRock.name"),icon:a.Z.geo},name:(0,f.st)("protectedByShield"),states:{on:{fields:[{node:W},{node:R},{text:(0,f.Oy)("duration"),value:15,unit:"s"}]}}}]}],N=(0,c.d1)({premod:(0,i.Z)((0,i.Z)({},v),{},{atk_:m,incHeal_:g,staminaDec_:S,moveSPD_:K,cdRed_:I,shield_:D,all_dmg_:W,geo_enemyRes_:R}),total:{critRate_:b}})},66218:function(e,n,t){t.d(n,{X:function(){return x},Z:function(){return h}});var r=t(29439),i=t(15671),a=t(43144),o=t(55942),s=t(25617),c=t(66624),l=t(26138),u=t(2139),d=t(80184),f=t.e(460).then(t.bind(t,72953)).then((function(e){return e.default})),h=function(){function e(n,t,r,a){var o=this;(0,i.Z)(this,e),this.key=void 0,this.sheet=void 0,this.data=void 0,this.rarity=void 0,this.weaponType=void 0,this.tr=function(e){return(0,d.jsx)(c.v,{ns:"weapon_".concat(o.key,"_gen"),key18:e})},this.passiveDescription=function(e){return o.hasRefinement?o.tr("passiveDescription.".concat(e)):""},this.rarity=r.rarity,this.weaponType=r.weaponType,this.key=n,this.sheet=t,this.data=a}return(0,a.Z)(e,[{key:"name",get:function(){return this.tr("name")}},{key:"hasRefinement",get:function(){return this.rarity>2}},{key:"passiveName",get:function(){return this.hasRefinement?this.tr("passiveName"):""}},{key:"description",get:function(){return this.tr("description")}},{key:"img",get:function(){return this.sheet.icon}},{key:"imgAwaken",get:function(){return this.sheet.iconAwaken}},{key:"document",get:function(){return this.sheet.document}},{key:"milestoneLevels",get:function(){return this.hasRefinement?u.D4:u.Xu}},{key:"ambiguousLevel",value:function(e){return this.hasRefinement?(0,u.ek)(e):(0,u.nB)(e)}}],[{key:"getAll",get:function(){return f}}]),e}();h.get=function(e){return e?f.then((function(n){return n[e]})):void 0},h.getWeaponsOfType=function(e,n){return Object.fromEntries(Object.entries(e).filter((function(e){var t=(0,r.Z)(e,2);t[0];return t[1].weaponType===n})))},h.getLevelString=function(e){return"".concat(e.level,"/").concat(u.SJ[e.ascension])};var x=function(e,n,t,r){var i=function(n){return(0,d.jsx)(c.v,{ns:"weapon_".concat(e,"_gen"),key18:n})};return{title:i("passiveName"),icon:function(e){return(0,d.jsx)(o.Z,{size:2,sx:{m:-1},src:e.get(l.qH.weapon.asc).value<2?n:t})},action:r&&(0,d.jsx)(s.Z,{color:"success",children:r}),description:function(e){return i("passiveDescription.".concat(e.get(l.qH.weapon.refineIndex).value))}}}},2693:function(e,n,t){t.d(n,{R:function(){return r}});var r=(0,t(72791).createContext)({})},566:function(e,n,t){t.d(n,{N:function(){return h},Z:function(){return f}});var r=t(74165),i=t(15861),a=t(72791),o=t(16871),s=t(947),c=t(56928),l=t(24351),u=t(11400),d=t(60393);function f(){var e,n=(0,a.useContext)(c.t).database,t=(0,o.s0)(),l=(null!==(e=(0,o.bS)({path:"/characters/:charKey/:tab",end:!1}))&&void 0!==e?e:{params:{tab:""}}).params.tab,d=void 0===l?"":l,f=(0,a.useCallback)(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(i){var a,o,c,l,f,x;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n._getChar(i),o=d,a){e.next=14;break}return c=h(i),n.updateChar(c),e.next=7,s.Z.get(i);case 7:if(l=e.sent){e.next=10;break}return e.abrupt("return");case 10:f=(0,u.Q)(l.weaponTypeKey),x=n.createWeapon(f),n.setWeaponLocation(x,i),o="";case 14:t("/characters/".concat(i,"/").concat(o));case 15:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[t,n,d]);return f}function h(e){return{key:e,level:1,ascension:0,hitMode:"avgHit",reactionMode:"",equippedArtifacts:(0,d.O)(l.eV,(function(){return""})),equippedWeapon:"",conditional:{},bonusStats:{},enemyOverride:{},talent:{auto:1,skill:1,burst:1},infusionAura:"",constellation:0,team:["","",""],compareData:!1,favorite:!1}}},13434:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(29439),i=t(72791),a=t(56928);function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=(0,i.useContext)(a.t),t=n.database,o=(0,i.useState)(t._getChar(e)),s=(0,r.Z)(o,2),c=s[0],l=s[1];return(0,i.useEffect)((function(){return l(t._getChar(e))}),[t,e]),(0,i.useEffect)((function(){return e?t.followChar(e,l):void 0}),[e,l,t]),c}},50920:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(93433),i=t(4942),a=t(1413),o=t(72791),s=t(56928),c=t(60393);function l(e){var n=(0,o.useContext)(s.t).database;return(0,o.useCallback)((function(t){if(e)if("type"in t)switch(t.type){case"weapon":n.setWeaponLocation(t.id,e);break;case"enemyOverride":var o=n._getChar(e),s=o.enemyOverride,l=t.statKey,u=t.value;if(s[l]===u)break;n.updateChar((0,a.Z)((0,a.Z)({},o),{},{enemyOverride:(0,a.Z)((0,a.Z)({},s),{},(0,i.Z)({},l,u))}));break;case"editStats":var d=n._getChar(e),f=t.statKey,h=t.value,x=(0,c.I8)(d.bonusStats);if(x[f]===h)break;h?x[f]=h:delete x[f],n.updateChar((0,a.Z)((0,a.Z)({},d),{},{bonusStats:x}));break;case"resetStats":var v=n._getChar(e),p=t.statKey,m=v.bonusStats;delete m[p],n.updateChar((0,a.Z)((0,a.Z)({},v),{},{bonusStats:m}));break;case"team":var Z=n._getChar(e),g=Z.team,j=t.index,y=t.charKey,k=g[j];if(g[j]=y,k){var b=n._getChar(k);b&&n.updateChar((0,a.Z)((0,a.Z)({},b),{},{team:["","",""]}))}if(y){var C=n._getChar(y);C&&C.team.forEach((function(e){if(e){var t=n._getChar(e);t&&n.updateChar((0,a.Z)((0,a.Z)({},t),{},{team:t.team.map((function(e){return e===y?"":e}))}))}}))}g.forEach((function(t,i){if(t){var o=n._getChar(t);o&&n.updateChar((0,a.Z)((0,a.Z)({},o),{},{team:[e].concat((0,r.Z)(g)).filter((function(e,n){return n!==i+1}))}))}})),n.updateChar((0,a.Z)((0,a.Z)({},Z),{},{team:g}))}else n.updateChar((0,a.Z)((0,a.Z)({},n._getChar(e)),t))}),[e,n])}},47639:function(e,n,t){t.d(n,{V:function(){return b},Z:function(){return k}});var r=t(93433),i=t(74165),a=t(4942),o=t(15861),s=t(1413),c=t(45987),l=t(29439),u=t(72791),d=t(31148),f=t(947),h=t(11741),x=t(66218),v=t(56928),p=t(26138),m=t(73036),Z=t(60393),g=t(68544),j=t(42320),y=["data"];function k(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=(0,u.useContext)(v.t),a=i.database,o=(0,g.Z)(),d=(0,l.Z)(o,2),f=d[0],h=d[1],x=(0,j.Z)(b(a,e,n,t,r),[f,e,a,n,t,r]),p=null!==x&&void 0!==x?x:{},k=p.team,C=void 0===k?[]:k,w=p.teamData,S=p.teamBundle;(0,u.useEffect)((function(){return e?a.followChar(e,h):void 0}),[e,h,a]),(0,u.useEffect)((function(){return e?a.followAnyArt(h):void 0}),[e,h,a]);var K=(0,l.Z)(C,4),I=K[0],_=K[1],E=K[2],P=K[3];(0,u.useEffect)((function(){return I?a.followChar(I,h):void 0}),[I,h,a]),(0,u.useEffect)((function(){return _?a.followChar(_,h):void 0}),[_,h,a]),(0,u.useEffect)((function(){return E?a.followChar(E,h):void 0}),[E,h,a]),(0,u.useEffect)((function(){return P?a.followChar(P,h):void 0}),[P,h,a]);var D=(0,u.useMemo)((function(){return w&&(0,m.Qo)(w,e)}),[w,e]),W=(0,u.useMemo)((function(){if(D&&S)return(0,Z.xh)(D,(function(e,n){var t=S[n],r=(t.data,(0,c.Z)(t,y));return(0,s.Z)((0,s.Z)({},e),r)}))}),[D,S]);return W}function b(e,n){return C.apply(this,arguments)}function C(){return C=(0,o.Z)((0,i.Z)().mark((function e(n,t){var r,s,c,l,u,d,f,h=arguments;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=h.length>2&&void 0!==h[2]?h[2]:0,s=h.length>3?h[3]:void 0,c=h.length>4?h[4]:void 0,t){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,w(n,t,r,s,c);case 7:if(l=e.sent){e.next=10;break}return e.abrupt("return");case 10:return u=[t],d=(0,a.Z)({},t,l),f=(0,a.Z)({},t,l.data),e.next=15,Promise.all(l.character.team.map(function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,w(n,t);case 4:if(r=e.sent){e.next=7;break}return e.abrupt("return");case 7:u.push(t),d[t]=r,f[t]=r.data;case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()));case 15:return e.abrupt("return",{team:u,teamData:f,teamBundle:d});case 16:case"end":return e.stop()}}),e)}))),C.apply(this,arguments)}function w(e,n){return S.apply(this,arguments)}function S(){return S=(0,o.Z)((0,i.Z)().mark((function e(n,t){var a,o,s,c,u,v,Z,g,j,y,k,b,C=arguments;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=C.length>2&&void 0!==C[2]?C[2]:0,o=C.length>3?C[3]:void 0,s=C.length>4?C[4]:void 0,t){e.next=5;break}return e.abrupt("return");case 5:if(c=n._getChar(t)){e.next=8;break}return e.abrupt("return");case 8:if(u=null!==s&&void 0!==s?s:n._getWeapon(c.equippedWeapon)){e.next=11;break}return e.abrupt("return");case 11:return e.next=13,Promise.all([f.Z.get(t),x.Z.get(u.key),d.y.getAllData]);case 13:if(v=e.sent,Z=(0,l.Z)(v,3),g=Z[0],j=Z[1],y=Z[2],g&&j&&y){e.next=20;break}return e.abrupt("return");case 20:return k=(null!==o&&void 0!==o?o:Object.values(c.equippedArtifacts).map((function(e){return n._getArt(e)}))).filter((function(e){return e})),b=[].concat((0,r.Z)(k.map((function(e){return(0,m.n3)(e,a)}))),[(0,m.vn)(c),g.getData(c.elementKey),(0,m.v0)(u),j.data,y,p.y0,h.Y]),e.abrupt("return",{character:c,weapon:u,characterSheet:g,weaponSheet:j,data:b});case 23:case"end":return e.stop()}}),e)}))),S.apply(this,arguments)}}}]);
//# sourceMappingURL=426.f97f246b.chunk.js.map