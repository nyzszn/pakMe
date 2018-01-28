$( function(){
    var app = new App();
    app.init();
});

var App = function(){
    this.init = function(){
        console.log("Under the hood");
    }
}