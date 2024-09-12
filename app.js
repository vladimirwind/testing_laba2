
document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();
        Object.entries(tg.WebApp.initDataUnsafe).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    };

    let popUPIncome = document.getElementById('popUPIncome');
    popUPIncome.style.display = 'flex';
    xIncome = document.getElementById('X_Income');
    xIncome.onclick = function() {popUPIncome.style.display = 'none';};
       
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
        let wheelGame = document.getElementById('wheelGame');
        let headerText = document.getElementById('gamesHeader');
        let chestBG = document.getElementById('chestBG');
        let wheelBG = document.getElementById('wheelBG');
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

        let wheelIMG = document.getElementById('wheelIMG');
        let spinWheelBtn = document.getElementById('spinWheelBtn');

        let smoothSpin = function() {
            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        
            let randomNumber = getRandomNumber(-10, 10);
           
            let totalRotations = 1080 + 180 + randomNumber; // Total degrees to spin
            let duration = 3000; // Total duration of the spin in milliseconds
            let frames = 1000; // Number of frames for the animation
            let interval = duration / frames; // Time between each frame

            // Spin the wheels
            for (let i = 0; i <= frames; i++) {
                setTimeout(function() {

                    let currentRotation = (totalRotations * (i / frames)) % 360; // Calculate current rotation
                  
                    wheelIMG.style.transform = `rotate(${currentRotation}deg)`; // Apply the rotation
              
                }, i * interval);
            }
        };
        
        wheelGame.onclick = function() {
            gamesOutline.style.display = 'none';
            headerText.textContent = `Lucky Wheel`;
            wheelBG.style.display = 'flex';
            spinWheelBtn.onclick = function() {
                
                spinWheelBtn.style.display = 'none';

                wheelIMG.style.transform = `rotate(${0}deg)`;

                setTimeout(function() {
                    smoothSpin();
                }, 1000);

                setTimeout(function() {
                    spinWheelBtn.style.display = 'flex';
                }, 5100);
            };
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

        var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
        var eventName = isOnIOS ? "pagehide" : "beforeunload";
        window.addEventListener(eventName, function (event) {
            sessionStorage.removeItem('card_queen_timer');
            sessionStorage.removeItem('card_king_timer');
            sessionStorage.removeItem('card_worker_timer');
            sessionStorage.removeItem('card_trader_timer');
            sessionStorage.removeItem('card_prince_timer');
            sessionStorage.removeItem('card_princess_timer');
            sessionStorage.removeItem('card_wizard_timer');
            sessionStorage.removeItem('card_witch_timer');
            sessionStorage.removeItem('card_dragon_timer');
            sessionStorage.removeItem('card_soldier_timer');
            sessionStorage.removeItem('card_knight_timer');
        });
            
        let processCards = function() {

            let cardsBtn = document.getElementById('btnCards');
            let popUpCards = document.getElementById('popUPKingdomsCards');
            document.getElementById('kingdomsContainer').style.display = 'flex';
            let cardQueen = document.getElementById('cardQueen');
            let cardKing = document.getElementById('cardKing');
            let cardPrince = document.getElementById('cardPrince');
            let cardPrincess = document.getElementById('cardPrincess');
            let cardTrader = document.getElementById('cardTrader');
            let cardWorker = document.getElementById('cardWorker');
            let cardDragon = document.getElementById('cardDragon');
            let cardWitch = document.getElementById('cardWitch');
            let cardWizard = document.getElementById('cardWizard');
            let cardSoldier = document.getElementById('cardSoldier');
            let cardKnight = document.getElementById('cardKnight');

            let menuEmpire = document.getElementById('menuEmpire');
            let menuArmy = document.getElementById('menuArmy');
            let menuMagic = document.getElementById('menuMagic');
            let menuSpecial = document.getElementById('menuSpecial');

            let upgradeWindow = document.getElementById('cardUpgrade');
            let upgradeCardName = document.getElementById('upgradeCardName');
            let upgradeCardImg = document.getElementById('upgradeCardImg');
            let upgradeCardIncome = document.getElementById('upgradeCardIncome');
            let upgradeCardPower = document.getElementById('upgradeCardPower');
            let upgradeCardPrice = document.getElementById('upgradeCardPrice');

            let allCardsEmpire = document.getElementById('allCardsEmpire');
            let allCardsArmy = document.getElementById('allCardsArmy');
            let allCardsMagic = document.getElementById('allCardsMagic');
            let allCardsSpecial = document.getElementById('allCardsSpecial');

            //added
            let dailyBtn = document.getElementById('dailyComboBtn');
            let dailyWindow = document.getElementById('popUPDailyCombo');
            let closeDaily = document.getElementById('X_Daily');
            let checkComboBtn = document.getElementById('checkComboBtn');

            let queenDaily = document.getElementById('queenDaily');
            let kingDaily = document.getElementById('kingDaily');
            let princeDaily = document.getElementById('princeDaily');
            let princessDaily = document.getElementById('princessDaily');
            let wizardDaily = document.getElementById('wizardDaily');
            let witchDaily = document.getElementById('witchDaily');
            let soldierDaily = document.getElementById('soldierDaily');
            let knightDaily = document.getElementById('knightDaily');

            let firstCombo = document.getElementById('1Combo');
            let secondCombo = document.getElementById('2Combo');
            let thirdCombo = document.getElementById('3Combo');

            let reqBody = {
            };

            checkComboBtn.onclick = function() {

                let JSONdata = JSON.parse(sessionStorage.getItem('cardsInfo'));
                
                if (JSONdata["combo_flag"] === true) {
                    tg.WebApp.showAlert('Come back tomorrow!');
                    return
                };

                let fieldCount = Object.keys(reqBody).length;
                if (fieldCount < 3) {
                    tg.WebApp.showAlert('Choose 3 different cards!');
                    return
                };
                
                if ((reqBody.first === reqBody.second) || (reqBody.first === reqBody.third) ||
                (reqBody.second === reqBody.third)) {
                    tg.WebApp.showAlert('Choose 3 different cards!');
                    return
                };

                if (true) {
                    let response = '{"first": true, "second": true, "third": false}'
                    let respJSON = JSON.parse(response);
                    if (respJSON["first"]) {
                        firstCombo.style.outlineStyle = 'solid';
                        firstCombo.style.outlineColor = '#98FFAF';
                        firstCombo.style.outlineWidth = 'medium';
                        firstCombo.style.borderRadius = '12px';
                    } else {
                        firstCombo.style.outlineStyle = 'solid';
                        firstCombo.style.outlineColor = 'red';
                        firstCombo.style.outlineWidth = 'medium';
                        firstCombo.style.borderRadius = '12px';
                    };
                    if (respJSON["second"]) {
                        secondCombo.style.outlineStyle = 'solid';
                        secondCombo.style.outlineColor = '#98FFAF';
                        secondCombo.style.outlineWidth = 'medium';
                        secondCombo.style.borderRadius = '12px';
                    } else {
                        secondCombo.style.outlineStyle = 'solid';
                        secondCombo.style.outlineColor = 'red';
                        secondCombo.style.outlineWidth = 'medium';
                        secondCombo.style.borderRadius = '12px';
                    };
                    if (respJSON["third"]) {
                        thirdCombo.style.outlineStyle = 'solid';
                        thirdCombo.style.outlineColor = '#98FFAF';
                        thirdCombo.style.outlineWidth = 'medium';
                        thirdCombo.style.borderRadius = '12px';
                    } else {
                        thirdCombo.style.outlineStyle = 'solid';
                        thirdCombo.style.outlineColor = 'red';
                        thirdCombo.style.outlineWidth = 'medium';
                        thirdCombo.style.borderRadius = '12px';
                    };
                } else {
                    tg.WebApp.showAlert('Come back tomorrow!');
                    return
                }
            };

            let placeCard = function(type) {
                let path = `./images/cards/card_${type}.png`;
                let defaultPath = `/images/combo_green.png`;
                if (firstCombo.src.endsWith(defaultPath)) {
                    reqBody.first = `card_${type}`;
                    firstCombo.src = path;
                } else if (secondCombo.src.endsWith(defaultPath)) {
                    reqBody.second = `card_${type}`;
                    secondCombo.src = path;
                } else if (thirdCombo.src.endsWith(defaultPath)) {
                    reqBody.third = `card_${type}`;
                    thirdCombo.src = path;
                }
                console.log(reqBody);
            };


            let infoDailyBtn = document.getElementById('infoDailyBtn');
            
            dailyBtn.onclick = function() {
                dailyWindow.style.display = 'flex';
                popUpCards.style.display = 'none';
                closeDaily.onclick = function() {
                    dailyWindow.style.display = 'none';
                };

                kingDaily.onclick = function() {
                    placeCard('king');
                }

                queenDaily.onclick = function() {
                    placeCard('queen');
                }

                princeDaily.onclick = function() {
                    placeCard('prince');
                }

                princessDaily.onclick = function() {
                    placeCard('princess');
                }

                wizardDaily.onclick = function() {
                    placeCard('wizard');
                }

                witchDaily.onclick = function() {
                    placeCard('witch');
                }

                soldierDaily.onclick = function() {
                    placeCard('soldier');
                }

                knightDaily.onclick = function() {
                    placeCard('knight');
                }

                firstCombo.onclick = function() {
                    firstCombo.src = `./images/combo_green.png`;
                    firstCombo.style.outline = 'none';
                };

                secondCombo.onclick = function() {
                    secondCombo.src = `./images/combo_green.png`;
                    secondCombo.style.outline = 'none';
                };

                thirdCombo.onclick = function() {
                    thirdCombo.src = `./images/combo_green.png`;
                    thirdCombo.style.outline = 'none';
                };

                infoDailyBtn.onclick = function() {
                    tg.WebApp.showPopup({
                        title  : 'Popup title',
                        message: 'You can find a daily combo here:',
                        buttons: [
                            {id: 'X', type: 'default', text: 'X / Twitter'},
                            {id: 'Vladlen TON', type: 'default', text: 'Vladlen TON'},
                            {type: 'cancel'},
                        ]
                    }, function (buttonId) {
                        if (buttonId === 'X') {
                            window.location.href = 'https://twitter.com/gemseeton';
                        } else if (buttonId === 'Vladlen TON') {
                            window.location.href = 'https://t.me/vladlenton';
                        };
                    });
                };
            };

            function updateDailyCountdown() {
                let now = new Date();
                // Get the current date in UTC
                let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
                
                // Set the target time to 00:00 UTC of the next day
                let targetDate = new Date(utcDate.setUTCHours(0, 0, 0, 0));
                
                // Calculate the difference in milliseconds
                let difference = targetDate - now;
            
                // Calculate days, hours, minutes, and seconds
                let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((difference % (1000 * 60)) / 1000);

                let formattedHours = String(hours).padStart(2, '0');
                let formattedMinutes = String(minutes).padStart(2, '0');
                let formattedSeconds = String(seconds).padStart(2, '0');
                // Update the countdown display
                document.getElementById('comboCountDown').textContent = 
                    `New combo in ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            
                // If the countdown is finished, reset it to the next day
                if (difference < 0) {
                    clearInterval(timer);
                    updateDailyCountdown(); // Reset immediately
                }
            }
            
            // Update the countdown every second
            let timer = setInterval(updateDailyCountdown, 1000);
            
            // Initial call to display the countdown immediately
            updateDailyCountdown();
        
            let BackButton = tg.WebApp.BackButton;
            BackButton.show();
            BackButton.onClick(function() {
                BackButton.hide();
                popUpCards.style.display = 'none';
                upgradeWindow.style.display = 'none';
                document.getElementById('cardsMenu').style.display = 'grid';
                menuArmy.style.boxShadow = 'none';
                menuMagic.style.boxShadow = 'none';
                menuSpecial.style.boxShadow = 'none';
                dailyWindow.style.display = 'none';
                document.getElementById('kingdomsContainer').style.display = 'none';
                document.getElementById('mainContainer').style.display = 'block';
            });

            allCardsEmpire.style.display = 'flex';

            cardsBtn.onclick = function() {
                popUpCards.style.display = 'flex';
            };

            let xPopUpBtn = document.getElementById('X_Cards');

            xPopUpBtn.onclick = function() {
                popUpCards.style.display = 'none';
            };


            menuEmpire.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';

            menuEmpire.onclick = function() {
                menuEmpire.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';
                menuArmy.style.boxShadow = 'none'
                menuMagic.style.boxShadow = 'none'
                menuSpecial.style.boxShadow = 'none'

                allCardsMagic.style.display = 'none';
                allCardsArmy.style.display = 'none';
                allCardsSpecial.style.display = 'none';
                allCardsEmpire.style.display = 'flex';
            };

            menuArmy.onclick = function() {
                menuArmy.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';
                menuMagic.style.boxShadow = 'none'
                menuSpecial.style.boxShadow = 'none'
                menuEmpire.style.boxShadow = 'none'

                allCardsArmy.style.display = 'flex';
                allCardsEmpire.style.display = 'none';
                allCardsSpecial.style.display = 'none';
                allCardsMagic.style.display = 'none';
            };

            menuMagic.onclick = function() {
                menuMagic.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px'
                menuSpecial.style.boxShadow = 'none'
                menuEmpire.style.boxShadow = 'none'
                menuArmy.style.boxShadow = 'none'

                allCardsEmpire.style.display = 'none';
                allCardsArmy.style.display = 'none';
                allCardsSpecial.style.display = 'none';
                allCardsMagic.style.display = 'flex';
            };

            menuSpecial.onclick = function() {
                menuSpecial.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px'
                menuMagic.style.boxShadow = 'none'
                menuEmpire.style.boxShadow = 'none'
                menuArmy.style.boxShadow = 'none'

                allCardsEmpire.style.display = 'none';
                allCardsArmy.style.display = 'none';
                allCardsMagic.style.display = 'none';
                allCardsSpecial.style.display = 'flex';
            };

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
            green.set(10, [290,59308]);

            let yellow = new Map();
            yellow.set(0, [0,0]);
            yellow.set(1, [150,1000]);
            yellow.set(2, [180,1850]);
            yellow.set(3, [216,3423]);
            yellow.set(4, [259,6333]);
            yellow.set(5, [311,11716]);
            yellow.set(6, [373,21675]);
            yellow.set(7, [448,40099]);
            yellow.set(8, [538,74183]);
            yellow.set(9, [646,137239]);
            yellow.set(10, [775,253892]);

            let orange = new Map();
            orange.set(0, [0,0]);
            orange.set(1, [320,1000]);
            orange.set(2, [368,2120]);
            orange.set(3, [423,4494]);
            orange.set(4, [486,9527]);
            orange.set(5, [559,20197]);
            orange.set(6, [643,42818]);
            orange.set(7, [739,90774]);
            orange.set(8, [850,192441]);
            orange.set(9, [978,407975]);
            orange.set(10, [1125,864907]);

            let red = new Map();
            red.set(0, [0,0]);
            red.set(1, [500,2000]);
            red.set(2, [600,4800]);
            red.set(3, [720,11520]);
            red.set(4, [864,27648]);
            red.set(5, [1037,66355]);
            red.set(6, [1244,159252]);
            red.set(7, [1493,382205]);
            red.set(8, [1792,917292]);
            red.set(9, [2150,1501501]);
            red.set(10, [2580,2283602]);

            let getValues = function(type, level) {

                if (type === "green") {
                    return (green.get(level + 1)[0]) - (green.get(level)[0])
                } else if (type === "red") {
                    return (red.get(level + 1)[0]) - (red.get(level)[0])
                } else if (type === "orange") {
                    return (orange.get(level + 1)[0]) - (orange.get(level)[0])
                } else if (type === "yellow") {
                    return (yellow.get(level + 1)[0]) - (yellow.get(level)[0])
                }
            };
            
            let checkTimer = async function(type) {

                let base = `card_${type}_`
                let checkDeadline = localStorage.getItem(base + 'deadline');
                let deadline = Date.now();
    
                if (deadline === null || deadline === undefined) {
                    localStorage.removeItem(base + 'deadline');
                    sessionStorage.removeItem(base + 'deadline');
                    return;
                }
    
                if (new Date(checkDeadline) < deadline) {
                    localStorage.removeItem(base + 'deadline');
                    sessionStorage.removeItem(base + 'deadline');
                    return;
                }
    
                let checker = localStorage.getItem(`card_${type}_timer`);
                // значит что таймер УЖЕ установлен
                if (checker !== undefined && checker !== null && checker !== "") {
                    // Проверяю, что юзер в прошлой сессии
                    let checkSession = sessionStorage.getItem(`card_${type}_timer`);
                    if (checkSession === undefined || checkSession === null || checkSession === "") {
                        // значит он в новой сессии (перезашел), надо заного установить часы, else = они уже работают
                        sessionStorage.setItem(`card_${type}_timer`, '1');
                        setClock(type);
                    } else {
                        setClock(type);
                    };
                    
                } else {  // значит что таймер НЕ установлен
                    localStorage.setItem(`card_${type}_timer`, '15:00');
                    sessionStorage.setItem(`card_${type}_timer`, '1');
                    setClock(type);
                }
            };
    
            const cardsGreen = ['princess', 'wizard'];
            const cardsRed = ['trader', 'soldier'];
            const cardsYellow = ['king', 'knight', 'dragon', 'witch'];
            const cardsOrange = ['queen', 'prince', 'worker'];

            const cardsEmpire = ['princess', 'queen', 'prince', 'worker', 'king', 'trader'];
    
            let setUpCardData = async function(type, myJSON) {
                

                if (myJSON[`card_${type}`] === 10 )  {
                    document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
                    document.getElementById(`cardBuyAmnt_${type}`).textContent = `max lvl`;
                    document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
                    if (cardsGreen.includes(type)) {
                        let tmpArr2 = green.get(10);
                        let tmpIncome = tmpArr2[0];
                        let tmpPower = tmpIncome * 3;
                        document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                        document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
                    };
                    if (cardsRed.includes(type)) {
                        let tmpArr2 = red.get(10);
                        let tmpIncome = tmpArr2[0];
                        let tmpPower = tmpIncome * 3;
                        document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                        document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
                    };
                    if (cardsOrange.includes(type)) {
                        let tmpArr2 = orange.get(10);
                        let tmpIncome = tmpArr2[0];
                        let tmpPower = tmpIncome * 3;
                        document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                        document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
                    };
                    if (cardsYellow.includes(type)) {
                        let tmpArr2 = yellow.get(10);
                        let tmpIncome = tmpArr2[0];
                        let tmpPower = tmpIncome * 3;
                        document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                        document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
                    };

                    return
                }

                if (cardsGreen.includes(type)) {
                    let tmpLvl = myJSON[`card_${type}`];
                    let tmpArr = green.get(tmpLvl + 1);
    
                    let flag1 = (myJSON["friends"] < 3 && type === 'princess')
                    let flag2 = (myJSON["friends"] < 5 && type === 'wizard')
                    
                    if (flag1 && type === 'princess') {
                        cardPrincess.onclick = function() {};
                        document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
                        document.getElementById(`cardBuyAmnt_${type}`).textContent = `3 frens`;
                    };
    
                    if (flag2 && type === 'wizard') {
                        cardWizard.onclick = function() {};
                        document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
                        document.getElementById(`cardBuyAmnt_${type}`).textContent = `5 frens`;
                    };
    
                    if (!flag1 && !flag2) {
                        document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
                    }
                   
                    document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
                    let tmpArr2 = green.get(tmpLvl);
                    let tmpIncome = tmpArr2[0];
                    let tmpPower = tmpIncome * 3;
                    document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                    document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

                    if (cardsEmpire.includes(`${type}`)) {
                        if (myJSON["essence_balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    } else {
                        if (myJSON["balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    };
                    
                } else if (cardsRed.includes(type)) {
                    let tmpLvl = myJSON[`card_${type}`];
                    let tmpArr = red.get(tmpLvl + 1);
                    document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
                    document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
                    let tmpArr2 = red.get(tmpLvl);
                    let tmpIncome = tmpArr2[0];
                    let tmpPower = tmpIncome * 3;
                    document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                    document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

                    if (cardsEmpire.includes(`${type}`)) {
                        if (myJSON["essence_balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    } else {
                        if (myJSON["balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    };
                } else if (cardsOrange.includes(type)) {
                    let tmpLvl = myJSON[`card_${type}`];
                    let tmpArr = orange.get(tmpLvl + 1);
                    document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
                    document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
                    let tmpArr2 = orange.get(tmpLvl);
                    let tmpIncome = tmpArr2[0];
                    let tmpPower = tmpIncome * 3;
                    document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                    document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

                    if (cardsEmpire.includes(`${type}`)) {
                        if (myJSON["essence_balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    } else {
                        if (myJSON["balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    };
                } else if (cardsYellow.includes(type)) {
                    let tmpLvl = myJSON[`card_${type}`];
                    let tmpArr = yellow.get(tmpLvl + 1);
                    document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
                    document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
                    let tmpArr2 = yellow.get(tmpLvl);
                    let tmpIncome = tmpArr2[0];
                    let tmpPower = tmpIncome * 3;
                    document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
                    document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

                    if (cardsEmpire.includes(`${type}`)) {
                        if (myJSON["essence_balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    } else {
                        if (myJSON["balance"] < tmpArr[1]) {
                            let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
                            document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
                            document.getElementById(tmpCardName).onclick = function(){};
                        };
                    };
                }
    
            };
    
            setUpTopMenu = async function(JSONdata) {
                let powerHolder = document.getElementById("topMenuPower");
                let incomeHolder = document.getElementById("topMenuIncome");
    
                powerHolder.textContent = `${compressValues(JSONdata["power"])}`;
                incomeHolder.textContent = `${compressValues(JSONdata["income"])}`;
            };
    
            let setUpInformation = function() {
                let cardsInfoString = sessionStorage.getItem('cardsInfo');
                let cardsInfoJSON = JSON.parse(cardsInfoString);
    
                setUpTopMenu(cardsInfoJSON);
    
                setUpCardData('queen', cardsInfoJSON);
                setUpCardData('king', cardsInfoJSON);
                setUpCardData('trader', cardsInfoJSON);
                setUpCardData('prince', cardsInfoJSON);
                setUpCardData('princess', cardsInfoJSON);
                setUpCardData('worker', cardsInfoJSON);
                setUpCardData('dragon', cardsInfoJSON);
                setUpCardData('wizard', cardsInfoJSON);
                setUpCardData('witch', cardsInfoJSON);
                setUpCardData('soldier', cardsInfoJSON);
                setUpCardData('knight', cardsInfoJSON);
    
                setTimeout(function() {setUpTimers()}, 300);
            }
    
            let setUpTimers = function() {
                checkTimer('queen');
                checkTimer('king');
                checkTimer('trader');
                checkTimer('prince');
                checkTimer('princess');
                checkTimer('worker');
                checkTimer('dragon');
                checkTimer('wizard');
                checkTimer('witch');
                checkTimer('soldier');
                checkTimer('knight');
            };

            let setClock = function(type) {
                let base = `card_${type}_`
                // Set the deadline to 15 minutes from now
                let deadline = new Date(Date.now() + 15 * 60 * 1000);
                let checkDeadline = localStorage.getItem(base + 'deadline');
                if (checkDeadline === undefined || checkDeadline === null || checkDeadline === "") {
                    localStorage.setItem(base + 'deadline', deadline);  
                } else {
                    deadline = localStorage.getItem(base + 'deadline');  
                }
                // Function to update the countdown
                function updateCountdown() {
                    document.getElementById('cardBuyImg_' + type).src = './images/lock.svg'
                    let now = new Date();
                    let remainingTime = new Date(deadline) - now; // Calculate remaining time in milliseconds
    
                    if (remainingTime <= 0) {
                        localStorage.removeItem(base + 'timer');
                        localStorage.removeItem(base + 'deadline');
                        sessionStorage.removeItem(base + 'timer');
                        clearInterval(countdownInterval);
                       
                        return;
                    }
    
                    // Calculate minutes and seconds
                    let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
                    let seconds = Math.floor((remainingTime / 1000) % 60);
                    
                    // Format minutes and seconds to always show two digits
                    let formattedMinutes = String(minutes).padStart(2, '0');
                    let formattedSeconds = String(seconds).padStart(2, '0');
                    localStorage.setItem(base + 'timer',`${formattedMinutes}:${formattedSeconds}`)
                    // Display the countdown
                    document.getElementById('cardBuyAmnt_' + type).textContent = localStorage.getItem(base + 'timer');
                    // Change photo
                    document.getElementById(`card_${type}_logo`).src = `./images/cards/card_${type}_locked.png`;
    
                    let cardName = type.charAt(0).toUpperCase() + type.slice(1)
    
                    document.getElementById(`card${cardName}`).onclick = function(){};
                }
    
                let nowCheck = new Date(Date.now());
    
                if (nowCheck < new Date(deadline)) {
                    // Update the countdown every second
                    var countdownInterval = setInterval(updateCountdown, 1000);
    
                    // Initial call to display the countdown immediately
                    updateCountdown();
                } else {
                    // upgradeCardPrice.textContent = `HELLO`;
                    localStorage.removeItem(base + 'timer');
                    localStorage.removeItem(base + 'deadline');
                    sessionStorage.removeItem(base + 'timer');
                }
            }
    
            let compressValues = function(num) {
                let round = function round(value, precision) {
                    var multiplier = Math.pow(10, precision || 0);
                    return Math.round(value * multiplier) / multiplier;
                }
                if (num < 1000) {
                    return `${num}`
                }
                if (num >= 1000 && num < 1000000) {
                    return `${round(num / 1000, 1)}k`
                }
                if (num >= 1000000) {
                    return `${round(num / 1000000)}M`
                }
            }
            
            let setUpUpgrade = function(type, menuType) {
    
                let cardsInfoString = sessionStorage.getItem('cardsInfo');
                let cardsInfoJSON = JSON.parse(cardsInfoString);
    
                upgradeWindow.style.display = 'flex';
                dailyWindow.style.display = 'none';
                let cardName = type.charAt(0).toUpperCase() + type.slice(1)
                upgradeCardName.textContent = cardName;
                upgradeCardImg.src = `./images/card_${type}.png`;
    
                let numValue = 0;
                let numPrice = 0;
    
                let mock = `card_${type}`;
    
                let cardBuyImage = document.getElementById('upgradeCardImage');
    
                if (menuType !== 'Empire') {
                    cardBuyImage.src = "./images/coin.svg";
                } else {
                    cardBuyImage.src = "./images/essence.svg";
                };
    
    
                if (cardsGreen.includes(type)) {
                    numValue = getValues('green', cardsInfoJSON[mock]);
                    tmpPrice = green.get(cardsInfoJSON[mock] + 1);
                    numPrice = tmpPrice[1];
                } else if (cardsRed.includes(type)) {
                    numValue = getValues('red', cardsInfoJSON[mock]);
                    tmpPrice = red.get(cardsInfoJSON[mock] + 1);
                    numPrice = tmpPrice[1];
                } else if (cardsYellow.includes(type)) {
                    numValue = getValues('yellow', cardsInfoJSON[mock]);
                    tmpPrice = yellow.get(cardsInfoJSON[mock] + 1);
                    numPrice = tmpPrice[1];
                } else if (cardsOrange.includes(type)) {
                    numValue = getValues('orange', cardsInfoJSON[mock]);
                    tmpPrice = orange.get(cardsInfoJSON[mock] + 1);
                    numPrice = tmpPrice[1];
                }
    
    
                
                upgradeCardIncome.textContent = `+${compressValues(numValue)}`;
    
                upgradeCardPower.textContent = `+${compressValues(numValue * 3)}`;
    
                upgradeCardPrice.textContent = `${numPrice}`;
    
                let buyUPbtn = document.getElementById('buyUpgradeCardBtn');
    
                buyUPbtn.onclick = function() {
                    
                    getCards().then(myCardsRes => {
                        // if (myCardsRes.code === 200) {};
                        let checker = localStorage.getItem(`card_${type}_timer`);
                        // значит что таймер УЖЕ установлен
                        if (checker !== undefined && checker !== null && checker !== "") {
                            // Проверяю, что юзер в прошлой сессии
                            let checkSession = sessionStorage.getItem(`card_${type}_timer`);
                            if (checkSession === undefined || checkSession === null || checkSession === "") {
                                // значит он в новой сессии (перезашел), надо заного установить часы, else = они уже работают
                                sessionStorage.setItem(`card_${type}_timer`, '1');
                                setClock(type);
                            };
                            
                        } else {  // значит что таймер НЕ установлен
                            localStorage.setItem(`card_${type}_timer`, '15:00');
                            sessionStorage.setItem(`card_${type}_timer`, '1');
                            setClock(type);
                        }
        
                        setTimeout(function() {

                            let tmpJSON = JSON.parse(sessionStorage.getItem('cardsInfo'));
                            tmpJSON[`card_${type}`] = tmpJSON[`card_${type}`] + 1;
                            let newIncome = tmpJSON[`income`] + numValue;
                            let newPower = tmpJSON[`power`] + (numValue * 3);

                            tmpJSON[`income`] = newIncome;
                            tmpJSON[`power`] = newPower;
                            sessionStorage.setItem('cardsInfo', JSON.stringify(tmpJSON));

                            document.getElementById('allCards' + menuType).style.display = 'flex';
                            upgradeWindow.style.display = 'none';
                            document.getElementById('cardsMenu').style.display = 'grid';
                            document.getElementById('X_Cards2').style.display = 'none';
                            document.getElementById('X_Cards').style.display = 'flex';

                            let numberTxt = document.getElementById(`card_${type}_level`).textContent;
                            let tmpNumber = parseInt(numberTxt, 10) + 1;
                            document.getElementById(`card_${type}_level`).textContent = tmpNumber;
                            document.getElementById("topMenuIncome").textContent = `${compressValues(newIncome)}`;
                            document.getElementById("topMenuPower").textContent = `${compressValues(newPower)}`;

                        }, 100);

                        // confetti({
                        //     particleCount: 150,
                        //     spread: 70,
                        //     origin: { y: 0.5 },
                        // });
                    });
                    
                };
            };

            let setUpCard = function(type, menuType) {
                let x2 = document.getElementById('X_Cards2');
                document.getElementById('allCards' + menuType).style.display = 'none';
                setUpUpgrade(type, menuType);
                document.getElementById('cardsMenu').style.display = 'none';
                document.getElementById('X_Cards').style.display = 'none';
                x2.style.display = 'flex';
                x2.onclick = function() {
                    document.getElementById('allCards' + menuType).style.display = 'flex';
                    upgradeWindow.style.display = 'none';
                    document.getElementById('cardsMenu').style.display = 'grid';
                    x2.style.display = 'none';
                    document.getElementById('X_Cards').style.display = 'flex';
                };
            };

            let checkJSON = JSON.parse(sessionStorage.getItem('cardsInfo'));
    
            if (checkJSON['card_queen'] < 10) {
                cardQueen.onclick = function() {
                    setUpCard('queen', 'Empire');
                };
            };
    
            if (checkJSON['card_king'] < 10) {
                cardKing.onclick = function() {
                    setUpCard('king', 'Empire');
                };
            };

            if (checkJSON['card_worker'] < 10) { 
                cardWorker.onclick = function() {
                    setUpCard('worker', 'Empire');
                };
            };
    
            if (checkJSON['card_trader'] < 10) {
                cardTrader.onclick = function() {
                    setUpCard('trader', 'Empire');
                };
            };
    
            if (checkJSON['card_prince'] < 10) {
                cardPrince.onclick = function() {
                    setUpCard('prince', 'Empire');
                };
            };
    
            if (checkJSON['card_princess'] < 10) {
                cardPrincess.onclick = function() {
                    setUpCard('princess', 'Empire');
                };
            };
    
            if (checkJSON['card_wizard'] < 10) {
                cardWizard.onclick = function() {
                    setUpCard('wizard', 'Magic');
                };
            };
    
            if (checkJSON['card_witch'] < 10) {
                cardWitch.onclick = function() {
                    setUpCard('witch', 'Magic');
                };
            };

            if (checkJSON['card_dragon'] < 10) {
                cardDragon.onclick = function() {
                    setUpCard('dragon', 'Magic');
                };
            };

            if (checkJSON['card_soldier'] < 10) {
                cardSoldier.onclick = function() {
                    setUpCard('soldier', 'Army');
                };
            };

            if (checkJSON['card_knight'] < 10) {
                cardKnight.onclick = function() {
                    setUpCard('knight', 'Army');
                };
            };
    
            setUpInformation();
        };

        if (sessionStorage.getItem('cardsInfo') === null) {
            getCards().then(myCardsRes => {
                sessionStorage.setItem('cardsInfo', '{"friends":5,"power":42454,"income":13212,"balance":11245,"essence_balance":12145,"card_king":9,"card_queen":9,"card_prince":9,"card_princess":9,"card_dragon":9,"card_wizard":1,"card_witch":10,"card_soldier":9,"card_knight":9,"card_worker":9,"card_trader":9, "combo_flag": false}');
                processCards();
            });
        } else {
            processCards();
        }
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

    async function getCards() {
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
           console.log(err)
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