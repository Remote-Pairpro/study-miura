/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

class  PlanetsModel {
    
    private INIT_PLANETS: {name?: string; type?: string;}[] = [
        { name: "水星", type: "rock"},
        { name: "金星", type: "rock"},
        { name: "地球", type: "rock"},
        { name: "火星", type: "rock"},
        { name: "木製", type: "gasgiant"},
        { name: "土星", type: "gasgiant"},
        { name: "天王星", type: "gasgiant"},
        { name: "海王星", type: "gasgiant"},
        { name: "冥王星", type: "rock"}
    ];

    // プロパティ
    public planets : KnockoutObservableArray<{name?: string; type?: string;}>;
    public typeToShow : KnockoutObservable<string>;
    public displayAdvancedOptions : KnockoutObservable<boolean>;
    public planetsToShow: KnockoutComputed<{name?: string; type?: string;}[]>;
    
    // コンストラクタ
    public constructor() {
        
        this.planets = ko.observableArray(this.INIT_PLANETS);
        this.typeToShow = ko.observable("all");
        this.displayAdvancedOptions = ko.observable(false);
    
        this.planetsToShow = ko.computed({
            owner: this,
            read: () => {
                // 惑星のリストを 条件 "typeToShow" でフィルタリングします。
                let desiredType:string = this.typeToShow();
                if (desiredType == "all") return this.planets();
                return ko.utils.arrayFilter(this.planets(), (planet) => {
                    return planet.type == desiredType;
                });
            }
        });

    }

    public addPlanet(type: string) {
        let planetName : string = prompt("惑星名を入力して下さい。","");
        this.planets.push({
            name: planetName,
            type: type
        });
    }

    // 惑星リスト用のアニメーション callback
    public showPlanetElement(elem: any) { if (elem.nodeType === 1) $(elem).hide().slideDown() }
    public hidePlanetElement(elem: any) { if (elem.nodeType === 1) $(elem).slideUp(() =>{ $(elem).remove(); }) }

}
 
// jQuery の fadeIn() / fadeout() メソッドを使ってエレメントの 可視/不可視 を切り替えるカスタムばインディング
// 別のJSファイルに分割して読み込むこともできます。
ko.bindingHandlers.fadeVisible = {
    init: (element:any, valueAccessor:any) => {
        // 最初に、値に応じて即座にエレメントの 可視/不可視 を設定します。
        let value = valueAccessor();
        // Observable かどうかがわからない値は、"unwrapObservable" を使って処理することができます。
        $(element).toggle(ko.utils.unwrapObservable(value));
    },
    update: (element:any, valueAccessor:any) => {
        // 値の変化に応じて、ゆっくりと 可視/不可視 の切り替えを行います。
        let value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

ko.applyBindings(new PlanetsModel());