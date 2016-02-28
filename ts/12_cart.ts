/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />
/// <reference path="./tsd/typings/jquery.validation/jquery.validation.d.ts" />

// 広域ユティリティ的関数
function formatCurrency(value:number) {
    return "$" + value.toFixed(2);
}
 
class CartLine {

    // プロパティっぽいやつ
    public category:KnockoutObservable<string>;
    public product:KnockoutObservable<any>;
    public quantity:KnockoutObservable<number>;
    public subtotal:KnockoutComputed<number>;

    // コンストラクタ
    public constructor() {
        // Knockout系バインド。        
        this.category = ko.observable("");
        this.product = ko.observable(undefined);
        this.quantity = ko.observable(1);
        this.subtotal = ko.computed(() => {
            return this.product() ? this.product().price * parseInt("0" + this.quantity(), 10) : 0;
        });
        // カテゴリが変更された時に、製品の選択状態をリセットする
        this.category.subscribe(() => {
            this.product(undefined);
        });
   }
    
}
 
class Cart {

    // プロパティっぽいやつ
    public lines : KnockoutObservableArray<CartLine>; // デフォルトで1行格納する
    public grandTotal : KnockoutComputed<number>;

    // コンストラクタ
    public constructor() {
        // 買い物カゴ各行の情報を保持し、それらから合計金額を算出する
        this.lines = ko.observableArray([new CartLine()]); // デフォルトで1行格納する
        this.grandTotal = ko.computed({
            owner: this,
            read: ():number => {
                let total:number = 0;
                this.lines().forEach((v:CartLine,i:number) => { total += v.subtotal() });
                return total;
            }
        });
    }
 
    // アクション
    
    public addLine() { 
        this.lines.push(new CartLine()) 
    }
    
    public removeLine(line:CartLine) { 
        this.lines.remove(line) 
    }
    
    public save() {
        let dataToSave = $.map(this.lines(), (line:CartLine) => {
            return line.product() ? {
                productName: line.product().name,
                quantity: line.quantity()
            } : undefined
        });
        alert("次のようにサーバに送信できます: " + JSON.stringify(dataToSave));
    }

}
 
ko.applyBindings(new Cart());