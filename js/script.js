/**
 * global variable
 */
const topBtn = document.querySelector('.top-btn');
const useSkill = document.querySelectorAll('.tool');
// const useSkillImg = document.querySelectorAll('.tool img');

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
 * use skill
 */
useSkill.forEach((el, i) => {
    // let dataSkill = useSkillImg[i].getAttribute('data-skill');
    let dataSkill = el.getAttribute('data-skill');
    let skillHtml = '' +
        '<div class="skill skill-'+ i +'">' +
            '<span>'+ dataSkill +'</span>' +
        '</div>'

    el.addEventListener('mouseenter', () => {
        // el.insertAdjacentHTML('afterend', skillHtml);
        el.innerHTML += skillHtml;
    })

    el.addEventListener('mouseleave', () => {
        document.querySelector('.skill-'+i).remove();
    })
});

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
