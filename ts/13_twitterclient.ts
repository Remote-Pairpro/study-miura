
/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

// ViewModel は作業中のすべての状態を保持します。また、それらを編集できるようにする方法も持っており、
// さらに必要な状態を背後のデータから計算するために Computed Observable を使用しています。
// --
// View (= HTML UI) はこれらの状態を data-bind 属性を使ってバインドします。
// そのため常に ViewModel の最新の状態に保たれます。
// また、ViewModel は View にどのようにバインドされるかを意識せずに記述することができます。
//
var savedLists:{name?:string; userNames?:string[]}[] = [
    { name: "Celebrities", userNames: ['JohnCleese', 'MCHammer', 'StephenFry', 'algore', 'StevenSanderson']},
    { name: "Microsoft people", userNames: ['BillGates', 'shanselman', 'ScottGu']},
    { name: "Tech pundits", userNames: ['Scobleizer', 'LeoLaporte', 'techcrunch', 'BoingBoing', 'timoreilly', 'codinghorror']}
];
 
class TwitterListModel {

    // 広域変数
    public editingList:{name?:KnockoutObservable<string>;userNames?:KnockoutObservableArray<string>};

    // Knockoutバインド系
    public savedLists:KnockoutObservableArray<{name?:string; userNames?:string[]}>;
    public userNameToAdd:KnockoutObservable<string>;
    public currentTweets:KnockoutObservableArray<any>;
    public userNameToAddIsValid:KnockoutComputed<boolean>;
    public hasUnsavedChanges:KnockoutComputed<boolean>;
    public canAddUserName:KnockoutComputed<boolean>;

    // コンストラクタ
    public constructor(
        lists:{name?:string; userNames?:string[]}[]
        , selectedList:string
    ) {
        this.savedLists = ko.observableArray(lists);
        this.editingList = {
            name: ko.observable(selectedList),
            userNames: ko.observableArray([])
        };
        this.userNameToAdd = ko.observable("");
        this.currentTweets = ko.observableArray([])
        
        // computed定義系。
        
        this.userNameToAddIsValid = ko.computed(():boolean => {
            return (this.userNameToAdd() == "") || (this.userNameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
        }, this);

        ko.computed(() => {
            // viewmodel.editingList.name() を監視する。
            // 変更があれば、savedList (=データ元) から一致するリスト名のユーザ名リストを取得し、
            // editingList.userNames にコピーする。
            let savedList = this.findSavedList(this.editingList.name());
            if (savedList) {
                let userNamesCopy = savedList.userNames.slice(0);
                this.editingList.userNames(userNamesCopy);
            } else {
                this.editingList.userNames([]);
            }
        }, this);
        
        this.hasUnsavedChanges = ko.computed(():boolean => {
            if (!this.editingList.name()) {
                return this.editingList.userNames().length > 0;
            }
            let savedData:string[] = this.findSavedList(this.editingList.name()).userNames;
            let editingData:string[] = this.editingList.userNames();
            return savedData.join("|") != editingData.join("|");
        }, this);
        
            
        this.userNameToAddIsValid = ko.computed(():boolean => {
            return (this.userNameToAdd() == "") || (this.userNameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
        }, this);
    
        this.canAddUserName = ko.computed(():boolean => {
            return this.userNameToAddIsValid() && this.userNameToAdd() != "";
        }, this);
    
        // リスト内のユーザのツイートは、(非同期に) editingList.userNames から computed で自動取得する
        ko.computed(() => {
            twitterApi.getTweetsForUsers(this.editingList.userNames(), this.currentTweets);
        }, this);

    }
 
    // メソッド群
 
    public findSavedList(name:string) {
        let lists:{name?:string; userNames?:string[]}[] = this.savedLists();
        return ko.utils.arrayFirst(lists, (list:{name?:string; userNames?:string[]}) => {
            return list.name == name;
        });
    }
 
    public addUser() {
        if (this.userNameToAdd() && this.userNameToAddIsValid()) {
            this.editingList.userNames.push(this.userNameToAdd());
            this.userNameToAdd("");
        }
    }
 
    public removeUser = (userName:string) => {
        this.editingList.userNames.remove(userName)
    }
 
    public saveChanges() {
        let saveAs:string = prompt("次の名前で保存: ", this.editingList.name());
        if (saveAs) {
            
            let dataToSave:string[] = this.editingList.userNames().slice(0);
            let existingSavedList:{name?:string; userNames?:string[]} = this.findSavedList(saveAs);
            
            if (existingSavedList) {
                existingSavedList.userNames = dataToSave; // 既存のリストは上書きする。
            } else {
                this.savedLists.push({
                    name: saveAs,
                    userNames: dataToSave
                }); // 新しいリストを追加
            }
            this.editingList.name(saveAs);
        }
    }
 
    public deleteList() {
        let nameToDelete:string = this.editingList.name();
        let savedListsExceptOneToDelete:{name?:string; userNames?:string[]}[] = $.grep(this.savedLists(), (list:{name?:string; userNames?:string[]}):boolean => {
            return list.name != nameToDelete
        });
        this.editingList.name(savedListsExceptOneToDelete.length == 0 ? null : savedListsExceptOneToDelete[0].name);
        this.savedLists(savedListsExceptOneToDelete);
    }
}
 
ko.applyBindings(new TwitterListModel(savedLists, "Tech pundits"));
 
// 「読込中」の表示は jQuery でおこなう。- Knockout では何もしない。
$(".loadingIndicator").ajaxStart(function() {
    $(this).fadeIn();
}).ajaxComplete(function() {
    $(this).fadeOut();
});