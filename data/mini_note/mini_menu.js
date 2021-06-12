if(IsPC()){
//将页面的url作为键，以在本地存放当前页面的便签数据
var wll_mask_currpage_name = window.location.href;
console.log('wll_mask_currpage_name(当前页面路径/便签保存的键名): '+wll_mask_currpage_name);

// 该脚本启用了daya-pjax，每次通过pjax打开新页面仍会执行本脚本，如果上页的计时器存在则清除并初始化为null
if (typeof(autosave_timer)=="undefined") {
	var autosave_timer = null;
} else if (autosave_timer==null) {
	
} else {
	clearInterval(autosave_timer);
	autosave_timer = null;
}

var wll_menu = null;
document.getElementsByClassName("dyminibox")[0].style.display="none";

if (dyifexecmininote){
    exec_mini_note_wrapper();
}
}