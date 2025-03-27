import { h } from 'preact';
import register from 'preact-custom-element';
import LoginForm from './components/LoginForm';
import MenuForm from './components/MenuForm';
import PocketBase from 'pocketbase';

window.pb = new PocketBase();

const refreshAuth = async () => {
    const pathname = window.location.pathname;
    if (!pb.authStore.token) {
        return;
    }
    if (pathname !== '/login' && pathname !== '/logout') {
        try {
            const token = await pb.collection(pb.authStore.record.collectionId).authRefresh();
        } catch (err) {
            pb.authStore.clear();
        }
    } else {
        pb.authStore.clear();
    }
}

refreshAuth();

// Register LoginForm as a Web Component <login-form>
register(LoginForm, 'login-form', ['label']);

// Register MenuForm as a Web Component <menu-form>
register(MenuForm, 'menu-form', ['label']);