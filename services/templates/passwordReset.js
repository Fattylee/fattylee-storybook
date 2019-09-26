const keys = require('../../config/keys');


module.exports = (options) => {
  const {
    token,
    to = ['fattylee.remod@gmail.com', 'fatai4humility@yahoo.com'],
    from = 'Storybook.noreply@storybook.com',
    subject = '[Storybook] Please reset your password',
    html = `
     <!DOCTYPE html>
<html>
<head>
<meta name ="viewport" content ="width=device-width, initial-scale=1">
<style> 
.container {
word-wrap: break-word;
}
.footer {
margin-top: 40px;
}
</style>

</head>
<body>
<div class="container">
 <p>We heard that you lost your Storybook password. Sorry about that!</p>
 
 <p>But don’t worry! You can use the following link to reset your password:</p>
 
 <p>${keys.DOMAIN}/users/new-password/${token}</p>
 
 <p>If you don’t use this link within 24 hours, it will expire. To get a new password reset link, visit ${keys.DOMAIN}/users/forgot-password</p>
 
 <p class="footer">
 Thanks, <br>
 The Storybook Team
 </p>
</div> <!-- end container -->
</body>
</html>`,
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