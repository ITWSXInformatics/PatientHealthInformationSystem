// get the url
var url = window.location.href;
console.log(url.split("#")[0].split("=")[1]);
//getting the access token from url
var access_token = url.split("#")[1].split("=")[1].split("&")[0];
// get the userid
var userId = url.split("#")[1].split("=")[2].split("&")[0];
var dateT = [];
var outRange = [];
var fatBurn = [];
var cardio = [];
var peak = [];
var resting = [];
console.log(access_token);
console.log(userId);

// var access_token = 'a1ba0c905847fb4cc7d3919be113dd16';
// var userId = '22BCFK';
var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities.json');
console.log('Updated log');
// heart rate
xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/heart/date/today/1w.json');
// heart rate in a certain time period
//api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/00:00/00:01.json

// xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/heart/date/today/1d/1sec.json');
xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
xhr.onload = function () {
    console.log(xhr.status)
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText)
        var i;
        var t;
        for (i = 0; i < 7; i++) {
          dateT.push(data["activities-heart"][i].dateTime);
          t = data["activities-heart"][i].value.heartRateZones[0].minutes;
          if (typeof t !== 'undefined') {
            outRange.push(t);
          } else {
            outRange.push(0);
          }

          t = data["activities-heart"][i].value.heartRateZones[1].minutes;
          if (typeof t !== 'undefined') {
            fatBurn.push(t);
          } else {
            fatBurn.push(0);
          }

          t = data["activities-heart"][i].value.heartRateZones[2].minutes;
          if (typeof t !== 'undefined') {
            cardio.push(t);
          } else {
            cardio.push(0);
          }

          t = data["activities-heart"][i].value.heartRateZones[3].minutes;
          if (typeof t !== 'undefined') {
            peak.push(t);
          } else {
            peak.push(0);
          }

          t = data["activities-heart"][i].value.restingHeartRate;
          if (typeof t !== 'undefined') {
            resting.push(t);
          } else {
            resting.push(0);
          }
        }
        // document.write(xhr.responseText)
        // console.log("\n")

    }
};

var myGroupedBarChart = new Chart(document.getElementById("bar-chart-grouped").getContext("2d"), {
    type: 'bar',
    data: {
      labels: dateT,
      datasets: [
        {
          label: "OutOfRange",
          backgroundColor: "#00CED1",
          data: outRange
        }, {
          label: "Fat Burn",
          backgroundColor: "#FFD700",
          data: fatBurn
        }, {
          label: "cardio",
          backgroundColor: "#3CB371",
          data: cardio
        }, {
          label: "Peak",
          backgroundColor: "#DC143C",
          data: peak
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Heart Rate Zones'
      },
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  suggestedMax: 1500,
              }
          }],
      }
    }
});

var myLineChart = new Chart(document.getElementById("line-chart").getContext("2d"), {
  type: 'line',
  data: {
    labels: dateT,
    datasets: [{
        data: resting,
        label: "Resting Heart Rate",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Resting Heart Rate'
    }
  }
});
xhr.send()
