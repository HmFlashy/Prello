(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{111:function(t,e,a){},183:function(t,e,a){t.exports=a(369)},188:function(t,e,a){},190:function(t,e,a){t.exports=a.p+"static/media/logo.5d5d9eef.svg"},191:function(t,e,a){},220:function(t,e,a){},29:function(t,e){t.exports={API:"http://khal-prello.igpolytech.fr/api",SOCKET:"http://khal-prello.igpolytech.fr"}},300:function(t,e,a){},337:function(t,e,a){},362:function(t,e){},369:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),c=a(47),o=a.n(c),s=(a(188),a(21)),u=a(22),i=a(25),p=a(23),d=a(26),l=a(380),b=a(376),f=a(379),h=a(378),m=(a(190),a(191),a(158)),O=a.n(m),v=a(7),y=a.n(v),E=a(10),j=(a(111),a(24)),_=a(33),A=a.n(_),D=a(29),w=a.n(D),I={"Access-Control-Allow-Origin":"*"},k={updateListNameApi:function(){var t=Object(E.a)(y.a.mark(function t(e,a){var r;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.put("".concat(w.a.API,"/lists/").concat(e),{name:a},I);case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),t.t0;case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}(),addListApi:function(){var t=Object(E.a)(y.a.mark(function t(e,a){var r;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.post("".concat(w.a.API,"/lists"),{name:e,boardID:a},I);case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}()},x={getCardByIdApi:function(){var t=Object(E.a)(y.a.mark(function t(e){var a;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.get("".concat(w.a.API,"/cards/").concat(e),I);case 3:return a=t.sent,t.abrupt("return",a.data);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),t.t0;case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),updateCardNameApi:function(){var t=Object(E.a)(y.a.mark(function t(e,a){var r;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.put("".concat(w.a.API,"/cards/").concat(e),{name:a},I);case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}(),addCardApi:function(){var t=Object(E.a)(y.a.mark(function t(e,a){var r;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.post("".concat(w.a.API,"/cards"),{name:e,listId:a},I);case 3:return r=t.sent,t.abrupt("return",r.data);case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e,a){return t.apply(this,arguments)}}()},C=a(41),g=(a(220),a(377)),B=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(i.a)(this,Object(p.a)(e).call(this))).textToTextInput=t.textToTextInput.bind(Object(C.a)(Object(C.a)(t))),t.updateName=t.updateName.bind(Object(C.a)(Object(C.a)(t))),t.state={isNameUpdating:!1},t}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){}},{key:"textToTextInput",value:function(){this.setState({isNameUpdating:!0})}},{key:"updateName",value:function(t){this.setState({isNameUpdating:!1}),this.props.updateName(this.props.card._id,t)}},{key:"render",value:function(){var t=this;return n.a.createElement(g.a,{className:"cardOverview"},n.a.createElement("p",{onClick:this.textToTextInput},this.state.isNameUpdating?n.a.createElement("input",{type:"text",name:"name",placeholder:this.props.card.name,onKeyPress:function(e){return 13===e.charCode?t.updateName(e.target.value):null}}):this.props.card.name),n.a.createElement("span",{className:"pos",color:"textSecondary"},"adjective"))}}]),e}(r.Component),T=Object(j.b)(function(t,e){return{card:t.cardReducer.cards.find(function(t){return e.cardId===t._id})}},function(t,e){return{updateName:function(){var e=Object(E.a)(y.a.mark(function e(a,r){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.updateCardNameApi(a,r);case 3:e.next=9;break;case 5:return e.prev=5,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",t({type:"FAILED_UPDATE_CARD_NAME",payload:e.t0}));case 9:case"end":return e.stop()}},e,this,[[0,5]])}));return function(t,a){return e.apply(this,arguments)}}()}})(B),N=a(374),R=a(375),L=(a(300),function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this;return n.a.createElement(g.a,{className:"myList"},n.a.createElement("h3",null,this.props.list.name),n.a.createElement(N.a,{className:"items"},n.a.createElement(R.a,null,this.props.list.cards.map(function(t){return n.a.createElement(R.a.Item,null,n.a.createElement(T,{key:t,cardId:t}))}))),n.a.createElement("input",{onKeyDown:function(e){return 13===e.keyCode?t.props.addCard(e.target.value,t.props.list._id):null}}))}}]),e}(r.Component)),S=Object(j.b)(function(t,e){return{list:t.listReducer.lists.find(function(t){return t._id===e.listId})}},function(t,e){return{updateListName:function(){var e=Object(E.a)(y.a.mark(function e(a){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.updateListNameApi(a._id,a.name);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),t({type:"FAILED_UPDATE_LIST_NAME",payload:e.t0});case 8:case"end":return e.stop()}},e,this,[[0,5]])}));return function(t){return e.apply(this,arguments)}}(),addCard:function(){var e=Object(E.a)(y.a.mark(function e(a,r){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.addCardApi(a,r);case 3:e.next=9;break;case 5:return e.prev=5,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",t({type:"FAILED_ADD_CARD",payload:e.t0}));case 9:case"end":return e.stop()}},e,this,[[0,5]])}));return function(t,a){return e.apply(this,arguments)}}()}})(L),F=(a(337),function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this;return n.a.createElement(g.a,{className:"myList"},n.a.createElement("input",{placeholder:"Create a new list",onKeyDown:function(e){return 13===e.keyCode?t.props.addList(e.target.value,t.props.boardId):null}}))}}]),e}(r.Component)),H=Object(j.b)(function(t){return console.log(t.boardReducer.currentBoard._id),{boardId:t.boardReducer.currentBoard._id}},function(t){return{addList:function(){var e=Object(E.a)(y.a.mark(function e(a,r){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.addListApi(a,r);case 3:e.next=9;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0),t({type:"FAILED_ADD_LIST",payload:e.t0});case 9:case"end":return e.stop()}},e,this,[[0,5]])}));return function(t,a){return e.apply(this,arguments)}}()}})(F),P=function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentWillMount",value:function(){this.props.subscribe(),this.props.fetchBoard(this.props.match.params.boardId)}},{key:"render",value:function(){return n.a.createElement(R.a,{className:"board"},this.props.board.lists.map(function(t){return n.a.createElement(R.a.Item,{className:"no-padding-top"},n.a.createElement(S,{key:t,listId:t}))}),n.a.createElement(R.a.Item,{className:"no-padding-top"},n.a.createElement(H,null)))}}]),e}(r.Component),U=a(171),G=a.n(U)()(w.a.SOCKET);G.on("connect",function(){console.log("Connected !")}),G.on("error",function(t){console.log(t)});var M={subscribe:function(t){G.emit("subscribeToBoard")},init:function(t){G.on("action",function(e){return t.dispatch(e)})},emit:function(t,e){G.emit(t,e)}},K={fetchBoard:function(){var t=Object(E.a)(y.a.mark(function t(e){var a;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.get("".concat(w.a.API,"/boards/").concat(e),I);case 3:return a=t.sent,t.abrupt("return",a.data);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),t.t0;case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}(),fetchBoards:function(){var t=Object(E.a)(y.a.mark(function t(){var e;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.a.get("".concat(w.a.API,"/boards"),I);case 3:return e=t.sent,t.abrupt("return",e.data);case 7:throw t.prev=7,t.t0=t.catch(0),console.log(t.t0),t.t0;case 11:case"end":return t.stop()}},t,this,[[0,7]])}));return function(){return t.apply(this,arguments)}}()},W=function(t){return{type:"BOARD_SUBSCRIBE",payload:t}},X=function(t){return{type:"FETCHING_BOARD",payload:t}},J=function(t){return{type:"FETCHED_BOARDS",payload:t}},V=Object(j.b)(function(t){return console.log("refresh"),{board:t.boardReducer.currentBoard}},function(t){return{subscribe:function(){M.subscribe(),t(W())},fetchBoard:function(){var e=Object(E.a)(y.a.mark(function e(a){var r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(X(a)),e.next=4,K.fetchBoard(a);case 4:r=e.sent,t({type:"FETCHED_BOARD",payload:r}),e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",t({type:"FAILED_FETCH_BOARD",payload:e.t0}));case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(t){return e.apply(this,arguments)}}()}})(P),$=function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentWillMount",value:function(){this.props.subscribe()}},{key:"handleClick",value:function(){this.props.history.push({pathname:"/boards/:boardId",state:{boardId:this.props.board._id}})}},{key:"render",value:function(){return n.a.createElement(g.a,{className:"cardOverview"},n.a.createElement("button",{onClick:this.handleClick},this.props.board?this.props.board.name:""))}}]),e}(r.Component),q=Object(j.b)(function(t,e){return{board:t.boardReducer.boards.find(function(t){return e.boardId===t._id})}},function(t,e){return{subscribe:function(){M.subscribe(),t(W())}}})($),z=function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"componentWillMount",value:function(){this.props.subscribe(),this.props.fetchBoards()}},{key:"render",value:function(){return n.a.createElement(R.a,{className:"board"},this.props.boards.map(function(t){return n.a.createElement(R.a.Item,{className:"no-padding-top"},n.a.createElement(q,{key:t,boardId:t}))}))}}]),e}(r.Component),Q=Object(j.b)(function(t){return{boards:t.boardReducer.boards}},function(t){return{subscribe:function(){M.subscribe(),t(W())},fetchBoards:function(){var e=Object(E.a)(y.a.mark(function e(){var a;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:"FETCHING_BOARDS",payload:null}),e.next=4,K.fetchBoards();case 4:a=e.sent,t(J(a)),e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",t({type:"FAILED_FETCH_BOARDS",payload:e.t0}));case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}()}})(z),Y=O()(),Z=function(t){function e(){return Object(s.a)(this,e),Object(i.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){return n.a.createElement(l.a,{history:Y},n.a.createElement("div",{className:"App"},n.a.createElement(b.a,{to:"/login"},"Home")," ",n.a.createElement(b.a,{to:"/"},"About")," ",n.a.createElement(b.a,{to:"/contact"},"Contact")," ",n.a.createElement(b.a,{to:"/boards"},"Boards")," ",n.a.createElement(b.a,{to:"/boards/board1"},"Board"),n.a.createElement(f.a,null,n.a.createElement(h.a,{exact:!0,path:"/login"}),n.a.createElement(h.a,{exact:!0,path:"/boards",component:Q}),n.a.createElement(h.a,{exact:!0,path:"/boards/:boardId",component:V}),n.a.createElement(h.a,{path:""},n.a.createElement("div",null,n.a.createElement("p",{className:"App-intro"},"Salut"))))))}}]),e}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var tt=a(38),et=a(173),at=a(39),rt=a(9),nt={cards:[]},ct={fetching:!1,currentBoard:{_id:"",name:"",lists:[]},boards:[{_id:"board1",name:"tata"},{_id:"board2",name:"toto"}]},ot={lists:[]},st=Object(tt.c)({cardReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"FETCHED_BOARD":var a=e.payload;return Object(rt.a)({},t,{cards:a.lists.flatMap(function(t){return t.cards})});case"GET_CARD":return Object(rt.a)({},t,{card:e.payload.payload,error:null});case"FAILED_GET_CARD":return Object(rt.a)({},t,{error:e.payload});case"ADD_CARD":var r=e.payload;return Object(rt.a)({},t,{cards:Object(at.a)(t.cards).concat([r])});case"UPDATE_CARD_NAME":return Object(rt.a)({},t,{cards:t.cards.map(function(t){return t._id===e.payload._id?e.payload:t})});default:return t}},boardReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ct,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"FETCHED_BOARD":var a=e.payload;return Object(rt.a)({},t,{currentBoard:Object(rt.a)({},a,{lists:a.lists.map(function(t){return t._id})})});case"FETCHING_BOARD":return Object(rt.a)({},t,{fetching:!0});case"FETCHED_BOARDS":return Object(rt.a)({},t,{boards:Object(at.a)(e.payload)});case"FETCHING_BOARDS":return Object(rt.a)({},t,{fetching:!0});case"BOARD_SUBSCRIBE":return Object(rt.a)({},t);case"GET_BOARD":return Object(rt.a)({},t,{currentBoard:e.payload,error:null});case"FAILED_GET_BOARD":case"FAILED_GET_BOARDS":return Object(rt.a)({},t,{error:e.payload});case"ADD_LIST":var r=e.payload;return Object(rt.a)({},t,{currentBoard:Object(rt.a)({},t,{lists:Object(at.a)(t.currentBoard.lists).concat([r._id])})});case"FAILED_UPDATE_LIST_NAME":return Object(rt.a)({},t,{error:e.payload});default:return t}},listReducer:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ot,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"FETCHED_BOARD":var a=e.payload.lists.map(function(t){return Object(rt.a)({},t,{cards:t.cards.map(function(t){return t._id})})});return Object(rt.a)({},t,{lists:a});case"ADD_CARD":var r=e.payload;return Object(rt.a)({},t,{lists:t.lists.map(function(t){return r.list===t._id?Object(rt.a)({},t,{cards:Object(at.a)(t.cards).concat([r._id])}):t})});case"ADD_LIST":var n=e.payload;return Object(rt.a)({},t,{lists:Object(at.a)(t.lists).concat([Object(rt.a)({},n,{cards:[]})])});default:return Object(rt.a)({},t)}}});a(366);o.a.render(n.a.createElement(j.a,{store:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t=[Object(tt.a)(et.a)];window.__REDUX_DEVTOOLS_EXTENSION__&&t.push(window.__REDUX_DEVTOOLS_EXTENSION__());var e=Object(tt.e)(st,Object(tt.d)(t));return M.init(e),e}()},n.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[183,2,1]]]);
//# sourceMappingURL=main.51ef0d59.chunk.js.map