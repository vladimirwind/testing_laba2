function translateReq(link) {
    return fetch(link) // Return the promise from fetch
        .then(response => response.json())
        .then(json => json[0][0][0]); // Return the translated text
};

const GetTranslation = (targetLang, Message) => {
    let sourceLang = "en";
    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(Message)
    return translateReq(url); // Return the promise from translateReq
};

const CreateMyMap = (TranslateMap) => {
    const AllPartners = new Map();

        AllPartners.set(29, [
            "https://t.me/cryptobunny_bot?start=invitezANwNdJlYp",
            TranslateMap.get("Play") + " Crypto Bunny",
            "2000",
            "bot"
        ]);

        AllPartners.set(28, 
            ["https://t.me/GTap_Off_Bot?start=r_6917022146",
            "Play G-Tap",
            "3000",
            "bot"]);

        AllPartners.set(34, 
            ["https://t.me/bokgame_bot?start=2077877692",
            "Play Kolobok",
            "3000",
            "bot"]);

        AllPartners.set(30, 
            ["https://t.me/yourfarmton_bot/farmton?startapp=7JXBG",
            "Play Farm TON",
            "3000",
            "bot"]);

        AllPartners.set(23, 
            ["https://t.me/hamster_republic_bot?start=userId-6917022146",
            "Play Hamster Republic",
            "3000",
            "bot"]);

        AllPartners.set(33, 
            ["https://t.me/TappySocial_bot/Tappy?startapp=Ku38LL5",
            "Play Tappy",
            "3000",
            "bot"]);

        AllPartners.set(32, 
            ["https://t.me/+YBEn8-1nE4FiYWI8",
            "Crypto Fox",
            "2000",
            "chan"]);

        AllPartners.set(24, 
            ["https://t.me/+AZO1vZfylW40MmM6",
            "Combo Tap",
            "2000",
            "chan"]);

        AllPartners.set(27, 
            ["https://t.me/+WZcDXoSNKIxlYjg0",
            "Tap Enot",
            "2000",
            "chan"]);

        AllPartners.set(25, 
            ["https://t.me/itsbrocoinbot/BROSKI?startapp=6917022146",
            "Play Bro Coin",
            "3000",
            "bot"]);

        AllPartners.set(31, 
            ["https://t.me/coin_unk_bot/app?startapp=NjkxNzAyMjE0Ng==",
            "Play AIRDROP UNK",
            "3000",
            "bot"]);

        AllPartners.set(21, 
            ["https://t.me/CaptainsBayBot/aboard?startapp=6917022146",
            "Play Captains Bay",
            "3000",
            "bot"]);
        AllPartners.set(35, 
            ["https://t.me/+k0-8MdPvXIcyYjVi",
            "Happy Farmer",
            "3000",
            "chan"]);

        AllPartners.set(22, 
            ["https://t.me/+T9WJ733tFFhlNWNi",
            "Drop Mezantop",
            "2000",
            "chan"]);

        AllPartners.set(26, 
            ["https://t.me/click1app",
            "Click App",
            "3000",
            "chan"]);

    return AllPartners;
};

export { GetTranslation, CreateMyMap };
