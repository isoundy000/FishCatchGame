
class MonthCardRewardMediator extends burn.mediator.SimpleMediator {

	public constructor(view: burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as MonthCardRewardView).initView();
	}

	public init(): void {

	}

	public update(): void {

	}

	public destroy(): void {
		this.getView().destroy();
	}
	
}
