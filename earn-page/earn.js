import { CreateMyMap } from './partners.js';
document.addEventListener('DOMContentLoaded', function() {

    var frensPopUP1 = document.getElementById('frens1Container');
    var frensPopUP2 = document.getElementById('frens2Container');

    var mainContainer = document.getElementById('mainContainer');
    sessionStorage.setItem('earnInfo', `{"task_1": true, "task_2": false, "task_3": false, "task_21": false}`);
    frensPopUP1.style.display = 'none';
    var earnData = sessionStorage.getItem('earnInfo');

    var menuBtn1 = document.getElementById('menu1');
    var menuBtn2 = document.getElementById('menu2');
    var menuBtn3 = document.getElementById('menu3');

    menuBtn2.style.boxShadow = "none";
    menuBtn3.style.boxShadow = "none";

    const AllPartners = CreateMyMap();

    var coreTasks =  document.getElementById('coreTasks');

    let appendTasks = function(number, header, reward, type) {
        // Create the taskListItem div
        let taskListItem = document.createElement('div');
        taskListItem.className = 'taskListItem';
        taskListItem.id = `partnerTask_${number}`;

        // Create the taskListImageWr div
        let taskListImageWr = document.createElement('div');
        taskListImageWr.className = 'taskListImageWr';

        // Create the taskListImage div
        let taskListImage = document.createElement('div');
        taskListImage.className = 'taskListImage';

        // Create the img element for the task image
        let taskImage = document.createElement('img');
        if (type==='bot') {
            taskImage.src = '../images/gamePad.png';
        } else {
            taskImage.src = '../images/TELEGA_2.svg';
        }

        // Append img to taskListImage
        taskListImage.appendChild(taskImage);
        // Append taskListImage to taskListImageWr
        taskListImageWr.appendChild(taskListImage);
        
        // Create the taskListItemTextsWr div
        let taskListItemTextsWr = document.createElement('div');
        taskListItemTextsWr.className = 'taskListItemTextsWr';

        // Create the header section
        let taskListItemTextsHeader = document.createElement('div');
        taskListItemTextsHeader.className = 'taskListItemTextsHeader';
        
        let headerSpan = document.createElement('span');
        headerSpan.textContent = header;
        
        taskListItemTextsHeader.appendChild(headerSpan);
        
        // Create the reward section
        let taskListItemTextsReward = document.createElement('div');
        taskListItemTextsReward.className = 'taskListItemTextsReward';
        
        let rewardSpan = document.createElement('span');
        rewardSpan.id = `loadingText_${number}`;
        rewardSpan.textContent = 'Your reward';
        
        taskListItemTextsReward.appendChild(rewardSpan);
        
        // Create the coins section
        let taskListItemTextsCoins = document.createElement('div');
        taskListItemTextsCoins.className = 'taskListItemTextsCoins';
        
        let coinImage = document.createElement('img');
        coinImage.src = '../images/coin.svg';
        
        let coinsSpan = document.createElement('span');
        coinsSpan.textContent = reward;
        
        taskListItemTextsCoins.appendChild(coinImage);
        taskListItemTextsCoins.appendChild(coinsSpan);

        // Append all text sections to taskListItemTextsWr
        taskListItemTextsWr.appendChild(taskListItemTextsHeader);
        taskListItemTextsWr.appendChild(taskListItemTextsReward);
        taskListItemTextsWr.appendChild(taskListItemTextsCoins);

        // Create the taskListImageRightWr div
        let taskListImageRightWr = document.createElement('div');
        taskListImageRightWr.className = 'taskListImageRightWr';

        // Create the taskListImageRight div
        let taskListImageRight = document.createElement('div');
        taskListImageRight.className = 'taskListImageRight';

        // Create the img element for the check button
        let checkButtonImage = document.createElement('img');
        checkButtonImage.src = '../images/checkBTNsq.svg';
        checkButtonImage.id = `buttonPartner_${number}`;

        // Append img to taskListImageRight
        taskListImageRight.appendChild(checkButtonImage);
        
        // Append taskListImageRight to taskListImageRightWr
        taskListImageRightWr.appendChild(taskListImageRight);

        // Append all parts to the main task list item
        taskListItem.appendChild(taskListImageWr);
        taskListItem.appendChild(taskListItemTextsWr);
        taskListItem.appendChild(taskListImageRightWr);

        // Finally, append the complete task list item to frensTasks
        let frensTasksDiv = document.getElementById('coreTasks');
        frensTasksDiv.appendChild(taskListItem);
    };

    AllPartners.forEach (function(value, key) {
        appendTasks(key, value[1],value[2],value[3])
    })

    let frensTasksDiv = document.getElementById('coreTasks');
    let brr = document.createElement('br');
    frensTasksDiv.appendChild(brr);

    var floatingCoins = function(containerId) {

        let curContainer = document.getElementById(containerId);
        for (let i = 0; i < 50; i++) {
            setTimeout(function() {
                createCoin(curContainer);
            }, 10 * i);
        }

        function createCoin(curContainer) {
            let coin = document.createElement('div');
            coin.className = 'coinDiv';
        
            // Set random position
            let randomX = Math.random() * (window.innerWidth - 50);
            let randomY = Math.random() * (window.innerHeight - 50);
            coin.style.left = `${randomX}px`;
            coin.style.top = `${randomY}px`;
            // Append coin to container
           
            curContainer.appendChild(coin);

            // Remove coin after animation ends
            coin.addEventListener('animationend', () => {
                coin.remove();
            });
        }
    }

    let processPartnerTask = function(number, link) {

        let taskBody = document.getElementById(`partnerTask_${number}`);
        taskBody.onclick = function() {
            window.location.href = link;
        };
        let loadingText = document.getElementById(`loadingText_${number}`);
        let dots = '...';
        let checkBtn = document.getElementById(`buttonPartner_${number}`);
        let count = 0;

        checkBtn.src = '../images/checkBTNsq.svg';
    
        let intervalX = setInterval(() => {
            loadingText.style.color = '#98FFAF';
            count = (count + 1) % 3; // Cycle through 0 to 2
            let dotSpan = `${dots.substring(0, count + 1)}`;

            loadingText.textContent = `Checking ${dotSpan}`;
        }, 300);
    
        // Optionally, stop the animation after some time (e.g., after 5 seconds)
        setTimeout(function() {
            checkBtn.src = '../images/claimBTNsq.svg';
            loadingText.textContent = `Claim reward`;
            clearInterval(intervalX)
            taskBody.onclick = function() {
                loadingText.textContent = `Try again`;
                loadingText.style.color = 'red';
                taskBody.onclick = function() {

                    //bad
                    processPartnerTask(number, link); 
                    //good
                    floatingCoins('mainContainer')

                    taskBody.style.display = 'none';
                };
            };
        }, 3000);
    };

    for (let i = 1; i < 100; i++) {
        let taskElement = document.getElementById(`partnerTask_${i}`);
        if (taskElement) {
            taskElement.onclick = function() {
                processPartnerTask(i, AllPartners.get(i)[0]);
                console.log(AllPartners.get(i)[0])
            };
        }
    }

    var frensTasks = document.getElementById('frensTasks');
    frensTasks.style.display = 'none';
    var frens1 = document.getElementById('frens1');
    var frens2 = document.getElementById('frens2');


    const rotate = (image, degrees) => {
        image.style.transform = `rotate(${+degrees}deg)`;
    }

    menuBtn1.onclick = function() {
        coreTasks.style.display='flex';
        frensTasks.style.display = 'none';
        menuBtn1.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn2.style.boxShadow = "none";
        menuBtn3.style.boxShadow = "none";
    }

    menuBtn2.onclick = function() {
        coreTasks.style.display = 'none';
        frensTasks.style.display = 'none';
        menuBtn2.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn1.style.boxShadow = "none";
        menuBtn3.style.boxShadow = "none";
    }

    menuBtn3.onclick = function() {
        coreTasks.style.display = 'none';
        frensTasks.style.display = 'flex';
        menuBtn3.style.boxShadow = "inset #2A4864 0px 0px 40px -9px";
        menuBtn1.style.boxShadow = "none";
        menuBtn2.style.boxShadow = "none";
    }

    async function setCorePage(result) {
        let obj = JSON.parse(result)
        let flag1 = obj["task_1"];
        let flag2 = obj["task_2"];
        let flag3 = obj["task_3"];
        // let flag4 = obj["task_4"];
        // let flag5 = obj["task_5"];
        // if (flag4 !== undefined && flag4 !== null && flag4) {
        //     core4.style.opacity = '0.5';
        //     core4.removeEventListener("click", funcCore4);
        // }
        // if (flag5 !== undefined && flag5 !== null && flag5) {
        //     core5.style.opacity = '0.5';
        //     core5.removeEventListener("click", funcCore5);
        // }
    }

    async function setFrensPage(result) {
        let obj = JSON.parse(result)
        let flag21 = obj["task_21"];
        let flag22 = obj["task_22"];

        if (flag21 !== undefined && flag21 !== null && flag21) {
            frens1.style.opacity = '0.5';
            frens1.removeEventListener("click", funcFrens1);
            let img = document.createElement("IMG");
            img.src = "../images/V_Mark.svg";
            let oldImg = document.getElementById('earn21');
            img.style.width = '5vw';
            img.style.height = '5vh';
            img.style.marginRight = "5vh";
            frens1.replaceChild(img, oldImg);
        }

        if (flag22 !== undefined && flag22 !== null && flag22) {
            frens2.style.opacity = '0.5';
            frens2.removeEventListener("click", funcFrens2);
            let oldImg = document.getElementById('earn22');
            oldImg.src = "../images/V_Mark.svg";
        }
    }
    
    async function fetchCore(num) {
        try {
            const myResponse = await fetch(base + '/tasks/check/' + num, {
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
            const myRes = await myResponse.json();
            return myRes;
        } catch (err) {
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        }
    }

    async function funcXCross() {
        xCross.removeEventListener("click", funcXCross);
        frensPopUP1.style.display = 'none';
        frensPopUP2.style.display = 'none';
        mainContainer.style.display = 'block';
    };

    async function funcFrens1() {
        mainContainer.style.display = 'none';
        frensPopUP1.style.display = 'flex';
        xCross.addEventListener("click", funcXCross)
        let link1 = document.getElementById('taskLink1');
        let link2 = document.getElementById('taskLink2');
        let link3 = document.getElementById('taskLink3');
        
        async function Link1() {
            setTimeout(() => {
                fetchCore('21').then(myRes => {
                    if (myRes != undefined && myRes.code === 200) {
                        link1.style.opacity = '0.5';
                        link2.style.opacity = '0.5';
                        link3.style.opacity = '0.5';
                        let obj1 = JSON.parse(earnData);
                        obj1["task_21"] = true;
                        const myJSON1 = JSON.stringify(obj1);
                        sessionStorage.setItem('earnInfo', myJSON1)
                    } else {
                        window.location.href = 'https://t.me/brrrrren';
                    }
                }
                );
            }, 300);
        }

        async function Link2() {
            setTimeout(() => {
                fetchCore('21').then(myRes => {
                    if (myRes != undefined && myRes.code === 200) {
                        link1.style.opacity = '0.5';
                        link2.style.opacity = '0.5';
                        link3.style.opacity = '0.5';
                        let obj1 = JSON.parse(earnData);
                        obj1["task_21"] = true;
                        const myJSON1 = JSON.stringify(obj1);
                        sessionStorage.setItem('earnInfo', myJSON1)
                    } else {
                        window.location.href = 'https://t.me/brrrrrgamebot?start=665356f5a3012023cbb55d05';
                    }
                }
                );
            }, 300);
        }

        async function Link3() {
            setTimeout(() => {
                fetchCore('21').then(myRes => {
                    if (myRes != undefined && myRes.code === 200) {
                        link1.style.opacity = '0.5';
                        link2.style.opacity = '0.5';
                        link3.style.opacity = '0.5';
                        let obj1 = JSON.parse(earnData);
                        obj1["task_21"] = true;
                        const myJSON1 = JSON.stringify(obj1);
                        sessionStorage.setItem('earnInfo', myJSON1)
                    } else {
                        window.location.href = 'https://t.me/keepsignals';
                    }
                }
                );
            }, 300);
        }

        link1.addEventListener("click", Link1)
        link2.addEventListener("click", Link2)
        link3.addEventListener("click", Link3)
    }

    async function funcFrens2() {
        mainContainer.style.display = 'none';
        frensPopUP2.style.display = 'flex';
        let xCross22 = document.getElementById('xCross22');
        xCross22.addEventListener("click", funcXCross)
        let link1 = document.getElementById('taskLink22_1');

        async function Link22_1() {
            setTimeout(() => {
                fetchCore('22').then(myRes => {
                    if (myRes != undefined && myRes.code === 200) {
                        link1.style.opacity = '0.5';
                        let obj1 = JSON.parse(earnData);
                        obj1["task_22"] = true;
                        const myJSON1 = JSON.stringify(obj1);
                        sessionStorage.setItem('earnInfo', myJSON1)
                    } else {
                        window.location.href = 'https://t.me/Web3profits';
                    }
                }
                );
            }, 300);
        }
        link1.addEventListener("click", Link22_1)
    }

    async function funcCore1() {
        core1.removeEventListener("click", funcCore1);
        let img = document.createElement("IMG");
        img.src = "../images/loader.svg";
        let oldImg = document.getElementById('join1');
        img.style.width = '5vw';
        img.style.height = '5vh';
        img.style.marginRight = "5vh";
        document.getElementById('core1').replaceChild(img, oldImg);
        const oneLoop = () => {
            setTimeout(() => rotate(img, 10), 50);
            setTimeout(() => rotate(img, 20), 75);
            setTimeout(() => rotate(img, 30), 100);
            setTimeout(() => rotate(img, 40), 125);
            setTimeout(() => rotate(img, 50), 150);
            setTimeout(() => rotate(img, 60), 175);
            setTimeout(() => rotate(img, 70), 200);
            setTimeout(() => rotate(img, 80), 225);
            setTimeout(() => rotate(img, 90), 250);
            setTimeout(() => rotate(img, 100), 275);
            setTimeout(() => rotate(img, 110), 300);
            setTimeout(() => rotate(img, 120), 325);
            setTimeout(() => rotate(img, 130), 350);
            setTimeout(() => rotate(img, 140), 375);
            setTimeout(() => rotate(img, 150), 400);
            setTimeout(() => rotate(img, 160), 425);
            setTimeout(() => rotate(img, 170), 450);
            setTimeout(() => rotate(img, 180), 475);
            setTimeout(() => rotate(img, 190), 500);
            setTimeout(() => rotate(img, 200), 525);
            setTimeout(() => rotate(img, 210), 550);
            setTimeout(() => rotate(img, 220), 575);
            setTimeout(() => rotate(img, 230), 600);
            setTimeout(() => rotate(img, 240), 625);
            setTimeout(() => rotate(img, 250), 650);
            setTimeout(() => rotate(img, 260), 675);
            setTimeout(() => rotate(img, 270), 700);
            setTimeout(() => rotate(img, 280), 725);
            setTimeout(() => rotate(img, 290), 750);
            setTimeout(() => rotate(img, 300), 775);
            setTimeout(() => rotate(img, 310), 825);
            setTimeout(() => rotate(img, 320), 850);
            setTimeout(() => rotate(img, 330), 875);
            setTimeout(() => rotate(img, 340), 900);
            setTimeout(() => rotate(img, 350), 900);
            setTimeout(() => rotate(img, 360), 950);
        }
        oneLoop();
        let loaderInt = setInterval(() => oneLoop(), 1000);

        setTimeout(function () { 
            fetchCore('1').then(myRes => {
                clearInterval(loaderInt)
                // if (myRes != undefined && myRes.code === 200) {
                if (true) {
                    let v_img = document.createElement("IMG");
                    v_img.src = "../images/V_Mark.svg";
                    v_img.style.width = '5vw';
                    v_img.style.height = '5vh';
                    v_img.style.marginRight = "5vh";
                    document.getElementById('core1').replaceChild(v_img, img);
                    let obj1 = JSON.parse(earnData);
                    obj1["task_1"] = true;
                    const myJSON1 = JSON.stringify(obj1);
                    sessionStorage.setItem('earnInfo', myJSON1)
                    core1.style.opacity = '0.5';
                } else {
                    document.getElementById('core1').replaceChild(oldImg, img);
                    core1.addEventListener("click", funcCore1);
                    location.href='https://t.me/gemseee';
                }
            });
        }, 1000)
    };

    async function funcCore2() {
        core2.removeEventListener("click", funcCore2);
        let img = document.createElement("IMG");
        img.src = "../images/loader.svg";
        let oldImg = document.getElementById('get2');
        img.style.width = '5vw';
        img.style.height = '5vh';
        img.style.marginRight = "5vh";
        document.getElementById('core2').replaceChild(img, oldImg);
        const oneLoop = () => {
            setTimeout(() => rotate(img, 10), 50);
            setTimeout(() => rotate(img, 20), 75);
            setTimeout(() => rotate(img, 30), 100);
            setTimeout(() => rotate(img, 40), 125);
            setTimeout(() => rotate(img, 50), 150);
            setTimeout(() => rotate(img, 60), 175);
            setTimeout(() => rotate(img, 70), 200);
            setTimeout(() => rotate(img, 80), 225);
            setTimeout(() => rotate(img, 90), 250);
            setTimeout(() => rotate(img, 100), 275);
            setTimeout(() => rotate(img, 110), 300);
            setTimeout(() => rotate(img, 120), 325);
            setTimeout(() => rotate(img, 130), 350);
            setTimeout(() => rotate(img, 140), 375);
            setTimeout(() => rotate(img, 150), 400);
            setTimeout(() => rotate(img, 160), 425);
            setTimeout(() => rotate(img, 170), 450);
            setTimeout(() => rotate(img, 180), 475);
            setTimeout(() => rotate(img, 190), 500);
            setTimeout(() => rotate(img, 200), 525);
            setTimeout(() => rotate(img, 210), 550);
            setTimeout(() => rotate(img, 220), 575);
            setTimeout(() => rotate(img, 230), 600);
            setTimeout(() => rotate(img, 240), 625);
            setTimeout(() => rotate(img, 250), 650);
            setTimeout(() => rotate(img, 260), 675);
            setTimeout(() => rotate(img, 270), 700);
            setTimeout(() => rotate(img, 280), 725);
            setTimeout(() => rotate(img, 290), 750);
            setTimeout(() => rotate(img, 300), 775);
            setTimeout(() => rotate(img, 310), 825);
            setTimeout(() => rotate(img, 320), 850);
            setTimeout(() => rotate(img, 330), 875);
            setTimeout(() => rotate(img, 340), 900);
            setTimeout(() => rotate(img, 350), 900);
            setTimeout(() => rotate(img, 360), 950);
        }
        oneLoop();
        let loaderInt = setInterval(() => oneLoop(), 1000);

        setTimeout(function () { 
            fetchCore('2').then(myRes => {
                clearInterval(loaderInt)
                if (myRes != undefined && myRes.code === 200) {
                    let v_img = document.createElement("IMG");
                    v_img.src = "../images/V_Mark.svg";
                    v_img.style.width = '5vw';
                    v_img.style.height = '5vh';
                    v_img.style.marginRight = "5vh";
                    document.getElementById('core2').replaceChild(v_img, img);
                    let obj2 = JSON.parse(earnData);
                    obj2["task_2"] = true;
                    const myJSON2 = JSON.stringify(obj2);
                    sessionStorage.setItem('earnInfo', myJSON2)
                    core2.style.opacity = '0.5';
                } else {
                    document.getElementById('core2').replaceChild(oldImg, img);
                    core2.addEventListener("click", funcCore2);
                }
            });
        }, 1000)
    };

    async function funcCore3() {
        core3.removeEventListener("click", funcCore3);
        let img = document.createElement("IMG");
        img.src = "../images/loader.svg";
        let oldImg = document.getElementById('join3');
        img.style.width = '5vw';
        img.style.height = '5vh';
        img.style.marginRight = "5vh";
        document.getElementById('core3').replaceChild(img, oldImg);
        const oneLoop = () => {
            setTimeout(() => rotate(img, 10), 50);
            setTimeout(() => rotate(img, 20), 75);
            setTimeout(() => rotate(img, 30), 100);
            setTimeout(() => rotate(img, 40), 125);
            setTimeout(() => rotate(img, 50), 150);
            setTimeout(() => rotate(img, 60), 175);
            setTimeout(() => rotate(img, 70), 200);
            setTimeout(() => rotate(img, 80), 225);
            setTimeout(() => rotate(img, 90), 250);
            setTimeout(() => rotate(img, 100), 275);
            setTimeout(() => rotate(img, 110), 300);
            setTimeout(() => rotate(img, 120), 325);
            setTimeout(() => rotate(img, 130), 350);
            setTimeout(() => rotate(img, 140), 375);
            setTimeout(() => rotate(img, 150), 400);
            setTimeout(() => rotate(img, 160), 425);
            setTimeout(() => rotate(img, 170), 450);
            setTimeout(() => rotate(img, 180), 475);
            setTimeout(() => rotate(img, 190), 500);
            setTimeout(() => rotate(img, 200), 525);
            setTimeout(() => rotate(img, 210), 550);
            setTimeout(() => rotate(img, 220), 575);
            setTimeout(() => rotate(img, 230), 600);
            setTimeout(() => rotate(img, 240), 625);
            setTimeout(() => rotate(img, 250), 650);
            setTimeout(() => rotate(img, 260), 675);
            setTimeout(() => rotate(img, 270), 700);
            setTimeout(() => rotate(img, 280), 725);
            setTimeout(() => rotate(img, 290), 750);
            setTimeout(() => rotate(img, 300), 775);
            setTimeout(() => rotate(img, 310), 825);
            setTimeout(() => rotate(img, 320), 850);
            setTimeout(() => rotate(img, 330), 875);
            setTimeout(() => rotate(img, 340), 900);
            setTimeout(() => rotate(img, 350), 900);
            setTimeout(() => rotate(img, 360), 950);
        }
        oneLoop();
        let loaderInt = setInterval(() => oneLoop(), 1000);

        setTimeout(function () { 
            fetchCore('3').then(myRes => {
                clearInterval(loaderInt)
                if (myRes != undefined && myRes.code === 200) {
                    let v_img = document.createElement("IMG");
                    v_img.src = "../images/V_Mark.svg";
                    v_img.style.width = '5vw';
                    v_img.style.height = '5vh';
                    v_img.style.marginRight = "5vh";
                    document.getElementById('core3').replaceChild(v_img, img);
                    let obj3 = JSON.parse(earnData);
                    obj2["task_3"] = true;
                    const myJSON3 = JSON.stringify(obj3);
                    sessionStorage.setItem('earnInfo', myJSON3)
                    core3.style.opacity = '0.5';
                } else {
                    document.getElementById('core3').replaceChild(oldImg, img);
                    core3.addEventListener("click", funcCore3);
                    location.href='https://t.me/gemsee_chat';
                }
            });
        }, 1000)
    };

    frens1.addEventListener("click", funcFrens1);
    frens2.addEventListener("click", funcFrens2);

    var xCross = document.getElementById('xCross');
    setCorePage(earnData)
    setFrensPage(earnData)
});