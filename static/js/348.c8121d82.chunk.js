"use strict";(self.webpackChunkgenshin_optimizer=self.webpackChunkgenshin_optimizer||[]).push([[348],{73578:function(n,e,t){t.d(e,{Z:function(){return p}});var i=t(1413),r=t(45987),o=t(93433),s=t(90388),a=t(2191),c=t(24351),u=t(75308),l=t(55942),d=t(91839),f=t(80184),h=["value","onChange"],x=(0,u.X)((0,o.Z)(c.yd));function p(n){var e=n.value,t=n.onChange,o=(0,r.Z)(n,h);return(0,f.jsx)(d.Z,(0,i.Z)((0,i.Z)({exclusive:!0,value:e},o),{},{children:c.yd.map((function(n){var i;return(0,f.jsx)(s.Z,{value:n,onClick:function(){return t(x(e,n))},children:(0,f.jsx)(l.Z,{src:null===(i=a.Z.weaponTypes)||void 0===i?void 0:i[n],size:2})},n)}))}))}},44361:function(n,e,t){t.d(e,{Z:function(){return b}});var i=t(93433),r=t(29439),o=t(39504),s=t(61889),a=t(94721),c=t(66647),u=t(68870),l=t(20890),d=t(72791),f=t(2191),h=t(42320),x=t(24351),p=t(66218),v=t(3992),Z=t(71310),g=t(68198),j=t(55942),m=t(9321),y=t(10157),w=t(73578),k=t(80184);function b(n){var e=n.show,t=n.onHide,b=n.onSelect,C=n.filter,P=void 0===C?function(){return!0}:C,I=n.weaponFilter,W=(0,h.Z)(p.Z.getAll,[]),T=(0,d.useState)(I?[I]:(0,i.Z)(x.yd)),S=(0,r.Z)(T,2),_=S[0],N=S[1];(0,d.useEffect)((function(){return I&&N([I])}),[I]);var z=W?(0,i.Z)(new Set(x.fG)).filter((function(n){return P(W[n])})).filter((function(n){var e;return _.includes(null===W||void 0===W||null===(e=W[n])||void 0===e?void 0:e.weaponType)})).sort((function(n,e){var t,i,r,o;return(null!==(t=null===W||void 0===W||null===(i=W[e])||void 0===i?void 0:i.rarity)&&void 0!==t?t:0)-(null!==(r=null===W||void 0===W||null===(o=W[n])||void 0===o?void 0:o.rarity)&&void 0!==r?r:0)})):[];return W?(0,k.jsx)(m.Z,{open:e,onClose:t,children:(0,k.jsxs)(v.Z,{children:[(0,k.jsx)(o.Z,{sx:{py:1},children:(0,k.jsxs)(s.ZP,{container:!0,children:[(0,k.jsx)(s.ZP,{item:!0,flexGrow:1,children:(0,k.jsx)(w.Z,{value:_,onChange:N,disabled:!!I,size:"small"})}),(0,k.jsx)(s.ZP,{item:!0,children:(0,k.jsx)(g.Z,{onClick:t})})]})}),(0,k.jsx)(a.Z,{}),(0,k.jsx)(o.Z,{children:(0,k.jsx)(s.ZP,{container:!0,spacing:1,children:z.map((function(n){var e,i=W[n];return(0,k.jsx)(s.ZP,{item:!0,lg:3,md:4,children:(0,k.jsx)(Z.Z,{sx:{height:"100%"},children:(0,k.jsxs)(c.Z,{onClick:function(){t(),b(n)},sx:{display:"flex"},children:[(0,k.jsx)(u.Z,{component:"img",src:i.img,sx:{width:100,height:"auto"},className:" grad-".concat(i.rarity,"star")}),(0,k.jsxs)(u.Z,{sx:{flexGrow:1,px:1},children:[(0,k.jsx)(l.Z,{variant:"subtitle1",children:i.name}),(0,k.jsxs)(l.Z,{children:[(0,k.jsx)(j.Z,{src:null===(e=f.Z.weaponTypes)||void 0===e?void 0:e[i.weaponType]})," ",(0,k.jsx)(y.t,{stars:i.rarity,colored:!0})]})]})]})})},n)}))})}),(0,k.jsx)(a.Z,{}),(0,k.jsx)(o.Z,{sx:{py:1},children:(0,k.jsx)(g.Z,{large:!0,onClick:t})})]})}):null}},66218:function(n,e,t){t.d(e,{X:function(){return x},Z:function(){return h}});var i=t(29439),r=t(15671),o=t(43144),s=t(55942),a=t(25617),c=t(66624),u=t(26138),l=t(2139),d=t(80184),f=t.e(460).then(t.bind(t,72953)).then((function(n){return n.default})),h=function(){function n(e,t,i,o){var s=this;(0,r.Z)(this,n),this.key=void 0,this.sheet=void 0,this.data=void 0,this.rarity=void 0,this.weaponType=void 0,this.tr=function(n){return(0,d.jsx)(c.v,{ns:"weapon_".concat(s.key,"_gen"),key18:n})},this.passiveDescription=function(n){return s.hasRefinement?s.tr("passiveDescription.".concat(n)):""},this.rarity=i.rarity,this.weaponType=i.weaponType,this.key=e,this.sheet=t,this.data=o}return(0,o.Z)(n,[{key:"name",get:function(){return this.tr("name")}},{key:"hasRefinement",get:function(){return this.rarity>2}},{key:"passiveName",get:function(){return this.hasRefinement?this.tr("passiveName"):""}},{key:"description",get:function(){return this.tr("description")}},{key:"img",get:function(){return this.sheet.icon}},{key:"imgAwaken",get:function(){return this.sheet.iconAwaken}},{key:"document",get:function(){return this.sheet.document}},{key:"milestoneLevels",get:function(){return this.hasRefinement?l.D4:l.Xu}},{key:"ambiguousLevel",value:function(n){return this.hasRefinement?(0,l.ek)(n):(0,l.nB)(n)}}],[{key:"getAll",get:function(){return f}}]),n}();h.get=function(n){return n?f.then((function(e){return e[n]})):void 0},h.getWeaponsOfType=function(n,e){return Object.fromEntries(Object.entries(n).filter((function(n){var t=(0,i.Z)(n,2);t[0];return t[1].weaponType===e})))},h.getLevelString=function(n){return"".concat(n.level,"/").concat(l.SJ[n.ascension])};var x=function(n,e,t,i){var r=function(e){return(0,d.jsx)(c.v,{ns:"weapon_".concat(n,"_gen"),key18:e})};return{title:r("passiveName"),icon:function(n){return(0,d.jsx)(s.Z,{size:2,sx:{m:-1},src:n.get(u.qH.weapon.asc).value<2?e:t})},action:i&&(0,d.jsx)(a.Z,{color:"success",children:i}),description:function(n){return r("passiveDescription.".concat(n.get(u.qH.weapon.refineIndex).value))}}}},90543:function(n,e,t){t.d(e,{Z:function(){return R}});var i,r=t(30168),o=t(53174),s=t(54483),a=t(40117),c=t(62002),u=t(63204),l=t(66647),d=t(68870),f=t(47047),h=t(13400),x=t(20890),p=t(39504),v=t(2199),Z=t(40165),g=t(24518),j=t(72791),m=t(22020),y=t(2191),w=t(71310),k=t(31038),b=t(40020),C=t(20005),P=t(55942),I=t(10157),W=t(75545),T=t(2139),S=t(66218),_=t(56928),N=t(26138),z=t(73036),A=t(79406),G=t(42320),D=t(74480),E=t(80184);function R(n){var e,t=n.weaponId,R=n.onClick,L=n.onEdit,H=n.onDelete,X=n.canEquip,M=void 0!==X&&X,O=n.extraButtons,q=(0,m.$)(["page_weapon","ui"]).t,B=(0,j.useContext)(_.t).database,K=(0,D.Z)(t),V=(0,G.Z)(null!==K&&void 0!==K&&K.key?S.Z.get(K.key):void 0,[null===K||void 0===K?void 0:K.key]),J=(0,j.useCallback)((function(n){return n.weaponTypeKey===(null===V||void 0===V?void 0:V.weaponType)}),[V]),$=(0,j.useCallback)((function(n){return(0,E.jsx)(l.Z,{onClick:function(){return null===R||void 0===R?void 0:R(t)},children:n})}),[R,t]),F=(0,j.useCallback)((function(n){return(0,E.jsx)(d.Z,{children:n})}),[]),Q=(0,j.useCallback)((function(n){return B.setWeaponLocation(t,n)}),[B,t]),U=(0,j.useMemo)((function(){return V&&K&&(0,z.mP)([V.data,(0,z.v0)(K)])}),[V,K]);if(!K||!V||!U)return null;var Y=K.level,nn=K.ascension,en=K.refinement,tn=K.id,rn=K.location,on=void 0===rn?"":rn,sn=K.lock,an=U.get(N.ri.weapon.type).value,cn=[N.ri.weapon.main,N.ri.weapon.sub,N.ri.weapon.sub2].map((function(n){return U.get(n)})),un=nn<2?null===V||void 0===V?void 0:V.img:null===V||void 0===V?void 0:V.imgAwaken;return(0,E.jsx)(j.Suspense,{fallback:(0,E.jsx)(f.Z,{variant:"rectangular",sx:{width:"100%",height:"100%",minHeight:300}}),children:(0,E.jsxs)(w.Z,{sx:{height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,E.jsxs)(C.Z,{condition:!!R,wrapper:$,falseWrapper:F,children:[(0,E.jsxs)(d.Z,{className:"grad-".concat(V.rarity,"star"),sx:{position:"relative",pt:2,px:2},children:[!R&&(0,E.jsx)(h.Z,{color:"primary",onClick:function(){return B.updateWeapon({lock:!sn},tn)},sx:{position:"absolute",right:0,bottom:0,zIndex:2},children:sn?(0,E.jsx)(a.Z,{}):(0,E.jsx)(c.Z,{})}),(0,E.jsxs)(d.Z,{sx:{position:"relative",zIndex:1},children:[(0,E.jsxs)(d.Z,{component:"div",sx:{display:"flex",alignItems:"center",gap:1,mb:1},children:[(0,E.jsx)(P.Z,{sx:{fontSize:"1.5em"},src:null===(e=y.Z.weaponTypes)||void 0===e?void 0:e[an]}),(0,E.jsx)(x.Z,{noWrap:!0,sx:{textAlign:"center",backgroundColor:"rgba(100,100,100,0.35)",borderRadius:"1em",px:1},children:(0,E.jsx)("strong",{children:V.name})})]}),(0,E.jsxs)(x.Z,{component:"span",variant:"h5",children:["Lv. ",Y]}),(0,E.jsxs)(x.Z,{component:"span",variant:"h5",color:"text.secondary",children:["/",T.SJ[nn]]}),(0,E.jsxs)(x.Z,{variant:"h6",children:["Refinement ",(0,E.jsx)("strong",{children:en})]}),(0,E.jsx)(x.Z,{children:(0,E.jsx)(I.t,{stars:V.rarity,colored:!0})})]}),(0,E.jsx)(d.Z,{sx:{height:"100%",position:"absolute",right:0,top:0},children:(0,E.jsx)(d.Z,{component:"img",src:null!==un&&void 0!==un?un:"",width:"auto",height:"100%",sx:{float:"right"}})})]}),(0,E.jsx)(p.Z,{children:cn.map((function(n){if(!n.info.key)return null;var e=(0,A.EC)(n.value,n.unit,n.unit?void 0:0);return(0,E.jsxs)(d.Z,{sx:{display:"flex"},children:[(0,E.jsxs)(x.Z,{flexGrow:1,children:[W.Z[n.info.key]," ",A.ZP.get(n.info.key)]}),(0,E.jsx)(x.Z,{children:e})]},n.info.key)}))})]}),(0,E.jsxs)(d.Z,{sx:{p:1,display:"flex",gap:1,justifyContent:"space-between",alignItems:"center"},children:[M?(0,E.jsx)(k.Z,{size:"small",sx:{flexGrow:1},disable:function(n){return""===n},showDefault:!0,defaultIcon:(0,E.jsx)(u.Z,{}),defaultText:q("ui:inventory"),value:on,onChange:Q,filter:J,disableClearable:!0}):(0,E.jsx)(b.Z,{location:on}),(0,E.jsxs)(v.Z,{children:[!!L&&(0,E.jsx)(Z.Z,{title:(0,E.jsx)(x.Z,{children:q(i||(i=(0,r.Z)(["page_weapon:edit"])))}),placement:"top",arrow:!0,children:(0,E.jsx)(g.Z,{color:"info",onClick:function(){return L(tn)},children:(0,E.jsx)(s.G,{icon:o.Xcf,className:"fa-fw"})})}),!!H&&(0,E.jsx)(g.Z,{color:"error",onClick:function(){return H(tn)},disabled:!!on||sn,children:(0,E.jsx)(s.G,{icon:o.I7k,className:"fa-fw"})}),O]})]})]})})}},70348:function(n,e,t){t.r(e),t.d(e,{default:function(){return B}});var i=t(74165),r=t(15861),o=t(29439),s=t(93433),a=t(53174),c=t(54483),u=t(68870),l=t(61889),d=t(90388),f=t(57246),h=t(47047),x=t(39504),p=t(20890),v=t(24518),Z=t(30178),g=t(72791),j=t(10757),m=t(22020),y=t(76899),w=t(3992),k=t(91839),b=t(59215),C=t(10157),P=t(73578),I=t(44361),W=t(66218),T=t(56928),S=t(17278),_=t(68544),N=t(70645),z=t(42320),A=t(24351),G=t(46956),D=t(60393),E=t(66045),R=t(11400),L=t(90543),H=t(80184),X=(0,g.lazy)((function(){return Promise.all([t.e(913),t.e(476)]).then(t.bind(t,74476))})),M={xs:1,sm:2,md:3,lg:3,xl:4},O={xs:9,sm:11,md:23,lg:23,xl:23},q=function(){return{editWeaponId:"",sortType:E.Ol[0],ascending:!1,rarity:(0,s.Z)(A.wC),weaponType:(0,s.Z)(A.yd)}};function B(){var n=(0,m.$)(["page_weapon","ui"]).t,e=(0,g.useContext)(T.t).database,t=(0,S.Z)("WeaponDisplay",q),s=(0,o.Z)(t,2),y=s[0],B=s[1],V=(0,g.useState)(!1),J=(0,o.Z)(V,2),$=J[0],F=J[1],Q=(0,_.Z)(),U=(0,o.Z)(Q,2),Y=U[0],nn=U[1],en=(0,g.useRef)(null),tn=(0,g.useState)(0),rn=(0,o.Z)(tn,2),on=rn[0],sn=rn[1];(0,g.useEffect)((function(){return j.ZP.send({hitType:"pageview",page:"/weapon"}),e.followAnyWeapon(nn)}),[nn,e]);var an=(0,N.Z)(),cn=O[an],un=(0,z.Z)(W.Z.getAll,[]),ln=(0,g.useCallback)(function(){var n=(0,r.Z)((0,i.Z)().mark((function n(t){var r,o;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e._getWeapon(t)){n.next=3;break}return n.abrupt("return");case 3:if(o=Z.ZP.t("weapon_".concat(r.key,"_gen:name")),window.confirm("Are you sure you want to remove ".concat(o,"?"))){n.next=6;break}return n.abrupt("return");case 6:e.removeWeapon(t),y.editWeaponId===t&&B({editWeaponId:""});case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),[y.editWeaponId,B,e]),dn=(0,g.useCallback)((function(n){B({editWeaponId:n})}),[B]),fn=(0,g.useCallback)((function(n){dn(e.createWeapon((0,R.x)(n)))}),[e,dn]),hn=y.sortType,xn=y.ascending,pn=y.weaponType,vn=y.rarity,Zn=(0,g.useMemo)((function(){return un&&(0,E.Sn)(un)}),[un]),gn=(0,g.useMemo)((function(){return un&&(0,E.Xg)(un)}),[un]),jn=(0,g.useMemo)((function(){var n=e._getWeapons(),t=n.length;if(!Zn||!gn)return{weaponIdList:[],totalWeaponNum:t};var i=n.filter((0,G.C)({weaponType:pn,rarity:vn},gn)).sort((0,G.e)(hn,xn,Zn)).map((function(n){return n.id}));return Y&&{weaponIdList:i,totalWeaponNum:t}}),[Y,e,Zn,gn,hn,xn,vn,pn]),mn=jn.weaponIdList,yn=jn.totalWeaponNum,wn=(0,g.useMemo)((function(){var n=Math.ceil(mn.length/cn),e=(0,D.uZ)(on,0,n-1);return{weaponIdsToShow:mn.slice(e*cn,(e+1)*cn),numPages:n,currentPageIndex:e}}),[mn,on,cn]),kn=wn.weaponIdsToShow,bn=wn.numPages,Cn=wn.currentPageIndex,Pn=mn.length!==yn?"".concat(mn.length,"/").concat(yn):"".concat(yn),In=(0,g.useCallback)((function(n,e){var t;null===(t=en.current)||void 0===t||t.scrollIntoView({behavior:"smooth"}),sn(e-1)}),[sn,en]),Wn=(0,g.useCallback)((function(){return B({editWeaponId:""})}),[B]),Tn=y.editWeaponId;return(0,g.useEffect)((function(){Tn&&(e._getWeapon(Tn)||Wn())}),[e,Tn,Wn]),(0,H.jsxs)(u.Z,{my:1,display:"flex",flexDirection:"column",gap:1,children:[(0,H.jsx)(g.Suspense,{fallback:!1,children:(0,H.jsx)(X,{weaponId:Tn,footer:!0,onClose:Wn})}),(0,H.jsxs)(w.Z,{ref:en,sx:{p:2,pb:1},children:[(0,H.jsxs)(l.ZP,{container:!0,spacing:1,sx:{mb:1},children:[(0,H.jsx)(l.ZP,{item:!0,children:(0,H.jsx)(P.Z,{sx:{height:"100%"},onChange:function(n){return B({weaponType:n})},value:pn,size:"small"})}),(0,H.jsx)(l.ZP,{item:!0,flexGrow:1,children:(0,H.jsx)(k.Z,{sx:{height:"100%"},onChange:function(n,e){return B({rarity:e})},value:vn,size:"small",children:A.wC.map((function(n){return(0,H.jsx)(d.Z,{value:n,children:(0,H.jsxs)(u.Z,{display:"flex",gap:1,children:[(0,H.jsx)("strong",{children:n}),(0,H.jsx)(C.t,{stars:1})]})},n)}))})}),(0,H.jsx)(l.ZP,{item:!0,children:(0,H.jsx)(b.Z,{sx:{height:"100%"},sortKeys:E.Ol,value:hn,onChange:function(n){return B({sortType:n})},ascending:xn,onChangeAsc:function(n){return B({ascending:n})}})})]}),(0,H.jsxs)(l.ZP,{container:!0,alignItems:"flex-end",children:[(0,H.jsx)(l.ZP,{item:!0,flexGrow:1,children:(0,H.jsx)(f.Z,{count:bn,page:Cn+1,onChange:In})}),(0,H.jsx)(l.ZP,{item:!0,children:(0,H.jsx)(K,{numShowing:kn.length,total:Pn,t:n})})]})]}),(0,H.jsx)(g.Suspense,{fallback:(0,H.jsx)(h.Z,{variant:"rectangular",sx:{width:"100%",height:"100%",minHeight:500}}),children:(0,H.jsxs)(l.ZP,{container:!0,spacing:1,columns:M,children:[(0,H.jsx)(l.ZP,{item:!0,xs:1,children:(0,H.jsxs)(w.Z,{sx:{height:"100%",width:"100%",minHeight:300,display:"flex",flexDirection:"column"},children:[(0,H.jsx)(x.Z,{children:(0,H.jsx)(p.Z,{sx:{textAlign:"center"},children:"Add New Weapon"})}),(0,H.jsx)(I.Z,{show:$,onHide:function(){return F(!1)},onSelect:fn}),(0,H.jsx)(u.Z,{sx:{flexGrow:1,display:"flex",justifyContent:"center",alignItems:"center"},children:(0,H.jsx)(v.Z,{onClick:function(){return F(!0)},color:"info",sx:{borderRadius:"1em"},children:(0,H.jsx)(p.Z,{variant:"h1",children:(0,H.jsx)(c.G,{icon:a.r8p,className:"fa-fw"})})})})]})}),kn.map((function(n){return(0,H.jsx)(l.ZP,{item:!0,xs:1,children:(0,H.jsx)(L.Z,{weaponId:n,onDelete:ln,onEdit:dn,canEquip:!0})},n)}))]})}),bn>1&&(0,H.jsx)(w.Z,{children:(0,H.jsx)(x.Z,{children:(0,H.jsxs)(l.ZP,{container:!0,alignItems:"flex-end",children:[(0,H.jsx)(l.ZP,{item:!0,flexGrow:1,children:(0,H.jsx)(f.Z,{count:bn,page:Cn+1,onChange:In})}),(0,H.jsx)(l.ZP,{item:!0,children:(0,H.jsx)(K,{numShowing:kn.length,total:Pn,t:n})})]})})})]})}function K(n){var e=n.numShowing,t=n.total,i=n.t;return(0,H.jsx)(p.Z,{color:"text.secondary",children:(0,H.jsxs)(y.c,{t:i,i18nKey:"showingNum",count:e,value:t,children:["Showing ",(0,H.jsx)("b",{children:{count:e}})," out of ",{value:t}," Weapons"]})})}},74480:function(n,e,t){t.d(e,{Z:function(){return s}});var i=t(29439),r=t(72791),o=t(56928);function s(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=(0,r.useContext)(o.t),t=e.database,s=(0,r.useState)(t._getWeapon(n)),a=(0,i.Z)(s,2),c=a[0],u=a[1];return(0,r.useEffect)((function(){return u(t._getWeapon(n))}),[t,n]),(0,r.useEffect)((function(){return n?t.followWeapon(n,u):void 0}),[n,u,t]),c}},75308:function(n,e,t){t.d(e,{X:function(){return o}});var i=t(93433),r=t(60393);function o(n){return function(e,t){var o=e.length;return o===n.length?[t]:1===o&&e[0]===t?(0,i.Z)(n):(0,i.Z)(new Set((0,r.nh)(e,t)))}}},66045:function(n,e,t){t.d(e,{Ol:function(){return i},Sn:function(){return r},Xg:function(){return o}});var i=["level","rarity"];function r(n){return{level:{getValue:function(n){var e;return null!==(e=n.level)&&void 0!==e?e:0},tieBreaker:"rarity"},rarity:{getValue:function(e){var t;return null===n||void 0===n||null===(t=n[e.key])||void 0===t?void 0:t.rarity},tieBreaker:"level"}}}function o(n){return{rarity:function(e,t){var i;return t.includes(null===n||void 0===n||null===(i=n[e.key])||void 0===i?void 0:i.rarity)},weaponType:function(e,t){var i;return t.includes(null===n||void 0===n||null===(i=n[e.key])||void 0===i?void 0:i.weaponType)}}}},15861:function(n,e,t){function i(n,e,t,i,r,o,s){try{var a=n[o](s),c=a.value}catch(u){return void t(u)}a.done?e(c):Promise.resolve(c).then(i,r)}function r(n){return function(){var e=this,t=arguments;return new Promise((function(r,o){var s=n.apply(e,t);function a(n){i(s,r,o,a,c,"next",n)}function c(n){i(s,r,o,a,c,"throw",n)}a(void 0)}))}}t.d(e,{Z:function(){return r}})}}]);
//# sourceMappingURL=348.c8121d82.chunk.js.map