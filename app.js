
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

    document.getElementById('gamesBtn').onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('gamesContainer').style.display = 'flex';
        
        let gamesOutline = document.getElementById('gamesOutline');
        let chestGame = document.getElementById('chestGame');
        let headerText = document.getElementById('gamesHeader');
        let chestBG = document.getElementById('chestBG');
        let chestBG2 = document.getElementById('chestBG2');
        let chestMenu = document.getElementById('chestMenu');

        let goldenChestMenu = document.getElementById('goldenChestMenu');
        let mythicChestMenu = document.getElementById('mythicChestMenu');

        let goldenChestIMG = document.getElementById('goldenChestIMG');
        let goldenChestClass = document.getElementById('goldenChestClass');

        let goldenPopUP = document.getElementById('popUPGoldenChest');
        let mythicPopUP = document.getElementById('popUPMythicChest');
        let goldenOpenBtn = document.getElementById('openGoldenChest');
        let goldenGetBtn = document.getElementById('getGoldenChest');
        let mythicGetBtn = document.getElementById('getMythicChest');

        chestBG2.style.display = 'none';
        mythicChestMenu.style.boxShadow = 'none';

        mythicGetBtn.onclick = function() {
            mythicPopUP.style.display = 'flex';
        }

        mythicChestMenu.onclick = function() {
            goldenChestMenu.style.boxShadow = 'none';
            chestBG.style.display = 'none';
            chestBG2.style.display = 'flex';
        }

        goldenOpenBtn.onclick = function() {
            goldenChestClass.className = 'mainChest2';
            goldenOpenBtn.style.display = 'none';
            goldenGetBtn.style.display = 'none';

            setTimeout(function() {
                goldenChestClass.className = 'mainChest';
                goldenChestIMG.src = './images/Chest-G-Opened.png'; 
                goldenPopUP.style.display = 'flex';
                goldenOpenBtn.style.display = 'flex';
                goldenGetBtn.style.display = 'flex';}
            ,1000);
        };

        chestGame.onclick = function() {
            gamesOutline.style.display = 'none';
            headerText.textContent = `Lucky Chest`;
            chestMenu.style.display = 'flex';
            chestBG.style.display = 'flex';
        };
        const AdController = window.Adsgram.init({ blockId: "785", debug: true});
        goldenGetBtn.onclick = function() {
            AdController.show().then((result) => {
                goldenChestIMG.src = './images/Chest-G-Closed.png';
            }).catch((result) => {
                goldenChestIMG.src = './images/Chest-G-Opened.png';
            })
        }
    }

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
    const kingdomsTrigger = document.getElementById('kingdomsBtn');

    kingdomsTrigger.onclick = function() {
        cardsBtn = document.getElementById('btnCards');
        popUpCards = document.getElementById('popUPKingdomsCards');
        document.getElementById('kingdomsContainer').style.display = 'flex';
        let cardQueen = document.getElementById('cardQueen');
        let cardKing = document.getElementById('cardKing');
        // let BackButton = tg.WebApp.BackButton;
        // BackButton.show();
        // BackButton.onClick(function() {
        //     BackButton.hide();
        //     document.getElementById('kingdomsContainer').style.display = 'none';
        //     document.getElementById('mainContainer').style.display = 'block';
        // });

        let upgradeWindow = document.getElementById('cardUpgrade');
        let upgradeCardName = document.getElementById('upgradeCardName');
        let upgradeCardImg = document.getElementById('upgradeCardImg');
        let upgradeCardIncome = document.getElementById('upgradeCardIncome');
        let upgradeCardPrice = document.getElementById('upgradeCardPrice');

        cardsBtn.onclick = function() {
            popUpCards.style.display = 'flex';
        }

        let getValues = function(type, level) {
            let green = new Map();
            green.set(0, [0,0]);
            green.set(1, [50,500]);
            green.set(2, [60,850]);
            green.set(3, [70,1445]);
            green.set(4, [90,2457]);
            green.set(5, [110,4177]);
            green.set(6, [130,7101]);
            green.set(7, [170,12072]);
            green.set(8, [210,20522]);
            green.set(9, [250,34887]);
            green.set(10, [290,1131308]);

            if (type === "green") {
                return (green.get(level + 1)[1]) - (green.get(level)[1])
            }
        };

        let setClock = function() {
            // Set the deadline to 5 minutes from now
            let deadline = new Date(Date.now() + 2 * 60 * 1000);
            let checkDeadline = localStorage.getItem('card_queen_deadline');
            if (checkDeadline === undefined || checkDeadline === null || checkDeadline === "") {
                localStorage.setItem('card_queen_deadline', deadline);  
            } else {
                deadline = localStorage.getItem('card_queen_deadline');  
            }
            // Function to update the countdown
            function updateCountdown() {
                let now = new Date();
                let remainingTime = deadline - now; // Calculate remaining time in milliseconds

                if (remainingTime <= 0) {
                    localStorage.removeItem('card_queen_timer');
                    localStorage.removeItem('card_queen_deadline');
                    sessionStorage.removeItem('card_queen_timer');
                    clearInterval(countdownInterval);
                    console.log("Time's up!");
                    return;
                }

                // Calculate minutes and seconds
                let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
                let seconds = Math.floor((remainingTime / 1000) % 60);

                // Format minutes and seconds to always show two digits
                let formattedMinutes = String(minutes).padStart(2, '0');
                let formattedSeconds = String(seconds).padStart(2, '0');
                localStorage.setItem('card_queen_timer',`${formattedMinutes} : ${formattedSeconds}`)
                // Display the countdown
                upgradeCardPrice.textContent = localStorage.getItem('card_queen_timer');
            }

            let nowCheck = new Date(Date.now());

            if (nowCheck < deadline) {
                // Update the countdown every second
                var countdownInterval = setInterval(updateCountdown, 1000);

                // Initial call to display the countdown immediately
                updateCountdown();
            } else {
                upgradeCardPrice.textContent = `HELLO`;
                localStorage.removeItem('card_queen_timer');
                localStorage.removeItem('card_queen_deadline');
                sessionStorage.removeItem('card_queen_timer');
            }
        }

        let compressValues = function(num) {
            let round = (num) => Math.round(num * 100) / 100;
            if (num < 1000) {
                return `${num}`
            }
            if (num >= 1000 && num < 1000000) {
                return `${round(num / 1000)}k`
            }
            if (num >= 1000000) {
                return `${round(num / 1000000)}M`
            }
        }
        
        let setUpUpgrade = function(type) {
            upgradeWindow.style.display = 'flex';
            let cardName = type.charAt(0).toUpperCase() + type.slice(1)
            upgradeCardName.textContent = cardName;
            upgradeCardImg.src = `./images/card_${type}.png`;
            let numValue = getValues('green', 9);
            upgradeCardIncome.textContent = `+${compressValues(numValue)}`;

            let checker = localStorage.getItem('card_queen_timer');

            // значит что таймер УЖЕ установлен
            if (checker !== undefined && checker !== null && checker !== "") {
                // Проверяю, что юзер в прошлой сессии
                let checkSession = sessionStorage.getItem('card_queen_timer');
                if (checkSession === undefined || checkSession === null || checkSession === "") {
                    // значит он в новой сессии (перезашел), надо заного установить часы, else = они уже работают
                    sessionStorage.setItem('card_queen_timer', '1');
                    setClock();
                };
                
            } else {  // значит что таймер НЕ установлен
                localStorage.setItem('card_queen_timer', '02:00');
                sessionStorage.setItem('card_queen_timer', '1');
                setClock();
            }
        };

        cardQueen.onclick = function() {
            let x2 = document.getElementById('X_Cards2');
            document.getElementById('allCards').style.display = 'none';
            setUpUpgrade('queen');
            document.getElementById('cardsMenu').style.display = 'none';
            document.getElementById('X_Cards').style.display = 'none';
            x2.style.display = 'flex';
            x2.onclick = function() {
                document.getElementById('allCards').style.display = 'flex';
                upgradeWindow.style.display = 'none';
                document.getElementById('cardsMenu').style.display = 'grid';
                x2.style.display = 'none';
                document.getElementById('X_Cards').style.display = 'flex';
            };
        };

        cardKing.onclick = function() {
            let x2 = document.getElementById('X_Cards2');
            document.getElementById('allCards').style.display = 'none';
            setUpUpgrade('king');
            document.getElementById('cardsMenu').style.display = 'none';
            document.getElementById('X_Cards').style.display = 'none';
            x2.style.display = 'flex';
            x2.onclick = function() {
                document.getElementById('allCards').style.display = 'flex';
                upgradeWindow.style.display = 'none';
                document.getElementById('cardsMenu').style.display = 'grid';
                x2.style.display = 'none';
                document.getElementById('X_Cards').style.display = 'flex';
            };
        };
    };

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