function exec_donate_func(){
jQuery(document).ready(function() {
	var QRBox	=	$('#QRBox');
	var MainBox	=	$('#DonateMainBox');
	var BTCQR	=	'https://cdn.jsdelivr.net/gh/celestezj/ImageHosting/data/donate/img/BTCQR.png';	// 二维码路径
	var AliPayQR	=	'https://cdn.jsdelivr.net/gh/celestezj/ImageHosting/data/donate/img/AliPayQR.png';
	var WeChanQR	=	'https://cdn.jsdelivr.net/gh/celestezj/ImageHosting/data/donate/img/WeChanSQ.png';

	function showQR(QR) {
		if (QR) {
			MainBox.css('background-image','url('+QR+')');
		}
		$('#DonateText,#donateBox,#donategithub').addClass('donateblur');
		QRBox.fadeIn(300,function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID	=	$(this).attr('id');
		if (thisID === 'BTC') {
			showQR(BTCQR);
		} else if (thisID === 'AliPay') {
			showQR(AliPayQR);
		} else if (thisID === 'DonateWeChat') {
			showQR(WeChanQR);
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout (function(a) {
			QRBox.fadeOut(300,function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#DonateText,#donateBox,#donategithub').removeClass('donateblur');
		},600);

	});
});

}

if (typeof(btf)!="undefined"){
	btf.isJqueryLoad(exec_donate_func);
} else {
	if(window.attachEvent){
		window.attachEvent("onload",function() {
			btf.isJqueryLoad(exec_donate_func);
		});
	}else{
		window.addEventListener("load",function() {
			btf.isJqueryLoad(exec_donate_func);
		},true);
	}
}