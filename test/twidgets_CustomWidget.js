define([
    // dojo
    "dojo/dom-construct",

    // Source under Test (SUT)
    "app-src/widgets/CustomWidget",

    // Test Utils
    "app-test/utils/setup_env"


], function(domConstruct, CustomWidget) {

  
    describe('Test CustomWidget - Click button', function () {
        it('should update the innerText', function () {

            var newDom = domConstruct.create("div", { id: "testid"}, document.body);
            newDom.innerHTML = '<div id="another_test_id">***** This is a new innerHTML ******</div>';

            var newTitle = 'CLICK ME!';

            var myWidget = new CustomWidget({
                'title': newTitle
            });
            myWidget.placeAt('testid')

            myWidget.startup();

            // Before clicking - Default text must be displayed
            var selector_text = '.' + myWidget.baseClass + 'Title'
            chai.expect($(selector_text).text())
                .to.equal(newTitle);

            // Clicking once - Appropriate text must be displayed

            var selector_button = '.' + myWidget.baseClass + 'Button'
            $(selector_button).click();

            chai.expect($(selector_text).text())
                .to.equal(newTitle + ' was clicked!');

            // Clicking more than once - Appropriate text must be displayed
            $(selector_button).click();

            chai.expect($(selector_text).text())
                .to.equal(newTitle + ' was clicked 2 times.');

        });
    });
});