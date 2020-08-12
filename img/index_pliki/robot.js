var ads_url = "https://5v.pl/ads.php";
var stats_url = "https://5v.pl/stats.php";
var popunder_stat_url = "https://5v.pl/popunder.php";
var country_api_url = "https://5v.pl/detect_country.php";
var loaded_ga_js = false;

//console.log("robot.js start");

var url = document.URL;

var isMobile = false;

if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;



function fix_flash() {
    // loop through every embed tag on the site
    var embeds = document.getElementsByTagName('embed');
    console.log(embeds);
    for(i=0; i<embeds.length; i++)  {
        console.log("embed "+i);
        embed = embeds[i];
        var new_embed;
        // everything but Firefox & Konqueror
        if(embed.outerHTML) {
            var html = embed.outerHTML;
            // replace an existing wmode parameter
            if(html.match(/wmode\s*=\s*('|")[a-zA-Z]+('|")/i))
                new_embed = html.replace(/wmode\s*=\s*('|")window('|")/i,"wmode='transparent'");
            // add a new wmode parameter
            else
                new_embed = html.replace(/<embed\s/i,"<embed wmode='transparent' ");
            // replace the old embed object with the fixed version
            embed.insertAdjacentHTML('beforeBegin',new_embed);
            embed.parentNode.removeChild(embed);
        } else {
            // cloneNode is buggy in some versions of Safari & Opera, but works fine in FF
            new_embed = embed.cloneNode(true);
            if(!new_embed.getAttribute('wmode') || new_embed.getAttribute('wmode').toLowerCase()=='window')
                new_embed.setAttribute('wmode','transparent');
            embed.parentNode.replaceChild(new_embed,embed);
        }
    }
    // loop through every object tag on the site
    var objects = document.getElementsByTagName('object');
    for(i=0; i<objects.length; i++) {
        object = objects[i];
        var new_object;
        // object is an IE specific tag so we can use outerHTML here
        if(object.outerHTML) {
            var html = object.outerHTML;
            // replace an existing wmode parameter
            if(html.match(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")[a-zA-Z]+('|")\s*\/?\>/i))
                new_object = html.replace(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")window('|")\s*\/?\>/i,"<param name='wmode' value='transparent' />");
            // add a new wmode parameter
            else
                new_object = html.replace(/<\/object\>/i,"<param name='wmode' value='transparent' />\n</object>");
            // loop through each of the param tags
            var children = object.childNodes;
            for(j=0; j<children.length; j++) {
                if(children[j].getAttribute('name').match(/flashvars/i)) {
                    new_object = new_object.replace(/<param\s+name\s*=\s*('|")flashvars('|")\s+value\s*=\s*('|")[^'"]*('|")\s*\/?\>/i,"<param name='flashvars' value='"+children[j].getAttribute('value')+"' />");
                }
            }
            // replace the old embed object with the fixed versiony
            object.insertAdjacentHTML('beforeBegin',new_object);
            object.parentNode.removeChild(object);
        }
    }
}

//alert("isMobile: " + isMobile);
function loadJSON(path, success, error) {   //console.log(path);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    //console.log(xhr.responseText);
                    if (xhr.responseText) {
                        success(JSON.parse(xhr.responseText));
                    }
                }
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
	try{
    xhr.open("GET", path, false);
    xhr.send();
	}
	catch(e) { }
}
function getSubdomain() {
    var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    var urlParts = regexParse.exec(window.location.hostname);

    if(urlParts[0]!="5v.pl") return null;

    return window.location.hostname.replace(urlParts[0], '').slice(0, -1);
}

function getCookie(d) {
    var b = d + "=";
    var a = document.cookie.split(";");
    for (var e = 0; e < a.length; e++) {
        var f = a[e].trim();
        if (f.indexOf(b) == 0) {
            return f.substring(b.length, f.length)
        }
    }
    return ""
}


if (!location.origin)
    location.origin = location.protocol + "//" + location.host;

//console.log("start robot.js na "+location.origin);

var subdomain = getSubdomain();
if(!subdomain){
    subdomain = window.location.hostname;
}

// zliczenie wyswietlen
loadJSON(stats_url + "?name=" + subdomain,
    function (data) {
        //console.log(data);
    },
    function (xhr) {

    }
);

//console.log("robot start");


var country_code = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
//console.log(country_code);

console.log("Country code: "+country_code);

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS || isMobile){
    country_code = null;
    isMobile = true;
}

if (country_code == null || country_code.length == 0) {
    country_code = getCookie('country_code');
}
//console.log(country_code); 

//country_code = "eng";
console.log("Country code: "+country_code);

if (country_code == null || country_code.length == 0) {
    loadJSON("https://freegeoip.net/json/",
        function (response) {
			console.log(response);
            country_code = response.country_code;
            var expdate = 30 * 24 * 60 * 60 * 1000;
            var i = new Date();
            i.setTime(i.getTime() + expdate);
            document.cookie = "country_code=" + country_code + "; expires=" + i.toGMTString();
            //		console.log(response.country_code);
        },
        function (xhr) {
            //country_code = "eng";
            //console.log("unknown location");
        }
    );
}

if (country_code == null || country_code.length == 0) {
	loadJSON(country_api_url,
		function (data) {
			//console.log(data);
			country_code = data.country_code;
			var expdate = 30 * 24 * 60 * 60 * 1000;
			var i = new Date();
			i.setTime(i.getTime() + expdate);
			document.cookie = "country_code=" + country_code + "; expires=" + i.toGMTString();
		});

}

if (country_code == null || country_code.length == 0) {
	country_code = "eng";
}

var lang = "other";
if (country_code == "pl" || country_code == "PL" || country_code == "pl-PL") {
    lang = "pl";
}
var intVal = isMobile ? 1 : 0;

var url = location.protocol + '//' + location.host + location.pathname;

loadJSON(ads_url + "?lang=" + lang + "&name=" + subdomain+"&mobile="+intVal+"&page_url="+url,
    function (data) {
        // json z ustawieniami reklamy
        //console.log(data);
        //console.log("Json z ustawieniami dla reklam:");

        //console.log("mobilne reklama");

       //alert(isMobile);

        if (data.new_system) {

            if (data.display /*&& !isMobile*/) {
                append_css();
                var arrayLength = data.display.length;
                if (arrayLength == 0) {
                    var div = document.getElementById("frame_c");
                    if (div !== null) {
                        div.style.top = "0px";
                    }

                }

                for (var i = 0; i < arrayLength; i++) {
                    var display_ad_record = data.display[i];
                    display_ad(display_ad_record,data);
                }
            } else {
                if (isMobile) {
					if(!loaded_ga_js){
						var my_awesome_script = document.createElement('script');
						my_awesome_script.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
						my_awesome_script.setAttribute('ga','5v');
						document.head.appendChild(my_awesome_script);

						loaded_ga_js = true;
					}
                    //console.log("mobilne reklama");
                    (adsbygoogle = window.adsbygoogle || []).push({
                        google_ad_client: "ca-pub-1597483494015623",
                        enable_page_level_ads: true
                    });
                }

                var div = document.getElementById("frame_c");
                if (div !== null) {
                    div.style.top = "0px";
                }
            }

            if (data.popunder) {
                popunder(data.popunder);
            }

            return;
        }

        if (data.type == "pop-under") {
            popunder(data);
            //console.log("pop-under");

        } else if (data.type == "display") {
            //console.log("display");
            display_ad(data.id, data.html, data.position);
//               (adsbygoogle = window.adsbygoogle || []).push({});
        } else if (data.type == "null") {
            var div = document.getElementById("frame_c");
            if (div !== null) {
                div.style.top = "0px";
            }
        }
    },
    function (xhr) {

    }
);


function append_script(element,url,callback){
    //var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    element.appendChild(script);

    //var styleNode = document.createElement('style');
    //styleNode.type = "text/css";
    //styleNode.innerHTML = "#siecibiznesu-display-type img, #siecibiznesu-display-type > iframe, #ads_bottom_static > iframe,#ads > iframe {margin: 0 auto;}";
    //element.appendChild(styleNode);
}

function append_css(){
    var head = document.getElementsByTagName('head')[0];
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.innerHTML = "#siecibiznesu-display-type img, #siecibiznesu-display-type > iframe, #ads_bottom_static > iframe,#ads > iframe {margin: 0 auto;}";
    head.appendChild(styleNode);

}


function display_ad(display_ad_record,full_data) {

	if(!loaded_ga_js && full_data.show_google){
		var my_awesome_script = document.createElement('script');
		my_awesome_script.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
		my_awesome_script.setAttribute('ga','5v');
		document.head.appendChild(my_awesome_script);

		loaded_ga_js = true;
	}

	//console.log(display_ad_record);

	var id = display_ad_record.id;
    var data = display_ad_record.html;
    var position = display_ad_record.position;

    var expdate = 30 * 24 * 60 * 60 * 1000;
//if(getCookie("display_ad")!="1")
// bez cookie
    if (1 == 1) {
        var i = new Date();
        i.setTime(i.getTime() + expdate);
//bez cookie
//document.cookie="display_ad=1; expires="+i.toGMTString();

        var check = document.getElementById("content_404");

        if (check !== null)return;

        if (position == "top_static" || position == "bottom_static" || position=="top_bottom_static") {

            var div = document.getElementById("ads");

            //if (div == null)return;

			console.log("dalej");
            var div2 = null;

            if(position =="top_bottom_static"){
                var div = document.getElementById("ads");

				if (div == null)return;


				div.style.height = "auto";

                if(full_data.alias) {
                }else{
                    var div2 = document.getElementById("ads_bottom_static");
                    div2.style.height = "auto";

                    var div_zamknij = document.getElementById("frame_c");

                    if (div_zamknij !== null) {
                        //div_zamknij.style.top = "0px";
                    }
                }

            }else if (position == "top_static") {
                var div = document.getElementById("ads");
				if (div == null)return;
                div.style.height = "auto";


            } else if (position == "bottom_static") {
                var div = document.getElementById("ads_bottom_static");
                if (div == null)return;

                div.style.height = "auto";

				console.log("bottom_static");

                var div_zamknij = document.getElementById("frame_c");

                if (div_zamknij !== null) {
                    div_zamknij.style.top = "0px";
                }
            }


            var check = document.getElementById("content_write");


            if (check !== null)return;

            if(div){
                if(display_ad_record.js_url) {
                    div.innerHTML = div.innerHTML+data;
                    append_script(div,display_ad_record.js_url,function(){});
                }else {
                    div.innerHTML = div.innerHTML+data;
                }
                div.style.display = "block";

            }
            if(div2){
                if(display_ad_record.js_url) {
                    div2.innerHTML = div2.innerHTML+data;
                    append_script(div2,display_ad_record.js_url,function(){});
                }else {
                    div2.innerHTML = div2.innerHTML+data;
                }
                div2.style.display = "block";
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {

                }
            }

        } else {
            var div = document.getElementById("frame_c");
            if (div !== null) {
                div.style.top = "0px";
            }

            var div = document.createElement("div");
            div.innerHTML = data;

            div.style.display = "block";

            div.id = "siecibiznesu-display-type";
            div.style.width = "728px";
            div.style.background = "transparent";
            div.style.position = "fixed";
            div.style.marginLeft = "300px";
            if (position == 'bottom' || position == null) {
                div.style.width = "100%";
                div.style.height = "auto";
                div.style.background = "transparent";
                div.style.textAlign = "center";
                div.style.right = 0;
                div.style.left = 0;
                div.style.bottom = 0;
                //div.style.height="90px";
            } else if (position == "top" || position=="top_bottom") {
                div.style.right = 0;
                div.style.left = 0;
                div.style.top = "20px";
                //div.style.height="90px";
                div.style.width = "100%";
                div.style.height = "auto";
                div.style.background = "transparent";
                div.style.textAlign = "center";
            } else if (position == "right") {
                div.style.right = "20px";
                div.style.top = "50px";
				//div2.style.width = "160px";
				div.style.width = "auto";
                div.style.height = "auto";
            } else if (position == "left" || position == "left_right") {
                div.style.left = "20px";
                div.style.top = "50px";
//div2.style.width = "160px";
				div.style.width = "auto";
                //div.style.width = "100%";
                div.style.height = "auto";
                div.style.textAlign = "left";
            }
            div.style.marginRight = "auto";
            div.style.marginLeft = "auto";
            div.style.marginBottom = "20px";

            div.style.zIndex = 999999999999999999;

            if(display_ad_record.js_url) {
                append_script(div, display_ad_record.js_url, function () {
                });
            }
            //var html='<div style="margin-right: 10px; float: right; padding:0px; text-align:right;" onclick="javascript:document.getElementById(\'siecibiznesu-display-type\').style.visibility=\'hidden\';document.getElementById(\'siecibiznesu-display-type\').style.top=\'-500px\';" onmouseover="style.cursor=\'pointer\'"><b>x</b></div>';


            if (position == "left_right" || position == "top_bottom") {
                var div2 = document.createElement("div");
                div2.id = "display-type2";
                div2.style.position = "fixed";
                div2.style.zIndex = 999999999999999999;
                div2.style.height = "auto";

                if (position == "left_right") {
                    div2.style.right = "20px";
                    div2.style.top = "50px";
                    //div2.style.width = "160px";
					div2.style.width = "auto";

					div2.style.marginRight = "auto";
                    div2.style.marginLeft = "auto";
                    div2.style.marginBottom = "20px";
                }else  if (position == "top_bottom"){
                    div2.style.width = "100%";
                    div2.style.height = "auto";
                    div2.style.background = "transparent";
                    div2.style.textAlign = "center";
                    div2.style.right = 0;
                    div2.style.left = 0;
                    div2.style.bottom = 0;
                }


                div2.innerHTML = data;


                if(display_ad_record.js_url) {
                    append_script(div2, display_ad_record.js_url, function () {});
                }
                document.body.appendChild(div2);
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {

                }
            }

            document.body.appendChild(div);
        }


        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {

        }



//eval(document.getElementById("runscript").innerHTML);
        // zliczenie wyswietlen

        loadJSON(popunder_stat_url + "?id=" + id + "&name=" + subdomain,
            function (data) {
//              console.log(data);
            },
            function (xhr) {

            }
        );


//var element = document.getElementById("siecibiznesu-display-type");
//element.parentNode.removeChild(element);
    }
}


function openInNewTab(url) {

	// zliczenie wyswietlen popundera
	loadJSON(popunder_stat_url + "?id=" + url.id + "&name=" + subdomain,
		function (data) {

		},
		function (xhr) {

		}
	);

	var win = window.open(url.html, '_blank');

	var elem = document.getElementById("display-pop");
	if (elem)elem.parentElement.removeChild(elem);

	win.focus();


}
function popunder(url) {
//console.log("load popunder");
	var strona = url.html;
	var expdate = 28 * 24 * 60 * 60 * 1000;


	if (isMobile) {
		if (getCookie("ms_popunder_" + url.id) != "1") {
			var i = new Date();
			i.setTime(i.getTime() + expdate);
			document.cookie = "ms_popunder_" + url.id + "=1;expires=" + i.toGMTString();

			var div_pop = document.createElement("div");
			div_pop.id = "display-pop";
			div_pop.style.position = "fixed";
			div_pop.style.zIndex = 999999999999999999;
			div_pop.style.height = "100%";
			div_pop.style.width = "100%";
			div_pop.style.left = 0;
			div_pop.style.top = 0;
			div_pop.style.overflow = "hidden";


			div_pop.onclick = function () {
				openInNewTab(url);
			};

			div_pop.ontouchstart = function () {
				openInNewTab(url);
			};
			div_pop.addEventListener('click',function () {
				openInNewTab(url);
			});

			document.body.appendChild(div_pop);
		}
	} else {

//console.log("popunder");

		wH = window.innerHeight;
		wW = window.innerWidth;
		wX = window.screenX;
		wY = window.screenY;
		var browser, version;
		var isChrome = window.chrome;
		var vendorName = window.navigator.vendor;
		if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
			version = new Number(RegExp.$1);
			browser = "FF"
		} else {
			if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
				version = new Number(RegExp.$1);
				browser = "IE"
			} else {
				if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					version = new Number(RegExp.$1);
					browser = "OP"
				} else {
					if (isChrome !== null && vendorName === "Google Inc.") {//console.log(window.chrome);
						var ua = navigator.userAgent;
						var uaArray = ua.split(" ");
						version = uaArray[uaArray.length - 2].substr(7).split(".")[0];
						browser = "CH"
					}
				}
			}
		}
		try {
			var _parent = (top != self && typeof(top.document.location.toString()) === "string") ? top : self;
		} catch (err) {
			browser = "FF";
		}
		var nazwa = (Math.floor((Math.random() * 1000) + 1));
		var params = "toolbar=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width=" + wW.toString() + ",height=" + wH.toString() + ",screenX=" + wX + ",screenY=" + wY;
		var ua = "ua";

		function focus_window() {
			window.blur();
			window.focus();
			// console.log("focus main window");
		}

		console.log("popunder");

		var popunder_func = function (g) {
			console.log("popunder click");
			//console.log(browser);

			if (getCookie("ms_popunder_" + url.id) != "1") {
				var i = new Date();
				i.setTime(i.getTime() + expdate);
				document.cookie = "ms_popunder_" + url.id + "=1;expires=" + i.toGMTString();
				if (browser == "CH" || browser == "OP") {
					//console.log("chrome browser");
					var c = _parent.window.open(strona, nazwa, params).blur();
					if (c) {
						try {
							c.blur();
							c.opener.window.focus();
							window.self.window.blur();
							window.focus();
							window.opener.focus();

							var f = document.createElement("a");
							f.href = "about:blank";
							f.target = "PopHelper";
							document.getElementsByTagName("body")[0].appendChild(f);
							f.parentNode.removeChild(f);
							var h = document.createEvent("MouseEvents");
							h.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
							f.dispatchEvent(h);
							window.open("about:blank", "PopHelper").close()
						} catch (g) {
						}
					}
				} else {
					if (browser == "FF") {
						var a = window.open(strona, "okno", "width=" + wW + ",height=" + wH + "top=0,left=0");
						var b = a.window.open("about:blank");
						b.close();
						b.blur();
						window.focus();
						//console.log("blur i focus");
					} else {
						if (browser == "IE") {
							var c = window.open(strona, "_blank", "width=" + wW + ",height=" + wH + "top=0,left=0").blur();
							window.focus()
						}
					}
				}
				setTimeout(focus_window, 1000);

				// zliczenie wyswietlen popundera
				loadJSON(popunder_stat_url + "?id=" + url.id + "&name=" + subdomain,
					function (data) {

					},
					function (xhr) {

					}
				);


				var elem = document.getElementById("iframe_overlay");
				if (elem)elem.parentElement.removeChild(elem);
			}

		};

		window.onclick = popunder_func;
		window.ontouchstart = popunder_func;


		window.addEventListener('click', popunder_func);


// jak iframe

		if (getCookie("ms_popunder_" + url.id) != "1") {
			var div = document.createElement('div');
			div.id = 'iframe_overlay';
			div.className = 'iframe_overlay';
			var iframe_cont = document.getElementById("iframe_cont");
			if (iframe_cont) {
				iframe_cont.appendChild(div);

				if (div)div.onclick = function (g) {


					var i = new Date();
					i.setTime(i.getTime() + expdate);
					document.cookie = "ms_popunder_" + url.id + "=1;domain=5v.pl; expires=" + i.toGMTString();
					if (browser == "CH" || browser == "OP") {
						var c = _parent.window.open(strona, nazwa, params);
						if (c) {
							try {
								c.blur();
								c.opener.window.focus();
								window.self.window.blur();
								window.focus();
								var f = document.createElement("a");
								f.href = "about:blank";
								f.target = "PopHelper";
								document.getElementsByTagName("body")[0].appendChild(f);
								f.parentNode.removeChild(f);
								var h = document.createEvent("MouseEvents");
								h.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
								f.dispatchEvent(h);
								window.open("about:blank", "PopHelper").close()
							} catch (g) {
							}
						}

					} else {
						if (browser == "FF") {
							var a = window.open(strona, "okno", "width=" + wW + ",height=" + wH + "top=0,left=0");

							if (a == null || typeof(popUp) == 'undefined') {
								//alert('Okno zostało zablokowane, zezwól proszę.');
							} else {

							}


							a.focus();
							var b = a.window.open("about:blank");
							b.close()
						} else {
							if (browser == "IE") {
								var c = window.open(strona, "_blank", "width=" + wW + ",height=" + wH + "top=0,left=0").blur();
								window.focus()
							}
						}


					}

					var elem = document.getElementById("iframe_overlay");
					if (elem)elem.parentElement.removeChild(elem);

					loadJSON(popunder_stat_url + "?id=" + url.id + "&name=" + subdomain,
						function (data) {
//              console.log(data);
						},
						function (xhr) {

						}
					);
				}
			}

		} else {
		}
	}
}
// koniec popunder

// tekst na dole

var div = document.createElement("div");
div.style.background = "white";
div.style.textAlign = "center";
div.style.position = "fixed";
div.style.width = "100%";
div.style.bottom = "0px";
div.style.padding = "5px 0";
div.style.zIndex = 999999999999999999;

var html = '<a href="https://5v.pl">Darmowy hosting zapewnia 5v.pl</a>';
div.innerHTML = html;


window.onload = function () {
	var d = new Date();
	var y = d.getFullYear();
	var text = "Wszelkie prawa zastrzeżone © 2016-"+y;
	if(document.getElementById("content_404")) {
		var stopka = document.getElementById("content_404").getElementsByClassName("footer");
		if (stopka.length > 0) {
			var p = stopka[0].getElementsByTagName("p");
			if (p.length > 0) {
				p[0].innerHTML = text;
			}
		}
	}

// dodanie paska na dole
//document.body.appendChild(div);
    var re = /^(https?:\/\/[^\/]+).*$/;
    var currentHref = window.location.href.replace(re, '$1');
    var reLocal = new RegExp('^' + currentHref.replace(/\./, '\\.'));

    var linksDiv = document.body;
    //console.log(linksDiv);
    if (linksDiv == null) return;
    var links = linksDiv.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var href = links[i].href;
        if (href == '' || reLocal.test(href) || !/^http/.test(href))
            continue;
        links[i].rel = 'no-follow';
    }

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-18174222-16', 'auto');
    ga('send', 'pageview');

    var subdomain = getSubdomain();

    if(!subdomain){
        subdomain = window.location.hostname;
    }

    if (subdomain && typeof subdomain !== 'undefined') {
        ga('send', {
            hitType: 'event',
            eventCategory: subdomain,
            eventAction: "subdomain"
        });

    }

    fix_flash();

}
