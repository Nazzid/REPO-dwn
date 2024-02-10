// ==UserScript==
// @name         REPO-dwn
// @namespace    REPO-dwn
// @version      2024-02-10
// @description  ngedonglot repo boss
// @author       Aing-ozan
// @match        https://repository.poltekkes-smg.ac.id/reader/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==



(async function (){
    console.log("Ok Injected hehe...")
    makeScrollableNav();
    let TOKEN = urlParam('token');
    let BID = urlParam('bid');
    let FID = urlParam('fid');
    let DATA = await getData(TOKEN, BID);
    DATA.map((value,index)=>{
        console.log(value)
        $(`<a />`).text("Download " + value.name).attr({
            class: 'whitespace-normal leading-none',
            href: value.url,
        }).appendTo($('<li />').attr({
            class: 'el-menu-item'
        }).appendTo($("ul")));
    })
})()

function makeScrollableNav(){
    $("ul").css({
        "height":"90%",
        "overflow":"scroll"
    })
}

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}
async function getData(TOKEN,BID){
    let get = await fetch(`https://repository.poltekkes-smg.ac.id/?p=get-all-attachment&bid=${BID}&token=${TOKEN}`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-browser-id": "u5VOA3M5mabwfGUcjmPXeYg3K1IvUSfd"
        },
        "body": `{\"bid\":${BID},\"token\":\"${TOKEN}\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
    let ret = await get.json()
    return ret
}