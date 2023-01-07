// window.addEventListener('DOMContentLoaded', function() {

/**
 * firebase config variable
 */
const dbFireStore = firebase.firestore();
const dbAuth = firebase.auth();

/**
 * global variable
 */
const topBtn = document.querySelector('#topBtn');
const useSkill = document.querySelectorAll('.skill-box');
const header = document.querySelector('.header');
const signInOutBtn = document.querySelector('#signInOutBtn');
const menuCategory = document.querySelectorAll('.menu-categories li');
const tabMenuCategory = document.querySelectorAll('.tab-menu-categories li');
const tabMenuContent = document.querySelectorAll('.tab-menu-content');
const portfolioSiteUpload = document.querySelector('#portfolioSiteUpload');
let superAdmin = ['jongwook2.kim@gmail.com', 'jong-wook@naver.com']; // 관리자 권한 이메일 설정
let isSuperAdmin, isModalBg = false;

console.log(superAdmin);

/**
 * global function
 */
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

    // document.querySelector('#modalBg').addEventListener('mouseup', (e) => { // 모달 밖 영역 이벤트 실행
    //     modalClose();
    // });

    isModalBg = true;
    document.addEventListener('mousewheel', (e) => {
        if (isModalBg && document.querySelector('#modalBg').classList.contains('modal-bg')) { // scroll시 header가 움직이므로 버그 현상 막기 위함
            header.removeAttribute('id');
        }
    });
}

function modalClose() { // 모달 닫기 함수
    isModalBg = false;
    document.querySelector('#modalBg').remove();
    document.querySelector('.modal-wrap').remove();
}

function windowPopup(contents, cancelBtn) { // alert, confirm창 함수
    const popupHtml = '' +
        '<div id="popupBg" class="popup-bg"></div>' +
        '<div class="popup-wrap">' +
            '<div class="popup">' +
                '<div class="popup-contents">' +
                    '<p>'+ contents +'</p>' +
                '</div>' +
                '<div class="popup-btn-wrap">' +
                    ''+ (cancelBtn !== undefined ? cancelBtn : '') +'' +
                    '<button id="windowPopupOk" type="button">확인</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    document.body.insertAdjacentHTML('beforeend', popupHtml);

    isModalBg = true;

    document.addEventListener('mousewheel', (e) => {
        if (isModalBg && document.querySelector('#popupBg').classList.contains('popup-bg')) { // scroll시 header가 움직이므로 버그 현상 막기 위함
            header.removeAttribute('id');
        }
    });

    document.querySelector('#windowPopupCancel, #windowPopupOk').addEventListener('click', () => { // alert, confirm창 취소/확인
        isModalBg = false;
        document.querySelector('#popupBg').remove();
        document.querySelector('.popup-wrap').remove();
    });
}

function reload() { // 새로고침 함수
    window.location.reload();
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

            /**
             * admin auth
             */
            if (isSuperAdmin) {
                // portfolio sites upload
                let portfolioSiteUploadHtml = '' +
                    '<button id="portfolioSiteUploadBtn" class="btn-type-1" type="button">등록하기</button>';

                portfolioSiteUpload.insertAdjacentHTML('afterbegin', portfolioSiteUploadHtml);

                document.querySelector('#portfolioSiteUploadBtn').addEventListener('click', () => {
                    modal(
                    '프로젝트 등록을 해보세요 :)',
                    '<div class="">' +
                        '<select class="modal-select" name="">' +
                            '<option value="">카테고리 선택</option>' +
                            '<option value="shopping mall">쇼핑몰</option>' +
                            '<option value="hotel">호텔/팬션</option>' +
                            '<option value="solution service">교육/IT솔루션 서비스</option>' +
                            '<option value="semiconductor">제조장비 반도체산업</option>' +
                            '<option value="etc">기타</option>' +
                        '</select>' +
                        '<select class="modal-select" name="">' +
                            '<option value="">유형 선택</option>' +
                            '<option value="WEB">WEB</option>' +
                            '<option value="WEB/APP">WEB/APP</option>' +
                        '</select>' +
                        '<input type="text" name="" value="" autocomplete="off" placeholder="제목을(를) 입력해주세요." />' +
                        '<textarea class="modal-textarea" placeholder="간략한 설명을(를) 입력해주세요."></textarea>' +
                        '<div class="file-box">' +
                            '<input class="file-name" value="첨부파일명" disabled>' +
                            '<label for="fileUpload">파일찾기</label>' +
                            '<input id="fileUpload" class="file-upload-hidden" type="file">' +
                        '</div>' +
                    '</div>' +
                    '<div class="">' +
                        '<button id="" class="modal-btn-type-1" type="button">등록하기</button>' +
                    '</div>',
                    );

                    let fileTarget = document.querySelector('.file-upload-hidden');

                    fileTarget.addEventListener('change', (e) => {
                        if (window.FileReader) {
                            let file = e.target.files[0].name; // 파일명만 추출

                            document.querySelector('.file-name').value = file;
                        }
                    });
                });
            } else {

            }
        }

        signInOutBtn.textContent = 'sign out';
        signInOutBtn.addEventListener('click', () => {
            dbAuth.signOut();
            windowPopup('로그아웃 되었습니다.');
            document.querySelector('#windowPopupOk').addEventListener('click', () => {
                reload();
            });
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
                    '<button class="sign-btn modal-btn-type-1" type="button" onclick="signInUp(this);">로그인하기</button>' +
                '</div>' +
                '<div class="sign-info-box">' +
                    '<div class="sign-info qa-member">' +
                        '<p>아직 회원이 아니신가요?</p>' +
                        '<button type="button" onclick="signUp(this);">회원가입</button>' +
                    '</div>' +
                    '<div class="sign-info qa-password-find">' +
                        '<p>패스워드를 잊어버리셨나요?</p>' +
                        '<button type="button" onclick="passwordFind();">패스워드 재설정</button>' +
                    '</div>' +
                '</div>' +
            '</div>',
            );
        });
    }
});

function signUp(self) {
    self.closest('.sign-auth-wrap').classList.toggle('switch-mode');
    document.querySelectorAll('input').forEach((el, i) => {
        el.value = '';
    });

    if (self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '회원가입';
        document.querySelector('.modal-title h2').textContent = '로그인을 해주세요 :)';
        document.querySelector('.qa-member p').textContent = '아직 회원이 아니신가요?';
        document.querySelector('.sign-up-box').className = 'sign-in-box';
        document.querySelector('.sign-in-box button').textContent = '로그인하기';

        document.querySelector('input[name=name]').remove();
        document.querySelector('.input-wrap').remove();
        document.querySelector('.eyes').remove();
        document.querySelector('.qa-password-find').style.display = 'flex';
    } else if (!self.closest('.sign-auth-wrap').classList.contains('switch-mode')) {
        self.closest('.sign-auth-wrap button').textContent = '로그인';
        document.querySelector('.modal-title h2').textContent = '회원가입을 해주세요 :)';
        document.querySelector('.qa-member p').textContent = '계정이 이미 있으신가요?';
        document.querySelector('.sign-in-box').className = 'sign-up-box';
        document.querySelector('.sign-up-box button').textContent = '가입하기';
        document.querySelector('.qa-password-find').style.display = 'none';

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

function signInUp(self) {
    let userEmail = document.querySelector('input[name=email]');
    let userPassword = document.querySelector('input[name=password]');

    if (self.textContent === '로그인하기') {
        if (!userEmail.value) {
            windowPopup('이메일을(를) 입력해주세요.');
            // userEmail.focus();
            return;
        } else if (!emailCheck(userEmail.value)) {
            windowPopup('이메일 형식이 올바르지 않습니다.');
            // userEmail.focus();
            return;
        } else if (!userPassword.value) {
            windowPopup('패스워드을(를) 입력해주세요.');
            // userPassword.focus();
            return;
        }

        dbAuth.signInWithEmailAndPassword(userEmail.value, userPassword.value).then(result => { // 로그인 시
            console.log(result.user);
            reload();
        }).catch(error => {
            windowPopup('회원정보가 일치하지 않습니다.<br>회원이 아니시라면 회원가입 후 이용해주세요.');
        });
    } else if (self.textContent === '가입하기') {
        let userName = document.querySelector('input[name=name]');
        let user_rePassword = document.querySelector('input[name=re_password]');

        if (!userName.value) {
            windowPopup('이름을(를) 입력해주세요.');
            // userName.focus();
            return;
        } else if (!userEmail.value) {
            windowPopup('이메일을(를) 입력해주세요.');
            // userEmail.focus();
            return;
        } else if (!emailCheck(userEmail.value)) {
            windowPopup('이메일 형식이 올바르지 않습니다.');
            // userEmail.focus();
            return;
        } else if (!userPassword.value || !user_rePassword.value) {
            windowPopup('패스워드을(를) 입력해주세요.');
            // userPassword.focus();
            return;
        } else if (userPassword.value !== user_rePassword.value) {
            windowPopup('패스워드가 일치하지 않습니다.');
            // user_rePassword.focus();
            return;
        }

        dbAuth.createUserWithEmailAndPassword(userEmail.value, userPassword.value).then(result => { // 회원가입 시
            result.user.updateProfile({
                displayName: userName.value
            }).then(() => {
                // console.log(result.displayName);
                // console.log(result.email);
                console.log(result.user);

                windowPopup('회원가입이 완료되었습니다 :)');
                document.querySelector('#windowPopupOk').addEventListener('click', () => {
                    reload();
                });
            });
        }).catch(error => {
            windowPopup('회원가입에 실패하였습니다, 잠시 후 다시 시도해주세요.<br>' + error.message);
        });
    } else if (self.textContent === '보내기') {
        if (!emailCheck(userEmail.value)) {
            windowPopup('이메일 형식이 올바르지 않습니다.');
            return;
        } else {
            dbAuth.sendPasswordResetEmail(userEmail.value).then(() => { // 패스워드 재설정 시
                windowPopup('해당 이메일로 링크를 전송하였습니다.<br>메일함을 확인해주세요.');
            }).catch(error => {
                windowPopup('잠시 후 다시 시도해주세요<br>' + error.message);
            });
        }
    }
}

function passwordFind() {
    document.querySelector('.modal-title h2').textContent = '해당 이메일로 패스워드 재설정 링크를 전송합니다 :)';
    document.querySelector('.sign-info-box').style.display = 'none';
    document.querySelector('.sign-btn').textContent = '보내기';
    document.querySelector('input[name=password]').style.display = 'none';
    document.querySelector('input[name=email]').value = '';
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
 * use skill
 */
useSkill.forEach((el, i) => {
    // let dataSkill = useSkill[i].getAttribute('data-skill');
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
// });
