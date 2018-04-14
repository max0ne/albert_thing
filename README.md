# a lib to query classes from NYU Albert

### use it
```bash
npm i albert_thing
```

```js
const school = 'Tandon - Grad';
const subject = 'Computer Science';
const term = 'Spring 2018';
const verbose = true; // 
const headful = true; // shows browser, i.e. un-headless mode, good for debugging
require('albert_thing').search(term, school, term, verbose && console.log, headful)
  .then(console.log);
```

### test
🤷 to be pr
