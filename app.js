const
      restify = require('restify')
    , restifyPlugins = require ('restify').plugins
    , morgan = require ('morgan')
    , passport = require('passport')
    , BearerStrategy = require('passport-azure-ad').BearerStrategy
    , config = require('./config')
    , authenticatedUserTokens = []
    , serverPort = process.env.PORT || config.serverPort
;

const authenticationStrategy = new BearerStrategy(config.credentials, (token, done) => {
  let currentUser = null;

  let userToken = authenticatedUserTokens.find((user) => {
      currentUser = user;
      user.sub === token.sub;
  });

  if(!userToken) {
      authenticatedUserTokens.push(token);
  }

  return done(null, currentUser, token);
});

passport.use(authenticationStrategy);

const server = restify.createServer({ name: 'Azure Active Directory with Node.js Demo' });
server.use(morgan('dev'));
server.use(restifyPlugins.authorizationParser());
server.use(passport.initialize());
server.use(passport.session());

// Routes

server.get('/', (req, res, next) => {
    res.send(200, 'Home da api, visível publicamente. Tente chamar o endpoint /api.');
    next();
});

server.get('/api', passport.authenticate('oauth-bearer', { session: false }), (req, res, next) => {
    res.json({ message: 'Autenticado com sucesso, exibindo conteúdo do endpoint /api.' });
    return next();
});

// start server

server.listen(serverPort);

console.log('Servidor iniciado com sucesso na porta ' + serverPort)