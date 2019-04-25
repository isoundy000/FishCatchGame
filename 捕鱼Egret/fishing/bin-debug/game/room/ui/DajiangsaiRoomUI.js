var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DajiangsaiRoomUI = (function (_super) {
    __extends(DajiangsaiRoomUI, _super);
    function DajiangsaiRoomUI(clazz) {
        return _super.call(this, clazz) || this;
        //this.guideTaskGroup.visible = false;
    }
    /** 大奖赛 */
    DajiangsaiRoomUI.prototype.setDjsUI = function (isFlip) {
        //新手引导不显示
        this.guideTaskGroup.visible = false;
        this.djsEffectGroup.removeChildren();
        var ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        burn.tools.TweenTools.rotation(ef_button, 10000);
        ef_button.anchorOffsetX = ef_button.width / 2;
        ef_button.anchorOffsetY = ef_button.height / 2;
        this.djsEffectGroup.addChild(ef_button);
        this.getCoinsBtn.visible = true;
        this.exchangeBtn.visible = true;
        this.lotteryBtn.visible = false;
        this.unlockBtn.visible = false;
        this.unlockGunGroup.visible = false;
        this.lotteryGroup.visible = false;
        this.exchangeGroup.visible = false;
        this.effect_Gold.visible = false;
        this.effect_Arena.visible = false;
        //大奖赛组显示
        this.DjsGroup.visible = true;
        //设置自己的积分,子弹数量
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        var djsObj = roomer.getDjsObj();
        if (djsObj) {
            this.rankScoreLab.text = djsObj.grandPrixIntegral + "";
            this.bulletNumLab.text = djsObj.grandPrixBulletNum + "";
        }
        else {
            this.rankScoreLab.text = "0";
            this.bulletNumLab.text = "0";
        }
        this.DjsScoreArr = new Array();
        this.DjsScoreArr.push(this.DjsScore_0);
        this.DjsScoreArr.push(this.DjsScore_1);
        this.DjsScoreArr.push(this.DjsScore_2);
        this.DjsScoreArr.push(this.DjsScore_3);
        this.DjsScoreLabArr = new Array();
        this.DjsScoreLab_0.text = "0";
        this.DjsScoreLab_1.text = "0";
        this.DjsScoreLab_2.text = "0";
        this.DjsScoreLab_3.text = "0";
        this.DjsScoreLabArr.push(this.DjsScoreLab_0);
        this.DjsScoreLabArr.push(this.DjsScoreLab_1);
        this.DjsScoreLabArr.push(this.DjsScoreLab_2);
        this.DjsScoreLabArr.push(this.DjsScoreLab_3);
        this.gainArr = new Array();
        this.gainArr.push(this.gain_0);
        this.gainArr.push(this.gain_1);
        this.gainArr.push(this.gain_2);
        this.gainLabArr = new Array();
        this.gainLabArr.push(this.gainNumLab_0);
        this.gainLabArr.push(this.gainNumLab_1);
        this.gainLabArr.push(this.gainNumLab_2);
        var pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
        this.DjsScoreArr[pos].visible = false;
        for (var i = 0; i < 4; i++) {
            var roomerItem = roomModel.getRoomerByPos(i);
            if (!roomerItem) {
                this.DjsScoreArr[i].visible = false;
            }
        }
        this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
        this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn));
        this.DjsTaskGroup.visible = false;
        //加减炮倍
        var gunId = userModel.getCurGunID();
        var gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
        if (gunVo.bulletNum < 3000) {
            this.addRateBtn_0.visible = false;
            this.reduceRateBtn_0.visible = false;
            this.addRateBtn_1.visible = false;
            this.reduceRateBtn_1.visible = false;
        }
        this.warGroupPos.visible = false;
        this.openWarHeadBtn.visible = false;
    };
    //根据位置设置积分显示隐藏
    DajiangsaiRoomUI.prototype.setDjsScoreVisableByPos = function (pos, vis) {
        if (this.DjsScoreArr) {
            this.DjsScoreArr[pos].visible = vis;
        }
    };
    //根据位置设置积分
    DajiangsaiRoomUI.prototype.setDjsScoreByPos = function (pos, num) {
        this.DjsScoreLabArr[pos].text = num + "";
    };
    //设置任务
    DajiangsaiRoomUI.prototype.setDjsTask = function (times) {
        var _this = this;
        var self = this;
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        var scoreStr = game.table.T_Config_Table.getVoByKey(69).value;
        var index = 0;
        if (userModel.getMatchRoomLevel() == RequesetRoomState.DjsRoom) {
            index = 0;
        }
        else if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            index = 1;
        }
        var scorData = scoreStr.split(",")[index].split("_")[times];
        this.scoreGainLab.text = "积分+" + scorData;
        if (taskList.length == 0) {
            this.DjsTaskGroup.visible = false;
        }
        else {
            this.DjsTaskGroup.visible = true;
        }
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer = null;
        }
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        //奖励更新
        this.gain_0.removeChildren();
        this.gain_1.removeChildren();
        this.gain_2.removeChildren();
        this.gainNumLab_0.text = "";
        this.gainNumLab_1.text = "";
        this.gainNumLab_2.text = "";
        var len = taskList.length;
        var comArr = 0;
        for (var i = 0; i < len; i++) {
            var item = taskList[i];
            if (i >= self.gainLabArr.length) {
                continue;
            }
            var vo = game.table.T_FishTaskItem_Table.getVoByKey(item.getTaskID());
            if (!vo) {
                continue;
            }
            self.gainLabArr[i].text = item.getValue() + "/" + vo.parameter2;
            if (item.getValue() >= vo.parameter2) {
                comArr++;
            }
            var fishVo = game.table.T_Fish_Table.getVoByKey(vo.parameter1);
            if (!fishVo) {
                continue;
            }
            (function (fishVo, i, group) {
                var txtr = "fishkind_" + fishVo.fishkindIcon + "_png";
                var self = this;
                RES.getResAsync(txtr, function () {
                    var txture = RES.getRes(txtr);
                    var img = new egret.Bitmap(txture);
                    img.scaleX = 0.7;
                    img.scaleY = 0.7;
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    group.addChild(img);
                }, this);
            })(fishVo, i, self.gainArr[i]);
        }
        //任务完成
        if (comArr == len) {
            this.scoreTipsAdd.visible = true;
            this.scoreTips.text = scorData;
            var tipsTw = egret.Tween.get(this.scoreTipsAdd);
            tipsTw.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
                .call(function () {
                egret.Tween.removeTweens(_this.scoreTipsAdd);
                _this.scoreTipsAdd.visible = false;
                _this.rankScoreLab.text = Number(_this.rankScoreLab.text) + Number(scorData) + "";
            });
            var tw = egret.Tween.get(this.DjsTaskGroup, { loop: false });
            tw.to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .call(function () {
                egret.Tween.removeTweens(_this.DjsTaskGroup);
                _this.clearTask();
            });
        }
    };
    DajiangsaiRoomUI.prototype.timerFunc = function () {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        if (taskList.length == 0) {
            return;
        }
        var len = taskList.length;
        var time = taskList[0].getComTime();
        var residueTime = time - game.util.TimeUtil.getCurrTime();
        if (residueTime <= 0) {
            //任务失败
            burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
            this.clearTask();
            return;
        }
        var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
        this.taskTimeLab.text = timeStr;
    };
    //清空大奖赛任务
    DajiangsaiRoomUI.prototype.clearTask = function () {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        var len = taskList.length;
        for (var i = 0; i < len; i++) {
            taskModel.removeItem(taskList[i].getTaskID());
        }
        this.DjsTaskGroup.visible = false;
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer = null;
        }
    };
    //更新子弹数量
    DajiangsaiRoomUI.prototype.updateDjdBulletNum = function (value) {
        this.bulletNumLab.text = value + "";
    };
    //更新积分显示
    DajiangsaiRoomUI.prototype.updateDjsScore = function (value) {
        this.rankScoreLab.text = value + "";
    };
    //打开大奖赛报名
    DajiangsaiRoomUI.prototype.openArenaSignView = function () {
        if (this._bOpenSignView) {
            return;
        }
        this._bOpenSignView = true;
        //加入判断。单次加载
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getMatchRoomLevel() == RequesetRoomState.DjsRoom) {
            var view = new DjsView();
            var med = new DjsMediator(view);
            burn.Director.pushView(med);
        }
        else if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            var view1 = new QmsView();
            var med1 = new QmsMediator(view1);
            burn.Director.pushView(med1);
        }
    };
    /**---------------------------全民赛-------------------------------*/
    /** 全民赛 */
    DajiangsaiRoomUI.prototype.setQmsUI = function (isFlip) {
        //新手引导不显示
        this.guideTaskGroup.visible = false;
        this.djsEffectGroup.removeChildren();
        var ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        burn.tools.TweenTools.rotation(ef_button, 10000);
        ef_button.anchorOffsetX = ef_button.width / 2;
        ef_button.anchorOffsetY = ef_button.height / 2;
        this.djsEffectGroup.addChild(ef_button);
        this.getCoinsBtn.visible = true;
        this.exchangeBtn.visible = true;
        this.lotteryBtn.visible = false;
        this.unlockBtn.visible = false;
        this.unlockGunGroup.visible = false;
        this.lotteryGroup.visible = false;
        this.exchangeGroup.visible = false;
        this.effect_Gold.visible = false;
        this.effect_Arena.visible = false;
        //大奖赛组显示
        this.DjsGroup.visible = true;
        //设置自己的积分,子弹数量
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        var djsObj = roomer.getDjsObj();
        if (djsObj) {
            this.rankScoreLab.text = djsObj.grandPrixIntegral + "";
            this.bulletNumLab.text = djsObj.grandPrixBulletNum + "";
        }
        else {
            this.rankScoreLab.text = "0";
            this.bulletNumLab.text = "0";
        }
        this.DjsScoreArr = new Array();
        this.DjsScoreArr.push(this.DjsScore_0);
        this.DjsScoreArr.push(this.DjsScore_1);
        this.DjsScoreArr.push(this.DjsScore_2);
        this.DjsScoreArr.push(this.DjsScore_3);
        this.DjsScoreLabArr = new Array();
        this.DjsScoreLab_0.text = "0";
        this.DjsScoreLab_1.text = "0";
        this.DjsScoreLab_2.text = "0";
        this.DjsScoreLab_3.text = "0";
        this.DjsScoreLabArr.push(this.DjsScoreLab_0);
        this.DjsScoreLabArr.push(this.DjsScoreLab_1);
        this.DjsScoreLabArr.push(this.DjsScoreLab_2);
        this.DjsScoreLabArr.push(this.DjsScoreLab_3);
        this.gainArr = new Array();
        this.gainArr.push(this.gain_0);
        this.gainArr.push(this.gain_1);
        this.gainArr.push(this.gain_2);
        this.gainLabArr = new Array();
        this.gainLabArr.push(this.gainNumLab_0);
        this.gainLabArr.push(this.gainNumLab_1);
        this.gainLabArr.push(this.gainNumLab_2);
        var pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
        this.DjsScoreArr[pos].visible = false;
        for (var i = 0; i < 4; i++) {
            var roomerItem = roomModel.getRoomerByPos(i);
            if (!roomerItem) {
                this.DjsScoreArr[i].visible = false;
            }
        }
        this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
        this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn));
        this.DjsTaskGroup.visible = false;
        //加减炮倍
        this.addRateBtn_0.visible = false;
        this.reduceRateBtn_0.visible = false;
        this.addRateBtn_1.visible = false;
        this.reduceRateBtn_1.visible = false;
        this.qmsGroup_0.visible = true;
        this.addGoldBtn_0.visible = false;
        this.addGemBtn_0.visible = false;
        this.qmsGroup_1.visible = true;
        this.addGoldBtn_1.visible = false;
        this.addGemBtn_1.visible = false;
        this.qmsGroup_2.visible = true;
        this.addGoldBtn_2.visible = false;
        this.addGemBtn_2.visible = false;
        this.qmsGroup_3.visible = true;
        this.addGoldBtn_3.visible = false;
        this.addGemBtn_3.visible = false;
        this.Djs.visible = false;
        this.warGroupPos.visible = false;
        this.openWarHeadBtn.visible = false;
    };
    /**-------------------------------------快速赛------------------------------------*/
    DajiangsaiRoomUI.prototype.setKssUI = function (isFlip) {
        //新手引导不显示
        this.guideTaskGroup.visible = false;
        this.getCoinsBtn.visible = false;
        this.exchangeBtn.visible = false;
        this.lotteryBtn.visible = false;
        this.unlockBtn.visible = false;
        this.unlockGunGroup.visible = false;
        this.lotteryGroup.visible = false;
        this.exchangeGroup.visible = false;
        this.effect_Gold.visible = false;
        this.effect_Arena.visible = false;
        this.KssGroup.visible = true;
        this.qmsGroup_0.visible = true;
        this.addGoldBtn_0.visible = false;
        this.addGemBtn_0.visible = false;
        this.qmsGroup_1.visible = true;
        this.addGoldBtn_1.visible = false;
        this.addGemBtn_1.visible = false;
        this.qmsGroup_2.visible = true;
        this.addGoldBtn_2.visible = false;
        this.addGemBtn_2.visible = false;
        this.qmsGroup_3.visible = true;
        this.addGoldBtn_3.visible = false;
        this.addGemBtn_3.visible = false;
        this._arrCur = new Array();
        this._arrCur.push(this.cur_0);
        this._arrCur.push(this.cur_1);
        this._arrCur.push(this.cur_2);
        this._arrCur.push(this.cur_3);
        this._arrSel = new Array();
        this._arrSel.push(this.sel_0);
        this._arrSel.push(this.sel_1);
        this._arrSel.push(this.sel_2);
        this._arrSel.push(this.sel_3);
        //添加动画
        burn.tools.TweenTools.showOutAndIn(this.sel_0, 1500);
        burn.tools.TweenTools.showOutAndIn(this.sel_1, 1500);
        burn.tools.TweenTools.showOutAndIn(this.sel_2, 1500);
        burn.tools.TweenTools.showOutAndIn(this.sel_3, 1500);
        this._arrRank = new Array();
        this._arrRank.push(this.rank_0);
        this._arrRank.push(this.rank_1);
        this._arrRank.push(this.rank_2);
        this._arrRank.push(this.rank_3);
        this._arrScore = new Array();
        this._arrScore.push(this.kssScore_0);
        this._arrScore.push(this.kssScore_1);
        this._arrScore.push(this.kssScore_2);
        this._arrScore.push(this.kssScore_3);
        this.DjsScoreArr = new Array();
        this.DjsScoreArr.push(this.DjsScore_0);
        this.DjsScoreArr.push(this.DjsScore_1);
        this.DjsScoreArr.push(this.DjsScore_2);
        this.DjsScoreArr.push(this.DjsScore_3);
        this.DjsScoreLabArr = new Array();
        this.DjsScoreLab_0.text = "0";
        this.DjsScoreLab_1.text = "0";
        this.DjsScoreLab_2.text = "0";
        this.DjsScoreLab_3.text = "0";
        this.DjsScoreLabArr.push(this.DjsScoreLab_0);
        this.DjsScoreLabArr.push(this.DjsScoreLab_1);
        this.DjsScoreLabArr.push(this.DjsScoreLab_2);
        this.DjsScoreLabArr.push(this.DjsScoreLab_3);
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        var pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
        this.DjsScoreArr[pos].visible = false;
        for (var i = 0; i < 4; i++) {
            var roomerItem = roomModel.getRoomerByPos(i);
            if (!roomerItem) {
                this.DjsScoreArr[i].visible = false;
            }
        }
        this.addRateBtn_0.visible = false;
        this.reduceRateBtn_0.visible = false;
        this.addRateBtn_1.visible = false;
        this.reduceRateBtn_1.visible = false;
        var imgArr = new Array();
        imgArr.push(this.img_0);
        imgArr.push(this.img_1);
        imgArr.push(this.img_2);
        imgArr.push(this.img_3);
        var roomType = userModel.getMatchRoomLevel();
        for (var i = 0; i < imgArr.length; i++) {
            if ((i + 7) == roomType) {
                imgArr[i].visible = true;
            }
            else {
                imgArr[i].visible = false;
            }
        }
        //核弹不显示
        this.warGroupPos.visible = false;
        this.openWarHeadBtn.visible = false;
    };
    //快速赛开始，添加计时器
    DajiangsaiRoomUI.prototype.startKssTime = function (value) {
        this._nKssEndTime = value;
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
            this._timer = null;
        }
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
        this._timer.start();
    };
    //快速赛时间变更
    DajiangsaiRoomUI.prototype.timerFuncKss = function () {
        var time = this._nKssEndTime;
        var residueTime = time - game.util.TimeUtil.getCurrTime();
        if (residueTime <= 0) {
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
                this._timer = null;
            }
            return;
        }
        var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
        this.timeLab.text = timeStr;
    };
    //变更快速赛左侧排行信息
    DajiangsaiRoomUI.prototype.changeKssInfoList = function (arrData, rank) {
        //最大子弹数
        var maxBullet = 600;
        var len = arrData.length;
        for (var i = 0; i < len; i++) {
            var item = arrData[i];
            if (i == rank) {
                this._arrSel[i].visible = true;
            }
            else {
                this._arrSel[i].visible = false;
            }
            this._arrScore[i].text = item.getIntegral() + "";
            var percent = item.getBulletNum() * 1.0 / maxBullet;
            this._arrCur[i].width = 140.0 * percent;
        }
        if (rank >= 3) {
            this._arrRank[3].text = (rank + 1) + "";
            this._arrSel[3].visible = true;
        }
        this.rankLab.text = (rank + 1) + "/8";
    };
    DajiangsaiRoomUI.prototype.destory = function () {
        _super.prototype.destory.call(this);
        this.DjsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
    };
    return DajiangsaiRoomUI;
}(RoomUI));
__reflect(DajiangsaiRoomUI.prototype, "DajiangsaiRoomUI");
//# sourceMappingURL=DajiangsaiRoomUI.js.map