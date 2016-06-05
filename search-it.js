/*
 search-it v0.1.1
 http://mirjamsk.github.io/search-it/

 Sample usage:
    $('#container').searchIt({
        itemSelector: 'p',
        inputLabelValue: 'Looking for something?',
    });  
*/
(function($, window, document, undefined) {

    var SearchIt = function(elem, options) {
        this.options = options;
        this.$container = $(elem);
        this.items = [];

    };

    SearchIt.prototype = {
        defaults: {
            $searchInput: null,
            inputLabelValue: 'Search',
            itemSelector: ".collapsible-body a",
            searchTemplate: '<div class="input-field"><label for="search">Search</label><input type="text" id="search"></div>',
            headerIdentifier: '.collapsible-header',
            useMaterializeCollapsible: false,
            toggle: function(item, match) {
                item.is_match = match;
                item.$item.toggle(match);
            },
            complete: function() {}
        },

        init: function() {
            // Combine defaults with user-specified options
            var self = this;
            var _defaults = jQuery.extend(true, {}, this.defaults);
            _defaults.searchTemplate = _defaults.searchTemplate.replace('search', 'search-' + this.$container.attr('id'));
            this.config = $.extend({}, _defaults, this.options);

            if (!this.config.$searchInput) {
                var $searchBar = null;
                this.$searchBar = $(this.config.searchTemplate);
                this.config.$searchInput = this.$searchBar.find("input");
                this.$container.before(this.$searchBar);
                if (this.options.inputLabelValue) {
                    this.$searchBar.find('label').text(this.options.inputLabelValue);
                }
            }
            this.$container.find(this.config.itemSelector).each(function() {
                self.items.push({
                    $item: $(this),
                    is_match: true
                });
            });
            this.bindKeyboardInput(this);
        },
        getQuery: function() {
            return this.config.$searchInput.val().toLowerCase().split(/\s+/)[0];
        },
        getText: function($item) {
            return $item.text().toLowerCase();
        },
        queryRegularContainer: function() {
            var query = this.getQuery();
            for (var i = 0; i < this.items.length; i++) {
                var text = this.getText(this.items[i].$item);
                var match = query === "" ? true : text.indexOf(query) >= 0;
                this.config.toggle(this.items[i], match);
            }
            this.config.complete();
        },
        queryMaterializeCollapsibleContainer: function() {
            var query = this.getQuery();
            for (var i = 0; i < this.items.length; i++) {
                var match = true;
                var text = this.getText(this.items[i].$item);
                if (query !== "") {
                    match = text.indexOf(query) >= 0;
                    this.$container.find(this.config.headerIdentifier + ":not(.active)").trigger('click');
                } else {
                    this.$container.find(this.config.headerIdentifier + ".active").trigger('click');
                    this.$container.find(this.config.headerIdentifier + ":first").trigger('click');
                }
                this.config.toggle(this.items[i], match);
            }
            this.config.complete();
        },

        bindKeyboardInput: function(self) {
            if (self.config.useMaterializeCollapsible) {
                self.config.$searchInput.on("keyup.searchIt change.searchIt", function() {
                    self.queryMaterializeCollapsibleContainer();
                });
            } else {
                self.config.$searchInput.on("keyup.searchIt change.searchIt", function() {
                    self.queryRegularContainer();
                });
            }
        }
    };

    SearchIt.defaults = SearchIt.prototype.defaults;
    $.fn.searchIt = function(options) {
        return this.each(function() {
            new SearchIt(this, options).init();
        });
    };

})(jQuery, window, document);
