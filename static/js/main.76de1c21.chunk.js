(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,a){t.exports=a(20)},16:function(t,e,a){},18:function(t,e,a){},20:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a.n(n),r=a(3),o=a.n(r),s=(a(16),a(1)),u=a.n(s),l=a(4),i=a(5),d=a(6),m=a(8),f=a(7),p=a(9),h=(a(18),Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_API_KEY:"0f7e5c9167768f6bb0a6e09e335ce464da7cb5e7008b989f0057266c26342424a4d8d3e5",REACT_APP_API_URL:"https://cors-anywhere.herokuapp.com/lamppoststudios.api-us1.com/api/3/contacts"})),g=h.REACT_APP_API_KEY,E=h.REACT_APP_API_URL,A="".concat(E,"?include=").concat([["deals","geoIps.geoAddress","contactTags.tag"].join(",")],"&limit=").concat(100),v=function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(m.a)(this,Object(f.a)(e).apply(this,arguments))).state={contacts:[],contactTags:[],geoAddresses:[],geoIps:[],deals:[],tags:[]},t.contactAvatar=function(t){var e=t.firstName,a=t.lastName;return e&&a?"".concat(e[0]).concat(a[0]):""},t.contactName=function(t){var e=t.firstName,a=t.lastName;return e||a?"".concat(e," ").concat(a):"-"},t.contactValue=function(e){return e.deals.reduce(function(e,a){var n=t.state.deals.find(function(t){return t.id===a});return n?e+Number(n.value):0},0)/100},t.contactLocations=function(e){return e.geoIps.reduce(function(e,a){var n=t.state.geoIps.find(function(t){return t.id===a});if(n){var c=n.geoAddress,r=t.state.geoAddresses.find(function(t){return t.id===c}),o=r.city,s=r.state,u=r.country2;e.push([o,s,u].join(", "))}return e},[])},t.contactTags=function(e){return(e.contactTags||[]).map(function(e){var a=t.state.contactTags.find(function(t){return t.id===e}).tag;return t.state.tags.find(function(t){return t.id===a}).tag})},t.hydrate(),t}return Object(p.a)(e,t),Object(d.a)(e,[{key:"hydrate",value:function(){var t=Object(l.a)(u.a.mark(function t(){var a,n,c,r,o,s,l;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.fetchContacts();case 3:a=t.sent,n=a.contacts,c=a.contactTags,r=a.geoAddresses,o=a.geoIps,s=a.deals,l=a.tags,this.setState({contacts:n,contactTags:c,geoAddresses:r,geoIps:o,deals:s,tags:l}),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.error(t.t0);case 16:case"end":return t.stop()}},t,this,[[0,13]])}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=this.state.contacts;return c.a.createElement("div",{className:"App"},!e.length&&c.a.createElement("p",null,"Loading data, please wait..."),c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Contact"),c.a.createElement("th",null,"Total Value"),c.a.createElement("th",null,"Location"),c.a.createElement("th",null,"Deals"),c.a.createElement("th",null,"Tags"))),c.a.createElement("tbody",null,e.map(function(e,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",{className:"name"},c.a.createElement("span",{className:"avatar","aria-hidden":"true"},t.contactAvatar(e)),c.a.createElement("span",{className:"full-name"},t.contactName(e))),c.a.createElement("td",null,"$",t.contactValue(e).toLocaleString()),c.a.createElement("td",null,t.contactLocations(e)[0]||"-"),c.a.createElement("td",{className:"deals"},e.deals.length),c.a.createElement("td",null,t.contactTags(e).join(", ")||"-"))}))))}}]),e}(n.Component);v.fetchContacts=function(){return fetch(A,{method:"GET",headers:{"Api-Token":g,"x-requested-with":"xhr","Content-Type":"application/json"}}).catch(function(){}).then(function(t){return t.json()})};a(19);o.a.render(c.a.createElement(v,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.76de1c21.chunk.js.map