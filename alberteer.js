const puppeteer = require('puppeteer');

const sleep = (time) => new Promise((res) => setTimeout(res, time));


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // page.on('console', msg => console.log('PAGE LOG:', msg));
  page.on('error', console.error.bind(null, 'PAGE ERROR >'));
  page.on('pageerror', console.error.bind(null, 'pageerror >'));

  await page.goto('https://m.albert.nyu.edu/app/catalog/classSearch');
  console.log('page loaded');
  await page.screenshot({ path: 'example.png' });
  console.log('page shotted');

  await page.evaluate(() => {
    console.log('evaluating');

    const school = 'Tandon - Grad';
    const subject = 'Computer Science';

    // select term
    // <option value="1184" data-href="https://m.albert.nyu.edu/app/catalog/classSearch/1184">Spring 2018</option>
    $('#term option[value="1184"]');

    // open select school, this select use bootstrap dropdown
    // $('[data-id="search-acad-group"]').click();
    $('.btn :contains("Select School")').click();

    // select dropdown with school
    $(`span:contains("${school}")`).click();

    // open subject
    $('.btn :contains("Select Subject")').click();

    // select subject
    $(`span:contains("${subject}")`).click();

    console.log('will search', $('.btn:contains("Search")'));
  });

  await page.screenshot({ path: 'will_search.png' });

  await sleep(1000);

  await page.screenshot({ path: 'will_search2.png' });

  await page.evaluate(() => {
    // search it!
    $('.btn:contains("Search")').click();
  });

  // inject `getClasses` into page
  await page.evaluate(() => {
    window.getClasses = async () => {
      console.log('getting classes');
      // get classes
      const classTitles = $('.class-title-header');
      if (classTitles === null || classTitles === undefined || classTitles.length === 0) {
        return undefined;
      } else {
        return classTitles.map(function () { return $.trim($(this).text()); }).get();
      }
    }
  });

  let idx = 0;
  while (idx < 100) {
    await page.screenshot({ path: `get_class_${idx}.png` });
    const classes = await page.evaluate(() => {
      return window.getClasses();
    });
    if (classes === undefined) {
      await sleep(1000);
    } else {
      console.log(classes.join('\n'));
      break;
    }
  }

  await browser.close();
})();
