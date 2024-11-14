const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

functions.http('helloHttp', (req, res) => {
  const msg = {
    to: 'wrospagnol@minha.fag.edu.br',
    from: 'wrospagnol@minha.fag.edu.br',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

});