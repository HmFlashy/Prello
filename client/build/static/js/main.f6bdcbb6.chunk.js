(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{177:function(e,t,a){},289:function(e,t,a){e.exports=a(546)},294:function(e,t,a){},296:function(e,t,a){},322:function(e,t,a){},384:function(e,t,a){},40:function(e,t){e.exports={API:"http://khal-prello.igpolytech.fr/api",SOCKET:"http://khal-prello.igpolytech.fr"}},409:function(e,t,a){},411:function(e,t,a){},413:function(e,t,a){},418:function(e,t,a){},420:function(e,t,a){},422:function(e,t,a){},424:function(e,t,a){},426:function(e,t,a){},444:function(e,t,a){},446:function(e,t,a){},448:function(e,t,a){},450:function(e,t,a){},527:function(e,t){},530:function(e,t,a){},546:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(75),l=a.n(c),s=(a(294),a(22)),o=a(23),i=a(26),u=a(24),d=a(25),p=a(561),m=a(562),h=a(563),b=(a(296),a(15)),f=a.n(b),E=a(20),v=(a(177),a(30)),O=a(48),y=a.n(O),j=a(40),C=a.n(j),D={"Access-Control-Allow-Origin":"*"},A={updateListNameApi:function(){var e=Object(E.a)(f.a.mark(function e(t,a){var n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.put("".concat(C.a.API,"/lists/").concat(t),{name:a},D);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.t0;case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}(),addListApi:function(){var e=Object(E.a)(f.a.mark(function e(t,a){var n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.post("".concat(C.a.API,"/lists"),{name:t,boardID:a},D);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}()},w={fetchCard:function(){var e=Object(E.a)(f.a.mark(function e(t){var a;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(C.a.API,"/cards/").concat(t),D);case 3:return a=e.sent,e.abrupt("return",a.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.t0;case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t){return e.apply(this,arguments)}}(),updateCardNameApi:function(){var e=Object(E.a)(f.a.mark(function e(t,a){var n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.put("".concat(C.a.API,"/cards/").concat(t),{name:a},D);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}(),addCardApi:function(){var e=Object(E.a)(f.a.mark(function e(t,a){var n;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.post("".concat(C.a.API,"/cards"),{name:t,listId:a},D);case 3:return n=e.sent,e.abrupt("return",n.data);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}()},N=function(e){return{type:"CARD_FETCHING",payload:e}},_=function(e){return{type:"CARD_FETCHED",payload:e}},g=a(35),k=(a(322),a(570)),I=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).textToTextInput=e.textToTextInput.bind(Object(g.a)(Object(g.a)(e))),e.updateName=e.updateName.bind(Object(g.a)(Object(g.a)(e))),e.displayCardModal=e.displayCardModal.bind(Object(g.a)(Object(g.a)(e))),e.state={isNameUpdating:!1},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"textToTextInput",value:function(){this.setState({isNameUpdating:!0})}},{key:"updateName",value:function(e){this.setState({isNameUpdating:!1}),this.props.updateName(this.props.card._id,e)}},{key:"displayCardModal",value:function(){console.log(this.props),this.props.history.push("/card/".concat(this.props.card._id)),this.props.displayCardModal(this.props.card._id)}},{key:"render",value:function(){var e=this;return r.a.createElement(k.a,{className:"cardOverview",onClick:this.displayCardModal},r.a.createElement("p",{onClick:this.textToTextInput},this.state.isNameUpdating?r.a.createElement("input",{type:"text",name:"name",placeholder:this.props.card.name,onKeyPress:function(t){return 13===t.charCode?e.updateName(t.target.value):null}}):this.props.card.name),r.a.createElement("span",{className:"pos",color:"textSecondary"},"adjective"))}}]),t}(n.Component),x=a(553),R=function(e){return{type:"BOARD_SUBSCRIBE",payload:e}},T=function(e){return{type:"FETCHING_BOARD",payload:e}},B=function(e){return{type:"FETCHED_BOARD",payload:e}},L=function(e){return{type:"FETCHED_BOARDS",payload:e}},M=Object(x.a)(Object(v.connect)(function(e,t){return{card:e.cardReducer.cards.find(function(e){return t.cardId===e._id})}},function(e,t){return{updateName:function(){var t=Object(E.a)(f.a.mark(function t(a,n){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.updateCardNameApi(a,n);case 3:t.next=9;break;case 5:return t.prev=5,t.t0=t.catch(0),console.log(t.t0),t.abrupt("return",e({type:"FAILED_UPDATE_CARD_NAME",payload:t.t0}));case 9:case"end":return t.stop()}},t,this,[[0,5]])}));return function(e,a){return t.apply(this,arguments)}}(),displayCardModal:function(t){e(function(e){return{type:"DISPLAY_CARD_MODAL",payload:e}}(t))}}})(I)),S=a(554),F=a(566),P=(a(384),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(k.a,{className:"myList"},r.a.createElement("h3",null,this.props.list.name),r.a.createElement(S.a,{className:"items"},r.a.createElement(F.a,null,this.props.list.cards.map(function(e){return r.a.createElement(F.a.Item,null,r.a.createElement(M,{key:e,cardId:e}))}))),r.a.createElement("input",{onKeyDown:function(t){return 13===t.keyCode?e.props.addCard(t.target.value,e.props.list._id):null}}))}}]),t}(n.Component)),H=Object(v.connect)(function(e,t){return{list:e.listReducer.lists.find(function(e){return e._id===t.listId})}},function(e,t){return{updateListName:function(){var t=Object(E.a)(f.a.mark(function t(a){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.updateListNameApi(a._id,a.name);case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),e({type:"FAILED_UPDATE_LIST_NAME",payload:t.t0});case 8:case"end":return t.stop()}},t,this,[[0,5]])}));return function(e){return t.apply(this,arguments)}}(),addCard:function(){var t=Object(E.a)(f.a.mark(function t(a,n){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.addCardApi(a,n);case 3:t.next=9;break;case 5:return t.prev=5,t.t0=t.catch(0),console.log(t.t0),t.abrupt("return",e({type:"FAILED_ADD_CARD",payload:t.t0}));case 9:case"end":return t.stop()}},t,this,[[0,5]])}));return function(e,a){return t.apply(this,arguments)}}()}})(P),U=(a(409),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(k.a,{className:"myList"},r.a.createElement("input",{placeholder:"Create a new list",onKeyDown:function(t){return 13===t.keyCode?e.props.addList(t.target.value,e.props.boardId):null}}))}}]),t}(n.Component)),W=Object(v.connect)(function(e){return console.log(e.boardReducer.currentBoard._id),{boardId:e.boardReducer.currentBoard._id}},function(e){return{addList:function(){var t=Object(E.a)(f.a.mark(function t(a,n){return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,A.addListApi(a,n);case 3:t.next=9;break;case 5:t.prev=5,t.t0=t.catch(0),console.log(t.t0),e({type:"FAILED_ADD_LIST",payload:t.t0});case 9:case"end":return t.stop()}},t,this,[[0,5]])}));return function(e,a){return t.apply(this,arguments)}}()}})(U),G=a(135),z=(a(411),a(556)),K=a(153),X=a(564),q=a(559),J=a(568),V=a(560),Y=(a(413),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("p",null,"Ajouter a la carte"),r.a.createElement(J.a.Group,{vertical:!0,size:"medium",compact:!0},r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"users"}),"Members"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"tag"}),"Labels"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"check square outline"}),"Checklist"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"calendar check"}),"Due date"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"paperclip"}),"Attachments"))),r.a.createElement(z.a,null),r.a.createElement("div",null,r.a.createElement("p",null,"Actions"),r.a.createElement(J.a.Group,{vertical:!0,size:"medium",compact:!0},r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"arrow right"}),"Move"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"copy"}),"Copy"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"eye"}),"Watch"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"archive"}),"Archive"),r.a.createElement(J.a,{icon:!0,labelPosition:"left"},r.a.createElement(K.a,{name:"share"}),"Share"))))}}]),t}(n.Component)),$=(a(418),function(e){return r.a.createElement("div",{className:e.className},r.a.createElement("p",null,"Members"),r.a.createElement(K.a,{name:"plus"}))}),Q=(a(420),function(e){return r.a.createElement("div",{className:e.className},r.a.createElement("p",null,"Labels"),r.a.createElement("div",{className:"displayRow"},e.labels.map(function(e){return r.a.createElement("p",{className:"label",style:{background:e.color}},e.name)}),r.a.createElement(K.a,{name:"plus"})))}),Z=(a(422),function(e){return r.a.createElement("div",{className:e.className},r.a.createElement("p",null,"Due date"),r.a.createElement("div",{className:"displayRow"},r.a.createElement(K.a,{name:e.isCompleted?"calendar check":"window close outline"}),r.a.createElement("p",null,e.date)))}),ee=(a(424),a(547)),te=function(e){return r.a.createElement("div",{className:e.className+" displayRow"},r.a.createElement(K.a,{name:"paperclip"}),r.a.createElement("div",null,r.a.createElement("p",null,"Attachments"),e.attachments.map(function(e){return r.a.createElement("div",{className:"attachment"},r.a.createElement("div",{className:"image"},r.a.createElement(ee.a,{src:e.url,size:"mini"})),r.a.createElement("div",null,r.a.createElement("p",null,e.name),r.a.createElement("div",{className:"displayRow"},r.a.createElement("p",null,e.dateadded),r.a.createElement(J.a,null,"Comment"),r.a.createElement(J.a,null,"Delete"))))}),r.a.createElement(J.a,null,"Add attachment")))},ae=(a(426),a(557)),ne=function(e){return r.a.createElement("div",{className:e.className},e.checklists.map(function(e){return r.a.createElement("div",{className:"checklist displayRow"},r.a.createElement(K.a,{name:"check square outline"}),r.a.createElement("div",{className:"progress"},r.a.createElement("p",{className:"title"},e.title," ",r.a.createElement(J.a,null,"Delete")),r.a.createElement(ae.a,{total:e.items.length,percent:e.items.filter(function(e){return e.isChecked}).length/e.items.length*100,indicating:!0,size:"tiny",progress:!0}),r.a.createElement("div",null,e.items.map(function(e){return r.a.createElement(X.a.Checkbox,{checked:e.isChecked,label:e.name})})),r.a.createElement(J.a,{className:"addItem"},"Add item")))}),console.log(e))},re=(a(444),function(e){return r.a.createElement("div",{className:e.className+" displayRow"},r.a.createElement(K.a,{name:"comment outline"}),r.a.createElement(X.a,{className:"form"},r.a.createElement("p",null,"Add comment"),r.a.createElement(X.a.Field,null,r.a.createElement(q.a,{rows:2,placeholder:"Write a comment..."})),r.a.createElement(J.a,{type:"submit"},"Submit")))}),ce=(a(446),function(e){return r.a.createElement("div",{className:e.className+" displayRow"},r.a.createElement(K.a,{name:"tasks"}),r.a.createElement("p",null,"Activity"))}),le=(a(448),function(e){return r.a.createElement("div",{className:e.className+" displayRow"},r.a.createElement(K.a,{name:"align left"}),r.a.createElement("div",null,r.a.createElement("p",null,"Description"),r.a.createElement("p",{onClick:e.textToTextInput},e.description)))}),se=(a(450),function(e){return r.a.createElement("div",{className:e.className+" displayRow"},r.a.createElement(K.a,{name:"file alternate outline"}),r.a.createElement("div",null,r.a.createElement("p",null,e.name),r.a.createElement("p",null,"to list ",e.list)))}),oe=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).textToTextInput=e.textToTextInput.bind(Object(g.a)(Object(g.a)(e))),e.updateName=e.updateName.bind(Object(g.a)(Object(g.a)(e))),e.state={isNameUpdating:!1,width:0,height:0},e.updateWindowDimensions=e.updateWindowDimensions.bind(Object(g.a)(Object(g.a)(e))),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.props.fetchCard(this.props.match.params.cardId),this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){console.log(window.innerWidth),this.setState({width:window.innerWidth,height:window.innerHeight})}},{key:"textToTextInput",value:function(){this.setState({isNameUpdating:!0})}},{key:"updateName",value:function(e){this.setState({isNameUpdating:!1}),this.props.updateName(this.props.card._id,e)}},{key:"render",value:function(){return null!=this.props.card.name?r.a.createElement("div",{className:"displayColumn main"},r.a.createElement(se,{name:this.props.card.name,list:this.props.card.list}),r.a.createElement(z.a,null),r.a.createElement("div",{className:this.state.width>600?"displayRow main":"main"},r.a.createElement("div",{className:"details main"},this.props.card.members&&0!==this.props.card.members.length||this.props.card&&0!==this.props.card.labels.length||this.props.card.duedate?r.a.createElement("div",null,r.a.createElement("div",{className:"inline"},r.a.createElement(K.a,{name:"tags"}),this.props.card.members&&0!==this.props.card.members.length?r.a.createElement($,{className:"membersContainer",members:this.props.card.members}):"",this.props.card.labels&&0!==this.props.card.labels.length?r.a.createElement(Q,{className:"labelsContainer",labels:this.props.card.labels}):"",this.props.card.duedate?r.a.createElement(Z,{className:"duedateContainer",date:this.props.card.duedate,isCompleted:!1}):""),r.a.createElement(z.a,null)):"",this.props.card.desc?r.a.createElement("div",null,r.a.createElement(le,{description:this.props.card.desc}),r.a.createElement(z.a,null)):r.a.createElement("div",null,r.a.createElement("div",{className:"displayRow"},r.a.createElement(K.a,{name:"align left"}),r.a.createElement(X.a,{className:"form"},r.a.createElement("p",null,"Describe me"),r.a.createElement(X.a.Field,null,r.a.createElement(q.a,{rows:2,placeholder:"Describe me..."})),r.a.createElement(J.a,{type:"submit"},"Submit"))),r.a.createElement(z.a,null)),this.props.card.attachments&&0!==this.props.card.attachments.length?r.a.createElement("div",null,r.a.createElement(te,{className:"attachmentsContainer",attachments:this.props.card.attachments}),r.a.createElement(z.a,null)):"",this.props.card.checklists&&0!==this.props.card.checklists.length?r.a.createElement("div",null,r.a.createElement(ne,{className:"checkListContainer",checklists:this.props.card.checklists}),r.a.createElement(z.a,null)):"",r.a.createElement(re,null),r.a.createElement(z.a,null),r.a.createElement(ce,null)),r.a.createElement(Y,null))):r.a.createElement(V.a,null)}}]),t}(n.Component),ie=Object(G.a)(Object(v.connect)(function(e,t){return{card:e.cardModalReducer}},function(e,t){return{fetchCard:function(){var t=Object(E.a)(f.a.mark(function t(a){var n;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.fetchCard(a);case 3:return n=t.sent,t.abrupt("return",e(_(n)));case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return",e({type:"FAILED_GET_CARD",payload:void 0}));case 10:case"end":return t.stop()}},t,this,[[0,7]])}));return function(e){return t.apply(this,arguments)}}()}})(oe)),ue=a(565),de=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillMount",value:function(){this.props.subscribe();var e=this.props.match.params.cardId;null!=e?this.props.fetchCard(e):this.props.fetchBoard(this.props.match.params.boardId),this.setState={cardId:this.props.match.params.cardId}}},{key:"render",value:function(){var e=this;return r.a.createElement(F.a,{className:"board"},this.props.board.lists.map(function(e){return r.a.createElement(F.a.Item,{className:"no-padding-top"},r.a.createElement(H,{key:e,listId:e}))}),r.a.createElement(F.a.Item,{className:"no-padding-top"},r.a.createElement(W,null)),r.a.createElement(ue.a,{open:null!=this.props.cardModal._id,onClose:function(){e.props.history.push("/boards/".concat(e.props.board._id)),e.props.closeCardModal()}},r.a.createElement(ue.a.Content,{image:!0},r.a.createElement(ie,{key:this.props.cardModal._id,cardId:this.props.cardModal._id}))))}}]),t}(n.Component),pe=a(276),me=a.n(pe)()(C.a.SOCKET);me.on("connect",function(){console.log("Connected !")}),me.on("error",function(e){console.log(e)});var he={subscribe:function(e){me.emit("subscribeToBoard")},init:function(e){me.on("action",function(t){return e.dispatch(t)})},emit:function(e,t){me.emit(e,t)}},be={fetchBoard:function(){var e=Object(E.a)(f.a.mark(function e(t){var a;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(C.a.API,"/boards/").concat(t),D);case 3:return a=e.sent,e.abrupt("return",a.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.t0;case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t){return e.apply(this,arguments)}}(),fetchBoards:function(){var e=Object(E.a)(f.a.mark(function e(){var t;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.get("".concat(C.a.API,"/boards"),D);case 3:return t=e.sent,e.abrupt("return",t.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.t0;case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},fe=Object(v.connect)(function(e){return{board:e.boardReducer.currentBoard,cardModal:e.cardModalReducer}},function(e){return{subscribe:function(){he.subscribe(),e(R())},fetchBoard:function(){var t=Object(E.a)(f.a.mark(function t(a){var n;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(T(a)),t.next=4,be.fetchBoard(a);case 4:n=t.sent,e(B(n)),t.next=11;break;case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",e({type:"FAILED_FETCH_BOARD",payload:t.t0}));case 11:case"end":return t.stop()}},t,this,[[0,8]])}));return function(e){return t.apply(this,arguments)}}(),fetchCard:function(){var t=Object(E.a)(f.a.mark(function t(a){var n,r;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(N(a)),t.next=4,w.fetchCard(a);case 4:return n=t.sent,e(_(n)),e(T(n.board)),t.next=9,be.fetchBoard(n.board);case 9:return r=t.sent,t.abrupt("return",e(B(r)));case 13:return t.prev=13,t.t0=t.catch(0),t.abrupt("return",e({type:"CARD_FAILED_FETCH",payload:t.t0}));case 16:case"end":return t.stop()}},t,this,[[0,13]])}));return function(e){return t.apply(this,arguments)}}(),closeCardModal:function(){e({type:"CLOSE_CARD_MODAL",payload:null})}}})(de),Ee=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillMount",value:function(){this.props.subscribe()}},{key:"render",value:function(){return r.a.createElement(k.a,{className:"cardOverview"},r.a.createElement(p.a,{to:"/boards/".concat(this.props.board._id)},this.props.board?this.props.board.name:""))}}]),t}(n.Component),ve=Object(v.connect)(function(e,t){return{board:e.boardReducer.boards.find(function(e){return t.boardId===e._id})}},function(e,t){return{subscribe:function(){he.subscribe(),e(R())}}})(Ee),Oe=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentWillMount",value:function(){this.props.subscribe(),this.props.fetchBoards()}},{key:"render",value:function(){return r.a.createElement(F.a,{className:"board"},this.props.boards.map(function(e){return r.a.createElement(F.a.Item,{className:"no-padding-top"},r.a.createElement(ve,{key:e,boardId:e}))}))}}]),t}(n.Component),ye=Object(v.connect)(function(e){return{boards:e.boardReducer.boards.map(function(e){return e._id})}},function(e){return{subscribe:function(){he.subscribe(),e(R())},fetchBoards:function(){var t=Object(E.a)(f.a.mark(function t(){var a;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e({type:"FETCHING_BOARDS",payload:null}),t.next=4,be.fetchBoards();case 4:a=t.sent,e(L(a)),t.next=11;break;case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",e({type:"FAILED_FETCH_BOARDS",payload:t.t0}));case 11:case"end":return t.stop()}},t,this,[[0,8]])}));return function(){return t.apply(this,arguments)}}()}})(Oe),je=(a(530),a(567)),Ce=a(569),De=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(k.a,{inverted:!0,color:"teal",className:"inline header",size:"mini"},r.a.createElement("div",{className:"inline"},r.a.createElement(J.a,{icon:"home"}),r.a.createElement(je.a,{text:"Boards",icon:"flipboard",floating:!0,labeled:!0,button:!0,className:"icon"},r.a.createElement(je.a.Menu,null,r.a.createElement(je.a.Header,{icon:"tags",content:"Boards"}),r.a.createElement(je.a.Item,null,"Important"),r.a.createElement(je.a.Item,null,"Announcement"),r.a.createElement(je.a.Item,null,"Discussion"))),r.a.createElement(Ce.a,{results:[{title:"yo",description:"mdr"}],size:"small",className:"search"})),r.a.createElement("div",null,r.a.createElement("p",{className:"appname"},"Prello")),r.a.createElement("div",{className:"inline"},r.a.createElement(je.a,{button:!0,className:"icon",floating:!0,labeled:!0,icon:"plus",options:[{key:"Arabic",text:"Arabic",value:"Arabic"}],text:"Create"},r.a.createElement(je.a.Menu,null,r.a.createElement(je.a.Header,{content:"Create"}),r.a.createElement(je.a.Divider,null),r.a.createElement(je.a.Item,null,"Create a board"),r.a.createElement(je.a.Item,null,"Create a team"))),r.a.createElement(je.a,{button:!0,className:"icon",floating:!0,labeled:!0,icon:"bell outline",options:[{key:"Arabic",text:"Arabic",value:"Arabic"}],text:"Notifications"}),r.a.createElement(je.a,{button:!0,className:"icon",floating:!0,labeled:!0,icon:"user outline",text:"User"},r.a.createElement(je.a.Menu,null,r.a.createElement(je.a.Header,{content:"name"}),r.a.createElement(je.a.Divider,null),r.a.createElement(je.a.Item,null,"Profile"),r.a.createElement(je.a.Item,null,"Cards"),r.a.createElement(je.a.Item,null,"Settings"),r.a.createElement(je.a.Divider,null),r.a.createElement(je.a.Item,null,"Change language"),r.a.createElement(je.a.Item,null,"Log out")))))}}]),t}(n.Component),Ae=a(78),we=a(36),Ne=Object(we.a)(),_e=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(Ae.ConnectedRouter,{history:Ne},r.a.createElement("div",{className:"App"},r.a.createElement(De,{className:"header"}),r.a.createElement(p.a,{to:"/login"},"Home")," ",r.a.createElement(p.a,{to:"/"},"About")," ",r.a.createElement(p.a,{to:"/contact"},"Contact")," ",r.a.createElement(p.a,{to:"/boards"},"Boards"),r.a.createElement(m.a,null,r.a.createElement(h.a,{exact:!0,path:"/login"}),r.a.createElement(h.a,{exact:!0,path:"/boards",component:ye}),r.a.createElement(h.a,{exact:!0,path:"/boards/:boardId",component:fe}),r.a.createElement(h.a,{exact:!0,path:"/card/:cardId",component:fe}),r.a.createElement(h.a,{path:""},r.a.createElement("div",null,r.a.createElement("p",{className:"App-intro"},"Salut"))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ge=a(47),ke=a(167),Ie=a(58),xe=a(16),Re={cards:[]},Te={fetching:!1,currentBoard:{_id:"",name:"",lists:[]},boards:[{_id:"board1",name:"tata"},{_id:"board2",name:"toto"}]},Be={lists:[]},Le={_id:null},Me=Object(ge.c)({cardReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCHED_BOARD":var a=t.payload;return Object(xe.a)({},e,{cards:a.lists.flatMap(function(e){return e.cards})});case"CARD_FETCHED":return Object(xe.a)({},e,{card:t.payload.payload,error:null});case"FAILED_GET_CARD":return Object(xe.a)({},e,{error:t.payload});case"ADD_CARD":var n=t.payload;return Object(xe.a)({},e,{cards:Object(Ie.a)(e.cards).concat([n])});case"UPDATE_CARD_NAME":return Object(xe.a)({},e,{cards:e.cards.map(function(e){return e._id===t.payload._id?t.payload:e})});default:return e}},boardReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCHED_BOARD":var a=t.payload;return Object(xe.a)({},e,{currentBoard:Object(xe.a)({},a,{lists:a.lists.map(function(e){return e._id})})});case"FETCHING_BOARD":return Object(xe.a)({},e,{fetching:!0});case"FETCHED_BOARDS":return Object(xe.a)({},e,{boards:Object(Ie.a)(t.payload)});case"FETCHING_BOARDS":return Object(xe.a)({},e,{fetching:!0});case"BOARD_SUBSCRIBE":return Object(xe.a)({},e);case"GET_BOARD":return Object(xe.a)({},e,{currentBoard:t.payload,error:null});case"FAILED_FETCH_BOARD":case"FAILED_FETCH_BOARDS":return Object(xe.a)({},e,{error:t.payload});case"ADD_LIST":var n=t.payload;return Object(xe.a)({},e,{currentBoard:Object(xe.a)({},e,{lists:Object(Ie.a)(e.currentBoard.lists).concat([n._id])})});case"FAILED_UPDATE_LIST_NAME":return Object(xe.a)({},e,{error:t.payload});default:return e}},listReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCHED_BOARD":var a=t.payload.lists.map(function(e){return Object(xe.a)({},e,{cards:e.cards.map(function(e){return e._id})})});return Object(xe.a)({},e,{lists:a});case"ADD_CARD":var n=t.payload;return Object(xe.a)({},e,{lists:e.lists.map(function(e){return n.list===e._id?Object(xe.a)({},e,{cards:Object(Ie.a)(e.cards).concat([n._id])}):e})});case"ADD_LIST":var r=t.payload;return Object(xe.a)({},e,{lists:Object(Ie.a)(e.lists).concat([Object(xe.a)({},r,{cards:[]})])});default:return Object(xe.a)({},e)}},cardModalReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DISPLAY_CARD_MODAL":return Object(xe.a)({},e,{_id:t.payload});case"CARD_FETCHED":return console.log("mdr"),Object(xe.a)({},e,t.payload);case"CLOSE_CARD_MODAL":return Object(xe.a)({},Le);default:return e}}});a(541),a(544);l.a.render(r.a.createElement(v.Provider,{store:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=Object(ge.e)(Object(Ae.connectRouter)(Ne)(Me),window.__REDUX_DEVTOOLS_EXTENSION__?Object(ge.d)(Object(ge.a)(Object(Ae.routerMiddleware)(Ne),ke.a),window.__REDUX_DEVTOOLS_EXTENSION__()):Object(ge.d)(Object(ge.a)(Object(Ae.routerMiddleware)(Ne),ke.a)));return he.init(e),e}()},r.a.createElement(_e,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[289,2,1]]]);
//# sourceMappingURL=main.f6bdcbb6.chunk.js.map