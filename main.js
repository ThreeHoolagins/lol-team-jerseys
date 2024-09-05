const championsJson = "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/champion.json";
const championJson = "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/en_US/champion/";
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

const logViableMap = (map) => {
    var returnList = []
    for (let [key, value] of map.entries()) {
        if (value > 4) {
            returnList.push(key);
        }
    }
    console.log(returnList);
}

const getChampionNames = async () => {
    var call = await fetch(championsJson);
    var champList = await call.json();
    var championDatas = champList.data;
    console.log(championDatas);
    var champsDiv = document.getElementById("champs");
    champsDiv.innerHTML += ("<p>");
    var champsJson = new Map();
    Object.entries(championDatas).forEach(async championData => {
        var championName = championData[1].name;
        // champsDiv.innerHTML += (championName + " <img src=\"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + championName + "_2.jpg\">");  
        let champjson = await getSkinLinesForChampion(championName);
        champjson.forEach(value => {
            if (value.name !== "default") {
                var skinLine = value.name.replace(championName, "").trim();
                if (!champsJson.has(skinLine)) {
                    champsJson.set(skinLine, 1);
                }
                else {
                    champsJson.set(skinLine, champsJson.get(skinLine) + 1);
                }
            }
        })
    });
    champsDiv.innerHTML += ("</p>");
    console.log(champsJson);
    for (let thing in champsJson) {
        console.log(`${thing}`) 
    }


}

getChampionNames();