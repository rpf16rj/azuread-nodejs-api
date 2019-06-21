const serverPort = 3000;

const tenant = '{TENANT}'; // É o nome da sua organização no Azure AD Ex: contoso
const clientId = '{CLIENT ID}'; // ID da aplicação

module.exports.serverPort = serverPort;

module.exports.credentials = {
    identityMetadata: 'https://login.microsoftonline.com/' + tenant + '.onmicrosoft.com/.well-known/openid-configuration',
    clientID: clientId,
    loggingLevel: 'info'
};
