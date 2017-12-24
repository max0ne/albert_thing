const { browser, page, openBrowser, goto, click, button, closeBrowser, $ } = require('taiko');

/**
 * browser code
 */
function grabClasses() {
  const classes = {};
  const searchResults = $('#search-results').children().toArray();
  let currentClass;
  searchResults.forEach((ele) => {
    if ($(ele).hasClass('class-title-header')) {
      currentClass = $(ele).text();
      classes[currentClass] = [];
      return;
    }

    let section = $(ele).find('.section-content')[0];
    if (section) {
      const sectionObj = $(section).find('.section-body').toArray().reduce((acc, curr) => {
        const [key, val] = $(curr).text().split(':');
        if (key && val) {
          acc[key.trim()] = val.trim();
        }
        return acc;
      }, {});
      sectionObj.raw = $(ele).text()
        .split('\n')
        .map((tt) => tt.trim())
        .filter((tt) => tt.length > 0)
        .join('\n');
      sectionObj.href = $(ele).attr('href');
      classes[currentClass].push(sectionObj);
    }
  });
  return classes;
}

/**
 * @param {string} term `Spring 2018`
 * @param {string} school `Tandon - Grad`
 * @param {string} subject `Computer Science`
 * @return {promise<any>}
 */
async function search(term, school, subject) {
  try {
    await openBrowser();
    await goto('https://m.albert.nyu.edu/app/catalog/classSearch');
    await click($('.btn[data-id="term"]'));
    await click(term);
    await click('Select School');
    await click(school);
    await click('Subject');
    await click(subject);
    await click(button('Search'));

    return await page().evaluate(grabClasses);
  } catch (e) {
    throw e;
  } finally {
    if (browser()) {
      closeBrowser();
    }
  }
}

module.exports = { search };

if (require && require.main == module) {
  search('Spring 2018', 'Tandon - Grad', 'Computer Science').then(console.log).catch(console.error);
}
