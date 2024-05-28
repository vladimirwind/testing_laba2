document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        
    };
    document.getElementById('rightArrow').onclick = function() {
        let num = sessionStorage.getItem('leaguePage')
        if (num < 3) {
            sessionStorage.setItem('leaguePage', num + 1)
            window.location.href = (parseInt(num) + 1).toString() + '.html';
        }
    }

    document.getElementById('leftArrow').onclick = function() {
        let num1 = sessionStorage.getItem('leaguePage')
        if (num1 > 1) {
            sessionStorage.setItem('leaguePage', num1 - 1)
            window.location.href = (parseInt(num1) - 1).toString() + '.html';
        }
    }
});