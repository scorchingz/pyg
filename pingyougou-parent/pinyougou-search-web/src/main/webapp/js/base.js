var app = angular.module('pinyougou', []);

//定义过滤器
app.filter('trustHtml',['$sce',function($sce){
	return function(data){//传入的参数是 被过滤的内容
		return $sce.trustAsHtml(data);//返回的是被过滤后的内容（信任html的转换）
	}
}]);