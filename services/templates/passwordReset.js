const keys = require('../../config/keys');


module.exports = (options) => {
  const {
    token,
    to = ['fattylee.remod@gmail.com', 'fatai4humility@yahoo.com'],
    from = 'Storybook.noreply@storybook.com',
    subject = '[Storybook] Please reset your password',
    html = `

<div style="border: 1px solid rgba(0,0,0,0.2);
 padding: 20px 10px;
 box-shadow:0px 1px 2px rgba(0,0,0,0.5);
 -o-border-radius:5px;-moz-border-radius:5px;
 -webkit-border-radius:5px;border-border-radius:5px;
 color: black">
<div>
 <p>We heard that you lost your Storybook password. Sorry about that!</p>
 
 <p>But don’t worry! You can use the following link to reset your password:</p>

<div> <a 

 style="text-decoration : none ;
 border :1px solid blue ;
 padding : 5px 10px;
 background : rgb(0,123,255) ;
 color :white ;
 font-size : 1rem;
 border-radius : 5px ;
 margin-bottom : 5px ;
 display :inline-block;
 cursor: pointer;"
 href="${keys.DOMAIN}/users/new-password/${token}">Reset password</a></div>
 <p class="small">Or go to ${keys.DOMAIN}/users/new-password/${token}</p>
 
 <p>If you don’t use this link within 24 hours,
 it will expire. To get a new password reset link,
 <a href="${keys.DOMAIN}/users/forgot-password" 
 style="text-decoration : none ;
 border :1px solid blue ;
 padding : 5px 10px;
 background : rgb(0,123,255) ;
 color :white ;
 font-size : 1rem;
 border-radius : 5px ;
 margin-bottom : 5px ;
 display :inline-block;
 cursor: pointer;"
 >Click here</a> or visit ${keys.DOMAIN}/users/forgot-password</p>
 
<hr style="margin: 40px 0" />
 
 <p style="margin-top: 40px">
 Thanks, <br>
 The Storybook Team
 </p>
 </div>
</div> <!-- end container -->

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