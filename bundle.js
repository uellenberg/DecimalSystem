var bundle;(()=>{"use strict";var e={890:(e,t,o)=>{o.d(t,{C:()=>r});var n=function(e){var t=parseInt(e,10);return isNaN(t)&&(t=e.charCodeAt(0)-87),t},i=function(e,t){for(var o=0,n=t.length,i=e.length;o<n;o++,i++)e[i]=t[o];return e},r=function(){function e(e){if(this._base=10,this._cache={},"number"!=typeof e&&"string"!=typeof e||(e={num:e}),null!=e.base&&10!==e.base){if("string"!=typeof e.num&&(e.num=e.num.toString().trim().toLowerCase()),isNaN(e.base))throw new Error("The base field is not a valid number.");this._base=e.base;var t=e.num.split(/\./g);if(t.length>2)throw new Error("The input number contains multiple decimals.");for(var o=t[0].length,i=t.join(""),r=0,p=0;p<i.length;p++)r+=n(i[p])*Math.pow(this._base,o-p-1);this._number=r}else{if("string"==typeof e.num&&(e.num=parseInt(e.num.trim().toLowerCase(),10)),isNaN(e.num))throw new Error("The input number is not valid. If you are trying to use a non-base 10 number, supply a base field to the options.");this._number=e.num}}return Object.defineProperty(e.prototype,"base",{get:function(){return this._base},enumerable:!1,configurable:!0}),e.prototype.Convert=function(e,t){if(!this._cache.hasOwnProperty(e.toString()+"|"+t.toString())){if(10===e){var o=this._number.toString();return o.startsWith("0")&&(o=o.substring(1)),void(this._cache[e.toString()+"|"+t.toString()]=o)}for(var n,r=this._number,p=Math.ceil(Math.log(r)/Math.log(this._base))+(r%this._base==0?1:0),s=[],a=[],d=p-1;d>-1*t-1;d--){var l=Math.floor(r/Math.pow(this._base,d)%this._base);r-=l*Math.pow(this._base,d);var h=(n=l)<10?n.toString():String.fromCharCode(n+87);if("0"===h&&s.length<1)p--;else if("0"!==h||s.length<p?(s.push.apply(s,i(i([],a),[h])),a=[]):a.push("0"),r<=0)break}s.length<p&&s.push.apply(s,"0".repeat(p-s.length).split("")),s.length>p&&s.splice(p,0,"."),this._cache[e.toString()+"|"+t.toString()]=s.join("")}},e.prototype.toBase=function(e){return this._base===e||(this._base=e),this},e.prototype.toString=function(e){return void 0===e&&(e=8),this._cache.hasOwnProperty(this._base.toString()+"|"+e.toString())||this.Convert(this._base,e),this._cache[this._base.toString()+"|"+e.toString()]},e.prototype.toNumber=function(e){return void 0===e&&(e=8),parseFloat(this.toString(e))},e}()},634:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.circle=void 0;var n=o(566),i=o(890).C;t.circle=function(){$((function(){window.geo=Desmos.Geometry(document.getElementById("geometry")),window.geo.setState(r),setInterval((function(){var e=window.geo.getState(),t=2*Math.hypot(Math.abs(e.objects[1].x-e.objects[2].x),Math.abs(e.objects[1].y-e.objects[2].y)),o=t*Math.PI;n.updateDesmosLabels(["2"],new i(o).toBase(Math.PI).toString(3),e),n.updateDesmosLabels(["29"],new i(t).toBase(Math.PI).toString(4),e),window.geo.setState(e)}),100)}))};var r={version:"4",objects:{0:{id:"0",type:"circle",hidden:!1,parents:{point1:"1",point2:"2"},color:"#388c46"},1:{hidden:!1,type:"point",x:.04100606379758487,y:-.0779060802801137,parents:{},id:"1",color:"#6042a6"},2:{hidden:!1,type:"point",x:3.1222531198415155,y:-.06374801885928516,parents:{},id:"2",color:"#6042a6",label:"A",showLabel:!0},3:{id:"3",type:"circle",hidden:!0,parents:{point1:"2",point2:"1"},color:"#388c46"},6:{id:"6",type:"circle",hidden:!0,parents:{point1:"7",point2:"1"},color:"#388c46"},7:{hidden:!0,type:"intersection",negRoot:!1,parents:{host1:"3",host2:"0"},id:"7",color:"#6042a6"},9:{id:"9",type:"circle",hidden:!0,parents:{point1:"10",point2:"1"},color:"#388c46"},10:{hidden:!0,type:"intersection",negRoot:!1,parents:{host1:"6",host2:"0"},id:"10",color:"#6042a6"},12:{id:"12",type:"circle",hidden:!0,parents:{point1:"13",point2:"1"},color:"#388c46"},13:{hidden:!0,type:"intersection",negRoot:!1,parents:{host1:"9",host2:"0"},id:"13",color:"#6042a6"},17:{id:"17",type:"circle",hidden:!0,parents:{point1:"18",point2:"1"},color:"#388c46"},18:{hidden:!0,type:"intersection",negRoot:!1,parents:{host1:"12",host2:"0"},id:"18",color:"#6042a6"},20:{id:"20",type:"circle",hidden:!0,parents:{point1:"21",point2:"1"},color:"#388c46"},21:{hidden:!0,type:"intersection",negRoot:!0,parents:{host1:"3",host2:"17"},id:"21",color:"#6042a6"},29:{id:"29",type:"segment",hidden:!1,parents:{point1:"18",point2:"7"},color:"#2d70b3",label:"A",showLabel:!0},32:{id:"32",type:"segment",hidden:!1,parents:{point1:"1",point2:"2"},color:"#2d70b3",showLabel:!0}},viewport:{centerX:0,centerY:0,size:15},customTools:{},graphSettings:{showGrid:!1,showAxes:!1,showAxisNumbers:!1}}},866:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.golden=void 0;var n=o(566),i=o(890).C;t.golden=function(){$((function(){window.geo=Desmos.Geometry(document.getElementById("geometry")),window.geo.setState(r);var e=(1+Math.sqrt(5))/2;setInterval((function(){var t=window.geo.getState(),o=Math.hypot(Math.abs(t.objects[62].x-t.objects[63].x),Math.abs(t.objects[62].y-t.objects[63].y))/1.2356979405,r=o/e,p=o-r,s=Math.sqrt(2*Math.pow(o,2));n.updateDesmosLabels(["275"],new i(o).toBase(e).toString(3),t),n.updateDesmosLabels(["122","115"],new i(r).toBase(e).toString(3),t),n.updateDesmosLabels(["165","200"],new i(p).toBase(e).toString(3),t),n.updateDesmosLabels(["384"],new i(s).toBase(e).toString(3),t),window.geo.setState(t)}),100)}))};var r={version:"4",objects:{61:{id:"61",type:"segment",hidden:!0,parents:{point1:"62",point2:"63"},color:"#2d70b3"},62:{hidden:!1,type:"point",x:-1.6238823454714244,y:1.0454797368786466,parents:{},id:"62",color:"#6042a6",label:"A",showLabel:!0},63:{hidden:!0,type:"point",id:"63",parents:{},x:2.379641362712296,y:1.0172481379851026,color:"#6042a6",label:"C",showLabel:!0},66:{id:"66",type:"circle",hidden:!0,parents:{point1:"63",point2:"68"},color:"#388c46"},68:{hidden:!0,type:"glider",t:.2930398517019122,parents:{host:"61"},id:"68",color:"#6042a6",label:"D",showLabel:!0},69:{id:"69",type:"circle",hidden:!0,parents:{point1:"62",point2:"71"},color:"#388c46"},71:{hidden:!0,type:"glider",t:.7069827185524342,parents:{host:"61"},id:"71",color:"#6042a6"},74:{id:"74",type:"segment",hidden:!0,parents:{point1:"62",point2:"76"},color:"#2d70b3"},76:{hidden:!1,type:"intersection",negRoot:!0,parents:{host1:"69",host2:"66"},id:"76",color:"#6042a6"},79:{id:"79",type:"midpoint",hidden:!1,parents:{straight:"61"},color:"#6042a6",label:"B",showLabel:!0},81:{id:"81",type:"segment",hidden:!1,parents:{point1:"76",point2:"79"},color:"#2d70b3"},86:{type:"segment",id:"86",hidden:!0,parents:{point1:"79",point2:"62"},color:"#2d70b3"},89:{id:"89",type:"polygon",hidden:!0,parents:{points:["79","62","76"]},color:"#2d70b3"},100:{id:"100",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"76",point2:"79",point3:"62"},color:"#000000"},104:{id:"104",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"76",point2:"62",point3:"79"},color:"#000000"},110:{id:"110",type:"perpendicular",hidden:!0,parents:{straight:"81",point:"76"},color:"#2d70b3"},112:{id:"112",type:"perpendicular",hidden:!0,parents:{straight:"86",point:"62"},color:"#2d70b3"},115:{type:"segment",id:"115",hidden:!1,parents:{point1:"119",point2:"62"},color:"#2d70b3",label:"{length}",showLabel:!0},118:{id:"118",type:"polygon",hidden:!0,parents:{points:["119","62","79","76"]},color:"#2d70b3"},119:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"112",host2:"110"},id:"119",color:"#6042a6"},122:{type:"segment",id:"122",hidden:!1,parents:{point1:"76",point2:"119"},color:"#2d70b3",label:"{length}",showLabel:!0},147:{id:"147",type:"midpoint",hidden:!0,parents:{straight:"86"},color:"#6042a6"},151:{id:"151",type:"circle",hidden:!0,parents:{point1:"147",point2:"76"},color:"#388c46"},156:{id:"156",type:"perpendicular",hidden:!0,parents:{straight:"61",point:"157"},color:"#2d70b3"},157:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"61",host2:"151"},id:"157",color:"#6042a6"},158:{id:"158",type:"perpendicular",hidden:!0,parents:{straight:"156",point:"76"},color:"#2d70b3"},165:{id:"165",type:"segment",hidden:!1,parents:{point1:"76",point2:"167"},color:"#2d70b3",label:"{length}",showLabel:!0},167:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"158",host2:"156"},id:"167",color:"#6042a6"},170:{id:"170",type:"circle",hidden:!0,parents:{point1:"167",point2:"76"},color:"#388c46"},184:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"156",host2:"170"},id:"184",color:"#6042a6"},191:{id:"191",type:"circle",hidden:!0,parents:{point1:"76",point2:"167"},color:"#388c46"},196:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"81",host2:"191"},id:"196",color:"#6042a6"},198:{type:"segment",id:"198",hidden:!1,parents:{point1:"76",point2:"196"},color:"#2d70b3"},199:{type:"segment",id:"199",hidden:!1,parents:{point1:"196",point2:"184"},color:"#2d70b3"},200:{type:"segment",id:"200",hidden:!1,parents:{point1:"184",point2:"167"},color:"#2d70b3",label:"{length}",showLabel:!0},201:{id:"201",type:"polygon",hidden:!0,parents:{points:["76","196","184","167"]},color:"#2d70b3"},214:{id:"214",type:"segment",hidden:!0,parents:{point1:"76",point2:"184"},color:"#2d70b3",label:"{length}",showLabel:!0},220:{type:"segment",id:"220",hidden:!1,parents:{point1:"79",point2:"157"},color:"#2d70b3"},221:{type:"segment",id:"221",hidden:!1,parents:{point1:"157",point2:"167"},color:"#2d70b3"},222:{id:"222",type:"polygon",hidden:!0,parents:{points:["76","79","157","167"]},color:"#2d70b3"},247:{id:"247",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"62",point2:"76",point3:"79"},color:"#000000"},251:{id:"251",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"76",point2:"196",point3:"184"},color:"#000000"},255:{id:"255",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"76",point2:"184",point3:"196"},color:"#000000"},259:{id:"259",type:"angle",hidden:!0,showLabel:!0,label:"{angle}",parents:{point1:"196",point2:"76",point3:"184"},color:"#000000"},265:{id:"265",type:"segment",hidden:!1,parents:{point1:"184",point2:"157"},color:"#2d70b3"},270:{id:"270",type:"segment",hidden:!1,parents:{point1:"184",point2:"167"},color:"#2d70b3"},275:{id:"275",type:"segment",hidden:!1,parents:{point1:"62",point2:"157"},color:"#2d70b3",label:"{length}",showLabel:!0},282:{hidden:!0,type:"point",x:-3.9631517052136425,y:1.7816542532340263,parents:{},id:"282",color:"#6042a6"},288:{hidden:!0,type:"point",x:.14112112896903106,y:2.052136417091337,parents:{},id:"288",color:"#6042a6"},296:{id:"296",type:"midpoint",hidden:!1,parents:{straight:"165"},color:"#6042a6"},348:{id:"348",type:"circle",hidden:!0,parents:{point1:"62",point2:"157"},color:"#388c46"},358:{id:"358",type:"line",hidden:!0,parents:{point1:"62",point2:"119"},color:"#2d70b3"},363:{id:"363",type:"perpendicular",hidden:!0,parents:{straight:"358",point:"364"},color:"#2d70b3"},364:{hidden:!1,type:"intersection",negRoot:!0,parents:{host1:"358",host2:"348"},id:"364",color:"#6042a6"},365:{id:"365",type:"perpendicular",hidden:!0,parents:{straight:"363",point:"157"},color:"#2d70b3"},368:{type:"segment",id:"368",hidden:!1,parents:{point1:"62",point2:"364"},color:"#2d70b3"},369:{type:"segment",id:"369",hidden:!1,parents:{point1:"364",point2:"374"},color:"#2d70b3"},370:{type:"segment",id:"370",hidden:!1,parents:{point1:"374",point2:"157"},color:"#2d70b3"},371:{id:"371",type:"polygon",hidden:!1,parents:{points:["62","364","374","157"]},color:"#2d70b3"},374:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"365",host2:"363"},id:"374",color:"#6042a6"},384:{id:"384",type:"segment",hidden:!1,parents:{point1:"364",point2:"157"},color:"#2d70b3",label:"{length}",showLabel:!0},389:{id:"389",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"157",point2:"62",point3:"364"},color:"#000000"},393:{id:"393",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"62",point2:"364",point3:"157"},color:"#000000"},403:{id:"403",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"62",point2:"157",point3:"364"},color:"#000000"},407:{id:"407",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"364",point2:"374",point3:"157"},color:"#000000"},416:{id:"416",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"374",point2:"157",point3:"364"},color:"#000000"},420:{id:"420",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"157",point2:"364",point3:"374"},color:"#000000"},426:{id:"426",type:"segment",hidden:!0,parents:{point1:"62",point2:"63"},color:"#2d70b3",label:"{length}",showLabel:!0}},viewport:{centerX:0,centerY:0,size:15},customTools:{},graphSettings:{showGrid:!1,showAxes:!1,showAxisNumbers:!1}}},206:function(e,t,o){var n=this&&this.__createBinding||(Object.create?function(e,t,o,n){void 0===n&&(n=o),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,n){void 0===n&&(n=o),e[n]=t[o]}),i=this&&this.__exportStar||function(e,t){for(var o in e)"default"===o||Object.prototype.hasOwnProperty.call(t,o)||n(t,e,o)};Object.defineProperty(t,"__esModule",{value:!0}),i(o(634),t),i(o(578),t),i(o(866),t)},578:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.triangle=void 0;var n=o(566),i=o(890).C;t.triangle=function(){var e=Math.cos(45*Math.PI/180),t=Math.sin(45*Math.PI/180);$((function(){window.geo=Desmos.Geometry(document.getElementById("geometry")),window.geo.setState(r),setInterval((function(){var o=window.geo.getState(),r=Math.hypot(Math.abs(o.objects[923].x-o.objects[924].x),Math.abs(o.objects[923].y-o.objects[924].y))/2,p=r/e,s=t*p;n.updateDesmosLabels(["948"],new i(r).toBase(Math.SQRT2).toNumber(0).toLocaleString(),o),n.updateDesmosLabels(["949"],new i(s).toBase(Math.SQRT2).toNumber(0).toLocaleString(),o),n.updateDesmosLabels(["940"],new i(p).toBase(Math.SQRT2).toNumber(0).toLocaleString(),o),window.geo.setState(o)}),100)}))};var r={version:"4",objects:{922:{id:"922",type:"segment",hidden:!0,parents:{point1:"923",point2:"924"},color:"#2d70b3"},923:{hidden:!1,type:"point",x:-4.464597902097905,y:.019667832167829857,parents:{},id:"923",color:"#6042a6",label:"B",showLabel:!0},924:{hidden:!0,type:"point",x:1.7373251748251732,y:-.05900349650349934,parents:{},id:"924",color:"#6042a6",label:"A",showLabel:!0},927:{id:"927",type:"circle",hidden:!0,parents:{point1:"923",point2:"929"},color:"#388c46"},929:{hidden:!0,type:"glider",t:.7039013115156058,parents:{host:"922"},id:"929",color:"#6042a6"},932:{id:"932",type:"segment",hidden:!0,parents:{point1:"923",point2:"929"},color:"#2d70b3"},937:{id:"937",type:"compass",hidden:!0,parents:{straight:"932",center:"924"},color:"#388c46"},940:{id:"940",type:"segment",hidden:!1,parents:{point1:"923",point2:"942"},color:"#2d70b3",label:"H",showLabel:!0},942:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"937",host2:"927"},id:"942",color:"#6042a6"},945:{id:"945",type:"perpendicular",hidden:!0,parents:{straight:"932",point:"942"},color:"#2d70b3"},948:{type:"segment",id:"948",hidden:!1,parents:{point1:"923",point2:"953"},color:"#2d70b3",label:"L1",showLabel:!0},949:{type:"segment",id:"949",hidden:!1,parents:{point1:"953",point2:"942"},color:"#2d70b3",label:"L2",showLabel:!0},951:{id:"951",type:"polygon",hidden:!1,parents:{points:["923","953","942"]},color:"#2d70b3"},953:{hidden:!1,type:"intersection",negRoot:!1,parents:{host1:"945",host2:"932"},id:"953",color:"#6042a6"},962:{id:"962",type:"segment",hidden:!1,parents:{point1:"953",point2:"942"},color:"#2d70b3"},967:{id:"967",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"942",point2:"953",point3:"923"},color:"#000000"},971:{id:"971",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"942",point2:"923",point3:"953"},color:"#000000"},975:{id:"975",type:"angle",hidden:!1,showLabel:!0,label:"{angle}",parents:{point1:"923",point2:"942",point3:"953"},color:"#000000"}},viewport:{centerX:0,centerY:0,size:15},customTools:{},graphSettings:{showGrid:!1,showAxes:!1,showAxisNumbers:!1}}},566:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateDesmosLabels=void 0,t.updateDesmosLabels=function(e,t,o){e.forEach((function(e){o.objects[e].label=t}))}}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n=o(206);bundle=n})();