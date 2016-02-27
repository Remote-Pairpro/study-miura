/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

var initDatas : { firstName?:string; lastName?:string; phones?:{type?:string;number?:string}[];}[] = [
    { firstName: "ダニー", lastName: "ラルッソ", phones: [
            { type: "携帯", number: "(555) 121-2121" },
            { type: "電話", number: "(555) 123-4567"}]
    },
    { firstName: "先生", lastName: "宮城", phones: [
            { type: "携帯", number: "(555) 444-2222" },
            { type: "電話", number: "(555) 999-1212"}]
    }
];
 
class ContactsModel {

    // プロパティっぽいもの
    public contacts: KnockoutObservableArray<{firstName?:string; lastName?:string; phones?:KnockoutObservableArray<{type?:string;number?:string}>;}>;
    public lastSavedJson: KnockoutObservable<string>;

    // コンストラクタ
    public constructor(initContacts:{firstName?:string; lastName?:string; phones?:{type?:string;number?:string}[];}[]) {
        this.contacts = ko.observableArray(ko.utils.arrayMap(
            initContacts, 
            function(c : {firstName?:string; lastName?:string; phones?:{type?:string;number?:string}[];}) {
                return { 
                    firstName: c.firstName,
                    lastName: c.lastName,
                    phones: ko.observableArray(c.phones) 
                };
            }
        ));
        this.lastSavedJson = ko.observable("")
    }
    
    // メソッド(イベント？)群
 
    public addContact() {
        this.contacts.push({
            firstName: "",
            lastName: "",
            phones: ko.observableArray()
        });
    }
 
    public removeContact(contact:any) {
        this.contacts.remove(contact);
    }
 
    public addPhone(contact:any) {
        contact.phones.push({
            type: "",
            number: ""
        });
    }
 
    public removePhone(phone:any) {
        $.each(this.contacts(), function() { this.phones.remove(phone) })
    }
 
    public save() {
        this.lastSavedJson(JSON.stringify(ko.toJS(this.contacts), null, 2));
    }
 
}
 
ko.applyBindings(new ContactsModel(initDatas));