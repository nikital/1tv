package
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;

	public class Player extends Sprite
	{
		public function Player()
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;

			var test:Sprite = new Sprite();
			test.graphics.beginFill(0xFF00FF);
			test.graphics.drawRect(0, 0, 40, 40);
			addChild(test);
			trace("Hello world!");
		}
	}
}
