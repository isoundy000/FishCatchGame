//GuideTaskUI
class GuideTaskUI extends eui.Component 
{
    public desc:eui.Label;
    public complete:eui.Image;
    public iconGroup:eui.Group;
    public root:eui.Group;
    public gainNum:eui.Label;
    public numGroup:eui.Group;
    public numLab:egret.BitmapText;
    //开始任务
    public startGroup:eui.Group;
    //红包相关
    public bgHong:eui.Image;
    public iconHong:eui.Group;
    public jiangliIcon:eui.Image;// 44 x 

    public jiangliHong:eui.Image;
    public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskGuide.exml";
        this.complete.visible = false;
        this.numLab = new egret.BitmapText();
		this.numLab.font = RES.getRes("bitmapNum_4_fnt");
		this.numLab.text = String("1");
		this.numGroup.addChild(this.numLab);
		this.numLab.textAlign = egret.HorizontalAlign.CENTER;
		this.numLab.anchorOffsetX = this.numLab.width/2;
		this.numLab.anchorOffsetY = this.numLab.height/2;
	}

    public setData(data:game.model.TaskItem):void {
        this.complete.visible = false;
        egret.Tween.removeTweens(this);
        this.alpha = 1;
        let vo = game.table.T_FishTaskItem_Table.getVoByKey(data.getTaskID());
        if (!vo) {
            return;
        }
        let finishTaskId = game.table.T_Config_Table.getVoByKey(82).value;
        if (false) {   //(vo.id  == Number(finishTaskId))
            this.bgHong.visible = true;
            this.iconHong.visible = true;
            this.jiangliIcon.visible = false;
            this.jiangliHong.visible = true;
            this.iconGroup.removeChildren();
            this.numLab.text = "";
        } else {
            this.bgHong.visible = false;
            this.iconHong.visible = false;
            this.jiangliIcon.visible = true;
            this.jiangliHong.visible = false;

            let param = vo.award;
            let items = param.split(",");
            let itemData = items[0].split("_");
            let id = Number(itemData[0]);
            let count = Number(itemData[1]);
            let self = this;
            this.iconGroup.removeChildren();
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function(icon:egret.Bitmap):void {
                icon.width = 50;
                icon.height = 50;
                icon.anchorOffsetX = icon.width/2;
                icon.anchorOffsetY = icon.height/2;
                icon.x = self.iconGroup.width/2;
                icon.y = self.iconGroup.height/2;
                self.iconGroup.addChild(icon);
            });

            if (id == PropEnum.FISH_TICKIT) {
                this.numLab.text = count/10 + "元";
            } else {
                this.numLab.text = "" + count;
            }
            this.numLab.textAlign = egret.HorizontalAlign.CENTER;
            this.numLab.anchorOffsetX = this.numLab.width/2;
            this.numLab.anchorOffsetY = this.numLab.height/2;
        }
        let arrName = new Array<string>();
        arrName.push(data.getValue() + "");
        if (vo.parameter2 == 0) {
            this.desc.text = game.util.Language.getText(vo.describe);
        } else {
            this.desc.text = game.util.Language.getDynamicTextByStr(game.util.Language.getText(vo.descModify),arrName);
        }
        //处理完成
        let state = data.getTaskState();
        if (state == TaskState.TAST_STATE_CAN_RECEIVE) {
            egret.Tween.removeTweens(this.startGroup);
            this.startGroup.visible = false;
            this.complete.visible = true;
            burn.tools.TweenTools.showOutAndInHalf(this,1000);
            let self = this;
		    let tw = egret.Tween.get(this.complete, {loop:false});
            tw.wait(2000).call(function(){
                egret.Tween.removeTweens(self.complete);
                let send:FinishTaskSendMessage = new FinishTaskSendMessage();
                send.initData();
                send.setTaskId(data.getTaskID());
                NetManager.send(send);
            });

            //板子上来再下来
            let dtw = egret.Tween.get(self.root, {loop:false});
            dtw.wait(2000).to({y:-300}, 200).wait(500).to({y:0}, 200).call(function():void{
                egret.Tween.removeTweens(self.root);   
            });
        } else {
            //this.startGroup
            this.startGroup.visible = true;
            //this.startGroup.blendMode = egret.BlendMode.ADD;
			burn.tools.TweenTools.ShowOutAndInMoreHalf(this.startGroup, 2000);
        }
    }

	/** 销毁函数 */
	public destroy():void {
		
	}
}