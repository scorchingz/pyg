//商品详细页（控制层）
app.controller('itemController',function($scope){

	//记录用户选择的规格
	$scope.specificationItems={};

	//数量加减
	$scope.addNum=function(x){
		$scope.num+=x;
		if ($scope.num<1) {
			$scope.num=1;
		}
	}
	
	//用户选择规格
	$scope.selectSpecification=function(key,value){
		$scope.specificationItems[key]=value;
			searchSku();//读取sku
	}
	$scope.isSelect=function(key,value){
		if($scope.specificationItems[key]==value){
			return true;
		} else {
			return false;
		}
	}
	
	$scope.sku={};//当前选择的sku 
	//加载默认SKU
	$scope.loadSku=function(){
		$scope.sku=skuList[0];
		$scope.specificationItems=JSON.parse(JSON.stringify($scope.sku.spec));
	}
	
	//匹配两个对象
	matchObject=function(map1,map2){
		for (var k in map1) {
			if (map1[k]!=map2[k]) {
				return false;
			}
		}
	
		for (var k in map2) {
				if (map2[k]!=map1[k]) {
					return false;
				}
			}
			return true;
	}
	
	//查询SKU
	
	searchSku=function(){
		for (var i=0;i<skuList.length;i++) {
			if (matchObject(skuList[i].spec,$scope.specificationItems)) {
				$scope.sku=skuList[i];
				return;
			}
		}
		$scope.sku={id:0,title:'----',price:0};//如果没有匹配的
	}
	
	//添加商品到购物车
	$scope.addToCart=function(){
		alert('skuid'+$scope.sku.id);
	}
	
});