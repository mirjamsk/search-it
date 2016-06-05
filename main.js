$(document).ready(function() {
    var headers = $('div.collapsible-header');

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('#searchable-1').searchIt({
        useMaterializeCollapsible: true,
        headerIdentifier: '.collapsible-header',
        itemSelector: '.collapsible-body a',
        searchTemplate: '<div class="input-field">' +
            '<input id="navbar-search" type="text">' +
            '<label for="navbar-search">Search</label>' +
            '</div>'
    });

    $('#searchable-2').searchIt({
        itemSelector: 'a',
        inputLabelValue: 'Looking for something?',
    });

    $('#searchable-3').searchIt({
        itemSelector: 'a',
        inputLabelValue: 'Looking for something?',
        $searchInput: $('#input-container-3').find('input'),
    });
    $('#searchable-4').searchIt({
        itemSelector: 'tr',
    });
});
