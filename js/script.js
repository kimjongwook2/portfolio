/**
 * global variable
 */
const topBtn = document.querySelector('#topBtn');
const useSkill = document.querySelectorAll('.skill-box');
// const useSkillImg = document.querySelectorAll('.skill-box img');
const header = document.querySelector('.header');
const loginBtn = document.querySelector('#loginBtn');
const menuCategory = document.querySelectorAll('.menu-categories li');
const tabMenuCategory = document.querySelectorAll('.tab-menu-categories li');
const tabMenuContent = document.querySelectorAll('.tab-menu-content');

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
        header.id = 'hideTranslate';
        // header.classList.add('hideTranslate');
        // header.animate(
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
        header.removeAttribute('id');
        // header.classList.remove('hideTranslate');
    }
});

/**
 * menu offset scroll
 */
menuCategory.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        let menuScroll = e.target.dataset.offset;
        let menuTarget = document.querySelector(menuScroll);

        menuCategory.forEach((el) => {
            el.classList.remove('active');
        });

        // menuCategory[i].className += "active";
        menuCategory[i].classList.add('active');

        if(menuScroll !== null) {
            menuTarget.scrollIntoView({
                behavior: 'smooth'
            })
        } else {
            return;
        }
    });
});

/**
 * login, join
 */
loginBtn.addEventListener('click', () => {
    let loginModalHtml = '' +
        '<div id="modalBg"></div>' +
        '<div class="modal login-modal">' +
            '<button class="modal-close-btn" type="button" onclick="modalClose();">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></svg>' +
            '</button>' +
            '<div>준비중</div>' +
        '</div>';

    document.body.insertAdjacentHTML('beforeend', loginModalHtml);
    document.body.style.overflowY = 'hidden';
});
function modalClose() {
    document.querySelector('#modalBg').remove();
    document.querySelector('.modal').remove();
    document.body.style.overflowY = 'auto';
}

/**
 * portfolio sites tab menu
 */
tabMenuCategory.forEach((el, i) => {
   el.addEventListener('click', () =>  {
       tabMenuContent.forEach((el) => {
           el.classList.remove('active');
       });

       tabMenuCategory.forEach((el) => {
           el.classList.remove('active');
       });

       tabMenuContent[i].classList.add('active');
       tabMenuCategory[i].classList.add('active');
   });
});

/**
 * use skill
 */
useSkill.forEach((el, i) => {
    // let dataSkill = useSkillImg[i].getAttribute('data-skill');
    let dataSkill = el.getAttribute('data-skill');
    let skillHtml = '' +
        '<div class="skill-view skill-view-'+ i +'">' +
            '<span>' + (dataSkill !== null ? dataSkill : "no skill") + '</span>' +
        '</div>';

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

/**
 * top button
 */
document.addEventListener('scroll', () => {
    if (scrollContainer().scrollTop > 0) {
        topBtn.classList.remove('opacity0');
    } else {
        topBtn.classList.add('opacity0');
    }
});
topBtn.addEventListener('click', () => {
    document.body.scrollIntoView({
        behavior: 'smooth'
    });
});
