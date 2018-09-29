app.controller('searchController',function($scope,$location,searchService){
	//定义搜索对象的结构 category：商品分类
	$scope.searchMap={'keywords':'','category':'','brand':'','spec':{},'price':'','pageNo':'','pageSice':'','sort':'','sortField':''}

	//搜索
	$scope.search=function(){
		$scope.searchMap.pageNo=parseInt($scope.searchMap.pageNo);//转换为数字
		searchService.search($scope.searchMap).success(
				function(response){
					$scope.resultMap=response;//搜索返回的结果
					buildPageLable();//调用分页方法
				}
		);
	}
	
	//构建分页标签  totalPages为总页数
	buildPageLable=function(){
		$scope.pageLable=[];//新增分页栏属性
		var firstPage=1;//开始页码
		var lastPage=$scope.resultMap.totalPages;//最后页码
		$scope.firstDot=true;//前面有点
		$scope.lastDot=true;//后面有点
		if ($scope.resultMap.totalPages>5) {//如果总页码大于5就显示部分页码
			if ($scope.searchMap.pageNo<=3) {//如果当前页码小于等于3
				lastPage=5;//最后页等于5
				$scope.firstDot=false;//前面没点
			} else if ($scope.searchMap.pageNo>=$scope.resultMap.totalPages-2) {//如果当前页码大于等于最大页码-2
				firstPage=$scope.resultMap.totalPages-4;//初始页等于最大页-4
				$scope.lastDot=false;//后面没点
			} else {//显示当前页为中心的5页
				firstPage=$scope.searchMap.pageNo-2;
				lastPage=$scope.searchMap.pageNo+2;
			}
		} else {
			$scope.firstDot=false;//前面没点
			$scope.lastDot=false;//后面没点
		}
		
		//循环产生页码标签
		for (var i=firstPage;i<=lastPage;i++) {
			$scope.pageLable.push(i);
		}
		
		
	}
	
		//添加搜索项 改变searchMap的值
	$scope.addSearchItem=function(key,value){
		if (key=='category' || key=='brand' || key=='price') {//如果点击的是分类或者品牌
			$scope.searchMap[key]=value;
		} else {//用户点击的是规格
			$scope.searchMap.spec[key]=value;
		}
		$scope.search();//执行搜索
	}
	
	//移除复合搜索条件
	$scope.removeSearchItem=function(key,value){
		if (key=='category' || key=='brand' || key=='price') {//如果点击的是分类或者品牌
			$scope.searchMap[key]='';
		} else {//用户点击的是规格
			delete $scope.searchMap.spec[key];
		}
		$scope.search();//执行搜索

	}
	
	//根据页码查询
	$scope.queryByPage=function(pageNo){
		//页码验证
		if (pageNo < 1 || pageNo > $scope.resultMap.totalPages) {
			return;
		}
		$scope.searchMap.pageNo=pageNo;
		$scope.search();
	}
	
	//判断当前页码为第一页
	$scope.isTopPage=function(){
		if ($scope.searchMap.pageNo==1) {
			return true;
		} else{
			return false;
		}
	}
	
	//判断当前页是否为最后一页
	$scope.isEndPage=function(){
		if ($scope.searchMap.pageNo==$scope.resultMap.totalPages) {
			return true;
		} else{
			return false;
		}
	}
	
	//设置排序规则
	$scope.sortSearch=function(sortField,sort){
		$scope.searchMap.sortField=sortField;
		$scope.searchMap.sort=sort;
		$scope.search();
	}
	
	//判断关键字是否是品牌
	$scope.keywordsIsBrand=function(){
		for (var i=0;i<$scope.resultMap.brandList.length;i++ ) {
			if ($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text) >= 0) {
				//如果包含
				return true;
			}
		}
		return false;
	}
	
	//加载查询字符串
	$scope.loadKeywords=function(){
		$scope.searchMap.keywords=$location.search()['keywords'];
		$scope.search();
	}
	
});