var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml";
        return _this;
    }
    RankItem.prototype.setData = function (data) {
        var _this = this;
        /**
            required int64 rankValue = 4;//排行对应的值
            required string iconUrl = 8;//头像 */
        this.nameLab.text = data._strName;
        if (data._nRankType != 4) {
            if (data._nRank == 1) {
                this.img1.visible = true;
                this.img2.visible = false;
                this.img3.visible = false;
            }
            else if (data._nRank == 2) {
                this.img1.visible = false;
                this.img2.visible = true;
                this.img3.visible = false;
            }
            else if (data._nRank == 3) {
                this.img1.visible = false;
                this.img2.visible = false;
                this.img3.visible = true;
            }
            else {
                this.numLab.text = data._nRank + "";
            }
            this.weekGroup.visible = false;
        }
        else {
            this.img1.visible = false;
            this.img2.visible = false;
            this.img3.visible = false;
            this.numLab.visible = false;
            var rankStr = this.getWeekStrByIndex(data._nRank);
            var labData = rankStr.split("_");
            this.lab1.text = labData[0];
            this.lab2.text = labData[1];
        }
        if (data._nVipLevel > 0) {
            this.vipLab.text = data._nVipLevel + "";
        }
        else {
            this.vipGroup.visible = false;
        }
        this.expLabel.text = data._nExp + "";
        if (data._nRankType == 1) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            this.goldExp.visible = false;
            this.expLab.visible = true;
        }
        else if (data._nRankType == 2) {
            // this.lvLab.text = "金币:" + data._nRankValue;
            this.lvLab.text = "Lv:" + data._nRankValue;
            this.scoreLab.visible = false;
            this.goldExp.visible = true;
            this.expLab.visible = false;
        }
        else if (data._nRankType == 3) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            //this.lvLab.text = "大奖赛积分:" + data._nRankValue;
            this.scoreLab.visible = true;
            this.goldExp.visible = false;
            this.expLab.visible = false;
        }
        else if (data._nRankType == 4) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            //this.lvLab.text = "周冠军积分:" + data._nRankValue;
            this.scoreLab.visible = true;
            this.expLab.visible = false;
        }
        var headUrl = "";
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            headUrl = CONFIG.LOGIN_ADDR.replace("yiwantang/", "");
        }
        else {
            headUrl = CONFIG.LOGIN_ADDR;
        }
        //显示头像
        game.util.IconUtil.getHeadIcon(headUrl + data._strIconUrl, function (bmp) {
            bmp.anchorOffsetX = bmp.anchorOffsetY = bmp.width / 2;
            bmp.scaleX = bmp.scaleY = 0.75;
            //设置玩家头像
            _this.iconGroup.addChild(bmp);
            bmp.x = bmp.y = 5;
        });
    };
    RankItem.prototype.getWeekStrByIndex = function (nIndex) {
        var str = "";
        var pre = Math.floor(nIndex / 10000);
        var back = nIndex % 10000;
        var preD = pre % 100;
        var preM = Math.floor(pre / 100);
        var backD = Number(back) % 100;
        var backM = Math.floor(Number(back) / 100);
        str = preM + "." + preD + "_" + backM + "." + backD;
        return str;
        //  let currentFirstDate;
        //  let formatDate = function(date){
        //     let month = (date.getMonth()+1);
        //     let day = date.getDate();
        //     if (month < 10) {
        //         month = "0" + month;
        //     }
        //     if (day < 10) {
        //         day = "0" + day;
        //     }
        //     return month + "." + day;
        // };
        // let addDate = function(date,n) {       
        //     date.setDate(date.getDate()+n);    //yue de mou yi tian    
        //     return date;
        // };
        // let setDate = function(date) {
        //     let data = new Date();
        //     let week = date.getDay()-1; //xing qi ji 
        //     date = addDate(date, week*-1);
        //     currentFirstDate = new Date(date);
        //    // cells[i].innerHTML = formatDate(i==0 ? date : addDate(date,1));
        //     return formatDate(date) + "_" + formatDate(addDate(date, 7));
        // };
        // setDate(new Date());
        // let str = setDate(addDate(currentFirstDate, -7*nIndex)); 
        // return str;
    };
    return RankItem;
}(eui.Component));
__reflect(RankItem.prototype, "RankItem");
//# sourceMappingURL=RankItem.js.map