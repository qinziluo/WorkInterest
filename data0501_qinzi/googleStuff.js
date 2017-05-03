//  draw graph
// -------------------------------------
google.load("visualization", "1", { packages: ["corechart"] });

function drawChart(dataset, chartType) {

    var data = google.visualization.arrayToDataTable(dataset);

    var options = {
        title: 'Is it good to be a government employee?',
        subtitle: 'exploration of government salaries',
        'chartArea': { 'width': '50%', 'height': '95%' }
    };


    chartType.draw(data, options);
}