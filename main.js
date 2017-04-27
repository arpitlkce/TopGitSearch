var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
 
 $scope.searchedItem = "PHP"; 
  $scope.myWelcome = null;
    
//Range slider config
  $scope.rangeSlider = {
    value: 500,
	options: {
			floor: 0,
            ceil: 5000,
            showSelectionBarEnd: true
        }
  };

  
  $http.get("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json")
  .then(function(response) {
	 $scope.languages = [];
		angular.forEach(response.data, function(value, key) {
		this.push(value);
		}, $scope.languages);
  });
  
	$scope.clearSearch = function () {
    $scope.searchedItem = ""; 
  };
  
   $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}
  

  $scope.search = function(){
  $scope.viewby = 4;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5;
  $http.get("https://api.github.com/search/repositories?q=stars:>="+$scope.rangeSlider.value+" language:"+$scope.searchedItem)
  .then(function(response) {
  	  $scope.header = response.headers();
	   $scope.keys = Object.keys($scope.header);
      $scope.myWelcome = response.data;
	      $scope.myData =   $scope.myWelcome.items;
			$scope.totalItems = $scope.myData.length;

		 
  });
  }
  $scope.search();
});
