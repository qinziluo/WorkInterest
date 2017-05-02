var fs = require('fs');
var jsonfile = require('jsonfile');
var cheerio = require('cheerio');

var data_merge = function(){

    var content = fs.readFileSync ('jobData.js', 'utf-8');    
    var content = '[' + content + ']'; 
    content = fs.writeFile('jobData_foranalysis.js', content);
    // var file = 'jobData_foranalysis.js';
    // file = file.replace(/\.[^\.]+$/, '.json');
    // console.log(file)
    var jobarray = require('./jobData.js');
    console.log(jobarray);
};
data_merge()
