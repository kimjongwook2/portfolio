/**
 * global variable
 */
const dbFireStore = firebase.firestore();
const dbAuth = firebase.auth();
let superAdmin = ['jongwook2.kim@gmail.com', 'jong-wook@naver.com'];
let isSuperAdmin, isModalBg = false;

const topBtn = document.querySelector('#topBtn');
const useSkill = document.querySelectorAll('.skill-box');
// const useSkillImg = document.querySelectorAll('.skill-box img');
const header = document.querySelector('.header');
const signInOutBtn = document.querySelector('#signInOutBtn');
const menuCategory = document.querySelectorAll('.menu-categories li');
const tabMenuCategory = document.querySelectorAll('.tab-menu-categories li');
const tabMenuContent = document.querySelectorAll('.tab-menu-content');
const portfolioSiteUpload = document.querySelector('#portfolioSiteUpload');

// console.log(dbFireStore);
// console.log(dbAuth);
console.log(superAdmin);

/**
 * global function
 */
function reload() { // 새로고침 함수
    window.location.reload();
}
function modal(title, contents) { // 모달 함수
    const modalHtml = '' +
        '<div id="modalBg" class="modal-bg"></div>' +
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

    isModalBg = true;
    document.addEventListener('mousewheel', (e) => {
        if (isModalBg && document.querySelector('#modalBg').classList.contains('modal-bg')) { // header가 움직이므로 버그 현상 막기 위함
            header.removeAttribute('id');
        }
    });
}
function modalClose() { // 모달 닫기 함수
    isModalBg = false;
    document.querySelector('#modalBg').remove();
    document.querySelector('.modal-wrap').remove();
    document.body.style.overflowY = 'auto';
}
function emailCheck(str) { // 이메일 정규식 체크 함수
    let regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!regEmail.test(str)) {
        return false;
    } else {
        return true;
    }
}

/**
 * mousewheel event
 */
document.addEventListener('mousewheel', (e) => {
    let wheelData = e.deltaY;

    if (wheelData > 0) { // 휠 내릴때
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

        if (menuScroll !== null) {
            menuTarget.scrollIntoView({
                behavior: 'smooth'
            })
        } else {
            return;
        }
    });
});

/**
 * sign in / sign up / sign logout
 */
dbAuth.onAuthStateChanged((user) => { // 로그인 상태 여/부
    if (user) {
        console.log("로그인 상태입니다.");

        if (superAdmin.includes(user.email)) {
            isSuperAdmin = true;
        }

        signInOutBtn.textContent = 'sign out';
        signInOutBtn.addEventListener('click', () => {
            dbAuth.signOut();
            alert("로그아웃 되었습니다.");
            reload();
        });
    } else {
        console.log("로그인 상태가 아닙니다");

        signInOutBtn.addEventListener('click', () => {
            modal(
            '로그인을 해주세요 :)',
        '<div class="switch-mode sign-auth-wrap">' +
                    '<div class="sign-in-box">' +
                        '<input type="text" name="email" value="" autocomplete="off" placeholder="이메일을(를) 입력해주세요." />' +
                        '<input type="password" name="password" value="" autocomplete="off" placeholder="패스워드을(를) 입력해주세요." />' +
                        '<button class="sign-btn" type="button" onclick="signInUp(this);">로그인하기</button>' +
                    '</div>' +
                    '<div class="sign-info">' +
                        '<p>아직 회원이 아니신가요?</p>' +
                        '<button type="button" onclick="signUp(this);">회원가입</button>' +
                    '</div>' +
                '</div>',
            );
        });
    }
});
function signUp(self) {
    self.closest('.sign-auth-wrap').classList.toggle('switch-mode');
    document.querySelectorAll('input').forEach((el, i) => {
        el.value = ''; // value값 초기화
    });

    if (self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '회원가입';
        document.querySelector('.modal-title h2').textContent = '로그인을 해주세요 :)';
        document.querySelector('.sign-info p').textContent = '아직 회원이 아니신가요?';
        document.querySelector('.sign-up-box').className = 'sign-in-box';
        document.querySelector('.sign-in-box button').textContent = '로그인하기';

        document.querySelector('input[name=name]').remove();
        document.querySelector('.input-wrap').remove();
        document.querySelector('.eyes').remove();
    } else if (!self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '로그인';
        document.querySelector('.modal-title h2').textContent = '회원가입을 해주세요 :)';
        document.querySelector('.sign-info p').textContent = '계정이 이미 있으신가요?';
        document.querySelector('.sign-in-box').className = 'sign-up-box';
        document.querySelector('.sign-up-box button').textContent = '가입하기';

        let inputName = '' +
            '<input type="text" name="name" value="" autocomplete="off" placeholder="이름을(를) 입력해주세요." />';

        let inputPassword = '' +
            '<div class="input-wrap">' +
                '<input type="password" name="re_password" value="" autocomplete="off" placeholder="패스워드을(를) 한번 더 입력해주세요." />' +
                '<img class="eyes" src="./images/eyes_on.png" alt="" />' +
            '</div>';

        document.querySelector('.sign-up-box input[name=email]').insertAdjacentHTML('beforebegin', inputName);
        document.querySelector('.sign-up-box input[name=password]').insertAdjacentHTML('afterend', inputPassword);
        document.querySelector('.sign-up-box input[name=password]').insertAdjacentHTML('afterend', '<img class="eyes" src="./images/eyes_on.png" alt="" />');

        document.querySelectorAll('.eyes').forEach((el, i) => {
            el.addEventListener('click', () =>  {
                let togglePassword = document.querySelectorAll('input[name=password], input[name=re_password]');

                togglePassword.forEach((item) => {
                    item.classList.toggle('active');

                    document.querySelectorAll('.eyes').forEach((el) => {
                        if (item.classList.contains('active') === true) {
                            item.setAttribute('type', 'text');
                            el.src = './images/eyes_off.png';
                        } else {
                            item.setAttribute('type', 'password');
                            el.src = './images/eyes_on.png';
                        }
                    });
                });
            });
        });
    }
}
function focusTest(t) {
    t.focus();
    // t.classList.add('ddawgwagwag');
    //
    // if (document.focus()) {
    //     t.style.border = '1px solid #fff';
    // }
    t.onblur = function() {
        t.style.border = '1px solid #666';
        t.classList.add('ddawgwagwag');
    };
    t.onfocus = function() {
        // if (t.classList.contains('ddawgwagwag')) {
        //     t.classList.remove('ddawgwagwag');
        // }
        t.style.border = '1px solid red';
    };
}

function signInUp(self) {
    let email = document.querySelector('input[name=email]');
    let password = document.querySelector('input[name=password]');

    if (self.textContent === '로그인하기') {
        if (!email.value) {
            alert("이메일을(를) 입력해주세요.");
            // focusTest(email);
            email.focus();
            return;
        } else if (!emailCheck(email.value)) {
            alert("이메일 형식이 올바르지 않습니다.");
            email.focus();
            return;
        } else if (!password.value) {
            alert("패스워드을(를) 입력해주세요.");
            password.focus();
            return;
        }

        dbAuth.signInWithEmailAndPassword(email.value, password.value).then(result => {
            console.log(result.user);
            reload();
        }).catch(error => {
            alert("회원정보가 일치하지 않습니다.\n회원이 아니시라면 회원가입 후 이용해주세요.");
        });
    } else if (self.textContent === '가입하기') {
        let name = document.querySelector('input[name=name]');
        let re_password = document.querySelector('input[name=re_password]');

        if (!name.value) {
            alert("이름을(를) 입력해주세요.");
            name.focus();
            return;
        } else if (!email.value) {
            alert("이메일을(를) 입력해주세요.");
            email.focus();
            return;
        } else if (!emailCheck(email.value)) {
            alert("이메일 형식이 올바르지 않습니다.");
            email.focus();
            return;
        } else if (!password.value || !re_password.value) {
            alert("패스워드을(를) 입력해주세요.");
            password.focus();
            return;
        } else if (password.value !== re_password.value) {
            alert("패스워드가 일치하지 않습니다.");
            re_password.focus();
            return;
        }

        dbAuth.createUserWithEmailAndPassword(email.value, password.value).then(result => {
            result.user.updateProfile({
                displayName: name.value
            }).then(() => {
                // console.log(result.displayName);
                // console.log(result.email);
                console.log(result.user);
                alert("회원가입이 완료되었습니다 :)");
                reload();
            });
        }).catch(error => {
            alert("회원가입에 실패하였습니다, 잠시 후 다시 시도해주세요\n" + error);
        });
    }
}

/**
 * portfolio sites tab menu
 */
tabMenuCategory.forEach((el, i) => {
   el.addEventListener('click', () =>  {
       tabMenuCategory.forEach((el) => {
           el.classList.remove('active');
       });

       tabMenuContent.forEach((el) => {
           el.classList.remove('active');
       });

       tabMenuCategory[i].classList.add('active');
       tabMenuContent[i].classList.add('active');
   });
});

/**
 * portfolio sites upload
 */
portfolioSiteUpload.textContent = '등록하기';
portfolioSiteUpload.addEventListener('click', () => {
    if (isSuperAdmin) {
        alert("관리자 입니다");
    } else {
        alert("관리자만 등록이 가능합니다.\n관리자한테 문의 바랍니다.");
    }
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
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
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
