/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />
/// <reference path="./tsd/typings/jquery.validation/jquery.validation.d.ts" />

class GiftModel {

    // プロパティっぽいやつ
    public gifts:KnockoutObservableArray<{name?:string; price?:string;}>;

    // コンストラクタ
    public constructor(initGifts:{name?:string; price?:string;}[]) {
        this.gifts = ko.observableArray(initGifts);
    }
 
    // メソッド群
 
    // 一行追加
    public addGift() {
        this.gifts.push({
            name: "",
            price: ""
        });
    }
 
    // 一行削除
    public removeGift = (gift:{name?:string; price?:string;}) => {
        this.gifts.remove(gift);
    }
 
    // 登録(今はアラート出るだけ)
    public save = (form:any) => {
        alert("次のようにサーバに送信できます: " + ko.utils.stringifyJson(this.gifts));
        // ここで通常のフォーム送信同様に送信する場合、次のように書いてください:
        // ko.utils.postJson($("form")[0], self.gifts);
    }
}
 
var targetModel = new GiftModel([
    { name: "高帽子", price: "39.95"},
    { name: "長いクローク", price: "120.00"}
])

// KOにモデルを登録。
ko.applyBindings(targetModel, document.getElementById('demo_1'));
 
// jQuery Validation を起動
$("form").validate({ submitHandler: targetModel.save });