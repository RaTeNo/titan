document.addEventListener("DOMContentLoaded", function () {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|MacIntel|iPad)/i.test(navigator.platform)) document.documentElement.classList.add('custom_scroll')



	// Установка ширины стандартного скроллбара
	document.documentElement.style.setProperty('--scroll_width', widthScroll() + 'px')


	// Моб. версия
	fakeResize = false
	fakeResize2 = true

	if (document.body.clientWidth < 375) {
		document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
	}

	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})


// Ленивая загрузка
setTimeout(() => {
	observer = lozad('.lozad', {
		rootMargin: '200px 0px',
		threshold: 0,
		loaded: (el) => el.classList.add('loaded')
	})

	observer.observe()
}, 200)


$(".image_info_sim .tooltype").on("click", function(){
	let id = $(this).data("id");

	
	Fancybox.show([{
		src: id,
		type: 'inline'
	}])
});


$(".image_info_sim img").on("click", function(e){
	$('.simulator_point-form').trigger("reset"); //Line1
	let box = $(this);
	let offset = box.offset();
	let x = e.pageX - offset.left - 22.5
	let y = e.pageY - offset.top - 22.5;	
	// переаводим в проценты
	let sizeBoxX = 	box.outerWidth();
	let sizeBoxY = 	box.outerHeight();

	x = (x/sizeBoxX) * 100;
	y = (y/sizeBoxY) * 100;

	console.log(x);
	console.log(y);

	//$(".image_info_sim").append('<div class="tooltype" data-id="#type_new" style="top:'+y+'%; left:'+x+'%; position: absolute;"></div>');

	Fancybox.close()
	Fancybox.show([{
		src: "#type_new",
		type: 'inline'
	}])
});



// Вспомогательные функции
const setHeight = className => {
	let maxheight = 0

	className.each(function () {
		let elHeight = $(this).outerHeight()

		if (elHeight > maxheight) maxheight = elHeight
	})

	className.outerHeight(maxheight)
}


const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}