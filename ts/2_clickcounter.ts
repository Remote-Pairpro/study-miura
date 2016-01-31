/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

class ClickCounterViewModel {
    // プロパティっぽいやつ
    public numberOfClicks: KnockoutObservable<number>;
    public hasClickedTooManyTimes: KnockoutComputed<number>;
    public getMizumashi: KnockoutComputed<number>;
    
    
    // コンストラクタ
    constructor() {
        // 初期値は作成時の引数から作成。
        this.numberOfClicks = ko.observable(3);
        // イベント追加。
        this.hasClickedTooManyTimes = ko.computed({
            owner: this,
            read: function() {
                return this.numberOfClicks() >= 5;
            }
        });
        this.getMizumashi = ko.computed({
            owner: this,
            read: function() {
                return this.numberOfClicks() * 10;
            }
        });
    }

    public registerClick(): void {
        this.numberOfClicks(this.numberOfClicks() + 1);
    }
    
    public resetClicks(): void {
         this.numberOfClicks(0);
    }
}


// var ClickCounterViewModel = function() {
//     this.hasClickedTooManyTimes = ko.computed(function() {
//         return this.numberOfClicks() >= 5;
//     }, this);
//     this.getMizumashi = ko.computed(function() {
//         return this.numberOfClicks() * 10;
//     }, this);
// };
 
// KnockoutJS側に登録。
ko.applyBindings(new ClickCounterViewModel());