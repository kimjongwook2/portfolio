/**
 * selector
 */
const topBtn = document.querySelector('#topBtn');
const useToolImg = document.querySelectorAll('.tool');

/**
 * top button
 */
function scrollContainer() {
    return document.documentElement || document.body;
}
function goToTop() {
    document.body.scrollIntoView({
        behavior: 'smooth'
    });
}
document.addEventListener('scroll', () => {
    if (scrollContainer().scrollTop > 0) {
        topBtn.classList.remove('opacity0');
    } else {
        topBtn.classList.add('opacity0');
    }
});
topBtn.addEventListener('click', goToTop);

/**
 * top button
 */
useToolImg.forEach((el, i) => {
    el.addEventListener('mouseover', () => {
        console.log("aaa");
    })

    el.addEventListener('mouseout', () => {
        console.log("bbb");
    })
});

/**
 * use tool
 */
new Swiper('.swiper-tool-container.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 10,

    scrollbar: {
        el: '.swiper-tool-container .swiper-scrollbar',
        draggable: true,
    },

    navigation: {
        nextEl: '.swiper-tool-container .swiper-button-next',
        prevEl: '.swiper-tool-container .swiper-button-prev',
    },

    // breakpoints: {
    //     768: {
    //         slidesPerView: 2,  //브라우저가 768보다 클 때
    //         spaceBetween: 40,
    //     },
    //     1024: {
    //         slidesPerView: 3,  //브라우저가 1024보다 클 때
    //         spaceBetween: 50,
    //     },
    // },
});
