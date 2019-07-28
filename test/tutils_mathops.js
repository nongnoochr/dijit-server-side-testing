define([

    // Source under Test (SUT)
    "app-src/utils/mathops",

], function(mathops, CustomWidget) {
  
    describe('Test mathops', function () {
        it('"add" method should work properly', function () {
            chai.expect(mathops.add(1, 2)).to.equal(3);
        });

        it('"multiply" method should work properly', function () {
            chai.expect(mathops.multiply(1, 3)).to.equal(3);
        });

        it('"subtract" method should work properly', function () {
            chai.expect(mathops.subtract(5, 2)).to.equal(3);
        });

        it('"divide" method should work properly', function () {
            chai.expect(mathops.divide(6, 2)).to.equal(3);
        });
    });

});