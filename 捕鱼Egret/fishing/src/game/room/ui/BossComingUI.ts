class BossComingUI extends eui.Component {
	//动画组
	public play:egret.tween.TweenGroup;
	public play2:egret.tween.TweenGroup;

	public rate_1:eui.Group;
	public name_1:eui.Group;
	public rate_2:eui.Group;
	public name_2:eui.Group;
	public rate_3:eui.Group;
	public name_3:eui.Group;

	public L:eui.Image;
	public R:eui.Image;
	public N:eui.Image;

	public Zi_1:eui.Image;
	public Zi_2:eui.Image;
	public Zi_3:eui.Image;
	public heiDi:eui.Image;
	public group0:eui.Group;

	public group:eui.Group;
	public bg:eui.Rect;

	public Danger_1:eui.Image;
	public Danger_2:eui.Image;
	public group1:eui.Group;


	public constructor() {
		super();
	}

	public setData(name:string, rate:string):void {
		let nametr = RES.getRes(name);
		let ratetr = RES.getRes(rate);		

		let name1 = new egret.Bitmap(nametr);
		name1.anchorOffsetX = name1.width;
		name1.anchorOffsetY = name1.height;
		this.name_1.addChild(name1);
		let rate1 = new egret.Bitmap(ratetr);
		rate1.anchorOffsetX = rate1.width;
		rate1.anchorOffsetY = rate1.height;
		this.rate_1.addChild(rate1);

		let name2 = new egret.Bitmap(nametr);
		name2.anchorOffsetX = name2.width;
		name2.anchorOffsetY = name2.height;
		this.name_2.addChild(name2);
		let rate2 = new egret.Bitmap(ratetr);
		rate2.anchorOffsetX = rate2.width;
		rate2.anchorOffsetY = rate2.height;
		this.rate_2.addChild(rate2);

		let name3 = new egret.Bitmap(nametr);
		name3.anchorOffsetX = name3.width;
		name3.anchorOffsetY = name3.height;
		this.name_3.addChild(name3);
		let rate3 = new egret.Bitmap(ratetr);
		rate3.anchorOffsetX = rate3.width;
		rate3.anchorOffsetY = rate3.height;
		this.rate_3.addChild(rate3);
	}
}