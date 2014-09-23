package net.leshenko.onetv
{
    import flash.external.ExternalInterface;

    public class Log
    {
        static public function d(s:String):void
        {
            ExternalInterface.call("console.log",s);
        }
    }
}
