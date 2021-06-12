if(IsPC()){
function dyrightshowmini(e){
//获取鼠标点击时的坐标（右键是3  左键是1  鼠标滚轮是2）
var key = e.which;
//判断
if(key == 3){
	var x = e.clientX;
	var y = e.clientY;
	//console.log("显示坐标:&nbsp;X = "+ x +",Y = "+y);
	$(".dyminimenu").show().css({left:x,top:y});
}
}

var dymininotemodelocalval = localStorage.getItem("dymininotemodelocalval");
if (dymininotemodelocalval!=null){
    var dymininotemode=dymininotemodelocalval;
}else{
    var dymininotemode="absolute"; //默认值，mini note的布局
}
document.getElementsByClassName("dyminibox")[0].style.position=dymininotemode;

function mini_note_wrapper(){
document.getElementsByClassName("dyminibox")[0].style.display="";

$(function(){
// 页面加载时运行  保存到本地

var wll_mask = localStorage.getItem(wll_mask_currpage_name);
if(wll_mask){
	$(".dyminibox").html(wll_mask);
	if (autosave_timer==null) { //执行auto_timer前需要加以判断以确保一个页面有且只有一个计时器
		auto_timer();
	}
} else {
	$(".dyminibox").html("");
}


//屏蔽浏览器的右键属性
document.oncontextmenu = function(){return false;}

//点击鼠标右键  显示右键菜单
document.addEventListener("mousedown", dyrightshowmini, false);
//点击完成后  隐藏右键  
$(document).click(function(){
	$(".dyminimenu").hide();
});

});


//右键菜单中的属性  功能实现
wll_menu = function (flag){
	//按照菜单的顺序实现
	//1 添加mini标签
	if(flag == 1){
		var w = Math.floor(Math.random()*30);
		var wll = new Array("pulse","bounce","tada","swing","wobble",
							"flip","flipInX","bounceIn","bounceInUp","bounceInDown",
							"fadeIn","fadeInUp","fadeInDown","fadeInLeft","fadeInRight",
							"fadeInUpBig","fadeInDownBig","fadeInLeftBig","fadeInRightBig","rotateIn",
							"rotateInUpLeft","rotateInDownLeft","rotateInUpRight","rotateInDownRight","swing",
							"rollIn","bounce","tada","swing","wobble");
		//获取当前鼠标右键的坐标位置
		var left = $(".dyminimenu").offset().left;
        if(dymininotemode=="absolute"){
            var docbodywidth = document.body.clientWidth;
            if ((left+294)>docbodywidth){
                left=docbodywidth-294;
            }
        }else if(dymininotemode=='fixed'){
            left = left - $(window).scrollLeft();
            var browserwidth=$(window).width();
            if ((left+294)>browserwidth){
                left=browserwidth-294;
            }
        }
		var top = $(".dyminimenu").offset().top;
        if(dymininotemode=="absolute"){
            var docbodyheight = document.body.clientHeight;
            if ((top+310)>docbodyheight){
                top=docbodyheight-310;
            }
        }else if(dymininotemode=='fixed'){
            top = top - $(window).scrollTop(); //https://www.cnblogs.com/wxcbg/p/10531479.html
            var browserheight=$(window).height();
            if ((top+310)>browserheight){
                top=browserheight-310;
            }
        }
		//console.log(left+', '+top);
		//随机数 1--3
		var random = Math.floor(Math.random()*3)+1;
		//显示mini标签
		$(".dyminibox").append("<div class='b_list animated "+wll[w]+"' style='left:"+left+"px;top:"+top+"px;'><img src='/img/"+random+".png' alt='便签' width='294' height='310'>"+"<div class='b_content' contenteditable='true'></div>"+"<p class='mini_note_timer'><span>3</span>秒后自动保存</p>"+"</div>");
		//自动保存
		if (autosave_timer==null){
			auto_timer();
		}
	}
	//2 清空页面
	if(flag == 2){
		$(".b_list").removeClass("animated rollIn").addClass("animated bounceOutRight").fadeOut(1000);
		localStorage.removeItem(wll_mask_currpage_name);
		$(".dyminibox").html(""); //可以注释该行，意味着即使你右键清除页面，但是历史便签上的数据仍会被保存(F12即可查看)，只不过隐藏不显示而已，这可以防止你误删某些重要的便签信息
		if (autosave_timer!=null) {
			clearInterval(autosave_timer);
			autosave_timer = null;
		}
	}
}


//3秒之后保存到本地
function auto_timer(){
	var count = 3;
	autosave_timer = setInterval(function(){
		if(count <= 0){
			//保存到本地
			count = 3;
			localStorage.setItem(wll_mask_currpage_name,$(".dyminibox").html());
		}
		$(".mini_note_timer").find("span").text(count);
		count--;
		//console.log("便签自动保存计时器");
	},1000);
}
}

var dyifexecmininotelocalval = localStorage.getItem("dyifexecmininotelocalval");
if (dyifexecmininotelocalval!=null){
    var dyifexecmininote = Boolean(parseInt(dyifexecmininotelocalval));
}else{
    var dyifexecmininote = 0; //默认值，是否应用mini标签，可以在控制台执行start_mini_note()应用，或者执行close_mini_note()关闭
}

function exec_mini_note_wrapper(){
if (typeof(btf)!="undefined"){
	btf.isJqueryLoad(mini_note_wrapper);
} else {
	if(window.attachEvent){
		window.attachEvent("onload",function() {
			btf.isJqueryLoad(mini_note_wrapper);
		});
	}else{
		window.addEventListener("load",function() {
			btf.isJqueryLoad(mini_note_wrapper);
		},true);
	}
}
}

function start_mini_note(){
    dyifexecmininote=1;
    localStorage.setItem("dyifexecmininotelocalval",dyifexecmininote);
    exec_mini_note_wrapper();
    console.log("Mini Note功能已打开");
}
function close_mini_note(){
    dyifexecmininote=0;
    localStorage.setItem("dyifexecmininotelocalval",dyifexecmininote);
    document.getElementsByClassName("dyminibox")[0].style.display="none";
    if (typeof(autosave_timer)=="undefined") {
	var autosave_timer = null;
    } else if (autosave_timer==null) {
	
    } else {
        clearInterval(autosave_timer);
        autosave_timer = null;
    }
    if (wll_menu!=null){
        wll_menu=null;
    }
    document.removeEventListener("mousedown", dyrightshowmini, false);
    window.document.oncontextmenu = function(){ return true;}
    console.log("Mini Note功能已关闭");
}

function get_mini_note_status(){
    console.log("欢迎使用（电脑端·体验版）Mini Note，其有两种布局模式，各有千秋（即各有各的缺点，主要是absolute布局下，当页面内有很多打开的折叠部件时，折叠后会导致Mini Note拉伸页面可见区域，很难看，所以又增加了fixed布局）！");
    if (dyifexecmininote){
        console.log("Mini Note功能已打开，你可以执行close_mini_note()关闭（不会清空数据）");
    }else{
        console.log("Mini Note功能已关闭，你可以执行start_mini_note()打开");
    }
    console.log("当前为"+dymininotemode+"布局，你可以执行change_mini_note_mode()切换布局，但是千万注意，在Mini Note功能已打开的情况下，一旦切换，本页面数据将立即被清空！其他页面数据虽然还在，但是由于布局改变，Mini Note可能无法正常显示，因此你可能还需要手动清空其他页面或者恢复旧的布局！");
}

function change_mini_note_mode(){
    if (dymininotemode=="absolute"){
        console.log(dymininotemode+"->"+"fixed");
        dymininotemode="fixed";
    }else if (dymininotemode=="fixed"){
        console.log(dymininotemode+"->"+"absolute");
        dymininotemode="absolute";
    }
    document.getElementsByClassName("dyminibox")[0].style.position=dymininotemode;
    localStorage.setItem("dymininotemodelocalval",dymininotemode);
    if (wll_menu!=null){
        console.log('注意本页面Mini Note（本地）数据已被清空！');
        wll_menu(2);
    }
}
}