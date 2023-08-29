import { ref, watch } from 'vue';

// MediaQueryList
const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
const darkMode = ref(false);

// update dark mode
darkModePreference?.addEventListener('change', e => (darkMode.value = e.matches));
watch(darkMode, newVal => {
    document.documentElement.classList.toggle('dark', newVal);
    sessionStorage.setItem('dark', darkMode.value ? 'dark' : 'light');
});

const sessionValue = sessionStorage.getItem('dark');
switch (sessionValue) {
    case 'dark':
        darkMode.value = true;
        break;
    case 'light':
        darkMode.value = false;
        break;
    default:
        darkMode.value = darkModePreference?.matches || false;
        break;
}

export default darkMode;
