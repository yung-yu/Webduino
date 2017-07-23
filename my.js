var dht;
var myFirebase;
var temperature;
var humidity;
var date;
var time;

function get_date(t) {
  var varDay = new Date(),
    varYear = varDay.getFullYear(),
    varMonth = varDay.getMonth() + 1,
    varDate = varDay.getDate();
  var varNow;
  if (t == "ymd") {
    varNow = varYear + "/" + varMonth + "/" + varDate;
  } else if (t == "mdy") {
    varNow = varMonth + "/" + varDate + "/" + varYear;
  } else if (t == "dmy") {
    varNow = varDate + "/" + varMonth + "/" + varYear;
  } else if (t == "y") {
    varNow = varYear;
  } else if (t == "m") {
    varNow = varMonth;
  } else if (t == "d") {
    varNow = varDate;
  }
  return varNow;
}

function get_time(t) {
  var varTime = new Date(),
    varHours = varTime.getHours(),
    varMinutes = varTime.getMinutes(),
    varSeconds = varTime.getSeconds();
  var varNow;
  if (t == "hms") {
    varNow = varHours + ":" + varMinutes + ":" + varSeconds;
  } else if (t == "h") {
    varNow = varHours;
  } else if (t == "m") {
    varNow = varMinutes;
  } else if (t == "s") {
    varNow = varSeconds;
  }
  return varNow;
}


boardReady({device: 'Ak0D'}, function (board) {
  board.systemReset();
  board.samplingInterval = 250;
  dht = getDht(board, 11);
  var config = {
    apiKey: "AIzaSyCUDZIrAdw2cOjmcjQfPcsRwQkPTJ5Oz3A",
    authDomain: "action-sensor.firebaseapp.com",
    databaseURL: "https://action-sensor.firebaseio.com",
    projectId: "action-sensor",
    storageBucket: "action-sensor.appspot.com",
    messagingSenderId: "636330034281"
  };
  firebase.initializeApp(config);
  dht.read(function(evt){
    temperature = dht.temperature;
    humidity = dht.humidity;
    date = get_date("ymd");
    time = get_time("hms");
    document.getElementById("demo-area-01-show").innerHTML = (['溫度(℃)：',temperature,'</br> 濕度(%)：',humidity,'</br>'].join(''));
    document.getElementById("demo-area-02-show").innerHTML = (['時間：',date,'_',time].join(''));
    firebase.database().ref('myroom').set({
      temperature:temperature,
      humidity:humidity,
      datetime:[date,'_',time].join('')
    });
  }, 30000);
});
