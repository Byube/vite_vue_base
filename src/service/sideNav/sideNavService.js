import { computed } from 'vue';
import { useStore } from 'vuex';
import constant from '@/common/constant.js';

export const activeClassName = () => {
    const store = useStore();
    const overlayMenuActive = computed(() => store.state.sideNav.overlayMenuActive);
    const mobileMenuActive = computed(() => store.state.sideNav.mobileMenuActive);
    const staticMenuInactive = computed(() => store.state.sideNav.staticMenuInactive);
    const layoutMode = computed(() => store.state.sideNav.layoutMode);
    const checkMenuOnclick = computed(() => store.state.sideNav.menuClick);
    const onMenu = computed(() => store.state.sideNav.onMenu);
    const changeMobileMenuState = () => {
        store.dispatch(constant.store.menulist.CHANGEMOBILEMENUSTATE, !mobileMenuActive.value);
    };
    const changeMobileState = (status) => {
        store.dispatch(constant.store.menulist.CHANGEMOBILESTATE, status);
    };
    const changeOverlayMenuState = () => {
        store.dispatch(constant.store.menulist.CHANGEOVERLAYMENUSTATE, !overlayMenuActive.value);
    };
    const changeOverMenuState = (status) => {
        store.dispatch(constant.store.menulist.CHANGEOVERMENUSTATE, status);
    };
    const changeStaticMenuInactive = () => {
        store.dispatch(constant.store.menulist.CHANGESTATICMENUINACTIVE, !staticMenuInactive.value);
    };
    const changeLayoutMode = (message) => {
        store.dispatch(constant.store.menulist.CHANGELAYOUTMODE, message);
    };
    const changeMenuOnclick = (status) => {
        store.dispatch(constant.store.menulist.CHANGEMENUONCLICK, status);
    };
    const changeNowClickMenu = (menuNm) => {
        store.dispatch(constant.store.menulist.CHANGENOWCLICKMENU, menuNm);
    };
    return {
        onMenu,
        overlayMenuActive,
        layoutMode,
        mobileMenuActive,
        staticMenuInactive,
        checkMenuOnclick,
        changeMobileMenuState,
        changeStaticMenuInactive,
        changeLayoutMode,
        changeOverlayMenuState,
        changeOverMenuState,
        changeMobileState,
        changeMenuOnclick,
        changeNowClickMenu
    }
}

