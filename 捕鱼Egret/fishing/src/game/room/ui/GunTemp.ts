// TypeScript file
/**
 * 枪的模板
 */
class GunTempleUI extends eui.Component {
    /** 枪贴图的组 */
    public gunPoint:eui.Group;
    //枪贴图文件
    public gunImage:eui.Image;
    public gunImageGroup:eui.Group;
    //枪贴图叠加特效
    //public gunEffectImag:eui.Image;

    /** 枪口特效的挂点 */
    public gunEffect:eui.Group;
    /** 枪口的坐标 */
    public gunPos:eui.Group;
    /** 枪口的锁头 */
    public lockGroup:eui.Group;
    /** 查看 */
    public chakan:eui.Button;

    //枪口位置配表
    private nGunX:number = 45;
    private nGunY:number = 90;
    private bRage:boolean = false;
    private bLocked:boolean = false;
    private nRoomerPos:number;
	public constructor(clazz:any) {
		super();
		this.skinName = clazz;
        //枪口叠加模式
		//this.gunEffectImag.blendMode = egret.BlendMode.ADD;
        //this.gunEffectImag.visible = false;
        this.gunEffect.rotation = 0;
        this.lockGroup.visible = false;
        this.bLocked = false;
        this.gunPoint.cacheAsBitmap = true;
        this.nRoomerPos = -1;
        this.chakan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chakanClick, this);
	}
    /** 点击 */
	private chakanClick(evt:egret.TouchEvent) {
		burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL, this.nRoomerPos);
	}
    public setRoomerPos(nPos:number):void {
        this.nRoomerPos = nPos;
    }
    public setGunNorData(nId:number):void {
        let self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PAO, nId, function(icon:egret.Bitmap):void {
			if (icon) {
                //self.gunImageGroup.removeChildren();
                // icon.anchorOffsetX = icon.width/2;
                // icon.anchorOffsetY = icon.height - 15;
               // self.gunImageGroup.addChild(icon);
               self.gunImage.source = "gunsicon_" + nId +  "_png";
			}
		});
    }
    public setGunData(nId:number):void {
        let gunSkinVo = game.table.T_Gun_skin_Table.getVoByKey(nId);
        let self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PAO_CLONE, gunSkinVo.id, function(icon:egret.Bitmap):void {
			if (icon) {
                self.gunImageGroup.removeChildren();
                icon.anchorOffsetX = icon.width/2;
                icon.anchorOffsetY = icon.height - 15;
                self.gunImageGroup.addChild(icon);
			}
		});
    }
    //设置枪管锚点
    public setGunImageAnchor(nId:number):void {
        let gunSkinVo = game.table.T_Gun_skin_Table.getVoByKey(nId);
        let strAnch = gunSkinVo.anchor;
        let data = strAnch.split('_');
        let anchX = parseInt(data[0]);
        let anchY = parseInt(data[1]);
		this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height - anchY;

        
        let strPos = gunSkinVo.gunPos;
        let data1 = strPos.split('_');
        let anchX1 = parseInt(data1[0]);
        let anchY1 = parseInt(data1[1]);
        
		this.nGunX = anchX1;
        this.nGunY = anchY1;
    }
    public setRage(bRage:boolean):void {
        this.bRage = bRage;
    }
    //设置枪口角度
    public gunFireTw(r:number):void {
        this.rotation = r;
        let self = this;
        let eff = null;
        if (this.bRage) {
            eff = this.getEfGunRagePos();
        } else {
            eff = this.getEfGunPos();
        }
        this.gunEffect.addChild(eff);
        let tw = egret.Tween.get( self.gunPoint, {loop:false});
        tw.to({bottom : -10, scaleY:0.9, scaleX:1.1}, 100).to({bottom : 0,scaleY:1, scaleX:1}, 90).call(function():void {
            egret.Tween.removeTweens( self.gunPoint);
        });
        let twEff = egret.Tween.get( self.gunEffect, {loop:false});
        twEff.wait(50).call(function():void {
            egret.Tween.removeTweens( self.gunEffect);
            self.gunEffect.removeChild(eff);
        });
        this.bRage = false;
    }
    //修改倍率。炮口震动一下
    public playGunChangeEff():void {
        let self = this;
        let tw = egret.Tween.get( self.gunPoint, {loop:false});
        tw.to({scaleY:0.20}, 100).to({scaleY:1}, 90).call(function():void {
            egret.Tween.removeTweens( self.gunPoint);
        });
    }
    //获取枪口位置
    public gunFirePos():egret.Point {
        return this.gunImageGroup.getChildAt(0).localToGlobal(this.nGunX, this.nGunY);
    }
    //根据枚举，获取枪口特效
    public getEfGunPos():egret.MovieClip {
        return game.util.FrameUtil.getEfGunPos();//getEfGunRagePos();
    }
    public getEfGunRagePos():egret.MovieClip {
        return game.util.FrameUtil.getEfGunRagePos();
    }
    public setLocked(flag:boolean):void {
        this.lockGroup.visible = flag;
        this.bLocked = flag;
    }
    public getGunLocked():boolean {
        return this.bLocked;
    }
    /** 销毁函数 */
	public destroy():void {
        this.chakan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chakanClick, this);
	}
}