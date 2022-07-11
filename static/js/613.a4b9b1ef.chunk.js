"use strict";(self.webpackChunkgenshin_optimizer=self.webpackChunkgenshin_optimizer||[]).push([[613],{96106:function(e,t,n){var r=n(4942),i=n(1413),s=n(45987),c=n(66934),o=n(40165),a=n(69293),l=n(80184),u=["className"],d=(0,c.ZP)((function(e){var t=e.className,n=(0,s.Z)(e,u);return(0,l.jsx)(o.Z,(0,i.Z)((0,i.Z)({},n),{},{arrow:!0,classes:{popper:t}}))}))((function(e){var t,n=e.theme;return t={},(0,r.Z)(t,"& .".concat(a.Z.arrow),{color:n.palette.common.black}),(0,r.Z)(t,"& .".concat(a.Z.tooltip),{backgroundColor:n.palette.common.black,maxWidth:500}),t}));t.Z=d},97714:function(e,t,n){n.d(t,{K:function(){return r}});var r=(0,n(72791).createContext)({})},13746:function(e,t,n){n.d(t,{R:function(){return r}});var r=(0,n(72791).createContext)({})},31148:function(e,t,n){n.d(t,{i:function(){return p},y:function(){return y}});var r=n(29439),i=n(93433),s=n(15671),c=n(43144),o=n(55942),a=n(25617),l=n(66624),u=n(26138),d=n(73036),f=n(24351),h=n(53343),x=n(80184),j=n.e(94).then(n.bind(n,39896)).then((function(e){return e.default})),m=function(e,t){return(0,x.jsx)(l.v,{ns:"artifact_".concat(e,"_gen"),key18:t})},Z=j.then((function(e){return(0,d.b3)(Object.values(e).map((function(e){return e.data})))})),y=function(){function e(t,n,r){var i=this;(0,s.Z)(this,e),this.sheet=void 0,this.key=void 0,this.data=void 0,this.getSlotName=function(e){return m(i.key,"pieces.".concat(e,".name"))},this.getSlotDesc=function(e){return m(i.key,"pieces.".concat(e,".desc"))},this.setEffectDesc=function(e){return m(i.key,"setEffects.".concat(e))},this.setEffectDocument=function(e){var t;return null===(t=i.sheet.setEffects[e])||void 0===t?void 0:t.document},this.hasEnough=function(e,t){var n;return(null!==(n=t.get(u.qH.artSet[i.key]).value)&&void 0!==n?n:0)>=e},this.sheet=n,this.key=t,this.data=r}return(0,c.Z)(e,[{key:"name",get:function(){return m(this.key,"setName")}},{key:"defIconSrc",get:function(){var e=this.slots[0];if(this.slotIcons[e])return this.slotIcons[e]}},{key:"defIcon",get:function(){return(0,x.jsx)(o.Z,{src:this.defIconSrc,sx:{fontSize:"1.5em"}})}},{key:"nameWithIcon",get:function(){var e=this.slots[0];return(0,x.jsxs)("span",{children:[(0,x.jsx)(o.Z,{src:this.slotIcons[e]})," ",m(this.key,"setName")]})}},{key:"nameRaw",get:function(){return this.sheet.name}},{key:"rarity",get:function(){return this.sheet.rarity}},{key:"slots",get:function(){switch(this.key){case"PrayersForDestiny":case"PrayersForIllumination":case"PrayersForWisdom":case"PrayersToSpringtime":return["circlet"];default:return(0,i.Z)(f.eV)}}},{key:"slotIcons",get:function(){return this.sheet.icons}},{key:"setEffects",get:function(){return this.sheet.setEffects}}],[{key:"get",value:function(e){return e?j.then((function(t){return t[e]})):void 0}},{key:"getAll",get:function(){return j}},{key:"getAllData",get:function(){return Z}},{key:"setKeysByRarities",value:function(e){var t={};return Object.entries(e).forEach((function(e){var n=(0,r.Z)(e,2),s=n[0],c=n[1],o=Math.max.apply(Math,(0,i.Z)(c.rarity));t[o]?t[o].push(s):t[o]=[s]})),t}},{key:"setEffects",value:function(e,t){var n={};return Object.entries(e).forEach((function(e){var i=(0,r.Z)(e,2),s=i[0],c=i[1],o=Object.keys(c.setEffects).map((function(e){return parseInt(e)})).filter((function(e){return c.hasEnough(e,t)}));o.length&&(n[s]=o)})),n}}]),e}(),p=function(e,t){var n=function(t){return(0,x.jsx)(l.v,{ns:"artifact_".concat(e,"_gen"),key18:t})};return function(e){var r,i;return{title:n("setName"),icon:(0,x.jsx)(o.Z,{size:2,sx:{m:-1},src:null!==(r=null!==(i=t.flower)&&void 0!==i?i:t.circlet)&&void 0!==r?r:""}),action:(0,x.jsx)(a.Z,{color:"success",children:(0,h.st)("".concat(e,"set"))}),description:n("setEffects.".concat(e))}}}},27612:function(e,t,n){n.r(t),n.d(t,{default:function(){return ae}});var r=n(30168),i=n(29439),s=n(93433),c=n(1413),o=n(53174),a=n(54483),l=n(49670),u=n(68870),d=n(94070),f=n(50533),h=n(39504),x=n(61889),j=n(24518),m=n(57246),Z=n(47047),y=n(20890),p=n(72791),b=n(10757),g=n(22020),v=n(76899),k=n(43504),w=n(15678),P=n(3992),I=n(4942),C=n(94721),A=n(17278),S=n(60393),E=n(68198),F=n(9321),K=n(66624),O=n(80184);function D(){return{artifactPage:!0,buildPage:!0,characterPage:!0}}function G(e){var t=e.pageKey,n=e.text,r=void 0===n?"":n,s=e.modalTitle,c=void 0===s?"":s,l=e.children,u=(0,A.Z)("InfoShown",D),d=(0,i.Z)(u,2),f=d[0],m=d[1],b=f[t],g=(0,p.useCallback)((function(e){return m((0,I.Z)({},t,e))}),[m,t]),v=(0,p.useState)(Array.isArray(r)?(0,S.F_)(r):r),k=(0,i.Z)(v,1)[0],w=function(){return g(!1)};return(0,O.jsxs)(P.Z,{children:[(0,O.jsxs)(x.ZP,{container:!0,children:[(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)(y.Z,{variant:"caption",pl:1,children:k})}),(0,O.jsx)(x.ZP,{item:!0,xs:"auto",children:(0,O.jsx)(j.Z,{size:"small",color:"info",variant:"contained",onClick:function(){return g(!0)},startIcon:(0,O.jsx)(a.G,{icon:o.Fuz}),children:(0,O.jsx)(K.v,{ns:"ui",key18:"info"})})})]}),(0,O.jsx)(F.Z,{containerProps:{maxWidth:"xl"},open:b,onClose:function(){return w()},children:(0,O.jsxs)(P.Z,{children:[(0,O.jsx)(h.Z,{sx:{py:1},children:(0,O.jsxs)(x.ZP,{container:!0,children:[(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)(y.Z,{variant:"h6",children:c})}),(0,O.jsx)(x.ZP,{item:!0,children:(0,O.jsx)(E.Z,{onClick:w})})]})}),(0,O.jsx)(C.Z,{}),(0,O.jsx)(h.Z,{children:(0,O.jsx)(p.Suspense,{fallback:(0,O.jsx)(Z.Z,{variant:"rectangular",width:"100%",height:500}),children:l})}),(0,O.jsx)(C.Z,{}),(0,O.jsx)(h.Z,{sx:{py:1},children:(0,O.jsx)(E.Z,{large:!0,onClick:w})})]})})]})}var T=n(59215),M=n(7618),N=n(68544),z=n(70645),W=n(12759),U=n(50765),_=n(46956),q=n(72838),R=n(62002),H=n(40117),L=n(25617),Q=(0,p.lazy)((function(){return Promise.all([n.e(889),n.e(367)]).then(n.bind(n,80367))}));function V(e){var t=e.filterOption,n=e.filterOptionDispatch,r=e.filterDispatch,i=e.numShowing,s=e.total,c=(0,g.$)(["artifact","ui"]).t;return(0,O.jsx)(p.Suspense,{fallback:(0,O.jsx)(Z.Z,{variant:"rectangular",width:"100%",height:300}),children:(0,O.jsx)(P.Z,{children:(0,O.jsxs)(h.Z,{children:[(0,O.jsxs)(x.ZP,{container:!0,children:[(0,O.jsx)(x.ZP,{item:!0,children:(0,O.jsx)(y.Z,{variant:"h6",children:(0,O.jsx)(v.c,{t:c,i18nKey:"artifactFilter",children:"Artifact Filter"})})}),(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,display:"flex",justifyContent:"center",alignItems:"center",children:i!==s&&(0,O.jsxs)(y.Z,{children:["Filtered ",i," / ",s]})}),(0,O.jsx)(x.ZP,{item:!0,children:(0,O.jsx)(j.Z,{size:"small",color:"error",onClick:function(){return r({type:"reset"})},startIcon:(0,O.jsx)(l.Z,{}),children:(0,O.jsx)(v.c,{t:c,i18nKey:"ui:reset"})})})]}),(0,O.jsx)(p.Suspense,{fallback:(0,O.jsx)(Z.Z,{variant:"rectangular",width:"100%",height:200}),children:(0,O.jsx)(Q,{filterOption:t,filterOptionDispatch:n})})]})})})}function $(e){var t=e.artifactIds,n=(0,g.$)(["artifact","ui"]).t,r=(0,p.useContext)(M.t).database,i=(0,p.useMemo)((function(){var e=t.map((function(e){return r.arts.get(e)})),n=e.reduce((function(e,t){return e+(t.lock?0:1)}),0),i=e.length-n,s=n,c=e.reduce((function(e,t){return e+(t.location?1:0)}),0),o=e.reduce((function(e,t){return e+(t.exclude?1:0)}),0);return{numDelete:s,numUnequip:c,numExclude:o,numInclude:e.length-o,numUnlock:n,numLock:i}}),[t,r]),s=i.numDelete,c=i.numUnequip,l=i.numExclude,u=i.numInclude,d=i.numUnlock,f=i.numLock;return(0,O.jsxs)(x.ZP,{container:!0,spacing:1,alignItems:"center",children:[(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!c,onClick:function(){return window.confirm("Are you sure you want to unequip ".concat(c," artifacts currently equipped on characters?"))&&t.map((function(e){return r.arts.set(e,{location:""})}))},startIcon:(0,O.jsx)(a.G,{icon:o.wOQ}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.unequipArtifacts",children:"Unequip Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:c?"success":"secondary",children:c})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!s,onClick:function(){return window.confirm("Are you sure you want to delete ".concat(s," artifacts?"))&&t.map((function(e){var t;return!(null!==(t=r.arts.get(e))&&void 0!==t&&t.lock)&&r.arts.remove(e)}))},startIcon:(0,O.jsx)(a.G,{icon:o.$aW}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.deleteArtifacts",children:"Delete Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:s?"success":"secondary",children:s})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!u,onClick:function(){return window.confirm("Are you sure you want to exclude ".concat(u," artifacts from build generations?"))&&t.map((function(e){return r.arts.set(e,{exclude:!0})}))},startIcon:(0,O.jsx)(a.G,{icon:o.gPx}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.excludeArtifacts",children:"Exclude Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:u?"success":"secondary",children:u})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!l,onClick:function(){return window.confirm("Are you sure you want to include ".concat(l," artifacts in build generations?"))&&t.map((function(e){return r.arts.set(e,{exclude:!1})}))},startIcon:(0,O.jsx)(a.G,{icon:o.Stf}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.includeArtifacts",children:"Include Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:l?"success":"secondary",children:l})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!f,onClick:function(){return window.confirm("Are you sure you want to unlock ".concat(f," artifacts?"))&&t.map((function(e){return r.arts.set(e,{lock:!1})}))},startIcon:(0,O.jsx)(R.Z,{}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.unlockrtifacts",children:"Unlock Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:f?"success":"secondary",children:f})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,O.jsxs)(j.Z,{fullWidth:!0,color:"error",disabled:!d,onClick:function(){return window.confirm("Are you sure you want to lock ".concat(d," artifacts?"))&&t.map((function(e){return r.arts.set(e,{lock:!0})}))},startIcon:(0,O.jsx)(H.Z,{}),children:[(0,O.jsx)(v.c,{t:n,i18nKey:"button.lockArtifacts",children:"Lock Artifacts"}),(0,O.jsx)(L.Z,{sx:{ml:1},color:d?"success":"secondary",children:d})]})}),(0,O.jsx)(x.ZP,{item:!0,xs:12,sm:12,md:6,display:"flex",justifyContent:"space-around",children:(0,O.jsx)(y.Z,{variant:"caption",color:"text.secondary",children:(0,O.jsxs)(v.c,{t:n,i18nKey:"buttonHint",children:["Note: the red buttons above only applies to ",(0,O.jsx)("b",{children:"currently filtered artifacts"})]})})})]})}var B=n(44824),J=n(71310),X=n(91702),Y=n(14525);function ee(e){var t=e.probabilityFilter,n=void 0===t?{}:t,r=e.setProbabilityFilter,s=e.disabled,o=void 0!==s&&s,a=U._.filter((function(e){return!Object.keys(n).some((function(t){return t===e}))})),l=(0,p.useCallback)((function(e,t){return r((0,c.Z)((0,c.Z)({},n),{},(0,I.Z)({},e,t)))}),[n,r]);return(0,O.jsxs)(P.Z,{children:[(0,O.jsx)(h.Z,{sx:{py:1},children:(0,O.jsxs)(y.Z,{variant:"h6",children:["Roll Probability Calculator ",(0,O.jsx)(L.Z,{color:"success",children:"TC Feature"})]})}),(0,O.jsx)(C.Z,{}),(0,O.jsx)(h.Z,{children:(0,O.jsxs)(x.ZP,{container:!0,spacing:1,children:[(0,O.jsx)(x.ZP,{item:!0,xs:12,md:6,children:(0,O.jsx)(J.Z,{children:(0,O.jsx)(h.Z,{children:(0,O.jsxs)(y.Z,{children:['This UI only pops up when "Sort by" ',(0,O.jsx)("strong",{children:"Probability"}),". In conjunction with the Artifact Filters above, this UI allows you to set a criteria for substats values, and it will sort the artifacts by those with the highest probability to roll into those criteria values.",(0,O.jsx)(X.Z,{color:"warning",children:" Artifacts that already reach the criteria(100%) or are at 0% are hidden."})]})})})}),(0,O.jsxs)(x.ZP,{item:!0,xs:12,md:6,container:!0,spacing:1,children:[Object.entries(n).map((function(e){var t=(0,i.Z)(e,2),s=t[0],u=t[1];return(0,O.jsx)(x.ZP,{item:!0,xs:12,children:(0,O.jsx)(Y.b,{statKey:s,statKeys:a,setFilter:l,disabled:o,value:u,close:function(){delete n[s],r((0,c.Z)({},n))}})},s)})),(0,O.jsx)(x.ZP,{item:!0,xs:12,children:(0,O.jsx)(Y.b,{value:void 0,close:void 0,statKeys:a,setFilter:l,disabled:o})})]})]})})]})}var te,ne=n(44217),re=p.lazy((function(){return Promise.all([n.e(788),n.e(213)]).then(n.bind(n,66585))})),ie=p.lazy((function(){return n.e(383).then(n.bind(n,66311))})),se={xs:1,sm:2,md:3,lg:3,xl:4},ce={xs:9,sm:11,md:23,lg:23,xl:23};function oe(){return(0,c.Z)((0,c.Z)({},(0,B.sZ)()),{},{effFilter:(0,s.Z)(U._),probabilityFilter:{}})}function ae(){var e=(0,A.Z)("GlobalSettings",W.c),t=(0,i.Z)(e,1)[0].tcMode,n=(0,g.$)(["artifact","ui"]).t,o=(0,p.useContext)(M.t).database,a=(0,A.Z)("ArtifactDisplay",oe),y=(0,i.Z)(a,2),I=y[0],C=y[1],E=(0,p.useCallback)((function(e){"reset"===e.type?C((0,B.sZ)()):C(e)}),[C]),F=(0,z.Z)(),K=ce[F],D=I.effFilter,R=I.filterOption,H=I.ascending,L=I.probabilityFilter,Q=I.sortType,J=t&&"probability"===Q;"probability"!==Q||t||E({sortType:B.OQ[0]});var X=(0,p.useState)(0),Y=(0,i.Z)(X,2),re=Y[0],ae=Y[1],de=(0,p.useRef)(null),fe=(0,N.Z)(),he=(0,i.Z)(fe,2),xe=he[0],je=he[1],me=(0,p.useMemo)((function(){return new Set(D)}),[D]),Ze=(0,p.useCallback)((function(e){return o.arts.remove(e)}),[o]);(0,p.useEffect)((function(){return b.ZP.send({hitType:"pageview",page:"/artifact"}),o.arts.followAny(je)}),[o,je]);var ye=(0,p.useCallback)((function(e){E({filterOption:(0,c.Z)((0,c.Z)({},R),e)})}),[E,R]),pe=(0,p.useCallback)((function(e){return E({probabilityFilter:e})}),[E]),be=(0,p.useMemo)((function(){return!o.arts.values.length}),[o]),ge=(0,p.useMemo)((function(){return(0,B.x3)(me,L)}),[me,L]),ve=(0,p.useMemo)((function(){return(0,B.EM)()}),[]),ke=(0,p.useDeferredValue)(I),we=(0,p.useDeferredValue)(L);(0,p.useEffect)((function(){if(J)return o.arts.values.forEach((function(e){return o.arts.setProbability(e.id,(0,ne.B)(e,we))})),function(){o.arts.values.forEach((function(e){return o.arts.setProbability(e.id,-1)}))}}),[o,J,we]);var Pe=(0,p.useMemo)((function(){var e=ke.sortType,t=void 0===e?B.OQ[0]:e,n=ke.ascending,r=void 0!==n&&n,i=ke.filterOption,s=o.arts.values,a=(0,_.C)(i,ve),l=(0,_.e)(t,r,ge);J&&(s=s.filter((function(e){return e.probability&&1!==e.probability})));var u=s.filter(a).sort(l).map((function(e){return e.id}));return(0,c.Z)({artifactIds:u,totalArtNum:s.length},xe)}),[ke,xe,o,ge,ve,J]),Ie=Pe.artifactIds,Ce=Pe.totalArtNum,Ae=(0,p.useMemo)((function(){var e=Math.ceil(Ie.length/K),t=(0,S.uZ)(re,0,e-1);return{artifactIdsToShow:Ie.slice(t*K,(t+1)*K),numPages:e,currentPageIndex:t}}),[Ie,re,K]),Se=Ae.artifactIdsToShow,Ee=Ae.numPages,Fe=Ae.currentPageIndex,Ke=Ie.length!==Ce?"".concat(Ie.length,"/").concat(Ce):"".concat(Ce),Oe=(0,p.useCallback)((function(e,t){var n;null===(n=de.current)||void 0===n||n.scrollIntoView({behavior:"smooth"}),ae(t-1)}),[ae,de]);return(0,O.jsxs)(u.Z,{display:"flex",flexDirection:"column",gap:1,my:1,children:[(0,O.jsx)(G,{pageKey:"artifactPage",modalTitle:n(te||(te=(0,r.Z)(["info.title"]))),text:n("tipsOfTheDay",{returnObjects:!0}),children:(0,O.jsx)(ie,{})}),be&&(0,O.jsxs)(d.Z,{severity:"info",variant:"filled",children:["Looks like you haven't added any artifacts yet. If you want, there are ",(0,O.jsx)(f.Z,{color:"warning.main",component:k.rU,to:"/scanner",children:"automatic scanners"})," that can speed up the import process!"]}),(0,O.jsx)(V,{filterOption:R,filterOptionDispatch:ye,filterDispatch:E,numShowing:Ie.length,total:Ce}),J&&(0,O.jsx)(ee,{probabilityFilter:L,setProbabilityFilter:pe}),(0,O.jsx)(P.Z,{ref:de,children:(0,O.jsxs)(h.Z,{children:[(0,O.jsxs)(x.ZP,{container:!0,sx:{mb:1},children:[(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)("span",{children:(0,O.jsx)(v.c,{t:n,i18nKey:"efficiencyFilter.title",children:"Substats to use in efficiency calculation"})})}),(0,O.jsx)(x.ZP,{item:!0,children:(0,O.jsx)(j.Z,{size:"small",color:"error",onClick:function(){return E({effFilter:(0,s.Z)(U._)})},startIcon:(0,O.jsx)(l.Z,{}),children:(0,O.jsx)(v.c,{t:n,i18nKey:"ui:reset"})})})]}),(0,O.jsx)(w.Z,{selectedKeys:D,onChange:function(e){return E({effFilter:e})}})]})}),(0,O.jsx)(P.Z,{children:(0,O.jsxs)(h.Z,{children:[(0,O.jsxs)(x.ZP,{container:!0,alignItems:"center",sx:{pb:2},children:[(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)(m.Z,{count:Ee,page:Fe+1,onChange:Oe})}),(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)(ue,{numShowing:Se.length,total:Ke,t:n})}),(0,O.jsxs)(x.ZP,{item:!0,xs:12,sm:6,md:4,lg:4,xl:3,display:"flex",children:[(0,O.jsx)(u.Z,{flexGrow:1}),(0,O.jsx)(T.Z,{sortKeys:(0,s.Z)(B.OQ.filter((function(e){return!B.bq.includes(e)||t}))),value:Q,onChange:function(e){return E({sortType:e})},ascending:H,onChangeAsc:function(e){return E({ascending:e})}})]})]}),(0,O.jsx)($,{artifactIds:Ie})]})}),(0,O.jsx)(p.Suspense,{fallback:(0,O.jsx)(Z.Z,{variant:"rectangular",sx:{width:"100%",height:"100%",minHeight:5e3}}),children:(0,O.jsxs)(x.ZP,{container:!0,spacing:1,columns:se,children:[(0,O.jsx)(x.ZP,{item:!0,xs:1,children:(0,O.jsx)(le,{})}),Se.map((function(e){return(0,O.jsx)(x.ZP,{item:!0,xs:1,children:(0,O.jsx)(q.Z,{artifactId:e,effFilter:me,onDelete:Ze,editor:!0,canExclude:!0,canEquip:!0})},e)}))]})}),Ee>1&&(0,O.jsx)(P.Z,{children:(0,O.jsx)(h.Z,{children:(0,O.jsxs)(x.ZP,{container:!0,children:[(0,O.jsx)(x.ZP,{item:!0,flexGrow:1,children:(0,O.jsx)(m.Z,{count:Ee,page:Fe+1,onChange:Oe})}),(0,O.jsx)(x.ZP,{item:!0,children:(0,O.jsx)(ue,{numShowing:Se.length,total:Ke,t:n})})]})})})]})}function le(){var e=(0,p.useState)(!1),t=(0,i.Z)(e,2),n=t[0],r=t[1],s=(0,p.useCallback)((function(){return r(!0)}),[r]),c=(0,p.useCallback)((function(){return r(!1)}),[r]);return(0,O.jsxs)(P.Z,{sx:{height:"100%",width:"100%",minHeight:300,display:"flex",flexDirection:"column"},children:[(0,O.jsx)(p.Suspense,{fallback:!1,children:(0,O.jsx)(re,{artifactIdToEdit:n?"new":"",cancelEdit:c,allowUpload:!0,allowEmpty:!0})}),(0,O.jsx)(h.Z,{children:(0,O.jsx)(y.Z,{sx:{textAlign:"center"},children:"Add New Artifact"})}),(0,O.jsx)(u.Z,{sx:{flexGrow:1,display:"flex",justifyContent:"center",alignItems:"center"},children:(0,O.jsx)(j.Z,{onClick:s,color:"info",sx:{borderRadius:"1em"},children:(0,O.jsx)(y.Z,{variant:"h1",children:(0,O.jsx)(a.G,{icon:o.r8p,className:"fa-fw"})})})})]})}function ue(e){var t=e.numShowing,n=e.total,r=e.t;return(0,O.jsx)(y.Z,{color:"text.secondary",children:(0,O.jsxs)(v.c,{t:r,i18nKey:"showingNum",count:t,value:n,children:["Showing ",(0,O.jsx)("b",{children:{count:t}})," out of ",{value:n}," Artifacts"]})})}}}]);
//# sourceMappingURL=613.a4b9b1ef.chunk.js.map