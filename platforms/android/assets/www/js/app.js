var harkka11 = angular.module("harkka11", ["ionic", "ngCordova"]);
//pitää paketoida ion-contetin setit olioo (data.nimi), jos scopen näkyvyydessä ongelmia


harkka11.controller("harkka11Ctrl", function ($scope, $ionicPopup, $http, $interval) {

      function haetiedot() {
       $http({
            method : "GET",
            url : "http://192.168.1.84/ws/latkapeli.php"  
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
     };
    
$interval(haetiedot, 2000, 0);
   
$scope.munTyyli = {   
                        "padding-bottom" : "14px"
                    };
   $scope.munTyyliTitle = {   
                        "text-align" : "center",
                        "text-shadow" : "1px 1px #ffffff",
                        "color" : "#053369"
                    };
    
}); 