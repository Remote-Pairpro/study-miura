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
    public planetsToShow: KnockoutComputed<any>;
    
    public showPlanetElement:any;
    public hidePlanetElement:any;
 
    // コンストラクタ
    public constructor() {
        
        this.planets = ko.observableArray(this.INIT_PLANETS);
        this.typeToShow = ko.observable("all");
        this.displayAdvancedOptions = ko.observable(false);
    
        this.planetsToShow = ko.computed({
            owner: this,
            read: () => {
                // 惑星のリストを 条件 "typeToShow" でフィルタリングします。
                var desiredType = this.typeToShow();
                if (desiredType == "all") return this.planets();
                return ko.utils.arrayFilter(this.planets(), function(planet) {
                    return planet.type == desiredType;
                });
            }
        });

        // 惑星リスト用のアニメーション callback
        this.showPlanetElement = (elem: any) => { if (elem.nodeType === 1) $(elem).hide().slideDown() }
        this.hidePlanetElement = (elem: any) => { if (elem.nodeType === 1) $(elem).slideUp(() =>{ $(elem).remove(); }) }

    }

    public addPlanet(type: string) {
        this.planets.push({
            name: "新惑星",
            type: type
        });
    }
}
 
// jQuery の fadeIn() / fadeout() メソッドを使ってエレメントの 可視/不可視 を切り替えるカスタムばインディング
// 別のJSファイルに分割して読み込むこともできます。
ko.bindingHandlers.fadeVisible = {
    init: (element:any, valueAccessor:any) => {
        // 最初に、値に応じて即座にエレメントの 可視/不可視 を設定します。
        var value = valueAccessor();
        // Observable かどうかがわからない値は、"unwrapObservable" を使って処理することができます。
        $(element).toggle(ko.utils.unwrapObservable(value));
    },
    update: (element:any, valueAccessor:any) => {
        // 値の変化に応じて、ゆっくりと 可視/不可視 の切り替えを行います。
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

ko.applyBindings(new PlanetsModel());