phantom.onError = function (msg, trace) {
  console.log(msg);
  // var msgStack = ['PHANTOM ERROR: ' + msg];
  // if (trace && trace.length) {
  //   trace.forEach(function (t) {
  //     msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
  //   });
  // }
  // console.error(msgStack.join('\n'));
  phantom.exit(1);
};
phantom.injectJs('albert.js');
