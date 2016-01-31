/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

// ViewModel を定義します
class MyViewModel {
    
    // プロパティっぽいもの
    public firstName: KnockoutObservable<string>;
    public lastName: KnockoutObservable<string>;
    public fullName: KnockoutComputed<string>;
    
    // コンストラクタ
    constructor(firstName: string, lastName: string) {
        // 初期値は作成時の引数から作成。
        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        // イベント追加。
        this.fullName = ko.computed({
            owner: this,
            read: function() {
                // Knockout は依存を自動的にトラッキングします。
                // fullName の評価中に firstName と lastName を呼び出すため、
                // それぞれに依存していることが検知されます。
                return this.firstName() + " " + this.lastName();
            }
        });
    }
    
}

// KnockoutJS側に登録。
// TODO ここだけは…もうちょっとTSっぽく書ける方法探したいなー。
ko.applyBindings(new MyViewModel("太郎", "みうみう")); 
