var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    /**
     * 奖金鱼抽奖界面
     */
    var LotteryUI = (function (_super) {
        __extends(LotteryUI, _super);
        function LotteryUI(to) {
            var _this = _super.call(this) || this;
            //当前tab页
            _this.currTab = 1;
            //当前可以抽奖的tab页
            _this.currSucTag = 1;
            _this._bGuide = false;
            _this._btnWrapList = new Array();
            _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml";
            _this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeUI, _this);
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml", _this.addBgResource, _this);
            _this._to = _this.globalToLocal(to.x, to.y);
            _this.arrTitle = new Array();
            _this.arrTitle.push(_this.title_0);
            _this.arrTitle.push(_this.title_1);
            _this.arrTitle.push(_this.title_2);
            _this.arrTitle.push(_this.title_3);
            _this.arrTitle.push(_this.title_4);
            _this.arrTitle.push(_this.title_5);
            _this._currClickItem = "";
            _this.setCountFont();
            return _this;
        }
        LotteryUI.prototype.setCountFont = function () {
            this.num_1.name = "num_1";
            this.num_2.name = "num_2";
            this.num_3.name = "num_3";
            this.num_4.name = "num_4";
            this.num_5.name = "num_5";
            this.num_6.name = "num_6";
            this.count_txt1 = new egret.BitmapText();
            this.count_txt1.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt1.name = "txt1";
            this.count_txt1.text = String("1");
            this.num_1.addChildAt(this.count_txt1, 1);
            this.count_txt1.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt1.anchorOffsetX = this.count_txt1.width / 2;
            this.count_txt1.anchorOffsetY = this.count_txt1.height / 2;
            this.count_txt2 = new egret.BitmapText();
            this.count_txt2.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt2.name = "txt2";
            this.count_txt2.text = String("1");
            this.num_2.addChildAt(this.count_txt2, 1);
            this.count_txt2.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt2.anchorOffsetX = this.count_txt2.width / 2;
            this.count_txt2.anchorOffsetY = this.count_txt2.height / 2;
            this.count_txt3 = new egret.BitmapText();
            this.count_txt3.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt3.name = "txt3";
            this.count_txt3.text = String("1");
            this.num_3.addChildAt(this.count_txt3, 1);
            this.count_txt3.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt3.anchorOffsetX = this.count_txt3.width / 2;
            this.count_txt3.anchorOffsetY = this.count_txt3.height / 2;
            this.count_txt4 = new egret.BitmapText();
            this.count_txt4.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt4.name = "txt4";
            this.count_txt4.text = String("1");
            this.num_4.addChildAt(this.count_txt4, 1);
            this.count_txt4.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt4.anchorOffsetX = this.count_txt4.width / 2;
            this.count_txt4.anchorOffsetY = this.count_txt4.height / 2;
            this.count_txt5 = new egret.BitmapText();
            this.count_txt5.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt5.name = "txt5";
            this.count_txt5.text = String("1");
            this.num_5.addChildAt(this.count_txt5, 1);
            this.count_txt5.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt5.anchorOffsetX = this.count_txt5.width / 2;
            this.count_txt5.anchorOffsetY = this.count_txt5.height / 2;
            this.count_txt6 = new egret.BitmapText();
            this.count_txt6.font = RES.getRes("bitmapNum_4_fnt");
            this.count_txt6.name = "txt6";
            this.count_txt6.text = String("1");
            this.num_6.addChildAt(this.count_txt6, 1);
            this.count_txt6.textAlign = egret.HorizontalAlign.CENTER;
            this.count_txt6.anchorOffsetX = this.count_txt6.width / 2;
            this.count_txt6.anchorOffsetY = this.count_txt6.height / 2;
        };
        //UI资源加载完成
        LotteryUI.prototype.addBgResource = function (clazz, url) {
            this.root.visible = true;
            this.lottery.visible = false;
            this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
            this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
            this.fish.visible = false;
            this.chou.visible = false;
            //封装按钮
            this._btnWrapList.push(new burn.tools.UIWrap(this.getBtn));
            this._btnWrapList.push(new burn.tools.UIWrap(this.closeBtn));
            this._btnWrapList.push(new burn.tools.UIWrap(this.sureBtn));
            var model = burn.Director.getModelByKey(LotteryModel);
            var score = model.getScore();
            var arrVo = game.table.T_Lottery_Table.getAllVo();
            var curTag = 0;
            for (var i = 0; i < arrVo.length; i++) {
                var scoreCur = arrVo[i].integral;
                if (score >= scoreCur) {
                    curTag = i;
                }
                else {
                    break;
                }
            }
            var killNum = model.getKillNum();
            var maxNum = model.getMaxKill(model.getTodayCount());
            var tips = "";
            var lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
            if (killNum >= maxNum && score >= lotteryVo.integral) {
                //curTag += 1;
                this.currSucTag = curTag + 1;
                this.setData(this.currSucTag);
                this.initView();
                this.tabBar.selectedIndex = curTag;
                if (this.currSucTag == this.currTab) {
                    var lotteryVo_1 = game.table.T_Lottery_Table.getVoByKey(this.currTab + 1);
                    if (!lotteryVo_1) {
                        if (this.currTab == game.table.T_Lottery_Table.getAllVo().length) {
                            lotteryVo_1 = game.table.T_Lottery_Table.getVoByKey(this.currTab);
                        }
                    }
                    this.setProgress(model.getScore(), lotteryVo_1.integral);
                    this.getBtn.label = game.util.Language.getText(9); //抽奖
                    this.fish.visible = false;
                    this.chou.visible = true;
                }
                else {
                    var lotteryVo_2 = game.table.T_Lottery_Table.getVoByKey(this.currTab);
                    this.setProgress(model.getScore(), lotteryVo_2.integral);
                    this.getBtn.label = game.util.Language.getText(8); //查看鱼种
                    this.fish.visible = true;
                    this.chou.visible = false;
                }
                //tips = game.util.Language.getText(7);
                tips = this.arrTitle[curTag].text;
            }
            else {
                this.currSucTag = 1;
                this.setData(1);
                this.getBtn.label = game.util.Language.getText(8); //查看鱼种
                this.fish.visible = true;
                this.chou.visible = false;
                tips = game.util.Language.getText(6);
                if (killNum >= maxNum) {
                    this.setProgress(score, lotteryVo.integral);
                }
                else {
                    this.setProgress(killNum, maxNum);
                }
            }
            //设置UI显示
            this.setScore(model.getScore());
            this.setTipsTxt(tips);
            this.visibleTitle(false);
            //监听消息返回
            var self = this;
            game.net.MessageDispatcher.register(game.net.ResponseType.DRAWLOTTERYBACK, function (msg) {
                self.lotteryDataBack(msg);
            });
            if (this._bGuide) {
                this.setScore(2222);
                this.setTipsTxt(game.util.Language.getText(9));
                this.setProgress(2000, 2000);
                this.getBtn.label = game.util.Language.getText(9); //抽奖
                this.fish.visible = false;
                this.chou.visible = true;
            }
        };
        //初始化界面
        LotteryUI.prototype.initView = function () {
        };
        //点击tab菜单
        LotteryUI.prototype.onBarItemTap = function (e) {
            this.setData(e.itemIndex + 1);
            var model = burn.Director.getModelByKey(LotteryModel);
            var killNum = model.getKillNum();
            var maxNum = model.getMaxKill(model.getTodayCount());
            var lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
            if (killNum >= maxNum && model.getScore() >= lotteryVo.integral) {
                if (this.currSucTag == this.currTab) {
                    this.visibleTitle(false);
                    var lotteryVo_3 = game.table.T_Lottery_Table.getVoByKey(this.currTab + 1);
                    if (!lotteryVo_3) {
                        if (this.currTab == game.table.T_Lottery_Table.getAllVo().length) {
                            lotteryVo_3 = game.table.T_Lottery_Table.getVoByKey(this.currTab);
                        }
                    }
                    this.setProgress(model.getScore(), lotteryVo_3.integral);
                    this.getBtn.label = game.util.Language.getText(9); //查看鱼种
                    this.fish.visible = false;
                    this.chou.visible = true;
                }
                else if (this.currSucTag < this.currTab) {
                    this.visibleTitle(false);
                    var lotteryVo_4 = game.table.T_Lottery_Table.getVoByKey(this.currTab);
                    this.setProgress(model.getScore(), lotteryVo_4.integral);
                    this.getBtn.label = game.util.Language.getText(8); //查看鱼种
                    this.fish.visible = true;
                    this.chou.visible = false;
                }
                else {
                    this.visibleTitle(true);
                }
            }
        };
        //隐藏下标题栏
        LotteryUI.prototype.visibleTitle = function (flag) {
            if (flag) {
                this.getBtn.visible = false;
                this.tips_txt.visible = false;
                this.progressBar.visible = false;
                this.max_tips_txt.visible = true;
            }
            else {
                this.getBtn.visible = true;
                this.tips_txt.visible = true;
                this.progressBar.visible = true;
                this.max_tips_txt.visible = false;
            }
        };
        //初始化档位数据
        LotteryUI.prototype.setData = function (id) {
            this.currTab = id;
            var vo = game.table.T_Lottery_Table.getVoByKey(id);
            //奖励1
            var award_1_arr = vo.award1.split("_");
            var item_1 = this.root.getChildByName("item_1");
            if (item_1 == null) {
                item_1 = new room.LotteryItemUI(Number(award_1_arr[0]), Number(award_1_arr[1]));
                item_1.name = "item_1";
                item_1.x = 140 + item_1.width / 2;
                item_1.y = 255 + item_1.height / 2;
                this.root.addChild(item_1);
            }
            else {
                item_1.setData(Number(award_1_arr[0]), Number(award_1_arr[1]));
            }
            //奖励2
            var award_2_arr = vo.award2.split("_");
            var item_2 = this.root.getChildByName("item_2");
            if (item_2 == null) {
                item_2 = new room.LotteryItemUI(Number(award_2_arr[0]), Number(award_2_arr[1]));
                item_2.name = "item_2";
                item_2.x = 308 + item_1.width / 2;
                item_2.y = 255 + item_1.height / 2;
                this.root.addChild(item_2);
            }
            else {
                item_2.setData(Number(award_2_arr[0]), Number(award_2_arr[1]));
            }
            //奖励3
            var award_3_arr = vo.award3.split("_");
            var item_3 = this.root.getChildByName("item_3");
            if (item_3 == null) {
                item_3 = new room.LotteryItemUI(Number(award_3_arr[0]), Number(award_3_arr[1]));
                item_3.name = "item_3";
                item_3.x = 475 + item_1.width / 2;
                item_3.y = 255 + item_1.height / 2;
                this.root.addChild(item_3);
            }
            else {
                item_3.setData(Number(award_3_arr[0]), Number(award_3_arr[1]));
            }
            //奖励4
            var award_4_arr = vo.award4.split("_");
            var item_4 = this.root.getChildByName("item_4");
            if (item_4 == null) {
                item_4 = new room.LotteryItemUI(Number(award_4_arr[0]), Number(award_4_arr[1]));
                item_4.name = "item_4";
                item_4.x = 643 + item_1.width / 2;
                item_4.y = 255 + item_1.height / 2;
                this.root.addChild(item_4);
            }
            else {
                item_4.setData(Number(award_4_arr[0]), Number(award_4_arr[1]));
            }
            //奖励5
            var award_5_arr = vo.award5.split("_");
            var item_5 = this.root.getChildByName("item_5");
            if (item_5 == null) {
                item_5 = new room.LotteryItemUI(Number(award_5_arr[0]), Number(award_5_arr[1]));
                item_5.name = "item_5";
                item_5.x = 810 + item_1.width / 2;
                item_5.y = 255 + item_1.height / 2;
                this.root.addChild(item_5);
            }
            else {
                item_5.setData(Number(award_5_arr[0]), Number(award_5_arr[1]));
            }
            //奖励6
            var award_6_arr = vo.award6.split("_");
            var item_6 = this.root.getChildByName("item_6");
            if (item_6 == null) {
                item_6 = new room.LotteryItemUI(Number(award_6_arr[0]), Number(award_6_arr[1]));
                item_6.name = "item_6";
                item_6.x = 978 + item_1.width / 2;
                item_6.y = 255 + item_1.height / 2;
                this.root.addChild(item_6);
            }
            else {
                item_6.setData(Number(award_6_arr[0]), Number(award_6_arr[1]));
            }
            var arr = new Array();
            arr.push(item_6);
            arr.push(item_5);
            arr.push(item_4);
            arr.push(item_3);
            arr.push(item_2);
            arr.push(item_1);
            game.util.GameUtil.playWarAction(arr);
        };
        //设置奖金鱼奖池奖金
        LotteryUI.prototype.setScore = function (score) {
            this.score_txt.text = String(score);
        };
        //设置奖池进度描述
        LotteryUI.prototype.setTipsTxt = function (tips) {
            this.tips_txt.text = tips;
        };
        //设置进度条
        LotteryUI.prototype.setProgress = function (val, max) {
            this.progressBar.maximum = max;
            this.progressBar.value = val;
        };
        //领取奖励
        LotteryUI.prototype.onGetReward = function (evt) {
            this.sureBtn.visible = false;
            var model = burn.Director.getModelByKey(LotteryModel);
            var killNum = model.getKillNum();
            var maxNum = model.getMaxKill(model.getTodayCount());
            var lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
            if (killNum >= maxNum && model.getScore() >= lotteryVo.integral) {
                if (this.currSucTag != this.currTab) {
                    var fishKindsView = new FishKindsView();
                    var fishKindsMed = new FishKindsMediator(fishKindsView);
                    burn.Director.pushView(fishKindsMed);
                    return;
                }
                if (this.currSucTag != 6) {
                    var txt = this.arrTitle[this.currSucTag].text;
                    var lotteryVo_5 = game.table.T_Lottery_Table.getVoByKey(this.currSucTag + 1);
                    if (lotteryVo_5) {
                        var model_1 = burn.Director.getModelByKey(LotteryModel);
                        var changePoint = Number(lotteryVo_5.integral) - model_1.getScore();
                        var arrName = new Array();
                        arrName.push(txt);
                        arrName.push(changePoint + "");
                        var self_1 = this;
                        game.util.GameUtil.openConfirmByTwoButton(null, function () {
                            //领奖
                            self_1.root.visible = false;
                            self_1.lottery.visible = true;
                            self_1.setItems();
                            self_1.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self_1.startToLottery, self_1);
                        }, this, game.util.Language.getDynamicText(79, arrName));
                    }
                    return;
                }
                //领奖
                this.root.visible = false;
                this.lottery.visible = true;
                this.setItems();
                this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
            }
            else {
                //查看鱼种
                var fishKindsView = new FishKindsView();
                var fishKindsMed = new FishKindsMediator(fishKindsView);
                burn.Director.pushView(fishKindsMed);
            }
        };
        //设置抽奖时的档位items信息
        LotteryUI.prototype.setItems = function () {
            var model = burn.Director.getModelByKey(LotteryModel);
            var score = model.getScore();
            var vos = game.table.T_Lottery_Table.getAllVo();
            this.currMaxTab = 1;
            for (var i = 0; i < vos.length; i++) {
                if (score >= vos[i].integral) {
                    this.currMaxTab = vos[i].id;
                }
            }
            var vo = game.table.T_Lottery_Table.getVoByKey(this.currMaxTab);
            var award_1_arr = vo.award1.split("_");
            var item_1_vo = game.table.T_Item_Table.getVoByKey(Number(award_1_arr[0]));
            if (Number(award_1_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt1.text = Number(award_1_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt1.text = award_1_arr[1];
            }
            this.count_txt1.anchorOffsetX = this.count_txt1.width / 2;
            this.count_txt1.anchorOffsetY = this.count_txt1.height / 2;
            this.count_txt1.name = "count_1";
            this.back_1.name = "back_1";
            var icon_1 = game.util.GameUtil.getIconById(IconType.PROP, item_1_vo.id, Number(award_1_arr[1]));
            icon_1.width = 100;
            icon_1.height = 100;
            icon_1.anchorOffsetX = icon_1.width / 2;
            icon_1.anchorOffsetY = icon_1.height / 2;
            icon_1.x = 95;
            icon_1.y = 75;
            icon_1.name = "icon";
            this.item_1.addChildAt(icon_1, 2);
            var award_2_arr = vo.award2.split("_");
            var item_2_vo = game.table.T_Item_Table.getVoByKey(Number(award_2_arr[0]));
            if (Number(award_2_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt2.text = Number(award_2_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt2.text = award_2_arr[1];
            }
            this.count_txt2.anchorOffsetX = this.count_txt2.width / 2;
            this.count_txt2.anchorOffsetY = this.count_txt2.height / 2;
            this.count_txt2.name = "count_2";
            this.back_2.name = "back_2";
            var icon_2 = game.util.GameUtil.getIconById(IconType.PROP, item_2_vo.id, Number(award_2_arr[1]));
            icon_2.width = 100;
            icon_2.height = 100;
            icon_2.anchorOffsetX = icon_2.width / 2;
            icon_2.anchorOffsetY = icon_2.height / 2;
            icon_2.x = 95;
            icon_2.y = 75;
            icon_2.name = "icon";
            this.item_2.addChildAt(icon_2, 2);
            var award_3_arr = vo.award3.split("_");
            var item_3_vo = game.table.T_Item_Table.getVoByKey(Number(award_3_arr[0]));
            if (Number(award_3_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt3.text = Number(award_3_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt3.text = award_3_arr[1];
            }
            this.count_txt3.anchorOffsetX = this.count_txt3.width / 2;
            this.count_txt3.anchorOffsetY = this.count_txt3.height / 2;
            this.count_txt3.name = "count_3";
            this.back_3.name = "back_3";
            var icon_3 = game.util.GameUtil.getIconById(IconType.PROP, item_3_vo.id, Number(award_3_arr[1]));
            icon_3.width = 100;
            icon_3.height = 100;
            icon_3.anchorOffsetX = icon_3.width / 2;
            icon_3.anchorOffsetY = icon_3.height / 2;
            icon_3.x = 95;
            icon_3.y = 75;
            icon_3.name = "icon";
            this.item_3.addChildAt(icon_3, 2);
            var award_4_arr = vo.award4.split("_");
            var item_4_vo = game.table.T_Item_Table.getVoByKey(Number(award_4_arr[0]));
            if (Number(award_4_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt4.text = Number(award_4_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt4.text = award_4_arr[1];
            }
            this.count_txt4.anchorOffsetX = this.count_txt4.width / 2;
            this.count_txt4.anchorOffsetY = this.count_txt4.height / 2;
            this.count_txt4.name = "count_4";
            this.back_4.name = "back_4";
            var icon_4 = game.util.GameUtil.getIconById(IconType.PROP, item_4_vo.id, Number(award_4_arr[1]));
            icon_4.width = 100;
            icon_4.height = 100;
            icon_4.anchorOffsetX = icon_4.width / 2;
            icon_4.anchorOffsetY = icon_4.height / 2;
            icon_4.x = 95;
            icon_4.y = 75;
            icon_4.name = "icon";
            this.item_4.addChildAt(icon_4, 2);
            var award_5_arr = vo.award5.split("_");
            var item_5_vo = game.table.T_Item_Table.getVoByKey(Number(award_5_arr[0]));
            if (Number(award_5_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt5.text = Number(award_5_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt5.text = award_5_arr[1];
            }
            this.count_txt5.anchorOffsetX = this.count_txt5.width / 2;
            this.count_txt5.anchorOffsetY = this.count_txt5.height / 2;
            this.count_txt5.name = "count_5";
            this.back_5.name = "back_5";
            var icon_5 = game.util.GameUtil.getIconById(IconType.PROP, item_5_vo.id, Number(award_5_arr[1]));
            icon_5.width = 100;
            icon_5.height = 100;
            icon_5.anchorOffsetX = icon_5.width / 2;
            icon_5.anchorOffsetY = icon_5.height / 2;
            icon_5.x = 95;
            icon_5.y = 75;
            icon_5.name = "icon";
            this.item_5.addChildAt(icon_5, 2);
            var award_6_arr = vo.award6.split("_");
            var item_6_vo = game.table.T_Item_Table.getVoByKey(Number(award_6_arr[0]));
            if (Number(award_6_arr[0]) == PropEnum.FISH_TICKIT) {
                this.count_txt6.text = Number(award_6_arr[1]) / 10 + "元";
            }
            else {
                this.count_txt6.text = award_6_arr[1];
            }
            this.count_txt6.anchorOffsetX = this.count_txt6.width / 2;
            this.count_txt6.anchorOffsetY = this.count_txt6.height / 2;
            this.count_txt6.name = "count_6";
            this.back_6.name = "back_6";
            var icon_6 = game.util.GameUtil.getIconById(IconType.PROP, item_6_vo.id, Number(award_6_arr[1]));
            icon_6.anchorOffsetX = icon_6.width / 2;
            icon_6.anchorOffsetY = icon_6.height / 2;
            icon_6.x = 95;
            icon_6.y = 75;
            icon_6.name = "icon";
            this.item_6.addChildAt(icon_6, 2);
        };
        //开始抽奖
        LotteryUI.prototype.startToLottery = function (evt) {
            var self = this;
            var tw = egret.Tween.get(this, { loop: false });
            this.playAction.addEventListener(egret.Event.COMPLETE, self.onTweenGroupComplete, this);
            tw.wait(600).call(function () {
                self.playAction.play();
                egret.Tween.removeTweens(self);
            });
            this.item_1.getChildByName("icon").visible = false;
            this.item_2.getChildByName("icon").visible = false;
            this.item_3.getChildByName("icon").visible = false;
            this.item_4.getChildByName("icon").visible = false;
            this.item_5.getChildByName("icon").visible = false;
            this.item_6.getChildByName("icon").visible = false;
            this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
            this.lotteryBtn.visible = false;
            this.playFlip(this.item_1, this.count_txt1, this.back_1);
            this.playFlip(this.item_2, this.count_txt2, this.back_2);
            this.playFlip(this.item_3, this.count_txt3, this.back_3);
            this.playFlip(this.item_4, this.count_txt4, this.back_4);
            this.playFlip(this.item_5, this.count_txt5, this.back_5);
            this.playFlip(this.item_6, this.count_txt6, this.back_6);
        };
        LotteryUI.prototype.playFlip = function (item, count, back) {
            var tw = egret.Tween.get(item, { loop: false });
            tw.to({ scaleX: 0 }, 300).call(function () {
                count.visible = false;
                back.visible = true;
            }).to({ scaleX: 1 }, 300).call(function () {
                egret.Tween.removeTweens(item);
            });
        };
        //动画播放完成
        LotteryUI.prototype.onTweenGroupComplete = function () {
            this.item_1.name = "lottery_1";
            this.item_2.name = "lottery_2";
            this.item_3.name = "lottery_3";
            this.item_4.name = "lottery_4";
            this.item_5.name = "lottery_5";
            this.item_6.name = "lottery_6";
            this.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            this.item_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            this.item_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            this.item_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            this.item_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            this.item_6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
            var self = this;
            var effectChild = self.item_1.getChildByName("ef_lottery_1");
            if (!effectChild) {
                var onConfigComplete_1 = function (event) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete_1, self);
                    var hint = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint.anchorOffsetX = hint.width / 2;
                    hint.anchorOffsetY = hint.height / 2;
                    hint.x = self.item_1.width / 2;
                    hint.y = self.item_1.height / 2;
                    hint.blendMode = egret.BlendMode.ADD;
                    hint.name = "ef_lottery_1";
                    self.item_1.addChild(hint);
                    var hint1 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint1.anchorOffsetX = hint1.width / 2;
                    hint1.anchorOffsetY = hint1.height / 2;
                    hint1.x = self.item_1.width / 2;
                    hint1.y = self.item_1.height / 2;
                    hint1.blendMode = egret.BlendMode.ADD;
                    hint1.name = "ef_lottery_1";
                    self.item_2.addChild(hint1);
                    var hint2 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint2.anchorOffsetX = hint2.width / 2;
                    hint2.anchorOffsetY = hint2.height / 2;
                    hint2.x = self.item_1.width / 2;
                    hint2.y = self.item_1.height / 2;
                    hint2.blendMode = egret.BlendMode.ADD;
                    hint2.name = "ef_lottery_1";
                    self.item_3.addChild(hint2);
                    var hint3 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint3.anchorOffsetX = hint3.width / 2;
                    hint3.anchorOffsetY = hint3.height / 2;
                    hint3.x = self.item_1.width / 2;
                    hint3.y = self.item_1.height / 2;
                    hint3.blendMode = egret.BlendMode.ADD;
                    hint3.name = "ef_lottery_1";
                    self.item_4.addChild(hint3);
                    var hint4 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint4.anchorOffsetX = hint4.width / 2;
                    hint4.anchorOffsetY = hint4.height / 2;
                    hint4.x = self.item_1.width / 2;
                    hint4.y = self.item_1.height / 2;
                    hint4.blendMode = egret.BlendMode.ADD;
                    hint4.name = "ef_lottery_1";
                    self.item_5.addChild(hint4);
                    var hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint5.anchorOffsetX = hint5.width / 2;
                    hint5.anchorOffsetY = hint5.height / 2;
                    hint5.x = self.item_1.width / 2;
                    hint5.y = self.item_1.height / 2;
                    hint5.blendMode = egret.BlendMode.ADD;
                    hint5.name = "ef_lottery_1";
                    self.item_6.addChild(hint5);
                    burn.tools.TweenTools.showOutAndInHalf(hint, 1000);
                    burn.tools.TweenTools.showOutAndInHalf(hint1, 1000);
                    burn.tools.TweenTools.showOutAndInHalf(hint2, 1000);
                    burn.tools.TweenTools.showOutAndInHalf(hint3, 1000);
                    burn.tools.TweenTools.showOutAndInHalf(hint4, 1000);
                    burn.tools.TweenTools.showOutAndInHalf(hint5, 1000);
                };
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete_1, this);
                RES.createGroup("ef_lottery_1_group", ["ef_lottery_1_json", "ef_lottery_1_png"]);
                RES.loadGroup("ef_lottery_1_group");
            }
            setTimeout(function () {
                if (self._currClickItem != "") {
                    return;
                }
                if (self._bGuide) {
                    return;
                }
                self._currClickItem = "lottery_1";
                self.deleteEffect();
                var req = new DrawLotterySendMessage();
                req.initData();
                req.setGear(self.currMaxTab);
                NetManager.send(req);
            }, 10000);
        };
        LotteryUI.prototype.deleteEffect = function () {
            var child1 = this.item_1.getChildByName("ef_lottery_1");
            if (child1) {
                this.item_1.removeChild(child1);
            }
            var child2 = this.item_2.getChildByName("ef_lottery_1");
            if (child2) {
                this.item_2.removeChild(child2);
            }
            var child3 = this.item_3.getChildByName("ef_lottery_1");
            if (child3) {
                this.item_3.removeChild(child3);
            }
            var child4 = this.item_4.getChildByName("ef_lottery_1");
            if (child4) {
                this.item_4.removeChild(child4);
            }
            var child5 = this.item_5.getChildByName("ef_lottery_1");
            if (child5) {
                this.item_5.removeChild(child5);
            }
            var child6 = this.item_6.getChildByName("ef_lottery_1");
            if (child6) {
                this.item_6.removeChild(child6);
            }
        };
        //向服务器发送抽奖消息
        LotteryUI.prototype.sendToLottery = function (evt) {
            if (this._bGuide) {
                this._currClickItem = evt.currentTarget.name;
                this.deleteEffect();
                this.lotteryDataBackGuide();
                var self_2 = this;
                //移除监听
                self_2.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                self_2.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                self_2.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                self_2.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                self_2.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                self_2.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, self_2.sendToLottery, self_2);
                return;
            }
            this._currClickItem = evt.currentTarget.name;
            this.deleteEffect();
            var req = new DrawLotterySendMessage();
            req.initData();
            req.setGear(this.currMaxTab);
            NetManager.send(req);
            var self = this;
            //移除监听
            self.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
            self.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
            self.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
            self.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
            self.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
            self.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
        };
        //抽奖返回
        LotteryUI.prototype.lotteryDataBack = function (msg) {
            var self = this;
            var state = msg.getState();
            if (GetLotteryState.GET_SUCC == state) {
                var itemIdx_1 = msg.getItemIndex();
                var idx_1 = this._currClickItem.substr(8, 1);
                var item_7 = this.lottery.getChildByName(this._currClickItem);
                var tw = egret.Tween.get(item_7, { loop: false });
                tw.to({ scaleX: 0 }, 300).call(function () {
                    var count = item_7.getChildByName("num_" + idx_1);
                    var back = item_7.getChildByName("back_" + idx_1);
                    var iconAva = item_7.getChildByName("icon");
                    if (iconAva) {
                        iconAva.visible = true;
                    }
                    count.visible = true;
                    back.visible = false;
                    //设置item显示
                    var vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
                    var award = self.getAwardByIdx(itemIdx_1);
                    var awardContend = award.split("_");
                    item_7.removeChildAt(2);
                    var itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
                    var countNum = count.getChildByName("count_" + idx_1);
                    if (Number(awardContend[0]) == PropEnum.FISH_TICKIT) {
                        countNum.text = Number(awardContend[1]) / 10 + "元";
                    }
                    else {
                        countNum.text = awardContend[1];
                    }
                    countNum.visible = true;
                    countNum.anchorOffsetX = countNum.width / 2;
                    countNum.anchorOffsetY = countNum.height / 2;
                    var icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
                    icon.anchorOffsetX = icon.width / 2;
                    icon.anchorOffsetY = icon.height / 2;
                    icon.x = 95;
                    icon.y = 75;
                    item_7.addChildAt(icon, 2);
                    if (Number(awardContend[0]) == 10001) {
                    }
                }).to({ scaleX: 1 }, 300).call(function () {
                    self.playEnd(itemIdx_1, Number(idx_1));
                    //添加监听按钮
                    self.sureBtn.visible = true;
                    self.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.getLotteryEnd, self);
                    var effectChild = item_7.getChildByName("ef_lottery");
                    if (!effectChild) {
                        var hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                        hint5.anchorOffsetX = hint5.width / 2;
                        hint5.anchorOffsetY = hint5.height / 2;
                        hint5.x = self.item_1.width / 2;
                        hint5.y = self.item_1.height / 2;
                        hint5.blendMode = egret.BlendMode.ADD;
                        hint5.name = "ef_lottery_1";
                        item_7.addChild(hint5);
                        burn.tools.TweenTools.showOutAndInHalf(hint5, 1000);
                        var data1 = RES.getRes("ef_lottery_bao_json");
                        var txtr1 = RES.getRes("ef_lottery_bao_png");
                        var mcFactory1 = new egret.MovieClipDataFactory(data1, txtr1);
                        var hintBao = new MovieFish(mcFactory1.generateMovieClipData("ef_lottery_bao"), egret.Event.COMPLETE);
                        hintBao.initEvent();
                        var dataMc1 = hintBao.movieClipData;
                        var frameCur = 0;
                        var modifyRectBao = new egret.Rectangle(dataMc1.frames[frameCur].x, dataMc1.frames[frameCur].y, 0, 0);
                        hintBao.gotoAndPlay("play", 1);
                        hintBao.frameRate = 14;
                        hintBao.anchorOffsetX = hintBao.width / 2;
                        hintBao.anchorOffsetY = hintBao.height / 2;
                        hintBao.x = item_7.width / 2 - modifyRectBao.x;
                        hintBao.y = item_7.height / 2 - modifyRectBao.y;
                        hintBao.blendMode = egret.BlendMode.ADD;
                        hintBao.name = "ef_lottery_bao";
                        item_7.addChild(hintBao);
                        var tw_1 = egret.Tween.get(effectChild, { loop: false });
                        tw_1.wait(3500).call(function () {
                            var ef_lottery_1 = item_7.getChildByName("ef_lottery_1");
                            if (ef_lottery_1 != null) {
                                item_7.removeChild(ef_lottery_1);
                            }
                            var ef_lottery_bao = item_7.getChildByName("ef_lottery_bao");
                            if (ef_lottery_bao != null) {
                                item_7.removeChild(ef_lottery_bao);
                            }
                            egret.Tween.removeTweens(effectChild);
                        });
                    }
                });
                this.sureBtn.visible = true;
                this.lotteryBtn.visible = false;
            }
            else {
                game.util.GameUtil.popTips(state);
            }
        };
        LotteryUI.prototype.playEnd = function (itemIdx, idx) {
            var self = this;
            var arr = new Array();
            for (var i = 0; i < 6; i++) {
                if (i == itemIdx) {
                    continue;
                }
                arr.push(i);
            }
            var j = 0;
            for (var i = 1; i < 7; i++) {
                if (i == idx) {
                    continue;
                }
                itemIdx = arr[j];
                j++;
                (function (i, self, itemIdx) {
                    var item = self.lottery.getChildByName("lottery_" + (i));
                    var tw = egret.Tween.get(item, { loop: false });
                    tw.to({ scaleX: 0 }, 300).call(function () {
                        var count = item.getChildByName("num_" + (i));
                        var back = item.getChildByName("back_" + (i));
                        var iconAva = item.getChildByName("icon_lottery");
                        if (iconAva) {
                            iconAva.visible = true;
                        }
                        count.visible = true;
                        back.visible = false;
                        //设置item显示
                        var vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
                        var award = self.getAwardByIdx(itemIdx);
                        var awardContend = award.split("_");
                        var itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
                        var countNum = count.getChildByName("count_" + (i));
                        if (Number(awardContend[0]) == PropEnum.FISH_TICKIT) {
                            countNum.text = Number(awardContend[1]) / 10 + "元";
                        }
                        else {
                            countNum.text = awardContend[1];
                        }
                        countNum.visible = true;
                        countNum.anchorOffsetX = countNum.width / 2;
                        countNum.anchorOffsetY = countNum.height / 2;
                        var icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
                        icon.anchorOffsetX = icon.width / 2;
                        icon.anchorOffsetY = icon.height / 2;
                        icon.x = 95;
                        icon.y = 75;
                        item.addChildAt(icon, 2);
                    }).to({ scaleX: 1 }, 300).call(function () {
                        egret.Tween.removeTweens(item);
                    });
                })(i, this, itemIdx);
            }
        };
        LotteryUI.prototype.getAwardByIdx = function (idx) {
            var vo = game.table.T_Lottery_Table.getVoByKey(this.currMaxTab);
            var award = "";
            switch (idx) {
                case 0:
                    award = vo.award1;
                    break;
                case 1:
                    award = vo.award2;
                    break;
                case 2:
                    award = vo.award3;
                    break;
                case 3:
                    award = vo.award4;
                    break;
                case 4:
                    award = vo.award5;
                    break;
                case 5:
                    award = vo.award6;
                    break;
            }
            return award;
        };
        //领取奖励结束后
        LotteryUI.prototype.getLotteryEnd = function (evt) {
            this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getLotteryEnd, this);
            // for (let i = 1; i <= 6; i++) {
            // 	let item = this.lottery.getChildByName("lottery_" + i) as eui.Group;
            // 	if (item.name != this._currClickItem) {
            // 		(function(_item:eui.Group, _i){
            // 			let tw = egret.Tween.get(_item, {loop:false});
            // 			tw.to({scaleX:1}, 300).call(function():void {
            // 				let count = _item.getChildByName("num_" + _i);
            // 				count.visible = false;
            // 				egret.Tween.removeTweens(_item);
            // 			});
            // 		})(item, i);
            // 	}
            // }
            //当前选择的item
            var self = this;
            var currItem = this.lottery.getChildByName(this._currClickItem);
            setTimeout(function () {
                var tw = egret.Tween.get(currItem, { loop: false });
                tw.to({ x: self._to.x, y: self._to.y, scaleX: 0.2, scaleY: 0.2 }, 300).call(function () {
                    egret.Tween.removeTweens(currItem);
                    self.closeUI(null);
                    var model = burn.Director.getModelByKey(UserModel);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: model.getUserId(), isTween: true });
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: model.getUserId() });
                    burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
                });
            }, 600);
        };
        /////////////////////////////////////////////////////////引导///////////////////////////////////////////////////////////
        LotteryUI.prototype.setGuide = function () {
            this._bGuide = true;
        };
        LotteryUI.prototype.startLottery = function () {
            this.sureBtn.visible = false;
            if (this.currSucTag != 6) {
                //领奖
                this.root.visible = false;
                this.lottery.visible = true;
                this.setItems();
                this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
                return;
            }
        };
        LotteryUI.prototype.lotteryDataBackGuide = function () {
            var self = this;
            var itemIdx = 0;
            var idx = this._currClickItem.substr(8, 1);
            var item = this.lottery.getChildByName(this._currClickItem);
            var tw = egret.Tween.get(item, { loop: false });
            tw.to({ scaleX: 0 }, 300).call(function () {
                var count = item.getChildByName("num_" + idx);
                var back = item.getChildByName("back_" + idx);
                var iconAva = item.getChildByName("icon");
                if (iconAva) {
                    iconAva.visible = true;
                }
                count.visible = true;
                back.visible = false;
                //设置item显示
                var vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
                var award = self.getAwardByIdx(itemIdx);
                var awardContend = award.split("_");
                item.removeChildAt(2);
                var itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
                var countNum = count.getChildByName("count_" + idx);
                countNum.text = Number(awardContend[1]) / 10 + "元";
                countNum.visible = true;
                countNum.anchorOffsetX = countNum.width / 2;
                countNum.anchorOffsetY = countNum.height / 2;
                var icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = 95;
                icon.y = 75;
                item.addChildAt(icon, 2);
                if (Number(awardContend[0]) == 10001) {
                }
            }).to({ scaleX: 1 }, 300).call(function () {
                //添加监听按钮
                self.sureBtn.visible = true;
                self.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.getLotteryEnd, self);
                var effectChild = item.getChildByName("ef_lottery");
                if (!effectChild) {
                    var hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    hint5.anchorOffsetX = hint5.width / 2;
                    hint5.anchorOffsetY = hint5.height / 2;
                    hint5.x = self.item_1.width / 2;
                    hint5.y = self.item_1.height / 2;
                    hint5.blendMode = egret.BlendMode.ADD;
                    hint5.name = "ef_lottery_1";
                    item.addChild(hint5);
                    burn.tools.TweenTools.showOutAndInHalf(hint5, 1000);
                    var data1 = RES.getRes("ef_lottery_bao_json");
                    var txtr1 = RES.getRes("ef_lottery_bao_png");
                    var mcFactory1 = new egret.MovieClipDataFactory(data1, txtr1);
                    var hintBao = new MovieFish(mcFactory1.generateMovieClipData("ef_lottery_bao"), egret.Event.COMPLETE);
                    hintBao.initEvent();
                    var dataMc1 = hintBao.movieClipData;
                    var frameCur = 0;
                    var modifyRectBao = new egret.Rectangle(dataMc1.frames[frameCur].x, dataMc1.frames[frameCur].y, 0, 0);
                    hintBao.gotoAndPlay("play", 1);
                    hintBao.frameRate = 14;
                    hintBao.anchorOffsetX = hintBao.width / 2;
                    hintBao.anchorOffsetY = hintBao.height / 2;
                    hintBao.x = item.width / 2 - modifyRectBao.x;
                    hintBao.y = item.height / 2 - modifyRectBao.y;
                    hintBao.blendMode = egret.BlendMode.ADD;
                    hintBao.name = "ef_lottery_bao";
                    item.addChild(hintBao);
                    var tw_2 = egret.Tween.get(effectChild, { loop: false });
                    tw_2.wait(3500).call(function () {
                        var ef_lottery_1 = item.getChildByName("ef_lottery_1");
                        if (ef_lottery_1 != null) {
                            item.removeChild(ef_lottery_1);
                        }
                        var ef_lottery_bao = item.getChildByName("ef_lottery_bao");
                        if (ef_lottery_bao != null) {
                            item.removeChild(ef_lottery_bao);
                        }
                        egret.Tween.removeTweens(effectChild);
                    });
                }
            });
            this.sureBtn.visible = true;
            this.lotteryBtn.visible = false;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /** 点击退出UI */
        LotteryUI.prototype.closeUI = function (evt) {
            //移除按钮封装
            while (this._btnWrapList.length > 0) {
                var wrap = this._btnWrapList.pop();
                wrap.destroy();
            }
            if (this.num_1) {
                this.num_1.removeChildren();
            }
            if (this.num_2) {
                this.num_2.removeChildren();
            }
            if (this.num_3) {
                this.num_3.removeChildren();
            }
            if (this.num_4) {
                this.num_4.removeChildren();
            }
            if (this.num_5) {
                this.num_5.removeChildren();
            }
            if (this.num_6) {
                this.num_6.removeChildren();
            }
            if (this.item_1) {
                this.item_1.removeChildren();
            }
            if (this.item_2) {
                this.item_2.removeChildren();
            }
            if (this.item_3) {
                this.item_3.removeChildren();
            }
            if (this.item_4) {
                this.item_4.removeChildren();
            }
            if (this.item_5) {
                this.item_5.removeChildren();
            }
            if (this.item_6) {
                this.item_6.removeChildren();
            }
            if (this.root) {
                this.root.removeChildren();
            }
            this.removeChildren();
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
            this.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
            this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
            game.net.MessageDispatcher.unregister(game.net.ResponseType.DRAWLOTTERYBACK);
            this.parent.removeChild(this);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml");
            burn._Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END);
        };
        return LotteryUI;
    }(eui.Component));
    room.LotteryUI = LotteryUI;
    __reflect(LotteryUI.prototype, "room.LotteryUI");
})(room || (room = {}));
//# sourceMappingURL=LotteryUI.js.map