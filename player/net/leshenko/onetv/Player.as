package net.leshenko.onetv
{
    import flash.display.Sprite;
    import flash.display.StageAlign;
    import flash.display.StageScaleMode;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.external.ExternalInterface;

    import org.osmf.elements.F4MElement;
    import org.osmf.events.*;
    import org.osmf.layout.*;
    import org.osmf.media.MediaPlayer;
    import org.osmf.media.MediaPlayerSprite;
    import org.osmf.media.URLResource;
    import org.osmf.traits.*;
    import org.osmf.utils.OSMFSettings;

    public class Player extends Sprite
    {

        static private const F4M_URL:String = "http://edge2.1internet.tv/phds-live12/livepkgr/_definst_/1tv-hd.f4m";
        static private const BUFFER_TIME_SECONDS:Number = 15;

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

            _player = new MediaPlayer();
            _player.autoPlay = true;
            _player.bufferTime = BUFFER_TIME_SECONDS;
            _player.addEventListener(TimeEvent.CURRENT_TIME_CHANGE, onCurrentTimeChange);
            _player.addEventListener(MediaPlayerStateChangeEvent.MEDIA_PLAYER_STATE_CHANGE, onPlayerStateChange);
            _player.addEventListener(MediaErrorEvent.MEDIA_ERROR, onMediaError);

            createMedia();

            _sprite = new MediaPlayerSprite(_player);
            addChild(_sprite);

            stage.addEventListener(MouseEvent.CLICK, onClick);
            stage.addEventListener(Event.RESIZE, onStageResize);

            ExternalInterface.addCallback("playerPlay", externalPlay);
            ExternalInterface.addCallback("playerPause", externalPause);
            ExternalInterface.addCallback("ping", externalPing);

            Log.d("Player class loaded");
        }

        private function createMedia():void
        {
            var today:Date = new Date();
            var resource:URLResource = new URLResource(F4M_URL + "?e=" + today.getTime());
            var element:F4MElement = new F4MElement(resource);
            element.addMetadata(LayoutMetadata.LAYOUT_NAMESPACE, _layout);

            _player.media = element;
        }

        private function onCurrentTimeChange(e:TimeEvent):void
        {
            /* Log.d("Time changed! " + e.time); */
        }

        private function onPlayerStateChange(e:MediaPlayerStateChangeEvent):void
        {
			var capitalized:String = e.state.slice(0, 1).toUpperCase() + e.state.slice(1);
			ExternalInterface.call("OnetvStateTracker.onStateChange", capitalized);
        }

        private function onMediaError(e:MediaErrorEvent):void
        {
            Log.d("Media error! " + e.error);
            Log.d("Reloading...");
            createMedia();
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

        private function externalPlay():void
        {
            if (_player.canPlay) {
                _player.play();
            } else {
                _player.autoPlay = true;
            }
        }

        private function externalPause():void
        {
            if (_player.canPause) {
                _player.pause();
            } else {
                _player.autoPlay = false;
            }

        }

        private function externalPing(val:int):int
        {
            return val;
        }

    }
}
