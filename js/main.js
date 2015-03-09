var count = 0;

function start() {
    document.getElementById("weather").classList.add('animate_revolve3');
    //document.getElementById("battery").classList.add('animate_revolve1');
    //document.getElementById("date").classList.add('animate_revolve2');
    document.getElementById("battery").classList.add('disappear');
    document.getElementById("date").classList.add('disappear');
    getWeather();
    getClock();
    if (autoAnimate) {
        setTimeout('autoAnimation()', 3000);
    }

    getBattery(); //On computer testing put functions before this guy.
}

function autoAnimation() {
    rotate();
    setTimeout('autoAnimation()', (animationLength + animationPause) * 1000);
}

function sizeWindow() {
    var width = $(window).width();
    if (width == 375) {
        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=300, initial-scale=1.17, maximum-scale=1.17, user-scalable=0');
    } else if (width == 414) {
        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=300, initial-scale=1.3, maximum-scale=1.3, user-scalable=0');
    } else {}
}

function getClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    var currentTimeString = "";

    currentHours = (currentHours == 0) ? 12 : currentHours;
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    if (hourConfig == "true") {
        currentTimeString = currentHours + ":" + currentMinutes;
    } else {

        var timeOfDay = (currentHours < 12) ? "AM" : "PM"
        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
        currentHours = (currentHours == 0) ? 12 : currentHours;
        if (ampmVisable == "true") {
            currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
        } else {
            currentTimeString = currentHours + ":" + currentMinutes;
        }

    }
    document.getElementById("clock").style.fontSize = fontSize + "px";
    document.getElementById("clock").style.color = textColor;
    document.getElementById("clock").innerHTML = currentTimeString;
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    document.getElementById("date").style.fontSize = fontSize + "px";
    document.getElementById("date").style.color = textColor;
    document.getElementById("date").style.top = fontSize + 10 + "px";
    document.getElementById("date").innerHTML = month + "/" + day;
    setTimeout('getClock()', 5000);
}

function getWeather() {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + WOEID + "%20and%20u%3D\'" + tempUnit + "\'&format=json&diagnostics=true&callback=";
    $.getJSON(url, function() {}).done(function(data) {
        var temp = data.query.results.channel.item.condition.temp + "&deg;" + tempUnit.toUpperCase();
        document.getElementById("weather").style.fontSize = fontSize + "px";
        document.getElementById("weather").style.color = textColor;
        document.getElementById("weather").style.top = fontSize + 10 + "px";
        document.getElementById("weather").innerHTML = temp;
    }).fail(function(d, textStatus, error) {
        document.getElementById("weather").style.fontSize = fontSize + "px";
        document.getElementById("weather").style.color = textColor;
        document.getElementById("weather").style.top = fontSize + 10 + "px";
        document.getElementById("weather").innerHTML = "?&deg;" + tempUnit.toUpperCase();
        setTimeout('getWeather()', 1000);
    }).always(function() {});
    setTimeout('getWeather()', 60 * 1000 * 60 * refreshRate);
}

function getBattery() {
    /*
        $.get('file:///private/var/mobile/Library/BatteryStats.txt', function(appdata) {

            var substr = appdata.split('\n');
            var Level = substr[0].split(':')[1];
            //state = substr[1].split(':')[1];
            document.getElementById("battery").style.fontSize = fontSize + "px";
            document.getElementById("battery").style.color = textColor;
            document.getElementById("battery").style.top = fontSize + 10 + "px";
            document.getElementById("battery").innerHTML = Level + "%";
        });

        setTimeout('getBattery()', 60 * 1000);  
        //appdata.remove();
        setTimeout('getBattery()', 60 * 1000);
       */ 
    document.getElementById("battery").style.fontSize = fontSize + "px";
    document.getElementById("battery").style.color = textColor;
    document.getElementById("battery").style.top = fontSize + 10 + "px";
    document.getElementById("battery").innerHTML = "55" + "%";
}


function onTap() {
    animate_revolve();
    if (autoAnimate == false) {
        //rotate();
        
    }

}

function auto_animate_revolve() {
    var weatherDiv = document.getElementById("weather");
    var batteryDiv = document.getElementById("battery");
    var dateDiv = document.getElementById("date");
    weatherDiv.classList.remove('animate_revolve3');
    weatherDiv.classList.add('animate_revolve1');
    batteryDiv.classList.remove('animate_revolve1');
    batteryDiv.classList.add('animate_revolve2');
    dateDiv.classList.remove('animate_revolve2');
    dateDiv.classList.add('animate_revolve3');
    setTimeout(function() {
        weatherDiv.classList.remove('animate_revolve1');
        weatherDiv.classList.add('animate_revolve2');
        batteryDiv.classList.remove('animate_revolve2');
        batteryDiv.classList.add('animate_revolve3');
        dateDiv.classList.remove('animate_revolve3');
        dateDiv.classList.add('animate_revolve1');
        setTimeout(function() {
            weatherDiv.classList.remove('animate_revolve2');
            weatherDiv.classList.add('animate_revolve3');
            batteryDiv.classList.remove('animate_revolve3');
            batteryDiv.classList.add('animate_revolve1');
            dateDiv.classList.remove('animate_revolve1');
            dateDiv.classList.add('animate_revolve2');
        }, 3000);

    }, 3000);
}

function animate_revolve() {
    var weatherDiv = document.getElementById("weather");
    var batteryDiv = document.getElementById("battery");
    var dateDiv = document.getElementById("date");
    //weatherDiv.classList.remove('animate_revolve3');
    weatherDiv.classList.add('animate_revolve1');
    if (count == 0) {
        count = 1;
        weatherDiv.classList.remove('animate_revolve3');
        weatherDiv.classList.add('animate_revolve1');
        /*
        batteryDiv.classList.remove('animate_revolve1');
        batteryDiv.classList.add('animate_revolve2');
        dateDiv.classList.remove('animate_revolve2');
        dateDiv.classList.add('animate_revolve3');
        */
        setTimeout(function() {count = 2;}, 3000);
        
    } else if (count == 2) {
        count = 3;
        weatherDiv.classList.remove('animate_revolve1');
        weatherDiv.classList.add('animate_revolve2');
        /*
        batteryDiv.classList.remove('animate_revolve2');
        batteryDiv.classList.add('animate_revolve3');
        dateDiv.classList.remove('animate_revolve3');
        dateDiv.classList.add('animate_revolve1');
        */
        setTimeout(function() {count = 4;}, 3000);
    } else if (count == 4) {
        count = 5;
        weatherDiv.classList.remove('animate_revolve2');
        weatherDiv.classList.add('animate_revolve3');
        /*
        batteryDiv.classList.remove('animate_revolve3');
        batteryDiv.classList.add('animate_revolve1');
        dateDiv.classList.remove('animate_revolve1');
        dateDiv.classList.add('animate_revolve2');
        */
        setTimeout(function() {count = 0;}, 3000);
    }
}

function rotate() {
    var weatherDiv = document.getElementById("weather");
    var batteryDiv = document.getElementById("battery");
    var dateDiv = document.getElementById("date");
    batteryDiv.style.transitionDuration = animationLength + "s";
    dateDiv.style.transitionDuration = animationLength + "s";
    weatherDiv.style.transitionDuration = animationLength + "s";
    if (count == 0) {
        count = 1;
        weatherDiv.classList.remove('center');
        batteryDiv.classList.remove('disappear');
        weatherDiv.classList.add('animate');
        batteryDiv.classList.add('animatein');
        setTimeout(function() {
            batteryDiv.classList.remove('animatein');
            weatherDiv.classList.remove('animate');
            weatherDiv.classList.add('disappear');
            weatherDiv.style.transitionDuration = "0s";
            batteryDiv.classList.add('center');
            count = 2;
        }, animationLength * 1000);
    } else if (count == 2) {
        count = 3;
        batteryDiv.classList.remove('center');
        dateDiv.classList.remove('disappear');
        batteryDiv.classList.add('animate');
        dateDiv.classList.add('animatein');
        setTimeout(function() {
            dateDiv.classList.remove('animatein');
            batteryDiv.classList.remove('animate');
            batteryDiv.classList.add('disappear');
            batteryDiv.style.transitionDuration = "0s";
            dateDiv.classList.add('center');
            count = 4;
        }, animationLength * 1000);
    } else if (count == 4) {
        count = 5;
        dateDiv.classList.remove('center');
        weatherDiv.classList.remove('disappear');
        dateDiv.classList.add('animate');
        weatherDiv.classList.add('animatein');
        setTimeout(function() {
            weatherDiv.classList.remove('animatein');
            dateDiv.classList.remove('animate');
            dateDiv.classList.add('disappear');
            dateDiv.style.transitionDuration = "0s";
            weatherDiv.classList.add('center');
            count = 0;
        }, animationLength * 1000);
    }
}
