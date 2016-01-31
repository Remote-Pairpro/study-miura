/// <reference path="../../tsd/typings/knockout/knockout.d.ts" />
var ShampooViewModel = (function () {
    function ShampooViewModel() {
        this.volume = ko.observable(500);
    }
    ShampooViewModel.prototype.push = function () {
        if (this.volume() < 100) {
            this.volume(0);
            return;
        }
        this.volume(this.volume() - 100);
    };
    return ShampooViewModel;
})();
var viewModel = new ShampooViewModel();
ko.applyBindings(viewModel);
