// These code snippets use an open-source library. http://unirest.io/nodejs
var unirest = require('unirest');
var fs = require('fs');

var parameters = {
    callback:"<required>",
    chnl: "<required>",
    co:"<required>",
    filter:"<required>",
    format:"json",
    fromage:"<required>",
    highlight:"<required>",
    jt: "<required>",
    l: "cambridge%2C+ma",
    latlong: "<required>",
    limit: 25,
    q:"",
    radius: 25,
    sort:"<required>",
    st:"<required>",
    start: 0,
    useragent:"<required>",
    userip:"<required>",
    v: 2
};


var join_para = function(parameters){
    var base = "https://indeed-indeed.p.mashape.com/apisearch?publisher=4665604319447589";
    for (var property in parameters) {
    // console.log(typeof(property));
    if (parameters.hasOwnProperty(property)) {
        var value = parameters[property].toString();
        var title = "&" + property + "=" + parameters[property];
        base += title;       
        }
    }
        return base;
};


var request_data = function(parameters){
    var l = parameters.l; 
    var empty = "";
    fs.writeFile("data/jobData" + "_" + l + ".json", empty);
    var joblist = [];

    for (var i = 0; i < 1000; i++){
        parameters.start += 25;
        parameters.limit += 25;
        var url = join_para(parameters);
        unirest.get(url)
        .header("X-Mashape-Key", "UVlf4guEQ7mshf0ylS9SRPRuXMXFp1Xyvwfjsn7f8yPXmrqLxb")
        .header("Accept", "application/json")
        .end(function(result){
            // console.log(result.body);
            var data_body = result.body;
            var key = "results";
            // console.log(data_body[key]);
            joblist = joblist.concat(data_body[key]);                                              
        });
    } 
    //Callback will cause headache 
    var location = parameters.l;
    setTimeout(function(){fs.appendFile("data/jobData" + "_" + l + ".json", JSON.stringify(joblist))}, 10000); 
};

// request_data(parameters);


var request_data_cities = function(parameters){
    var cities = ["New+York+City%2C+NY", "San+Francisco%2C+CA", "Washington%2C+DC", "Los+Angeles%2C+CA","Boston%2C+MA","Chicago%2C+IL", "Seattle%2C+WA", "Austin%2C+TX","San+Diego%2C+CA","Houston%2C+TX","Dallas%2C+TX", "Philadelphia%2C+PA"];
    var city_length = cities.length;
    for (var i = 0; i< city_length; i++){
        var city = cities[i];
        parameters.l = city;
        request_data(parameters); 
    }
}; 


//Request data from different cities
request_data_cities(parameters); 


// unirest.get("https://indeed-indeed.p.mashape.com/apisearch?publisher=4665604319447589&callback=<required>&chnl=<required>&co=<required>&filter=<required>&format=json&fromage=<required>&highlight=<required>&jt=<required>&l=cambridge%2C+ma&latlong=<required>&limit=25&q=&radius=25&sort=<required>&st=<required>&start=<required>&useragent=<required>&userip=<required>&v=2")
// .header("X-Mashape-Key", "UVlf4guEQ7mshf0ylS9SRPRuXMXFp1Xyvwfjsn7f8yPXmrqLxb")
// .header("Accept", "application/json")
// .end(function (result) {
// //   console.log(result.status, result.headers, result.body);
//   var data = fs.writeFileSync("0501data.js", JSON.stringify(result));
//   return data
// });