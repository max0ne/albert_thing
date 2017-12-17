const _ = require('lodash');
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.onConsoleMessage = function (msg) {
  console.log('Page >', msg);
};
page.onResourceRequested = function (requestData, networkRequest) {
  // console.log('Request ' + JSON.stringify(request, undefined, 2));
  console.log('Request ' + requestData.url);
};
page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function (item) {
    console.log('  ', item.file, ':', item.line);
  });
};

page.open('https://m.albert.nyu.edu/app/catalog/classSearch', function (status) {
  console.log('page loaded with status:', status);
  page.evaluate(function () {

    const school = 'Tandon - Grad';
    const subject = 'Computer Science';

    // not sure how to wait for search so just do setTimeout for now..
    function getClasses(cb) {
      const __getClass = function () {
        // get classes
        const classTitles; // = $('.class-title-header');
        if (classTitles === null || classTitles === undefined || classTitles.length === 0) {
          console.log('waiting for classes response')
          setTimeout(__getClass, 1000);
        } else {
          console.log('classTitles');
          // console.log(classTitles);
          // cb(classTitles.map(function () { return $.trim($(this).text()); }).get());
        }
      };
      __getClass();
    }

    // select term
    // <option value="1184" data-href="https://m.albert.nyu.edu/app/catalog/classSearch/1184">Spring 2018</option>
    $('#term option[value="1184"]');

    // open select school, this select use bootstrap dropdown
    // $('[data-id="search-acad-group"]').click();
    $('.btn :contains("Select School")').click();

    // select dropdown with school
    $('span:contains("' + school + '")').click();

    // open subject
    $('.btn :contains("Select Subject")').click();

    // select subject
    $('span:contains("' + subject + '}")').click();

    // search it!
    $('.btn:contains("Search")').click();

    // get them classes
    getClasses(function (classes) {
      console.log('classes', classes);
      });
  });
});
