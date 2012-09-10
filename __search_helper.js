var map;
var prevRes;

var terminalPolygons = [];
var showBorders = false;

function MapWorker($) {
    var that = this;
    var from,to,waypoints,number_of_segments, cur_point_index, cur_point, next_point_index, next_point,  circular_road_km, circular_road_min, suburb_km, suburb_min, duration;
    var $from,$to,traffic,suburb_serve_km,suburb_serve_min;

    var meetingNeeded = false;
    var needRefreshPrice = false;

    var carTypesNames = ["econom","comfort","business","premium"];
    var carType = carTypesNames[0];
    var sheremetevo = "Московская область, аэропорт Шереметьево";
    var vnukovo = "Московская область, аэропорт Внуково";
    var domodedovo = "Московская область, аэропорт Домодедово";

    function createMap() {
        map = new YMaps.Map($("#YMapsID").get(0));
        map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
        map.addControl(new YMaps.Zoom());
        map.enableScrollZoom(true);
        map.addControl(new YMaps.Traffic.Control(), new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Point(5, 5)));

        var style,style2;
        if (showBorders) {
            style = new YMaps.Style("default#greenPoint");
            style.polygonStyle = new YMaps.PolygonStyle();
            style.polygonStyle.fill = 1;
            style.polygonStyle.outline = 1;
            style.polygonStyle.strokeWidth = 3;
            style.polygonStyle.strokeColor = "ffffff";
            style.polygonStyle.fillColor = "ff000055";
            YMaps.Styles.add("polygon#Example", style);

            style2 = new YMaps.Style("default#greenPoint");
            style2.polygonStyle = new YMaps.PolygonStyle();
            style2.polygonStyle.fill = 1;
            style2.polygonStyle.outline = 1;
            style2.polygonStyle.strokeWidth = 3;
            style2.polygonStyle.strokeColor = "ffffff";
            style2.polygonStyle.fillColor = "00ff0055";
            YMaps.Styles.add("polygon#Example2", style2);
        } else {
            style = new YMaps.Style("default#greenPoint");
            style.polygonStyle = new YMaps.PolygonStyle();
            style.polygonStyle.fill = 0;
            style.polygonStyle.outline = 0;
            style.polygonStyle.strokeWidth = 0;
            YMaps.Styles.add("polygon#Example", style);

            style2 = new YMaps.Style("default#greenPoint");
            style2.polygonStyle = new YMaps.PolygonStyle();
            style2.polygonStyle.fill = 0;
            style2.polygonStyle.outline = 0;
            style2.polygonStyle.strokeWidth = 0;
            YMaps.Styles.add("polygon#Example2", style2);
        }

        for (var i = 0; i < metro.terminals.length; i++) {
            var terminal = metro.terminals[i];
            var polygon = new YMaps.Polygon([
                new YMaps.GeoPoint(terminal.segment[0][1], terminal.segment[0][0]),
                new YMaps.GeoPoint(terminal.segment[1][1], terminal.segment[1][0]),
                new YMaps.GeoPoint(terminal.segment[2][1], terminal.segment[2][0]),
                new YMaps.GeoPoint(terminal.segment[3][1], terminal.segment[3][0])
            ], {
                style: i % 2 ? "polygon#Example" : "polygon#Example2"
            });
            YMaps.Events.observe(polygon, polygon.Events.Click, function (poly) {
                console && console.log && console.log(poly.name);
            });
            polygon.name = terminal.name;
            polygon.description = terminal.name;

            map.addOverlay(polygon);
            terminalPolygons.push(polygon);
        }
    }

    this._onCheckboxChange = function () {
        if ($(this).is(':checked')) {
            $(this).button('option', 'icons', { primary: 'ui-icon-check' });
            if ($(this).attr("id") == "meet") {
                meetingNeeded = true;
            }
        } else {
            $(this).button('option', 'icons', { primary: 'ui-icon-minus' });
            if ($(this).attr("id") == "meet") {
                meetingNeeded = false;
            }
        }
        if (needRefreshPrice) {
            if ($(this).attr("id") == "meet") {
                calcPrice();
            } else if ($(this).attr("id") == "tube") {
                $("#findButton").trigger("click");
            }
        }
    };

    this.onReady = function() {
        $('#tabs').bind('tabsshow', function(event, ui) {
            try {
                var index = ui.index;
                if (index == 0) {
                    $("#begin").val($.trim($("#begin2").val()));

                    var aeroVal = $("#aeroport2 :checked").attr("value");
                    var endVal = "";
                    if (aeroVal == "domodedovo2") {
                        endVal = domodedovo;
                    } else if (aeroVal == "vnukovo2") {
                        endVal = vnukovo;
                    } else if (aeroVal == "sheremetevo2") {
                        endVal = sheremetevo;
                    }
                    $("#end").val(endVal);

                    var carTypeVal = $("#typeMode2 :checked").attr("value");
                    if (carTypeVal == "econom2") {
                        $("#typeMode input").eq(0).click();
                    } else if (carTypeVal == "comfort2") {
                        $("#typeMode input").eq(1).click();
                    } else if (carTypeVal == "business2") {
                        $("#typeMode input").eq(2).click();
                    } else if (carTypeVal == "premium2") {
                        $("#typeMode input").eq(3).click();
                    }
                    $("#typeMode").buttonset("refresh");

                } else if (index == 1) {
                    $("#begin2").val($.trim($("#begin").val()));

                    endVal = $.trim($("#end").val());
                    if (isAeroport(endVal, domodedovo)) {
                        $("#aeroport2 input").eq(0).click();
                    } else if (isAeroport(endVal, vnukovo)) {
                        $("#aeroport2 input").eq(1).click();
                    } else if (isAeroport(endVal, sheremetevo)) {
                        $("#aeroport2 input").eq(2).click();
                    }
                    $("#aeroport2").buttonset("refresh");

                    carTypeVal = $("#typeMode :checked").attr("value");
                    if (carTypeVal == "econom") {
                        $("#typeMode2 input").eq(0).click();
                    } else if (carTypeVal == "comfort") {
                        $("#typeMode2 input").eq(1).click();
                    } else if (carTypeVal == "business") {
                        $("#typeMode2 input").eq(2).click();
                    } else if (carTypeVal == "premium") {
                        $("#typeMode2 input").eq(3).click();
                    }
                    $("#typeMode2").buttonset("refresh");
                }
                if (prevRes) {
                    map.removeOverlay(prevRes);
                }
            } catch (e) {
            }
        });
        $("#begin,#end").addClass("ui-widget ui-widget-content ui-corner-all");
        $("#findButton").button();
        $("#switchButton").button();
        $("#tube,#meet").button();
        $("#timeMode").buttonset();
        $("#typeMode").buttonset();

        $("#tube,#meet").bind('click', this._onCheckboxChange).each(this._onCheckboxChange);
        $("#timeMode input[type=radio]").click(function() {
            if (needRefreshPrice) {
                calcPrice();
            }
        });
        $('#begin,#end').focus(function() {
            needRefreshPrice = false;
        });
        yandexAutoComplete($('#begin'));
        yandexAutoComplete($('#end'));
        createMap();

        $("#switchButton").click(function() {
            var buffer = $("#begin").val();
            $("#begin").val($("#end").val());
            $("#end").val(buffer);
            $("#findButton").trigger("click");
        });
        $("#findButton").click(function() {
            if ($.trim($("#begin").val()).length && $.trim($("#end").val()).length) {
                $from = processAddress($("#begin").val());
                $to = processAddress($("#end").val());
                traffic = $("#tube").attr("checked");
                $("#findButton").button({ disabled: true });
                setTimeout(function() {
                    $("#findButton").button({ disabled: false });
                }, 1000);
                that.show($from, $to, traffic);
            } else {
                alert("Введите, пожалуйста, адреса в поля 'От' и 'До'");
            }

        });

        var searchObj;
        if ($.jStorage.get("searchObj")) {
            searchObj = $.jStorage.get("searchObj");
        } else {
            searchObj = JSON.parse($.cookie("searchObj"));
        }
        if (searchObj && searchObj.begin && searchObj.end && searchObj.carType > -1) {
            $("#begin").val(searchObj.begin);
            $("#end").val(searchObj.end);
            carType = carTypesNames[searchObj.carType];
        }
        if (carType == carTypesNames[0]) {
            $("#typeMode input").eq(0).click();
        } else if (carType == carTypesNames[1]) {
            $("#typeMode input").eq(1).click();
        } else if (carType == carTypesNames[2]) {
            $("#typeMode input").eq(2).click();
        } else if (carType == carTypesNames[3]) {
            $("#typeMode input").eq(3).click();
        }
        $("#typeMode").buttonset("refresh");

        $("#typeMode input[type=radio]").click(function() {
            carType = $("#typeMode :checked").attr("value");
//         $("#findButton").trigger("click");
        });
        $("#findButton").trigger("click");
    };

    function processAddress(address) {
        return address;
    }

    this.show = function (pre_from, pre_to, pre_traffic) {
        from = pre_from;
        to = pre_to;
        traffic = pre_traffic;

        var waypoints = [from,to];
        var router = new YMaps.Router(waypoints, [], {viewAutoApply: 1, avoidTrafficJams: traffic});
        new YMaps.Events.observe(router, router.Events.Success, extract_data_from_router);
        YMaps.Events.observe(router, router.Events.Fault, function() {
            alert('Не удалось соединиться с картографическим сервером', 'error');
        });

        // GeocodeError
        YMaps.Events.observe(router, router.Events.GeocodeError, function(object, point_number) {
            alert('Не удалось вычислить географические координаты точки "' + waypoints[point_number] + '" в регионе Москва', 'error');
        });

        //RouteError
        YMaps.Events.observe(router, router.Events.RouteError, function(object, point_number) {
            alert('Не удалось проложить маршрут к точке "' + waypoints[point_number] + '" в регионе Москва', 'error');
        });

    };

    function yandexAutoComplete($el) {
        if ($el.autocomplete) {
            $el.autocomplete("destroy")
        }
        $el.autocomplete({
            source: function(request, response) {
                var term = encodeURIComponent(request.term);
                $.ajax({
                    url : "http://suggest-maps.yandex.ru/suggest-geo?format=json&_=1300282255720&ll=37.609218%2C55.753559" +
                        "&spn=2.223358%2C0.534389&highlight=1&fullpath=1&sep=1&search_type=all&part=" + term,
                    dataType : "jsonp",
                    success : function(data) {
                        response($.map(data[1], function(item) {
                            if ((item[0] == "maps" || item[0] == "maps-sep") && (item[2].search(/(Москва|Московская область|Moscow)/) >= 0)) {
                                return {
                                    label: item[2],
                                    value: item[2]
                                }
                            }
                        }));
                    }
                });
            },
            minLength: 3
        });
    }

    function inside_circular_road(a) {
        var X = [37.50663757324219,37.42698669433594,37.40947723388672,37.38372802734375,37.363128662109375,37.366905212402344,37.3809814453125,37.392311096191406,37.38750457763672,37.401580810546875,37.446556091308594,37.464752197265625,37.526893615722656,37.58079528808594,37.644309997558594,37.69786834716797,37.8369140625,37.84172058105469,37.848243713378906,37.84412384033203,37.83313751220703,37.84584045410156,37.736663818359375,37.67383575439453,37.58800506591797];
        var Y = [55.59522540012757,55.66306304713546,55.68958466999194,55.71009271344361,55.751656176679255,55.787577714316704,55.8045613172881,55.837156788363565,55.84852984240601,55.87011021700465,55.885132326344426,55.886095083843635,55.90861679246706,55.914004664397375,55.89995614406812,55.89668384026084,55.82790167952735,55.82057315625548,55.771166064828556,55.713574142662694,55.69480943831871,55.65725299247944,55.59076338488527,55.56980452798329,55.57485120131226];
        var x = a.getLng();
        var y = a.getLat();
        var e = false;
        var b = X.length;
        for (var d = 0,c = b - 1; d < b; c = d++) {
            if ((((Y[d] <= y) && (y < Y[c])) || ((Y[c] <= y) && (y < Y[d]))) && (x > (X[c] - X[d]) * (y - Y[d]) / (Y[c] - Y[d]) + X[d])) {
                e = !e;
            }
        }
        return e;
    }

    function calculate_distance_outcity(route, cur_point_index, next_point_index) {
        var next_inside_circular_road = inside_circular_road(route.getPoint(next_point_index));
        var cur_inside_circular_road, distance = 0;
        for (var i = Number(cur_point_index); i < Number(next_point_index); i++) {
            cur_inside_circular_road = next_inside_circular_road;
            next_inside_circular_road = inside_circular_road(route.getPoint(i + 1));
            if (!(cur_inside_circular_road && next_inside_circular_road)) distance += route.getPoint(i).distance(route.getPoint(i + 1));
        }
        return distance;
    }

    function extract_data_from_router(router) {

        var route = router.getRoute(0);
        number_of_segments = route.getNumRouteSegments();

        suburb_serve_km = 0;
        suburb_serve_min = 0;
        for (var i = 0; i < number_of_segments; i++) {
            var cur_segment = route.getRouteSegment(i);

            cur_point_index = cur_segment.getPolylineIndex();
            cur_point = route.getPoint(cur_point_index);
            next_point_index = (i + 1 == number_of_segments) ? (route.getNumPoints() - 1) : route.getRouteSegment(i + 1).getPolylineIndex();
            next_point = route.getPoint(next_point_index);
            var rstart_in_city = inside_circular_road(cur_point);
            var rfinish_in_city = inside_circular_road(next_point);
            if (!rfinish_in_city && !rstart_in_city) {
                suburb_serve_km += cur_segment.getDistance();
                suburb_serve_min += cur_segment.getDuration();
            }
            else if (!(rfinish_in_city && rstart_in_city)) {
                suburb_serve_km += calculate_distance_outcity(route, cur_point_index, next_point_index);
                suburb_serve_min += 60 * suburb_serve_km / 1000;
            }
        }

        var traffic_control = new YMaps.Traffic.Control();

        var precision = [router.getWayPoint(0).text != 'Россия, Москва', router.getWayPoint(1).text != 'Россия, Москва'];
        if (precision[0] && precision[1]) {
            for (i = 0; i < 2; i++) {
                if (router.getWayPoint(i).text.search(/вокзал/) != -1) {
                    router.getWayPoint(i).setStyle('plain#orangePoint');
                } else {
                    router.getWayPoint(i).setStyle('plain#orangePoint');
                }
            }
            /*
             map.destructor();
             createMap();
             */
            if (prevRes) {
                map.removeOverlay(prevRes);
            }
            router.getWayPoint(0).setIconContent($from);
            router.getWayPoint(1).setIconContent($to);
            //            $from = router.getWayPoint(0).text;
            //            $to = router.getWayPoint(1).text;
            map.addOverlay(router);
            prevRes = router;

            number_of_segments = route.getNumRouteSegments();
            circular_road_km = 0;
            circular_road_min = 0;

            suburb_km = 0;
            suburb_min = 0;
            for (i = 0; i < number_of_segments; i++) {
                var cur_segment = route.getRouteSegment(i);

                if (cur_segment.getStreet() == 'МКАД') {
                    circular_road_km += cur_segment.getDistance();
                    circular_road_min += cur_segment.getDuration();
                }
                else {
                    cur_point_index = cur_segment.getPolylineIndex();
                    cur_point = route.getPoint(cur_point_index);
                    next_point_index = (i + 1 == number_of_segments) ? (route.getNumPoints() - 1) : route.getRouteSegment(i + 1).getPolylineIndex();
                    next_point = route.getPoint(next_point_index);
                    var rstart_in_city = inside_circular_road(cur_point);
                    var rfinish_in_city = inside_circular_road(next_point);
                    if (!rfinish_in_city && !rstart_in_city) {
                        suburb_km += cur_segment.getDistance();
                        suburb_min += cur_segment.getDuration();
                    }
                    else if (!(rfinish_in_city && rstart_in_city)) {
                        suburb_km += calculate_distance_outcity(route, cur_point_index, next_point_index);
                        suburb_min += 60 * suburb_km / 1000;
                    }
                }
            }

            var distance = router.getDistance() / 1000;
            duration = Math.ceil(router.getDuration() / 60);
            circular_road_km = circular_road_km / 1000;
            circular_road_min = Math.ceil(circular_road_min / 60);
            suburb_km = suburb_km / 1000;
            suburb_km = suburb_km.toFixed(1);
            suburb_min = Math.ceil(suburb_min / 60);
            suburb_serve_km = suburb_serve_km / 1000;
            suburb_serve_min = Math.ceil(suburb_serve_min / 60);

            $("#distance").html(distance.toFixed(1).toString() + "&nbsp;км.");
            $("#duration").html(thisInterval(duration.toFixed(0)));
            $("#circular_road").html(circular_road_km.toFixed(1).toString() + "&nbsp;км.");
            $("#suburb").html(suburb_km + "&nbsp;км.");
            calcPrice();
            needRefreshPrice = true;
            //            $("#suburb_serve").html(suburb_serve_km.toFixed(1).toString() + "&nbsp;км.");
            $("#wrapper").show();
        }
        else {
            // GeocodeError
            var point_number;
            if (!precision[0]) {
                point_number = 0;
            } else {
                point_number = 1;
            }
            var geocoder = new YMaps.Geocoder(waypoints[point_number], {results:1});
            var error_string = 'Не удалось вычислить географические координаты точки «' + waypoints[point_number] + '» в регионе Москва.';
            YMaps.Events.observe(geocoder, geocoder.Events.Fault, function () {
                alert(error_string, 'error');
            });

        }
    }

    function thisInterval(current) {
        var word_list = ["минуту","минуты","минут"];
        var last = current % 10;
        if (current % 100 >= 5 && current % 100 <= 20) return current + " " + word_list[2];
        if (last == 1) return current + " " + word_list[0];
        if (last >= 2 && last <= 4) return current + " " + word_list[1];
        if (last >= 5 && last <= 9) return current + " " + word_list[2];
        if (last == 0) return current + " " + word_list[2];
    }

    function calcPrice() {
        var price = 0;
        if ($from != $to) {
            // определим тип машины
            var coeffs = carTypes[carType + "Type"];
            var coeffs = carTypes[carType + "Type"];
            if (isSpecialCase()) {
                if (isAeroport($from) && isAeroport($to)) {
                    if ((isAeroport($from, domodedovo) && isAeroport($to, vnukovo)) || (isAeroport($from, vnukovo) && isAeroport($to, domodedovo))) {
                        price += coeffs["domodedovoVnukovo"]
                    } else if ((isAeroport($from, domodedovo) && isAeroport($to, sheremetevo)) || (isAeroport($from, sheremetevo) && isAeroport($to, domodedovo))) {
                        price += coeffs["sheremetevoDomodedovo"]
                    } else if ((isAeroport($from, vnukovo) && isAeroport($to, sheremetevo)) || (isAeroport($from, sheremetevo) && isAeroport($to, vnukovo))) {
                        price += coeffs["sheremetevoVnukovo"]
                    }
                } else {
                    var aeroport;
                    var minus = 0;
                    if (isAeroport($from)) {
                        price += coeffs["airportToMoscow"];
                        aeroport = $from;
                    } else {
                        price += coeffs["moscowToAirport"];
                        aeroport = $to;
                    }

                    // вычитаем километры от аэропорта до МКАД
                    var distanceObj = {
                        domodedovo: 23,
                        vnukovo : 13.5,
                        sheremetevo: 15.5
                    };
                    if (isAeroport(aeroport, domodedovo)) {
                        minus = distanceObj["domodedovo"];
                    } else if (isAeroport(aeroport, vnukovo)) {
                        minus = distanceObj["vnukovo"];
                    } else if (isAeroport(aeroport, sheremetevo)) {
                        minus = distanceObj["sheremetevo"];
                    }
                    // за мкад
                    if (minus >= suburb_km) {
                        minus = suburb_km;
                    }
                    price += (suburb_km - minus) * coeffs["outsideRingRoad"];
                }
            } else {
                // по мкад
                price += circular_road_km * coeffs["ringRoad"];

                // за мкад
                price += suburb_km * coeffs["outsideRingRoad"];

                // мин стоимость
                price += coeffs["dayMin"];

                if (duration > coeffs["minimalDuration"]) {
                    var periodCount = duration - coeffs["minimalDuration"];
                    periodCount = Math.ceil(periodCount / coeffs["minInPeriod"]);
                    price += coeffs["rubPerPeriod"] * periodCount;
                }
            }
        }

        if (meetingNeeded) {
            price += coeffs["meeting"];
        }

        // округляем в большую сторону до 10
        price = Math.ceil(price / 10) * 10;
        $("#price").html(price + "&nbsp;руб");
    }

    function isSpecialCase() {
        return  isAeroport($from) || isAeroport($to);
    }

    function isAeroport() {
        var address = arguments[0];
        if (arguments.length == 1) {
            return isAeroport(address, domodedovo) || isAeroport(address, sheremetevo) || isAeroport(address, vnukovo);
        } else {
            var template = arguments[1];
            return address.indexOf(template) != -1;
        }
    }
}

YMaps.jQuery(function ($) {
    var mapWorker = new MapWorker($);
    mapWorker.onReady();
});