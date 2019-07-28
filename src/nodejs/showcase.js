
require([
    "dojo/has",
    "dojo/_base/window",
    
    "dojo/node!jsdom",
    "dojo/node!jquery",
], function(
    has,
    win,
    jsdom,
    jquery
){


    console.log('================================');
    console.log('|- Setup window object in JSDom');

    // Refer to https://airbnb.io/enzyme/docs/guides/jsdom.html
    var JSDOM = jsdom.JSDOM;
    var dom = new JSDOM('<!doctype html><html><body></body></html>');

    window = dom.window;
    document = dom.window.document;
    navigator = {
        userAgent: 'node.js',
    };

    // Reference: http://jamesthom.as/blog/2013/01/15/server-side-dijit/
    // Manually add event listener test as this was only included in 
    // the "host-browser" profile.
    has.add("dom-addeventlistener", !!global.document.addEventListener);
    has.add("dom-attributes-explicit", true);
    // has.add("config-selectorEngine", "lite");

    // Fix global property to point to "window" 

    win.global = global.window;
    win.setContext(global.window, global.window.document);

    global.document = document;
    global.navigator = window.navigator;
    global.window = window;

    function copyProps(src, target) {
        Object.defineProperties(target, {
            ...Object.getOwnPropertyDescriptors(src),
            ...Object.getOwnPropertyDescriptors(target),
        });
    }

    global.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 0);
    };
    global.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
    copyProps(window, global); 

    // Attach the newly created  window object to jquery
    $ = jquery(window);
    global.$ = $;

    console.log('|- Setup completed')
    console.log('================================');

    // --- Create widgets below
    require([
        "dojo/dom-construct",
        "app-src/widgets/CustomWidget",

    ], function(domConstruct, CustomWidget) {

        const divHeader = domConstruct.create("div", {}, document.body);
        domConstruct.create("h1", { innerHTML: "Nodejs Showcase page"}, divHeader);

        const domWidgetContainer = domConstruct.create("div", { id: "widget_container"}, document.body);

        const myWidget = new CustomWidget();
        myWidget.placeAt('widget_container');
        myWidget.startup();


        console.log('===== Dom before clicking =====')
        console.log(dom.serialize());

        console.log('\n===== Dom AFTER clicking ONCE (Notice div with class "someWidgetTitle") =====');
        const selector_button = '.' + myWidget.baseClass + 'Button';
        $(selector_button).click();

        console.log(dom.serialize());

        console.log('\n===== Dom AFTER clicking TWICE (Notice div with class "someWidgetTitle") =====');
        $(selector_button).click();

        console.log(dom.serialize());

    });

});