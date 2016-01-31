/// <reference path="../../tsd/typings/knockout/knockout.d.ts" />
class ShampooViewModel {
    
    public volume: KnockoutObservable<number> = ko.observable(500);

    public push(): void {
        if (this.volume() < 100) {
            this.volume(0);
            return;
        }
        this.volume(this.volume() - 100);
    }
}

var viewModel = new ShampooViewModel();
ko.applyBindings(viewModel);