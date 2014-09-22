package
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.MouseEvent;

	import org.osmf.elements.F4MElement;
	import org.osmf.media.MediaPlayer;
	import org.osmf.media.MediaPlayerSprite;
	import org.osmf.media.URLResource;

	public class Player extends Sprite
	{
		private var _player:MediaPlayer;
		private var _sprite:MediaPlayerSprite;

		public function Player()
		{
			super();

			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;

			var resource:URLResource = new URLResource("http://edge1.1internet.tv/phds-live11/livepkgr/_definst_/1tv-hd.f4m");
			var element:F4MElement = new F4MElement(resource);

			_player = new MediaPlayer();
			_player.autoPlay = true;
			_player.media = element;

			_sprite = new MediaPlayerSprite(_player);
			addChild(_sprite);

			stage.addEventListener(MouseEvent.CLICK, onClick);
		}

		private function onClick(e:MouseEvent):void
		{
			Log.d(_player.currentTime + " " + _player.duration);
			Log.d(_player.drmState);

			_player.seek(1000*10);

			/* if (_player.playing) */
			/* { */
			/* 	_player.pause(); */
			/* } */
			/* else */
			/* { */
			/* 	_player.play(); */
			/* } */
		}
	}
}
