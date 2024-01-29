function rand(begin) {
  let date;
  let days;
  if (begin) {
    days = Math.random() * 60 + 5;
    date = new Date(begin);
  } else {
    days = Math.random() * 60 - 60;
    date = new Date();
  }
  date.setDate(date.getDate() + days);
  return date;
}

export function getData() {

  let dates = [];

  for (let i=0; i<10; i++) {
    let date;
    date = new Date();
    date.setDate(date.getDate() + (14 * i));
    dates.push(date);
//    dates[i] = date;
  }

/*
  let date;
  date = new Date();
  date.setDate(date.getDate() + 0);
console.log(date)

  let date1;
  date1 = new Date();
  date1.setDate(date.getDate() + 14);

  let date2;
  date2 = new Date();
  date2.setDate(date.getDate() + 28);

  let date3;
  date3 = new Date();
  date3.setDate(date.getDate() + 42);

  let date4;
  date4 = new Date();
  date4.setDate(date.getDate() + 56);
*/

  const tasks = [{
    id: 1,
    name: 'Modular Crypto Wallet Platform',
    start: dates[0],
    duration: (52 / 2) * 7,
    percent: 0.1,
  }, {
    id: 2,
    name: 'Platform Service Development',
    start: dates[0],
    duration: (52 / 2) * 7,
  }, {
    id: 21,
    name: 'Key Service',
    start: dates[0],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 22,
    name: 'Data Service',
    start: dates[1],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 23,
    name: 'P2P Network Service',
    start: dates[2],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 24,
    name: 'Smart Contract ABI Service',
    start: dates[3],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 25,
    name: 'Package Management Service',
    start: dates[4],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 3,
    name: 'User Interface development',
    start: dates[5],
    duration: 2 * 7,
  }, {
    id: 31,
    name: 'Wallet Interface',
    start: dates[5],
    parent: 3,
    duration: 2 * 7,
  }, {
    id: 32,
    name: 'Package Interface',
    start: dates[6],
    parent: 3,
    duration: 2 * 7,
  }, {
    id: 33,
    name: 'Developer Interface',
    start: dates[7],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 34,
    name: 'Service Provider Interface',
    start: dates[8],
    //start: date.getDate() + 3;
    duration: 2 * 7,
    parent: 3,
  }];
  const tasks_old = [{
    id: 1,
    name: 'Waterfall model'
  }, {
    id: 11,
    parent: 1,
    name: 'Requirements'
  }, {
    id: 12,
    parent: 1,
    name: 'Design'
  }, {
    id: 13,
    parent: 1,
    name: 'Implement',
    type: 'milestone'
  }, {
    id: 14,
    parent: 1,
    name: 'Verification'
  }, {
    id: 2,
    name: 'Development'
  }, {
    id: 21,
    parent: 2,
    name: 'Preliminary'
  }, {
    id: 22,
    parent: 2,
    name: 'Systems design'
  }, {
    id: 23,
    parent: 2,
    name: 'Development'
  }, {
    id: 24,
    parent: 2,
    name: 'Integration'
  }];
//  tasks.forEach((v) => {
//    v.start = rand();
//    v.duration = Math.random() * 90;
//    v.percent = Math.random();
//  });
  const links = [
  {
    source: 21,
    target: 22,
    type: 'FS',
    lag: 3
  }, {
    source: 22,
    target: 23,
    type: 'FS',
    lag: 3
  }, {
    source: 23,
    target: 24,
    type: 'FS',
    lag: 3
  }, {
    source: 24,
    target: 25,
    type: 'FS',
    lag: 3
  }, {
    source: 31,
    target: 32,
    type: 'FS',
    lag: 3
  }, {
    source: 32,
    target: 33,
    type: 'FS',
    lag: 3
  }, {
    source: 33,
    target: 34,
    type: 'FS',
    lag: 3
  }, {
  }
/*
  {
    source: 11,
    target: 12,
    type: 'FS',
    lag: 3
  }, {
    source: 12,
    target: 13,
    type: 'FS',
    lag: 5
  }, {
    source: 13,
    target: 14,
    type: 'FS'
  }, {
    source: 13,
    target: 21,
    type: 'FS'
  }, {
    source: 23,
    target: 24,
    type: 'SF'
  }
*/
  ];
console.log({
  tasks, links
});
  return { tasks, links };
}

export function formatXML (xml) {
  var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
  var wsexp = / *(.*) +\n/g;
  var contexp = /(<.+>)(.+\n)/g;
  xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
  var pad = 0;
  var formatted = '';
  var lines = xml.split('\n');
  var indent = 0;
  var lastType = 'other';
  // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
  var transitions = {
    'single->single': 0,
    'single->closing': -1,
    'single->opening': 0,
    'single->other': 0,
    'closing->single': 0,
    'closing->closing': -1,
    'closing->opening': 0,
    'closing->other': 0,
    'opening->single': 1,
    'opening->closing': 0,
    'opening->opening': 1,
    'opening->other': 1,
    'other->single': 0,
    'other->closing': -1,
    'other->opening': 0,
    'other->other': 0
  };

  for (var i = 0; i < lines.length; i++) {
    var ln = lines[i];

    // Luca Viggiani 2017-07-03: handle optional <?xml ... ?> declaration
    if (ln.match(/\s*<\?xml/)) {
      formatted += ln + '\n';
      continue;
    }

    var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
    var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
    var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
    var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
    var fromTo = lastType + '->' + type;
    lastType = type;
    var padding = '';

    indent += transitions[fromTo];
    for (var j = 0; j < indent; j++) {
      padding += '  ';
    }
    if (fromTo == 'opening->closing')
      formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
    else
      formatted += padding + ln + '\n';
  }

  return formatted;
}
