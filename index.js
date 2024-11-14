const functions = require('@google-cloud/functions-framework');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

functions.http('helloHttp', (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).send('Método não permitido');
  }

  const { toMail, content } = req.body;

  if (!toMail || !content) {
    return res.status(400).send('Campos "toMail" e "content" são obrigatórios');
  }

  const from = {
    name: 'DonaFrost - Comida de mãe❄️',
    email: 'wrospagnol@minha.fag.edu.br',
  };

  const to = {
    name: 'Visitante do site',
    email: toMail,
  };

  const subject = 'Contato cliente via site DonaFrost❄️';
  const plainTextContent = content;

  const msg = {
    to: to.email,
    from: from.email,
    subject: subject,
    text: plainTextContent,
    html: `<strong>${plainTextContent}</strong>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      res.status(response[0].statusCode).send('Email enviado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar o e-mail');
    });
});
