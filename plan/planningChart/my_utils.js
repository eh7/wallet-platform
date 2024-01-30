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

  for (let i=1; i<=52; i++) {
    let date;
    date = new Date();
    date.setDate(date.getDate() + (7 * i));
    dates.push(date);
  }

  const tasks = [{
    id: 1,
    name: 'Phase 1 Functionality Implemenation',
    start: dates[0],
    duration: 25 * 7,
    percent: 0.1,
  }, {
    id: 11,
    name: 'Release Phase 1',
    start: dates[25],
    type: 'milestone'
  }, {
    id: 12,
    name: 'Phase 1 Systems Arcitecture Analysis and Design',
    start: dates[0],
    duration: 3 * 7,
  }, {
    id: 2,
    name: 'Platform Service Development',
    start: dates[3],
    duration: 30 * 7,
  }, {
    id: 21,
    name: 'Key Service',
    start: dates[3],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 22,
    name: 'P2P Network Service',
    start: dates[5],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 23,
    name: 'Data Service',
    start: dates[7],
    duration: 3 * 7,
    parent: 2,
  }, {
    id: 24,
    name: 'Smart Contract ABI Service',
    start: dates[10],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 25,
    name: 'Package Management Service',
    start: dates[12],
    duration: 3 * 7,
    parent: 2,
  }, {
    id: 3,
    name: 'User Interface development',
    start: dates[15],
    duration: 2 * 7,
  }, {
    id: 31,
    name: 'Wallet Interface',
    start: dates[15],
    parent: 3,
    duration: 2 * 7,
  }, {
    id: 32,
    name: 'Package Interface',
    start: dates[17],
    parent: 3,
    duration: 2 * 7,
  }, {
    id: 33,
    name: 'Developer Interface',
    start: dates[19],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 34,
    name: 'Service Provider Interface',
    start: dates[21],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 35,
    name: 'Phase 1 Service Integration',
    start: dates[23],
    duration: 7,
  }, {
    id: 36,
    name: 'Phase 1 Testing',
    start: dates[24],
    duration: 7,
  }, {
    id: 37,
    name: 'Phase 1 Functionality Review and Optimisation',
    start: dates[25],
    duration: 7,
  }, {
    id: 4,
    name: 'Phase 2 Functionality Implemenation',
    start: dates[29],
    duration: 21 * 7,
  }, {
    id: 41,
    name: 'Release Phase 2',
    start: dates[50],
    type: 'milestone'
  }, {
    id: 42,
    name: 'Phase 2 Systems Arcitecture Analysis and Design',
    start: dates[26],
    duration: 3 * 7,
  }];

//  tasks.forEach((v) => {
//    v.start = rand();
//    v.duration = Math.random() * 90;
//    v.percent = Math.random();
//  });
  const links = [
  {
    source: 12,
    target: 21,
    type: 'FS',
    lag: 3
  }, {
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
    source: 25,
    target: 31,
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
    source: 34,
    target: 35,
    type: 'FS',
    lag: 3
  }, {
    source: 35,
    target: 36,
    type: 'FS',
    lag: 3
  }, {
    source: 36,
    target: 37,
    type: 'FS',
    lag: 3
  }, {
    source: 37,
    target: 42,
    type: 'FS',
    lag: 3
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
