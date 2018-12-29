$(function(){
    game.init();
});


var game;
game = {
    params: {
        eleMap: [
            1, 1, 3, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2, 2, 2, 2, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 4, 1, 1, 1, 1,
        ],
        block: 50,
        width: 10,
        height: 10,

    },
    init: function () {
        this.getMap();
    },
    getMap: function () {
        var that = this;
        var ele = this.params.eleMap.map((ele) => `<div class="div${ele}"></div>`);
        $("#game").css({"width": "500px", "height": "500px"});
        $("#game").html(ele);
    }

};