//Construct the table from the json data for the treasury rate table
function makeTable(data) {
    for(var j = 0; j < data.length; j++) {
        if(j % 2 === 0){
            if(j === 0) {
                var row = $("<tr class='title'>");
                for (var i = 0; i < data[j].length; i++) {
                    row.append($("<td class='category'>" + data[j][i] + "</td>"));
                }
            } else {
                var row = $("<tr class='even-rates'>");
                for(var i = 0; i < data[j].length; i++) {
                    row.append($("<td class='category'>" + data[j][i] + "</td>"));
                }

            }
        $(".treasury-rates").append(row);
        }
        else {
        var row = $("<tr class='odd-rates'>");
        for(var i = 0; i < data[j].length; i++) {
            row.append($("<td class='category'>" + data[j][i] + "</td>"));
        }
        $(".treasury-rates").append(row);
        }
    }
}

//When the page has loaded.
$( document ).ready(function(){

    //Set constraints on the search function
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear()
    const input = year + '-0' + month;

    if (month >= 10){
         let input = year + '-' + month;
    }

    $('#treasury-month').attr({
        value: input,
        max: input
    });

    //Perform Ajax request.
    $.ajax({
        url: '/treasury-scraper',
        type: 'get',
        success: function(data){
            if (data !== 0) {
                makeTable(data.data);
            }
        },
        error: function (xhr) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
});

$(document).ready(function () {
  $("#monthly-treasury").submit(function (event) {
    event.preventDefault();
    var formData = {
      month: $("#treasury-month").val(),
    };

    $.ajax({
      type: "post",
      url: "/treasury-monthly",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
        if(data !== 0) {
            $('.title').remove();
            $('.odd-rates').remove();
            $('.even-rates').remove();
            makeTable(data.data);
        }
    });
  });
});