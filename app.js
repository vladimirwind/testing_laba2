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
        let invtMe = document.getElementById('inviteMe');
        invtMe.onclick = function() {
            document.getElementById('mainContainer').style.display = 'block';
            document.getElementById('frensContainer').style.display = 'none';
        };
        refsMenu.style.boxShadow = 'none';

        let someData = JSON.parse(sessionStorage.getItem('frensInfo'));
        
        let topFrensInfo = someData["refs_arr"];
        let topRefsInfo = someData["tops_arr"];
        let BackButton = tg.WebApp.BackButton;

        BackButton.show();
        BackButton.onClick(function() {
            BackButton.hide();
            frensTOP.style.display = 'flex';
            refsTOP.style.display = 'none';
            refsMenu.style.boxShadow = "none";
            frensMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
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

    document.getElementById('boostsBtn').onclick = function() {
        let BoostMinePopUp = document.getElementById('popUPBoostMine');
        let BoostBrewPopUp = document.getElementById('popUPBoostBrew');
        let BoostRobotPopUp = document.getElementById('popUPBoostRobot');
        let BuyMinePopUp = document.getElementById('popUPBuyMine');
        let BuyPotPopUp = document.getElementById('popUPBuyPot');

        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('boostsContainer').style.display = 'flex';

        let boostPickaxe = document.getElementById('boostPickaxe');
        let boostBrew = document.getElementById('boostBrew');
        let boostRobot = document.getElementById('boostRobot');
        let buyMine = document.getElementById('buyMine');
        let buyPot = document.getElementById('buyPot');

        let BackButton = tg.WebApp.BackButton;

        BackButton.show();
        BackButton.onClick(function() {
            BoostMinePopUp.style.display = 'none';
            BoostBrewPopUp.style.display = 'none';
            BoostRobotPopUp.style.display = 'none';

            document.getElementById('boostsContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            BackButton.hide();
        });
        
        function Show_Boost_Pickaxe() {
            boostBrew.removeEventListener("click", Show_Boost_Brew);
            boostRobot.removeEventListener("click", Show_Boost_Robot);

            let claimBtn = document.getElementById('claim_BoosterMine')
            let XClose = document.getElementById('X_BoosterMine');
            XClose.onclick = function() { 
                boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
                BoostMinePopUp.style.display = 'none';

                boostBrew.addEventListener("click", Show_Boost_Brew);
                boostRobot.addEventListener("click", Show_Boost_Robot);
            };
            boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
            BoostMinePopUp.style.display = 'flex';
            // var date = new Date();
            // date.setMinutes(date.getMinutes()+20);
            // localStorage.setItem('expireMine', date)
            // localStorage.setItem('expireMine', new Date().setMinutes(new Date().getMinutes()+5));
            let currentDate = Date.parse(new Date());
            let lastDate = parseInt(localStorage.getItem('expireMine'));
            
            if ((currentDate > lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate)))
            {
                claimBtn.style.opacity = '1';
                claimBtn.onclick = function() {
                    BoostMinePopUp.style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                    document.getElementById('boostsContainer').style.display = 'none';
                    let expirationTime = new Date().getTime() + (1 * 60 * 1000);
                    localStorage.setItem('expireMine', expirationTime);
                    claimBtn.style.opacity = '0.5';
                };
            } else if (lastDate === undefined || lastDate === null || isNaN(lastDate)) {
                claimBtn.onclick = function() {
                    BoostMinePopUp.style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                    document.getElementById('boostsContainer').style.display = 'none';
                    let expirationTime = new Date().getTime() + (1 * 60 * 1000);
                    localStorage.setItem('expireMine', expirationTime);
                    claimBtn.style.opacity = '0.5';
                }; 
            } else if ((currentDate < lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate))) {
                claimBtn.style.opacity = '0.5';
                claimBtn.onclick = function() {
                }; 
            }
        };

        function Show_Boost_Brew() {
            boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
            boostRobot.removeEventListener("click", Show_Boost_Robot);

            let claimBtn = document.getElementById('claim_BoosterBrew')
            let XClose = document.getElementById('X_BoosterBrew');
            XClose.onclick = function() { 
                boostBrew.addEventListener("click", Show_Boost_Brew);
                BoostBrewPopUp.style.display = 'none';

                boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
                boostRobot.addEventListener("click", Show_Boost_Robot);
            };
            boostBrew.removeEventListener("click", Show_Boost_Brew);
            BoostBrewPopUp.style.display = 'flex';

            let currentDate = Date.parse(new Date());
            let lastDate = parseInt(localStorage.getItem('expireBrew'));
            
            if ((currentDate > lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate)))
            {
                claimBtn.style.opacity = '1';
                claimBtn.onclick = function() {
                    BoostBrewPopUp.style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                    document.getElementById('boostsContainer').style.display = 'none';
                    let expirationTime = new Date().getTime() + (1 * 60 * 1000);
                    localStorage.setItem('expireBrew', expirationTime);
                    claimBtn.style.opacity = '0.5';
                };
            } else if (lastDate === undefined || lastDate === null || isNaN(lastDate)) {
                claimBtn.onclick = function() {
                    BoostBrewPopUp.style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                    document.getElementById('boostsContainer').style.display = 'none';
                    let expirationTime = new Date().getTime() + (1 * 60 * 1000);
                    localStorage.setItem('expireBrew', expirationTime);
                    claimBtn.style.opacity = '0.5';
                }; 
            } else if ((currentDate < lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate))) {
                claimBtn.style.opacity = '0.5';
                claimBtn.onclick = function() {
                }; 
            }
        };

        function Show_Boost_Robot() {
            boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
            boostBrew.removeEventListener("click", Show_Boost_Brew);

            let claimBtn = document.getElementById('claim_BoosterRobot');
            let newsBtn = document.getElementById('news_btn');
            let XClose = document.getElementById('X_BoosterRobot');
            XClose.onclick = function() {
                BoostRobotPopUp.style.display = 'none';
                boostRobot.addEventListener("click", Show_Boost_Robot);

                boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
                boostBrew.addEventListener("click", Show_Boost_Brew);
            };
            BoostRobotPopUp.style.display = 'flex';
            newsBtn.onclick = function() {
                window.location.href = 'https://t.me/gemseee'
            }
        };

        function Show_Buy_Mine() {
            boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
            boostBrew.removeEventListener("click", Show_Boost_Brew);
            boostRobot.removeEventListener("click", Show_Boost_Robot);

            BuyMinePopUp.style.display = 'flex';
            let XClose = document.getElementById('X_BuyMine');
            XClose.onclick = function() {
                BuyMinePopUp.style.display = 'none';

                boostRobot.addEventListener("click", Show_Boost_Robot);
                boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
                boostBrew.addEventListener("click", Show_Boost_Brew);
            };
        }

        function Show_Buy_Pot() {
            boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
            boostBrew.removeEventListener("click", Show_Boost_Brew);
            boostRobot.removeEventListener("click", Show_Boost_Robot);
            buyMine.removeEventListener("click", Show_Buy_Mine);

            let someData = JSON.parse('{"cauldron_level":2, "mine_level": 2}');

            BuyPotPopUp.style.display = 'flex';

            let XClose = document.getElementById('X_BuyPot');
            XClose.onclick = function() {
                BuyPotPopUp.style.display = 'none';

                boostRobot.addEventListener("click", Show_Boost_Robot);
                boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
                boostBrew.addEventListener("click", Show_Boost_Brew);
                buyMine.addEventListener("click", Show_Buy_Mine);
            };

            function SetUp() {
                let cauldron_level = someData['cauldron_level'];
                document.getElementById('essenceAmntBefore').textContent = `${cauldron_level} essence/min`;
                document.getElementById('essenceAmntAfter').textContent = `${cauldron_level + 1} essence/min`;

                document.getElementById('essenceMinBefore').textContent = `${120*cauldron_level} mins`;
                document.getElementById('essenceMinAfter').textContent = `${120*(cauldron_level+1)} mins`;
            }
            SetUp();
        }

        boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
        boostBrew.addEventListener("click", Show_Boost_Brew);
        boostRobot.addEventListener("click", Show_Boost_Robot);
        buyMine.addEventListener("click", Show_Buy_Mine);
        buyPot.addEventListener("click", Show_Buy_Pot);
    }

    const essenceTrigger = document.getElementById('popup-essence');
    const mineTrigger = document.getElementById('popup-mine');

    async function getEssence() {
        try {
            let res3 = await fetch('https://jsonplaceholder.typicode.com/posts'  /*baza + `/essence/level`*/, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': tknBearer
            },
        });
        if (!res3.ok) {
            throw new Error(`Error! status: ${res3.status}`);
        }
        let myEssenceRes = await res3.json();
        return myEssenceRes;
        } catch (err) {
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        };
    };

    async function getMiner() {
        try {
            let res3 = await fetch('https://jsonplaceholder.typicode.com/posts'  /*baza + `/essence/level`*/, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': tknBearer
            },
        });
        if (!res3.ok) {
            throw new Error(`Error! status: ${res3.status}`);
        }
        let myEssenceRes = await res3.json();
        return myEssenceRes;
        } catch (err) {
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        };
    };

    
    essenceTrigger.onclick = function() {
        getEssence().then(myEssenceRes => {
            if (true) {
                let esncData = myEssenceRes.data;

                esncData = JSON.parse(`{"level":2, "currentEssence":239, "maxEssence":240, "boost":true}`)

                let BackButton = tg.WebApp.BackButton;
                BackButton.show();
                BackButton.onClick(function() {
                    BackButton.hide();
                    document.getElementById('essenceContainer').style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                });

                document.getElementById('mainContainer').style.display = 'none';
                document.getElementById('essenceContainer').style.display = 'flex';

                let startBtn = document.getElementById('startEssence');

                if (esncData["currentEssence"] >= esncData["maxEssence"]) {
                    startBtn.onclick = function() {
                        BackButton.hide();
                        document.getElementById('essenceContainer').style.display = 'none';
                        document.getElementById('mainContainer').style.display = 'block';
                    }
    
                } else {
                    startBtn.onclick = function(){};
                    startBtn.style.opacity = '0.5'; 
                }
               
                function SetUp() {
                    document.getElementById('essenceLVL').textContent = `Level: ${esncData["level"]}`;
                    if (esncData["boost"] === true) {
                        document.getElementById('essence1Min').textContent = `${esncData["level"] * 2} per minute (x2)`;
                    } else {
                        document.getElementById('essence1Min').textContent = `${esncData["level"]} per minute`;
                    }
                    
                    document.getElementById('essenceTimeLeft').textContent = `Time left: ${esncData["maxEssence"] - esncData["currentEssence"]}`;

                    document.getElementById('essenceToFull').textContent = `${esncData["currentEssence"]} / ${esncData["maxEssence"]}`;

                    let devider = esncData["currentEssence"]/esncData["maxEssence"];
                    let num = Math.floor(devider * 100);
                    if (num >= 100) {
                        num = 100
                    } else if (num <= 0) {
                        num = 0
                    }

                    document.getElementById('essenceProgress').style.width = `${num}%`;
                    
                }

                SetUp()
            };
        });
    };

    mineTrigger.onclick = function() {
        getMiner().then(myMinerRes => {
            if (true) {
                let minerData = myMinerRes.data;
                minerData = JSON.parse(`{"level":1, "boost":false, "time_left": 0, "need_essence": 240, "total_essence": 240}`)

                let BackButton = tg.WebApp.BackButton;
                BackButton.show();
                BackButton.onClick(function() {
                    BackButton.hide();
                    document.getElementById('mineContainer').style.display = 'none';
                    document.getElementById('mainContainer').style.display = 'block';
                });

                document.getElementById('mainContainer').style.display = 'none';
                document.getElementById('mineContainer').style.display = 'flex';

                let startBtn = document.getElementById('startMine');

                if ((minerData["total_essence"] >= minerData["need_essence"]) && (minerData["time_left"] <= 0)) {
                    startBtn.onclick = function() {
                        BackButton.hide();
                        // document.getElementById('mineContainer').style.display = 'none';
                        // document.getElementById('mainContainer').style.display = 'block';
                        let islandImg = document.getElementById('mineIsland');
                        islandImg.src = './images/desertPot.png'
                    }
                } else {
                    startBtn.onclick = function(){};
                    startBtn.style.opacity = '0.5';
                }

                function SetUp() {
                    document.getElementById('mineLVL').textContent = `Level: ${minerData["level"]}`;

                    if (minerData["boost"] === true) {
                        document.getElementById('mine1Min').textContent = `${minerData["level"] * 2} per minute (x2)`;
                    } else {
                        document.getElementById('mine1Min').textContent = `${minerData["level"]} per minute`;
                    }

                    document.getElementById('mineTimeLeft').textContent = `Time left: ${minerData["time_left"]}`;

                    document.getElementById('essenceToStart').textContent = `${minerData["need_essence"]} to start`;
                }

                SetUp()
            };
        });
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