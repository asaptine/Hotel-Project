let date = new Date();
let currentYear = new Date(date.getFullYear());
endDate = new Date(date.getFullYear()+1, date.getMonth(), date.getDate());

$('input[name="dates"]').daterangepicker({
    "minDate": date,
    "maxDate": endDate,
    "minYear": currentYear,
    "maxYear": currentYear + 1,
    "maxSpan": {
        "days": 31
    },
    "locale": {
        "format": "YYYY/MM/DD",
        "separator": " - ",
        "applyLabel": "Primjeni",
        "cancelLabel": "Otkaži",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "Ned",
            "Pon",
            "Uto",
            "Sri",
            "Čet",
            "Pet",
            "Sub"
        ],
        "monthNames": [
            "Siječanj",
            "Veljača",
            "Ožujak",
            "Travanj",
            "Svibanj",
            "Lipanj",
            "Srpanj",
            "Kolovoz",
            "Rujan",
            "Listopad",
            "Studeni",
            "Prosinac"
        ],
        "firstDay": 1
    },
    "startDate": date
}, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
});
