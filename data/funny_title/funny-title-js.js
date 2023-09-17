// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        var dytitleicon = document.querySelector('link[rel*="icon"]');
        dytitleicon.setAttribute('href', "https://cdn.statically.io/gh/celestezj/ImageHosting/v0.1/img/20210207091812.png");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        var dytitleicon = document.querySelector('link[rel*="icon"]');
        dytitleicon.setAttribute('href', "https://cdn.statically.io/gh/celestezj/ImageHosting/v0.1/img/20210207091812.png");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});