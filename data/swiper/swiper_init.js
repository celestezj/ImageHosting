var swiper = new Swiper('.blog-slider', {
  passiveListeners: true,
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  autoplay: {
    disableOnInteraction: true,
    delay: 3000
  },
  mousewheel: false,
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  },
  observer: true,
  on: {
    resize: function () {
      setTimeout(() => {
        swiper.update()
      }, 500) //延时器很重要，否则因浏览器宽度（F12）或侧边栏显隐导致的所在div变化而重新计算的自适应宽度会有误，swiper显示就无法正常居中。此前分类页面的charts也是如此，只不过当时为了追求极致的平滑，担心定时interval太长（会有明显延迟，此处swiper即是如此，但也无伤大雅）太短都不准确，于是会以小interval做多次resize，更耗CPU、考验计算机性能
    }
  }
});

var comtainer = document.getElementById('swiper_container');
comtainer.onmouseenter = function() {
  swiper.autoplay.stop();
};
comtainer.onmouseleave = function() {
  swiper.autoplay.start();
}
