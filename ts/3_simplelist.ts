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
            // 追加先の items は observableArray なので、対応する UI が更新されます。
            this.items.push(this.itemToAdd());
            // itemToAdd は Observable であり、テキストボックスにバインドされているため、
            // 次のようにすることでテキストボックスをクリアできます。
            this.itemToAdd("");
        }
    }

}

ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));