var app = angular.module('myApp', ['rzModule', 'ui.bootstrap']);
app.controller('myCtrl', function($scope, $http,myService) {
 
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

  myService.fetchLanguage().then(function(response) {
   $scope.languages = [];
    angular.forEach(response.data, function(value, key) {
    this.push(value);
    }, $scope.languages);
  });
  //$http.get("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json")
  
  
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
  myService.fetchItems($scope.rangeSlider.value,$scope.searchedItem).then(function(response) {
        $scope.header = response.headers();
        $scope.keys = Object.keys($scope.header);
        $scope.myWelcome = response.data;
        $scope.myData =   $scope.myWelcome.items;
        $scope.totalItems = $scope.myData.length;

       
    });
  }
  $scope.search();
});

app.service('myService', function($http) {

  this.fetchLanguage = function() {
      return $http.get("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json");
  }

  this.fetchItems = function(sliderValue,searchedItem) {
      return $http.get("https://api.github.com/search/repositories?q=stars:>="+sliderValue+" language:"+searchedItem);
  }


});




