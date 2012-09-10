var metro = {
    names : ["Авиамоторная","Автозаводская","Академическая","Александровский сад","Александровский сад",
        "Алексеевская","Алтуфьево","Аннино","Арбатская","Арбатская","Арбатская","Аэропорт","Бабушкинская",
        "Багратионовская","Баррикадная","Бауманская","Беговая","Белорусская","Белорусская","Беляево",
        "Бибирево","Библиотека имени Ленина","Боровицкая","Ботанический сад","Братиславская","Бульвар Дмитрия Донского",
        "Бульвар адмирала Ушакова","Бунинская аллея","ВДНХ","Варшавская","Владыкино","Водный стадион","Войковская",
        "Волгоградский проспект","Волжская","Волоколамская","Воробьевы горы","Выставочная","Выхино","Динамо",
        "Дмитровская","Добрынинская","Домодедовская","Достоевская","Дубровка","Измайловская","Калужская",
        "Кантемировская","Каховская","Каширская","Каширская","Киевская","Киевская","Киевская","Киевская",
        "Китай-город","Китай-город","Кожуховская","Коломенская","Комсомольская","Комсомольская","Коньково",
        "Красногвардейская","Краснопресненская","Красносельская","Красные Ворота","Крестьянская застава",
        "Кропоткинская","Крылатское","Кузнецкий мост","Кузьминки","Кунцевская","Кунцевская","Курская","Курская",
        "Кутузовская","Ленинский проспект","Лубянка","Люблино","Марксистская","Марьина Роща","Марьино","Маяковская",
        "Медведково","Международная","Менделеевская","Митино","Молодежная","Мякинино","Нагатинская","Нагорная",
        "Нахимовский проспект","Новогиреево","Новокузнецкая","Новослободская","Новоясеневская","Новые Черемушки",
        "Октябрьская","Октябрьская","Октябрьское поле","Орехово","Отрадное","Охотный ряд","Павелецкая","Павелецкая",
        "Парк Победы","Парк культуры","Парк культуры","Партизанская","Первомайская","Перово","Петровско-Разумовская",
        "Печатники","Пионерская","Планерная","Площадь Ильича","Площадь Революции","Полежаевская","Полянка","Пражская",
        "Преображенская площадь","Пролетарская","Проспект Вернадского","Проспект мира","Проспект мира","Профсоюзная",
        "Пушкинская","Речной вокзал","Рижская","Римская","Рязанский проспект","Савеловская","Свиблово","Севастопольская",
        "Семеновская","Серпуховская","Славянский бульвар","Смоленская","Смоленская","Смоленская","Сокол","Сокольники",
        "Спортивная","Сретенский бульвар","Строгино","Студенческая","Сухаревская","Сходненская","Таганская","Таганская",
        "Тверская","Театральная","Текстильщики","Теплый стан","Тимирязевская","Третьяковская","Трубная","Тульская","Тургеневская",
        "Тушинская","Улица 1905 года","Улица Горчакова","Улица Подбельского","Улица Скобелевская",
        "Улица Старокачаловская","Улица академика Янгеля","Университет","Филевский парк","Фили","Фрунзенская",
        "Царицыно","Цветной бульвар","Черкизовская","Чертановская","Чеховская","Чистые пруды","Чкаловская",
        "Шаболовская","Шоссе Энтузиастов","Щелковская","Щукинская","Электрозаводская","Юго-западная","Южная",
        "Ясенево"],

    terminals : [
        {
            name : "Молодежная",
            coords : [55.741004, 37.416386],
            segment : [
                [55.6840940,33.3252132],
                [55.7258784,37.3764216],
                [55.6736409,37.4279201],
                [54.8678414, 34.8461329]
            ]
        },
        {
            name : "Юго-западная",
            coords : [55.663146, 37.482852],
            segment : [
                [54.8678414, 34.8461329],
                [55.6736409,37.4279201],
                [55.5868111,37.5570094],
                [54.8346359, 37.0461452]
            ]
        },
        {
            name : "Улица Старокачаловская",
            coords : [55.568838, 37.576708],
            segment : [
                [54.8346359, 37.0461452],
                [55.5868111,37.5570094],
                [55.5724502,37.6483333],
                [54.7154252,37.8735530]
            ]
        },
        {
            name : "Домодедовская",
            coords : [55.610697, 37.717905],
            segment : [
                [54.7154252,37.8735530],
                [55.5724502,37.6483333],
                [55.6131904,37.7657496],
                [54.8575664,38.5547053]
            ]
        },
        {
            name : "Выхино",
            coords : [55.715682, 37.817969],
            segment : [
                [54.8575664,38.5547053],
                [55.6131904,37.7657496],
                [55.7413428,37.8323543],
                [55.5677915, 40.0790584]
            ]
        },
        {
            name : "Партизанская",
            coords : [55.788424, 37.749265],
            segment : [
                [55.5677915, 40.0790584],
                [55.7413428,37.8323543],
                [55.8675346,37.7630030],
                [57.2641244, 41.4001643]
            ]
        },
        {
            name : "Медведково",
            coords : [55.887473, 37.661527],
            segment : [
                [57.2641244, 41.4001643],
                [55.8675346,37.7630030],
                [55.8910297,37.4945247],
                [57.3535027, 36.3739192]
            ]
        },
        {
            name : "Планерная",
            coords : [55.860529, 37.436382],
            segment : [
                [57.3535027, 36.3739192],
                [55.8910297,37.4945247],
                [55.8617549,37.4004542],
                [56.9958058,35.1544368]
            ]
        },
        {
            name : "Строгино",
            coords : [55.803691, 37.403118],
            segment : [
                [56.9958058,35.1544368],
                [55.8617549,37.4004542],
                [55.7258784,37.3764216],
                [55.6840940,33.3252132]
            ]
        }
    ],

    /*
     getClosestMetro : function(coords) {
     var res = null;
     if (coords.length && coords[0] && coords[1]) {
     res = _.max(metro.terminals, function(terminal) {
     return Math.pow(terminal.coords[0] - coords[0], 2) + Math.pow(terminal.coords[1] - coords[1], 2);
     }).name;
     }
     return res;
     },
     */
    getStationName : function(index) {
        return metro.names[index];
    },

    /*
     metro.clickHandler = function($stations, $this, clickHandler) {
     var $ = jQuery;
     var index = $stations.index($this) - ($.browser.msie ? 2 : 0);
     clickHandler(metro.getStationName(index));
     };
     */

    parseNameArr : function($) {
        var buffer = "";
        $("#metroChoose").find("span").each(function() {
            buffer += "\"" + $(this).text() + "\",";
        });
        console.log(buffer);
    },

    // webkit + FF6
    simulateClick : function($) {
        var $arr = $('rect');
        var timeout = 500;
        for (var i = 0; i < $arr.length; i++) {
            var a = $arr[i];
            var func = (function(a) {
                return function() {
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    a.dispatchEvent(e);
                }
            })(a);
            setTimeout(func, timeout * i);
        }
    },

    draw : function ($, paper, optsArr, polys, clickHandler) {
        var version = parseInt($.browser.version, 10);
        var isIE68 = $.browser.msie && version >= 6 && version <= 8;
        for (var i = 0; i < optsArr.length; i++) {
            var opts = optsArr[i];
            var rect = paper.rect(opts.topX, opts.topY, opts.width, opts.height);
            rect.attr({stroke:"none",fill:"#00ba00","fill-opacity":0,cursor : "pointer"});
            if (isIE68) rect.attr("opacity", 0);
            rect.hover(function() {
                this.attr("opacity", 1);
                this.attr("stroke", "#ff0000");
            }, function() {
                this.attr("opacity", 0);
                this.attr("stroke", "none");
            });
            rect.click(function() {
                var id = this.id;
                // correction for poly "Третьяковская"
                if (id > 154) {
                    id += 1;
                }
                clickHandler(metro.getStationName(id));
            })
        }
        for (var j = 0; j < polys.length; j++) {
            var opts = polys[j];
            var poly = paper.path(opts.path);
            poly.attr({stroke:"none",fill:"#00ba00","fill-opacity":0,cursor : "pointer"});
            if (isIE68) poly.attr("opacity", 0);
            poly.hover(function() {
                this.attr("opacity", 1);
                this.attr("stroke", "#ff0000");
            }, function() {
                this.attr("opacity", 0);
                this.attr("stroke", "none");
            });
            poly.click(function() {
                clickHandler(metro.getStationName(155));
            })
        }
    },

    init : function($, clickHandler) {
        var paper = new Raphael(document.getElementById('canvas-container'), 610, 840);
        var rects = [
            {topX:508,topY:308,width:70,height:9,id:"130"},
            {topX:389,topY:490,width:75,height:9,id:"18"},
            {topX:124,topY:584,width:75,height:9,id:"95"},
            {topX:0,topY:0,width:0,height:0,id:"409"},
            {topX:127,topY:408,width:104,height:9,id:"25"},
            {topX:389,topY:109,width:67,height:9,id:"67"},
            {topX:315,topY:59,width:54,height:9,id:"59"},
            {topX:258,topY:664,width:40,height:9,id:"182"},
            {topX:181,topY:418,width:56,height:8,id:"156"},
            {topX:205,topY:392,width:55,height:9,id:"40"},
            {topX:0,topY:0,width:0,height:0,id:"408"},
            {topX:150,topY:99,width:49,height:9,id:"76"},
            {topX:389,topY:69,width:70,height:9,id:"118"},
            {topX:51,topY:296,width:82,height:9,id:"88"},
            {topX:119,topY:259,width:68,height:9,id:"65"},
            {topX:508,topY:228,width:61,height:9,id:"128"},
            {topX:142,topY:198,width:42,height:9,id:"64"},
            {topX:167,topY:238,width:66,height:9,id:"63"},
            {topX:167,topY:238,width:66,height:9,id:"153"},
            {topX:156,topY:624,width:43,height:9,id:"107"},
            {topX:315,topY:69,width:49,height:9,id:"58"},
            {topX:234,topY:408,width:104,height:9,id:"23"},
            {topX:240,topY:418,width:63,height:9,id:"42"},
            {topX:389,topY:89,width:85,height:9,id:"120"},
            {topX:406,topY:624,width:74,height:9,id:"143"},
            {topX:289,topY:692,width:64,height:13,id:"183"},
            {topX:289,topY:734,width:104,height:9,id:"188"},
            {topX:289,topY:754,width:83,height:9,id:"190"},
            {topX:389,topY:99,width:31,height:9,id:"68"},
            {topX:312,topY:536,width:61,height:9,id:"92"},
            {topX:315,topY:89,width:57,height:9,id:"73"},
            {topX:120,topY:69,width:79,height:9,id:"60"},
            {topX:139,topY:79,width:60,height:9,id:"74"},
            {topX:489,topY:624,width:91,height:9,id:"22"},
            {topX:406,topY:604,width:50,height:9,id:"142"},
            {topX:16,topY:196,width:76,height:8,id:"191"},
            {topX:17,topY:624,width:78,height:9,id:"169"},
            {topX:127,topY:347,width:65,height:9,id:"185"},
            {topX:489,topY:664,width:42,height:9,id:"140"},
            {topX:157,topY:109,width:42,height:9,id:"62"},
            {topX:206,topY:178,width:67,height:9,id:"70"},
            {topX:289,topY:486,width:73,height:9,id:"17"},
            {topX:323,topY:654,width:75,height:9,id:"151"},
            {topX:316,topY:210,width:65,height:8,id:"194"},
            {topX:406,topY:574,width:51,height:9,id:"165"},
            {topX:508,topY:188,width:71,height:9,id:"132"},
            {topX:143,topY:614,width:56,height:9,id:"106"},
            {topX:319,topY:624,width:79,height:9,id:"147"},
            {topX:301,topY:593,width:58,height:9,id:"94"},
            {topX:389,topY:512,width:58,height:9,id:"114"},
            {topX:389,topY:512,width:58,height:9,id:"154"},
            {topX:155,topY:368,width:38,height:17,id:"158"},
            {topX:155,topY:368,width:38,height:17,id:"160"},
            {topX:155,topY:368,width:38,height:17,id:"38"},
            {topX:0,topY:0,width:0,height:0,id:"406"},
            {topX:353,topY:348,width:64,height:9,id:"163"},
            {topX:353,topY:348,width:64,height:9,id:"26"},
            {topX:406,topY:584,width:67,height:9,id:"21"},
            {topX:389,topY:500,width:65,height:9,id:"113"},
            {topX:385,topY:258,width:79,height:9,id:"12"},
            {topX:385,topY:258,width:79,height:9,id:"11"},
            {topX:149,topY:634,width:50,height:9,id:"105"},
            {topX:303,topY:670,width:95,height:9,id:"149"},
            {topX:100,topY:267,width:95,height:9,id:"61"},
            {topX:489,topY:99,width:79,height:9,id:"125"},
            {topX:371,topY:272,width:76,height:9,id:"45"},
            {topX:455,topY:438,width:106,height:9,id:"167"},
            {topX:208,topY:435,width:74,height:9,id:"39"},
            {topX:14,topY:226,width:66,height:11,id:"172"},
            {topX:247,topY:311,width:78,height:9,id:"51"},
            {topX:489,topY:644,width:55,height:9,id:"141"},
            {topX:16,topY:261,width:62,height:9,id:"171"},
            {topX:16,topY:261,width:62,height:9,id:"85"},
            {topX:420,topY:316,width:47,height:9,id:"155"},
            {topX:420,topY:316,width:47,height:9,id:"13"},
            {topX:71,topY:316,width:64,height:9,id:"5"},
            {topX:128,topY:574,width:71,height:9,id:"96"},
            {topX:286,topY:320,width:47,height:8,id:"46"},
            {topX:406,topY:614,width:46,height:9,id:"145"},
            {topX:414,topY:392,width:77,height:11,id:"29"},
            {topX:315,topY:188,width:71,height:8,id:"195"},
            {topX:406,topY:634,width:46,height:9,id:"144"},
            {topX:227,topY:263,width:66,height:12,id:"47"},
            {topX:388,topY:59,width:62,height:9,id:"119"},
            {topX:127,topY:337,width:78,height:9,id:"184"},
            {topX:198,topY:211,width:75,height:9,id:"10"},
            {topX:16,topY:185,width:40,height:8,id:"192"},
            {topX:16,topY:237,width:62,height:8,id:"175"},
            {topX:16,topY:206,width:52,height:8,id:"193"},
            {topX:235,topY:557,width:63,height:9,id:"115"},
            {topX:249,topY:568,width:49,height:8,id:"97"},
            {topX:213,topY:577,width:85,height:9,id:"99"},
            {topX:508,topY:278,width:62,height:9,id:"136"},
            {topX:332,topY:395,width:77,height:12,id:"34"},
            {topX:190,topY:223,width:83,height:9,id:"7"},
            {topX:118,topY:664,width:81,height:11,id:"108"},
            {topX:118,topY:604,width:81,height:9,id:"102"},
            {topX:0,topY:0,width:0,height:0,id:"35"},
            {topX:183,topY:478,width:66,height:9,id:"162"},
            {topX:100,topY:178,width:84,height:9,id:"78"},
            {topX:353,topY:644,width:45,height:9,id:"148"},
            {topX:315,topY:79,width:49,height:9,id:"57"},
            {topX:288,topY:355,width:64,height:9,id:"44"},
            {topX:382,topY:450,width:62,height:9,id:"31"},
            {topX:382,topY:450,width:62,height:9,id:"32"},
            {topX:50,topY:375,width:63,height:9,id:"170"},
            {topX:132,topY:447,width:72,height:10,id:"161"},
            {topX:132,topY:447,width:72,height:10,id:"37"},
            {topX:508,topY:198,width:69,height:9,id:"173"},
            {topX:508,topY:178,width:70,height:9,id:"133"},
            {topX:508,topY:288,width:39,height:9,id:"135"},
            {topX:289,topY:129,width:65,height:13,id:"69"},
            {topX:406,topY:594,width:53,height:9,id:"146"},
            {topX:31,topY:276,width:58,height:9,id:"87"},
            {topX:130,topY:137,width:54,height:10,id:"56"},
            {topX:455,topY:361,width:82,height:9,id:"122"},
            {topX:306,topY:374,width:99,height:9,id:"24"},
            {topX:115,topY:188,width:69,height:9,id:"90"},
            {topX:289,topY:468,width:44,height:9,id:"36"},
            {topX:247,topY:644,width:51,height:9,id:"111"},
            {topX:489,topY:79,width:93,height:9,id:"124"},
            {topX:455,topY:450,width:70,height:9,id:"28"},
            {topX:14,topY:644,width:81,height:9,id:"101"},
            {topX:352,topY:233,width:73,height:9,id:"6"},
            {topX:352,topY:233,width:73,height:9,id:"8"},
            {topX:131,topY:594,width:68,height:9,id:"104"},
            {topX:168,topY:302,width:62,height:9,id:"52"},
            {topX:128,topY:59,width:71,height:9,id:"55"},
            {topX:389,topY:120,width:46,height:9,id:"9"},
            {topX:455,topY:373,width:48,height:9,id:"123"},
            {topX:489,topY:654,width:96,height:9,id:"138"},
            {topX:209,topY:188,width:64,height:9,id:"72"},
            {topX:389,topY:79,width:50,height:9,id:"121"},
            {topX:214,topY:593,width:84,height:9,id:"98"},
            {topX:508,topY:208,width:64,height:9,id:"127"},
            {topX:289,topY:498,width:72,height:9,id:"20"},
            {topX:11,topY:327,width:59,height:13,id:"174"},
            {topX:121,topY:391,width:59,height:9,id:"157"},
            {topX:0,topY:0,width:0,height:0,id:"407"},
            {topX:192,topY:377,width:59,height:9,id:"41"},
            {topX:164,topY:89,width:35,height:9,id:"75"},
            {topX:489,topY:89,width:60,height:9,id:"126"},
            {topX:36,topY:614,width:59,height:9,id:"91"},
            {topX:363,topY:298,width:96,height:7,id:"179"},
            {topX:15,topY:217,width:52,height:9,id:"176"},
            {topX:81,topY:326,width:67,height:9,id:"4"},
            {topX:296,topY:264,width:65,height:9,id:"50"},
            {topX:118,topY:148,width:66,height:9,id:"81"},
            {topX:413,topY:408,width:55,height:9,id:"30"},
            {topX:413,topY:408,width:55,height:9,id:"27"},
            {topX:228,topY:292,width:49,height:9,id:"48"},
            {topX:297,topY:365,width:63,height:8,id:"152"},
            {topX:489,topY:634,width:69,height:9,id:"139"},
            {topX:139,topY:644,width:60,height:9,id:"103"},
            {topX:199,topY:168,width:74,height:9,id:"71"},
            {topX:296,topY:242,width:45,height:9,id:"178"},
            {topX:250,topY:547,width:48,height:9,id:"19"},
            {topX:352,topY:304,width:68,height:9,id:"49"},
            {topX:129,topY:158,width:55,height:9,id:"82"},
            {topX:108,topY:208,width:76,height:9,id:"66"},
            {topX:289,topY:744,width:83,height:9,id:"189"},
            {topX:489,topY:59,width:96,height:9,id:"116"},
            {topX:289,topY:724,width:96,height:9,id:"187"},
            {topX:289,topY:708,width:118,height:9,id:"186"},
            {topX:235,topY:654,width:63,height:9,id:"181"},
            {topX:34,topY:634,width:61,height:9,id:"93"},
            {topX:41,topY:286,width:76,height:9,id:"84"},
            {topX:61,topY:306,width:30,height:9,id:"83"},
            {topX:30,topY:604,width:65,height:9,id:"15"},
            {topX:345,topY:634,width:53,height:9,id:"150"},
            {topX:247,topY:242,width:46,height:13,id:"54"},
            {topX:489,topY:69,width:69,height:9,id:"117"},
            {topX:231,topY:624,width:67,height:9,id:"112"},
            {topX:234,topY:302,width:57,height:9,id:"53"},
            {topX:352,topY:288,width:68,height:9,id:"43"},
            {topX:422,topY:328,width:62,height:9,id:"14"},
            {topX:133,topY:564,width:66,height:9,id:"16"},
            {topX:508,topY:298,width:89,height:9,id:"137"},
            {topX:508,topY:168,width:61,height:9,id:"131"},
            {topX:127,topY:168,width:57,height:9,id:"77"},
            {topX:508,topY:218,width:89,height:9,id:"129"},
            {topX:25,topY:659,width:70,height:9,id:"100"},
            {topX:260,topY:634,width:38,height:9,id:"110"},
            {topX:156,topY:654,width:43,height:9,id:"109"}
        ];
        var polys = [
            {path:"M319,389,319,406,329,406,329,393,380,393,380,389Z"},
            {path:"M319,389,319,406,329,406,329,393,380,393,380,389Z"}
        ]
        this.draw($, paper, rects, polys, clickHandler);
    }
}