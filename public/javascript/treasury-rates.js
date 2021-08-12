//Construct the header for the treasury rate table
function makeHeader(data, keys) {
        const row = $("<tr class='dates'>");
        if (data !== 0) {
        $(".treasury-rates-head").append(row);
        for(var i = 0; i < keys.length; i++) {
            row.append($("<th colspan='2' style='border: 2px solid black; border-collapse:collapse'>" + keys[i] + "</th>"));
        }
    }
}

//Construct the body for the treasury rate table
function makeBody(data, keys) {
            var dateKeys = Object.keys(data.data.Date[keys[0]]);
            for(var j = 0; j < dateKeys.length; j++) {
                const row = $("<tr class='rates'>");
                for (var x = 0; x < keys.length; x++) {
                    $(".treasury-rates-body").append(row);
                    row.append($("<td>" + dateKeys[j] + "</td>"));
                    row.append($("<td>" + data.data.Date[keys[x]][dateKeys[j]] + "</td>"));
                }
            }
}

//When the page has loaded.
$( document ).ready(function(){
    //Perform Ajax request.
    const q = 'https://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yield';
    $.ajax({
        url: 'https://shrouded-fortress-16738.herokuapp.com/api?q=' + q,
        type: 'get',
        success: function(data){
            if (data !== 0) {
                var keys = Object.keys(data.data.Date)
                makeHeader(data, keys);
                makeBody(data, keys);
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});