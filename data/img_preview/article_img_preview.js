/*
 * Image preview script 
 * powered by jQuery (http://www.jquery.com)
 * 
 * written by Alen Grakalic (http://cssglobe.com)
 * 
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
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

if (typeof(btf)!="undefined"){
	btf.isJqueryLoad(image_preview_wrapper);
} else {
	if(window.attachEvent){
		window.attachEvent("onload",function() {
			btf.isJqueryLoad(image_preview_wrapper);
		});
	}else{
		window.addEventListener("load",function() {
			btf.isJqueryLoad(image_preview_wrapper);
		},true);
	}
}