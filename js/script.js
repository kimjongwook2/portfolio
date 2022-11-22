/**
 * global variable
 */
const topBtn = document.querySelector('.top-btn');
const useSkill = document.querySelectorAll('.skill-box');
// const useSkillImg = document.querySelectorAll('.skill-box img');
const logo = document.querySelector('.logo');

/**
 * global function
 */
function scrollContainer() {
    return document.documentElement || document.body;
}

/**
 * mousewheel event
 */
document.addEventListener('mousewheel', (e) => {
    let wheelData = e.deltaY;

    if(wheelData > 0) { // 휠 내릴때
        logo.id = 'hideTranslate';
        // logo.classList.add('hideTranslate');
        // logo.animate(
        //     {
        //         transform: [
        //             'translateY(0px)',
        //             'translateY(-300px)'
        //         ]
        //     },
        //     {
        //         duration: 500,
        //         fill: 'forwards',
        //         easing: 'ease'
        //     }
        // );
    } else {
        logo.removeAttribute('id');
        // logo.classList.remove('hideTranslate');
    }
});

/**
 * top button
 */
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
        '<div class="skill-view skill-view-'+ i +'">' +
            '<span>' + (dataSkill !== null ? dataSkill : "no skill") + '</span>' +
        '</div>'

    el.addEventListener('mouseenter', () => {
        // el.innerHTML += skillHtml;
        el.insertAdjacentHTML('afterbegin', skillHtml);
    })

    el.addEventListener('mouseleave', () => {
        document.querySelector('.skill-view-'+i).remove();
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
