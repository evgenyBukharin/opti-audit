import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

const resultSection = document.querySelector(".result");
if (resultSection) {
	const resultSliders = document.querySelectorAll(".result__slider");
	resultSliders.forEach((sliderNode, idx) => {
		sliderNode.classList.add(`result__slider-${idx}`);
		let slider = new Swiper(sliderNode, {
			speed: 400,
			spaceBetween: 0,
			grabCursor: true,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true,
				bulletClass: "swiper-pagination-bullet result__bullet",
				bulletActiveClass: "swiper-pagination-bullet-active result__bullet-active",
			},
			navigation: {
				prevEl: ".result__button-prev",
				nextEl: ".result__button-next",
			},
		});
	});
}
