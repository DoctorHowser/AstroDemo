var ChartFactory = require('../core/astro').ChartFactory;
var Person = require('../core/astro').Person;
var Chart = require('../core/astro').Chart;
var zodiac = require('./zodiacInterpreter');

let person;
Person.create("Melrose", "1981-01-14T11:05Z", {lat: 35.0853, lng: -106.6056}).then( //Alb mn 405am mst+7
    p => {
        person = p;
        console.log(person);
        // ...do other stuff, i.e. create a chart

        let chart;
        ChartFactory.create("Sean's natal chart", person).then(
            c => {
                chart = c;
                // ... do stuff with your chart ...
                console.log(chart.houses);
                // for(let i = 0; i < chart.aspects.length; i++){
                //     console.log(chart.aspects[i]);
                // }
                // for(let i = 0; i < chart.outerPlanets.length; i++){
                //     console.log(chart.outerPlanets[i]);
                // }
                //zodiac.getZodiacSign(chart.houses[0]);
                console.log(chart.outerPlanets[3].name);
                console.log(chart.outerPlanets[3].longitude);
                zodiac.getDegrees(chart.outerPlanets[3].longitude);

                //ComparisonChart? For Trine, Square, etc?
                //
            },
            err => {
                console.log("Ruh, roh. Something went wrong in ChartFactory.")
            }


        );
    },
    err => {
        console.log("Ruh, roh. Something went wrong in Person.")
    }
);
