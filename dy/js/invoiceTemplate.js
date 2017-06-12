var broad=document.querySelector(".broad");
var tall=document.querySelector(".tall");
var contentBox=document.querySelector(".content-box");
var button=document.querySelector(".button");

/*获取类名*/
function AddClass(varclass){
	return document.querySelector("."+varclass);
}

/*设置面板的宽高属性*/
broad.onblur=function(){
	if (isNaN(broad.value)) {
		broad.value="";
		return alert("请输入正确的字符")
	}else{
		var broadV = broad.value;
		contentBox.style.width=broadV+"mm";
	}
}
tall.onblur=function(){
	if (isNaN(tall.value)) {
		tall.value="";
		return alert("请输入正确的字符")
	}else{
		var tallV = tall.value;
		contentBox.style.height=tallV+"mm";
	}
}

/*创建模块
*element   		添加元素  
*IDname  		给他创建一个id  
*content  		给他里边放的内容 
*module_width    设定默认宽
*module_height	设定默认高
*/
function model_add(element,IDname,content,module_width,module_height){
	/* 按下联系人执行以下函数*/
	element.onmousedown=function(){
		var module=document.createElement("div"); /* 创建一个文本框元素，起名叫module*/
		module.id=IDname; /*定义一个module的id */
		module.style.cssText="width: "+module_width+"px;height: "+module_height+"px;position: absolute;";
		module.draggable=true; /*定一个拖动的属性*/
		/* 创建一个document的拖动事件*/
		document.onmousemove=function(e){
			/* 清除浏览器默认样式*/
			e.preventDefault();
			/* 创建一个document的鼠标抬起事件*/
			document.onmouseup=function(e){
				var en=e|| window.event;
				var cw=en.clientX-contentBox.offsetLeft;  /* cw是现在鼠标距离父元素左边的位置*/
				var ch=en.clientY-contentBox.offsetTop; /* ch是现在鼠标距离父元素上边的位置*/
				contentBox.appendChild(module); /* 把module这个元素插入到contentBox这个大盒子里边*/
				var textarea=document.createElement("textarea"); /*里边放入一个文本框*/
				textarea.value=content;
				textarea.style.cssText="width: 100%;height: 100%;background:rgba(100,100,255,.2);";
				module.appendChild(textarea);
				if (0>=cw) {
					module.style.left=0+"px";
					module.style.top=0+"px";
				}else if(contentBox.offsetWidth<=cw+module.offsetWidth){
					module.style.left=0+"px";
					module.style.top=0+"px";
				}else if(contentBox.offsetHeight<=ch+module.offsetHeight){
					module.style.left=0+"px";
					module.style.top=0+"px";
				}else if(0>=ch){
					module.style.left=0+"px";
					module.style.top=0+"px";
				}else{
					module.style.left=cw+"px";
					module.style.top=ch+"px";
				}
				/* 定一个这个元素的位置为cw,ch*/
				
				/*新创建的元素为了使它也可以移动，所以我们又创建了一个鼠标按下事件*/
				model_del(module)
				module.onmousedown=function(e){
					var en=e|| windwo.event;
					var ow=en.offsetX; /*ow是现在鼠标按下的点距离这个元素左边的距离*/
					var oh=en.offsetY; /*oh是现在鼠标按下的点距离这个元素上边的距离*/
					var ConOW=textarea.offsetWidth; /* ConOW获取的是module的宽度*/
					var ConOH=textarea.offsetHeight; /* ConOH获取的是module的高度*/
					var conOW=contentBox.offsetWidth-ConOW; /* conOW获取的是contentBox最右边距离浏览器的距离*/
					var conOH=contentBox.offsetHeight-ConOH; /* conOH获取的是contentBox最下边距离浏览器的距离*/
					/*试用keyCode*/
					module.onkeydown=function(e){
						var en=e|| window.event|| arguments.callee.caller.arguments[0];
						var moveLeft=module.offsetLeft;
						var moveTop=module.offsetTop;
						if (en.keyCode==37) {//向左
							if (moveLeft<=5) {
								module.style.left=2+"px";
							}else{
								module.style.left=moveLeft-5+"px";
							}
						};
						if (en.keyCode==38) { //向上
							if (moveTop<=5) {
								module.style.top=2+"px";
							}else{
								module.style.top=moveTop-5+"px";
							}
						};
						if (en.keyCode==39) {//向右
							if (moveLeft>=conOW-5) {
								module.style.left=conOW-2+"px";
							}else{
								module.style.left=moveLeft+5+"px";
							}
						};
						if (en.keyCode==40) {//向下
							if (moveTop>=conOH-5) {
								module.style.top=conOH-2+"px";
							}else{
								module.style.top=moveTop+5+"px";
							}
						};
						document.onmousemove=null;
						document.onmouseup=null;
					}
					document.onmousemove=function(e){
						var en=e|| window.event;
						en.preventDefault();
						document.onmouseup=function(){
							/* ---------------------------------------------------------------------------------------*/
							var conOL=contentBox.offsetLeft; /* conOl获取的是contentBox的left值*/
							var conOT=contentBox.offsetTop; /* conOT获取的是contentBox的top值*/
							var cw=en.clientX-conOL;  /* cw是现在鼠标距离父元素左边的位置*/
							var ch=en.clientY-conOT; /* ch是现在鼠标距离父元素上边的位置*/
							var xw=cw-ow; /* 为了可以在元素的中心拖动，xw获取到的是最佳的left值*/
							var xh=ch-oh; /* 为了可以在元素的中心拖动，xh获取到的是最佳的top值*/
							if (xw<=0) {	/*处理左上角和左下角的bug*/
								if (xh<=0) {
									module.style.left=2+"px";
									module.style.top=2+"px";
								}else if(xh>=conOH){
									module.style.left=2+"px";
									module.style.top=conOH-2+"px";
								}else{
									module.style.left=2+"px";
									module.style.top=xh+"px";
								} /* 小于contentBox的最左边执行*/
							}else if (xw>=conOW) { /*处理右上角和右下角的bug*/
								if (xh<=0) {
									module.style.left=conOW-2+"px";
									module.style.top=2+"px";
								}else if(xh>=conOH){
									module.style.left=conOW-2+"px";
									module.style.top=conOH-2+"px";
								}else{
									module.style.left=conOW-2+"px";
									module.style.top=xh+"px";
								}/* 小于contentBox的最右边执行*/
							}else if (xh<=0) { /* 小于contentBox的最上边执行*/
								module.style.left=xw+"px";
								module.style.top=2+"px";
							}else if(xh>=conOH){ /* 小于contentBox的最下边执行*/
								module.style.left=xw+"px";
								module.style.top=conOH-2+"px";
							}else{
								module.style.left=xw+"px";
								module.style.top=xh+"px";
							}
							/* ---------------------------------------------------------------------------------------*/
							document.onmousemove=null;
							document.onmouseup=null;
						}
					}
				}
				document.onmousemove=null;
				document.onmouseup=null;
			}
		}
	}
}

/*删除模块*/
function model_del(module){
	var del_Btn=document.createElement("div");
	del_Btn.id="del_Btn";
	del_Btn.innerHTML="x";
	del_Btn.style.cssText="left:-20px;top:0px;cursor:pointer;";
	module.appendChild(del_Btn);
	del_Btn.onclick=function(){
		contentBox.removeChild(module);
	}
}

/*更改字体样式*/
function font_style(element,inputValue){
	console.log(element)
	console.log(inputValue)
	// element.style.fontFamily=inputValue;
}
/*更改字体大小*/
function font_size(){

}
/*更改内容对齐方式*/
function text_align(){

}
/*更改字体样式*/

















/*联系人*/
var leftBox_li=document.querySelectorAll('.left-box>li');
for (var i = leftBox_li.length - 1; i >= 0; i--) {
	model_add(AddClass(leftBox_li[i].className),leftBox_li[i].className,leftBox_li[i].innerHTML,100,20);
};