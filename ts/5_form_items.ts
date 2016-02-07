/// <reference path="./tsd/typings/tsd.d.ts" />
/// <reference path="./tsd/typings/knockout/knockout.d.ts" />

var viewParameterModel = {
    stringValue : ko.observable("こんにちわ"),
    passwordValue : ko.observable("hogehoge"),
    booleanValue : ko.observable(true),
    optionValues : ["Alpha", "Beta", "Gamma"],
    selectedOptionValue : ko.observable("Gamma"),
    multipleSelectedOptionValues : ko.observable(["Alpha"]),
    radioSelectedOptionValue : ko.observable("Beta")
};

ko.applyBindings(viewParameterModel);