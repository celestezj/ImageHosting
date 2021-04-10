/*
 * Image preview script
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 * 
 * Applied in Butterfly by muggledy on 2021/4/9
 */

function image_preview_wrapper(){

this.imagePreview = function(){
	/* CONFIG */
		
		xOffset = 10;
		yOffset = 30;
		
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
		
	/* END CONFIG */
	$("a.article-sort-item-img").hover(function(e){
		this.t = this.title;
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<div id='article-img-preview'><img src='"+ $(this).find('img').attr('src') +"' alt='Article Image Preview' style='width:300px;' />"+ c +"</div>");
		$("#article-img-preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");
    },
	function(){
		$("#article-img-preview").remove();
    });	
	$("a.article-sort-item-img").mousemove(function(e){
		$("#article-img-preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
};

// starting the script on page load
$(document).ready(function(){
	imagePreview();
});

}

//pjax响应完成后，删除上个页面（可能）残留的article-img-preview节点
window.addEventListener('pjax:complete', function () {
	var self = document.getElementById('article-img-preview'); // 拿到待删除节点
	if (self) {
		var parent = self.parentElement; // 拿到父节点
		var removed = parent.removeChild(self); // 删除
		//removed === self; // true //注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置
	}
});