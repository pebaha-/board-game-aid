(this.webpackJsonpboardgamehelper=this.webpackJsonpboardgamehelper||[]).push([[0],{26:function(e,t,a){},32:function(e,t,a){e.exports=a(43)},37:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(18),s=a.n(l),c=(a(37),a(6)),o=a(7),i=a(11),u=a(8),p=a(10),d=a(16),y=(a(26),a(13)),m=a(9),h=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSecretHitlerClick=a.onSecretHitlerClick.bind(Object(d.a)(a)),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.secondsInput.focus()}},{key:"handleChange",value:function(e){var t=e.target.validity.valid?e.target.value:this.props.seconds;this.props.setTimerDuration(t)}},{key:"onSecretHitlerClick",value:function(e){this.props.players.length<1&&alert("You need at least five players to play. Click 'Edit players' to add more players.")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Board Game Aid")),r.a.createElement("div",{className:"App-body"},r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement(y.a,{to:"/sh"},r.a.createElement("button",{type:"button",onClick:this.onSecretHitlerClick},"Secret Hitler")))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement(y.a,{to:"/players"},r.a.createElement("button",{type:"button"},"Edit players")))))),r.a.createElement("p",null,"Role Timer Seconds"),r.a.createElement("input",{label:"test",ref:function(t){e.secondsInput=t},type:"text",pattern:"[0-9]*",value:this.props.seconds,onChange:this.handleChange.bind(this)})))}}]),t}(r.a.Component);var b=Object(m.b)((function(e,t){return{players:e.players,seconds:e.seconds}}),(function(e){return{setTimerDuration:function(t){e({type:"SET_TIMER_DURATION",seconds:t})}}}))(h),E=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handlePlayerAdd=function(e){e.preventDefault();var t=a.state.playerName,n=a.props.players;0!==t.length?n.includes(t)?alert(t+" is already a player"):(a.setState({playerName:""}),a.props.addPlayer(t),a.playerNameInput.focus()):alert("You must enter a player name")},a.handlePlayerDelete=function(e){e.preventDefault();var t=a.state.playerName,n=a.props.players;0!==t.length?n.includes(t)?(a.setState({playerName:""}),a.props.removePlayer(t),a.playerNameInput.focus()):alert(t+" is not a player"):alert("You must enter a player name")},a.handlePlayerChange=function(e){a.setState({playerName:e.target.value})},a.state={playerName:""},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.playerNameInput.focus()}},{key:"renderPlayerList",value:function(){return this.props.players.map((function(e){return r.a.createElement("div",{key:e},e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Players")),r.a.createElement("div",{className:"App-body"},r.a.createElement("form",null,r.a.createElement("input",{type:"text",label:"player-name",ref:function(t){e.playerNameInput=t},value:this.state.playerName,onChange:this.handlePlayerChange}),r.a.createElement("button",{onClick:this.handlePlayerAdd},"Add"),r.a.createElement("button",{onClick:this.handlePlayerDelete},"Delete")),this.renderPlayerList(),r.a.createElement(v,null)))}}]),t}(r.a.Component);function v(){return r.a.createElement(y.a,{to:"/"},r.a.createElement("button",{type:"button"},"Go back"))}var f=Object(m.b)((function(e,t){return{players:e.players}}),(function(e){return{addPlayer:function(t){e({type:"ADD_PLAYER",player:t})},removePlayer:function(t){e({type:"REMOVE_PLAYER",player:t})}}}))(E),O=a(15),k=a(3),j=Object(k.a)(),R=a(30),g=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={playerRoles:{},currentPlayer:"",currentRole:"",currentPlayerIndex:0,showRole:!1,secondsRemaining:a.props.seconds,disabledRoleButton:!1,playersCycled:!1},a.onShowRoleClick=a.onShowRoleClick.bind(Object(d.a)(a)),a.tick=a.tick.bind(Object(d.a)(a)),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=[],a=this.props.players.length,n=0;switch(a){case 5:case 6:n=1;break;case 7:case 8:n=2;break;case 9:case 10:n=3}t.push("Hitler");for(var r=0;r<n;r++)t.push("Fascist");for(var l=0;l<a-n-1;l++)t.push("Liberal");t=this.shuffle(t),this.setState({playerRoles:this.props.players.map((function(e){return Object(R.a)({},e,t.pop())}))},(function(){e.setState({currentPlayer:e.props.players[e.state.currentPlayerIndex],currentRole:e.state.playerRoles[e.state.currentPlayerIndex][e.props.players[e.state.currentPlayerIndex]]})}))}},{key:"shuffle",value:function(e){for(var t,a,n=e.length;0!==n;)a=Math.floor(Math.random()*n),t=e[n-=1],e[n]=e[a],e[a]=t;return e}},{key:"tick",value:function(){var e=this;0===this.state.secondsRemaining?(clearInterval(this.intervalHandle),this.setState({showRole:!1,disabledRoleButton:!1}),this.state.currentPlayerIndex===this.props.players.length-1?this.setState({playersCycled:!0}):this.setState({secondsRemaining:this.props.seconds,currentPlayerIndex:this.state.currentPlayerIndex+1},(function(){e.setState({currentPlayer:e.props.players[e.state.currentPlayerIndex],currentRole:e.state.playerRoles[e.state.currentPlayerIndex][e.props.players[e.state.currentPlayerIndex]]})}))):this.setState({secondsRemaining:this.state.secondsRemaining-1})}},{key:"onShowRoleClick",value:function(e){this.intervalHandle=setInterval(this.tick,1e3),this.setState({showRole:!0,disabledRoleButton:!0})}},{key:"render",value:function(){return this.state.playerRoles.length<this.props.players.length?r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Secret Hitler")),r.a.createElement("div",{className:"App-body"})):this.state.playersCycled?r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Secret Hitler")),r.a.createElement("div",{className:"App-body"},r.a.createElement("p",null,"Done cycling players!")),r.a.createElement("div",null,r.a.createElement(y.a,{to:"/"},r.a.createElement("button",{type:"button"},"Quit game")))):r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("p",null,"Secret Hitler")),r.a.createElement("div",{className:"App-body"},r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",null,this.state.currentPlayer))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",null,this.state.showRole?this.state.currentRole:""))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("div",null,this.state.showRole?this.state.secondsRemaining:""))),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("button",{type:"button",disabled:this.state.disabledRoleButton,onClick:this.onShowRoleClick},"Show role")))))))}}]),t}(r.a.Component);var P=Object(m.b)((function(e,t){return{players:e.players,seconds:e.seconds}}))(g),C=a(31),N=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.component,n=Object(C.a)(t,["component"]);return r.a.createElement(O.b,Object.assign({},n,{render:function(t){return e.props.players.length>=1?r.a.createElement(a,t):r.a.createElement(O.a,{to:"/"})}}))}}]),t}(r.a.Component);var S=Object(m.b)((function(e,t){return{players:e.players,seconds:e.seconds}}))(N),A=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(O.c,{history:j},r.a.createElement(O.d,null,r.a.createElement(O.b,{exact:!0,path:"/",component:b,key:1}),r.a.createElement(O.b,{path:"/players",component:f,key:2}),r.a.createElement(S,{path:"/sh",component:P,key:3})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=a(20),w="ADD_PLAYER",D="REMOVE_PLAYER",x="SET_TIMER_DURATION",H={players:[],seconds:15};var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;if(t.type===w)return Object.assign({},e,{players:e.players.concat(t.player)});if(t.type===D){var a=e.players.filter((function(e){return e!==t.player}));return Object.assign({},e,{players:a})}return t.type===x?Object.assign({},e,{seconds:t.seconds}):e},T=Object(I.b)(M);s.a.render(r.a.createElement(m.a,{store:T},r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[32,1,2]]]);
//# sourceMappingURL=main.71f871fb.chunk.js.map