class SettingMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as SettingView).initView();
		this.subscrib(NotifyEnum.CHANGE_SETTING, this.changeStateX);
	}

	public init():void {
		
	}
    public changeStateX(obj:any, target:any):void
    {
        let view = (target.getView() as SettingView);
        if (obj == null) {
            view.changeMusicState(game.util.SoundManager.getBackgroundMusicState());
            view.changeSoundState(game.util.SoundManager.getSoundEffectState());
            return;
        }
        if (obj.type == "music") {
            game.util.SoundManager.setBackgroundMusicState(!game.util.SoundManager.getBackgroundMusicState());
            view.changeMusicState(game.util.SoundManager.getBackgroundMusicState());
        } else if (obj.type == "sound") {
            game.util.SoundManager.setSoundEffectState(!game.util.SoundManager.getSoundEffectState());
            view.changeSoundState(game.util.SoundManager.getSoundEffectState());
        }
    }
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.CHANGE_SETTING);
	}
}