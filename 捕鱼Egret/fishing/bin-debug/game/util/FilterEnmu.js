var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var FilterEnmu = (function () {
            function FilterEnmu() {
            }
            return FilterEnmu;
        }());
        FilterEnmu.GRAY = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.LESS_LIGTH = [
            1, 0, 0, 0, 0,
            0, 1, 0.25, 0, 0,
            0, 50, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.LIGHT = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 100,
            0, 0, 1, 0, 100,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.DARK = [
            1, 0, 0, 0, -40,
            0, 1, 0, 0, -40,
            0, 0, 1, 0, -40,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.RED = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.FISH_TYPE_1 = [
            1, 0, 0, 0, 0,
            0, 0.45, 0.0, 0, 0,
            0, 0, 0.45, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.FISH_TYPE_2 = [
            1.3, 0, 0, 0, 160,
            0, 0.45, 0, 0, 0,
            0, 0, 0.45, 0, 0,
            0, 0, 0, 1, 0
        ];
        FilterEnmu.FISH_TYPE_MATRIX_1 = 1;
        FilterEnmu.FISH_TYPE_MATRIX_2 = 2;
        util.FilterEnmu = FilterEnmu;
        __reflect(FilterEnmu.prototype, "game.util.FilterEnmu");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=FilterEnmu.js.map