const { search } = require('./index');
const yargs = require('yargs');

async function main() {
  const argv = yargs.command('search [school] [subject]', 'search for class')
    .option('school', {
      describe: 'school to search for, must exactly match from web ui, e.g. `tandon grad`',
      demandOption: true,
    })
    .option('subject', {
      describe: 'subject to search for, must exactly match from web ui, e.g. `computer science`',
      demandOption: true,
    })
    .option('term', {
      describe: 'term to search for, must exactly match from web ui, e.g. `Spring 2018`',
      demandOption: true,
    })
    .option('verbose', {
      alias: 'v',
      default: false,
      type: 'boolean',
    })
    .option('headful', {
      default: false,
      type: 'boolean',
    })
    .argv;

  console.log(JSON.stringify(
    await search(argv.term, argv.school, argv.subject, argv.verbose && console.log, !argv.headful),
    undefined,
    2,
  ));
}

if (require && require.main==module) {
  (async () => {
    try {
      await main();
    }
    catch (err) {
      console.error(err);
    }
  })();

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });
}
