/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

// 自分の名前と子を保持し、新たな子を追加するメソッドをもつ SomePerson クラス
class SomePerson {

    // プロパティっぽいもの
    public name: string;
    public children: KnockoutObservableArray<string>;

	// コンストラクタ	
	constructor(name: string , children: string[]) {
        this.name = name;
        this.children = ko.observableArray(children);
    }

	// 子アイテムを足す。
	public addChild() {
        this.children.push("新しいお子様");
	} 

}

 
// 汎化した UI の状態を保持するが、UI の実装に依存しない ViewModel
var viewModel = {
    people: [
        new SomePerson("Annabelle", ["Arnie", "Anders", "Apple"]),
        new SomePerson("Bertie", ["Boutros-Boutros", "Brianna", "Barbie", "Bee-bop"]),
        new SomePerson("Charles", ["Cayenne", "Cleopatra"])
    ],
    showRenderTimes: ko.observable(false)
};
 
ko.applyBindings(viewModel);
