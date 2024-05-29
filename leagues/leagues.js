document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram;
  
    let nums = sessionStorage.getItem('leaguePage')
    if (nums === undefined || nums === null || nums === "") {
        sessionStorage.setItem('leaguePage', 1)
    }
   
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
    // const baza = atob('aHR0cHM6Ly9nZW1zZWUueHl6')
    // async function getLeagues() {
    //     try {
    //         const CollectData = await fetch(`https://gemsee.xyz/leagues/top`, {
    //             method: 'POST',
    //             headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer mytest'
    //         },
    //         });
    //         if (!CollectData.ok) {
    //             throw new Error(`Error! status: ${CollectData.status}`);
    //         }
    //         const myCollectRes = await CollectData.json();
    //         return myCollectRes;
    //     } catch (err) {
    //         console.log(err)
    //     };
    // };

    // getLeagues().then(myRes => {
    //     sessionStorage.setItem('leagueData', myRes)
    // });

    var lgData = JSON.parse(`{\"bronze\":[{\"place\":1,\"name\":\"Алексей Сапожников\",\"mined\":4994},{\"place\":2,\"name\":\"강이 아\",\"mined\":4990},{\"place\":3,\"name\":\"Анатолий Мамекин\",\"mined\":4990},{\"place\":4,\"name\":\"Юрий Москвин\",\"mined\":4980},{\"place\":5,\"name\":\"Максим\",\"mined\":4972},{\"place\":6,\"name\":\"Roman\",\"mined\":4932},{\"place\":7,\"name\":\"Molot\",\"mined\":4910},{\"place\":8,\"name\":\"Adam\",\"mined\":4870},{\"place\":9,\"name\":\"Валентина\",\"mined\":4860},{\"place\":10,\"name\":\"Oleg Vadimovich\",\"mined\":4850},{\"place\":11,\"name\":\"IVAN\",\"mined\":4850},{\"place\":12,\"name\":\"Герман\",\"mined\":4840},{\"place\":13,\"name\":\"Маким\",\"mined\":4840},{\"place\":14,\"name\":\"S L\",\"mined\":4830},{\"place\":15,\"name\":\"Нат\",\"mined\":4830},{\"place\":16,\"name\":\".\",\"mined\":4820},{\"place\":17,\"name\":\"Костя Руснак\",\"mined\":4810},{\"place\":18,\"name\":\"Ukr.\",\"mined\":4810},{\"place\":19,\"name\":\"John Week\",\"mined\":4750},{\"place\":20,\"name\":\"Kri\",\"mined\":4730},{\"place\":21,\"name\":\"Serega\",\"mined\":4710},{\"place\":22,\"name\":\"Наиль Гарипов\",\"mined\":4701},{\"place\":23,\"name\":\"BroHer\",\"mined\":4672},{\"place\":24,\"name\":\"rAY6K\",\"mined\":4650},{\"place\":25,\"name\":\"Aurel Bajereanu\",\"mined\":4629},{\"place\":26,\"name\":\"Ptvz\",\"mined\":4620},{\"place\":27,\"name\":\"Евгений Евко\",\"mined\":4600},{\"place\":28,\"name\":\"Hercules\",\"mined\":4600},{\"place\":29,\"name\":\"Сергей\",\"mined\":4598},{\"place\":30,\"name\":\"Vadim\",\"mined\":4590},{\"place\":31,\"name\":\"Вадя Vadim\",\"mined\":4590},{\"place\":32,\"name\":\"nastja tkachuk\",\"mined\":4590},{\"place\":33,\"name\":\"Sergei🌲\",\"mined\":4580},{\"place\":34,\"name\":\"Cerg\",\"mined\":4570},{\"place\":35,\"name\":\"Avrahova_V\",\"mined\":4570},{\"place\":36,\"name\":\"Tuna Cömert\",\"mined\":4570},{\"place\":37,\"name\":\"gildong odri\",\"mined\":4470},{\"place\":38,\"name\":\"Volodymyr Dalybozhy\",\"mined\":4470},{\"place\":39,\"name\":\"ArtVS\",\"mined\":4435},{\"place\":40,\"name\":\"Reza Ravasi\",\"mined\":4434},{\"place\":41,\"name\":\"Виктория +998901362\",\"mined\":4430},{\"place\":42,\"name\":\"Влад Кот 🇺🇦\",\"mined\":4410},{\"place\":43,\"name\":\"Ares\",\"mined\":4400},{\"place\":44,\"name\":\"Armen\",\"mined\":4380},{\"place\":45,\"name\":\"H$TAPE$SPUDI$SONIC$\",\"mined\":4360},{\"place\":46,\"name\":\"$TAPE Dmitriy\",\"mined\":4350},{\"place\":47,\"name\":\"Алексей\",\"mined\":4350},{\"place\":48,\"name\":\"Алексей\",\"mined\":4340},{\"place\":49,\"name\":\"Sergey\",\"mined\":4330},{\"place\":50,\"name\":\"Маргарита\",\"mined\":4330},{\"place\":51,\"name\":\"K N\",\"mined\":4330},{\"place\":52,\"name\":\"Павел Иванов\",\"mined\":4320},{\"place\":53,\"name\":\"aborigen\",\"mined\":4279},{\"place\":54,\"name\":\"Ruslan Sanduliak\",\"mined\":4240},{\"place\":55,\"name\":\"Shabay Bazarbayev\",\"mined\":4233},{\"place\":56,\"name\":\"rufət 001\",\"mined\":4232},{\"place\":57,\"name\":\"Болотбек\",\"mined\":4180},{\"place\":58,\"name\":\"Bohdan\",\"mined\":4173},{\"place\":59,\"name\":\")\",\"mined\":4170},{\"place\":60,\"name\":\"Ali Aliyev\",\"mined\":4169},{\"place\":61,\"name\":\"Shtefan\",\"mined\":4160},{\"place\":62,\"name\":\"Юрий\",\"mined\":4160},{\"place\":63,\"name\":\"Владимир\",\"mined\":4160},{\"place\":64,\"name\":\"LuckyX $CFI\",\"mined\":4160},{\"place\":65,\"name\":\"Khalig Novruzli\",\"mined\":4140},{\"place\":66,\"name\":\"Ксения\",\"mined\":4100},{\"place\":67,\"name\":\"Иван Подкопаев\",\"mined\":4090},{\"place\":68,\"name\":\"Anastasiya Rybakova\",\"mined\":4080},{\"place\":69,\"name\":\"Star\",\"mined\":4080},{\"place\":70,\"name\":\"ᅠ\",\"mined\":4010},{\"place\":71,\"name\":\"3kyuu\",\"mined\":3980},{\"place\":72,\"name\":\"mukhiddin\",\"mined\":3956},{\"place\":73,\"name\":\"Besik Jolokhava\",\"mined\":3930},{\"place\":74,\"name\":\"Иван Грозный\",\"mined\":3927},{\"place\":75,\"name\":\"Гоша\",\"mined\":3920},{\"place\":76,\"name\":\"Настя Шалько\",\"mined\":3904},{\"place\":77,\"name\":\"pvvpvvpvv\",\"mined\":3900},{\"place\":78,\"name\":\"Veronika Veronika\",\"mined\":3900},{\"place\":79,\"name\":\"Mishel\",\"mined\":3890},{\"place\":80,\"name\":\"Алексей Жуков\",\"mined\":3889},{\"place\":81,\"name\":\"Pustite Men9\",\"mined\":3881},{\"place\":82,\"name\":\"а\",\"mined\":3880},{\"place\":83,\"name\":\"MMTT\",\"mined\":3874},{\"place\":84,\"name\":\"Tes$TAPE$SONIC$SPUD\",\"mined\":3870},{\"place\":85,\"name\":\"Максим\",\"mined\":3861},{\"place\":86,\"name\":\"Vadim\",\"mined\":3860},{\"place\":87,\"name\":\"Mama\",\"mined\":3860},{\"place\":88,\"name\":\"Silva\",\"mined\":3850},{\"place\":89,\"name\":\"Reaper131\",\"mined\":3850},{\"place\":90,\"name\":\"Александр Александр\",\"mined\":3843},{\"place\":91,\"name\":\"Mummy A\",\"mined\":3840},{\"place\":92,\"name\":\"Евгений\",\"mined\":3840},{\"place\":93,\"name\":\"Ivan Podkopaev\",\"mined\":3840},{\"place\":94,\"name\":\"Valeria Gerasymchuk\",\"mined\":3840},{\"place\":95,\"name\":\"Jager_$CFI\",\"mined\":3840},{\"place\":96,\"name\":\"Яков\",\"mined\":3840},{\"place\":97,\"name\":\"Евген\",\"mined\":3800},{\"place\":98,\"name\":\"Vincent V2\",\"mined\":3762},{\"place\":99,\"name\":\"Yarik\",\"mined\":3759},{\"place\":100,\"name\":\"Lev\",\"mined\":3756}],\"silver\":[{\"place\":1,\"name\":\"Sergei Gagarin\",\"mined\":17586},{\"place\":2,\"name\":\"7старт7\",\"mined\":14650},{\"place\":3,\"name\":\"Фельдштейн Леонид\",\"mined\":14521},{\"place\":4,\"name\":\"Ekaterina Oborina\",\"mined\":14400},{\"place\":5,\"name\":\"Алена\",\"mined\":13447},{\"place\":6,\"name\":\"Олег\",\"mined\":13403},{\"place\":7,\"name\":\"Helen\",\"mined\":13336},{\"place\":8,\"name\":\"Rəhman\",\"mined\":13320},{\"place\":9,\"name\":\"Швец Андрей\",\"mined\":13040},{\"place\":10,\"name\":\"Catch\",\"mined\":12852},{\"place\":11,\"name\":\"Irina Irina\",\"mined\":12765},{\"place\":12,\"name\":\"Wizard\",\"mined\":12680},{\"place\":13,\"name\":\"Денис\",\"mined\":12566},{\"place\":14,\"name\":\"G.P.T\",\"mined\":12317},{\"place\":15,\"name\":\"Iryna\",\"mined\":12240},{\"place\":16,\"name\":\"Andrey Андрей\",\"mined\":12163},{\"place\":17,\"name\":\"Александр\",\"mined\":12091},{\"place\":18,\"name\":\"FrikSvetlana\",\"mined\":12039},{\"place\":19,\"name\":\"Dmitrij A\",\"mined\":11678},{\"place\":20,\"name\":\"Дмитрий Бушанский\",\"mined\":11559},{\"place\":21,\"name\":\"Виталик\",\"mined\":11420},{\"place\":22,\"name\":\"niki\",\"mined\":11320},{\"place\":23,\"name\":\"Леонид Кузнецов\",\"mined\":11222},{\"place\":24,\"name\":\"Yevgen\",\"mined\":11141},{\"place\":25,\"name\":\"Алла\",\"mined\":11098},{\"place\":26,\"name\":\"Алексей\",\"mined\":10985},{\"place\":27,\"name\":\"Vlad Ilkovec\",\"mined\":10960},{\"place\":28,\"name\":\"Євгений ветер\",\"mined\":10930},{\"place\":29,\"name\":\"Андрей\",\"mined\":10878},{\"place\":30,\"name\":\"вас\",\"mined\":10750},{\"place\":31,\"name\":\"Белка\",\"mined\":10651},{\"place\":32,\"name\":\"Санечка Тарасенко\",\"mined\":10620},{\"place\":33,\"name\":\"Lesia Gerasymchuk\",\"mined\":10570},{\"place\":34,\"name\":\"Viktor\",\"mined\":10509},{\"place\":35,\"name\":\"Евгений\",\"mined\":10388},{\"place\":36,\"name\":\"Виктор\",\"mined\":10346},{\"place\":37,\"name\":\"Jeek\",\"mined\":10230},{\"place\":38,\"name\":\"Андрей\",\"mined\":10200},{\"place\":39,\"name\":\"Роман\",\"mined\":10180},{\"place\":40,\"name\":\"ℜ𝔬𝔪𝔞𝔫\",\"mined\":10125},{\"place\":41,\"name\":\"Галина Мирошниченко\",\"mined\":10107},{\"place\":42,\"name\":\"Люция\",\"mined\":10100},{\"place\":43,\"name\":\"evgeny\",\"mined\":9980},{\"place\":44,\"name\":\"Alexey\",\"mined\":9950},{\"place\":45,\"name\":\"Александр\",\"mined\":9931},{\"place\":46,\"name\":\"Dima Dovgun\",\"mined\":9930},{\"place\":47,\"name\":\"Ден\",\"mined\":9910},{\"place\":48,\"name\":\"Petrosyan\",\"mined\":9808},{\"place\":49,\"name\":\"A K\",\"mined\":9661},{\"place\":50,\"name\":\"Botanik Expert\",\"mined\":9653},{\"place\":51,\"name\":\"Владимир Богач\",\"mined\":9645},{\"place\":52,\"name\":\"Andrew\",\"mined\":9633},{\"place\":53,\"name\":\"Александррр\",\"mined\":9600},{\"place\":54,\"name\":\"Yulia Sokolova+💜\",\"mined\":9523},{\"place\":55,\"name\":\"Tetiana\",\"mined\":9521},{\"place\":56,\"name\":\"Олег\",\"mined\":9520},{\"place\":57,\"name\":\"Anna\",\"mined\":9500},{\"place\":58,\"name\":\"Виктор\",\"mined\":9475},{\"place\":59,\"name\":\"ALEX\",\"mined\":9420},{\"place\":60,\"name\":\"ზიკო\",\"mined\":9322},{\"place\":61,\"name\":\"Den4ik 🇺🇦\",\"mined\":9320},{\"place\":62,\"name\":\"Анна $DICK Белова\",\"mined\":9260},{\"place\":63,\"name\":\"nNn\",\"mined\":9204},{\"place\":64,\"name\":\"RH B\",\"mined\":9194},{\"place\":65,\"name\":\"Niiiya P\",\"mined\":9182},{\"place\":66,\"name\":\"Aleksandr\",\"mined\":9172},{\"place\":67,\"name\":\"Дмитрий\",\"mined\":9138},{\"place\":68,\"name\":\"Raven\",\"mined\":9130},{\"place\":69,\"name\":\"Serg Dex\",\"mined\":8997},{\"place\":70,\"name\":\"Александр\",\"mined\":8970},{\"place\":71,\"name\":\"Александр\",\"mined\":8950},{\"place\":72,\"name\":\"Jorj\",\"mined\":8920},{\"place\":73,\"name\":\"Leon13000\",\"mined\":8920},{\"place\":74,\"name\":\"Олександр\",\"mined\":8920},{\"place\":75,\"name\":\"Люция\",\"mined\":8895},{\"place\":76,\"name\":\"Геннадий\",\"mined\":8890},{\"place\":77,\"name\":\"Серый\",\"mined\":8857},{\"place\":78,\"name\":\"Æ Ø\",\"mined\":8830},{\"place\":79,\"name\":\"Mostafa Tehrani\",\"mined\":8830},{\"place\":80,\"name\":\"Татьяна\",\"mined\":8816},{\"place\":81,\"name\":\"Рома48\",\"mined\":8760},{\"place\":82,\"name\":\"Andrew Ha\",\"mined\":8686},{\"place\":83,\"name\":\"Yuriy\",\"mined\":8668},{\"place\":84,\"name\":\"Валерий\",\"mined\":8660},{\"place\":85,\"name\":\"Светлана\",\"mined\":8659},{\"place\":86,\"name\":\"Q.Q\",\"mined\":8656},{\"place\":87,\"name\":\"Владислав Чернов\",\"mined\":8651},{\"place\":88,\"name\":\"Александр\",\"mined\":8640},{\"place\":89,\"name\":\"Пламен Джантов\",\"mined\":8612},{\"place\":90,\"name\":\"Ivan Golovatiuk\",\"mined\":8602},{\"place\":91,\"name\":\"VV\",\"mined\":8590},{\"place\":92,\"name\":\"Даниил Браун\",\"mined\":8550},{\"place\":93,\"name\":\"Mihail Chernykh\",\"mined\":8511},{\"place\":94,\"name\":\"Марго\",\"mined\":8504},{\"place\":95,\"name\":\"Рома Палигач\",\"mined\":8487},{\"place\":96,\"name\":\"_Mak_sik_ 😏\",\"mined\":8480},{\"place\":97,\"name\":\"viktor\",\"mined\":8460},{\"place\":98,\"name\":\"Röyal\",\"mined\":8420},{\"place\":99,\"name\":\"ono bullito\",\"mined\":8350},{\"place\":100,\"name\":\"Mark ️️🕵️‍♂️#eeseea\",\"mined\":8275}]}`)

    bronzeArr = lgData["bronze"]
    if (bronzeArr != undefined && bronzeArr != null && sessionStorage.getItem('leaguePage') === "1") {
        for (let i = 0; i < bronzeArr.length; i++) {
            counter = i + 1
            newName = bronzeArr[i]["name"];
            if (newName.length > 15) {
                newName = newName.slice(0,18); 
            }
            document.getElementById(`nameBronze_${counter}`).textContent = newName;
            document.getElementById(`minedBronze_${counter}`).textContent = bronzeArr[i]["mined"];
        } 
    }

    silverArr = lgData["silver"]
    if (silverArr != undefined && silverArr != null && sessionStorage.getItem('leaguePage') === "2") {
        for (let i = 0; i < silverArr.length; i++) {
            counter = i + 1
            newName = silverArr[i]["name"];
            if (newName.length > 15) {
                newName = newName.slice(0,18); 
            }
            document.getElementById(`nameSilver_${counter}`).textContent = newName;
            document.getElementById(`minedSilver_${counter}`).textContent = silverArr[i]["mined"];
        } 
    }

    var usrLgData = JSON.parse(`{\"league\":\"silver\",\"place\":1364,\"mined\":2501,\"percent\":75}`)

    if (usrLgData != undefined && usrLgData != null && usrLgData["league"] === "bronze" && sessionStorage.getItem('leaguePage') === "1") {
        document.getElementById(`usrProfile`).style.display = 'flex';
        document.getElementById(`usersStatMined`).style.display = 'block';
        document.getElementById(`usersStatBar`).style.display = 'block';
        document.getElementById(`totalMined`).textContent = `${usrLgData["mined"]} / 5000`
        document.getElementById(`progressBar`).style.width = `${usrLgData["percent"]}%`
    };

    if (usrLgData != undefined && usrLgData != null && usrLgData["league"] === "silver" && sessionStorage.getItem('leaguePage') === "2") {
        document.getElementById(`usrProfile`).style.display = 'flex';
        document.getElementById(`usersStatMined`).style.display = 'block';
        document.getElementById(`usersStatBar`).style.display = 'block';
        document.getElementById(`totalMined`).textContent = `${usrLgData["mined"]} / 5000`;
        document.getElementById(`progressBar`).style.width = `${usrLgData["percent"]}%`;
        document.getElementById(`usersPlace`).textContent = usrLgData["place"];
        document.getElementById(`usersMined`).textContent = usrLgData["mined"];
    };
});