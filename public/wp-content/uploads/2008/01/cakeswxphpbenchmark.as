package {
	import flash.display.Sprite;
	import flash.net.NetConnection;
	import flash.net.Responder;

	public class CakeSWXPHPBenchmark extends Sprite
	{
		
		private var testCount:uint;
		private var maxTests:uint;
		private var startTime:uint;
		private var totalTime:uint;
		
		public function CakeSWXPHPBenchmark()
		{
			maxTests = 10;
			startCake12Test();
		}
		
		private function startAmfPHPTest():void{
			startTest(testAmfPHP);
		}
		
		private function startCake11Test():void{
			startTest(testCake11);
		}
		
		private function startCake12Test():void{
			startTest(testCake12);
		}
		
		private function startTest(testFunction:Function):void{
			testCount = 0;
			totalTime = 0;
			testFunction();
		}
		
		private function testAmfPHP():void{
			executeAmfCall("http://localhost/amfphp/gateway.php", echoAmfPHPDataResult);
		}
		
		private function echoAmfPHPDataResult(result:Object):void{
			showCallReport("AMFPHP", testAmfPHP);
		}
		
		private function testCake11():void{
			executeAmfCall("http://localhost/cakephp/projects_1.1/cakeswxphp_test/amf.php", echoTestCake11DataResult);
		}
		
		private function echoTestCake11DataResult(result:Object):void{
			showCallReport("CakePHP 1.1", testCake11);
		}
		
		private function testCake12():void{
			executeAmfCall("http://localhost/cakephp/projects_1.2/cakeswxphp_test/amf.php", echoTestCake12DataResult);
		}
		
		private function echoTestCake12DataResult(result:Object):void{
			showCallReport("CakePHP 1.2", testCake12);
		}
		
		private function executeAmfCall(gatewayURL:String, resultFunction:Function):void{
			testCount++;
			var someComplexData:Object = 
			[
				 	1, 2, -3.14, true, "hello	dolly & &copy; © \"yes\", 'no'", "line\nbreak", {arr: ['e', 'f', 'g']}, 
					[7, 8, 9],  null, {x:1 , y:2, z:3}, 5.6, 8.7,
					[true, false, ['a', 'b', 'c']], "omg it's actually working!",
					[4,5,6], {h:1.2, i:2.4, doggy:{yes: 'sir', no: 'sir'}}
			];
			var nc:NetConnection = new NetConnection();
			nc.connect(gatewayURL);
			startTime = new Date().getTime();
			nc.call("SwxTestsController.echoData", new Responder(resultFunction), someComplexData);
		}
		
		private function showCallReport(method:String, nextFunction:Function):void{
			var diff:uint = new Date().getTime() - startTime;
			totalTime += diff;
			trace(method + ": " + diff + "ms");
			if(testCount < maxTests){
				nextFunction();
			}else{
				showTotalTestReport(method);
			}
		}
		
		private function showTotalTestReport(method:String):void{
			var average:uint = totalTime / maxTests;
			trace(method + " total time for " + maxTests + " calls: " + totalTime + "ms");
			trace(method + " average time: " + average + "ms");
		}
	}
}
