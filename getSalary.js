var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var urls = ['https://www.google.com/search?q=software%20engineer%20salary'];

var download = function(url){
	return new Promise(function(resolve, reject){
		function callback(error, response, body){
			if(!error){
				resolve(body);
			}
			else{
				reject(error);
			}
		}
		request(url, callback);
	});
};

var save = function(data, filename){
	return new Promise(function(resolve, reject){
		fs.writeFile(filename, data, function(err) {
			if(err) {
				reject(error);
			}
			resolve('The ' + filename + ' was saved!');
		}); 
	});
};


var getData = function(){

    urls.forEach(function(url,i){
    var page = download(url);
    page.then(function(body){
        // console.log(body);
        var filename = 'SalaryDataSet/' + i + '.html';
        return save(body, filename);
    });
    });
};


var read = function(i){
    var content = fs.readFileSync ('SalaryDataSet/'+ i +'.html','utf-8');
    // console.log(i);
    content = fs.appendFileSync('SalaryDataSet/salary.txt', content);
};


var Combine = function(){
    var empty = "";
    fs.writeFile('SalaryDataSet/salary.txt', empty);

    for(var i=0; i< urls.length;i++){
        read(i);
    }
};


var Clear = function(){

    content = fs.readFileSync('SalaryDataSet/salary.txt','utf-8');
    content=content.replace(/\n/g,'');
    content=content.replace(/\r\n/g,'');
    
    content = fs.writeFileSync('SalaryDataSet/salary.txt', content);

};

var getSalary = function(){
    var data = fs.readFileSync('SalaryDataSet/salary.txt','utf-8');
    var $ = cheerio.load(data);
    var salaries = [];
    $('span._m3b').each(function(i, element){
        salaries.push($(element).text());
    });
    console.log(salaries);
    return salaries;
};

getData();
Combine();
Clear();
getSalary();
