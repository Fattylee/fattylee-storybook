const keys = require('../../config/keys');


module.exports = (options) => {
  const {
    token,
    to = ['fattylee.remod@gmail.com', 'fatai4humility@yahoo.com'],
    from = 'no-reply@storybook.com',
    subject = 'Passoword reset',
    html = `
      <div style="text-align:center; height: 400px;background: purple; color: white">
      <h2>You are a step away from resetting your Passoword,
      <a href="${keys.DOMAIN}/users/new-password/${token}" class='btn btn-light small'>Click here</a> to continue
      </h2>
      <p>Or copy the link: ${keys.DOMAIN}/${token} to your browser</p>
      </div>
    `,
    isMultiple = true,
  } = options;
  
  return {
    to,
    from,
    subject,
    html, 
    isMultiple,
  };
};


 //text: 'Hello plain world!',
 /*[
    'anonymoushackme14@gmail.com', 'anonymoushackme13@gmail.com', 'anonymoushackme12@gmail.com', 'fattylee.remod@gmail.com', 'fatai4humility@yahoo.com']*/