$(() => {
  const crypto = require('crypto')
  const keccak256Hash = require('keccak256')

  $('#text-input').bind('input propertychange', function() {
    const text = this.value

    const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
    $('#md5-output').text(md5)

    const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
    $('#sha1-output').text(sha1)

    const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
    $('#sha256-output').text(sha256)

    const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
    $('#sha512-output').text(sha512)

    const keccak256 = keccak256Hash(text).toString('hex')
    //const keccak256 = (keccak256Hash((text)).toString('hex')
    //$('#keccak256-output').text(text)
    $('#keccak256-output').text(keccak256)
  })

  $('#text-input').focus() // focus input box
})
