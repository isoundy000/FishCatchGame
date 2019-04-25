var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var Director = (function () {
        function Director() {
            throw (new burn.error.SimpleError("The burn.Director can't call constructor!"));
        }
        /**
         * 初始化函数
         */
        Director.initFramework = function (stage) {
            this._stage = stage;
            this._uiMedList = new Array();
            this._modelList = new burn.util.Map();
        };
        /**
         * 切换UI，销毁当前UI
         */
        Director.repleaceView = function (viewMed) {
            var len = this._uiMedList.length;
            for (var i = 0; i < len; i++) {
                var test = this._uiMedList[i];
                this._uiMedList[i].unsubscrib();
                this._uiMedList[i].destroy();
            }
            this._uiMedList = [];
            this._viewMed = viewMed;
            this._stage.addChild(viewMed.getView());
            this._uiMedList.push(viewMed);
            viewMed.onAdded();
            viewMed.init();
        };
        Director.repleaceViewWithTransform = function (viewMed) {
        };
        /**
         * 打开新UI，保存上一个UI。
         */
        Director.pushView = function (viewMed) {
            //增加一个是否打开过这个view的判断
            if (this._uiMedList.length > 0) {
                var temp = this._uiMedList[this._uiMedList.length - 1];
                if (viewMed.getName() != "" && viewMed.getName() == temp.getName()) {
                    //重复弹出了相同界面
                    return;
                }
            }
            this._viewMed = viewMed;
            this._stage.addChild(viewMed.getView());
            this._uiMedList.push(viewMed);
            viewMed.onAdded();
            viewMed.init();
        };
        /**
         * 弹出最上层view并销毁
         */
        Director.popView = function () {
            var med = this._uiMedList.pop();
            med.unsubscrib();
            med.destroy();
            this._viewMed = this._uiMedList[this._uiMedList.length - 1];
            this._viewMed.update();
        };
        Director.getStage = function () {
            return this._stage;
        };
        /**
         * 注册model对象
         */
        Director.registerModel = function (cls, model) {
            model.init();
            var isExist = this._modelList.contains(cls);
            if (isExist) {
                console.warn("Model:" + cls + " have already exists!");
            }
            else {
                this._modelList.put(cls, model);
            }
        };
        /**
         * 获取model对象
         */
        Director.getModelByKey = function (cls) {
            return this._modelList.get(cls);
        };
        /**
         * 清除所有model数据
         */
        Director.clearAllModel = function () {
            var list = this._modelList.getList();
            for (var i = 0; i < list.length; i++) {
                list[i].value.clear();
            }
        };
        return Director;
    }());
    //缓存的stage对象
    Director._stage = null;
    //UI中介者列表
    Director._uiMedList = null;
    //当前场景ui中介者
    Director._viewMed = null;
    //model集合
    Director._modelList = null;
    burn.Director = Director;
    __reflect(Director.prototype, "burn.Director");
})(burn || (burn = {}));
//# sourceMappingURL=Director.js.map