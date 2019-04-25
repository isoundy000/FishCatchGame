module burn.event {
	/**
	 * Scroll components event
	 * @author ituuz
	 * @since 2017.01.19
	 * @link http://www.ituuz.com 
	 */
	export class ScrollEvent extends egret.Event {
		
		/** click scroll item */
		public static CLICK:string = "click_scroll_item";
		/** view scroll end */
		public static SCROLL_END:string = "view_scroll_end";

		public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
			super(type,bubbles,cancelable);
		}

	}
}