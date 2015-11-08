var ClickCounterViewModel = function() {
    
    this.numberOfClicks = ko.observable(3);
 
    this.registerClick = function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    };
 
    this.resetClicks = function() {
        this.numberOfClicks(0);
    };
 
    this.hasClickedTooManyTimes = ko.computed(function() {
        return this.numberOfClicks() >= 5;
    }, this);

    this.getMizumashi = ko.computed(function() {
        return this.numberOfClicks() * 10;
    }, this);


};
 
ko.applyBindings(new ClickCounterViewModel());