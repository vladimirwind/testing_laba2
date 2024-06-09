document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        
    };
    
    document.getElementById('frensBtn').onclick = function() {
        sessionStorage.setItem('frensInfo', `{"num_of_refs": 3, "total": 6000, "refs_arr": [{"full_name": "Muhhamad R","league": "br"},{"full_name": "Muhhamad B","league": "sr"},{"full_name": "Muhhamad Z","league": "gd"}], "tops_arr": [{"full_name": "iducky","num": 1232131},{"full_name": "liot","num": 1220},{"full_name": "liot2","num": 120},{"full_name": "liot3","num": 10},{"full_name": "liot4","num": 0}]}`);
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('frensContainer').style.display = 'flex';
        let refsTOP = document.getElementById('refsTOP');
        let frensTOP = document.getElementById('frensTOP');

        refsTOP.style.display = 'none';
        let refsMenu = document.getElementById('topRefsBtn');
        let frensMenu = document.getElementById('topFrensBtn');
        refsMenu.style.boxShadow = 'none';

        let someData = JSON.parse(sessionStorage.getItem('frensInfo'));
        
        let topFrensInfo = someData["refs_arr"];
        let topRefsInfo = someData["tops_arr"];
        let BackButton = tg.WebApp.BackButton;

        BackButton.show();
        BackButton.onClick(function() {
            BackButton.hide();
            document.getElementById('frensContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
        });

        for (let ij = 0; ij < topFrensInfo.length; ij++) {
            let docStrName =  `topFrensName_${ij+1}`
            // let docStrNumber =  `topReffererNumber_${ij+1}`
            document.getElementById(docStrName).textContent = topFrensInfo[ij]["full_name"];
            let imageLeague = document.getElementById(`FrenLeague_${ij+1}`);
            if (topFrensInfo[ij]["league"] === "sr") {
                imageLeague.src = './images/Silver_League.png';
            } else if (topFrensInfo[ij]["league"] === "gd") {
                imageLeague.src = './images/Golden_League.png';
            }
            // document.getElementById(docStrNumber).textContent = topFrensInfo[ij]["num"];
        }

        for (let ij = 0; ij < topRefsInfo.length; ij++) {
            let docStrName =  `topReffererName_${ij+1}`
            let docStrNumber =  `topReffererNumber_${ij+1}`
            document.getElementById(docStrName).textContent = topRefsInfo[ij]["full_name"];
            document.getElementById(docStrNumber).textContent = topRefsInfo[ij]["num"];
        }

        refsMenu.onclick = function() {
            frensTOP.style.display = 'none';
            refsTOP.style.display = 'flex';
            refsMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
            frensMenu.style.boxShadow = "none";
        }

        frensMenu.onclick = function() {
            frensTOP.style.display = 'flex';
            refsTOP.style.display = 'none';
            refsMenu.style.boxShadow = "none";
            frensMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        }
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