var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//GuideTaskUI
var GuideTaskUI = (function (_super) {
    __extends(GuideTaskUI, _super);
    function GuideTaskUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskGuide.exml";
        _this.complete.visible = false;
        _this.numLab = new egret.BitmapText();
        _this.numLab.font = RES.getRes("bitmapNum_4_fnt");
        _this.numLab.text = String("1");
        _this.numGroup.addChild(_this.numLab);
        _this.numLab.textAlign = egret.HorizontalAlign.CENTER;
        _this.numLab.anchorOffsetX = _this.numLab.width / 2;
        _this.numLab.anchorOffsetY = _this.numLab.height / 2;
        return _this;
    }
    GuideTaskUI.prototype.setData = function (data) {
        this.complete.visible = false;
        egret.Tween.removeTweens(this);
        this.alpha = 1;
        var vo = game.table.T_FishTaskItem_Table.getVoByKey(data.getTaskID());
        if (!vo) {
            return;
        }
        var finishTaskId = game.table.T_Config_Table.getVoByKey(82).value;
        if (false) {
            this.bgHong.visible = true;
            this.iconHong.visible = true;
            this.jiangliIcon.visible = false;
            this.jiangliHong.visible = true;
            this.iconGroup.removeChildren();
            this.numLab.text = "";
        }
        else {
            this.bgHong.visible = false;
            this.iconHong.visible = false;
            this.jiangliIcon.visible = true;
            this.jiangliHong.visible = false;
            var param = vo.award;
            var items = param.split(",");
            var itemData = items[0].split("_");
            var id = Number(itemData[0]);
            var count = Number(itemData[1]);
            var self_1 = this;
            this.iconGroup.removeChildren();
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function (icon) {
                icon.width = 50;
                icon.height = 50;
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = self_1.iconGroup.width / 2;
                icon.y = self_1.iconGroup.height / 2;
                self_1.iconGroup.addChild(icon);
            });
            if (id == PropEnum.FISH_TICKIT) {
                this.numLab.text = count / 10 + "元";
            }
            else {
                this.numLab.text = "" + count;
            }
            this.numLab.textAlign = egret.HorizontalAlign.CENTER;
            this.numLab.anchorOffsetX = this.numLab.width / 2;
            this.numLab.anchorOffsetY = this.numLab.height / 2;
        }
        var arrName = new Array();
        arrName.push(data.getValue() + "");
        if (vo.parameter2 == 0) {
            this.desc.text = game.util.Language.getText(vo.describe);
        }
        else {
            this.desc.text = game.util.Language.getDynamicTextByStr(game.util.Language.getText(vo.descModify), arrName);
        }
        //处理完成
        var state = data.getTaskState();
        if (state == TaskState.TAST_STATE_CAN_RECEIVE) {
            egret.Tween.removeTweens(this.startGroup);
            this.startGroup.visible = false;
            this.complete.visible = true;
            burn.tools.TweenTools.showOutAndInHalf(this, 1000);
            var self_2 = this;
            var tw = egret.Tween.get(this.complete, { loop: false });
            tw.wait(2000).call(function () {
                egret.Tween.removeTweens(self_2.complete);
                var send = new FinishTaskSendMessage();
                send.initData();
                send.setTaskId(data.getTaskID());
                NetManager.send(send);
            });
            //板子上来再下来
            var dtw = egret.Tween.get(self_2.root, { loop: false });
            dtw.wait(2000).to({ y: -300 }, 200).wait(500).to({ y: 0 }, 200).call(function () {
                egret.Tween.removeTweens(self_2.root);
            });
        }
        else {
            //this.startGroup
            this.startGroup.visible = true;
            //this.startGroup.blendMode = egret.BlendMode.ADD;
            burn.tools.TweenTools.ShowOutAndInMoreHalf(this.startGroup, 2000);
        }
    };
    /** 销毁函数 */
    GuideTaskUI.prototype.destroy = function () {
    };
    return GuideTaskUI;
}(eui.Component));
__reflect(GuideTaskUI.prototype, "GuideTaskUI");
//# sourceMappingURL=GuideTaskUI.js.map