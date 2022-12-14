export default {
    namespaced: true,
    state: {
        overlayMenuActive: false,
        mobileMenuActive: false,
        staticMenuInactive: false,
        layoutMode: 'static',
        menuClick: false,
        permission: {},
        onMenu: 'Home'
    },
    mutations: {
        CHANGE_OVERLAY_MENU(state, payload) {
            state.overlayMenuActive = payload;
        },
        CHANGE_MOBILE_MENU(state, payload) {
            state.mobileMenuActive = payload;
        },
        CHANGE_STATIC_MENU(state, payload) {
            state.staticMenuInactive = payload;
        },
        CHANGE_LAYOUT_MODE(state, payload) {
            state.layoutMode = payload;
        },
        CHANGE_MENU_CLICK_STATE(state, payload) {
            state.menuClick = payload;
        },
        CHANGE_NOW_CLICK_MENU(state, payload) {
            state.onMenu = payload;
        }
    },
    actions: {
        changeOverlayMenuState({ commit }, status) {
            commit('CHANGE_OVERLAY_MENU', status);
        },
        changeMobileMenuState({ commit }, status) {
            commit('CHANGE_MOBILE_MENU', status);
        },
        changeStaticMenuInactive({ commit }, status) {
            commit('CHANGE_STATIC_MENU', status);
        },
        changeLayoutMode({ commit }, message) {
            commit('CHANGE_LAYOUT_MODE', message);
        },
        checkMenuOnclick({ commit }, status) {
            commit('CHANGE_MENU_CLICK_STATE', status);
        },
        changeNowClickMenu({ commit }, menuNm) {
            commit('CHANGE_NOW_CLICK_MENU', menuNm);
        }
    },
    getters: {

    }
}