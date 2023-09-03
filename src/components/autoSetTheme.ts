
export default function autoSetTheme() {
    const setTheme = (theme: string) => {
        document.querySelector('html').setAttribute('data-bs-theme', theme);
    }
    const getPreferredTheme = (): string => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(getPreferredTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setTheme(getPreferredTheme());
    });
}
