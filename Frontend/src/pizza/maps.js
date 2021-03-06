
var directionDisplay = new google.maps.DirectionsRenderer();
function initMap() {
//Тут починаємо працювати з картою
    //var directionsDisplay= new google.maps.DirectionsRenderer();

    //var directionService = new google.maps.DirectionsService();
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 8
    };
    var html_element = document.getElementById("map");
    var map = new google.maps.Map(html_element, mapProp);
    //directionsRenderer.setMap(map);
//Карта створена і показана
    var point = new google.maps.LatLng(50.464379, 30.519131);
    //var map=new	google.maps.Map(html_element,	 mapProp);
    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: "assets/images/map-icon.png"
    });
    var parker = new google.maps.Marker({

        icon: "assets/images/home-icon.png"
    });
    //google.maps.event.addListener(map,'click',function(me){
    //me.getCurrentPosition()
    //var coordinates	=	new	google.maps.LatLng(	me.latLng);
    google.maps.event.addListener(map,
        'click', function (me) {
            var coordinates = me.latLng;
            geocodeLatLng(coordinates, function (err, adress,address_latlng) {
                if (!err) {
//Дізналися адресу
                    console.log(adress);
                    parker.setMap(null);
                    parker.setPosition(address_latlng);
                    parker.setMap(map);
                    $('#3').val(adress);
                    $('span#user_address').text(adress);
                    calculateRoute(point, adress,map, function (err, address) {
                        if (!err) {
//Дізналися адресу
                            console.log(address);
                            $('#time_delivery').text(address.duration.text);


                        } else {
                            console.log("Час не визначено")
                        }
                    })
                } else {
                    console.log("Немає адреси")
                }
            })
            //console.log(geocodeLatLng(coordinates));
        });
    //
    ////////console.log(me);
    //console.log('Coordinates'+coordinates);

    //});
    $("#enter").on('click', function () {
        //if (event.keyCode === 13) {}
        //alert('You pressed enter!');
        var address = document.getElementById('3').value;
        var A = new google.maps.LatLng(50.464379, 30.519131);
        //var address=$("#inputAddress").val();
        console.log(address);
        //alert('You pressed enter!');
        geocodeAddress(address, function (err, address) {
            if (!err) {
//Дізналися адресу
                console.log(address);
                var parker = new google.maps.Marker({
                    position: address,
                    map: map,
                    icon: "assets/images/home-icon.png"
                });
                var request = {
                    origin: A,
                    destination: address,
                    travelMode: 'DRIVING'
                };
                directionsService.route(request, function (result, status) {
                    if (status == 'OK') {
                        directionsRenderer.setDirections(result);
                        calculateRoute(A, address,map, function (err, address) {
                            if (!err) {
//Дізналися адресу
                                console.log(address);


                            } else {
                                console.log("Час не визначено")
                            }
                        })
                        //console.log(geocodeLatLng(coordinates));
                    }

                    alert("You have clicked");
                });

            } else {
                console.log("Немає адреси")
            }

        });


    });
}

function geocodeLatLng(latlng, callback) {
//Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var adress = results[1].formatted_address;
            callback(null, adress, latlng);
        } else {
            callback(new Error("Can't	find	adress"));
        }
    });
}

function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find	the	adress"));
        }
        //console.log(coordinates);
    });

}

// function check() {
//     var address = document.getElementById('inputAddress').value;
//     var A=new	google.maps.LatLng(50.464379,30.519131);
//     //var address=$("#inputAddress").val();
//     geocodeAddress(address,function(err,	address){
//         if(!err)	{
// //Дізналися адресу
//             console.log(address);
//
//         }	else	{
//             console.log("Немає адреси")
//         }
//     });
//     //console.log(geocodeLatLng(coordinates));
//     console.log(address);
//
// }
// $("#inputAddress").on('keypress',function(event){
//     if (event.keyCode === 13) {
//     alert('You pressed enter!');
//         var address = document.getElementById('inputAddress').value;
//         //var A=new	google.maps.LatLng(50.464379,30.519131);
//         //var address=$("#inputAddress").val();
//         console.log(address);
//         geocodeAddress(address,function(err,	address){
//             if(!err)	{
// //Дізналися адресу
//                 console.log(address);
//
//             }	else	{
//                 console.log("Немає адреси")
//             }
//         });
//
//     }
// });
function calculateRoute(A_latlng, B_latlng,map ,callback) {

    directionDisplay.setMap(null);
    directionDisplay.setMap(map);
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var leg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
            directionDisplay.setDirections(response);

        } else {
            callback(new Error("Can'	not	find	direction"));
        }
    });
}

//google.maps.event.addDomListener(window,'load',initMap);


exports.initMap = initMap;