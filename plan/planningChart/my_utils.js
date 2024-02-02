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

  for (let i=1; i<=100; i++) {
    let date;
    date = new Date();
    date.setDate(date.getDate() + (7 * i));
    dates.push(date);
  }

  const tasks = [{
    id: 1,
    type: 'group',
    name: 'Wallet Platfrom Design, Development, and Implementation',
    start: dates[0],
    duration: 60 * 7,
    percent: 0,
  }, {
    id: 2,
    type: 'group',
    name: 'Phase 1 Development Cycle',
    start: dates[0],
    duration: 13 * 7,
    percent: 0,
  }, {
    id: 21,
    name: 'Release Phase 1',
    start: dates[14],
    parent: 2,
    type: 'milestone'
  }, {
    id: 22,
    name: 'Phase 1 Systems Arcitecture Analysis and Design',
    start: dates[0],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 23,
    name: 'Key Management Service',
    start: dates[2],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 24,
    name: 'Payments and Transaction Services',
    start: dates[4],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 25,
    name: 'Secure Private Payments Services',
    start: dates[6],
    duration: 4 * 7,
    parent: 2,
  }, {
    id: 26,
    name: 'Wallet Interface Services',
    start: dates[10],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 27,
    name: 'Testing and Analysis of development phase 1',
    start: dates[12],
    duration: 2 * 7,
    parent: 2,
  }, {
    id: 3,
    type: 'group',
    name: 'Phase 2 Development Cycle',
    start: dates[14],
    duration: 26 * 7,
    percent: 0,
  }, {
    id: 31,
    name: 'Release Phase 2',
    start: dates[41],
    parent: 3,
    type: 'milestone'
  }, {
    id: 32,
    name: 'Phase 2 Systems Arcitecture Analysis and Design',
    start: dates[14],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 33,
    name: 'Secure Payments Service',
    start: dates[16],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 34,
    name: 'Package Manangement Service',
    start: dates[18],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 35,
    name: 'Peer to peer Web Service',
    start: dates[20],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 36,
    name: 'Peer to Peer Communication Service',
    start: dates[22],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 37,
    name: 'Key Security and Managemnt Service',
    start: dates[24],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 38,
    name: 'Crypto Asset Management Service',
    start: dates[26],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 39,
    name: 'Crypto Asset Investemnts Service',
    start: dates[28],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 310,
    name: 'Smart Contract ABI User Interface Service',
    start: dates[30],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 311,
    name: 'Enhance Wallet Interface for new services',
    start: dates[32],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 312,
    name: 'App Store Interface',
    start: dates[34],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 313,
    name: 'Integrate Core Servcies',
    start: dates[36],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 314,
    name: 'Testing and Analysis of development phase 2',
    start: dates[38],
    duration: 2 * 7,
    parent: 3,
  }, {
    id: 4,
    type: 'group',
    name: 'Phase 3 Development Cycle',
    start: dates[40],
    duration: 26 * 7,
    percent: 0,
  }, {
    id: 41,
    name: 'Release Phase 3',
    start: dates[60],
    parent: 4,
    type: 'milestone'
  }, {
    id: 42,
    name: 'Define Reward Structure and Token Economics for the Platform',
    start: dates[40],
    duration: 4 * 7,
    parent: 4,
  }, {
    id: 43,
    name: 'Service Provider Reward protocol',
    start: dates[44],
    duration: 2 * 7,
    parent: 4,
  }, {
    id: 44,
    name: 'Service Provider User Interface',
    start: dates[46],
    duration: 2 * 7,
    parent: 4,
  }, {
    id: 45,
    name: 'Intergrate the Core Servcies with the Servcie Provider Protocol',
    start: dates[48],
    duration: 3 * 7,
    parent: 4,
  }, {
    id: 46,
    name: 'Developer Reward Protocol',
    start: dates[51],
    duration: 2 * 7,
    parent: 4,
  }, {
    id: 47,
    name: 'Developer Provider User Interface',
    start: dates[53],
    duration: 2 * 7,
    parent: 4,
  }, {
    id: 48,
    name: 'Intergrate the Core Servcies with the Developer Protocol',
    start: dates[55],
    duration: 3 * 7,
    parent: 4,
  }, {
    id: 49,
    name: 'Testing and Analysis of development phase 3',
    start: dates[58],
    duration: 2 * 7,
    parent: 4,
  }];

  const links = [
  {
    source: 27,
    target: 21,
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
    source: 25,
    target: 26,
    type: 'FS',
    lag: 3
  }, {
    source: 26,
    target: 27,
    type: 'FS',
    lag: 3
  }, {
    source: 21,
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
    source: 35, target: 36, type: 'FS', lag: 3
  }, { source: 36, target: 37, type: 'FS', lag: 3
  }, { source: 37, target: 38, type: 'FS', lag: 3
  }, { source: 38, target: 39, type: 'FS', lag: 3
  }, { source: 39, target: 310, type: 'FS', lag: 3
  }, { source: 310, target: 311, type: 'FS', lag: 3
  }, { source: 311, target: 312, type: 'FS', lag: 3
  }, { source: 312, target: 313, type: 'FS', lag: 3
  }, { source: 313, target: 314, type: 'FS', lag: 3
  }, { source: 314, target: 31, type: 'FS', lag: 3
  }, { source: 42, target: 43, type: 'FS', lag: 3
  }, { source: 43, target: 44, type: 'FS', lag: 3
  }, { source: 44, target: 45, type: 'FS', lag: 3
  }, { source: 45, target: 46, type: 'FS', lag: 3
  }, { source: 46, target: 47, type: 'FS', lag: 3
  }, { source: 47, target: 48, type: 'FS', lag: 3
  }, { source: 48, target: 49, type: 'FS', lag: 3
  }, { source: 49, target: 41, type: 'FS', lag: 3
  }, { source: 31, target: 42, type: 'FS', lag: 0
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
