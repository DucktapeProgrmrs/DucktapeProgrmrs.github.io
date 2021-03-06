"use strict";
angular.module("yapp", ["ui.router", "ngAnimate"]).config(["$stateProvider", "$urlRouterProvider", function (o, e) {
    e.when("/dashboard", "/dashboard/overview"), e.otherwise("/login"), o.state("base", {
            "abstract": !0,
            url: "",
            templateUrl: "views/base.html"
        }).state("login", {
            url: "/login",
            parent: "base",
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        }).state("dashboard", {
            url: "/dashboard",
            parent: "base",
            templateUrl: "views/dashboard.html",
            controller: "DashboardCtrl"
        }).state("overview", {
            url: "/overview",
            parent: "dashboard",
            templateUrl: "views/dashboard/overview.html"
        }).state("reports", {
            url: "/reports",
            parent: "dashboard",
            templateUrl: "views/dashboard/reports.html"
        }).state("ToDo-List", {
            url: "/ToDo-List",
            parent: "dashboard",
            templateUrl: "views/dashboard/ToDo-List.html",
            controller: "ToDoCtrl"
        })
        .state("Redo", {
            url: "/redo",
            parent: "dashboard",
            templateUrl: "views/dashboard/redo.html",
            controller: "RedDoCtrl"
        })
        .state("Uploader", {
            url: "/uploader",
            parent: "dashboard",
            templateUrl: "views/dashboard/uploader.html",
            controller: "UplDoCtrl"
        })
        .state("Notenrechner", {
            url: "/notenrechner",
            parent: "dashboard",
            templateUrl: "views/dashboard/NotenRechner.html",
            controller: "NotenRechnerCtrl"
        })
}]), angular.module("yapp").controller("LoginCtrl", ["$scope", "$location", function (o, e) {
    o.submit = function () {
        return e.path("/dashboard"), !1
    }
    }]), angular.module("yapp").controller("DashboardCtrl", ["$scope", "$state", function (o, e) {
    o.$state = e
    }]), angular.module("yapp").controller("ToDoCtrl", ["$scope", "$state", function (o, e) {
    o.todos = [], o.$state = e, o.newTodo = "", o.showTasks = !0, o.showMode = "all", o.todos = [{
        name: "Viel machen",
        complete: !1,
        id: 1
        }, {
        name: "Noch viel Mehr machen",
        complete: !1,
        id: 2
        }], o.taskCount = o.todos.length, o.hideTodo = function () {
        o.showTasks = !1
    }, o.showTodo = function () {
        o.showTasks = !0, o.showMode = "all"
    }, o.doneTodo = function (e) {
        console.log(huhu), o.todos[e].complete = !0
    }, o.addTodo = function () {
        var e = o.newTodo.trim();
        0 !== e.length && (o.taskCount++, o.todos.push({
            name: e,
            complete: !1,
            id: o.taskCount
        }), o.newTodo = "", o.taskCount = o.todos.length)
    }, o.removeTodo = function (e) {
        o.todos.splice(o.todos.indexOf(e), 1), o.taskCount = o.todos.length
    }, o.showDone = function () {
        o.showTasks = !0, o.showMode = "comp"
    }, o.showOnlyTodo = function () {
        o.showTasks = !0, o.showMode = "open"
    }, o.showModus = function (e) {
        switch (o.showMode) {
        case "comp":
            return e.complete ? !0 : !1;
        case "open":
            return e.complete ? !1 : !0;
        case "all":
            return !0
        }
    }, o.deleteDone = function () {
        for (var e = 0; e < o.todos.length; e++) o.todos[e].complete && o.removeTodo(o.todos[e])
    }, o.doneTodo = function (e) {
        var t = e - 1;
        console.log(t), o.todos[t].complete = !0
    }
    }]), angular.module("yapp").controller("NotenRechnerCtrl", ["$scope", "$state", function (e, o) {
    e.$state = o, e.ModulName = "", e.ModulCp = "", e.ModulNote = "", e.alleModule = [], e.gesamtNote = "", e.DeleteButton = !1, e.addModul = function () {
        if (isNaN(e.ModulCp) || isNaN(e.ModulNote)) alert("Please do not enter Letters in the Cp or Grade Field."), e.ModulCp = "", e.ModulNote = "";
        else if (e.ModulCp && e.ModulNote && e.ModulName) {
            var o = new Object;
            o.name = e.ModulName, o.cp = e.ModulCp, o.note = e.ModulNote;
            var t = parseFloat(e.ModulCp),
                l = parseFloat(e.ModulNote);
            o.schnitt = t * l, e.alleModule.push(o), e.ModulName = "", e.ModulCp = "", e.ModulNote = "", e.gesamtNoteBerechnen()
        } else alert("Please fill out all Fields.")
    }, e.gesamtNoteBerechnen = function () {
        e.gesamtNote = 0;
        for (var o = 0, t = 0, l = 0; l < e.alleModule.length; l++) o = parseFloat(o) + parseFloat(e.alleModule[l].cp);
        for (var l = 0; l < e.alleModule.length; l++) {
            var a = parseFloat(t),
                n = parseFloat(e.alleModule[l].schnitt);
            t = a + n
        }
        e.gesamtNote = t / o, e.gesamtNote = e.gesamtNote.toFixed(2)
    }, e.deleteModul = function (o) {
        e.alleModule.splice(e.alleModule.indexOf(o), 1), e.gesamtNoteBerechnen()
    }
}]), angular.module("yapp").directive("ngEnter", function () {
    return function (o, e, t) {
        e.bind("keydown keypress", function (e) {
            13 === e.which && (o.$apply(function () {
                o.$eval(t.ngEnter)
            }), e.preventDefault())
        })
    }
});