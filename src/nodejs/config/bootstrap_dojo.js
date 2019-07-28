// Load packages specification for our app in the custom_packages
const customPackages = require('./custom_packages');

module.exports = (loadModules) => {
    // The module to "bootstrap"
    const requiredPackages = [{
        name: "dojo",
        location: "dojo"
    },{
        name: "dijit",
        location: "dijit"
    },{
        name: "dojo_patches",
        location: "../lib_patches/dojo"
    }];
    const packages = requiredPackages.concat(customPackages);
    
    // Configuration Object for Dojo Loader:
    dojoConfig = {
        // baseUrl: "src/", // Where we will put our packages
        baseUrl: "./node_modules", 
        async: 1, // We want to make sure we are using the "modern" loader
        hasCache: {
            "host-node": 1, // Ensure we "force" the loader into Node.js mode
            // "dom": 1 // Ensure that none of the code assumes we have a DOM
        },
        // While it is possible to use config-tlmSiblingOfDojo to tell the
        // loader that your packages share the same root path as the loader,
        // this really isn't always a good idea and it is better to be
        // explicit about our package map.
        packages: packages,

        // dojo/domReady is not aware of a window object that we save in the 
        // global variable and we need to patch this (See (#Patch) in 
        // "dojo_patches/domReady")
        aliases: [["dojo/domReady", "dojo_patches/domReady"]],
        
        deps: loadModules, // And array of modules to load on "boot",
    };


    // Now load the Dojo loader
    require("dojo/dojo");
}