$(document).ready(function() {
    var headers = $('div.collapsible-header');

    $('.collapsible').collapsible({
        accordion: false
    });

    $('#searchable-1').searchIt({
        useMaterializeCollapsible: true,
        headerIdentifier: '.collapsible-header',
        itemSelector: '.collapsible-body a',
        searchTemplate: '<div class="input-field">' +
            '<input id="navbar-search" type="text">' +
            '<label for="navbar-search"><i class="material-icons small">search</i> Search</label>' +
            '</div>'
    });

    $('#searchable-2').searchIt({
        itemSelector: 'a',
        inputLabelValue: 'Looking for something?',
    });

    $('#searchable-3').searchIt({
        itemSelector: 'tr',
        $searchInput: $('#input-container-3').find('input'),
    });

});
