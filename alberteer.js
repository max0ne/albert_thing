const debug = require('debug')('alberteer');
const { browser, page, openBrowser, goto, click, button, closeBrowser, $ } = require('taiko');

/**
 * browser code
 */
function grabClasses() {
  const classes = [];
  const searchResults = $('#search-results').children().toArray();
  let classNumber, classTitle;
  searchResults.forEach((ele) => {
    if ($(ele).hasClass('class-title-header')) {
      [classNumber, classTitle] = $(ele).text().split(' - ');
      return;
    }

    const section = $(ele).find('.section-content')[0];
    if (section) {
      const sectionObj = $(section).find('.section-body').toArray().reduce((acc, curr) => {
        const [key, val] = $(curr).text().split(':');
        if (key && val) {
          acc[key.trim().toLowerCase()] = val.trim();
        }
        return acc;
      }, {});
      sectionObj.raw = $(ele).text()
        .split('\n')
        .map((tt) => tt.trim())
        .filter((tt) => tt.length > 0)
        .join('\n');
      sectionObj.href = $(ele).attr('href');
      sectionObj.classNumber = classNumber;
      sectionObj.classTitle = classTitle;
      classes.push(sectionObj);
    }
  });
  return classes;
}

/**
 * @param {string} term `Spring 2018`
 * @param {string} school `Tandon - Grad`
 * @param {string} subject `Computer Science`
 * @return {Promise<any[]>}
 */
async function search(term, school, subject) {
  try {
    await openBrowser();
    debug('open browser');
    await goto('https://m.albert.nyu.edu/app/catalog/classSearch');
    debug('goto class search');
    await click($('.btn[data-id="term"]'));
    debug('expand term');
    await click(term);
    debug(`select term ${term}`);
    await click('Select School');
    debug('expand school');
    await click(school);
    debug(`select school ${school}`);
    await click('Subject');
    debug('expand subject');
    await click(subject);
    debug(`select subject ${subject}`);
    await click(button('Search'));
    debug(`search`);
    return await page().evaluate(grabClasses);
  } catch (e) {
    debug(e);
    throw e;
  } finally {
    if (browser()) {
      closeBrowser();
    }
  }
}

module.exports = { search };
