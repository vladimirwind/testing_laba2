document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    particlesJS();
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        
    };
});