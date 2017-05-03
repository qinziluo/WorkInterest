var fs = require('fs');
var data = require('./Boston.json');

var cleardata = function (data) {//get the useful data
    var results = data;
    var length = results.length;
    var newresults = [];
    var everyjob = {};
    info = ['jobtitle', 'company', 'city', 'date', 'snippet'];//select the useful information
    for (var i = 0; i < length; i++) {
        everyjob = results[i];
        var everynewjob = {};
        for (var n = 0; n < info.length; n++) {
            var oneinfo = info[n];
            if (everyjob != null) {
                everynewjob[oneinfo] = everyjob[oneinfo];
            }

        }
        newresults[i] = everynewjob;
    };
    return newresults;
}

var infotostring = function (info, infotype) {// get the company name strings
    var length = info.length;
    var totalwords = [];
    for (var i = 0; i < length; i++) {
        var everyinfo = info[i];
        var string = everyinfo[infotype];
        totalwords = totalwords.concat(string);
    }
    return totalwords;
}

var infotowords = function (info, infotype) {//get all single words of the jotitles
    var length = info.length;
    var totalwords = [];

    for (var i = 0; i < length; i++) {
        var everyinfo = info[i];
        var string = everyinfo[infotype];
        if (string != undefined) {
            words = string.split(' ');//get seperate words
            totalwords = totalwords.concat(words);
        }

    }
    var words = totalwords.map(function (title) {
        return title.toLowerCase().match(/([a-z]+)/g);//get effective words
    });
    var common = ['and', 'the', 'a', 'an', 'to', 'of', 'on', 'in', 'no', 'i', 'ii', 'iii'];//useless words
    var subwords = [];

    var sub = words.filter(function (word) {
        if (word != null) {
            if (common.includes(word[0])) {
                return false;
            }
            else return true;
        };
    });

    for (var i = 0; i < sub.length; i++) {
        subwords = subwords.concat(sub[i][0]);
    };
    return (subwords);
}

var wordcount = function (words) {//count the frequency of words
    var wordcount = words.reduce(function (previous, current) {
        if (current !== null) {
            if (current in previous) {
                previous[current] += 1;
            }
            else {
                previous[current] = 1;
            }
        }
        return previous;
    }, {})
    return wordcount;
}

var orderoffrequency = function (wordcount) {
    keysSorted = Object.keys(wordcount).sort(function (a, b) { return wordcount[b] - wordcount[a] });
    return keysSorted;
}

var sorteddata = function (datacount, order) {
    var arr = [];
    for (var i = 0; i < order.length; i++) {
        var arrele = [];
        arrele[0] = order[i];
        arrele[1] = datacount[order[i]];
        arr[i] = arrele;
    }
    return arr;
}



var newdata = cleardata(data);
fs.writeFile('newdata.js', JSON.stringify(newdata));

var companystrings = infotostring(newdata, 'company');

var companystringcount = wordcount(companystrings);

var companyorder = orderoffrequency(companystringcount);

var sortedcompanydata = sorteddata(companystringcount, companyorder);
fs.writeFile('sortedcompanydata.js', 'var sortedcompanydata=');
fs.appendFile('sortedcompanydata.js', JSON.stringify(sortedcompanydata));

var jobtitlewords = infotowords(newdata, 'jobtitle');

var jobtitlewordcount = wordcount(jobtitlewords);

var joborder = orderoffrequency(jobtitlewordcount);

var sortedjobdata = sorteddata(jobtitlewordcount, joborder);
fs.writeFile('sortedjobdata.js', 'var sortedjobdata=');
fs.appendFile('sortedjobdata.js', JSON.stringify(sortedjobdata));

   


