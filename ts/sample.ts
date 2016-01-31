class Person {
    public Name:string;
    constructor(name:string) {
        this.Name = name;
    }
}

var me = new Person("miura");
document.body.innerHTML = me.Name;
