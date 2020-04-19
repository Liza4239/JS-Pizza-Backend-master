function initialize() {
    var order2= require('./PizzaCart.js');
    console.log("Here");
    var crypto = require('crypto');

    function sha1(string) {
        var sha1 = crypto.createHash('sha1');
        sha1.update(string);
        return sha1.digest();
    }

    function base64(str) {
        return new Buffer(str).toString('base64');
    }


    //var contacts = " Ім'я: " +$('#inputEmail4').value()  ;
    var order = {
        version: 3,
        public_key: "sandbox_i16644753868",
        action: "pay",
        amount: 568,
        currency: "UAH",

        description: $('#1').val()+'\n'+$('#2').val()+'\n'+$('#3').val()+'\n'+order2.getPizzaInCart().map(),
        order_id: Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox: 1
    }


    var data = base64(JSON.stringify(order));
    var signature = base64(sha1("sandbox_ksFAlabPcrQtLdse0yYMNxzeTqWROSNNV6gi631m"
        + data + "sandbox_ksFAlabPcrQtLdse0yYMNxzeTqWROSNNV6gi631m"
    ));
    console.log(">>>>>>", data, signature);
    LiqPayCheckout.init({
        data: data,
        signature: signature,
        embedTo: "#liqpay",
        mode: "popup"	//	embed	||	popup
    }).on("liqpay.callback", function (data) {
        console.log(data.status);
        console.log(data);
    }).on("liqpay.ready", function (data) {
//	ready
    }).on("liqpay.close", function (data) {
//	close
    });


}

exports.initialize = initialize;