package net.leshenko.onetv
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;

	import org.osmf.elements.F4MElement;
	import org.osmf.events.TimeEvent;
	import org.osmf.layout.HorizontalAlign;
	import org.osmf.layout.LayoutMetadata;
	import org.osmf.layout.ScaleMode;
	import org.osmf.layout.VerticalAlign;
	import org.osmf.media.MediaPlayer;
	import org.osmf.media.MediaPlayerSprite;
	import org.osmf.media.URLResource;
	import org.osmf.traits.DVRTrait;
	import org.osmf.traits.MediaTraitType;
	import org.osmf.traits.TimeTrait;

	public class Player extends Sprite
	{
		static private const F4M_URL:String = "http://edge1.1internet.tv/phds-live11/livepkgr/_definst_/1tv-hd.f4m";

		private var _layout:LayoutMetadata;
		private var _player:MediaPlayer;
		private var _sprite:MediaPlayerSprite;

		public function Player()
		{
			super();

			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.color = 0;

			_layout= new LayoutMetadata();
			_layout.scaleMode = ScaleMode.LETTERBOX;
			_layout.verticalAlign = VerticalAlign.MIDDLE;
			_layout.horizontalAlign = HorizontalAlign.CENTER;
			_layout.width = stage.stageWidth;
			_layout.height = stage.stageHeight;

			var resource:URLResource = new URLResource(F4M_URL);
			var element:F4MElement = new F4MElement(resource);
			element.addMetadata(LayoutMetadata.LAYOUT_NAMESPACE, _layout);

			_player = new MediaPlayer();
			_player.autoPlay = true;
			_player.media = element;
			_player.addEventListener(TimeEvent.CURRENT_TIME_CHANGE, onCurrentTimeChange);

			_sprite = new MediaPlayerSprite(_player);
			addChild(_sprite);

			stage.addEventListener(MouseEvent.CLICK, onClick);
			stage.addEventListener(Event.RESIZE, onStageResize);
		}

		private function onCurrentTimeChange(e:TimeEvent):void
		{
			Log.d("Time changed! " + e.time);
		}

		private function onClick(e:MouseEvent):void
		{
			Log.d(_player.currentTime + " " + _player.duration);
		}

		private function onStageResize(e:Event):void
		{
			_layout.width = stage.stageWidth;
			_layout.height = stage.stageHeight;
		}
	}
}
