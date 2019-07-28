define([

], function () {
  
    // Return an object that holds basic math functions
    return {

        //function to add two values
        add: function (a, b){
            return a + b;
        },

        //function to multiply to values
        multiply: function (a, b){
            return a * b;
        },

        //function to subtract two values
        subtract: function (a, b){
            return a - b;
        },

        //function to divide two values
        divide: function (a, b){
            return (a / b);
        }

    }

});