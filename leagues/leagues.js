document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        
    };
    document.getElementById('rightArrow').onclick = function() {
        let num = sessionStorage.getItem('leaguePage')
        num = parseInt(num)
        if (num < 3) {
            sessionStorage.setItem('leaguePage', num + 1)
            window.location.href = (num + 1).toString() + '.html';
        }
    }

    document.getElementById('leftArrow').onclick = function() {
        let num1 = sessionStorage.getItem('leaguePage')
        num1 = parseInt(num1)
        if (num1 > 1) {
            sessionStorage.setItem('leaguePage', num1 - 1)
            window.location.href = (num1 - 1).toString() + '.html';
        }
    }
});