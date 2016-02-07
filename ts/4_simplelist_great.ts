/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />
 
class BetterListModel {

    public itemToAdd : KnockoutObservable<string>;
    public allItems : KnockoutObservableArray<string>;
    public selectedItems : KnockoutObservableArray<string>;
    
    constructor() {
        this.itemToAdd =     ko.observable("");
        this.allItems =      ko.observableArray(["リコッタチーズ", "エシャロット", "ロマネスコ", "オリーブオイル", "イタリアンパセリ", "パルミジャーノチーズ"]);
        this.selectedItems = ko.observableArray(["オリーブオイル"]);
    }

    // アイテムを追加します。
    public addItem() {
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) {
            this.allItems.push(this.itemToAdd());
        }
        this.itemToAdd("");
    }
 
    public removeSelected() {
        this.allItems.removeAll(this.selectedItems());
    }
 
    public sortItems() {
        this.allItems.sort();
    }

}
 
ko.applyBindings(new BetterListModel());