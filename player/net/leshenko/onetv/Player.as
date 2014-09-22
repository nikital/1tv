package net.leshenko.onetv
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;

	import org.osmf.elements.F4MElement;
	import org.osmf.layout.LayoutMetadata;
	import org.osmf.layout.ScaleMode;
	import org.osmf.media.MediaPlayer;
	import org.osmf.media.MediaPlayerSprite;
	import org.osmf.media.URLResource;

	public class Player extends Sprite
	{
		private var _layout:LayoutMetadata;
		private var _player:MediaPlayer;
		private var _sprite:MediaPlayerSprite;
		private var _seek:Number;

		public function Player()
		{
			super();

			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;

			_layout= new LayoutMetadata();
			_layout.scaleMode = ScaleMode.LETTERBOX;
			_layout.width = stage.stageWidth;
			_layout.height = stage.stageHeight;

			var resource:URLResource = new URLResource("http://edge1.1internet.tv/phds-live11/livepkgr/_definst_/1tv-hd.f4m");
			var element:F4MElement = new F4MElement(resource);
			element.addMetadata(LayoutMetadata.LAYOUT_NAMESPACE, _layout);

			_player = new MediaPlayer();
			_player.autoPlay = true;
			_player.media = element;

			_sprite = new MediaPlayerSprite(_player);
			addChild(_sprite);

			_seek = 5;

			stage.addEventListener(MouseEvent.CLICK, onClick);
			stage.addEventListener(Event.RESIZE, onStageResize);
		}

		private function onClick(e:MouseEvent):void
		{
			Log.d(_player.currentTime + " " + _player.duration);
			Log.d("Seek to: " + _seek);

			Log.d("mouseX: " + e.stageX);
			_layout.width = e.stageX;

			/* _player.seek(_seek); */
			/* _seek += 5; */
		}

		private function onStageResize(e:Event):void
		{
			_layout.width = stage.stageWidth;
			_layout.height = stage.stageHeight;
		}
	}
}
