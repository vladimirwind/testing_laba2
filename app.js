document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        
    };
    sessionStorage.setItem('leaguePage', 1)
    const leagueTrigger = document.getElementById('leagueBtn');
    leagueTrigger.addEventListener('click', function() {
            
        window.location.href = './leagues/1.' + 'html';
            
    });

    const earnTrigger = document.getElementById('earner');
    earnTrigger.addEventListener('click', function() {
            
        window.location.href = './earn-page/earn.' + 'html';
            
    });
   
});