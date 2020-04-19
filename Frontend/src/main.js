/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var googleMap = require('./pizza/maps');
    var Order = require('./pizza/order');
    var liqpay = require('./pizza/liqpay');
     isExisting1 = false;
     isExisting2 = false;
     isExisting3 = false;
    // var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    //googleMap.initMap();
    if ($("#map").length > 0) {
        var Map = require('./pizza/maps');
        Map.initMap();
    }

    $('#1').focusout(function () {
        var sentenceRegex =/^\D+$/;
        var myValue = this.value;
        //console.log(myValue);
        //console.log('Sentences: ', myValue.match(sentenceRegex) );

        isExisting1 = sentenceRegex.test(myValue);
        //isExisting1=myValue.matches("^[a-zA-Z]*$");
        console.log(isExisting1);
        if (isExisting1 == true) {
            isExisting1 = true;
            $('#1').css("border", " 1px solid green");


            //$('#sign_in').attr("disabled","false");
        } else {
            isExisting1 = false;
            $('#1').css("border", " 1px solid red");
            $('#nameHelp').css("visibility", "visible");
            //$('#sign_in').attr("disabled","true");
            //$('#first_input').text ('Пожалуйста, введите правильное имя.');
        }
        check(isExisting1,isExisting2,isExisting3);
    });
    $('#2').focusout(function () {
        var sentenceRegex = /^[+]380?[0-9]{9}$/;
        var myValue = this.value;
        console.log(myValue);
         isExisting2 = sentenceRegex.test(myValue);
        console.log(isExisting2);
        if (isExisting2 == true) {
            isExisting2 = true;
            $('#2').css("border", " 1px solid green");
            //$('#sign_in').attr("disabled","false");

        } else {
            //isExisting2=false;
            $('#2').css("border", " 1px solid red");
            $('#numberHelp').css("visibility", "visible");
            //$('#sign_in').attr("disabled","true");

        }
        check(isExisting1,isExisting2,isExisting3);
    });
    $('#3').focusout(function () {
        var sentenceRegex = /.*\S.*/;
        var myValue = this.value;
        console.log(myValue);
        isExisting3 = sentenceRegex.test(myValue);
        console.log(isExisting3);
        if (isExisting3 == true) {
            isExisting3 = true;
            $('#3').css("border", " 1px solid green");
            //$('#sign_in').attr("disabled","false");
        } else {
            //isExisting3=false;
            $('#3').css("border", " 1px solid red");
            $('#numberEmail').css("visibility", "visible");
            //$('#sign_in').attr("disabled","true");
        }
        //console.log(isExisting1,isExisting2,isExisting3);
        check(isExisting1,isExisting2,isExisting3);
    });

    // $('#sign_in').keyup(function() {
    //


    //     liqpay.initialize();
    // });
    $('#sign_in').click(function () {
        //Order.createOrder();
        console.log(isExisting1, isExisting2, isExisting3);
        alert('You have clicked');

        liqpay.initialize();
    });

});
function check(isExisting1, isExisting2, isExisting3){
    console.log(isExisting1, isExisting2, isExisting3);
    if (isExisting1 == true && isExisting2==true && isExisting3==true) {

        $('#sign_in').removeAttr("disabled");


    }
    else{
        $('#sign_in').attr("disabled","true");
        console.log('Wrong condition');
    }
}