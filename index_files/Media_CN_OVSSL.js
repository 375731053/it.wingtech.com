document.onkeydown = function(e) {
    try {
        e = e ? e : window.event;
        if (e.ctrlKey && e.keyCode == 67) {
            return false;
        }
    }
    catch (e)
                { }
}

document.oncontextmenu = function() {
    return false;
}

function getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);

    var result = null;

    if (r != null && r != undefined) {

        result = new Base64().decode(unescape(r[2]));

        if (result == "") {
            result = unescape(r[2]);
        }

    }

    return result;

}

function getWebSite() {
    try {

        var lblWebSite = document.getElementById('lblWebSite');
        var url = getQueryString("ref");

        if (lblWebSite != undefined && url != undefined) {
            lblWebSite.href = url;
            lblWebSite.innerHTML = url;
        }

        if (lblWebSite.attributes.getNamedItem("style") != undefined && lblWebSite.attributes.getNamedItem("style") != null) {
            lblWebSite.removeAttribute("style");
        }

        if (url != undefined && url != null) {
            var isHttp = (url.toLowerCase().indexOf("http://") >= 0);

//            if (isHttp) {
//                document.getElementById("titleString").innerHTML = "";
//            }
//            else {
//                document.getElementById("titleString").innerHTML = "、数据已加密";
//            }
        }
    }
    catch (e)
            { }
}

window.onload = getWebSite;

function opWindow(url) {

    var refUrl = getQueryString("ref");

    if (url.indexOf("?ref=") < 0 && refUrl != null && refUrl != undefined) {
        url += "?ref=" + new Base64().encode(refUrl);
    }

    var user_Agent = navigator.userAgent.toLowerCase();

    var isIeBrw = (user_Agent.indexOf("msie") != -1);

    opWindowEvent(url, 'Seal_Page');
    return false;
}

function opWindowEvent(url, title) {

    var user_Agent = navigator.userAgent.toLowerCase();
    var isIeBrw = (user_Agent.indexOf("msie") != -1);
    var isOpBrw = (user_Agent.indexOf("opera") != -1);
    var iebeta = null;

    var windowHeight = 730;

    if (screen != null) {
        if (screen.height < 670) {

            windowHeight = screen.height - 70;

        }
    }

    var param = "status=1,location=1,scrollbars=1,resizeable=yes,width=520,height=" + windowHeight;

    var owner = window.open(url, 'title', param);

    if (user_Agent.indexOf("msie 5") != -1) iebeta = 5;
    if (user_Agent.indexOf("msie 6") != -1) iebeta = 6;
    if (user_Agent.indexOf("msie 7") != -1) iebeta = 7;
    if (user_Agent.indexOf("msie 8") != -1) iebeta = 8;

    if ((owner != null) && (!isIeBrw || (iebeta >= 5))) {

        owner.focus();

    }
}