document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;

    // const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    //     manifestUrl: 'https://vladimirwind.github.io/testing_laba2/tonconnect-manifest.json',
    //     buttonRootId: 'ton-connects'
    // });

    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://vladimirwind.github.io/testing_laba2/tonconnect-manifest.json',
    });

    const TonWeb = new window.TonWeb();

    try {
        tonConnectUI.uiOptions = {
            language: tg.WebApp.initDataUnsafe.user.language_code,
        };
    } catch (err) {
        console.log(err)
    };


    let CipherRequest = async function(code) {
        try {
        let myResponse = await fetch(baza + `/user/dailycipher/${code}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': '*/*',
                'Authorization': tknBearer
            },
        });
        if (!myResponse.ok) {
        throw new Error(`Error! status: ${myResponse.status}`);
        }
        let myCipherRes = await myResponse.json();
        return myCipherRes;
        } catch (err) {
           console.log(err)
        }
    };

    if(tg.WebApp.initData != undefined && tg.WebApp.initData != "") {
        tg.WebApp.ready();
        tg.WebApp.expand();

        console.log(JSON.stringify(tg.WebApp.initDataUnsafe, null, 2)); 

        // tonConnectUI.uiOptions = {
        //     language: tg.WebApp.initDataUnsafe.language_code,
        // };
        
        document.getElementById('profileName').textContent = tg.WebApp.initDataUnsafe.user.first_name;
    };

    document.getElementById('mainContainer').style.display = 'none';

    
    // let profPhoto = tg.WebApp.initDataUnsafe.user.photo_url;
    // if (profPhoto) {
    //     document.getElementById('profilePhoto').src = profPhoto;
    // };

    let nftBtn = document.getElementById('nftPOPUPbtn');
    nftBtn.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('nftContainer').style.display = 'flex';
        
    }

    let airdropBtn = document.getElementById('airdropBtn');
    airdropBtn.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('airdropContainer').style.display = 'flex';

        let BackButton = tg.WebApp.BackButton;

        BackButton.show();
        BackButton.onClick(function() {
            BackButton.hide();
            document.getElementById('mainContainer').style.display = 'flex';
            document.getElementById('airdropContainer').style.display = 'none';
        });
    };

    let dailyBtn = document.getElementById('dailyComboBtn');
    let dailyBonusBtn = document.getElementById('dailyBonusBtn');
    let dailyCipherBtn = document.getElementById('dailyCipherBtn');
    let dailyWindow = document.getElementById('popUPDailyCombo');
    let closeDailyBtn = document.getElementById('X_Daily');
    var islandSwitchBtn = document.getElementById('childIslandIMG');
    var IslandState = false;

    let connectTONbtn = document.getElementById('ton-connect');

    let sliceAddress = function(raw) {
        let start = raw.slice(0, 4)
        let end = raw.slice(-4)

        let newAddr = `${start}...${end}`

        return newAddr
    }

    let IntervalSubscribeWallet;

    let SubscribeWallet = function() {
        let rawAddress = tonConnectUI.account.address;
    
        if (rawAddress) {
            console.log("Raw Address: ", rawAddress);
    
            let userFriendlyAddress = TonConnectSDK.toUserFriendlyAddress(rawAddress);

            localStorage.setItem('connectedWallet', userFriendlyAddress);
            
            let slicedAddr = sliceAddress(userFriendlyAddress);
    
            document.getElementById('userWalletAddr').textContent = slicedAddr;
    
            connectTONbtn.src = './images/ConnectOffBTN.svg';
            connectTONbtn.onclick = function() {};

            let tickImg = document.getElementById('connectWalletTick');
            tickImg.src = './images/V-Mark-Wallet.svg';
    
            if (IntervalSubscribeWallet) {
                clearInterval(IntervalSubscribeWallet);
            }
        }
    };

    let connectionFunc = function() {
        async function initTonConnect() {
            try {
                await tonConnectUI.openModal();
    
                if (IntervalSubscribeWallet) {
                    clearInterval(IntervalSubscribeWallet);
                }

                IntervalSubscribeWallet = setInterval(SubscribeWallet, 500);

            } catch (error) {
                console.log("Error opening connection modal:", error);
            }
        }
        initTonConnect();
    };
    
    connectTONbtn.onclick = connectionFunc;

    let deleteWalletBtn = document.getElementById('deleteWalletBtn');

    deleteWalletBtn.onclick = async function() {
        try {
            await tonConnectUI.disconnect();
            document.getElementById('userWalletAddr').innerHTML = '&nbsp;';
            connectTONbtn.src = './images/ConnectActiveBTN.svg';
            localStorage.removeItem('connectedWallet');
            connectTONbtn.onclick = connectionFunc;
        } catch (error) {
            console.log("Error closing conn:", error);
        }
    }
    
    let sendTrBtn = document.getElementById('sendAuthTr');

    sendTrBtn.onclick = async function() {
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: atob("VVFBSnRSWFM4dHBtUEZ3ODIxTC1iU0FmWTBoZUxYUUNBS3BqVWtrNmtiYUxfclpD"),
                    amount: "10000000",
                }
            ]
        }
        
        try {

            let result = await tonConnectUI.sendTransaction(transaction);

            let bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(result.boc)).hash();
            
            let hashBase64 = TonWeb.utils.bytesToBase64(bocCellBytes);
            
            // SendCheckTransaction(hashBase64)

            if (true) {

                sendTrBtn.src = './images/sendTrOffBtn.svg'
                sendTrBtn.onclick = function(){};

                let tickImg = document.getElementById('sendTransactionTick');
                tickImg.src = './images/V-Mark-Wallet.svg';

                console.log("HASH: ", hashBase64);
            }

        } catch (e) {
            console.log(e);
        }
    };

    let buyBaseNFTBtn = document.getElementById('buyBaseNFTBtn');

    let buyPremNFTBtn = document.getElementById('buyPremNFTBtn');

    let myID = 1230802550 ^ 2025
    let hexString = myID.toString(16);

    console.log(hexString)

    buyPremNFTBtn.onclick = async function() {
        const cell = new TonWeb.boc.Cell();
        cell.bits.writeUint(0, 32);
        cell.bits.writeString(hexString); 
        const bocData = await cell.toBoc();
        const base64Boc = TonWeb.utils.bytesToBase64(bocData);

        let transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: "UQDdAaqOuz_c8K7LKYmygumxKwTFuLL1Ak3Ot_PpVu-1x4RD",
                    amount: TonWeb.utils.toNano(3.99),
                    payload: base64Boc
                }
            ]
        }
        
        try {

            let result = await tonConnectUI.sendTransaction(transaction);

            let bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(result.boc)).hash();
            
            let hashBase64 = TonWeb.utils.bytesToBase64(bocCellBytes);
            
            // SendCheckTransaction(hashBase64)

            if (true) {

                console.log("HASH: ", hashBase64);
            }

        } catch (e) {
            console.log(e);
        }
    }

    buyBaseNFTBtn.onclick = async function() {

        const cell = new TonWeb.boc.Cell();
        cell.bits.writeUint(0, 32);
        cell.bits.writeString(hexString); 
        const bocData = await cell.toBoc();
        const base64Boc = TonWeb.utils.bytesToBase64(bocData);

        let transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: "UQDdAaqOuz_c8K7LKYmygumxKwTFuLL1Ak3Ot_PpVu-1x4RD",
                    amount: TonWeb.utils.toNano(0.29),
                    payload: base64Boc
                }
            ]
        }
        
        try {

            let result = await tonConnectUI.sendTransaction(transaction);

            let bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(result.boc)).hash();
            
            let hashBase64 = TonWeb.utils.bytesToBase64(bocCellBytes);
            
            // SendCheckTransaction(hashBase64)

            if (true) {

                console.log("HASH: ", hashBase64);
            }

        } catch (e) {
            console.log(e);
        }
    }

    let copyWalletBtn = document.getElementById('copyWalletBtn');

    copyWalletBtn.onclick = function() {

        let walletText = localStorage.getItem('connectedWallet');
        
        if (walletText && walletText !== "") {

            let tmpFunc = async function() {
                try {
                    await navigator.clipboard.writeText(walletText);
                } catch (err) {
                    console.log('Failed to copy: ', err);
                };
            };

            tmpFunc();
        };
    };

    let InitialCheckWallet = function() {

        let tmpFlag = localStorage.getItem('connectedWallet');
        
        if (tmpFlag) {
        
            let slicedAddr = sliceAddress(tmpFlag);
    
            document.getElementById('userWalletAddr').textContent = slicedAddr;
    
            connectTONbtn.src = './images/ConnectOffBTN.svg';
            connectTONbtn.onclick = function() {};

            let tickImg = document.getElementById('connectWalletTick');
            tickImg.src = './images/V-Mark-Wallet.svg';
        };
    };

    InitialCheckWallet();

    dailyCipherBtn.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('dailyCipherContainer').style.display = 'flex';

        let currentCode = "";

        let updateCode = function(val) {

            let curLen = currentCode.length;
            if (curLen >= 4) {return};

            document.getElementById(`cipherBoard_${curLen}`).textContent = val;
            
            currentCode += val
        };

        let eraseCode = function() {

            let curLen = currentCode.length;

            if (curLen === 0) {return};

            if (document.getElementById(`cipherBoard_${curLen - 1}`).innerHTML !== '&nbsp;') {
                document.getElementById(`cipherBoard_${curLen - 1}`).innerHTML = '&nbsp;';
            };

            currentCode = currentCode.slice(0, -1);
        };

        let submitBtn = document.getElementById(`cipherSubmitBtn`);

        let sendCode = function() {

            let curLen = currentCode.length;

            if (curLen !== 4) {return};

            submitBtn.onclick = function() {};
            submitBtn.style.display = 'none';

            CipherRequest(currentCode).then(myCipherRes => {
                if (myCipherRes.code === 200) {
                    //animation
                    //update balance
                    //update JSON
                } else {
                    for (let i = 0; i < 4; i++) {
                        document.getElementById(`cipherBoard_${i}`).style.animation = 'badCipher 2s ease-in-out'; 
                    }

                    setTimeout(() => {
                        submitBtn.style.display = 'flex';
                        submitBtn.onclick = sendCode;
        
                        for (let i = 0; i < 4; i++) {
                            document.getElementById(`cipherBoard_${i}`).style.animation = ''; 
                        };
        
                    }, 2000);
                }
            }); 
        };

        submitBtn.onclick = sendCode;

        for (let i = 0; i < 10; i++) {
            let curBtn = document.getElementById(`cipherBtn_${i}`);

            let btnFunc = function() {
                curBtn.onclick = function() {};

                curBtn.style.backgroundColor = '#0F161E';
                curBtn.style.animation = 'pressing 0.25s infinite';

                updateCode(`${i}`);

                setTimeout(() => {
                    curBtn.style.backgroundColor = '';
                    curBtn.style.animation = '';
                    curBtn.onclick = btnFunc;
                }, 250); 
            }

            curBtn.onclick = btnFunc;
        }

        let eraseBtn = document.getElementById(`cipherEraseBtn`);

        eraseBtn.onclick = eraseCode;
    }

    dailyBonusBtn.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('dailyBonusContainer').style.display = 'flex';

        let curDay = document.getElementById('bonusDay_1');

        curDay.style.outlineStyle = 'solid';
        curDay.style.outlineWidth = 'thin';
        curDay.style.outlineColor = '#98FFAF';
    }

    dailyBtn.onclick = function() {

        let balanceElement = document.getElementById('blnc');

        balanceElement.classList.add('jelly');

        // Remove the jelly class after the animation is done to reset it
        setTimeout(() => {
          balanceElement.classList.remove('jelly');
        }, 600);  // Match the duration of the animation

        return
        dailyWindow.style.display = 'flex';
        islandSwitchBtn.style.display = 'none';
        closeDailyBtn.onclick = function() {
            dailyWindow.style.display = 'none';
            islandSwitchBtn.style.display = 'flex';
        }
    }

    sessionStorage.setItem('essenceBtnState', 1)
    sessionStorage.setItem('mineBtnState', 1)

    var potState = 1;
    var mineState = 1;

    var MiningTime = 0;
    var EssenceTime = 0;

    localStorage.setItem("potState", 1)
    localStorage.setItem("mineState", 1)

    var mainBtnMine = document.getElementById(`mainButton0`);
    var mainBtnPot = document.getElementById(`mainButton1`);
    var globalIslandState = false;

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

    var userProfile = document.getElementById(`userProfile`);

    let currentUserInfo = {
        "status": true,
        "code": 200,
        "data": '{"income":5000,"combo_flag":true,"balance":12000,"essence_balance":2500000000,"unused_income":300,"unused_essence":1500,"unused_balance":200,"cauldron_level":3,"mine_level":5,"mining_time":1, "essence_time": 245}'
    };

    let MainUserInfo = JSON.parse(currentUserInfo.data);

    let setUpMainPage = function(userInfos) {
        document.getElementById('profileIncome').textContent = compressValues(userInfos["income"]);
        document.getElementById('blnc').textContent = userInfos["balance"];
        document.getElementById('esnc').textContent = userInfos["essence_balance"];
        document.getElementById('childIslandIMG').src = 
        `./images/islands/cauldronIsland${userInfos["cauldron_level"]}.png`
        document.getElementById('mainIslandIMG').src = 
        `./images/islands/mineIsland${userInfos["mine_level"]}.png`

        if (userInfos["unused_essence"] > 0 && userInfos["essence_time"] === 0) {
            potState = 3;
            localStorage.setItem('potState', 3)
        }

        if (userInfos["unused_balance"] > 0 && userInfos["mining_time"] === 0) {
            mineState = 3;
            localStorage.setItem('mineState', 3)
        }

        if (userInfos["essence_time"] > 0) {
            potState = 2;
            localStorage.setItem('potState', 2)
            EssenceTime = userInfos["essence_time"];
        }

        if (userInfos["mining_time"] > 0) {
            mineState = 2;
            localStorage.setItem('mineState', 2)
            MiningTime = userInfos["mining_time"];
        }

    }

    const islandMapping = new Map();

    islandMapping.set(1, `./images/islands/cauldronIsland${MainUserInfo["cauldron_level"]}.png`);
    islandMapping.set(0, `./images/islands/mineIsland${MainUserInfo["mine_level"]}.png`);

    setUpMainPage(MainUserInfo);

    let currentUserInfoLeague = {
        "status": true,
        "code": 200,
        "data": "{\"league\":\"diamond\",\"place\":1,\"mined\":74100,\"percent\":19,\"name\":\"🅰️🅱️🅱️🅾️💲 \"}"
    };

    function truncateName(name) {
        return name.length > 16 ? name.slice(0, 16) + '...' : name;
    }
    
    let userData = JSON.parse(currentUserInfoLeague.data);

    let kingdomsBtn = document.getElementById('kingdoms-btn');

    let currentLeague = userData.league;

    let GreenCards = new Map();
    GreenCards.set(0, [0,0]);
    GreenCards.set(1, [50,500]);
    GreenCards.set(2, [60,850]);
    GreenCards.set(3, [70,1445]);
    GreenCards.set(4, [90,2457]);
    GreenCards.set(5, [110,4177]);
    GreenCards.set(6, [130,7101]);
    GreenCards.set(7, [170,12072]);
    GreenCards.set(8, [210,20522]);
    GreenCards.set(9, [250,34887]);
    GreenCards.set(10, [290,59308]);

    let YellowCards = new Map();
    YellowCards.set(0, [0,0]);
    YellowCards.set(1, [150,1000]);
    YellowCards.set(2, [180,1850]);
    YellowCards.set(3, [216,3423]);
    YellowCards.set(4, [259,6333]);
    YellowCards.set(5, [311,11716]);
    YellowCards.set(6, [373,21675]);
    YellowCards.set(7, [448,40099]);
    YellowCards.set(8, [538,74183]);
    YellowCards.set(9, [646,137239]);
    YellowCards.set(10, [775,253892]);

    let OrangeCards = new Map();
    OrangeCards.set(0, [0,0]);
    OrangeCards.set(1, [320,1000]);
    OrangeCards.set(2, [368,2120]);
    OrangeCards.set(3, [423,4494]);
    OrangeCards.set(4, [486,9527]);
    OrangeCards.set(5, [559,20197]);
    OrangeCards.set(6, [643,42818]);
    OrangeCards.set(7, [739,90774]);
    OrangeCards.set(8, [850,192441]);
    OrangeCards.set(9, [978,407975]);
    OrangeCards.set(10, [1125,864907]);

    let RedCards = new Map();
    RedCards.set(0, [0,0]);
    RedCards.set(1, [500,2000]);
    RedCards.set(2, [600,4800]);
    RedCards.set(3, [720,11520]);
    RedCards.set(4, [864,27648]);
    RedCards.set(5, [1037,66355]);
    RedCards.set(6, [1244,159252]);
    RedCards.set(7, [1493,382205]);
    RedCards.set(8, [1792,917292]);
    RedCards.set(9, [2150,1501501]);
    RedCards.set(10, [2580,2283602]);

    kingdomsBtn.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('kingdomsContainer').style.display = 'flex';
        
        let btnCards = document.getElementById('btnCards');
        btnCards.onclick = function() {
            let upgradeWindow = document.getElementById('popUPKingdomsCards');
            upgradeWindow.style.display = 'flex';
        };

        let menuEmpire = document.getElementById('menuEmpire');
        let menuArmy = document.getElementById('menuArmy');
        let menuMagic = document.getElementById('menuMagic');
        let menuSpecial = document.getElementById('menuSpecial');

        const AllCardsEmpire = new Map([
            ["king", ["yellow", ""]],
            ["queen", ["orange", ""]],
            ["princess", ["green", "Invite 3 friends"]],
            ["prince", ["orange", ""]],
            ["worker", ["orange", ""]],
            ["trader", ["red", ""]],
        ]);

        const AllCardsArmy = new Map([
            ["soldier", ["red", ""]],
            ["knight", ["yellow", ""]],
        ]);

        const AllCardsMagic = new Map([
            ["witch", ["yellow", ""]],
            ["wizard", ["green", "Invite 5 friends"]],
            ["dragon", ["yellow", ""]],
        ]);

        const AllCardsSpecial = new Map([

        ]);

        let setClickForCard = function(cardDiv, countdownDuration, timerKey, cardKey, textDiv, cardsBlock) {

            const bottomItem = document.createElement("div");
            bottomItem.classList.add("newCardTextsBottomItem");
            let cardName = cardKey.replace('card_', '');
            cardDiv.onclick = function() {
                const lockImg = document.createElement("img");
                lockImg.src = "./images/lock.svg";
                const bottomSpan = document.createElement("span");
        
                let endTime = Date.now() + countdownDuration; // Calculate end time
                localStorage.setItem(timerKey, endTime); // Store the end time
        
                let timeRemaining = countdownDuration; // Set initial timeRemaining
        
                let updateCountdownCard = () => {
                    let minutes = Math.floor(timeRemaining / 60000);
                    let seconds = Math.floor((timeRemaining % 60000) / 1000);
                    bottomSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    document.getElementById(`card_${cardName}_IMG`).src = `./images/cards/card_${cardName}_locked.png`;
                    
                    if (timeRemaining <= 0) {
                        clearInterval(countdownIntervalCard);
                        bottomItem.style.display = 'none'; 
                        bottomItem.innerHTML = '';
                        localStorage.removeItem(timerKey); 
                        cardDiv.style.opacity = '1';
                        document.getElementById(`card_${cardName}_IMG`).src = `./images/cards/card_${cardName}.png`
                        setClickForCard(cardDiv, countdownDuration, timerKey, cardKey, textDiv, cardsBlock);
                    } else {
                        timeRemaining -= 1000; 
                    }
                };
        
                let countdownIntervalCard = setInterval(updateCountdownCard, 1000);
                updateCountdownCard(); 
        
                bottomItem.appendChild(lockImg);
                bottomItem.appendChild(bottomSpan);
                cardDiv.style.opacity = '0.5';

                textDiv.appendChild(bottomItem);

                let cardsJSON = JSON.parse(sessionStorage.getItem('cardsData'))
        
                cardsJSON[cardKey] = cardsJSON[cardKey] + 1;

                sessionStorage.setItem('cardsData', JSON.stringify(cardsJSON))

                // Disable further clicks
                cardDiv.onclick = function() {};
                generateCards(cardsBlock)
            };
        };

        let createCard = function(name, [type, rule], cardsJSON, cardsBlock) {

            let cardKey = `card_${name}`;
            let level = cardsJSON[cardKey];  
            let price = 0;
            let income = 0;
        
            if (type === "orange"){
                if (level < 10) {
                    income = OrangeCards.get(level + 1)[0]; 
                } else {
                    income = OrangeCards.get(level)[0];
                }
                if (level < 10) {
                    price = compressValues(OrangeCards.get(level + 1)[1]);  
                } else {
                    price = 'max';
                }
            };

            if (type === "green"){
                if (level < 10) {
                    income = GreenCards.get(level + 1)[0]; 
                } else {
                    income = GreenCards.get(level)[0];
                }
                if (level < 10) {
                    price = compressValues(GreenCards.get(level + 1)[1]);  
                } else {
                    price = 'max';
                }
            };

            if (type === "red"){
                if (level < 10) {
                    income = RedCards.get(level + 1)[0]; 
                } else {
                    income = RedCards.get(level)[0];
                }
                if (level < 10) {
                    price = compressValues(RedCards.get(level + 1)[1]);  
                } else {
                    price = 'max';
                }
            };

            if (type === "yellow"){
                if (level < 10) {
                    income = YellowCards.get(level + 1)[0]; 
                } else {
                    income = YellowCards.get(level)[0];
                }
                if (level < 10) {
                    price = compressValues(YellowCards.get(level + 1)[1]); 
                } else {
                    price = 'max';
                }
            };
        
            let power = (income * 3); 
        
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("newCard");
        
            // Image Section
            let imageDiv = document.createElement("div");
            imageDiv.classList.add("newCardImage");
        
            let img = document.createElement("img");
            img.src = `./images/cards/card_${name}.png`;
            img.id = `card_${name}_IMG`;
        
            let lvlDiv = document.createElement("div");
            lvlDiv.classList.add("newCardImageLvl");
            let lvlSpan = document.createElement("span");
            lvlSpan.textContent = level; 
        
            lvlDiv.appendChild(lvlSpan);
            imageDiv.appendChild(img);
            imageDiv.appendChild(lvlDiv);
        
          
            let textDiv = document.createElement("div");
            textDiv.classList.add("newCardTexts");
        
            let headerDiv = document.createElement("div");
            headerDiv.classList.add("newCardTextsHeader");
            let headerSpan = document.createElement("span");
            headerSpan.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            headerDiv.appendChild(headerSpan);
        
            let middleDiv = document.createElement("div");
            middleDiv.classList.add("newCardTextsMiddle");
        
            let incomeItem = document.createElement("div");
            incomeItem.classList.add("newCardTextsMiddleItem");
            let incomeSpan = document.createElement("span");
            incomeSpan.textContent = `+${income}`;
            let coinImg = document.createElement("img");
            coinImg.src = "./images/coin.svg";
        
            incomeItem.appendChild(incomeSpan);
            incomeItem.appendChild(coinImg);
        
            let powerItem = document.createElement("div");
            powerItem.classList.add("newCardTextsMiddleItem");
            let powerSpan = document.createElement("span");
            powerSpan.textContent = `+${power}`; // Display power
            let powerImg = document.createElement("img");
            powerImg.src = "./images/castle_power.svg";
        
            powerItem.appendChild(powerSpan);
            powerItem.appendChild(powerImg);
        
            middleDiv.appendChild(incomeItem);
            middleDiv.appendChild(powerItem);
        
            // Bottom Section with additional rules if present
            let bottomItem = document.createElement("div");
            bottomItem.classList.add("newCardTextsBottomItem");
        
            textDiv.appendChild(headerDiv);
            textDiv.appendChild(middleDiv);
            textDiv.appendChild(bottomItem);
        
            // Price Section
            let priceDiv = document.createElement("div");
            priceDiv.classList.add("newCardPrice");
            let priceImg = document.createElement("img");
            priceImg.src = "./images/coin.svg";
            let priceSpan = document.createElement("span");
            priceSpan.textContent = `${price}`;
        
            priceDiv.appendChild(priceImg);
            priceDiv.appendChild(priceSpan);
        
            // Append all sections to the main card div
            cardDiv.appendChild(imageDiv);
            cardDiv.appendChild(textDiv);
            cardDiv.appendChild(priceDiv);

            if (level === 10) {
                cardDiv.style.opacity = '0.5';
                localStorage.removeItem(`card_${name}_timing`);
                cardDiv.onclick = function(){};
            } else {

                let timerKey = `card_${name}_timing`;
                let countdownDuration = (2 + (level+1)*3) * 60 * 1000; 
                let curCardTimer = localStorage.getItem(timerKey);
                
                if (curCardTimer) {
                    // Calculate remaining time
                    let endTime = parseInt(curCardTimer, 10);
                    let currentTime = Date.now();
                    let timeRemaining = Math.max(0, endTime - currentTime); // Ensure timeRemaining is not negative
                
                    let lockImg = document.createElement("img");
                    lockImg.src = "./images/lock.svg";
                    let bottomSpan = document.createElement("span");
                
                    let updateCountdownCard = () => {
                        let minutes = Math.floor(timeRemaining / 60000);
                        let seconds = Math.floor((timeRemaining % 60000) / 1000);
                        bottomSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                        bottomSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                        img.src = `./images/cards/card_${name}_locked.png`;
                        if (timeRemaining <= 0) {
                            clearInterval(countdownIntervalCard);
                            bottomItem.style.display = 'none'; 
                            bottomItem.innerHTML = '';
                            localStorage.removeItem(timerKey);
                            cardDiv.style.opacity = '1';
                            img.src = `./images/cards/card_${name}.png`;
                            setClickForCard(cardDiv, countdownDuration, timerKey, cardKey, textDiv, cardsBlock);
                        } else {
                            timeRemaining -= 1000; // Decrease by 1 second
                        }
                    };
                
                    let countdownIntervalCard = setInterval(updateCountdownCard, 1000);
                    updateCountdownCard(); // Initial call to set the text immediately
                
                    bottomItem.appendChild(lockImg);
                    bottomItem.appendChild(bottomSpan);
                    cardDiv.style.opacity = '0.5';
                
                } else {

                    if (rule) {
                        let ruleFlag = false;
                        let isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
                        let words = rule.split(' ');
                        if (isNumeric(words[2])) {
                            let lowerName = words[0].toLowerCase();
                            let needLevel = parseInt(words[2]);
                            let checkLevelKey = `card_${lowerName}`;
                            if (cardsJSON[checkLevelKey] >= needLevel) {
                                ruleFlag = true;
                            }
                        } else { //friends
                            let numFriends = cardsJSON["friends"];
                            let needFriends = parseInt(words[1]);

                            if (numFriends >= needFriends) {
                                ruleFlag = true;
                            }
                        }

                        if (!ruleFlag) {
                            let lockImg = document.createElement("img");
                            lockImg.src = "./images/lock.svg";
                            let bottomSpan = document.createElement("span");
                            bottomSpan.textContent = rule; 
                            bottomItem.appendChild(lockImg);
                            bottomItem.appendChild(bottomSpan);
                            cardDiv.onclick = function(){};
                            cardDiv.style.opacity = '0.5';
                            return cardDiv
                        } else {
                            setClickForCard(cardDiv, countdownDuration, timerKey, cardKey, textDiv, cardsBlock);
                        };

                    } else {
                        setClickForCard(cardDiv, countdownDuration, timerKey, cardKey, textDiv, cardsBlock);
                    };

                };
            };
        
            return cardDiv;
        };

        const AllCardsTypes = ['Magic', 'Empire', 'Army', 'Special']
        
        // Function to generate all cards and insert them into a container
        function generateCards(type) {
            let checker = sessionStorage.getItem('cardsData');
            let cardsJSON;  
            if (checker === undefined || checker === null) {
                cardsJSON = JSON.parse(`{\"friends\":1,\"combo_flag\":false,\"power\":4380,\"income\":1460,\"balance\":473411,\"essence_balance\":2918,\"card_king\":9,\"card_queen\":2,\"card_prince\":10,\"card_princess\":4,\"card_dragon\":2,\"card_wizard\":5,\"card_witch\":6,\"card_soldier\":8,\"card_knight\":1,\"card_worker\":3,\"card_trader\":0}`)
                sessionStorage.setItem('cardsData', JSON.stringify(cardsJSON))
            } else {
                cardsJSON = JSON.parse(sessionStorage.getItem('cardsData'));
            }

            for (let iTer = 0; iTer < AllCardsTypes.length; iTer++) {
                document.getElementById(`allCards${AllCardsTypes[iTer]}`).style.display = 'none';
                document.getElementById(`allCards${AllCardsTypes[iTer]}`).innerHTML = '';
                document.getElementById(`menu${AllCardsTypes[iTer]}`).style.boxShadow = 'none';
            }

            document.getElementById(`allCards${type}`).style.display = 'flex';
            document.getElementById(`menu${type}`).style.boxShadow = 'inset #2A4864 0px 0px 40px -9px'

            if (type === 'Empire') {
                let container = document.getElementById(`allCards${type}`); 
        
                AllCardsEmpire.forEach((cardData, cardName) => {
                    const cardElement = createCard(cardName, cardData, cardsJSON, type);
                    container.appendChild(cardElement);
                });
    
                let brElement = document.createElement("br");
                container.appendChild(brElement);
            }

            if (type === 'Magic') {
                let container = document.getElementById(`allCards${type}`); 
        
                AllCardsMagic.forEach((cardData, cardName) => {
                    const cardElement = createCard(cardName, cardData, cardsJSON, type);
                    container.appendChild(cardElement);
                });
    
                let brElement = document.createElement("br");
                container.appendChild(brElement);
            }

            if (type === 'Army') {
                let container = document.getElementById(`allCards${type}`); 
        
                AllCardsArmy.forEach((cardData, cardName) => {
                    const cardElement = createCard(cardName, cardData, cardsJSON, type);
                    container.appendChild(cardElement);
                });
    
                let brElement = document.createElement("br");
                container.appendChild(brElement);
            }

            if (type === 'Special') {
                let container = document.getElementById(`allCards${type}`); 
        
                AllCardsSpecial.forEach((cardData, cardName) => {
                    const cardElement = createCard(cardName, cardData, cardsJSON, type);
                    container.appendChild(cardElement);
                });
    
                let brElement = document.createElement("br");
                container.appendChild(brElement);
            }

        };

        menuEmpire.onclick = function() {
            generateCards('Empire');
        };

        menuMagic.onclick = function() {
            generateCards('Magic');
        };
        
        menuArmy.onclick = function() {
            generateCards('Army');
        };

        menuSpecial.onclick = function() {
            generateCards('Special');
        };

        generateCards('Empire');

    };

    userProfile.onclick = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('leaguesContainer').style.display = 'flex';

        let BackButton = tg.WebApp.BackButton;

        BackButton.show();
        BackButton.onClick(function() {
            BackButton.hide();
            document.getElementById('mainContainer').style.display = 'flex';
            document.getElementById('leaguesContainer').style.display = 'none';
        });
    
        let jsonData = {
            "status": true,
            "code": 200,
            "data": "{\"diamond\":[{\"place\":1,\"name\":\"Pham Quy Duong 🌱 SE\",\"mined\":7855},{\"place\":2,\"name\":\"Алекс\",\"mined\":5011},{\"place\":3,\"name\":\"Mohsen\",\"mined\":4998},{\"place\":4,\"name\":\"Ben Hadley\",\"mined\":4998}],\"bronze\":[{\"place\":1,\"name\":\"Pham Quy Duong 🌱 SE\",\"mined\":7855},{\"place\":2,\"name\":\"Алекс\",\"mined\":5011},{\"place\":3,\"name\":\"Mohsen\",\"mined\":4998},{\"place\":4,\"name\":\"Ben Hadley\",\"mined\":4998}],\"silver\":[{\"place\":1,\"name\":\"John Doe\",\"mined\":9000},{\"place\":2,\"name\":\"Jane Smith\",\"mined\":8500},{\"place\":3,\"name\":\"Albert\",\"mined\":8000}],\"gold\":[{\"place\":1,\"name\":\"Elon Musk\",\"mined\":10000},{\"place\":2,\"name\":\"Bill Gates\",\"mined\":9500},{\"place\":3,\"name\":\"Mark Zuckerberg\",\"mined\":9200}],\"mythic\":[{\"place\":1,\"name\":\"Elon Musk\",\"mined\":10000},{\"place\":2,\"name\":\"Bill Gates\",\"mined\":9500},{\"place\":3,\"name\":\"Mark Zuckerberg\",\"mined\":9200}]}"
        }; 
        
        
        let leaguesData = JSON.parse(jsonData.data); 
        
        // Function to create the leaderboard for a given league
        let updateLeaderboard = function(league) {
            let leaderboard = document.getElementById('leaderboardLeagues'); 
            leaderboard.innerHTML = ''; 
    
            if (userData.league === league) {
                // Create the list item for the current user
                let myPercent = userData.percent

                if (myPercent) {
                    if (myPercent > 99) {
                        myPercent = 100
                    }
                    document.getElementById('progressBarLeagues').style.width = `${userData.percent}%`;
                }

                let currentUserLi = document.createElement('li');
                currentUserLi.className = 'leagues-li';

                currentUserLi.style.outlineStyle = 'solid';
                currentUserLi.style.outlineWidth = 'thin';
                currentUserLi.style.outlineColor = '#98FFAF';
                currentUserLi.style.borderRadius = '2vw';
        
                // Determine the place image based on position
                let placeHTML = '';
                if (userData.place === 1) {
                    placeHTML = `<img src="./images/1st.svg" width="60%" height="60%">`;
                } else if (userData.place === 2) {
                    placeHTML = `<img src="./images/2nd.svg" width="60%" height="60%">`;
                } else if (userData.place === 3) {
                    placeHTML = `<img src="./images/3rd.svg" width="60%" height="60%">`;
                } else {
                    placeHTML = `<text>${userData.place}</text>`; // For places beyond 3rd, show the place number
                }
        
                // Create the structure for the user's list item
                currentUserLi.innerHTML = `            
                <div class="leaguesItem">
                    <div class="leaguesItemPlace">
                        ${placeHTML}
                    </div>
                    <img src="./images/${league}_avatar.png" width="13%" height="13%">
                    <div class="leaguesItemNameAndBalance">
                        <text id="name${league.charAt(0).toUpperCase() + league.slice(1)}_${userData.place}">${truncateName(userData.name)}</text>
                        <div class="leaguesItemMinedBalance">
                            <img src="./images/coin.svg">
                            <text id="mined${league.charAt(0).toUpperCase() + league.slice(1)}_${userData.place}">${userData.mined}</text>
                        </div>
                    </div>
                </div>`;
        
                // Prepend the user's info to the top of the leaderboard
                leaderboard.appendChild(currentUserLi);
            }

            let leagueData = leaguesData[league]; 
            
            leagueData.forEach(item => {
                // Create a new list item <li>
                let myLi = document.createElement('li');
                myLi.className = 'leagues-li';
    
                // Determine the place image based on position
                let placeHTML = '';
                if (item.place === 1) {
                    placeHTML = `<img src="./images/1st.svg" width="60%" height="60%">`;
                } else if (item.place === 2) {
                    placeHTML = `<img src="./images/2nd.svg" width="60%" height="60%">`;
                } else if (item.place === 3) {
                    placeHTML = `<img src="./images/3rd.svg" width="60%" height="60%">`;
                } else {
                    placeHTML = `<text>${item.place}</text>`; // For places beyond 3rd, show the place number
                }
    
                // Create the structure for each list item
                myLi.innerHTML = `            
                <div class="leaguesItem">
                    <div class="leaguesItemPlace">
                        ${placeHTML}
                    </div>
                    <img src="./images/${league}_avatar.png" width="13%" height="13%">
                    <div class="leaguesItemNameAndBalance">
                        <text id="name${league.charAt(0).toUpperCase() + league.slice(1)}_${item.place}">${item.name}</text>
                        <div class="leaguesItemMinedBalance">
                            <img src="./images/coin.svg">
                            <text id="mined${league.charAt(0).toUpperCase() + league.slice(1)}_${item.place}">${item.mined}</text>
                        </div>
                    </div>
                </div>`;
                
                // Append the new list item to the leaderboard 
                leaderboard.appendChild(myLi);
            });
        };
        
        // Create initial HTML structure
        let createLeagueHTML = function(league) {
            let leagueContainer = document.getElementById('leaguesInside');

            if (userData.league === league) {
                leagueContainer.innerHTML = `
                <div class="threeItemsLeagues" id="th1">
                    <text id="leftArrow">&lt;</text>
                    <div class="myWrapImageLeagues">
                        <img src="./images/${league.charAt(0).toUpperCase() + league.slice(1)}_League.png"></img>
                    </div>
                    <text id="rightArrow">></text>
                </div>  
                <div class="leagueType">
                    <text>${league.charAt(0).toUpperCase() + league.slice(1)} league</text>
                </div>
                <div class="myPlaceWr">
                    <div class="percentTextLeagues" id="usersStatMined">
                        <text>Mined: &nbsp;</br></text>
                        <text id="totalMined"> 0 / 5000</text>
                    </div>
                    <div class="progressBarLeagues" id="usersStatBar">
                        <span class="progressBarFillLeagues_${league}" style="width: 0%;" id="progressBarLeagues"></span>
                    </div>
                    </br>
                </div>
    
                <ul class="leagues-ul" id="leaderboardLeagues">
                    <!-- Leaderboard will be populated here -->
                </ul>`;
            } else {
                leagueContainer.innerHTML = `
                <div class="threeItemsLeagues" id="th1">
                    <text id="leftArrow">&lt;</text>
                    <div class="myWrapImageLeagues">
                        <img src="./images/${league.charAt(0).toUpperCase() + league.slice(1)}_League.png"></img>
                    </div>
                    <text id="rightArrow">></text>
                </div>  
                <div class="leagueType">
                    <text>${league.charAt(0).toUpperCase() + league.slice(1)} league</text>
                </div>
                <ul class="leagues-ul" id="leaderboardLeagues">
                    <!-- Leaderboard will be populated here -->
                </ul>`;
            }
            
            // Update the leaderboard for the initial league
            updateLeaderboard(league);
    
            // Now we can safely add the event listeners for the arrows
            document.getElementById('leftArrow').onclick = function() {
                if (currentLeague === 'bronze') {
                    currentLeague = 'mythic'; 
                } else if (currentLeague === 'silver') {
                    currentLeague = 'bronze';
                } else if (currentLeague === 'gold') {
                    currentLeague = 'silver';
                } else if (currentLeague === 'diamond') {
                    currentLeague = 'gold';
                } else if (currentLeague === 'mythic') {
                    currentLeague = 'diamond';
                }
                
                // Recreate the HTML for the new league
                createLeagueHTML(currentLeague);
            };
        
            document.getElementById('rightArrow').onclick = function() {
                if (currentLeague === 'bronze') {
                    currentLeague = 'silver';
                } else if (currentLeague === 'silver') {
                    currentLeague = 'gold';
                } else if (currentLeague === 'gold') {
                    currentLeague = 'diamond';
                } else if (currentLeague === 'diamond') {
                    currentLeague = 'mythic'; 
                }  else if (currentLeague === 'mythic') {
                    currentLeague = 'bronze'; 
                }
        
                // Recreate the HTML for the new league
                createLeagueHTML(currentLeague);
            };
        };
    
        // Initially create the HTML for the Bronze league
        createLeagueHTML(currentLeague);
    };
    
    let appendContent = function (state) {

        potState = parseInt(localStorage.getItem("potState"));
        mineState = parseInt(localStorage.getItem("mineState"));

        const leftDiv0 = document.getElementById('mainStartButtonTextLeft0');
        const rightDiv0 = document.getElementById('mainStartButtonTextRight0');

        const leftDiv1 = document.getElementById('mainStartButtonTextLeft1');
        const rightDiv1 = document.getElementById('mainStartButtonTextRight1');


        if (!globalIslandState) {
            mainBtnMine.style.display = 'flex';
            mainBtnPot.style.display = 'none';
        } else {
            mainBtnMine.style.display = 'none';
            mainBtnPot.style.display = 'flex';
        }

        if (potState === 1) {
            mainBtnPot.onclick = function() {
                localStorage.setItem("potState", 2)
                setTimeout(function(){
                    leftDiv1.innerHTML = '';
                    rightDiv1.innerHTML = '';
                    mainBtnPot.onclick = function() {}
                    appendContent(state);
                }, 10);
                return
            }
        }

        if (mineState === 1) {
            mainBtnMine.onclick = function() {
                localStorage.setItem("mineState", 2)
                setTimeout(function(){
                    leftDiv0.innerHTML = '';
                    rightDiv0.innerHTML = '';
                    mainBtnMine.onclick = function() {}
                    appendContent(state);
                }, 10);
                return
            }
        }

        const coinImg = document.createElement('img');
        coinImg.src = './images/blackCoin.svg';
        coinImg.style.height = '3vh';
        coinImg.style.width = 'auto';

        const essenceImg = document.createElement('img');
        essenceImg.src = './images/blackEssence.svg';
        essenceImg.style.height = '3vh';
        essenceImg.style.width = 'auto';

        if (!state && mineState === 1 && leftDiv0.innerHTML === '') {
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'MINE ';
    
            let leftTxt2 = document.createElement('span');
            leftTxt2.textContent = `${MainUserInfo["mine_level"] * 120 * Math.pow(MainUserInfo["mine_level"], 2)}`;

            leftDiv0.appendChild(leftTxt);
    
            leftDiv0.appendChild(coinImg);
    
            leftDiv0.appendChild(leftTxt2);
    
            let rightTxt = document.createElement('span');
            rightTxt.textContent = `- ${120 * MainUserInfo["mine_level"]}`;
    
            rightDiv0.appendChild(rightTxt);
            rightDiv0.appendChild(essenceImg);

            mainBtnMine.style.background = '#98FFAF';
            mainBtnMine.style.boxShadow = '0 0.7vh #5FA86F';

            return
        }

        if (state && potState === 1 && leftDiv1.innerHTML === '') {
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'MINE ';
    
            let leftTxt2 = document.createElement('span');
            leftTxt2.textContent = `${MainUserInfo["cauldron_level"] * 120 * Math.pow(MainUserInfo["cauldron_level"], 2)}`;
    
            leftDiv1.appendChild(leftTxt);
            leftDiv1.appendChild(essenceImg);
            leftDiv1.appendChild(leftTxt2);

            mainBtnPot.style.background = '#98FFAF';
            mainBtnPot.style.boxShadow = '0 0.7vh #5FA86F';
            rightDiv1.style.display = 'none';


            return
        }

        // Handle mining states and timer transitions
        if (!state && mineState === 2 && leftDiv0.innerHTML === '') {
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'Mining...';
            leftDiv0.appendChild(leftTxt);
            leftDiv0.appendChild(coinImg);

            let rightTxt = document.createElement('span');
            rightTxt.textContent = '01:00:00';
            rightDiv0.appendChild(rightTxt);

            mainBtnMine.style.background = '#8c8c8c';
            mainBtnMine.style.boxShadow = '0 0.7vh #707070';

            let minutes = MiningTime;
            let totalSeconds = minutes * 60;

            let updateTimer = () => {
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                rightTxt.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
                if (totalSeconds > 0) {
                    totalSeconds--; // Decrement the total seconds
                } else {
                    clearInterval(timerIntervalMine); // Stop the timer
                    console.log('part 1')
                    localStorage.setItem("mineState", 3);
                    setTimeout(function(){
                        leftDiv0.innerHTML = '';
                        rightDiv0.innerHTML = '';

                        mainBtnMine.style.background = '#98FFAF';
                        mainBtnMine.style.boxShadow = '0 0.7vh #5FA86F';
                        console.log('part 1.5')
                        appendContent(state); // Recurse after state change
                        console.log('part 2')
                    }, 100);
                }
            };

            // Update timer immediately and then every second
            updateTimer();
            let timerIntervalMine = setInterval(updateTimer, 1000);
            return;
        }

        // Handle potState == 2 and similar for pot
        if (state && potState === 2 && leftDiv1.innerHTML === '') {
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'Mining...';
            leftDiv1.appendChild(leftTxt);
            leftDiv1.appendChild(essenceImg);

            rightDiv1.style.display = 'flex';

            let rightTxt = document.createElement('span');
            rightTxt.textContent = '01:00:00';
            rightDiv1.appendChild(rightTxt);

            mainBtnPot.style.background = '#8c8c8c';
            mainBtnPot.style.boxShadow = '0 0.7vh #707070';

            let minutes = EssenceTime;
            let totalSeconds = minutes * 60;

            let updateTimer = () => {
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                rightTxt.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
                if (totalSeconds > 0) {
                    totalSeconds--; // Decrement the total seconds
                } else {
                    clearInterval(timerIntervalPot); // Stop the timer
                    localStorage.setItem("potState", 3);
                    setTimeout(function(){
                        leftDiv1.innerHTML = '';
                        rightDiv1.innerHTML = '';

                        mainBtnPot.style.background = '#98FFAF';
                        mainBtnPot.style.boxShadow = '0 0.7vh #5FA86F';

                        appendContent(state); // Recurse after state change
                    }, 100);
                }
            };

            // Update timer immediately and then every second
            updateTimer();
            let timerIntervalPot = setInterval(updateTimer, 1000);
            return;
        }

        if (!state && mineState === 3 && leftDiv0.innerHTML === '') {
            console.log('part 3')
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'CLAIM';

            let leftTxt2 = document.createElement('span');
            leftTxt2.textContent = `${MainUserInfo["unused_balance"]}`;
    
            leftDiv0.appendChild(leftTxt);
            leftDiv0.appendChild(coinImg);
            leftDiv0.appendChild(leftTxt2);

            mainBtnMine.style.background = '#98FFAF';
            mainBtnMine.style.boxShadow = '0 0.7vh #5FA86F';

            rightDiv0.style.display = 'none';

            mainBtnMine.onclick = function() {
                leftDiv0.innerHTML = ''
                rightDiv0.style.display = 'flex';
                rightDiv0.innerHTML = ''
                localStorage.setItem("mineState", 1)
                appendContent(state);
            }

            return
        };

        if (state && potState === 3 && leftDiv1.innerHTML === '') {
            let leftTxt = document.createElement('span');
            leftTxt.textContent = 'CLAIM';

            let leftTxt2 = document.createElement('span');
            leftTxt2.textContent = `${MainUserInfo["unused_essence"]}`;
    
            leftDiv1.appendChild(leftTxt);
            leftDiv1.appendChild(essenceImg);
            leftDiv1.appendChild(leftTxt2);

            mainBtnPot.style.background = '#98FFAF';
            mainBtnPot.style.boxShadow = '0 0.7vh #5FA86F';
            rightDiv1.style.display = 'none';

            mainBtnPot.onclick = function() {
                leftDiv1.innerHTML = ''
                rightDiv1.style.display = 'flex';
                rightDiv1.innerHTML = ''
                localStorage.setItem("potState", 1)
                appendContent(state);
            }

            return
        };

    };

    appendContent(false);

    let setUpIsland = function(state) {
        document.getElementById('childIslandIMG').src = islandMapping.get(!state ? 1 : 0)
        document.getElementById('mainIslandIMG').src = islandMapping.get(state ? 1 : 0)
        appendContent(state)
    }

    islandSwitchBtn.onclick = function() {
        IslandState = !IslandState
        globalIslandState = !globalIslandState;
        setUpIsland(IslandState)
    }
    
    let showPreloader = function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('preloadContainer').style.display = 'flex';

        document.getElementById('mainContainer').style.display = 'flex';
        document.getElementById('preloadContainer').style.display = 'none';

        
        return
        let progressBar = document.getElementById("progressBarPreloader");
        let fill = document.createElement("div");
        fill.classList.add("fill-Preloader");
        
        progressBar.appendChild(fill);
        
        let width = 0; // Initialize width
        let interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval); // Stop when filled
                document.getElementById('preloadContainer').style.display = 'none';
                document.getElementById('mainContainer').style.display = 'block';
            } else {
                width += 1; // Increment width by 1%
                fill.style.width = width + "%"; // Update fill width
            }
        }, 1);
    };    

    showPreloader();

    document.getElementById('mainContainer').style.display = 'none';

    let storiesPage = document.getElementById('storiesContainer');

    storiesPage.style.display = 'flex';

    let storiesIMG = document.getElementById('storiesImage');
    storiesIMG.style.backgroundRepeat = 'no-repeat';
    storiesIMG.style.backgroundSize = 'cover';
    var curStory = 1;

    // storiesPage.style.backgroundImage = `url('./images/Stories-${curStory}.png')`;
    // storiesPage.style.backgroundRepeat = 'no-repeat';
    // storiesPage.style.backgroundSize = 'cover';
    // storiesPage.style.backgroundPosition = 'center';
    storiesIMG.style.backgroundImage = `url("./images/Stories-${curStory}.png")`;
    
    storiesPage.onclick = function() {
        if (curStory === 3) {
            storiesPage.style.display = 'none';
            document.getElementById('mainContainer').style.display = 'flex';
            storiesPage.onclick = function() {};
        }
        if (curStory === 1) {
            curStory++;
        }
        if (curStory === 2) {
            storiesIMG.style.backgroundImage = `url("./images/Stories-${curStory}.png")`;
            curStory++;
        }
    };
    
    // let settingsBtn = document.getElementById("settingsBtn");
    // settingsBtn.onclick = function() {
    //     document.getElementById("containerSettings").style.display = 'flex';
    //     let walletBtn = document.getElementById("walletBtn");
    //     walletBtn.onclick = function() {
    //         document.getElementById("popUPWallet").style.display = 'flex';
    //     };
    // };
    
    // let popUPIncome = document.getElementById('popUPIncome');
    // popUPIncome.style.display = 'flex';
    // let xIncome = document.getElementById('X_Income');
    // xIncome.onclick = function() {popUPIncome.style.display = 'none';};
       
    // document.getElementById('frensBtn').onclick = function() {
    //     sessionStorage.setItem('frensInfo', `{"num_of_refs": 3, "total": 6000, "refs_arr": [{"full_name": "Muhhamad R","league": "br"},{"full_name": "Muhhamad B","league": "sr"},{"full_name": "Muhhamad Z","league": "gd"}], "tops_arr": [{"full_name": "iducky","num": 1232131},{"full_name": "liot","num": 1220},{"full_name": "liot2","num": 120},{"full_name": "liot3","num": 10},{"full_name": "liot4","num": 0}]}`);
    //     document.getElementById('mainContainer').style.display = 'none';
    //     document.getElementById('frensContainer').style.display = 'flex';
    //     let refsTOP = document.getElementById('refsTOP');
    //     let frensTOP = document.getElementById('frensTOP');

    //     refsTOP.style.display = 'none';
    //     let refsMenu = document.getElementById('topRefsBtn');
    //     let frensMenu = document.getElementById('topFrensBtn');
    //     let invtMe = document.getElementById('inviteMe');
    //     invtMe.onclick = function() {
    //         document.getElementById('mainContainer').style.display = 'block';
    //         document.getElementById('frensContainer').style.display = 'none';
    //     };
    //     refsMenu.style.boxShadow = 'none';

    //     let someData = JSON.parse(sessionStorage.getItem('frensInfo'));
        
    //     let topFrensInfo = someData["refs_arr"];
    //     let topRefsInfo = someData["tops_arr"];
    //     let BackButton = tg.WebApp.BackButton;

    //     BackButton.show();
    //     BackButton.onClick(function() {
    //         BackButton.hide();
    //         frensTOP.style.display = 'flex';
    //         refsTOP.style.display = 'none';
    //         refsMenu.style.boxShadow = "none";
    //         frensMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
    //         document.getElementById('frensContainer').style.display = 'none';
    //         document.getElementById('mainContainer').style.display = 'block';
    //     });

    //     for (let ij = 0; ij < topFrensInfo.length; ij++) {
    //         let docStrName =  `topFrensName_${ij+1}`
    //         // let docStrNumber =  `topReffererNumber_${ij+1}`
    //         document.getElementById(docStrName).textContent = topFrensInfo[ij]["full_name"];
    //         let imageLeague = document.getElementById(`FrenLeague_${ij+1}`);
    //         if (topFrensInfo[ij]["league"] === "sr") {
    //             imageLeague.src = './images/Silver_League.png';
    //         } else if (topFrensInfo[ij]["league"] === "gd") {
    //             imageLeague.src = './images/Golden_League.png';
    //         }
    //         // document.getElementById(docStrNumber).textContent = topFrensInfo[ij]["num"];
    //     }

    //     for (let ij = 0; ij < topRefsInfo.length; ij++) {
    //         let docStrName =  `topReffererName_${ij+1}`
    //         let docStrNumber =  `topReffererNumber_${ij+1}`
    //         document.getElementById(docStrName).textContent = topRefsInfo[ij]["full_name"];
    //         document.getElementById(docStrNumber).textContent = topRefsInfo[ij]["num"];
    //     }

    //     refsMenu.onclick = function() {
    //         frensTOP.style.display = 'none';
    //         refsTOP.style.display = 'flex';
    //         refsMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
    //         frensMenu.style.boxShadow = "none";
    //     }

    //     frensMenu.onclick = function() {
    //         frensTOP.style.display = 'flex';
    //         refsTOP.style.display = 'none';
    //         refsMenu.style.boxShadow = "none";
    //         frensMenu.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
    //     }
    // };

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
        let jsonTickets = JSON.parse(`{\"link_1\":\"https://t.me/$iMVT0XW4yEtRCwAAVm9zkV1lnhw\",\"link_2\":\"https://t.me/$7bQksnW4yEtSCwAAQCN4DYyi78E\",\"link_3\":\"https://t.me/$hgMjaXW4yEtTCwAASJVCgDo7LpY\",\"link_4\":\"https://t.me/$fHvk5HW4yEtUCwAANz0T3NWacaw\"}`);
        let wheelIMG = document.getElementById('wheelIMG');
        let buyTicketsBtn = document.getElementById('buyTicketsBtn');
        let buyTicketsWindow = document.getElementById('buyTicketsWindow');

        buyTicketsBtn.onclick = function() {

            document.getElementById('agreeTickText').style.color = 'white';
            document.getElementById('agreeTickText').style.fontFamily = '"Open Sans", sans-serif';
            document.getElementById('agreeTickText').style.fontSize = '2vh';

            document.getElementById('agreeTick').onclick = function() {
                document.getElementById('checkboxAgreement').style.display = 'none';
            }

            document.getElementById('gamesContainer').style.display = 'none';
            buyTicketsWindow.style.display = 'flex';
            for (let iTicket = 1; iTicket < 5; iTicket ++) {
                document.getElementById(`ticketLink_${iTicket}`).onclick = function() {
                    tg.WebApp.openInvoice(jsonTickets[`link_${iTicket}`], (status) => {
                        if (status === "paid") {
                            tg.WebApp.showAlert(`payment is GOOD ${status}`);
                        } else {
                            tg.WebApp.showAlert(`payment is BAD ${status}`);
                        }
                    });
                };
            }
        };

        let withdrawBtn = document.getElementById('withdrawBTN');
        withdrawBtn.onclick = function() {
            document.getElementById('gamesContainer').style.display = 'none';
            document.getElementById('withdrawContainer').style.display = 'flex';
        }

        let giftsBtn = document.getElementById('giftsBTN');
        giftsBtn.onclick = function() {
            document.getElementById('gamesContainer').style.display = 'none';
            document.getElementById('giftsContainer').style.display = 'flex';
        }

        let getRandomNumber = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        let smoothSpin = function() {
        
            let randomNumber = getRandomNumber(-14, 14);
           
            let totalRotations = 1080 + 90 + randomNumber; // Total degrees to spin
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
        let ISspinning = false;

        let spinnerWr = function() {
            if (ISspinning) return; // Prevent spinning if already in progress
        
            ISspinning = true; // Set spinning flag to true
          
            // Reset rotation before spinning
            wheelIMG.style.transition = 'none'; // Disable transition for reset
            wheelIMG.style.transform = `rotate(0deg)`;
        
            // Allow some time for the reset before starting the spin
            setTimeout(function() {
                smoothSpin();
            }, 1000);
        
            // Re-enable button after spin is complete
            setTimeout(function() {
                ISspinning = false; // Reset spinning flag
            }, 5000); // Adjust this time as needed based on spin duration
        };
        
        // Add event listener to the button
        wheelIMG.addEventListener("click", spinnerWr);

        wheelGame.onclick = function() {
            gamesOutline.style.display = 'none';
            headerText.textContent = `Lucky Wheel`;
            wheelBG.style.display = 'flex';

            let wheelData = {
                "winners": [
                    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", 
                    "Ivan" 
                     // Add more items up to 100
                ]
            };
            
            // Get the span and button elements
            let winnersText = document.getElementById("winnersText");
          
            
            let index = 0;
           
            // Function to change the text content of the span
            function changeWinner() {
                // Add fall class to trigger animation
                winnersText.classList.add('fall');
            
                // Wait for the animation to complete
                setTimeout(() => {
                    // Change text after animation starts
                    winnersText.textContent = `${wheelData.winners[index]} just won 0.01 TON`;
                    
                    // Remove fall class to reset for next animation
                    winnersText.classList.remove('fall');
                    
                    index = (index + 1) % wheelData.winners.length; // Loop back to 0 after reaching the end
                }, 1000); // Match this duration with the CSS transition duration
            }

            setInterval(changeWinner, 5000);
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

    // document.getElementById('boostsBtn').onclick = function() {
    //     let BoostMinePopUp = document.getElementById('popUPBoostMine');
    //     let BoostBrewPopUp = document.getElementById('popUPBoostBrew');
    //     let BoostRobotPopUp = document.getElementById('popUPBoostRobot');
    //     let BuyMinePopUp = document.getElementById('popUPBuyMine');
    //     let BuyPotPopUp = document.getElementById('popUPBuyPot');

    //     document.getElementById('mainContainer').style.display = 'none';
    //     document.getElementById('boostsContainer').style.display = 'flex';

    //     let boostPickaxe = document.getElementById('boostPickaxe');
    //     let boostBrew = document.getElementById('boostBrew');
    //     let boostRobot = document.getElementById('boostRobot');
    //     let buyMine = document.getElementById('buyMine');
    //     let buyPot = document.getElementById('buyPot');

    //     let BackButton = tg.WebApp.BackButton;

    //     BackButton.show();
    //     BackButton.onClick(function() {
    //         BoostMinePopUp.style.display = 'none';
    //         BoostBrewPopUp.style.display = 'none';
    //         BoostRobotPopUp.style.display = 'none';

    //         document.getElementById('boostsContainer').style.display = 'none';
    //         document.getElementById('mainContainer').style.display = 'block';
    //         BackButton.hide();
    //     });
        
    //     function Show_Boost_Pickaxe() {
    //         boostBrew.removeEventListener("click", Show_Boost_Brew);
    //         boostRobot.removeEventListener("click", Show_Boost_Robot);

    //         let claimBtn = document.getElementById('claim_BoosterMine')
    //         let XClose = document.getElementById('X_BoosterMine');
    //         XClose.onclick = function() { 
    //             boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //             BoostMinePopUp.style.display = 'none';

    //             boostBrew.addEventListener("click", Show_Boost_Brew);
    //             boostRobot.addEventListener("click", Show_Boost_Robot);
    //         };
            
    //         boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
    //         BoostMinePopUp.style.display = 'flex';
    //         // var date = new Date();
    //         // date.setMinutes(date.getMinutes()+20);
    //         // localStorage.setItem('expireMine', date)
    //         // localStorage.setItem('expireMine', new Date().setMinutes(new Date().getMinutes()+5));
    //         let currentDate = Date.parse(new Date());
    //         let lastDate = parseInt(localStorage.getItem('expireMine'));
            
    //         if ((currentDate > lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate)))
    //         {
    //             claimBtn.style.opacity = '1';
    //             claimBtn.onclick = function() {
    //                 BoostMinePopUp.style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //                 document.getElementById('boostsContainer').style.display = 'none';
    //                 let expirationTime = new Date().getTime() + (1 * 60 * 1000);
    //                 localStorage.setItem('expireMine', expirationTime);
    //                 claimBtn.style.opacity = '0.5';
    //             };
    //         } else if (lastDate === undefined || lastDate === null || isNaN(lastDate)) {
    //             claimBtn.onclick = function() {
    //                 BoostMinePopUp.style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //                 document.getElementById('boostsContainer').style.display = 'none';
    //                 let expirationTime = new Date().getTime() + (1 * 60 * 1000);
    //                 localStorage.setItem('expireMine', expirationTime);
    //                 claimBtn.style.opacity = '0.5';
    //             }; 
    //         } else if ((currentDate < lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate))) {
    //             claimBtn.style.opacity = '0.5';
    //             claimBtn.onclick = function() {
    //             }; 
    //         }
    //     };

    //     function Show_Boost_Brew() {
    //         boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
    //         boostRobot.removeEventListener("click", Show_Boost_Robot);

    //         let claimBtn = document.getElementById('claim_BoosterBrew')
    //         let XClose = document.getElementById('X_BoosterBrew');
    //         XClose.onclick = function() { 
    //             boostBrew.addEventListener("click", Show_Boost_Brew);
    //             BoostBrewPopUp.style.display = 'none';

    //             boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //             boostRobot.addEventListener("click", Show_Boost_Robot);
    //         };
    //         boostBrew.removeEventListener("click", Show_Boost_Brew);
    //         BoostBrewPopUp.style.display = 'flex';

    //         let currentDate = Date.parse(new Date());
    //         let lastDate = parseInt(localStorage.getItem('expireBrew'));
            
    //         if ((currentDate > lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate)))
    //         {
    //             claimBtn.style.opacity = '1';
    //             claimBtn.onclick = function() {
    //                 BoostBrewPopUp.style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //                 document.getElementById('boostsContainer').style.display = 'none';
    //                 let expirationTime = new Date().getTime() + (1 * 60 * 1000);
    //                 localStorage.setItem('expireBrew', expirationTime);
    //                 claimBtn.style.opacity = '0.5';
    //             };
    //         } else if (lastDate === undefined || lastDate === null || isNaN(lastDate)) {
    //             claimBtn.onclick = function() {
    //                 BoostBrewPopUp.style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //                 document.getElementById('boostsContainer').style.display = 'none';
    //                 let expirationTime = new Date().getTime() + (1 * 60 * 1000);
    //                 localStorage.setItem('expireBrew', expirationTime);
    //                 claimBtn.style.opacity = '0.5';
    //             }; 
    //         } else if ((currentDate < lastDate) && (lastDate != undefined && lastDate != null && !isNaN(lastDate))) {
    //             claimBtn.style.opacity = '0.5';
    //             claimBtn.onclick = function() {
    //             }; 
    //         }
    //     };

    //     function Show_Boost_Robot() {
    //         boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
    //         boostBrew.removeEventListener("click", Show_Boost_Brew);

    //         let claimBtn = document.getElementById('claim_BoosterRobot');
    //         let newsBtn = document.getElementById('news_btn');
    //         let XClose = document.getElementById('X_BoosterRobot');
    //         XClose.onclick = function() {
    //             BoostRobotPopUp.style.display = 'none';
    //             boostRobot.addEventListener("click", Show_Boost_Robot);

    //             boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //             boostBrew.addEventListener("click", Show_Boost_Brew);
    //         };
    //         BoostRobotPopUp.style.display = 'flex';
    //         newsBtn.onclick = function() {
    //             window.location.href = 'https://t.me/gemseee'
    //         }
    //     };

    //     function Show_Buy_Mine() {
    //         boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
    //         boostBrew.removeEventListener("click", Show_Boost_Brew);
    //         boostRobot.removeEventListener("click", Show_Boost_Robot);

    //         BuyMinePopUp.style.display = 'flex';
    //         let XClose = document.getElementById('X_BuyMine');
    //         XClose.onclick = function() {
    //             BuyMinePopUp.style.display = 'none';

    //             boostRobot.addEventListener("click", Show_Boost_Robot);
    //             boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //             boostBrew.addEventListener("click", Show_Boost_Brew);
    //         };
    //     }

    //     function Show_Buy_Pot() {
    //         boostPickaxe.removeEventListener("click", Show_Boost_Pickaxe);
    //         boostBrew.removeEventListener("click", Show_Boost_Brew);
    //         boostRobot.removeEventListener("click", Show_Boost_Robot);
    //         buyMine.removeEventListener("click", Show_Buy_Mine);

    //         let someData = JSON.parse('{"cauldron_level":2, "mine_level": 2}');

    //         BuyPotPopUp.style.display = 'flex';

    //         let XClose = document.getElementById('X_BuyPot');
    //         XClose.onclick = function() {
    //             BuyPotPopUp.style.display = 'none';

    //             boostRobot.addEventListener("click", Show_Boost_Robot);
    //             boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //             boostBrew.addEventListener("click", Show_Boost_Brew);
    //             buyMine.addEventListener("click", Show_Buy_Mine);
    //         };

    //         function SetUp() {
    //             let cauldron_level = someData['cauldron_level'];
    //             document.getElementById('essenceAmntBefore').textContent = `${cauldron_level} essence/min`;
    //             document.getElementById('essenceAmntAfter').textContent = `${cauldron_level + 1} essence/min`;

    //             document.getElementById('essenceMinBefore').textContent = `${120*cauldron_level} mins`;
    //             document.getElementById('essenceMinAfter').textContent = `${120*(cauldron_level+1)} mins`;
    //         }
    //         SetUp();
    //     }

    //     boostPickaxe.addEventListener("click", Show_Boost_Pickaxe);
    //     boostBrew.addEventListener("click", Show_Boost_Brew);
    //     boostRobot.addEventListener("click", Show_Boost_Robot);
    //     buyMine.addEventListener("click", Show_Buy_Mine);
    //     buyPot.addEventListener("click", Show_Buy_Pot);
    // }

    // const essenceTrigger = document.getElementById('popup-essence');
    // const mineTrigger = document.getElementById('popup-mine');
    // const kingdomsTrigger = document.getElementById('kingdomsBtn');

    // kingdomsTrigger.onclick = function() {

    //     var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
    //     var eventName = isOnIOS ? "pagehide" : "beforeunload";
    //     window.addEventListener(eventName, function (event) {
    //         sessionStorage.removeItem('card_queen_timer');
    //         sessionStorage.removeItem('card_king_timer');
    //         sessionStorage.removeItem('card_worker_timer');
    //         sessionStorage.removeItem('card_trader_timer');
    //         sessionStorage.removeItem('card_prince_timer');
    //         sessionStorage.removeItem('card_princess_timer');
    //         sessionStorage.removeItem('card_wizard_timer');
    //         sessionStorage.removeItem('card_witch_timer');
    //         sessionStorage.removeItem('card_dragon_timer');
    //         sessionStorage.removeItem('card_soldier_timer');
    //         sessionStorage.removeItem('card_knight_timer');
    //     });
            
    //     let processCards = function() {

    //         let cardsBtn = document.getElementById('btnCards');
    //         let popUpCards = document.getElementById('popUPKingdomsCards');
    //         document.getElementById('kingdomsContainer').style.display = 'flex';
    //         let cardQueen = document.getElementById('cardQueen');
    //         let cardKing = document.getElementById('cardKing');
    //         let cardPrince = document.getElementById('cardPrince');
    //         let cardPrincess = document.getElementById('cardPrincess');
    //         let cardTrader = document.getElementById('cardTrader');
    //         let cardWorker = document.getElementById('cardWorker');
    //         let cardDragon = document.getElementById('cardDragon');
    //         let cardWitch = document.getElementById('cardWitch');
    //         let cardWizard = document.getElementById('cardWizard');
    //         let cardSoldier = document.getElementById('cardSoldier');
    //         let cardKnight = document.getElementById('cardKnight');

    //         let menuEmpire = document.getElementById('menuEmpire');
    //         let menuArmy = document.getElementById('menuArmy');
    //         let menuMagic = document.getElementById('menuMagic');
    //         let menuSpecial = document.getElementById('menuSpecial');

    //         let upgradeWindow = document.getElementById('cardUpgrade');
    //         let upgradeCardName = document.getElementById('upgradeCardName');
    //         let upgradeCardImg = document.getElementById('upgradeCardImg');
    //         let upgradeCardIncome = document.getElementById('upgradeCardIncome');
    //         let upgradeCardPower = document.getElementById('upgradeCardPower');
    //         let upgradeCardPrice = document.getElementById('upgradeCardPrice');

    //         let allCardsEmpire = document.getElementById('allCardsEmpire');
    //         let allCardsArmy = document.getElementById('allCardsArmy');
    //         let allCardsMagic = document.getElementById('allCardsMagic');
    //         let allCardsSpecial = document.getElementById('allCardsSpecial');

    //         //added

    //         let dailyWindow = document.getElementById('popUPDailyCombo');
    //         let closeDaily = document.getElementById('X_Daily');
    //         let checkComboBtn = document.getElementById('checkComboBtn');

    //         let queenDaily = document.getElementById('queenDaily');
    //         let kingDaily = document.getElementById('kingDaily');
    //         let princeDaily = document.getElementById('princeDaily');
    //         let princessDaily = document.getElementById('princessDaily');
    //         let wizardDaily = document.getElementById('wizardDaily');
    //         let witchDaily = document.getElementById('witchDaily');
    //         let soldierDaily = document.getElementById('soldierDaily');
    //         let knightDaily = document.getElementById('knightDaily');

    //         let firstCombo = document.getElementById('1Combo');
    //         let secondCombo = document.getElementById('2Combo');
    //         let thirdCombo = document.getElementById('3Combo');

    //         let reqBody = {
    //         };

    //         checkComboBtn.onclick = function() {

    //             let JSONdata = JSON.parse(sessionStorage.getItem('cardsInfo'));
                
    //             if (JSONdata["combo_flag"] === true) {
    //                 tg.WebApp.showAlert('Come back tomorrow!');
    //                 return
    //             };

    //             let fieldCount = Object.keys(reqBody).length;
    //             if (fieldCount < 3) {
    //                 tg.WebApp.showAlert('Choose 3 different cards!');
    //                 return
    //             };
                
    //             if ((reqBody.first === reqBody.second) || (reqBody.first === reqBody.third) ||
    //             (reqBody.second === reqBody.third)) {
    //                 tg.WebApp.showAlert('Choose 3 different cards!');
    //                 return
    //             };

    //             if (true) {
    //                 let response = '{"first": true, "second": true, "third": false}'
    //                 let respJSON = JSON.parse(response);
    //                 if (respJSON["first"]) {
    //                     firstCombo.style.outlineStyle = 'solid';
    //                     firstCombo.style.outlineColor = '#98FFAF';
    //                     firstCombo.style.outlineWidth = 'medium';
    //                     firstCombo.style.borderRadius = '12px';
    //                 } else {
    //                     firstCombo.style.outlineStyle = 'solid';
    //                     firstCombo.style.outlineColor = 'red';
    //                     firstCombo.style.outlineWidth = 'medium';
    //                     firstCombo.style.borderRadius = '12px';
    //                 };
    //                 if (respJSON["second"]) {
    //                     secondCombo.style.outlineStyle = 'solid';
    //                     secondCombo.style.outlineColor = '#98FFAF';
    //                     secondCombo.style.outlineWidth = 'medium';
    //                     secondCombo.style.borderRadius = '12px';
    //                 } else {
    //                     secondCombo.style.outlineStyle = 'solid';
    //                     secondCombo.style.outlineColor = 'red';
    //                     secondCombo.style.outlineWidth = 'medium';
    //                     secondCombo.style.borderRadius = '12px';
    //                 };
    //                 if (respJSON["third"]) {
    //                     thirdCombo.style.outlineStyle = 'solid';
    //                     thirdCombo.style.outlineColor = '#98FFAF';
    //                     thirdCombo.style.outlineWidth = 'medium';
    //                     thirdCombo.style.borderRadius = '12px';
    //                 } else {
    //                     thirdCombo.style.outlineStyle = 'solid';
    //                     thirdCombo.style.outlineColor = 'red';
    //                     thirdCombo.style.outlineWidth = 'medium';
    //                     thirdCombo.style.borderRadius = '12px';
    //                 };
    //             } else {
    //                 tg.WebApp.showAlert('Come back tomorrow!');
    //                 return
    //             }
    //         };

    //         let placeCard = function(type) {
    //             let path = `./images/cards/card_${type}.png`;
    //             let defaultPath = `/images/combo_green.png`;
    //             if (firstCombo.src.endsWith(defaultPath)) {
    //                 reqBody.first = `card_${type}`;
    //                 firstCombo.src = path;
    //             } else if (secondCombo.src.endsWith(defaultPath)) {
    //                 reqBody.second = `card_${type}`;
    //                 secondCombo.src = path;
    //             } else if (thirdCombo.src.endsWith(defaultPath)) {
    //                 reqBody.third = `card_${type}`;
    //                 thirdCombo.src = path;
    //             }
    //             console.log(reqBody);
    //         };


    //         let infoDailyBtn = document.getElementById('infoDailyBtn');

    //         dailyBtn.onclick = function() {
    //             dailyWindow.style.display = 'flex';
    //             popUpCards.style.display = 'none';
    //             closeDaily.onclick = function() {
    //                 dailyWindow.style.display = 'none';
    //             };

    //             kingDaily.onclick = function() {
    //                 placeCard('king');
    //             }

    //             queenDaily.onclick = function() {
    //                 placeCard('queen');
    //             }

    //             princeDaily.onclick = function() {
    //                 placeCard('prince');
    //             }

    //             princessDaily.onclick = function() {
    //                 placeCard('princess');
    //             }

    //             wizardDaily.onclick = function() {
    //                 placeCard('wizard');
    //             }

    //             witchDaily.onclick = function() {
    //                 placeCard('witch');
    //             }

    //             soldierDaily.onclick = function() {
    //                 placeCard('soldier');
    //             }

    //             knightDaily.onclick = function() {
    //                 placeCard('knight');
    //             }

    //             firstCombo.onclick = function() {
    //                 firstCombo.src = `./images/combo_green.png`;
    //                 firstCombo.style.outline = 'none';
    //             };

    //             secondCombo.onclick = function() {
    //                 secondCombo.src = `./images/combo_green.png`;
    //                 secondCombo.style.outline = 'none';
    //             };

    //             thirdCombo.onclick = function() {
    //                 thirdCombo.src = `./images/combo_green.png`;
    //                 thirdCombo.style.outline = 'none';
    //             };

    //             infoDailyBtn.onclick = function() {
    //                 tg.WebApp.showPopup({
    //                     title  : 'Popup title',
    //                     message: 'You can find a daily combo here:',
    //                     buttons: [
    //                         {id: 'X', type: 'default', text: 'X / Twitter'},
    //                         {id: 'Vladlen TON', type: 'default', text: 'Vladlen TON'},
    //                         {type: 'cancel'},
    //                     ]
    //                 }, function (buttonId) {
    //                     if (buttonId === 'X') {
    //                         window.location.href = 'https://twitter.com/gemseeton';
    //                     } else if (buttonId === 'Vladlen TON') {
    //                         window.location.href = 'https://t.me/vladlenton';
    //                     };
    //                 });
    //             };
    //         };

    //         function updateDailyCountdown() {
    //             let now = new Date();
    //             // Get the current date in UTC
    //             let utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
                
    //             // Set the target time to 00:00 UTC of the next day
    //             let targetDate = new Date(utcDate.setUTCHours(0, 0, 0, 0));
                
    //             // Calculate the difference in milliseconds
    //             let difference = targetDate - now;
            
    //             // Calculate days, hours, minutes, and seconds
    //             let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //             let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    //             let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //             let formattedHours = String(hours).padStart(2, '0');
    //             let formattedMinutes = String(minutes).padStart(2, '0');
    //             let formattedSeconds = String(seconds).padStart(2, '0');
    //             // Update the countdown display
    //             document.getElementById('comboCountDown').textContent = 
    //                 `New combo in ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            
    //             // If the countdown is finished, reset it to the next day
    //             if (difference < 0) {
    //                 clearInterval(timer);
    //                 updateDailyCountdown(); // Reset immediately
    //             }
    //         }
            
    //         // Update the countdown every second
    //         let timer = setInterval(updateDailyCountdown, 1000);
            
    //         // Initial call to display the countdown immediately
    //         updateDailyCountdown();
        
    //         let BackButton = tg.WebApp.BackButton;
    //         BackButton.show();
    //         BackButton.onClick(function() {
    //             BackButton.hide();
    //             popUpCards.style.display = 'none';
    //             upgradeWindow.style.display = 'none';
    //             document.getElementById('cardsMenu').style.display = 'grid';
    //             menuArmy.style.boxShadow = 'none';
    //             menuMagic.style.boxShadow = 'none';
    //             menuSpecial.style.boxShadow = 'none';
    //             dailyWindow.style.display = 'none';
    //             document.getElementById('kingdomsContainer').style.display = 'none';
    //             document.getElementById('mainContainer').style.display = 'block';
    //         });

    //         allCardsEmpire.style.display = 'flex';

    //         cardsBtn.onclick = function() {
    //             popUpCards.style.display = 'flex';
    //         };

    //         let xPopUpBtn = document.getElementById('X_Cards');

    //         xPopUpBtn.onclick = function() {
    //             popUpCards.style.display = 'none';
    //         };


    //         menuEmpire.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';

    //         menuEmpire.onclick = function() {
    //             menuEmpire.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';
    //             menuArmy.style.boxShadow = 'none'
    //             menuMagic.style.boxShadow = 'none'
    //             menuSpecial.style.boxShadow = 'none'

    //             allCardsMagic.style.display = 'none';
    //             allCardsArmy.style.display = 'none';
    //             allCardsSpecial.style.display = 'none';
    //             allCardsEmpire.style.display = 'flex';
    //         };

    //         menuArmy.onclick = function() {
    //             menuArmy.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px';
    //             menuMagic.style.boxShadow = 'none'
    //             menuSpecial.style.boxShadow = 'none'
    //             menuEmpire.style.boxShadow = 'none'

    //             allCardsArmy.style.display = 'flex';
    //             allCardsEmpire.style.display = 'none';
    //             allCardsSpecial.style.display = 'none';
    //             allCardsMagic.style.display = 'none';
    //         };

    //         menuMagic.onclick = function() {
    //             menuMagic.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px'
    //             menuSpecial.style.boxShadow = 'none'
    //             menuEmpire.style.boxShadow = 'none'
    //             menuArmy.style.boxShadow = 'none'

    //             allCardsEmpire.style.display = 'none';
    //             allCardsArmy.style.display = 'none';
    //             allCardsSpecial.style.display = 'none';
    //             allCardsMagic.style.display = 'flex';
    //         };

    //         menuSpecial.onclick = function() {
    //             menuSpecial.style.boxShadow = 'inset #2A4864 0px 0px 40px -9px'
    //             menuMagic.style.boxShadow = 'none'
    //             menuEmpire.style.boxShadow = 'none'
    //             menuArmy.style.boxShadow = 'none'

    //             allCardsEmpire.style.display = 'none';
    //             allCardsArmy.style.display = 'none';
    //             allCardsMagic.style.display = 'none';
    //             allCardsSpecial.style.display = 'flex';
    //         };

    //         let getValues = function(type, level) {

    //             if (type === "green") {
    //                 return (green.get(level + 1)[0]) - (green.get(level)[0])
    //             } else if (type === "red") {
    //                 return (red.get(level + 1)[0]) - (red.get(level)[0])
    //             } else if (type === "orange") {
    //                 return (orange.get(level + 1)[0]) - (orange.get(level)[0])
    //             } else if (type === "yellow") {
    //                 return (yellow.get(level + 1)[0]) - (yellow.get(level)[0])
    //             }
    //         };
            
    //         let checkTimer = async function(type) {

    //             let base = `card_${type}_`
    //             let checkDeadline = localStorage.getItem(base + 'deadline');
    //             let deadline = Date.now();
    
    //             if (deadline === null || deadline === undefined) {
    //                 localStorage.removeItem(base + 'deadline');
    //                 sessionStorage.removeItem(base + 'deadline');
    //                 return;
    //             }
    
    //             if (new Date(checkDeadline) < deadline) {
    //                 localStorage.removeItem(base + 'deadline');
    //                 sessionStorage.removeItem(base + 'deadline');
    //                 return;
    //             }
    
    //             let checker = localStorage.getItem(`card_${type}_timer`);
    //             // значит что таймер УЖЕ установлен
    //             if (checker !== undefined && checker !== null && checker !== "") {
    //                 // Проверяю, что юзер в прошлой сессии
    //                 let checkSession = sessionStorage.getItem(`card_${type}_timer`);
    //                 if (checkSession === undefined || checkSession === null || checkSession === "") {
    //                     // значит он в новой сессии (перезашел), надо заного установить часы, else = они уже работают
    //                     sessionStorage.setItem(`card_${type}_timer`, '1');
    //                     setClock(type);
    //                 } else {
    //                     setClock(type);
    //                 };
                    
    //             } else {  // значит что таймер НЕ установлен
    //                 localStorage.setItem(`card_${type}_timer`, '15:00');
    //                 sessionStorage.setItem(`card_${type}_timer`, '1');
    //                 setClock(type);
    //             }
    //         };
    
    //         const cardsGreen = ['princess', 'wizard'];
    //         const cardsRed = ['trader', 'soldier'];
    //         const cardsYellow = ['king', 'knight', 'dragon', 'witch'];
    //         const cardsOrange = ['queen', 'prince', 'worker'];

    //         const cardsEmpire = ['princess', 'queen', 'prince', 'worker', 'king', 'trader'];
    
    //         let setUpCardData = async function(type, myJSON) {
                

    //             if (myJSON[`card_${type}`] === 10 )  {
    //                 document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
    //                 document.getElementById(`cardBuyAmnt_${type}`).textContent = `max lvl`;
    //                 document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
    //                 if (cardsGreen.includes(type)) {
    //                     let tmpArr2 = green.get(10);
    //                     let tmpIncome = tmpArr2[0];
    //                     let tmpPower = tmpIncome * 3;
    //                     document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                     document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
    //                 };
    //                 if (cardsRed.includes(type)) {
    //                     let tmpArr2 = red.get(10);
    //                     let tmpIncome = tmpArr2[0];
    //                     let tmpPower = tmpIncome * 3;
    //                     document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                     document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
    //                 };
    //                 if (cardsOrange.includes(type)) {
    //                     let tmpArr2 = orange.get(10);
    //                     let tmpIncome = tmpArr2[0];
    //                     let tmpPower = tmpIncome * 3;
    //                     document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                     document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
    //                 };
    //                 if (cardsYellow.includes(type)) {
    //                     let tmpArr2 = yellow.get(10);
    //                     let tmpIncome = tmpArr2[0];
    //                     let tmpPower = tmpIncome * 3;
    //                     document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                     document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;
    //                 };

    //                 return
    //             }

    //             if (cardsGreen.includes(type)) {
    //                 let tmpLvl = myJSON[`card_${type}`];
    //                 let tmpArr = green.get(tmpLvl + 1);
    
    //                 let flag1 = (myJSON["friends"] < 3 && type === 'princess')
    //                 let flag2 = (myJSON["friends"] < 5 && type === 'wizard')
                    
    //                 if (flag1 && type === 'princess') {
    //                     cardPrincess.onclick = function() {};
    //                     document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
    //                     document.getElementById(`cardBuyAmnt_${type}`).textContent = `3 frens`;
    //                 };
    
    //                 if (flag2 && type === 'wizard') {
    //                     cardWizard.onclick = function() {};
    //                     document.getElementById(`cardBuyImg_${type}`).src = `./images/lock.svg`;
    //                     document.getElementById(`cardBuyAmnt_${type}`).textContent = `5 frens`;
    //                 };
    
    //                 if (!flag1 && !flag2) {
    //                     document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
    //                 }
                   
    //                 document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
    //                 let tmpArr2 = green.get(tmpLvl);
    //                 let tmpIncome = tmpArr2[0];
    //                 let tmpPower = tmpIncome * 3;
    //                 document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                 document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

    //                 if (cardsEmpire.includes(`${type}`)) {
    //                     if (myJSON["essence_balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 } else {
    //                     if (myJSON["balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 };
                    
    //             } else if (cardsRed.includes(type)) {
    //                 let tmpLvl = myJSON[`card_${type}`];
    //                 let tmpArr = red.get(tmpLvl + 1);
    //                 document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
    //                 document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
    //                 let tmpArr2 = red.get(tmpLvl);
    //                 let tmpIncome = tmpArr2[0];
    //                 let tmpPower = tmpIncome * 3;
    //                 document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                 document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

    //                 if (cardsEmpire.includes(`${type}`)) {
    //                     if (myJSON["essence_balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 } else {
    //                     if (myJSON["balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 };
    //             } else if (cardsOrange.includes(type)) {
    //                 let tmpLvl = myJSON[`card_${type}`];
    //                 let tmpArr = orange.get(tmpLvl + 1);
    //                 document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
    //                 document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
    //                 let tmpArr2 = orange.get(tmpLvl);
    //                 let tmpIncome = tmpArr2[0];
    //                 let tmpPower = tmpIncome * 3;
    //                 document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                 document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

    //                 if (cardsEmpire.includes(`${type}`)) {
    //                     if (myJSON["essence_balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 } else {
    //                     if (myJSON["balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 };
    //             } else if (cardsYellow.includes(type)) {
    //                 let tmpLvl = myJSON[`card_${type}`];
    //                 let tmpArr = yellow.get(tmpLvl + 1);
    //                 document.getElementById(`cardBuyAmnt_${type}`).textContent = `${compressValues(tmpArr[1])}`;
    //                 document.getElementById(`card_${type}_level`).textContent = `${myJSON[`card_${type}`]}`;
                    
    //                 let tmpArr2 = yellow.get(tmpLvl);
    //                 let tmpIncome = tmpArr2[0];
    //                 let tmpPower = tmpIncome * 3;
    //                 document.getElementById(`card_${type}_power`).textContent = `${compressValues(tmpPower)}`;
    //                 document.getElementById(`card_${type}_income`).textContent = `${compressValues(tmpIncome)}`;

    //                 if (cardsEmpire.includes(`${type}`)) {
    //                     if (myJSON["essence_balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 } else {
    //                     if (myJSON["balance"] < tmpArr[1]) {
    //                         let tmpCardName = 'card' + type.charAt(0).toUpperCase() + type.slice(1);
    //                         document.getElementById(`cardBuyAmnt_${type}`).style.opacity = 0.6;
    //                         document.getElementById(tmpCardName).onclick = function(){};
    //                     };
    //                 };
    //             }
    
    //         };
    
    //         setUpTopMenu = async function(JSONdata) {
    //             let powerHolder = document.getElementById("topMenuPower");
    //             let incomeHolder = document.getElementById("topMenuIncome");
    
    //             powerHolder.textContent = `${compressValues(JSONdata["power"])}`;
    //             incomeHolder.textContent = `${compressValues(JSONdata["income"])}`;
    //         };
    
    //         let setUpInformation = function() {
    //             let cardsInfoString = sessionStorage.getItem('cardsInfo');
    //             let cardsInfoJSON = JSON.parse(cardsInfoString);
    
    //             setUpTopMenu(cardsInfoJSON);
    
    //             setUpCardData('queen', cardsInfoJSON);
    //             setUpCardData('king', cardsInfoJSON);
    //             setUpCardData('trader', cardsInfoJSON);
    //             setUpCardData('prince', cardsInfoJSON);
    //             setUpCardData('princess', cardsInfoJSON);
    //             setUpCardData('worker', cardsInfoJSON);
    //             setUpCardData('dragon', cardsInfoJSON);
    //             setUpCardData('wizard', cardsInfoJSON);
    //             setUpCardData('witch', cardsInfoJSON);
    //             setUpCardData('soldier', cardsInfoJSON);
    //             setUpCardData('knight', cardsInfoJSON);
    
    //             setTimeout(function() {setUpTimers()}, 300);
    //         }
    
    //         let setUpTimers = function() {
    //             checkTimer('queen');
    //             checkTimer('king');
    //             checkTimer('trader');
    //             checkTimer('prince');
    //             checkTimer('princess');
    //             checkTimer('worker');
    //             checkTimer('dragon');
    //             checkTimer('wizard');
    //             checkTimer('witch');
    //             checkTimer('soldier');
    //             checkTimer('knight');
    //         };

    //         let setClock = function(type) {
    //             let base = `card_${type}_`
    //             // Set the deadline to 15 minutes from now
    //             let deadline = new Date(Date.now() + 15 * 60 * 1000);
    //             let checkDeadline = localStorage.getItem(base + 'deadline');
    //             if (checkDeadline === undefined || checkDeadline === null || checkDeadline === "") {
    //                 localStorage.setItem(base + 'deadline', deadline);  
    //             } else {
    //                 deadline = localStorage.getItem(base + 'deadline');  
    //             }
    //             // Function to update the countdown
    //             function updateCountdown() {
    //                 document.getElementById('cardBuyImg_' + type).src = './images/lock.svg'
    //                 let now = new Date();
    //                 let remainingTime = new Date(deadline) - now; // Calculate remaining time in milliseconds
    
    //                 if (remainingTime <= 0) {
    //                     localStorage.removeItem(base + 'timer');
    //                     localStorage.removeItem(base + 'deadline');
    //                     sessionStorage.removeItem(base + 'timer');
    //                     clearInterval(countdownInterval);
                       
    //                     return;
    //                 }
    
    //                 // Calculate minutes and seconds
    //                 let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    //                 let seconds = Math.floor((remainingTime / 1000) % 60);
                    
    //                 // Format minutes and seconds to always show two digits
    //                 let formattedMinutes = String(minutes).padStart(2, '0');
    //                 let formattedSeconds = String(seconds).padStart(2, '0');
    //                 localStorage.setItem(base + 'timer',`${formattedMinutes}:${formattedSeconds}`)
    //                 // Display the countdown
    //                 document.getElementById('cardBuyAmnt_' + type).textContent = localStorage.getItem(base + 'timer');
    //                 // Change photo
    //                 document.getElementById(`card_${type}_logo`).src = `./images/cards/card_${type}_locked.png`;
    
    //                 let cardName = type.charAt(0).toUpperCase() + type.slice(1)
    
    //                 document.getElementById(`card${cardName}`).onclick = function(){};
    //             }
    
    //             let nowCheck = new Date(Date.now());
    
    //             if (nowCheck < new Date(deadline)) {
    //                 // Update the countdown every second
    //                 var countdownInterval = setInterval(updateCountdown, 1000);
    
    //                 // Initial call to display the countdown immediately
    //                 updateCountdown();
    //             } else {
    //                 // upgradeCardPrice.textContent = `HELLO`;
    //                 localStorage.removeItem(base + 'timer');
    //                 localStorage.removeItem(base + 'deadline');
    //                 sessionStorage.removeItem(base + 'timer');
    //             }
    //         }
    
    //         let compressValues = function(num) {
    //             let round = function round(value, precision) {
    //                 var multiplier = Math.pow(10, precision || 0);
    //                 return Math.round(value * multiplier) / multiplier;
    //             }
    //             if (num < 1000) {
    //                 return `${num}`
    //             }
    //             if (num >= 1000 && num < 1000000) {
    //                 return `${round(num / 1000, 1)}k`
    //             }
    //             if (num >= 1000000) {
    //                 return `${round(num / 1000000)}M`
    //             }
    //         }
            
    //         let setUpUpgrade = function(type, menuType) {
    
    //             let cardsInfoString = sessionStorage.getItem('cardsInfo');
    //             let cardsInfoJSON = JSON.parse(cardsInfoString);
    
    //             upgradeWindow.style.display = 'flex';
    //             dailyWindow.style.display = 'none';
    //             let cardName = type.charAt(0).toUpperCase() + type.slice(1)
    //             upgradeCardName.textContent = cardName;
    //             upgradeCardImg.src = `./images/card_${type}.png`;
    
    //             let numValue = 0;
    //             let numPrice = 0;
    
    //             let mock = `card_${type}`;
    
    //             let cardBuyImage = document.getElementById('upgradeCardImage');
    
    //             if (menuType !== 'Empire') {
    //                 cardBuyImage.src = "./images/coin.svg";
    //             } else {
    //                 cardBuyImage.src = "./images/essence.svg";
    //             };
    
    
    //             if (cardsGreen.includes(type)) {
    //                 numValue = getValues('green', cardsInfoJSON[mock]);
    //                 tmpPrice = green.get(cardsInfoJSON[mock] + 1);
    //                 numPrice = tmpPrice[1];
    //             } else if (cardsRed.includes(type)) {
    //                 numValue = getValues('red', cardsInfoJSON[mock]);
    //                 tmpPrice = red.get(cardsInfoJSON[mock] + 1);
    //                 numPrice = tmpPrice[1];
    //             } else if (cardsYellow.includes(type)) {
    //                 numValue = getValues('yellow', cardsInfoJSON[mock]);
    //                 tmpPrice = yellow.get(cardsInfoJSON[mock] + 1);
    //                 numPrice = tmpPrice[1];
    //             } else if (cardsOrange.includes(type)) {
    //                 numValue = getValues('orange', cardsInfoJSON[mock]);
    //                 tmpPrice = orange.get(cardsInfoJSON[mock] + 1);
    //                 numPrice = tmpPrice[1];
    //             }
    
    
                
    //             upgradeCardIncome.textContent = `+${compressValues(numValue)}`;
    
    //             upgradeCardPower.textContent = `+${compressValues(numValue * 3)}`;
    
    //             upgradeCardPrice.textContent = `${numPrice}`;
    
    //             let buyUPbtn = document.getElementById('buyUpgradeCardBtn');
    
    //             buyUPbtn.onclick = function() {
                    
    //                 getCards().then(myCardsRes => {
    //                     // if (myCardsRes.code === 200) {};
    //                     let checker = localStorage.getItem(`card_${type}_timer`);
    //                     // значит что таймер УЖЕ установлен
    //                     if (checker !== undefined && checker !== null && checker !== "") {
    //                         // Проверяю, что юзер в прошлой сессии
    //                         let checkSession = sessionStorage.getItem(`card_${type}_timer`);
    //                         if (checkSession === undefined || checkSession === null || checkSession === "") {
    //                             // значит он в новой сессии (перезашел), надо заного установить часы, else = они уже работают
    //                             sessionStorage.setItem(`card_${type}_timer`, '1');
    //                             setClock(type);
    //                         };
                            
    //                     } else {  // значит что таймер НЕ установлен
    //                         localStorage.setItem(`card_${type}_timer`, '15:00');
    //                         sessionStorage.setItem(`card_${type}_timer`, '1');
    //                         setClock(type);
    //                     }
        
    //                     setTimeout(function() {

    //                         let tmpJSON = JSON.parse(sessionStorage.getItem('cardsInfo'));
    //                         tmpJSON[`card_${type}`] = tmpJSON[`card_${type}`] + 1;
    //                         let newIncome = tmpJSON[`income`] + numValue;
    //                         let newPower = tmpJSON[`power`] + (numValue * 3);

    //                         tmpJSON[`income`] = newIncome;
    //                         tmpJSON[`power`] = newPower;
    //                         sessionStorage.setItem('cardsInfo', JSON.stringify(tmpJSON));

    //                         document.getElementById('allCards' + menuType).style.display = 'flex';
    //                         upgradeWindow.style.display = 'none';
    //                         document.getElementById('cardsMenu').style.display = 'grid';
    //                         document.getElementById('X_Cards2').style.display = 'none';
    //                         document.getElementById('X_Cards').style.display = 'flex';

    //                         let numberTxt = document.getElementById(`card_${type}_level`).textContent;
    //                         let tmpNumber = parseInt(numberTxt, 10) + 1;
    //                         document.getElementById(`card_${type}_level`).textContent = tmpNumber;
    //                         document.getElementById("topMenuIncome").textContent = `${compressValues(newIncome)}`;
    //                         document.getElementById("topMenuPower").textContent = `${compressValues(newPower)}`;

    //                     }, 100);

    //                     // confetti({
    //                     //     particleCount: 150,
    //                     //     spread: 70,
    //                     //     origin: { y: 0.5 },
    //                     // });
    //                 });
                    
    //             };
    //         };

    //         let setUpCard = function(type, menuType) {
    //             let x2 = document.getElementById('X_Cards2');
    //             document.getElementById('allCards' + menuType).style.display = 'none';
    //             setUpUpgrade(type, menuType);
    //             document.getElementById('cardsMenu').style.display = 'none';
    //             document.getElementById('X_Cards').style.display = 'none';
    //             x2.style.display = 'flex';
    //             x2.onclick = function() {
    //                 document.getElementById('allCards' + menuType).style.display = 'flex';
    //                 upgradeWindow.style.display = 'none';
    //                 document.getElementById('cardsMenu').style.display = 'grid';
    //                 x2.style.display = 'none';
    //                 document.getElementById('X_Cards').style.display = 'flex';
    //             };
    //         };

    //         let checkJSON = JSON.parse(sessionStorage.getItem('cardsInfo'));
    
    //         if (checkJSON['card_queen'] < 10) {
    //             cardQueen.onclick = function() {
    //                 setUpCard('queen', 'Empire');
    //             };
    //         };
    
    //         if (checkJSON['card_king'] < 10) {
    //             cardKing.onclick = function() {
    //                 setUpCard('king', 'Empire');
    //             };
    //         };

    //         if (checkJSON['card_worker'] < 10) { 
    //             cardWorker.onclick = function() {
    //                 setUpCard('worker', 'Empire');
    //             };
    //         };
    
    //         if (checkJSON['card_trader'] < 10) {
    //             cardTrader.onclick = function() {
    //                 setUpCard('trader', 'Empire');
    //             };
    //         };
    
    //         if (checkJSON['card_prince'] < 10) {
    //             cardPrince.onclick = function() {
    //                 setUpCard('prince', 'Empire');
    //             };
    //         };
    
    //         if (checkJSON['card_princess'] < 10) {
    //             cardPrincess.onclick = function() {
    //                 setUpCard('princess', 'Empire');
    //             };
    //         };
    
    //         if (checkJSON['card_wizard'] < 10) {
    //             cardWizard.onclick = function() {
    //                 setUpCard('wizard', 'Magic');
    //             };
    //         };
    
    //         if (checkJSON['card_witch'] < 10) {
    //             cardWitch.onclick = function() {
    //                 setUpCard('witch', 'Magic');
    //             };
    //         };

    //         if (checkJSON['card_dragon'] < 10) {
    //             cardDragon.onclick = function() {
    //                 setUpCard('dragon', 'Magic');
    //             };
    //         };

    //         if (checkJSON['card_soldier'] < 10) {
    //             cardSoldier.onclick = function() {
    //                 setUpCard('soldier', 'Army');
    //             };
    //         };

    //         if (checkJSON['card_knight'] < 10) {
    //             cardKnight.onclick = function() {
    //                 setUpCard('knight', 'Army');
    //             };
    //         };
    
    //         setUpInformation();
    //     };

    //     if (sessionStorage.getItem('cardsInfo') === null) {
    //         getCards().then(myCardsRes => {
    //             sessionStorage.setItem('cardsInfo', '{"friends":5,"power":42454,"income":13212,"balance":11245,"essence_balance":12145,"card_king":9,"card_queen":9,"card_prince":9,"card_princess":9,"card_dragon":9,"card_wizard":1,"card_witch":10,"card_soldier":9,"card_knight":9,"card_worker":9,"card_trader":9, "combo_flag": false}');
    //             processCards();
    //         });
    //     } else {
    //         processCards();
    //     }
    // };

    // async function getEssence() {
    //     try {
    //         let res3 = await fetch('https://jsonplaceholder.typicode.com/posts'  /*baza + `/essence/level`*/, {
    //         method: 'POST',
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         // 'Authorization': tknBearer
    //         },
    //     });
    //     if (!res3.ok) {
    //         throw new Error(`Error! status: ${res3.status}`);
    //     }
    //     let myEssenceRes = await res3.json();
    //     return myEssenceRes;
    //     } catch (err) {
    //         setTimeout(function() {
    //             window.location.reload();
    //         }, 2000);
    //     };
    // };

    // async function getCards() {
    //     try {
    //         let res3 = await fetch('https://jsonplaceholder.typicode.com/posts'  /*baza + `/essence/level`*/, {
    //         method: 'POST',
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         // 'Authorization': tknBearer
    //         },
    //     });
    //     if (!res3.ok) {
    //         throw new Error(`Error! status: ${res3.status}`);
    //     }
    //     let myEssenceRes = await res3.json();
    //     return myEssenceRes;
    //     } catch (err) {
    //        console.log(err)
    //     };
    // };

    // async function getMiner() {
    //     try {
    //         let res3 = await fetch('https://jsonplaceholder.typicode.com/posts'  /*baza + `/essence/level`*/, {
    //         method: 'POST',
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         // 'Authorization': tknBearer
    //         },
    //     });
    //     if (!res3.ok) {
    //         throw new Error(`Error! status: ${res3.status}`);
    //     }
    //     let myEssenceRes = await res3.json();
    //     return myEssenceRes;
    //     } catch (err) {
    //         setTimeout(function() {
    //             window.location.reload();
    //         }, 2000);
    //     };
    // };

    
    // essenceTrigger.onclick = function() {
    //     getEssence().then(myEssenceRes => {
    //         if (true) {
    //             let esncData = myEssenceRes.data;

    //             esncData = JSON.parse(`{"level":2, "currentEssence":239, "maxEssence":240, "boost":true}`)

    //             let BackButton = tg.WebApp.BackButton;
    //             BackButton.show();
    //             BackButton.onClick(function() {
    //                 BackButton.hide();
    //                 document.getElementById('essenceContainer').style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //             });

    //             document.getElementById('mainContainer').style.display = 'none';
    //             document.getElementById('essenceContainer').style.display = 'flex';

    //             let startBtn = document.getElementById('startEssence');

    //             if (esncData["currentEssence"] >= esncData["maxEssence"]) {
    //                 startBtn.onclick = function() {
    //                     BackButton.hide();
    //                     document.getElementById('essenceContainer').style.display = 'none';
    //                     document.getElementById('mainContainer').style.display = 'block';
    //                 }
    
    //             } else {
    //                 startBtn.onclick = function(){};
    //                 startBtn.style.opacity = '0.5'; 
    //             }
               
    //             function SetUp() {
    //                 document.getElementById('essenceLVL').textContent = `Level: ${esncData["level"]}`;
    //                 if (esncData["boost"] === true) {
    //                     document.getElementById('essence1Min').textContent = `${esncData["level"] * 2} per minute (x2)`;
    //                 } else {
    //                     document.getElementById('essence1Min').textContent = `${esncData["level"]} per minute`;
    //                 }
                    
    //                 document.getElementById('essenceTimeLeft').textContent = `Time left: ${esncData["maxEssence"] - esncData["currentEssence"]}`;

    //                 document.getElementById('essenceToFull').textContent = `${esncData["currentEssence"]} / ${esncData["maxEssence"]}`;

    //                 let devider = esncData["currentEssence"]/esncData["maxEssence"];
    //                 let num = Math.floor(devider * 100);
    //                 if (num >= 100) {
    //                     num = 100
    //                 } else if (num <= 0) {
    //                     num = 0
    //                 }

    //                 document.getElementById('essenceProgress').style.width = `${num}%`;
                    
    //             }

    //             SetUp()
    //         };
    //     });
    // };

    // mineTrigger.onclick = function() {
    //     getMiner().then(myMinerRes => {
    //         if (true) {
    //             let minerData = myMinerRes.data;
    //             minerData = JSON.parse(`{"level":1, "boost":false, "time_left": 0, "need_essence": 240, "total_essence": 240}`)

    //             let BackButton = tg.WebApp.BackButton;
    //             BackButton.show();
    //             BackButton.onClick(function() {
    //                 BackButton.hide();
    //                 document.getElementById('mineContainer').style.display = 'none';
    //                 document.getElementById('mainContainer').style.display = 'block';
    //             });

    //             document.getElementById('mainContainer').style.display = 'none';
    //             document.getElementById('mineContainer').style.display = 'flex';

    //             let startBtn = document.getElementById('startMine');

    //             if ((minerData["total_essence"] >= minerData["need_essence"]) && (minerData["time_left"] <= 0)) {
    //                 startBtn.onclick = function() {
    //                     BackButton.hide();
    //                     // document.getElementById('mineContainer').style.display = 'none';
    //                     // document.getElementById('mainContainer').style.display = 'block';
    //                     let islandImg = document.getElementById('mineIsland');
    //                     islandImg.src = './images/desertPot.png'
    //                 }
    //             } else {
    //                 startBtn.onclick = function(){};
    //                 startBtn.style.opacity = '0.5';
    //             }

    //             function SetUp() {
    //                 document.getElementById('mineLVL').textContent = `Level: ${minerData["level"]}`;

    //                 if (minerData["boost"] === true) {
    //                     document.getElementById('mine1Min').textContent = `${minerData["level"] * 2} per minute (x2)`;
    //                 } else {
    //                     document.getElementById('mine1Min').textContent = `${minerData["level"]} per minute`;
    //                 }

    //                 document.getElementById('mineTimeLeft').textContent = `Time left: ${minerData["time_left"]}`;

    //                 document.getElementById('essenceToStart').textContent = `${minerData["need_essence"]} to start`;
    //             }

    //             SetUp()
    //         };
    //     });
    // };

    // sessionStorage.setItem('leaguePage', 1)
    // const leagueTrigger = document.getElementById('leagueBtn');
    // leagueTrigger.addEventListener('click', function() {
            
    //     window.location.href = './leagues/1.' + 'html';
            
    // });

    // const earnTrigger = document.getElementById('earner');
    // earnTrigger.addEventListener('click', function() {
    //     window.location.href = './earn-page/earn.' + 'html';   
    // });
});