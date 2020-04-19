function check() {
    var address = document.getElementById('inputAddress').value;
    console.log(address);
    //calculateAndDisplayRoute(directionsService,directionsDisplay, pizzeria, address);
}
$("#inputAddress").on('keypress',function(){
    //if(e === 13) {
        //alert('You pressed enter!');

        //alert('You pressed a "enter" key in somewhere');
        //event.preventDefault();
        check();
    //}
});

function createOrder(){
    var data ={
        'fullName': $('#1').val(),
        'phoneNumber': $('#2').val(),
        'address': $('#3').val()
    }
    $.ajax({
        url:'http://localhost:5050/api/create-order/',
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    });
}
// $('#sign_in').click(function () {
// //     createOrder();
// //  });
exports.createOrder=createOrder;