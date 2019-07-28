
require([
    "dojo/has"


], function(
    has
    
){

    // We need to create a window object and import required libraries and add
    // them to the global objects if test is run in the nodejs environment
    if(has("host-node")){

        require([
            "dojo/_base/window",
            
            "dojo/node!jsdom",
            "dojo/node!jquery",
            "dojo/node!chai",
        
            // "dijit/form/Button"
        
        
        ], function(
            win,
            jsdom,
            jquery,
            chai) {
    
                console.log('================================');
                console.log('|- Setup window object in JSDom');
    
                var JSDOM = jsdom.JSDOM;
                var dom = new JSDOM('<!doctype html><html><body></body></html>');
                // https://airbnb.io/enzyme/docs/guides/jsdom.html
  
                window = dom.window;
                document = dom.window.document;
                navigator = {
                    userAgent: 'node.js',
                };

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

                // --------------

                console.log('|- Setup global variables');
    
                global.$ = jquery(window);
                global.chai = chai;

                // --------------
                console.log('|- Setup completed')
                console.log('================================');
    
        });

    }

});