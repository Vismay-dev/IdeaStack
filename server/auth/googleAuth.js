const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2('1085293368367-ivofr5b0ucbhjppolg955qjde10gbqjh.apps.googleusercontent.com' 
    , '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'
     , 'https://ideastack.org' );

const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const url = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: 'https://www.googleapis.com/auth/gmail.send',
  response_type:'code',
  flowName: 'GeneralOAuthFlow',
    redirect_uri: 'https://ideastack.org',
    client_id: '1085293368367-ivofr5b0ucbhjppolg955qjde10gbqjh.apps.googleusercontent.com'
});

console.log('Authorize this app by visiting this url:', url);