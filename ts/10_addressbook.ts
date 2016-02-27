/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

var initDatas : { firstName?:string; lastName?:string; phones?:{type?:string;pno?:string}[];}[] = [
    { firstName: "ダニー", lastName: "ラルッソ", phones: [
            { type: "携帯", pno: "(555) 121-2121" },
            { type: "電話", pno: "(555) 123-4567"}]
    },
    { firstName: "先生", lastName: "宮城", phones: [
            { type: "携帯", pno: "(555) 444-2222" },
            { type: "電話", pno: "(555) 999-1212"}]
    }
];
 
class ContactsModel {

    // プロパティっぽいもの
    public contacts: KnockoutObservableArray<{firstName?:string; lastName?:string; phones?:KnockoutObservableArray<{type?:string;pno?:string}>;}>;
    public lastSavedJson: KnockoutObservable<string>;
    
    // コンストラクタ
    public constructor(initContacts:{firstName?:string; lastName?:string; phones?:{type?:string;pno?:string}[];}[]) {
        this.contacts = ko.observableArray(ko.utils.arrayMap(
            initContacts, 
            (c : {firstName?:string; lastName?:string; phones?:{type?:string;pno?:string}[];}) => {
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
 
    public addPhone(contact: {firstName?:string; lastName?:string; phones?:KnockoutObservableArray<{type?:string;pno?:string}>;}) {
        contact.phones.push({
            type: "",
            pno: ""
        });
    }

    public removeContact = (contact:{firstName?:string; lastName?:string; phones?:KnockoutObservableArray<{type?:string;pno?:string}>;}) => {
        this.contacts.remove(contact);
    } 
 
    public removePhone = (phone:KnockoutObservableArray<{type?:string;pno?:string}>) => {
        this.contacts().forEach( (content) => { content.phones.remove(phone) } )
    }
 
    public save() {
        this.lastSavedJson(JSON.stringify(ko.toJS(this.contacts), null, 2));
    }
 
}
 
ko.applyBindings(new ContactsModel(initDatas));