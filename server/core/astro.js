"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChartFactory = exports.Chart = exports.ChartType = exports.Aspect = exports.Person = exports.Planet = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var rp = require("request-promise");

var Planet = exports.Planet = function () {
    function Planet(name, lon, lat, spd) {
        (0, _classCallCheck3.default)(this, Planet);

        this.symbols = {
            "sun": "a",
            "moon": "s",
            "mercury": "d",
            "venus": "f",
            "earth": "g",
            "mars": "h",
            "jupiter": "j",
            "saturn": "k",
            "uranus": "ö",
            "neptune": "ä",
            "pluto": "#",
            "south node": "?",
            "north node": "ß",
            "ceres": "A",
            "pallas": "S",
            "juno": "D",
            "vesta": "F",
            "lilith": "ç",
            "cupido": "L",
            "chiron": "l",
            "nessus": "ò",
            "pholus": "ñ",
            "chariklo": "î",
            "eris": "È",
            "chaos": "Ê",
            "fortuna": "%"
        };
        this.name = name;
        this.longitude = lon;
        this.latitude = lat;
        this.speed = spd;
        this.symbol = this.symbols[name.toLowerCase()];
    }

    (0, _createClass3.default)(Planet, [{
        key: "isRetrograde",
        value: function isRetrograde() {
            return this.speed < 0;
        }
    }, {
        key: "isMajor",
        value: function isMajor() {
            return ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "north node", "south node"].indexOf(this.name.toLowerCase()) > -1;
        }
    }]);
    return Planet;
}();

var Person = exports.Person = function () {
    function Person(name, date, location) {
        (0, _classCallCheck3.default)(this, Person);

        this.name = name;
        this.date = date;
        this.location = location;
    }

    (0, _createClass3.default)(Person, null, [{
        key: "create",
        value: function create(name, date, location) {
            return __awaiter(this, void 0, Promise, _regenerator2.default.mark(function _callee() {
                var dt, loc;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                dt = void 0, loc = void 0;

                                if (name) {
                                    _context.next = 3;
                                    break;
                                }

                                throw new Error("No name was submitted for the person/event");

                            case 3:
                                if (!(typeof date === "string")) {
                                    _context.next = 9;
                                    break;
                                }

                                if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}\.\d{3})?Z/.test(date)) {
                                    _context.next = 6;
                                    break;
                                }

                                throw new TypeError("Date not formatted according to ISO 8601 (YYYY-MM-DDTHH:mmZ)");

                            case 6:
                                dt = date;
                                _context.next = 10;
                                break;

                            case 9:
                                if (date instanceof Date) {
                                    dt = date.toISOString();
                                } else {
                                    dt = new Date().toISOString();
                                }

                            case 10:
                                if (!(typeof location === "string")) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 13;
                                return this.getLatLon(location);

                            case 13:
                                loc = _context.sent;
                                _context.next = 21;
                                break;

                            case 16:
                                if (!(location.lat < -90 || location.lat > 90)) {
                                    _context.next = 18;
                                    break;
                                }

                                throw new RangeError("Latitude must be between -90 and 90");

                            case 18:
                                if (!(location.lng < -180 || location.lng > 180)) {
                                    _context.next = 20;
                                    break;
                                }

                                throw new RangeError("Longitude must be between -180 and 180");

                            case 20:
                                loc = location;

                            case 21:
                                return _context.abrupt("return", new Person(name, dt, loc));

                            case 22:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "getTimezone",
        value: function getTimezone(p) {
            return __awaiter(this, void 0, Promise, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return rp({
                                    uri: "https://maps.googleapis.com/maps/api/timezone/json",
                                    qs: {
                                        key: this._key,
                                        location: p.lat + "," + p.lng,
                                        timestamp: Math.floor(Date.now() / 1000)
                                    },
                                    json: true
                                }).then(function (tzinfo) {
                                    return tzinfo.timeZoneId;
                                }, function (error) {
                                    throw Error(error.errorMessage);
                                });

                            case 2:
                                return _context2.abrupt("return", _context2.sent);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "getLatLon",
        value: function getLatLon(address) {
            return __awaiter(this, void 0, Promise, _regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return rp({
                                    uri: "https://maps.googleapis.com/maps/api/geocode/json",
                                    qs: {
                                        key: this._key,
                                        address: address
                                    },
                                    json: true
                                }).then(function (latlng) {
                                    return latlng.results[0].geometry.location;
                                }, function (error) {
                                    throw Error(error.error_message);
                                });

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return Person;
}();

Person._key = "AIzaSyAXnIdQxap1WQuzG0XxHfYlCA5O9GQyvuY";

var Aspect = exports.Aspect = function () {
    function Aspect(p1, p2) {
        (0, _classCallCheck3.default)(this, Aspect);

        this.p1 = p1;
        this.p2 = p2;
        this._types = {
            "conjunct": { major: true, angle: 0, orb: 6, symbol: "<" },
            "semisextile": { major: false, angle: 30, orb: 3, symbol: "y" },
            "decile": { major: false, angle: 36, orb: 1.5, symbol: ">" },
            "novile": { major: false, angle: 40, orb: 1.9, symbol: "M" },
            "semisquare": { major: false, angle: 45, orb: 3, symbol: "=" },
            "septile": { major: false, angle: 51.417, orb: 2, symbol: "V" },
            "sextile": { major: true, angle: 60, orb: 6, symbol: "x" },
            "quintile": { major: false, angle: 72, orb: 2, symbol: "Y" },
            "bilin": { major: false, angle: 75, orb: 0.9, symbol: "-" },
            "binovile": { major: false, angle: 80, orb: 2, symbol: ";" },
            "square": { major: true, angle: 90, orb: 6, symbol: "c" },
            "biseptile": { major: false, angle: 102.851, orb: 2, symbol: "N" },
            "tredecile": { major: false, angle: 108, orb: 2, symbol: "X" },
            "trine": { major: true, angle: 120, orb: 6, symbol: "Q" },
            "sesquiquadrate": { major: false, angle: 135, orb: 3, symbol: "b" },
            "biquintile": { major: false, angle: 144, orb: 2, symbol: "C" },
            "inconjunct": { major: false, angle: 150, orb: 3, symbol: "n" },
            "treseptile": { major: false, angle: 154.284, orb: 1.1, symbol: "B" },
            "tetranovile": { major: false, angle: 160, orb: 3, symbol: ":" },
            "tao": { major: false, angle: 165, orb: 1.5, symbol: "—" },
            "opposition": { major: true, angle: 180, orb: 6, symbol: "m" }
        };
        var l1 = p1.longitude,
            l2 = p2.longitude,
            ng = Math.abs(l1 - l2),
            r1 = p1.isRetrograde(),
            r2 = p2.isRetrograde(),
            s1 = Math.abs(p1.speed),
            s2 = Math.abs(p2.speed),
            ct = false;
        if (ng > 180 + this._types["opposition"].orb) {
            ng = l1 > l2 ? 360 - l1 + l2 : 360 - l2 + l1;
            ct = true;
        }
        for (var type in this._types) {
            var t = this._types[type];
            if (ng >= t.angle - t.orb && ng <= t.angle + t.orb) {
                this._type = type;
            }
        }
        if (typeof this._type === "undefined") {
            throw new Error("There is no aspect between these two planets.");
        }
        this._orb = Number((ng % 1).toFixed(6));
        var orb = ng - this._types[this._type].angle;
        if ((orb < 0 && !ct && l2 > l1 || orb > 0 && !ct && l1 > l2 || orb < 0 && ct && l1 > l2 || orb > 0 && ct && l2 > l1) && (!r1 && !r2 && s2 > s1 || r1 && r2 && s1 > s2 || r1 && !r2) || (orb > 0 && !ct && l2 > l1 || orb < 0 && !ct && l1 > l2 || orb > 0 && ct && l1 > l2 || orb < 0 && ct && l2 > l1) && (!r1 && !r2 && s1 > s2 || r1 && r2 && s2 > s1 || !r1 && r2)) {
            this._applying = true;
        } else {
            this._applying = false;
        }
    }

    (0, _createClass3.default)(Aspect, [{
        key: "isApplying",
        value: function isApplying() {
            return this._applying;
        }
    }, {
        key: "isMajor",
        value: function isMajor() {
            return this._types[this._type].major;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "orb",
        get: function get() {
            return this._orb;
        }
    }, {
        key: "symbol",
        get: function get() {
            return this._types[this._type].symbol;
        }
    }]);
    return Aspect;
}();

var ChartType = exports.ChartType = undefined;
(function (ChartType) {
    ChartType[ChartType["Basic"] = 0] = "Basic";
    ChartType[ChartType["Transits"] = 1] = "Transits";
    ChartType[ChartType["Synastry"] = 2] = "Synastry";
    ChartType[ChartType["Combined"] = 3] = "Combined";
    ChartType[ChartType["Davison"] = 4] = "Davison";
    ChartType[ChartType["CombinedTransits"] = 5] = "CombinedTransits";
    ChartType[ChartType["DavisonTransits"] = 6] = "DavisonTransits";
})(ChartType || (exports.ChartType = ChartType = {}));
;

var Chart = exports.Chart = function () {
    function Chart(name, p1, cdata, p2) {
        var type = arguments.length <= 4 || arguments[4] === undefined ? ChartType.Basic : arguments[4];
        (0, _classCallCheck3.default)(this, Chart);

        this.name = name;
        this.p1 = p1;
        this.p2 = p2;
        this.type = type;
        this._signs = [{ name: "aries", symbol: "q", v: 1 }, { name: "taurus", symbol: "w", v: 1 }, { name: "gemini", symbol: "e", v: 1 }, { name: "cancer", symbol: "r", v: 1 }, { name: "leo", symbol: "t", v: 1 }, { name: "virgo", symbol: "z", v: 1 }, { name: "libra", symbol: "u", v: 1 }, { name: "scorpio", symbol: "i", v: 1 }, { name: "sagittarius", symbol: "o", v: 1 }, { name: "capricorn", symbol: "p", v: 1 }, { name: "aquarius", symbol: "ü", v: 1 }, { name: "pisces", symbol: "+", v: 1 }];
        var pdata = void 0;
        switch (type) {
            case ChartType.Combined:
                pdata = this.calculateCombinedPlanets(cdata);
                this._planets1 = this.getPlanets(pdata);
                this._ascendant = pdata.ascendant;
                this._houses = pdata.houses;
                break;
            case ChartType.CombinedTransits:
                pdata = this.calculateCombinedPlanets(cdata);
                this._planets1 = this.getPlanets(pdata);
                this._planets2 = this.getPlanets(cdata[2]);
                this._ascendant = pdata.ascendant;
                this._houses = pdata.houses;
                break;
            default:
                this._planets1 = this.getPlanets(cdata[0]);
                if (cdata[1]) {
                    this._planets2 = this.getPlanets(cdata[1]);
                }
                this._ascendant = cdata[0].ascendant;
                this._houses = cdata[0].houses;
                break;
        }
        this.calculateAspects();
    }

    (0, _createClass3.default)(Chart, [{
        key: "getPlanets",
        value: function getPlanets(cdata) {
            var planets = [];
            for (var p in cdata.planets) {
                var pd = cdata.planets[p];
                planets.push(new Planet(pd.name, pd.lon, pd.lat, pd.spd));
            }
            return planets;
        }
    }, {
        key: "calculateAspects",
        value: function calculateAspects() {
            this._aspects = [];
            if (!this._planets2) {
                for (var i in this._planets1) {
                    for (var j in this._planets1) {
                        if (i !== j && j > i) {
                            try {
                                this._aspects.push(new Aspect(this._planets1[i], this._planets1[j]));
                            } catch (err) {}
                        }
                    }
                }
            } else {
                for (var _i in this._planets1) {
                    for (var _j in this._planets2) {
                        try {
                            this._aspects.push(new Aspect(this._planets1[_i], this._planets2[_j]));
                        } catch (err) {}
                    }
                }
            }
        }
    }, {
        key: "calculateCombinedPlanets",
        value: function calculateCombinedPlanets(cdata) {
            var cd = { "planets": { "sun": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "moon": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "mercury": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "venus": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "mars": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "jupiter": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "saturn": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "uranus": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "neptune": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "pluto": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "north node": { "name": "north node", "lon": null, "lat": null, "spd": null, "r": null }, "south node": { "name": "south node", "lon": null, "lat": null, "spd": null, "r": null }, "chiron": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "pholus": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "ceres": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "pallas": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "juno": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "vesta": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "cupido": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "chariklo": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "chaos": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "eris": { "name": null, "lon": null, "lat": null, "spd": null, "r": null }, "nessus": { "name": null, "lon": null, "lat": null, "spd": null, "r": null } }, "houses": [null, null, null, null, null, null, null, null, null, null, null, null], "ascendant": null, "mc": null };
            for (var p in cdata[0].planets) {
                cd.planets[p].name = p;
                cd.planets[p].lon = this.getLonMidpoint(cdata[0].planets[p].lon, cdata[1].planets[p].lon);
                cd.planets[p].lat = (cdata[0].planets[p].lat + cdata[1].planets[p].lat) / 2;
                cd.planets[p].spd = (cdata[0].planets[p].spd + cdata[1].planets[p].spd) / 2;
            }
            for (var h in cdata[0].houses) {
                cd.houses[h] = this.getLonMidpoint(cdata[0].houses[h], cdata[1].houses[h]);
            }
            cd.ascendant = this.getLonMidpoint(cdata[0].ascendant, cdata[1].ascendant);
            cd.mc = this.getLonMidpoint(cdata[0].mc, cdata[1].mc);
            return cd;
        }
    }, {
        key: "getLonMidpoint",
        value: function getLonMidpoint(l1, l2) {
            var mp = void 0,
                high = void 0,
                low = void 0;
            if (l1 === l2) {
                return l1;
            }
            high = l1 > l2 ? l1 : l2;
            low = l1 < l2 ? l1 : l2;
            if (high - low <= 180) {
                mp = (high + low) / 2;
            } else {
                mp = ((low + 360 - high) / 2 + high) % 360;
            }
            return mp;
        }
    }, {
        key: "refreshTransits",
        value: function refreshTransits() {
            var date = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
                var cdata;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(ChartType.Synastry === this.type)) {
                                    _context4.next = 2;
                                    break;
                                }

                                throw new Error("You cannot refresh transits on a synastry chart");

                            case 2:
                                if (null === date) {
                                    date = new Date().toISOString();
                                }
                                _context4.next = 5;
                                return ChartFactory.getChartData(date, this.p1.location);

                            case 5:
                                cdata = _context4.sent;

                                this._planets2 = this.getPlanets(cdata);
                                this.calculateAspects();

                            case 8:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "houses",
        get: function get() {
            return this._houses;
        }
    }, {
        key: "aspects",
        get: function get() {
            return this._aspects;
        }
    }, {
        key: "ascendant",
        get: function get() {
            return this._ascendant;
        }
    }, {
        key: "innerPlanets",
        get: function get() {
            return this._planets2 ? this._planets1 : [];
        }
    }, {
        key: "outerPlanets",
        get: function get() {
            return this._planets2 ? this._planets2 : this._planets1;
        }
    }]);
    return Chart;
}();

var ChartFactory = exports.ChartFactory = function () {
    function ChartFactory() {
        (0, _classCallCheck3.default)(this, ChartFactory);
    }

    (0, _createClass3.default)(ChartFactory, null, [{
        key: "create",
        value: function create(name, p1) {
            var p2 = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var type = arguments.length <= 3 || arguments[3] === undefined ? ChartType.Basic : arguments[3];

            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee5() {
                var cdata, date, p;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!(null === name || "undefined" === typeof name || 0 === name.length)) {
                                    _context5.next = 2;
                                    break;
                                }

                                throw Error("Chart must have a name (ChartFactory)");

                            case 2:
                                if (!(null === p1 || typeof p1 === "undefined")) {
                                    _context5.next = 4;
                                    break;
                                }

                                throw Error("Person or Event cannot be null or undefined (ChartFactory)");

                            case 4:
                                _context5.t0 = type;
                                _context5.next = _context5.t0 === ChartType.Synastry ? 7 : _context5.t0 === ChartType.Combined ? 7 : _context5.t0 === ChartType.CombinedTransits ? 7 : _context5.t0 === ChartType.Davison ? 7 : 9;
                                break;

                            case 7:
                                if (!(null === p2)) {
                                    _context5.next = 9;
                                    break;
                                }

                                throw Error("2nd Person or Event cannot be null for this chart type (ChartFactory)");

                            case 9:
                                cdata = [], date = void 0, p = void 0;
                                _context5.t1 = type;
                                _context5.next = _context5.t1 === ChartType.Transits ? 13 : _context5.t1 === ChartType.Synastry ? 17 : _context5.t1 === ChartType.Combined ? 17 : _context5.t1 === ChartType.CombinedTransits ? 21 : _context5.t1 === ChartType.Davison ? 25 : _context5.t1 === ChartType.DavisonTransits ? 33 : 39;
                                break;

                            case 13:
                                _context5.next = 15;
                                return Promise.all([ChartFactory.getChartData(p1.date, p1.location), ChartFactory.getChartData(new Date().toISOString(), p1.location)]);

                            case 15:
                                cdata = _context5.sent;
                                return _context5.abrupt("return", new Chart(name, p1, cdata, null, type));

                            case 17:
                                _context5.next = 19;
                                return Promise.all([ChartFactory.getChartData(p1.date, p1.location), ChartFactory.getChartData(p2.date, p2.location)]);

                            case 19:
                                cdata = _context5.sent;
                                return _context5.abrupt("return", new Chart(name, p1, cdata, null, type));

                            case 21:
                                _context5.next = 23;
                                return Promise.all([ChartFactory.getChartData(p1.date, p1.location), ChartFactory.getChartData(p2.date, p2.location), ChartFactory.getChartData(new Date().toISOString(), p1.location)]);

                            case 23:
                                cdata = _context5.sent;
                                return _context5.abrupt("return", new Chart(name, p1, cdata, null, type));

                            case 25:
                                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                                _context5.t2 = cdata;
                                _context5.next = 30;
                                return ChartFactory.getChartData(date, p);

                            case 30:
                                _context5.t3 = _context5.sent;

                                _context5.t2.push.call(_context5.t2, _context5.t3);

                                return _context5.abrupt("return", new Chart(name, p1, cdata));

                            case 33:
                                date = ChartFactory.getDatetimeMidpoint(p1.date, p2.date);
                                p = ChartFactory.getGeoMidpoint(p1.location, p2.location);
                                _context5.next = 37;
                                return Promise.all([ChartFactory.getChartData(date, p), ChartFactory.getChartData(new Date().toISOString(), p)]);

                            case 37:
                                cdata = _context5.sent;
                                return _context5.abrupt("return", new Chart(name, p1, cdata, null, type));

                            case 39:
                                _context5.t4 = cdata;
                                _context5.next = 42;
                                return ChartFactory.getChartData(p1.date, p1.location);

                            case 42:
                                _context5.t5 = _context5.sent;

                                _context5.t4.push.call(_context5.t4, _context5.t5);

                                return _context5.abrupt("return", new Chart(name, p1, cdata));

                            case 45:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "getGeoMidpoint",
        value: function getGeoMidpoint(p1, p2) {
            var lat1 = ChartFactory.toRadians(p1.lat),
                lng1 = ChartFactory.toRadians(p1.lng),
                lat2 = ChartFactory.toRadians(p2.lat),
                lng2 = ChartFactory.toRadians(p2.lng),
                bx = Math.cos(lat2) * Math.cos(lng2 - lng1),
                by = Math.cos(lat2) * Math.sin(lng2 - lng1),
                lng3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx),
                lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt(Math.pow(Math.cos(lat1) + bx, 2) + Math.pow(by, 2)));
            return {
                lat: ChartFactory.toDegrees(lat3),
                lng: ChartFactory.toDegrees(lng3)
            };
        }
    }, {
        key: "getDatetimeMidpoint",
        value: function getDatetimeMidpoint(date1, date2) {
            var d1 = new Date(date1).getTime(),
                d2 = new Date(date2).getTime(),
                ts = void 0;
            if (d1 === d2) {
                return date1;
            }
            ts = d1 < d2 ? d1 + (d2 - d1) / 2 : d2 + (d1 - d2) / 2;
            return new Date(ts).toISOString();
        }
    }, {
        key: "getChartData",
        value: function getChartData(date, p) {
            return __awaiter(this, void 0, Promise, _regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return rp({
                                    uri: "http://www.morphemeris.com/ephemeris.php",
                                    qs: {
                                        date: date,
                                        lat: p.lat,
                                        lon: p.lng
                                    },
                                    json: true
                                }).then(function (cdata) {
                                    return cdata;
                                });

                            case 2:
                                return _context6.abrupt("return", _context6.sent);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }]);
    return ChartFactory;
}();

ChartFactory.toRadians = function (degrees) {
    return degrees * Math.PI / 180;
};
ChartFactory.toDegrees = function (radians) {
    return radians * 180 / Math.PI;
};

//# sourceMappingURL=astrologyjs.js.map
