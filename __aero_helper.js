function AeroHelper($) {
    var that = this;

    var from,to,waypoints,number_of_segments, cur_point_index, cur_point, next_point_index, next_point,  circular_road_km, circular_road_min, suburb_km, suburb_min, duration;
    var $from,$to,traffic,suburb_serve_km,suburb_serve_min;

    var carTypesNames = ["econom2","comfort2","business2","premium2"];
    var carType = carTypesNames[0];
    var sheremetevo = "Московская область, аэропорт Шереметьево";
    var vnukovo = "Московская область, аэропорт Внуково";
    var domodedovo = "Московская область, аэропорт Домодедово";

    this._onCheckboxChange = function () {
        if ($(this).is(':checked')) {
            $(this).button('option', 'icons', { primary: 'ui-icon-check' });
        } else {
            $(this).button('option', 'icons', { primary: 'ui-icon-minus' });
        }
    };

    this.onReady = function() {

        metro.init($, function(name) {
            $("#begin2").val(name);
            $("#metro2").click();
            $("#addressType2").buttonset("refresh");
            $("#canvas-container").dialog("close");
        });
        var metroNames = [];
        for (var i = 0; i < metro.names.length; i++) {
            var el = metro.names[i];
            if ($.inArray(el, metroNames) == -1) {
                metroNames.push(el);
            }
        }
        $("#closestMetro").hide();
        $("#begin2").addClass("ui-widget ui-widget-content ui-corner-all");
        $("#findButton2").button();
        $("#tube2").button();
        $("#aeroport2").buttonset();
        $("#addressType2").buttonset();
        $("#typeMode2").buttonset();
        $("#direction").buttonset();

        $("#tube2").bind('click', this._onCheckboxChange).each(this._onCheckboxChange);
        $('#addressType2 input[type=radio]').click(function() {
            var value = this.value;
            if (value == "metro2") {
                yandexAutoComplete($('#begin2'), 2, metroNames);
            } else if (value == "street2") {
                yandexAutoComplete($('#begin2'), 3, null);
            }
        });
        $("#street2").click();
        $("#addressType2").buttonset("refresh");
        //createMap();
        $("#findButton2").click(function() {
            var address = $.trim($("#begin2").val());
            if (address.length) {
                var addressType = $("#addressType2 :checked").attr("value");
                if (addressType == "metro2") {
                    address = "метро " + address;
                }
                getClosestMetro(address, function(name) {
                    that.startSearch(address, name);
                });
            } else {
                alert("Введите, пожалуйста, адрес в поле 'Адрес'");
            }
        });
        /*
         var searchObj;
         if ($.jStorage.get("searchObj")) {
         searchObj = $.jStorage.get("searchObj");
         } else {
         searchObj = JSON.parse($.cookie("searchObj"));
         }
         if (searchObj && searchObj.begin && searchObj.end && searchObj.carType > -1) {
         $("#begin2").val(searchObj.begin);
         $("#end2").val(searchObj.end);
         carType = carTypesNames[searchObj.carType];
         }
         */
        if (carType == carTypesNames[0]) {
            $("#typeMode2 input").eq(0).click();
        } else if (carType == carTypesNames[1]) {
            $("#typeMode2 input").eq(1).click();
        } else if (carType == carTypesNames[2]) {
            $("#typeMode2 input").eq(2).click();
        } else if (carType == carTypesNames[3]) {
            $("#typeMode2 input").eq(3).click();
        }
        $("#typeMode2 input[type=radio]").click(function() {
            carType = $("#typeMode2 :checked").attr("value");
            //         if ($.trim($("#begin2").val())) {
            //         $("#findButton2").trigger("click");
            //         }
        });
        $("#typeMode2").buttonset("refresh");

        $("#canvas-container").dialog({width : 610, title : "Выберите станцию метро"}).dialog("close");
        $("#metroAnchor2").click(function() {
            $("#canvas-container").dialog("open");
        });
    };

    this.startSearch = function(address, isMetroExists) {
        var fromAeroport = false;
        $from = address;
        var aeroport = $("#aeroport2 :checked").attr("value");
        if (aeroport == "domodedovo2") {
            $to = domodedovo;
        } else if (aeroport == "sheremetevo2") {
            $to = sheremetevo
        } else if (aeroport == "vnukovo2") {
            $to = vnukovo
        }
        traffic = $("#tube2").attr("checked");
        var direction = $("#direction :checked").attr("value");
        if (direction == "fromAeroport") {
            fromAeroport = true;
        }

        var geocoder = new YMaps.Geocoder($from, {results: 1, boundedBy: map.getBounds()});
        YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {
            if (this.length()) {
                var geopoint = this.get(0).getGeoPoint();
                that.afterStartSearch(isMetroExists, geopoint, fromAeroport);
            } else {
                console && console.log && console.log("Ничего не найдено $from");
                that.afterStartSearch(isMetroExists, $from, fromAeroport);
            }
        });
        YMaps.Events.observe(geocoder, geocoder.Events.Fault, function (geocoder, error) {
            console && console.log && console.log("Произошла ошибка $from: " + error);
            that.afterStartSearch(isMetroExists, $from, fromAeroport);
        });
    };

    this.afterStartSearch = function(isMetroExists, addressCoords, fromAeroport) {
        $("#findButton2").button({ disabled: true });
        setTimeout(function() {
            $("#findButton2").button({ disabled: false });
        }, 1000);
        that.show($from, $to, traffic, isMetroExists, addressCoords, fromAeroport);
    };

    this.show = function (pre_from, pre_to, pre_traffic, metro, addressCoords, fromAeroport) {
        from = pre_from;
        to = pre_to;
        traffic = pre_traffic;

        //        var waypoints = [from,to];
        var waypoints = [addressCoords, to];
        var router = new YMaps.Router(waypoints, [], {viewAutoApply: 1, avoidTrafficJams: traffic});
        YMaps.Events.observe(router, router.Events.Success, function(router) {
            extract_data_from_router(router, metro, addressCoords, fromAeroport);
        });
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

    function yandexAutoComplete($el, minLength, source) {
        if ($el.autocomplete) {
            $el.autocomplete("destroy")
        }
        $el.autocomplete({
            source: source || function(request, response) {
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
            minLength: minLength
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

    function extract_data_from_router(router, metro, addressCoords, fromAeroport) {

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

        var precision = [router.getWayPoint(0).text != 'Россия, Москва', router.getWayPoint(1).text != 'Россия, Москва'];
        if (precision[0] && precision[1]) {
            for (i = 0; i < 2; i++) {
                if (router.getWayPoint(i).text.search(/вокзал/) != -1) {
                    router.getWayPoint(i).setStyle('default#trainIcon');
                } else {
                    router.getWayPoint(i).setStyle('plain#orangePoint');
                }
            }
            if (prevRes) {
                map.removeOverlay(prevRes);
            }
            router.getWayPoint(0).setIconContent($from);
            router.getWayPoint(1).setIconContent($to);
            //            $from = router.getWayPoint(0).text;
            //            $to = router.getWayPoint(1).text;
            try {
                prevRes = router;
                map.addOverlay(router);
            } catch (e) {

            }
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
            suburb_km = +suburb_km;
            suburb_min = Math.ceil(suburb_min / 60);
            suburb_serve_km = suburb_serve_km / 1000;
            suburb_serve_min = Math.ceil(suburb_serve_min / 60);

            $("#distance2").html(distance.toFixed(1).toString() + "&nbsp;км.");
            $("#duration2").html(thisInterval(duration.toFixed(0)));
            $("#circular_road2").html(circular_road_km.toFixed(1).toString() + "&nbsp;км.");
            $("#suburb2").html(suburb_km + "&nbsp;км.");
            $("#closestMetro").show();
            if (metro) {
                $("#closestMetroValue").html(metro);
            }
            calcPrice(metro, addressCoords, fromAeroport, distance);
            //            $("#suburb_serve").html(suburb_serve_km.toFixed(1).toString() + "&nbsp;км.");
            $("#wrapper2").show();
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

    function getClosestMetro(address, cb) {
        var geocoder = new YMaps.Geocoder(address);
        YMaps.Events.observe(geocoder, geocoder.Events.Load, function () {
            if (this.length()) {
                var geopoint = this.get(0);
                var point = this.get(0).getGeoPoint();

                var metro = new YMaps.Metro.Closest(point, {results : 10});
                YMaps.Events.observe(metro, metro.Events.Load, function (metroList) {
                    if (metroList.length()) {
                        var metroArr = [];
                        for (var i = 0; i < metroList.length(); i++) {
                            metroArr.push(metroList.get(i));
                        }
                        var metroElem = _.detect(metroArr, function(metroElem) {
                            var metroPosName = $.trim(metroElem.AddressDetails.Country.AddressLine.split(",").pop());
                            return isMetro(metroPosName);
                        });
                        //                        var metroElem = metroList.get(0);
                        //                        var metroName = metro.AddressDetails.Country.Locality.Thoroughfare.Premise.PremiseName;
                        if (metroElem) {
                            var metroName = $.trim(metroElem.AddressDetails.Country.AddressLine.split(",").pop());
                            metroName = metroName.replace("метро", "");
                            metroName = $.trim(metroName);
                            cb(metroName);
                        } else {
                            alert("Для адреса " + address + " не найдено станции метро!");
                            cb(null);
                        }
                    } else {
                        cb(null);
                    }
                });

                YMaps.Events.observe(metro, metro.Events.Fault, function (metro, error) {
                    alert("При выполнении запроса произошла ошибка: " + error);
                });
            } else {
                cb(null);
            }
        });
        YMaps.Events.observe(geocoder, geocoder.Events.Fault, function (geocoder, errorMessage) {
            alert("Произошла ошибка: " + errorMessage)
        });
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

    function getPrice(aeroport, metro, fromAeroport, coeffs) {
        var ind = 0;
        if (isAeroport(aeroport, vnukovo)) {
            ind = 3;
        } else if (isAeroport(aeroport, sheremetevo)) {
            ind = 6;
        }
        if (carType == carTypesNames[1]) {
            ind += 1;
        } else if (carType == carTypesNames[2] || carType == carTypesNames[3]) {
            ind += 2;
        }
        var res = prices[metro][ind];
        //fromAeroport && (res+=coeffs["meetingAeroport"]);
        if (fromAeroport) {
            res += coeffs["meetingAeroport"]
        }
        return res;
    }

    function calcPrice(metro, addressCoords, fromAeroport, distance) {
        var price = 0;
        var minus = 0;
        var distanceObj = {
            domodedovo: 23,
            vnukovo : 13.5,
            sheremetevo: 15.5
        };

        var aeroport = $to;

        // вычитаем километры от аэропорта до МКАД
        if (isAeroport(aeroport, domodedovo)) {
            minus = distanceObj["domodedovo"];
        } else if (isAeroport(aeroport, vnukovo)) {
            minus = distanceObj["vnukovo"];
        } else if (isAeroport(aeroport, sheremetevo)) {
            minus = distanceObj["sheremetevo"];
        }
        // определим тип машины
        var coeffs = carTypes[carType.substring(0, carType.length - 1) + "Type"];

        metro = isMetro(metro);
        if ($from != $to) {
            if (!metro) {
                metro = getMetroByCoords(addressCoords);
                price = getPrice(aeroport, metro, fromAeroport, coeffs);
                $("#closestMetroValue").html(metro);

                if (fromAeroport) {
                    // из аэропорта на севере москвы едем на юг Московской обл. за мкад
                    if (Math.abs(distance - suburb_km) >= 1) {
                        getSummaryRoute("Москва, метро " + metro, addressCoords, traffic, function(km, min) {
                            price += calcOutsideCity(km, coeffs, min);
                            showPrice(price);
                        })
                    } else {
                        // аэропорт - юг москвы, а адрес - юг Московской обл. за мкад
                        var tPrice = calcFeed(minus, coeffs);
                        tPrice += calcOutsideCityMin(distance, coeffs, duration);
                        if (tPrice > price) {
                            price = tPrice;
                        }
                        showPrice(price);
                    }
                } else {
                    //  адрес - юг Московской обл. за мкад, а аэропорт - север москвы, едем в аэропорт
                    if (Math.abs(distance - suburb_km) >= 1) {
                        var feedKm = suburb_km - minus;
                        var feedTime = Math.ceil(suburb_min * feedKm / suburb_km);
                        price += calcFeed(feedKm, coeffs, feedTime);
                        showPrice(price);
                    } else {
                        // адрес - юг Московской обл. за мкад, а аэропорт - юг москвы, едем в аэропорт
                        getSummaryRoute("Москва, метро " + metro, addressCoords, traffic, function(km, min) {
                            var tPrice = calcFeed(km, coeffs) + calcOutsideCity(distance, coeffs, duration);
                            if (tPrice > price) {
                                price = tPrice;
                            }
                            showPrice(price);
                        })
                    }
                }
            } else {
                price = getPrice(aeroport, metro, fromAeroport, coeffs);
                showPrice(price);
            }
        }
    }

    function getSummaryRoute(address1, address2, traffic, cb) {
        var router = new YMaps.Router([address1, address2], [], {avoidTrafficJams: traffic});
        YMaps.Events.observe(router, router.Events.Success, function(router) {
            var distance = router.getDistance() / 1000;
            var duration = Math.ceil(router.getDuration() / 60);
            cb(distance, duration);
        });
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

    // yandex returns "Телецентр" for address "Москва, улица Академика Королева", but "Телецентр" is not usual metro
    function isMetro(address) {
        if (address) {
            address = address.replace("метро", "");
            address = $.trim(address);
            return _.detect(metro.names, function(name) {
                name = name.replace("метро", "");
                name = $.trim(name);
                return name.toLowerCase() == address.toLowerCase();
            });
        } else {
            return null;
        }
    }

    function calcFeed(feedKm, tariff, feedTime) {
        var result = 0;
        if (feedKm <= 5) {

        } else if (feedKm > 5 && feedKm < 10) {
            result = 100;
        } else if (feedKm > 10) {
            result = feedKm * tariff["outsideRingRoad"];
        }
        if (feedTime) {
            result += calcOutsideCity(feedKm, tariff, feedTime);
        }
        return result;
    }

    function calcOutsideCity(feedKm, tariff, feedTime) {
        feedTime = Math.ceil(feedTime / tariff["minInPeriod"]);
        return feedKm * tariff["outsideRingRoad"] + tariff["rubPerPeriod"] * feedTime;
    }

    function calcOutsideCityMin(km, tariff, duration) {
        var price = tariff["dayMin"] + km * tariff["outsideRingRoad"];
        if (duration > tariff["minimalDuration"]) {
            var periodCount = duration - tariff["minimalDuration"];
            periodCount = Math.ceil(periodCount / tariff["minInPeriod"]);
            price += tariff["rubPerPeriod"] * periodCount;
        }
        return price;
    }

    function showPrice(price) {
        // округляем в большую сторону до 10
        price = Math.ceil(price / 10) * 10;
        $("#price2").html(price + "&nbsp;руб");
    }

    function getMetroByCoords(point) {
        var container = _.detect(terminalPolygons, function(elem) {
            return elem.contains(point);
        });
        return metro.terminals[_.indexOf(terminalPolygons, container)].name;
    }
}

YMaps.jQuery(function ($) {
    $("#tabs").tabs();
    var aeroHelper = new AeroHelper($);
    aeroHelper.onReady();
});