function MyViewModel() {
    
    this.firstName = ko.observable('Planet');
    this.lastName = ko.observable('Earth');

    this.fullName = ko.pureComputed({
        read: function () {
            return this.firstName() + " " + this.lastName();
        },
        write: function (value) {
            var lastSpacePos = value.lastIndexOf(" ");
            if (lastSpacePos > 0) { // Ignore values with no space character
                this.firstName(value.substring(0, lastSpacePos)); // Update "firstName"
                this.lastName(value.substring(lastSpacePos + 1)); // Update "lastName"
            }
        },
        owner: this
    });
}

ko.applyBindings(new MyViewModel());