import TonConnectUI from '@tonconnect/ui'

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://vladimirwind.github.io/testing_laba2/tonconnect-manifest.json',
    buttonRootId: 'ton-connects'
});

tonConnectUI.uiOptions = {
    language: 'ru',
    uiPreferences: {
        theme: THEME.DARK
    }
};