!function(){"use strict";function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function r(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function n(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(r){e(n,r,o[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))}))}return n}function t(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function o(e,r){if(e){if("string"===typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}function a(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,o,a=[],i=!0,u=!1;try{for(n=n.call(e);!(i=(t=n.next()).done)&&(a.push(t.value),!r||a.length!==r);i=!0);}catch(s){u=!0,o=s}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return a}}(e,r)||o(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,r){if(e&&r)return!Array.isArray(r)&&console.error(r),r.reduce((function(e,r){return null===e||void 0===e?void 0:e[r]}),e)}function s(e,r){return Object.fromEntries(e.map((function(e,n){return[e,r(e,n)]})))}function c(e){throw new Error("Should not reach this with value ".concat(e))}function l(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return r.reduce((function(e,r){return e.flatMap((function(e){return r.map((function(r){return[e,[r]].flat()}))}))}),[[]])}function f(e,r){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||r&&e&&"number"===typeof e.length){n&&(e=n);var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){s=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw i}}}}function d(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function p(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function h(e,r,n){return r&&p(e.prototype,r),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}v(NaN,{key:"TODO"}),m(1),m(0);function v(e,r){return{operation:"const",operands:[],value:e,info:r}}function m(e,r){return e>=Number.MAX_VALUE/100&&(e=1/0),e<=-Number.MAX_VALUE/100&&(e=-1/0),v(e,n({key:"_"},r))}function b(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return{operation:"add",operands:w(r)}}function g(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return{operation:"mul",operands:w(r)}}function y(e,r,n,t,o){return{operation:"threshold",operands:[S(e),S(r),S(n),S(t)],info:o}}function w(e){return e.map((function(e){return"object"===typeof e?e:v(e)}))}function S(e){return"object"!==typeof e?v(e):e}function E(e,r){if(e.operation!==r.operation)return!1;if(e.operands.length!==r.operands.length)return!1;switch(e.operation){case"read":return r.operation===e.operation&&e.path.every((function(e,n){return e===r.path[n]}));case"const":return r.operation===e.operation&&e.value===r.value;case"mul":case"add":case"min":case"max":if(r.operation!==e.operation)return!1;var n=[];return e.operands.every((function(e,t){return r.operands.some((function(r,t){return!n.includes(t)&&(!!E(e,r)&&(n.push(t),!0))}))}));default:return e.operands.every((function(e,n){return E(e,r.operands[n])}))}}var k=function(e){for(var r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=3735928559^n,o=1103547991^n,a=0;a<e.length;a++)r=e.charCodeAt(a),t=Math.imul(t^r,2654435761),o=Math.imul(o^r,1597334677);return t=Math.imul(t^t>>>16,2246822507)^Math.imul(o^o>>>13,3266489909),4294967296*(2097151&(o=Math.imul(o^o>>>16,2246822507)^Math.imul(t^t>>>13,3266489909)))+(t>>>0)};function M(e){var r=Math.imul(k(e.operation),5234543537);switch(e.operation){case"const":return r^k(e.value.toString(2));case"mul":case"add":case"min":case"max":return e.operands.reduce((function(e,r){return e^M(r)}),r);default:return e.operands.reduce((function(e,r){return Math.imul(e^M(r),9923429423)}),r)}}function O(e,r,t){var o=new Set,a=new Map,i=new Map;function u(e){var s=a.get(e);if(s)return s;s=r(e);var c=i.get(s);return c||(o.has(s)?(console.error("Found cyclical dependency during formula mapping"),v(NaN)):(o.add(s),c=t(function(e){var r=e.operands.map(u);return j(r,e.operands)?e:n(n({},e),{},{operands:r})}(s),e),o.delete(s),a.set(e,c),i.set(s,c),c))}var s=e.map(u);return j(s,e)?e:s}function j(e,r){return void 0===e?void 0===r:void 0!==r&&(e.length===r.length&&e.every((function(e,n){return e===r[n]})))}var x={min:function(e){return Math.min.apply(Math,a(e))},max:function(e){return Math.max.apply(Math,a(e))},add:function(e){return e.reduce((function(e,r){return e+r}),0)},mul:function(e){return e.reduce((function(e,r){return e*r}),1)}},B=n(n({},x),{},{res:function(e){var r=i(e,1)[0];return r<0?1-r/2:r>=.75?1/(4*r+1):1-r},sum_frac:function(e){return e[0]/e.reduce((function(e,r){return e+r}))},threshold:function(e){var r=i(e,4),n=r[0],t=r[1],o=r[2],a=r[3];return n>=t?o:a}}),A=new Set(Object.keys(x));function T(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return!1};return e=D(e=F(e=I(e,r,n)))}function P(e,r){var n=new Set,t=new Set,o=new Map;!function(e,r,n){var t=new Set,o=new Set;e.forEach((function e(a){o.has(a)||(t.has(a)?console.error("Found cyclical dependency during formula traversal"):(t.add(a),r(a),a.operands.forEach(e),n(a),t.delete(a),o.add(a)))}))}(e,(function(e){}),(function(e){var a=e.operation;switch(a){case"read":if("number"!==e.type||e.accu&&"add"!==e.accu)throw new Error("Unsupported ".concat(a," node in precompute"));var i=r(e);n.add(i),o.set(e,i);break;case"add":case"min":case"max":case"mul":case"threshold":case"res":case"sum_frac":o.set(e,{ins:e.operands.map((function(e){return o.get(e)}))});break;case"const":if("number"!==typeof e.value)throw new Error("Found string constant while precomputing");var u=e.value;t.add(u),o.set(e,u);break;case"match":case"lookup":case"subscript":case"prio":case"small":case"data":throw new Error("Unsupported ".concat(a," node in precompute"));default:c(a)}}));var u=new Map,l=a(n),f=e.length,d=a(t),p=[];e.forEach((function(e,r){u.set(e,r),"const"===e.operation&&u.set(e.value,r)})),l.forEach((function(r,n){return u.set(r,n+e.length)}));var h=e.length+l.length;d.forEach((function(e){return u.has(e)||u.set(e,h++)})),o.forEach((function(e,r){"object"===typeof e?(u.has(r)||u.set(r,h++),p.push({out:u.get(r),ins:r.operands.map((function(e){return u.get(e)})),op:B[r.operation],buff:Array(r.operands.length).fill(0)})):u.set(r,u.get(e))}));var v=new Float64Array(h).fill(0);t.forEach((function(e){return v[u.get(e)]=e}));var m=e.map((function(e,r){var n=u.get(e);return n!==r?[n,r]:void 0})).filter((function(e){return e})),b=m.length?function(){m.forEach((function(e){var r=i(e,2),n=r[0],t=r[1];return v[t]=v[n]}))}:void 0;return[function(){return p.forEach((function(e){var r=e.out,n=e.ins,t=e.op,o=e.buff;n.forEach((function(e,r){return o[r]=v[e]})),v[r]=t(o)})),null===b||void 0===b||b(),v},s(l,(function(e,r){return f+r})),v]}function F(e){return O(e,(function(e){return e}),(function(e){var r=e;if(A.has(e.operation)){var t=e,o=t.operation,a=!1,i=t.operands.flatMap((function(e){return e.operation===o?(a=!0,e.operands):[e]}));r=a?n(n({},t),{},{operands:i}):t}return r}))}function D(e){function r(e){var r,n=new Map,t=f(e);try{for(t.s();!(r=t.n()).done;){var o,a=r.value;n.set(a,(null!==(o=n.get(a))&&void 0!==o?o:0)+1)}}catch(i){t.e(i)}finally{t.f()}return n}for(var t={common:{counts:new Map,formulas:new Set,operation:"add"}},o=function(){for(var o,u=void 0,s={operation:t.common.operation,operands:(o=t.common.counts,a(o).flatMap((function(e){var r=i(e,2),n=r[0],t=r[1];return Array(t).fill(n)})))},c=new Map,l=0,d=Object.keys(x);l<d.length;l++){var p=d[l];c.set(p,[])}if(e=O(e,(function(e){if(t.common.formulas.has(e)){var r=e,o=new Map(t.common.counts),a=r.operands.filter((function(e){var r=o.get(e);return!r||(o.set(e,r-1),!1)}));return a.length?(a.push(s),n(n({},r),{},{operands:a})):s}return e}),(function(e){if(!A.has(e.operation))return e;var n=e;if(u){if(u.operation===n.operation){var t,o=r(n.operands),a=new Map,s=u.counts,l=0,d=f(o.entries());try{for(d.s();!(t=d.n()).done;){var p,h=i(t.value,2),v=h[0],m=h[1],b=Math.min(m,null!==(p=s.get(v))&&void 0!==p?p:0);b?(a.set(v,b),l+=b):a.delete(v)}}catch(C){d.e(C)}finally{d.f()}l>1&&(u.counts=a,u.formulas.add(n))}}else{var g,y=c.get(n.operation),w=r(n.operands),S=f(y);try{for(S.s();!(g=S.n()).done;){var E,k=i(g.value,2),M=k[0],O=k[1],j=0,x=new Map,B=f(O.entries());try{for(B.s();!(E=B.n()).done;){var T,P=i(E.value,2),F=P[0],D=P[1],I=Math.min(D,null!==(T=w.get(F))&&void 0!==T?T:0);I&&(x.set(F,I),j+=I)}}catch(C){B.e(C)}finally{B.f()}if(j>1){u={counts:x,formulas:new Set([n,M]),operation:n.operation},c.clear();break}}}catch(C){S.e(C)}finally{S.f()}u||y.push([n,w])}return n})),!u)return"break";t.common=u};;){if("break"===o())break}return e}function I(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return!1},o={data:[],processed:new Map},s=new Map([[o,new Map]]);function l(e,r){var d,p=r.processed.get(e);if(p)return p;var h,m=e.operation;switch(m){case"const":return e;case"add":case"mul":case"max":case"min":var b=B[m],g=[],y=e.operands.filter((function(e){var n=l(e,r);return"const"!==n.operation||(g.push(n.value),!1)})).map((function(e){return l(e,r)})),w=b(g);if(isFinite(w)){if("mul"===m&&0===w){h=v(w);break}}else if("mul"!==m&&("max"!==m||w>0)&&("min"!==m||w<0)){h=v(w);break}w!==b([])&&y.push(v(w)),h=y.length<=1?null!==(d=y[0])&&void 0!==d?d:v(b([])):{operation:m,operands:y};break;case"res":case"sum_frac":var S=e.operands.map((function(e){return l(e,r)})),E=B[m];h=S.every((function(e){return"const"===e.operation}))?v(E(S.map((function(e){return e.value})))):n(n({},e),{},{operands:S});break;case"lookup":var k=l(e.operands[0],r);if("const"===k.operation){var M,O=null!==(M=e.table[k.value])&&void 0!==M?M:e.operands[1];if(O){h=l(O,r);break}}throw new Error("Unsupported ".concat(m," node while folding"));case"prio":var j=e.operands.find((function(e){var n=l(e,r);if("const"!==n.operation)throw new Error("Unsupported ".concat(m," node while folding"));return void 0!==n.value}));h=j?l(j,r):v(void 0);break;case"small":var x,A,T=void 0,P=f(e.operands);try{for(P.s();!(A=P.n()).done;){var F,D=l(A.value,r);if("const"!==D.operation)throw new Error("Unsupported ".concat(m," node while folding"));(void 0===(null===(F=T)||void 0===F?void 0:F.value)||void 0!==D.value&&D.value<T.value)&&(T=D)}}catch(X){P.e(X)}finally{P.f()}h=null!==(x=T)&&void 0!==x?x:v(void 0);break;case"match":var I=i(e.operands.map((function(e){return l(e,r)})),4),C=I[0],N=I[1],R=I[2],W=I[3];if("const"!==C.operation||"const"!==N.operation)throw new Error("Unsupported ".concat(m," node while folding"));h=C.value===N.value?R:W;break;case"threshold":var H=i(e.operands.map((function(e){return l(e,r)})),4),V=H[0],L=H[1],z=H[2],U=H[3];h="const"===V.operation&&"const"===L.operation?V.value>=L.value?z:U:n(n({},e),{},{operands:[V,L,z,U]});break;case"subscript":var G=i(e.operands.map((function(e){return l(e,r)})),1)[0];h="const"===G.operation?v(e.list[G.value]):n(n({},e),{},{operands:[G]});break;case"read":var q=r.data.map((function(r){return u(r,e.path)})).filter((function(e){return e}));if(0===q.length)if(t(e)){var K=e.accu;h=void 0===K||"small"===K?"string"===e.type?v(void 0):v(NaN):v(B[K]([]))}else h=e;else h=void 0===e.accu||1===q.length?l(q[q.length-1],r):l({operation:e.accu,operands:q},r);break;case"data":e.reset&&(r=o);var _=s.get(r),J=_.get(e.data);J||(J={data:[].concat(a(r.data),[e.data]),processed:new Map},s.set(J,new Map),_.set(e.data,J)),h=l(e.operands[0],J);break;default:c(m)}return r.processed.set(e,h),h}var d={data:[r],processed:new Map};return s.set(d,new Map),s.get(o).set(r,d),e.map((function(e){return l(e,d)}))}var C=["flower","plume","sands","goblet","circlet"],N=(["physical"].concat(["anemo","geo","electro","hydro","pyro","cryo"]),["Adventurer","ArchaicPetra","Berserker","BlizzardStrayer","BloodstainedChivalry","BraveHeart","CrimsonWitchOfFlames","DefendersWill","EchoesOfAnOffering","EmblemOfSeveredFate","Gambler","GladiatorsFinale","HeartOfDepth","HuskOfOpulentDreams","Instructor","Lavawalker","LuckyDog","MaidenBeloved","MartialArtist","NoblesseOblige","OceanHuedClam","PaleFlame","PrayersForDestiny","PrayersForIllumination","PrayersForWisdom","PrayersToSpringtime","ResolutionOfSojourner","RetracingBolide","Scholar","ShimenawasReminiscence","TenacityOfTheMillelith","TheExile","ThunderingFury","Thundersoother","TinyMiracle","TravelingDoctor","VermillionHereafter","ViridescentVenerer","WanderersTroupe"]);[].concat(["AmenomaKageuchi","AquilaFavonia","BlackcliffLongsword","CinnabarSpindle","CoolSteel","DarkIronSword","DullBlade","FavoniusSword","FesteringDesire","FilletBlade","FreedomSworn","HaranGeppakuFutsu","HarbingerOfDawn","IronSting","LionsRoar","MistsplitterReforged","PrimordialJadeCutter","PrototypeRancour","RoyalLongsword","SacrificialSword","SilverSword","SkyriderSword","SkywardBlade","SummitShaper","SwordOfDescension","TheAlleyFlash","TheBlackSword","TheFlute","TravelersHandySword"],["Akuoumaru","BlackcliffSlasher","BloodtaintedGreatsword","DebateClub","FavoniusGreatsword","FerrousShadow","KatsuragikiriNagamasa","LithicBlade","LuxuriousSeaLord","OldMercsPal","PrototypeArchaic","Rainslasher","RedhornStonethresher","RoyalGreatsword","SacrificialGreatsword","SerpentSpine","SkyriderGreatsword","SkywardPride","SnowTombedStarsilver","SongOfBrokenPines","TheBell","TheUnforged","WasterGreatsword","Whiteblind","WhiteIronGreatsword","WolfsGravestone"],["BeginnersProtector","BlackcliffPole","BlackTassel","CalamityQueller","CrescentPike","Deathmatch","DragonsBane","DragonspineSpear","EngulfingLightning","FavoniusLance","Halberd","IronPoint","KitainCrossSpear","LithicSpear","PrimordialJadeWingedSpear","PrototypeStarglitter","RoyalSpear","SkywardSpine","StaffOfHoma","TheCatch","VortexVanquisher","WavebreakersFin","WhiteTassel"],["AlleyHunter","AmosBow","AquaSimulacra","BlackcliffWarbow","CompoundBow","ElegyForTheEnd","FadingTwilight","FavoniusWarbow","Hamayumi","HuntersBow","Messenger","MitternachtsWaltz","MouunsMoon","PolarStar","Predator","PrototypeCrescent","RavenBow","RecurveBow","RoyalBow","Rust","SacrificialBow","SeasonedHuntersBow","SharpshootersOath","SkywardHarp","Slingshot","TheStringless","TheViridescentHunt","ThunderingPulse","WindblumeOde"],["ApprenticesNotes","BlackcliffAgate","DodocoTales","EmeraldOrb","EverlastingMoonglow","EyeOfPerception","FavoniusCodex","Frostbearer","HakushinRing","KagurasVerity","LostPrayerToTheSacredWinds","MagicGuide","MappaMare","MemoryOfDust","OathswornEye","OtherworldlyStory","PocketGrimoire","PrototypeAmber","RoyalGrimoire","SacrificialFragments","SkywardAtlas","SolarPearl","TheWidsith","ThrillingTalesOfDragonSlayers","TwinNephrite","WineAndSong"]);function R(e,r){return{base:e.base,values:s(C,(function(n){var t=r[n];switch(t.kind){case"id":return e.values[n].filter((function(e){return t.ids.has(e.id)}));case"exclude":return e.values[n].filter((function(e){return!t.sets.has(e.set)}));case"required":return e.values[n].filter((function(e){return t.sets.has(e.set)}))}}))}}function W(e){return C.reduce((function(r,n){return r*e.values[n].length}),1)}s(C,(function(e){return{kind:"exclude",sets:new Set}}));var H=function(){function e(r,t){var o=this,a=r.arts,i=r.optimizationTarget,u=r.filters,s=r.plotBase,c=r.maxBuilds;d(this,e),this.builds=[],this.buildValues=void 0,this.plotData=void 0,this.threshold=-1/0,this.maxBuilds=void 0,this.min=void 0,this.arts=void 0,this.nodes=void 0,this.callback=void 0,this.interimReport=function(e){o.refresh(!1),o.callback(n({command:"interim",buildValues:o.buildValues},e)),o.buildValues=void 0,e.tested=0,e.failed=0,e.skipped=0},this.arts=a,this.min=u.map((function(e){return e.min})),this.maxBuilds=c,this.callback=t,this.nodes=u.map((function(e){return e.value})),this.nodes.push(i),s&&(this.plotData={},this.nodes.push(s))}return h(e,[{key:"compute",value:function(e,r){this.threshold>e&&(this.threshold=e);var n=r.optimizationTarget,t=r.constraints,o=r.filter,u=r.artSetExclusion,s=this.min,c=this.interimReport,l=this,d=R(this.arts,o),p=W(d),h=T([].concat(a(t.map((function(e){return e.value}))),[n]),{},(function(e){return!1})),v=T(this.nodes,{},(function(e){return!1})),m=i(P(v,(function(e){return e.path[1]})),3),b=m[0],g=m[1],y=m[2],w=i(P(h,(function(e){return e.path[1]})),3),S=w[0],E=w[1],k=w[2],M=Object.values(d.values).sort((function(e,r){return e.length-r.length})).map((function(e){return e.map((function(e){return{id:e.id,set:e.set,values:Object.entries(e.values).map((function(e){var r,n=i(e,2),t=n[0],o=n[1];return{key:g[t],key2:null!==(r=E[t])&&void 0!==r?r:0,value:o,cache:0}})).filter((function(e){var r=e.key,n=e.value;return void 0!==r&&0!==n}))}}))}));console.log("enumerating",{artSetExclusion:u,preArts:d});var O=Array(M.length).fill(""),j={tested:0,failed:0,skipped:p-W(d)};for(var x=0,B=Object.entries(d.base);x<B.length;x++){var A=i(B[x],2),F=A[0],D=A[1],I=g[F];void 0!==I&&(y[I]=D);var C=E[F];void 0!==C&&(k[C]=D)}return function e(r,n,o){if(r<0){var p=b(),m=S();if(Math.abs(p[s.length]-m[t.length])>1e-4)throw console.log("OOF COMPUTE NO MATCH"),console.log(d),console.log(v),console.log(h),console.log(y),console.log(k),Error("what?");var g=!Object.entries(u).some((function(e){var r=i(e,2),t=r[0],o=r[1];return"uniqueKey"!==t&&o.includes(n[t])}));if(g&&void 0!==u.uniqueKey&&(g=u.uniqueKey.every((function(e){return e!==o.size}))),g&&s.every((function(e,r){return e<=p[r]}))){var w,E=p[s.length],x=l.builds,B=l.plotData;if(E>=l.threshold&&(w={value:E,artifactIds:a(O)},x.push(w)),B){var A=p[s.length+1];(!B[A]||B[A].value<E)&&(w||(w={value:E,artifactIds:a(O)}),w.plot=A,B[A]=w)}}else j.failed+=1}else M[r].forEach((function(t){var a,i,u,s,c,l;O[r]=t.id;var d,p=f(t.values);try{for(p.s();!(d=p.n()).done;){var h=d.value,v=h.key,m=h.value;h.cache=y[v],y[v]+=m,k[h.key2]+=m}}catch(j){p.e(j)}finally{p.f()}o.has(t.set)?o.delete(t.set):o.add(t.set),n[null!==(a=t.set)&&void 0!==a?a:""]=1+(null!==(i=n[null!==(u=t.set)&&void 0!==u?u:""])&&void 0!==i?i:0),e(r-1,n,o),o.has(t.set)?o.delete(t.set):o.add(t.set),n[null!==(s=t.set)&&void 0!==s?s:""]-=1,0===n[null!==(c=t.set)&&void 0!==c?c:""]&&delete n[null!==(l=t.set)&&void 0!==l?l:""];var b,g=f(t.values);try{for(g.s();!(b=g.n()).done;){var w=b.value,S=w.key,E=w.key2,M=w.cache;y[S]=M,k[E]=M}}catch(j){g.e(j)}finally{g.f()}})),0===r&&(j.tested+=M[0].length,j.tested>8192&&c(j))}(M.length-1,{},new Set),this.interimReport(j),this.threshold}},{key:"refresh",value:function(e){var r,n,t=this.maxBuilds;Object.keys(null!==(r=this.plotData)&&void 0!==r?r:{}).length>=1e5&&(this.plotData=function(e){for(var r=.01,n=new Set(e.flatMap((function(e){return Object.values(e).map((function(e){return Math.round(e.plot/r)}))})));n.size>1500;)r*=2,n=new Set(a(n).map((function(e){return Math.round(e/2)})));var t,o={},i=f(e);try{for(i.s();!(t=i.n()).done;)for(var u=t.value,s=0,c=Object.values(u);s<c.length;s++){var l=c[s],d=Math.round(l.plot/r)*r;(!o[d]||o[d].value<l.value)&&(o[d]=l)}}catch(p){i.e(p)}finally{i.f()}return o}([this.plotData])),this.builds=this.builds.sort((function(e,r){return r.value-e.value})).slice(0,t),this.buildValues=this.builds.map((function(e){return e.value})),this.threshold=Math.max(this.threshold,null!==(n=this.buildValues[t-1])&&void 0!==n?n:-1/0)}}]),e}();function V(e){if(1===e.length)return e[0];var r=(e=e.flatMap((function(e){return"add"===e.operation?e.operands:e}))).reduce((function(e,r){return"const"===r.operation?e+r.value:e}),0);return 0===(e=e.filter((function(e){return"const"!==e.operation}))).length?v(r):0===r?b.apply(void 0,a(e)):b.apply(void 0,a(e).concat([v(r)]))}function L(e){if(1===e.length)return e[0];var r=(e=e.flatMap((function(e){return"mul"===e.operation?e.operands:e}))).reduce((function(e,r){return"const"===r.operation?e*r.value:e}),1);return 0===(e=e.filter((function(e){return"const"!==e.operation}))).length?v(r):1===r?g.apply(void 0,a(e)):g.apply(void 0,a(e).concat([v(r)]))}function z(e,r){var n={},t=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541],o=0;function u(e){for(var r=M(e),a=n[r];void 0!==a;){if(E(a.n,e))return BigInt(a.ix);a=a.next}var i=t[o];return n[r]={n:e,ix:i,next:n[r]},o+=1,BigInt(i)}var s={};return e.forEach((function(e){var n,t;if("const"!==e.operation)if(r(e)){var o,a,i=u(e).toString();s[i]={coeff:1+(null!==(o=null===(a=s[i])||void 0===a?void 0:a.coeff)&&void 0!==o?o:0),rhs:[e]}}else{if("mul"!==e.operation)throw console.log(e),Error("Encountered unexpected node in `gatherSumOfProds`");var c,l,f=e.operands.reduce((function(e,r){var n=e.coeff,t=e.ix,o=e.ops;return"const"===r.operation?{coeff:n*r.value,ix:t,ops:o}:(o.push(r),{coeff:n,ix:t*u(r),ops:o})}),{coeff:1,ix:BigInt(1),ops:[]}),d=f.coeff,p=f.ix,h=f.ops,v=p.toString();s[v]={coeff:d+(null!==(c=null===(l=s[v])||void 0===l?void 0:l.coeff)&&void 0!==c?c:0),rhs:h}}else s[1]={coeff:e.value+(null!==(n=null===(t=s[1])||void 0===t?void 0:t.coeff)&&void 0!==n?n:0),rhs:[]}})),Object.entries(s).map((function(e){var r=i(e,2),n=(r[0],r[1]),t=n.coeff,o=n.rhs;return L([].concat(a(o),[v(t)]))}))}function U(e,r){switch(e.operation){case"mul":var n=e.operands.map((function(e){return U(e,r)})).map((function(e){return"add"===e.operation?e.operands:[e]})).map((function(e,n){var t=e.map((function(e){return r(e)||"mul"===e.operation&&e.operands.some(r)})),o=e.filter((function(e,r){return t[r]})),i=e.filter((function(e,r){return!t[r]}));return 0===i.length?o:[].concat(a(o),[V(i)])}));return V(z(l.apply(void 0,a(n)).map((function(e){return L(e)})),r));case"add":return V(z(e.operands.map((function(e){return U(e,r)})).flatMap((function(e){return"add"===e.operation?e.operands:e})),r));default:return e}}function G(e){return q(e)<=5}function q(e){if("add"===e.operation)return Math.min.apply(Math,a(e.operands.map((function(e){return q(e)}))));if("mul"===e.operation)return e.operands.map((function(e){return q(e)})).reduce((function(e,r){return e+r}));if("threshold"===e.operation){var r=e.operands[0];if("read"===r.operation&&N.includes(r.path[1]))return e.operands[1].value}return 0}function K(e,r){var n=r.i,t=r.j,o=e[n][t];return e.map((function(r,a){return r.map((function(r,i){return a===n&&i===t?1/o:a===n?e[n][i]/o:i===t?-e[a][t]/o:r-e[n][i]*e[a][t]/o}))}))}function _(e){for(var r=e.length,n=e[0].length,t={i:-1,j:-1,cmp:1/0},o=0;o<n-1;o++)if(!(e[r-1][o]>=0)){for(var a=0;a<r-1;a++)if(e[a][o]>1e-5){var i=e[a][n-1]/e[a][o];i<t.cmp&&(t={i:a,j:o,cmp:i})}if(t.i<0)throw Error("UNBOUNDED FEASIBLE")}if(t.i<0)throw Error("NO PIVOTS (done)");return{i:t.i,j:t.j}}function J(e){for(var r=e.length,n=e[0].length,t={i:-1,j:-1,cmp:1/0},o=0;o<r-1;o++)if(!(e[o][n-1]>=0)){for(var a=0;a<n-1;a++)if(e[o][a]<-1e-5){var i=e[o][n-1]/e[o][a];i<t.cmp&&(t={i:o,j:a,cmp:i})}if(t.i<0)throw Error("INFEASIBLE");return{i:t.i,j:t.j}}throw Error("NO PIVOTS (done)")}function X(e,r,n){var t=i(P([e],(function(e){return e.path[1]})),3),o=t[0],a=t[1],u=t[2];Object.entries(r).forEach((function(e){var r,n=i(e,2),t=n[0],o=n[1];return u[null!==(r=a[t])&&void 0!==r?r:0]=o}));var s=o()[0];return Object.entries(n).forEach((function(e){var r,n=i(e,2),t=n[0],o=n[1];return u[null!==(r=a[t])&&void 0!==r?r:0]=o})),[s,o()[0]]}function Q(r,t,o){if("const"===r.operation)return{w:{},c:r.value,err:0};if("read"===r.operation)return{w:e({},r.path[1],1),c:0,err:0};if("mul"!==r.operation)throw Error("toLUB should only operate on product forms");n({},t);var u=n({},o);var s=U(function e(r){switch(r.operation){case"const":case"read":return r;case"add":return V(r.operands.map((function(r){return e(r)})));case"mul":return L(r.operands.map((function(r){return e(r)})));case"threshold":var n=i(r.operands,4),s=n[0],c=n[1],l=n[2],f=n[3];if("read"===s.operation&&"const"===c.operation&&"const"===f.operation&&"const"===l.operation){var d=s.path[1];if(t[d]>=c.value)return v(l.value);if(o[d]<c.value)return v(f.value);if(l.value<f.value)throw console.log(r),Error("Not Implemented (threshold must be increasing)");var p=(l.value-f.value)/c.value;return u[d]=c.value,b(f.value,g(p,s))}throw console.log(r),Error("Not Implemented (threshold must branch between constants)");case"res":var h=function(e,r,n){var t=function e(r){switch(r.operation){case"add":return b.apply(void 0,a(r.operands.map((function(r){return e(r)}))));case"const":return v(-r.value);case"threshold":var n=i(r.operands,4),t=n[0],o=n[1],u=n[2],s=n[3];if("const"===u.operation&&"const"===s.operation&&u.value<=s.value)return y(t,o,-u.value,s.value);throw console.log(r),Error("(res neg slope): threshold. Something went wrong.");default:throw console.log(r),Error("(res neg slope) Havent written logic to handle this")}}(e.operands[0]),o=i(X(t,r,n),2),u=o[0],s=o[1],c=B.res,l=[c([-u]),c([-s])],f=l[0],d=l[1];return s>0&&u>-1.75?b(1,g(.5,t)):b((s*f-u*d)/(s-u),g((f-d)/(s-u),t))}(r,t,o);return e(h=U(h,(function(e){return"const"!==e.operation})));case"min":var m=i(r.operands,2),w=m[0],S=m[1];if("const"!==S.operation){var E=[S,w];w=E[0],S=E[1]}return"read"===w.operation&&"const"===S.operation?(S.value<u[w.path[1]]&&(u[w.path[1]]=S.value),e(w)):e(w);case"max":var k=i(r.operands,2),M=k[0],O=k[1];if("const"!==O.operation){var j=[O,M];M=j[0],O=j[1]}if("const"===S.operation){var x=S.value,A=i(X(M,t,o),2),T=A[0],P=A[1];if(T>x)return M;if(x>P)return v(x);var F=x-T;return b(g((P-x)/(P-T),e(M)),F)}throw console.log(r),Error("Not Implemented (max)");case"sum_frac":var D=i(r.operands,2),I=D[0],C=D[1];if("const"!==C.operation)throw Error("Not Implemented (non-constant sum_frac denominator)");var N=i(X(I,t,o),2),R=N[0],W=N[1],H=C.value,z=Math.sqrt((R+H)*(W+H))-H,G=(H+z)*(H+z);return e(b(z*z/G,g(H/G,I)));default:throw console.log(r),Error("Not Implemented")}}(r),(function(e){return"const"!==e.operation}));if("const"===s.operation)return{w:{},c:s.value,err:0};function c(r){if("read"===r.operation)return{w:e({},r.path[1],1),c:0,err:0};if("const"===r.operation)return{w:{},c:r.value,err:0};if("mul"!==r.operation)throw console.log(r),Error("toLUB takes only mul nodes.");var n=1,i=r.operands.reduce((function(e,r){return"read"===r.operation&&e.push(r.path[1]),"const"===r.operation&&(n*=r.value),e}),[]),u=function(e){if(0===e.length)return{w:[],c:0,err:0};var r=e.length,n=e.map((function(e){return e.upper})),t=n.reduce((function(e,r){return e*r}),1);e=e.map((function(e){return{lower:e.lower/e.upper,upper:1}}));var o,i=l.apply(void 0,a(e.map((function(e){return[e.lower,e.upper]})))).flatMap((function(e){var r=e.reduce((function(e,r){return e*r}),1);return[[].concat(a(e.map((function(e){return-e}))),[1,0,-r]),[].concat(a(e),[-1,-1,r])]})),u=[].concat(a(e.map((function(e){return 0}))),[0,1]);try{o=function(e,r){var n=r.length+1,t=r[0].length,o=Array(n).fill(0).map((function(e){return Array(t).fill(0)}));r.forEach((function(e,r){return e.forEach((function(e,n){return o[r][n]=e}))})),e.forEach((function(e,r){return o[n-1][r]=e}));for(var a=[];o.some((function(e,r){return r<n-1&&e[t-1]<0}));){var i=J(o);a.push(i),o=K(o,i)}for(;o[n-1].some((function(e,r){return r<t-1&&e<0}));){var u=_(o);a.push(u),o=K(o,u)}return e.map((function(e,r){return function(e,r,n){var t=1;r.forEach((function(e){var r=e.i,o=e.j;1===t&&o===n?(n=r,t=0):0===t&&r===n&&(n=o,t=1)}));var o=e[0].length;return 0===t?e[n][o-1]:0}(o,a,r)}))}(u,i)}catch(s){throw console.log("ERROR on bounds",e),console.log("Possibly numerical instability issue."),s}return{w:o.slice(0,r).map((function(e,r){return e*t/n[r]})),c:-t*o[r],err:t*o[r+1]}}(i.map((function(e){return{lower:t[e],upper:o[e]}}))),s=u.w,c=u.c,f=u.err;return{w:s.reduce((function(e,r,t){var o;return e[i[t]]=r*n+(null!==(o=e[i[t]])&&void 0!==o?o:0),e}),{}),c:c*n,err:f*n+0}}return"add"===s.operation?s.operands.map((function(e){return c(e)})):c(s)}function $(e,r){var n=Object.entries(r.w).reduce((function(r,n){var t=i(n,2),o=t[0];return r+t[1]*e.base[o]}),r.c);return Object.entries(e.values).reduce((function(e,n){var t=i(n,2),o=(t[0],t[1].reduce((function(e,n){var t=Object.entries(r.w).reduce((function(e,r){var t=i(r,2),o=t[0];return e+t[1]*n.values[o]}),0);return e.v>t?e:{v:t,id:n.id}}),{v:0,id:""}));return e.v+=o.v,e.ids.push(o.id),e}),{v:n,ids:[]}).v}function Y(e){return{statsMin:Object.entries(e.values).reduce((function(e,r){var n=i(r,2),t=(n[0],n[1]),o={};t.forEach((function(e){for(var r in e.values){var n;o[r]=Math.min(e.values[r],null!==(n=o[r])&&void 0!==n?n:1/0)}})),Object.entries(o).forEach((function(r){var n,t=i(r,2),o=t[0],a=t[1];return e[o]=a+(null!==(n=e[o])&&void 0!==n?n:0)}));var a=new Set(t.map((function(e){return e.set})));return 1===a.size?a.forEach((function(r){r&&(e[r]=1)})):a.forEach((function(r){r&&(e[r]=0)})),e}),n({},e.base)),statsMax:Object.entries(e.values).reduce((function(e,r){var n=i(r,2),t=(n[0],n[1]),o={};return t.forEach((function(e){for(var r in e.values){var n;o[r]=Math.max(e.values[r],null!==(n=o[r])&&void 0!==n?n:0)}e.set&&(o[e.set]=1)})),Object.entries(o).forEach((function(r){var n,t=i(r,2),o=t[0],a=t[1];return e[o]=a+(null!==(n=e[o])&&void 0!==n?n:0)})),e}),n({},e.base))}}function Z(e){var r=e.f,n=e.a,t=e.cachedCompute;if(void 0===t){var o=Y(n),a=o.statsMin,u=o.statsMax,s=r.map((function(e){return function(e,r,n){var t=n.statsMin,o=n.statsMax;if("const"===e.operation)return{maxEst:e.value,lin:Q(e,t,o)};if("read"===e.operation)return{maxEst:o[e.path[1]],lin:Q(e,t,o)};var a=U(e,(function(e){switch(e.operation){case"read":case"max":case"min":case"sum_frac":case"threshold":return!0;default:return!1}})).operands.filter(G).flatMap((function(e){return Q(e,t,o)})).reduce((function(e,r){return Object.entries(r.w).forEach((function(r){var n,t=i(r,2),o=t[0],a=t[1];return e.w[o]=a+(null!==(n=e.w[o])&&void 0!==n?n:0)})),{w:e.w,c:e.c+r.c,err:e.err+r.err}}),{w:{},c:0,err:0});return{maxEst:$(r,a),lin:a}}(e,n,{statsMin:a,statsMax:u})}));return{maxEst:s.map((function(e){return e.maxEst})),lin:s.map((function(e){return e.lin})),lower:a,upper:u}}var c=t.lin,l=t.lower,f=t.upper;return{maxEst:c.map((function(e){return $(n,e)})),lin:c,lower:l,upper:f}}var ee,re,ne,te=function(){function e(r,n){var t,o,a=r.arts,u=r.optimizationTarget,s=r.filters,c=r.artSetExclusion;d(this,e),this.min=void 0,this.arts=void 0,this.nodes=void 0,this.artSet=void 0,this.subproblems=[],this.callback=void 0,this.arts=a,this.min=s.map((function(e){return e.min})),this.nodes=s.map((function(e){return e.value})),this.callback=n,this.min.push(-1/0),this.nodes.push(u),this.artSet=(t=Object.entries(c),o=function(e){var r=i(e,2),n=r[0],t=r[1];return"rainbow"===n?["uniqueKey",t.map((function(e){return e+1}))]:[n,t.flatMap((function(e){return 2===e?[2,3]:[4,5]}))]},Object.fromEntries(t.map((function(e){return o(e)}))))}return h(e,[{key:"addSubProblem",value:function(e){var r=W(R(this.arts,e.filter));0!==r&&this.subproblems.push({count:r,subproblem:e})}},{key:"split",value:function(e){var r=this,n=e.threshold,t=e.minCount,o=e.maxIter,a=e.subproblem;n>this.min[this.min.length-1]&&(this.min[this.min.length-1]=n),a&&this.addSubProblem(a);var i=this.subproblems.reduce((function(e,r){return e+r.count}),0);console.log("split",this.min[this.min.length-1],{todo:this.subproblems.length,buildsleft:this.subproblems.reduce((function(e,r){return e+r.count}),0)});for(var u=0;u<o&&this.subproblems.length;){u+=1;var s=this.subproblems.pop(),c=s.count,l=s.subproblem;if(c<=t){var f=this.subproblems.reduce((function(e,r){return e+r.count}),0)+c;return this.callback({command:"interim",tested:0,failed:0,skipped:i-f,buildValues:void 0}),[l]}this.splitBNB(this.min[this.min.length-1],l).forEach((function(e){return r.addSubProblem(e)}))}var d=this.subproblems.reduce((function(e,r){return e+r.count}),0);return this.callback({command:"interim",tested:0,failed:0,skipped:i-d,buildValues:void 0}),[]}},{key:"splitWork",value:function(e){var r=this,n=e.threshold,t=e.numSplits,o=e.subproblem;n>this.min[this.min.length-1]&&(this.min[this.min.length-1]=n),o&&this.addSubProblem(o);var a=this.subproblems.reduce((function(e,r){return e+r.count}),0);for(console.log("splitWork",this.min[this.min.length-1],{todo:this.subproblems.length,buildsleft:this.subproblems.reduce((function(e,r){return e+r.count}),0)});this.subproblems.length>0&&this.subproblems.length<=t;){var i=this.subproblems.shift().subproblem;this.splitBNB(this.min[this.min.length-1],i).forEach((function(e){return r.addSubProblem(e)}))}var u=this.subproblems.reduce((function(e,r){return e+r.count}),0);return this.callback({command:"interim",tested:0,failed:0,skipped:a-u,buildValues:void 0}),console.log("exit splitWork. Filters pre-exit",this.subproblems),this.subproblems.splice(0,t).map((function(e){return e.subproblem}))}},{key:"splitBNB",value:function(e,r){var t=R(this.arts,r.filter);if(!1===r.cache){var o=Y(t),u=o.statsMin,c=o.statsMax,f=oe(r,u,c);if(void 0===f)return[];var d=Z({f:[].concat(a(f.constraints.map((function(e){return e.value}))),[f.optimizationTarget]),a:t});if(f.constraints.some((function(e,r){var n=e.min;return d.maxEst[r]<n})))return[];if(d.maxEst[d.maxEst.length-1]<e)return[];r=n(n({},f),{},{cache:!0,cachedCompute:d})}var p=r.cachedCompute;if(p.maxEst[p.maxEst.length-1]<e)return[];Object.values(t.values).reduce((function(e,r){return e*r.length}),1);var h=function(e,r){var n=r.lin,t=n[n.length-1],o=Object.keys(t.w),u={k:"",heur:-1};if(o.forEach((function(r){var n=Object.entries(e.values).reduce((function(e,n){var o=i(n,2),u=(o[0],o[1]),s=u.map((function(e){return e.values[r]})),c=Math.min.apply(Math,a(s)),l=Math.max.apply(Math,a(s));if(c===l)return e;u.map((function(e){return Object.entries(e.values).reduce((function(e,r){var n,o=i(r,2),a=o[0];return e+o[1]*(null!==(n=t[a])&&void 0!==n?n:0)}),0)}));var f=(c+l)/2,d=Math.max.apply(Math,a(s.filter((function(e){return e<=f})))),p=Math.min.apply(Math,a(s.filter((function(e){return e>f}))));return e+Math.min(l-d,p-c)}),0),o=t.w[r]*n;o>u.heur&&(u={k:r,heur:o})})),""===u.k)throw console.log("===================== SHATTER BROKE ====================",n,e),Error("Shatter broke...");return u}(t,r.cachedCompute),v=h.k,m=Object.fromEntries(Object.entries(t.values).map((function(e){var r=i(e,2),n=r[0],t=r[1].map((function(e){return e.values[v]}));return[n,(Math.min.apply(Math,a(t))+Math.max.apply(Math,a(t)))/2]}))),b=Object.fromEntries(Object.entries(t.values).map((function(e){var r=i(e,2),n=r[0],t=r[1],o=t.filter((function(e){return e.values[v]<m[n]})),a=t.filter((function(e){return!(e.values[v]<m[n])}));return[n,[a,o]]}))),g=[];return l([0,1],[0,1],[0,1],[0,1],[0,1]).forEach((function(o){var u=i(o,5),c=u[0],l=u[1],f=u[2],d=u[3],h=u[4],v={base:n({},t.base),values:{flower:b.flower[c],plume:b.plume[l],sands:b.sands[f],goblet:b.goblet[d],circlet:b.circlet[h]}},m=Object.values(v.values).reduce((function(e,r){return e*r.length}),1);if(0!==m){var y=Y(v),w=y.statsMin,S=y.statsMax,E=oe(r,w,S);if(void 0!==E){var k=Z({a:v,cachedCompute:p}).maxEst;if(!E.constraints.some((function(e,r){var n=e.min;return k[r]<n}))&&!(k[k.length-1]<e)){var M=[].concat(a(E.constraints.map((function(e){return e.value}))),[E.optimizationTarget]),O=Z({a:v,f:M});if(!E.constraints.some((function(e,r){var n=e.min;return O.maxEst[r]<n}))&&!(O.maxEst[O.maxEst.length-1]<e)){var j=s(C,(function(e){return{kind:"id",ids:new Set(v.values[e].map((function(e){return e.id})))}}));g.push({numBuilds:m,subproblem:n(n({},E),{},{filter:j,cache:!0,cachedCompute:O})})}}}}})),g.sort((function(e,r){return r.numBuilds-e.numBuilds})),g.map((function(e){return e.subproblem}))}}]),e}();function oe(e,r,n){var t=e.optimizationTarget,o=e.constraints,u=e.artSetExclusion,s=[t].concat(a(o.map((function(e){return e.value})))),c=o.map((function(e){return e.min}));s=function(e,r,n){var t=Object.fromEntries(Object.entries(r).filter((function(e){var r=i(e,2),t=r[0];return r[1]===n[t]})));return T(O(e,(function(e){return e}),(function(e){if("read"===e.operation&&e.path[1]in t)return v(t[e.path[1]]);if("threshold"===e.operation){var o=i(e.operands,4),a=o[0],u=o[1],s=o[2],c=o[3];if("read"===a.operation&&"const"===u.operation){if(r[a.path[1]]>=u.value)return e.operands[2];if(n[a.path[1]]<u.value)return e.operands[3]}if("const"!==s.operation){if("const"===c.operation&&0===c.value)return g(y(a,u,1,0),s);throw Error("Threshold between non-const `pass` and non-zero `fail` not supported.")}}return e})),{})}(s,r,n);var l=i(P(s,(function(e){return e.path[1]})),3),f=l[0],d=l[1],p=l[2];Object.entries(r).forEach((function(e){var r,n=i(e,2),t=n[0],o=n[1];return p[null!==(r=d[t])&&void 0!==r?r:0]=o}));var h=f(),m=s.shift(),b=c.map((function(e,r){return e>h[r]}));b[0]=!0;for(var w=s.map((function(e,r){return{value:e,min:c[r]}})).filter((function(e,r){return b[r]})),S={},E=function(){var e=i(M[k],2),t=e[0],o=e[1];if("uniqueKey"===t)return S[t]=o,"continue";var a=o.filter((function(e){return r[t]<=e&&e<=n[t]}));if(a.includes(r[t])&&a.includes(n[t]))return{v:void 0};a.length>0&&(S[t]=a)},k=0,M=Object.entries(u);k<M.length;k++){var j=E();if("continue"!==j&&"object"===typeof j)return j.v}return console.log({artSetExclusion:u,newArtExcl:S},{statsMin:r,statsMax:n}),{cache:!1,optimizationTarget:m,constraints:w,artSetExclusion:S,filter:e.filter}}onmessage=function(e){var r,t=e.data,o=t.command;switch(o){case"setup":ee=t.id;var a=function(e){return postMessage(n({id:ee},e))};re=new te(t,a),ne=new H(t,a),r={command:"iterate"};break;case"split":r={command:"split",subproblems:re.split(t),ready:0===re.subproblems.length};break;case"splitwork":r={command:"split",subproblems:re.splitWork(t),ready:0===re.subproblems.length};break;case"iterate":var i=t.threshold,u=t.subproblem;ne.compute(i,u),r={command:"iterate"};break;case"finalize":ne.refresh(!0);var s=ne;r={command:"finalize",builds:s.builds,plotData:s.plotData};break;default:c(o)}postMessage(n({id:ee},r))}}();
//# sourceMappingURL=BackgroundWorker.d62f4b17.worker.js.map