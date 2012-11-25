describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should start at ', function() {
    expect(browser().location().url()).toBe("");
  });


});
