export default {
    key: {
        ACCESS_TOKEN: 'access-token',
        TOKEN: 'accessToken'
    },
    url: {

    },
    status: {
        error: {
            LOGIN_INFO: '로그인용 ID 혹은 인증번호를 확인해 주세요.',
            LOGOUT_PROCESS: '로그아웃 처리되었습니다. 다시 접속해 주세요.',
            LOGOUT_INFO_CHANGE: '접수실 정보 변경으로 로그아웃 처리되었습니다. 다시 접속해 주세요.',
            NOT_VALID_CODE: '유효하지 않은 인증번호입니다. 재발급 후 입력해 주세요.',
            UNSEARCHABLE_WORD: '검색 불가능한 단어가 포함되어 있습니다.',
            SEARCH_BY_ROAD: '도로명 혹은 지번 주소로 검색해 주세요.',
            TEMPORARY: '일시적으로 오류가 발생했어요. 잠시 후에 다시 시도해 주세요.',
            NOT_VALID_QR: '유효하지 않은 QR 코드입니다. 메디패스의 병원 접수용 QR 코드를 인식해주세요.',
            VALID_TIME_OVER_QR: '유효 시간이 만료된 QR 코드입니다. 재발급 후 진행해 주세요.',
            WRONG_PHONE: '잘못된 전화번호 입니다.',
            WRONG_IDCARD: '잘못된 주민번호 입니다.',
            WRONG_ZIPCODE: '잘못된 우편번호 입니다.',
            CANCEL_BOOK: '취소된 예약 건은 접수할 수 없어요. 다시 접수를 진행해 주세요.',
            WAIT_A_LITTLE: '접수처에서 확인 중입니다. 조금만 기다려 주세요.',
            RECEPTION_COMPLETED: '이미 접수를 완료했어요. 진료시간까지 대기해 주세요.',
            OTHER: '(클라이언트) 예상치 못한 오류가 발생했어요! 잠시 후에 다시 시도해 주세요.',
        }
    },
    store: {
        menulist: {
            CHANGEMOBILEMENUSTATE: 'sideNav/changeMobileMenuState',
            CHANGEMOBILESTATE: 'sideNav/changeMobileMenuState',
            CHANGEOVERLAYMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGEOVERMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGESTATICMENUINACTIVE: 'sideNav/changeStaticMenuInactive',
            CHANGELAYOUTMODE: 'sideNav/changeLayoutMode',
            CHANGEMENUONCLICK: 'sideNav/checkMenuOnclick',
        }
    }




}