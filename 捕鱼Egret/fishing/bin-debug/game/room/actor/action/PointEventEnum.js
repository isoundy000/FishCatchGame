var room;
(function (room) {
    /**
     * 路线点事件枚举
     */
    var PointEventEnum;
    (function (PointEventEnum) {
        PointEventEnum[PointEventEnum["FLIP_X"] = 1] = "FLIP_X";
        PointEventEnum[PointEventEnum["FLIP_Y"] = 2] = "FLIP_Y"; //纵向翻转
    })(PointEventEnum = room.PointEventEnum || (room.PointEventEnum = {}));
})(room || (room = {}));
//# sourceMappingURL=PointEventEnum.js.map