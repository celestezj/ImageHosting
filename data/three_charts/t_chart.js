//console.log("对屏幕resize进行(仅针对宽度变化)监听以重绘（那三个）图表"); //之所以放在这里仅仅是为了避免重复给同一事件绑定相同的注册函数。本脚本只在F5刷新页面时执行一次，pjax跳转不会执行
var dywinwidth = window.innerWidth; //浏览器宽度记录（旧值）
window.addEventListener("resize", function() {
    var new_posts_chart = document.getElementById("new-posts-chart");
    var new_tags_chart = document.getElementById("new-tags-chart");
    var new_categories_chart = document.getElementById("new-categories-chart");
    if (window.innerWidth!=dywinwidth){
        if (new_posts_chart){
            new_posts_chart.style.visibility="hidden";
        }
        if (new_tags_chart){
            new_tags_chart.style.visibility="hidden";
        }
        if (new_categories_chart){
            new_categories_chart.style.visibility="hidden";
        }
    }
    setTimeout(function(){
        if (window.innerWidth!=dywinwidth){
            dywinwidth = window.innerWidth;
            if (new_posts_chart && typeof(newPostsChart)!="undefined") {
                newPostsChart.resize();
                new_posts_chart.style.visibility="visible";
            }
            if (new_tags_chart && typeof(newTagsChart)!="undefined") {
                newTagsChart.resize();
                new_tags_chart.style.visibility="visible";
            }
            if (new_categories_chart && typeof(newCategoriesChart)!="undefined") {
                newCategoriesChart.resize();
                new_categories_chart.style.visibility="visible";
            }
        }
    },200);
});