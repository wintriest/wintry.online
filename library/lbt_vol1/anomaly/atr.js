document.addEventListener("DOMContentLoaded", () => {
    const atr = document.getElementById("atr");
    if (!atr) return;

    const chars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž";

    function randomGlyphs(length = 3) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    function scrambleLoop() {
        atr.textContent = randomGlyphs();

        // Random delay between 0.8s and 5.9s
        const delay = Math.random() * (5900 - 800) + 800;

        setTimeout(scrambleLoop, delay);
    }

    scrambleLoop();
});

document.addEventListener("DOMContentLoaded", () => {

    const transcript = document.querySelector(".transcript");
    if (!transcript) return;

    const distortions = {

        A:"ÀÁÂÃÄÅĀĂĄǍȀȂȦ",
        a:"àáâãäåāăąǎȁȃȧɑаά",

        B:"ßƁɃ",
        b:"ƀɓЬ",

        C:"ÇĆĈĊČ",
        c:"çćĉċčс",

        D:"ĎĐ",
        d:"ďđԁ",

        E:"ÈÉÊËĒĔĖĘĚȄȆ",
        e:"èéêëēĕėęěȅȇеҽɛ",

        F:"Ƒ",
        f:"ƒ",

        G:"ĜĞĠĢ",
        g:"ĝğġģɡ",

        H:"ĤĦ",
        h:"ĥħһ",

        I:"ÌÍÎÏĨĪĬǏİȈȊ",
        i:"ìíîïĩīĭǐıȉȋіɩ",

        J:"Ĵ",
        j:"ĵ",

        K:"Ķ",
        k:"ķκ",

        L:"ĹĻĽĿŁ",
        l:"ĺļľŀłⅼ",

        M:"Μ",
        m:"ṃⅿм",

        N:"ÑŃŅŇ",
        n:"ñńņňոп",

        O:"ÒÓÔÕÖØŌŎŐǑȌȎ",
        o:"òóôõöøōŏőǒȍȏοоɵ",

        P:"Ƥ",
        p:"ρрƥ",

        Q:"Q",
        q:"զɋ",

        R:"ŔŖŘ",
        r:"ŕŗřг",

        S:"ŚŜŞŠ",
        s:"śŝşšѕ",

        T:"ŢŤŦ",
        t:"ţťŧτ",

        U:"ÙÚÛÜŨŪŬŮŰǓ",
        u:"ùúûüũūŭůűǔυս",

        V:"V",
        v:"ⅴν",

        W:"Ŵ",
        w:"ŵω",

        X:"Χ",
        x:"χхⅹ",

        Y:"ÝŶŸ",
        y:"ýÿŷγу",

        Z:"ŹŻŽ",
        z:"źżžᴢ",

        "0":"ΟО〇",
        "1":"١۱Iⅼ",
        "2":"ƻ",
        "3":"ƐЗ",
        "4":"٤",
        "5":"Ƽ",
        "6":"б",
        "7":"٧",
        "8":"Ȣ",
        "9":"९"
    };

    // Every editable character in the transcript
    const pool = [];

    const walker = document.createTreeWalker(
        transcript,
        NodeFilter.SHOW_TEXT
    );

    while (walker.nextNode()) {

        const node = walker.currentNode;
        const text = node.textContent;

        for (let i = 0; i < text.length; i++) {

            if (/[A-Za-z0-9]/.test(text[i])) {

                pool.push({
                    node,
                    index: i,
                    original: text[i]
                });

            }
        }
    }

    // Tracks only currently corrupted characters
    let active = [];

    function distort(char){

        const bank = distortions[char];

        if(!bank) return char;

        return bank[Math.floor(Math.random()*bank.length)];

    }

    function write(entry,char){

        const str = entry.node.textContent;

        entry.node.textContent =
            str.substring(0,entry.index) +
            char +
            str.substring(entry.index+1);

    }

    function update(){

        // Restore only changed letters
        active.forEach(entry=>{
            write(entry,entry.original);
        });

        active=[];

        const amount = 50 + Math.floor(Math.random()*31); // 50-80

        const used = new Set();

        while(active.length < amount){

            const pick = Math.floor(Math.random()*pool.length);

            if(used.has(pick)) continue;

            used.add(pick);

            const entry = pool[pick];

            write(entry,distort(entry.original));

            active.push(entry);

        }

        const next = 400 + Math.random()*2100;

        setTimeout(update,next);

    }

    update();

});