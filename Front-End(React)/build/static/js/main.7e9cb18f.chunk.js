(this["webpackJsonpvideostream-store-react-app"]=this["webpackJsonpvideostream-store-react-app"]||[]).push([[0],{110:function(e,t,a){e.exports={mainArea:"Home_mainArea__M7gaW"}},135:function(e,t,a){e.exports=a(204)},140:function(e,t,a){},141:function(e,t,a){},199:function(e,t,a){},200:function(e,t,a){},204:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),i=(a(140),a(119)),l=(a(141),a(60)),u=a(15),s=a(110),m=a.n(s),d=a(25),p=a(14),b=Object(n.createContext)(),f={isAuthenticated:!1,username:null,password:null},g=function(e,t){switch(t.type){case"login":return Object(p.a)(Object(p.a)({},e),{},{isAuthenticated:!0,username:t.payload.username,password:t.payload.password});case"logout":return Object(p.a)(Object(p.a)({},e),{},{isAuthenticated:!1,username:null,password:null});default:return e}},v=function(e){var t=e.children,a=Object(n.useReducer)(g,f),c=Object(d.a)(a,2),o=c[0],i=c[1];return r.a.createElement(b.Provider,{value:{authState:o,authDispatch:i}},t)},h=a(241),E=a(243),O=a(244),j=a(40),y=a(246),C=a(274),w=a(248),P=a(249),N=a(250),k=a(251),S=a(253),x=a(245),I=a(247),M=a(252),_=a(239),F=Object(_.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function A(){var e=F(),t=Object(u.g)();function a(e){t.push(e)}var c=Object(n.useContext)(b).authState,o=Object(n.useState)(!1),i=Object(d.a)(o,2),l=i[0],s=i[1];function m(){s(!1)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{position:"static"},r.a.createElement(E.a,null,r.a.createElement(O.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"open drawer",onClick:function(){s(!0)}},r.a.createElement(x.a,null)),r.a.createElement(j.a,{variant:"h6",className:e.title},"Logo"),c.isAuthenticated?r.a.createElement(y.a,{color:"inherit"},c.username):r.a.createElement(y.a,{color:"inherit",onClick:function(){return a("/login")}},"Login"))),r.a.createElement(C.a,{className:e.drawer,anchor:"left",open:l,onClose:m},r.a.createElement("div",null,r.a.createElement(O.a,{onClick:m},r.a.createElement(I.a,null))),r.a.createElement(w.a,null),r.a.createElement(P.a,null,r.a.createElement(N.a,{button:!0,onClick:function(){return a("/price-modifier")}},r.a.createElement(k.a,null,r.a.createElement(M.a,null)),r.a.createElement(S.a,{primary:"Modificador de precio"})),r.a.createElement(N.a,{button:!0,onClick:function(){return a("/edit-products")}},r.a.createElement(k.a,null,r.a.createElement(M.a,null)),r.a.createElement(S.a,{primary:"Editar productos"})))))}function D(){return r.a.createElement("div",{className:"Home"},r.a.createElement(A,null),r.a.createElement("main",{className:m.a.mainArea},r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis molestie nibh, sit amet auctor quam euismod vel. Nullam nulla erat, ultricies volutpat nisi quis, viverra tempus odio. Aenean in diam nec ante ultrices pellentesque. Nulla sollicitudin tortor dolor, nec consequat sapien congue vitae. In ac mauris imperdiet, dignissim dolor in, commodo lacus. Donec fermentum dapibus tincidunt. Donec eros augue, porttitor sagittis vestibulum vel, eleifend a orci. Curabitur pretium non mi nec fermentum. Vivamus auctor, felis sed mattis tincidunt, ipsum tellus ullamcorper ligula, sed rutrum quam orci sed mi. Nulla tincidunt congue varius.")))}var B=a(42),W=a(52),T=a.n(W),q=a(206),z=a(254),R=a(255),H=a(256),U=a(257),V=a(258),L=a(270),G=a(260),J=a(261),Y=a(262),K=a(263),$=a(273),Q=a(264),X=a(272),Z=Object(_.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:e.palette.primary.main}}}));function ee(){var e=Object(n.useContext)(b).authState,t=Z(),a=Object(n.useRef)(null),c=Object(n.useRef)(null);Object(n.useEffect)((function(){navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then((function(e){a.current.srcObject=e,a.current.play()})).catch((function(e){console.log("".concat(e.name,": ").concat(e.message))}))}),[]);var o=Object(n.useState)(!1),i=Object(d.a)(o,2),l=i[0],u=i[1];function s(){u(!1),w(!1)}var m=Object(n.useState)({name:"",markerId:0,newPrice:0,currentPrice:0}),f=Object(d.a)(m,2),g=f[0],v=f[1],h=Object(n.useState)(!1),E=Object(d.a)(h,2),C=E[0],w=E[1],P=Object(n.useState)({isOpen:!1,severity:"info",message:""}),N=Object(d.a)(P,2),k=N[0],S=N[1];function x(e,t){S({isOpen:!0,message:e,severity:t})}var I=function(){return S({isOpen:!1,message:"",severity:"info"})};function M(t){w(!0);var a=new FormData;a.append("image",t,"capture_".concat(Date.now(),".png"));var n="Basic ".concat(btoa("".concat(e.username,":").concat(e.password)));fetch("/api/recognition/povill",{method:"POST",headers:{authorization:n},body:a}).then((function(e){return e.json()})).then((function(e){e.error?x(e.error.message,"error"):(v(Object(p.a)(Object(p.a)({},g),{},{markerId:e.markerId,name:e.name,newPrice:e.recognizedPrice,currentPrice:e.price})),u(!0))})).catch((function(e){console.log("err",e)})).finally((function(){w(!1)}))}Object(n.useEffect)((function(){C?a.current.pause():a.current.play()}),[C]);var _=Object(n.useState)({isSubmitting:!1,errorMessage:""}),F=Object(d.a)(_,2),A=F[0],D=F[1];function W(e){v(Object(p.a)(Object(p.a)({},g),{},Object(B.a)({},e.target.name,e.target.value)))}return r.a.createElement("div",{className:T.a.root},r.a.createElement("video",{className:T.a.liveVideo,ref:a,onCanPlay:function(){a.current.width=a.current.videoWidth,a.current.height=a.current.videoHeight,c.current.width=a.current.videoWidth,c.current.height=a.current.videoHeight},autoPlay:!0,playsInline:!0,muted:!0}),r.a.createElement("canvas",{className:T.a.drawingCanvas,ref:c}),r.a.createElement("div",{className:T.a.mainButtonContainer},r.a.createElement(y.a,{onClick:function(){c.current.getContext("2d").drawImage(a.current,0,0,c.current.width,c.current.height),c.current.toBlob(M,"image/png")},disabled:C,variant:"contained",color:"primary"},"Capturar")),r.a.createElement(q.a,{open:C,className:t.backdrop},r.a.createElement(z.a,{color:"inherit"})),r.a.createElement(R.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,open:l,onClose:s,"aria-labelledby":"form-dialog-title"},r.a.createElement(H.a,{id:"form-dialog-title"},"Producto escaneado"),r.a.createElement(U.a,null,r.a.createElement(V.a,null,"Verifica los datos del producto escaneado."),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"markerId",name:"markerId",label:"Marcador",type:"number",inputProps:{min:"0",step:"1"},fullWidth:!0,value:g.markerId,onChange:W}),r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"name",name:"name",label:"Nombre",type:"text",fullWidth:!0,value:g.name,onChange:W}),r.a.createElement(G.a,{container:!0,spacing:2},r.a.createElement(G.a,{item:!0,xs:12,sm:6},r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"newPrice",name:"newPrice",label:"Precio nuevo",type:"number",fullWidth:!0,value:g.newPrice,onChange:W,InputProps:{endAdornment:r.a.createElement(J.a,{position:"end"},"\u20ac")},inputProps:{min:"0",step:"0.01"}})),r.a.createElement(G.a,{item:!0,xs:12,sm:6},r.a.createElement(L.a,{autoFocus:!0,margin:"dense",id:"currentPrice",label:"Precio actual",type:"number",fullWidth:!0,value:g.currentPrice,disabled:!0,InputProps:{endAdornment:r.a.createElement(J.a,{position:"end"},"\u20ac")}}))),r.a.createElement("div",{className:T.a.productFormBottomInfo},A.errorMessage?r.a.createElement(j.a,{color:"error",variant:"body1",component:"p"},A.errorMessage):null,A.isSubmitting?r.a.createElement(Y.a,null):null)),r.a.createElement(K.a,null,r.a.createElement(y.a,{onClick:s,color:"default",variant:"contained",disabled:A.isSubmitting},"Cancelar"),r.a.createElement(y.a,{onClick:function(t){t.preventDefault(),D(Object(p.a)(Object(p.a)({},A),{},{isSubmitting:!0}));var a={name:g.name,price:parseFloat(g.newPrice)},n="Basic ".concat(btoa("".concat(e.username,":").concat(e.password)));fetch("/api/products/povill/".concat(g.markerId),{method:"PUT",headers:{"content-type":"application/json",authorization:n},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){e.error?D(Object(p.a)(Object(p.a)({},A),{},{isSubmitting:!1,errorMessage:e.error.message})):(D(Object(p.a)(Object(p.a)({},A),{},{isSubmitting:!1,errorMessage:""})),u(!1),x("Producto modificado correctamente","success"))})).catch((function(e){console.log("err",e)}))},color:"primary",variant:"contained",disabled:A.isSubmitting},"Enviar"))),r.a.createElement($.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:k.isOpen,autoHideDuration:6e3,onClose:I,action:r.a.createElement(O.a,{size:"small","aria-label":"close",color:"inherit",onClick:I},r.a.createElement(Q.a,{fontSize:"small"}))},r.a.createElement(X.a,{variant:"filled",severity:k.severity},k.message)))}var te=a(45),ae=a(46),ne=a(48),re=a(47),ce=a(114),oe=a.n(ce),ie=a(115),le=a.n(ie),ue=a(116),se=a.n(ue);a(199);function me(e,t){return function(a,n,r){return e||""!==a?!t||!isNaN(a)||{valid:!1,message:"Tiene que ser un n\xfamero"}:{valid:!1,message:"No puedes dejarlo vac\xedo"}}}var de=[{dataField:"id",text:"#"},{dataField:"markerId",text:"Marcador",validator:me(!1,!0)},{dataField:"name",text:"Nombre",validator:me(!1,!1)},{dataField:"price",text:"Precio(\u20ac)",validator:me(!1,!0)},{dataField:"storeId",text:"Tienda",validator:me(!1,!1)}],pe=function(e){Object(ne.a)(a,e);var t=Object(re.a)(a);function a(){var e;return Object(te.a)(this,a),(e=t.call(this)).cellEdit=le()({mode:"click",blurToSave:!0,afterSaveCell:function(t,a,n,r){e.props.updateProduct(n)}}),e}return Object(ae.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ProductsTableComponent"},r.a.createElement("h4",null,"Lista de productos"),r.a.createElement(oe.a,{cellEdit:this.cellEdit,keyField:"id",data:this.props.products,columns:de,bordered:!1,pagination:se()()}))}}]),a}(n.Component),be=(a(200),function(e){Object(ne.a)(a,e);var t=Object(re.a)(a);function a(){var e;return Object(te.a)(this,a),(e=t.call(this)).onSubmit=function(t){t.preventDefault(),e.props.addNewProduct(t.target[0].value,t.target[1].value,t.target[2].value,t.target[3].value)},e}return Object(ae.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"AddNewProductComponent"},r.a.createElement("h4",null,"Agregar un nuevo producto"),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"text",id:"marcador",name:"marcador",onChange:this.onChange,class:"form-control",placeholder:"Marcador"})),r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"text",id:"nombre",name:"nombre",onChange:this.onChange,class:"form-control",placeholder:"Nombre"})),r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"text",id:"precio",name:"precio",onChange:this.onChange,class:"form-control",placeholder:"Precio"})),r.a.createElement("div",{class:"form-group"},r.a.createElement("input",{type:"text",id:"tienda",name:"tienda",onChange:this.onChange,class:"form-control",placeholder:"Tienda"})),r.a.createElement("button",{type:"submit",class:"btn btn-primary"},"Agregar")))}}]),a}(n.Component)),fe=function(e){Object(ne.a)(a,e);var t=Object(re.a)(a);function a(){var e;return Object(te.a)(this,a),(e=t.call(this)).state={products:[],autoUpdate:!0},e.addNewProduct=function(t,a,n,r){var c={id:e.state.products.length+1,markerId:t,name:a,price:n,storeId:r};e.state.products.push(c),e.setState({autoUpdate:!0})},e}return Object(ae.a)(a,[{key:"componentDidMount",value:function(){}},{key:"updateProduct",value:function(e){}},{key:"render",value:function(){return r.a.createElement("div",{className:"EditProducts"},r.a.createElement(A,null),r.a.createElement(pe,{products:this.state.products,updateProduct:this.updateProduct}),r.a.createElement(be,{addNewProduct:this.addNewProduct}))}}]),a}(n.Component),ge=a(276),ve=a(266),he=a(271),Ee=a(117),Oe=a.n(Ee),je=a(265),ye=Object(_.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}}));function Ce(){var e=ye(),t=Object(u.g)(),a=Object(u.h)(),c=Object(n.useContext)(b).authDispatch,o=(a.state||{from:{pathname:"/"}}).from,i=Object(n.useState)({username:"",password:"",isSubmitting:!1,errorMessage:null}),l=Object(d.a)(i,2),s=l[0],m=l[1];function f(e){m(Object(p.a)(Object(p.a)({},s),{},Object(B.a)({},e.target.name,e.target.value)))}return r.a.createElement(je.a,{component:"main",maxWidth:"xs"},r.a.createElement(ve.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(ge.a,{className:e.avatar},r.a.createElement(Oe.a,null)),r.a.createElement(j.a,{component:"h1",variant:"h5"},"Iniciar sesi\xf3n"),r.a.createElement("form",{className:e.form,onSubmit:function(e){e.preventDefault(),m(Object(p.a)(Object(p.a)({},s),{},{isSubmitting:!0})),setTimeout((function(){c({type:"login",payload:{username:s.username,password:s.password}}),m(Object(p.a)(Object(p.a)({},s),{},{isSubmitting:!1})),t.replace(o)}),1e3)}},r.a.createElement(L.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Nombre",name:"username",autoFocus:!0,value:s.username,onChange:f}),r.a.createElement(L.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Contrase\xf1a",type:"password",id:"password",value:s.password,onChange:f}),r.a.createElement(y.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,disabled:s.isSubmitting},"Entrar"),s.errorMessage&&r.a.createElement("span",null,s.errorMessage))),r.a.createElement(he.a,{mt:8},r.a.createElement(j.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 Ugiat ",(new Date).getFullYear())))}function we(){var e=Object(u.g)();return r.a.createElement("div",{style:{padding:"3rem"}},"Route: ",r.a.createElement("span",{style:{color:"#33a"}},e.location.pathname)," does not exist.")}var Pe=a(269),Ne=a(118),ke=a(267),Se=a(268),xe=Object(Ne.a)({palette:{primary:{main:ke.a[700]},secondary:{main:Se.a[900]}}});function Ie(e){var t=e.children,a=Object(i.a)(e,["children"]),c=Object(n.useContext)(b).authState;return r.a.createElement(u.b,Object.assign({},a,{render:function(e){var a=e.location;return c.isAuthenticated?t:r.a.createElement(u.a,{to:{pathname:"/login",state:{from:a}}})}}))}var Me=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Pe.a,{theme:xe},r.a.createElement(v,null,r.a.createElement(l.a,null,r.a.createElement(u.d,null,r.a.createElement(Ie,{exact:!0,path:"/"},r.a.createElement(D,null)),r.a.createElement(u.b,{path:"/login"},r.a.createElement(Ce,null)),r.a.createElement(Ie,{path:"/price-modifier"},r.a.createElement(ee,null)),r.a.createElement(Ie,{path:"/edit-products"},r.a.createElement(fe,null)),r.a.createElement(u.b,null,r.a.createElement(we,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(203);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Me,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},52:function(e,t,a){e.exports={root:"PriceModifier_root__3-bjR",liveVideo:"PriceModifier_liveVideo__snPRn",drawingCanvas:"PriceModifier_drawingCanvas__GYOce",mainButtonContainer:"PriceModifier_mainButtonContainer__1dp5S",productFormBottomInfo:"PriceModifier_productFormBottomInfo__svkmR"}}},[[135,1,2]]]);
//# sourceMappingURL=main.7e9cb18f.chunk.js.map