/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

var initialData: {name?: string; sales?: number; price?: number;}[] =  [
    { name: "子猫の旅路", sales: 352, price: 75.95 },
    { name: "すばやいコヨーテ", sales: 89, price: 190.00 },
    { name: "トカゲ激昂", sales: 152, price: 25.00 },
    { name: "無関心モンキー", sales: 1, price: 99.95 },
    { name: "ドラゴンの憂鬱", sales: 0, price: 6350 },
    { name: "ヤバいオタマジャクシ", sales: 39450, price: 0.35 },
    { name: "楽観的なカタツムリ", sales: 420, price: 1.50 }
];
  
class PagedGridModel {
    
    // プロパティっぽいもの
    public items: KnockoutObservableArray<{name?: string ,sales?: number ,price?: number}>;
    public gridViewModel: any;
    
    // コンストラクタ
    constructor(initItems : {name?: string ,sales?: number ,price?: number}[]) {
        this.items = ko.observableArray(initItems);
        this.gridViewModel = new ko.simpleGrid.viewModel({
            data: this.items,
            columns: [
                { headerText: "タイトル", rowText: "name" },
                { headerText: "販売実績(冊)", rowText: "sales" },
                { headerText: "価格", rowText: function (item) { return "$" + item.price.toFixed(2) } }
            ],
            pageSize: 4
        });
    }
  
    public addItem() {
        this.items.push({ name: "新書", sales: 0, price: 100 });
    }
  
    public sortByName() {
        this.items.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
        });
    }
  
    public jumpToFirstPage() {
        this.gridViewModel.currentPageIndex(0);
    }
  
}

ko.applyBindings(new PagedGridModel(initialData));