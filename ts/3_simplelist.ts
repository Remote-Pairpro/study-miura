/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

class SimpleListModel {

    public items : KnockoutObservableArray<string>;
    public itemToAdd : KnockoutObservable<string>;
    
    constructor(initItems: string[]) {
        this.items = ko.observableArray(initItems);
        this.itemToAdd = ko.observable("");
    }

    // アイテムを追加します。
    public addItem() {
        if (this.itemToAdd() != "") {
            // 入力内容をObservableArrayに足し、テキストはクリア。
            this.items.push(this.itemToAdd());
            this.itemToAdd("");
        }
    }

}

ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));