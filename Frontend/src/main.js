/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var googleMap=require('./pizza/maps');
    var Order = require('./pizza/order');


    // var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    //googleMap.initMap();
    if($("#map").length>0){
        var Map = require('./pizza/maps');
        Map.initMap();
    }
$('#sign_in').click (function() {
    alert('You have clicked');
    var liqpay = require('./pizza/liqpay');
    liqpay.initialize();
});
//     var liqpay = require('./pizza/liqpay');
//     liqpay.initialize();
  //liqpay.initialize();
});
