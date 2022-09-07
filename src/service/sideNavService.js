import { computed } from 'vue';
import { useStore } from 'vuex';
import constant from '@/common/constant.js';
// import api from '@/api/index.js';

export const activeClassName = () => {
    const store = useStore();
    const overlayMenuActive = computed(() => store.state.sideNav.overlayMenuActive);
    const mobileMenuActive = computed(() => store.state.sideNav.mobileMenuActive);
    const staticMenuInactive = computed(() => store.state.sideNav.staticMenuInactive);
    const layoutMode = computed(() => store.state.sideNav.layoutMode);
    const checkMenuOnclick = computed(() => store.state.sideNav.menuClick);
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
    return {
        changeMobileMenuState,
        changeStaticMenuInactive,
        changeLayoutMode,
        overlayMenuActive,
        layoutMode,
        mobileMenuActive,
        staticMenuInactive,
        changeOverlayMenuState,
        changeOverMenuState,
        changeMobileState,
        changeMenuOnclick,
        checkMenuOnclick
    }
}

