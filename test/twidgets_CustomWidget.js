define([
    // dojo
    "dojo/dom-construct",

    // Source under Test (SUT)
    "app-src/widgets/CustomWidget",

    // Test Utils
    "app-test/utils/setup_env"


], function(domConstruct, CustomWidget) {

    let widgetSUT;

    describe('Test CustomWidget - does not require dom', function () {

        beforeEach(function() {
            // runs before each test in this block

            // Create a widget under test
            widgetSUT = new CustomWidget();
            widgetSUT.startup();
          });
        
        afterEach(function() {
            // runs after each test in this block

            // Destroy a widget under test
            widgetSUT.destroy();
        });

        
        it('Widget should have appropriate default properties', function () {

            chai.expect(widgetSUT.baseClass).to.equal('someWidget');
            chai.expect(widgetSUT.title).to.equal('Button Widget');
            chai.expect(widgetSUT._counter).to.equal(0);

        });

        it('Constructor should take "title" as an optional input argument', function () {

            let testTitle = 'Test Button Widget';
            let obj = new CustomWidget({
                title:  testTitle
            });

            chai.expect(obj.title).to.equal(testTitle);

        });

        it('_getTextOnClick should return an appropriate title text', function () {

            // With the default counter (_counter == 0)
            let actText = widgetSUT._getTextOnClick()
            let expText_lt_2 = widgetSUT.title + " was clicked!";
            
            chai.expect(actText).to.equal(expText_lt_2);

            // When _counter == 1
            widgetSUT._counter = 1;

            actText = widgetSUT._getTextOnClick()
            chai.expect(actText).to.equal(expText_lt_2);

            // When _counter > 1 (Another text should be use)
            widgetSUT._counter = 2;

            actText = widgetSUT._getTextOnClick()

            let gen_expText_gte_2 = (num) => widgetSUT.title + " was clicked " + num + " times.";
            chai.expect(actText).to.equal(gen_expText_gte_2(2));


            // when _counter == 10
            widgetSUT._counter = 10;

            actText = widgetSUT._getTextOnClick()
            chai.expect(actText).to.equal(gen_expText_gte_2(10));
        });

    });

  
    describe('Test CustomWidget - requires dom', function () {

        before(function() {
            // runs before all tests in this block
            
            // Create a test div that will be used to place a widget
            domConstruct.create("div", { id: "testid"}, document.body);

        });
        
        after(function() {
            // runs after all tests in this block

            // Destroy the test div before leaving the test
            domConstruct.destroy("testid");
        });

        beforeEach(function() {
            // runs before each test in this block


            widgetSUT = new CustomWidget();
            widgetSUT.placeAt('testid')

            widgetSUT.startup();
          });
        
        afterEach(function() {
            // runs after each test in this block
            widgetSUT.destroy();
        });

        
        it('Clicking button should update the innerText of title dom', function () {

            // Before clicking - Default text must be displayed
            var selector_text = '.' + widgetSUT.baseClass + 'Title'
            chai.expect($(selector_text).text())
                .to.equal(widgetSUT.title);

            // Clicking once - Appropriate text must be displayed

            var selector_button = '.' + widgetSUT.baseClass + 'Button'
            $(selector_button).click();

            chai.expect($(selector_text).text())
                .to.equal(widgetSUT.title + ' was clicked!');

            // Clicking more than once - Appropriate text must be displayed
            $(selector_button).click();

            chai.expect($(selector_text).text())
                .to.equal(widgetSUT.title + ' was clicked 2 times.');


        });

        it('Clicking button should increase the internal counter', function () {


            // Default counter value
            chai.expect(widgetSUT._counter).to.equal(0);

            // Clicking button should increase the count
            var selector_button = '.' + widgetSUT.baseClass + 'Button'
            $(selector_button).click();

            chai.expect(widgetSUT._counter).to.equal(1);

        });

    });
});