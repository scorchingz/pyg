app.controller('baseController',function($scope){
	//分页控件配置
	$scope.paginationConf = {
		currentPage : 1,//当前页码
		totalItems : 10,//总记录数
		itemsPerPage : 10,//每页的记录数
		perPageOptions : [ 10, 20, 30, 40, 50 ],//分页选项
		onChange : function() {
			$scope.reloadList();
		}
	};
	//刷新列表
	$scope.reloadList = function() {
		$scope.search($scope.paginationConf.currentPage,
				$scope.paginationConf.itemsPerPage);
	}
	//更新复选
	$scope.selectIds = [];//选中的id集合
	$scope.updateSelection = function($event ,id){
		if ($event.target.checked){
			$scope.selectIds.push(id);//向集合添加元素
		} else{
			var index = $scope.selectIds.indexOf(id);//查找值的位置
			$scope.selectIds.splice(index,1);//参数1：移除的位置 参数2：移除的个数
		}
	}
	
	 
	//提取json字符串数据中某个属性，返回拼接字符串 逗号分隔 
	$scope.jsonToString=function(jsonString,key){
		var json = JSON.parse(jsonString);//将json字符串转换成json对象
		var value = "";
		for (var i=0;i<json.length;i++){
			if (i>0) {
				value+=",";
			}
			value+=json[i][key];
		}
		return value;
		
	}
	
});