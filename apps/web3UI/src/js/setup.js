const pageSetup = () => {
  const pathname = window.location.pathname;
  document.title  = document.title + " - " + pathname;
  //alert('setup: ' + document.title);
}

export default pageSetup;
