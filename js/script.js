console.log(firebase);

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
function modal(title, contents) {
    const modalHtml = '' +
        '<div id="modalBg"></div>' +
        '<div class="modal-wrap">' +
            '<div class="modal-close-btn">' +
                '<button type="button" onclick="modalClose();">' +
                    '<img src="./images/close.png" alt="" />' +
                '</button>' +
            '</div>' +
            '<div class="modal">' +
                '<div class="modal-title">' +
                    '<h2>'+ title +'</h2>' +
                '</div>' +
                '<div class="modal-contents">' +
                    ''+ contents +'' +
                '</div>' +
            '</div>' +
        '</div>';

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflowY = 'hidden';

    document.querySelector('#modalBg').addEventListener('mouseup', (e) => {
        modalClose();
    });
}
function modalClose() {
    document.querySelector('#modalBg').remove();
    document.querySelector('.modal-wrap').remove();
    document.body.style.overflowY = 'auto';
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
    modal(
    '로그인을 해주세요 :)',
'<div class="login-wrap">' +
            '<div class="login-insert-box">' +
                '<input type="email" value="" placeholder="이메일을(를) 입력해주세요." />' +
                '<button id="loginGo" type="button">로그인</button>' +
            '</div>' +
            '<div class="login-info">' +
                '<p>아직 회원이 아니신가요?</p>' +
                '<button type="button" onclick="dawdawd(this);">회원가입</button>' +
            '</div>' +
        '</div>',
    );

    // document.querySelector('#dawdawd').addEventListener('click', () => {
    //
    // });
});
// function dawdawd(self) {
    // self.closest('.modal').style.display = 'none';
//     if(type === 'register') {
//         document.querySelector('.login-info p').textContent = '계정이 이미 있으신가요?';
//         self.textContent = '로그인';
//     }
// }

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
