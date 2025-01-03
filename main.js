const championsJson = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion.json";
const championJson = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion/";
const gameVersion = "14.17.1";

const getSkinSplashArtLink = (championName, skinNumber = 0) => {
    return "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championName + "_" + skinNumber + ".jpg";
}

const getSkinLoadingScreenArtLink = (championName, skinNumber = 0) => {
    return "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + championName + "_" + skinNumber + ".jpg";
}

const getChampionPassiveArtLink = (championName) => {
    return "https://ddragon.leagueoflegends.com/cdn/" + gameVersion + "/img/champion/" + championName + "_P.jpg";
}

const getChampionAbilityArtLink = (abilityName) => {
    return "https://ddragon.leagueoflegends.com/cdn/" + gameVersion + "/img/spell/" + abilityName + ".jpg";
}

const getSkinLinesForChampion = async (champion) => {
    var call = await fetch(championJson + champion + ".json");
    var champJson = await call.json();
    return champJson.data[champion].skins;
}

function myFunction(value, index, array) {
    return index == value;
}

function toggleDiv (id) {
    var divToToggle = document.getElementById(id);
    divToToggle.hidden = !divToToggle.hidden;
}

const getViableLines = (map) => {
    map.forEach((value, key) => {
        if (value.length < 5) {
            map.delete(key)
        }
    });
    printViable(map)
}

const printViable = (map) => {
    var champsDiv = document.getElementById("champs");
    map.forEach((value, key) => {
        var setter = `\'${key}\'`
        champsDiv.innerHTML += `<p class="centerText" onclick="toggleDiv(${setter})">${key} (${value.length})</p>`;
        var imageGallery = `<div id=${setter} class="testClass" hidden>`
        value.forEach(skinArr => {
            var skinSplashLink = getSkinSplashArtLink(skinArr[1], skinArr[2]);
            imageGallery += '<figure>'
            imageGallery += `<img class="splash" src=\"${skinSplashLink}\">`
            imageGallery += `<figcaption>${skinArr[0]}</figcaption>`
            imageGallery += '</figure>'
        })
        imageGallery += (`</div>`);
        champsDiv.innerHTML += imageGallery;
    });
}

const getChampionNames = async () => {
    var call = await fetch(championsJson);
    var champList = await call.json();
    var championDatas = Object.entries(champList.data);
    var champsJson = new Map();
    for (champDatainfo of championDatas) {
        var championName = champDatainfo[1].id;
        let champjson = await getSkinLinesForChampion(championName);
        console.log(typeof champjson);
        Object.entries(champjson).forEach(value => {
            if (value[1].name !== "default") {
                var skinLine = value[1].name.replace(championName, "").trim();
                if (!champsJson.has(skinLine)) {
                    champsJson.set(skinLine, [[value[1].name.trim(), championName, value[1].num]]);
                }
                else {
                    champsJson.set(skinLine, [...champsJson.get(skinLine), [value[1].name.trim(), championName, value[1].num]]);
                }
            }
        })
    }
    champsJson = new Map([...champsJson.entries()].sort());
    getViableLines(champsJson);
    console.log(champsJson);
}

window.onload = getChampionNames();