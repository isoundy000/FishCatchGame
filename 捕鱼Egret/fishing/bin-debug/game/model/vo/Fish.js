var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        var Fish = (function () {
            function Fish() {
                //唯一标识符
                this.uniqId = null;
                //鱼类id
                this.fishId = 0;
                //鱼类型
                this.fishType = 1;
                //路径id
                this.pathId = 0;
                //初始坐标
                this.coord = null;
                //剩余存活时间
                this.aliveTime = 0;
            }
            return Fish;
        }());
        model.Fish = Fish;
        __reflect(Fish.prototype, "game.model.Fish");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=Fish.js.map