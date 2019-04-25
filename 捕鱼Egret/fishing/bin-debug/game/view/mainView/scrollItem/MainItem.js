var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    var MainItemUI = (function (_super) {
        __extends(MainItemUI, _super);
        function MainItemUI() {
            return _super.call(this) || this;
        }
        return MainItemUI;
    }(eui.Component));
    main.MainItemUI = MainItemUI;
    __reflect(MainItemUI.prototype, "main.MainItemUI");
    //this._uiDisplay.play.removeEventListener('complete', this.onTweenGroupComplete, this);
    var MainItem = (function (_super) {
        __extends(MainItem, _super);
        function MainItem(iid, isSelected, callback) {
            if (isSelected === void 0) { isSelected = false; }
            var _this = _super.call(this) || this;
            _this._isSelected = isSelected;
            _this.id = iid;
            _this._callback = callback;
            if (CONFIG.IS_WEB) {
                _this.init(undefined, undefined);
            }
            else {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + _this.id + ".exml", _this.init, _this);
            }
            return _this;
        }
        MainItem.prototype.init = function (cls, url) {
            var self = this;
            var posX = 20;
            if (CONFIG.IS_WEB) {
                // 1 新手 2低倍 3高倍 4手动 5大奖
                self.container = new eui.Group();
                self.addChild(self.container);
                self.container.width = 106;
                self.container.height = 0;
                if (self.id == 1) {
                    self.container.x = 340 / 2 - 20;
                    self.container.y = 500 / 2 + 280;
                }
                else if (self.id == 2) {
                    self.container.x = 160;
                    self.container.y = 500 / 2 + 265;
                }
                else if (self.id == 3) {
                    self.container.x = 340 / 2 - 10;
                    self.container.y = 500 / 2 + 315;
                }
                else if (self.id == 4) {
                    self.container.x = 340 / 2 - 20;
                    self.container.y = 500 / 2 + 325;
                }
                else {
                    self.container.x = 340 / 2 - 20;
                    self.container.y = 500 / 2 + 280;
                }
                self._item = new game.util.DragonBonesUtil(self.id, game.util.DragonBonesUtil.itemMovie);
                self.container.addChild(self._item);
                self.touchEnabled = true;
                self.touchChildren = false;
                self._item.createMovie(function () {
                    self._item.setMovieXY(0, 0);
                    self._item.gotoAndStopMovie();
                    if (self._isSelected) {
                        self._item.playMovie(0);
                    }
                });
            }
            else {
                self._item = new MainItemUI();
                self._item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + self.id + ".exml";
                self.addChild(self._item);
                self._item.anchorOffsetX = self._item.width >> 1;
                self._item.anchorOffsetY = self._item.height >> 1;
                self._item.play.addEventListener('complete', self.onTweenGroupComplete, self);
                self._item.x = 170;
                self._item.y = 260;
                self._item.play.play(0);
            }
            self.isLocked = false;
            var configVo = game.table.T_Config_Table.getVoByKey(36).value;
            var datas = configVo.split("_");
            var contaier = new egret.DisplayObjectContainer();
            var userModel = burn.Director.getModelByKey(UserModel);
            var curGunId = userModel.getCurGunID();
            if (self.id == 2) {
                var chu = Number(datas[0]); // 2
                if (curGunId < chu) {
                    var bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
                    var bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
                    var numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_1_png"));
                    numImg.anchorOffsetX = numImg.width;
                    numImg.x = 0;
                    numImg.y = 5;
                    bg1.x = -60;
                    bg1.y = -2;
                    contaier.addChild(bg1);
                    contaier.addChild(bg);
                    contaier.addChild(numImg);
                    var lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
                    lock.anchorOffsetX = lock.width;
                    lock.anchorOffsetY = lock.height;
                    lock.x = 40;
                    lock.y = -30;
                    contaier.addChild(lock);
                    self.isLocked = true;
                }
            }
            else if (self.id == 3) {
                var gao = Number(datas[1]); // 3
                if (curGunId < gao) {
                    var bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
                    var bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
                    var numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_2_png"));
                    numImg.anchorOffsetX = numImg.width;
                    numImg.x = 0;
                    numImg.y = 5;
                    bg1.x = -60;
                    bg1.y = -2;
                    contaier.addChild(bg1);
                    contaier.addChild(bg);
                    contaier.addChild(numImg);
                    var lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
                    lock.anchorOffsetX = lock.width;
                    lock.anchorOffsetY = lock.height;
                    lock.x = 40;
                    lock.y = -30;
                    contaier.addChild(lock);
                    self.isLocked = true;
                }
            }
            else if (self.id == 4) {
                var xuan = Number(datas[2]); // 4
                if (curGunId < xuan) {
                    var bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
                    var bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
                    var numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_3_png"));
                    numImg.anchorOffsetX = numImg.width;
                    numImg.x = 0;
                    numImg.y = 5;
                    bg1.x = -60;
                    bg1.y = -2;
                    contaier.addChild(bg1);
                    contaier.addChild(bg);
                    contaier.addChild(numImg);
                    var lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
                    lock.anchorOffsetX = lock.width;
                    lock.anchorOffsetY = lock.height;
                    lock.x = 40;
                    lock.y = -30;
                    contaier.addChild(lock);
                    self.isLocked = true;
                }
            }
            contaier.anchorOffsetX = contaier.width >> 1;
            contaier.anchorOffsetY = contaier.height >> 1;
            contaier.x = self._item.x + posX;
            contaier.y = 535 / 2 + 100;
            self.addChild(contaier);
            //设置选中状态
            egret.setTimeout(function () {
                self.setSelected(self._isSelected, true);
            }, this, 100);
            self._callback();
            //添加在线人数刷新
            //123 新手 初级 高级
            if (this.id == 1 || this.id == 2 || this.id == 3) {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/alivePerson/AlivePerson.exml", function () {
                    self._alivePerson = new AlivePersonItem();
                    self._alivePerson.setPersonNumById(self.id);
                    if (CONFIG.IS_WEB) {
                        self.container.addChild(self._alivePerson);
                    }
                    else {
                        self._item.addChild(self._alivePerson);
                    }
                    if (self.id == 3) {
                        burn._Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE);
                    }
                }, this);
            }
        };
        MainItem.prototype.setSelected = function (select, flag) {
            if (flag === void 0) { flag = false; }
            this._isSelected = select;
            if (select) {
                if (CONFIG.IS_WEB) {
                    this.container.scaleX = this.container.scaleY = 1;
                }
                else {
                    this._item.scaleX = this._item.scaleY = 1;
                }
                // if (this.isLocked) {
                // 	return;
                // }
                //取消滤镜
                this._item.filters = null;
                if (!flag) {
                    if (CONFIG.IS_WEB) {
                        this._item.playMovie(0);
                    }
                    else {
                        this._item.play.play();
                    }
                }
            }
            else {
                if (CONFIG.IS_WEB) {
                    this.container.scaleX = this.container.scaleY = 0.8;
                }
                else {
                    this._item.scaleX = this._item.scaleY = 0.8;
                }
                //设置滤镜
                var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
                this._item.filters = [colorFlilter];
                if (CONFIG.IS_WEB) {
                    if (this._item.movie)
                        this._item.gotoAndStopMovie();
                }
                else {
                    this._item.play.pause();
                }
            }
        };
        //播放主场景UI动画
        MainItem.prototype.onTweenGroupComplete = function () {
            this._item.play.play(0);
        };
        MainItem.prototype.getSelected = function () {
            return this._isSelected;
        };
        MainItem.prototype.clicked = function () {
            _super.prototype.clicked.call(this);
            var userModel = burn.Director.getModelByKey(UserModel);
            if (CONFIG.openGuide) {
                if (userModel.getGuideID() <= 1) {
                    return;
                }
            }
            if (this._isSelected) {
                if (this.id == 4) {
                    burn._Notification_.send(NotifyEnum.OPEN_SELECT_ROOM);
                }
                else if (this.id == 1) {
                    burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.NewbieRoom, id: 0 });
                }
                else if (this.id == 2) {
                    burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.AutoLowRoom, id: 0 });
                }
                else if (this.id == 3) {
                    burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.AutoHighRoom, id: 0 });
                }
                else if (this.id == 5) {
                    var curGunId = userModel.getCurGunID();
                    var minGunId = game.table.T_Config_Table.getVoByKey(78).value;
                    if (curGunId < Number(minGunId)) {
                        //popTips
                        game.util.GameUtil.popTips(game.util.Language.getText(154));
                        return;
                    }
                    var view = new DjsMainView();
                    var med = new DjsMainMediator(view);
                    burn.Director.pushView(med);
                }
                else {
                    //功能尚未开放
                    game.util.GameUtil.popTips(game.util.Language.getText(47));
                }
            }
            else {
                burn._Notification_.send(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.id);
            }
        };
        MainItem.prototype.destory = function () {
            if (!CONFIG.IS_WEB) {
                this._item && this._item.play.removeEventListener('complete', this.onTweenGroupComplete, this);
                RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml");
            }
            this.removeChildren();
            // RES.destroyRes("mainAnim");
        };
        return MainItem;
    }(burn.display.PageItem));
    main.MainItem = MainItem;
    __reflect(MainItem.prototype, "main.MainItem");
})(main || (main = {}));
//# sourceMappingURL=MainItem.js.map