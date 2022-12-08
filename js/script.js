/**
 * global variable
 */
const db = firebase.firestore();
const auth = firebase.auth();
const topBtn = document.querySelector('#topBtn');
const useSkill = document.querySelectorAll('.skill-box');
// const useSkillImg = document.querySelectorAll('.skill-box img');
const header = document.querySelector('.header');
const signInBtn = document.querySelector('#signInBtn');
const menuCategory = document.querySelectorAll('.menu-categories li');
const tabMenuCategory = document.querySelectorAll('.tab-menu-categories li');
const tabMenuContent = document.querySelectorAll('.tab-menu-content');

console.log(auth);

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
 * sign in / sign up
 */
signInBtn.addEventListener('click', () => {
    modal(
    '로그인을 해주세요 :)',
'<div class="switch-mode sign-auth-wrap">' +
            '<div class="sign-in-box">' +
                '<input type="email" value="" placeholder="이메일을(를) 입력해주세요." />' +
                '<button type="button" onclick="signInUp(this);">로그인하기</button>' +
            '</div>' +
            '<div class="sign-info">' +
                '<p>아직 회원이 아니신가요?</p>' +
                '<button type="button" onclick="signUp(this);">회원가입</button>' +
            '</div>' +
        '</div>',
    );
});
function signUp(self) {
    self.closest('.sign-auth-wrap').classList.toggle('switch-mode');

    if(self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '회원가입';
        document.querySelector('.modal-title h2').textContent = '로그인을 해주세요 :)';
        document.querySelector('.sign-info p').textContent = '아직 회원이 아니신가요?';
        document.querySelector('.sign-up-box').className = 'sign-in-box';
        document.querySelector('.sign-in-box button').textContent = '로그인하기';

        document.querySelector('.dawdagbbb').remove();
    } else if(!self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '로그인';
        document.querySelector('.modal-title h2').textContent = '회원가입을 해주세요 :)';
        document.querySelector('.sign-info p').textContent = '계정이 이미 있으신가요?';
        document.querySelector('.sign-in-box').className = 'sign-up-box';
        document.querySelector('.sign-up-box button').textContent = '가입하기';

        let dddddxvxv = '' +
            '<div class="dawdagbbb">' +
                '<input type="text" value="" placeholder="이름을(를) 입력해주세요." />' +
                '<input type="password" value="" placeholder="비밀번호을(를) 입력해주세요." />' +
            '</div>';

        document.querySelector('.sign-up-box').insertAdjacentHTML('afterbegin', dddddxvxv);
    }
}
function signInUp(self) {
    if(self.textContent === '로그인하기') {
        alert('로그인하기');
    } else if(self.textContent === '가입하기') {
        alert('가입하기');
    }
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
