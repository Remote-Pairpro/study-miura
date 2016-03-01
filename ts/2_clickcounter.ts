/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

class ClickCounterViewModel {
    
    // プロパティっぽいやつ
    public numberOfClicks: KnockoutObservable<number>;
    public hasClickedTooManyTimes: KnockoutComputed<boolean>;
    public getMizumashi: KnockoutComputed<number>;
    
    // コンストラクタ
    constructor() {
        // 初期値は作成時の引数から作成。
        this.numberOfClicks = ko.observable(3);
        // イベント追加。
        this.hasClickedTooManyTimes = ko.computed({
            owner: this,
            read: () => {
                return this.numberOfClicks() >= 5;
            }
        });
        this.getMizumashi = ko.computed({
            owner: this,
            read: () => {
                return this.numberOfClicks() * 100;
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
 
// KnockoutJS側に登録。
ko.applyBindings(new ClickCounterViewModel());