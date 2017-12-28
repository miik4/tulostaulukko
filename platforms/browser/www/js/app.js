var harkka11 = angular.module("harkka11", ["ionic", "ngCordova"]);
//pitää paketoida ion-contetin setit olioo (data.nimi), jos scopen näkyvyydessä ongelmia


harkka11.controller("harkka11Ctrl", function ($scope, $ionicPopup, $http) {

      
       $http({
            method : "GET",
            url : "http://localhost/ws/latkapeli.php"  
         })
         .then
        (function (response) { //Onnistunut http-pyyntö
             $scope.pelaajantiedot = response.data;
         }, 
         function (response) { //Epäonnistunut http-pyyntö
             var virhekoodi = response.status;
             
             $ionicPopup.alert({
                                "title" : "Yhteysvirhe",
                                "template" : "Yhteys palvelimelle epäonnistui. ("+ virhekoodi + ")"
                                });
         }); 
      
    
   
$scope.munTyyli = {   
                        "padding-bottom" : "14px"
                    };
   $scope.munTyyliTitle = {   
                         "text-align" : "center"
                    };
    
});