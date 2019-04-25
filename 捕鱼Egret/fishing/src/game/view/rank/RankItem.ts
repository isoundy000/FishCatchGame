class RankItem extends eui.Component {
    public numGroup: eui.Group;//第几名
    public iconGroup: eui.Group;//头像
    public nameLab: eui.Label;
    public lvLab: eui.Label;
    public vipGroup: eui.Group;//vip图标
    public expGroup: eui.Group;//经验

    public img1: eui.Image;
    public img2: eui.Image;
    public img3: eui.Image;
    public numLab: eui.BitmapLabel;
    public vipLab: eui.BitmapLabel;
    public expLabel: eui.BitmapLabel;

    public goldExp: eui.Label;
    public expLab: eui.Label;
    //周冠军排名
    public weekGroup: eui.Group;
    public lab1: eui.Label;
    public lab2: eui.Label;

    public scoreLab: eui.Label;
    public constructor() {
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml";
    }
    public setData(data: game.model.RankDataItem): void {
        /**
            required int64 rankValue = 4;//排行对应的值
            required string iconUrl = 8;//头像 */
        this.nameLab.text = data._strName;
        if (data._nRankType != 4) {//周冠军和其他的不一样
            if (data._nRank == 1) {
                this.img1.visible = true;
                this.img2.visible = false;
                this.img3.visible = false;
            } else if (data._nRank == 2) {
                this.img1.visible = false;
                this.img2.visible = true;
                this.img3.visible = false;
            } else if (data._nRank == 3) {
                this.img1.visible = false;
                this.img2.visible = false;
                this.img3.visible = true;
            } else {
                this.numLab.text = data._nRank + "";
            }
            this.weekGroup.visible = false;
        } else {
            this.img1.visible = false;
            this.img2.visible = false;
            this.img3.visible = false;
            this.numLab.visible = false;

            let rankStr = this.getWeekStrByIndex(data._nRank);
            let labData = rankStr.split("_");
            this.lab1.text = labData[0];
            this.lab2.text = labData[1];
        }

        if (data._nVipLevel > 0) {
            this.vipLab.text = data._nVipLevel + "";
        } else {
            this.vipGroup.visible = false;
        }
        this.expLabel.text = data._nExp + "";

        if (data._nRankType == 1) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            this.goldExp.visible = false;
            this.expLab.visible = true;
        } else if (data._nRankType == 2) {
            // this.lvLab.text = "金币:" + data._nRankValue;
            this.lvLab.text = "Lv:" + data._nRankValue;
            this.scoreLab.visible = false;
            this.goldExp.visible = true;
            this.expLab.visible = false;
        } else if (data._nRankType == 3) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            //this.lvLab.text = "大奖赛积分:" + data._nRankValue;
            this.scoreLab.visible = true;
            this.goldExp.visible = false;
            this.expLab.visible = false;
        } else if (data._nRankType == 4) {
            this.lvLab.text = "Lv:" + data._nRankValue;
            //this.lvLab.text = "周冠军积分:" + data._nRankValue;
            this.scoreLab.visible = true;
            this.expLab.visible = false;
        }
        let headUrl:string = "";
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
			headUrl = CONFIG.LOGIN_ADDR.replace("yiwantang/","");
		}else{
			headUrl = CONFIG.LOGIN_ADDR;
		}
        //显示头像
        game.util.IconUtil.getHeadIcon(headUrl + data._strIconUrl, (bmp) => {
            bmp.anchorOffsetX = bmp.anchorOffsetY = bmp.width / 2;
            bmp.scaleX = bmp.scaleY = 0.75;
            //设置玩家头像
            this.iconGroup.addChild(bmp);
            bmp.x = bmp.y = 5;
        });
    }

    private getWeekStrByIndex(nIndex: number): string {
        let str = "";
        let pre = Math.floor(nIndex / 10000);
        let back = nIndex % 10000;
        let preD = pre % 100;
        let preM = Math.floor(pre / 100);
        let backD = Number(back) % 100;
        let backM = Math.floor(Number(back) / 100);
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
    }
}