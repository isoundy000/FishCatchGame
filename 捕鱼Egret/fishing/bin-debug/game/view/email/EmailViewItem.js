var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EmailViewItem = (function (_super) {
    __extends(EmailViewItem, _super);
    function EmailViewItem() {
        return _super.call(this) || this;
    }
    EmailViewItem.prototype.setData = function (data) {
        /** required uint32 mailId = 1;
            required uint32 mailType = 2;
            required uint32 userId = 3;//收件人id
            required string receiveUserName = 4;
            required uint32 sendUserId = 5;
            required string sendUserName = 6;
            repeated ItemInfo items = 7;
            required uint64 time = 8;//发送时间为1970年至今毫秒数
            required uint32 state = 9;//0未领取（查看），1领取，2查看（无物品附件）
            required string mailContent = 10;//邮件文字内容
        */
        this.labTil.text = data.getMailTitle();
        this.labContain.text = data.getMailContent();
        var time = Date.now();
        var emailTime = Date.parse(String(data.getTime()));
        var state = data.getState();
        /**	0:没领取/没查看
            1:已领取
            2:已查看 */
        var isEnd = false;
        var items = data.getItems();
        if (state == 0) {
            isEnd = false;
        }
        else {
            isEnd = true;
        }
        if (items.length > 0) {
            this.setLingqu(isEnd);
        }
        else {
            this.setChaKan(isEnd);
        }
    };
    //查看按钮
    EmailViewItem.prototype.setChaKan = function (bEnd) {
        this.lingqu.visible = false;
        this.chakan.visible = true;
        if (bEnd) {
            this.imgYiChakan.visible = true;
            this.imgChakan.visible = false;
            this.endChakan.visible = true;
        }
        else {
            this.imgYiChakan.visible = false;
            this.imgChakan.visible = true;
            this.endChakan.visible = false;
        }
    };
    //领取按钮
    EmailViewItem.prototype.setLingqu = function (bEnd) {
        this.lingqu.visible = true;
        this.chakan.visible = false;
        if (bEnd) {
            this.imgYilingqu.visible = true;
            this.imgLingqu.visible = false;
            this.endLingqu.visible = true;
        }
        else {
            this.imgYilingqu.visible = false;
            this.imgLingqu.visible = true;
            this.endLingqu.visible = false;
        }
    };
    return EmailViewItem;
}(eui.Component));
__reflect(EmailViewItem.prototype, "EmailViewItem");
//# sourceMappingURL=EmailViewItem.js.map