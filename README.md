# azuread-nodejs-api
Utilizando a autenticação Azure Active DIrectory em uma API com Node.Js.

Este código tem o objetivo de exemplificar a utilização da autenticação Azure AD em aplicações API em Node.Js que não possuem interface gráfica e não usam interação com o usuário para efetuar o login. Utilizando os módulos passport e azure-passport-ad do Node.js é possível usar a autenticação Azure AD na sua apliação fazendo uso da estratégia de autenticação Bearer.

# Executanto o exemplo

1 - Rode os comandos:

	git clone https://github.com/rpf16rj/azuread-nodejs-api.git

	cd azuread-nodejs-api

	npm install

2 - Editar o arquivo config.js preenchendo o Client ID e Tenant.

3 - Inicie a aplicação

	node app.js

# Obter Client ID e Secret
1 - Registre sua aplicação no Portal Azure > Active Directory > App Registration

2 - Anote o Client ID

3 - Crie um Secret ID em Authentication

4 - Anote o Secret ID



# Como usar

- Faça uma requisição GET http://localhost:3000/api e você receberá a mensagem 'Unautorized'.
- Para poder acessar, gere o token bearer para sua aplicação.

# Obter Access Token para usar na aplicação

	POST https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token  

	Tipo de Body: x-www-form-urlencoded 
	client_id: {CLIENT ID OBTIDA NO PORTAL AZURE}
	scope: {CLIENT ID OBTIDA NO PORTAL AZURE}/.default
	grant_type: client_credentials
	client_secret: {OBTIDA NO PORTAL AZURE EM AUTHORIZATION}
    
Exemplo de resposta:

    {
        "token_type": "Bearer",
        "expires_in": 3600,
        "ext_expires_in": 3600,
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJiZmM5ZjEwOC0wNmFkLTQ1NWEtOTRiMC00YTViZjdmNjE2OTQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80ZDgyYWU4Ni0xNTlhLTQwMDQtOGMxOS1iZTcyNDAyZWJjYjkvIiwiaWF0IjoxNTYxMTM5MzAwLCJuYmYiOjE1NjExMzkzMDAsImV4cCI6MTU2MTE0MzIwMCwiYWlvIjoiNDJaZ1lPaVRxRkZNMUV1L1UxWnkzaXc3amJjYkFBPT0iLCJhcHBpZCI6ImJmYzlmMTA4LTA2YWQtNDU1YS05NGIwLTRhNWJmN2Y2MTY5NCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzRkODJhZTg2LTE1OWEtNDAwNC04YzE5LWJlNzI0MDJlYmNiOS8iLCJvaWQiOiIzMzBjMTVkMi1lNmYzLTQ2MmItYmNmMC1mMzEyNTQ0N2EwMTQiLCJzdWIiOiIzMzBjMTVkMi1lNmYzLTQ2MmItYmNmMC1mMzEyNTQ0N2EwMTQiLCJ0aWQiOiI0ZDgyYWU4Ni0xNTlhLTQwMDQtOGMxOS1iZTcyNDAyZWJjYjkiLCJ1dGkiOiJaTXpzNllheWIwYXZwclAyQ3FfZEFBIiwidmVyIjoiMS4wIn0.XIcBuAi1C1vUCEYrwkHVfKGk3T1p5f1iLJIVXSDzOmuT9-u3xiCoycma8OxkGwQFcWhsWY9Bf0LWgD4HpHo36DRRjvEDwTXelI8STVUD101qP6cyhnvm4IZMKnzVdPElGmBNM57R0yX5o8ImtqoyEiF-pdNEQ7eUSWbMqNP19Z5zyg3zIKeEa1lVF-5L0tYeYNjNCjzvQ3tmyoH4ppgX2pRtdxw2oK86A4xW6qn7grS3Ah8_Gv3t_8Xa02z8BXAu3qFV_S7w3hEMr_sifbqiFFEKQi3LpwbCvuzNUFYHu8xAFM0sAvHEaFNdA1vv4Zav31q3cBMEw-Mw-PkSRmKy9w"
    }
    
Utilize o access_token como Authorization Bearer na chamada para /api do passo Como usar.

    POST http://localhost:3000/api  

    Header:
    Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJiZmM5ZjEwOC0wNmFkLTQ1NWEtOTRiMC00YTViZjdmNjE2OTQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80ZDgyYWU4Ni0xNTlhLTQwMDQtOGMxOS1iZTcyNDAyZWJjYjkvIiwiaWF0IjoxNTYxMTM5MzAwLCJuYmYiOjE1NjExMzkzMDAsImV4cCI6MTU2MTE0MzIwMCwiYWlvIjoiNDJaZ1lPaVRxRkZNMUV1L1UxWnkzaXc3amJjYkFBPT0iLCJhcHBpZCI6ImJmYzlmMTA4LTA2YWQtNDU1YS05NGIwLTRhNWJmN2Y2MTY5NCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzRkODJhZTg2LTE1OWEtNDAwNC04YzE5LWJlNzI0MDJlYmNiOS8iLCJvaWQiOiIzMzBjMTVkMi1lNmYzLTQ2MmItYmNmMC1mMzEyNTQ0N2EwMTQiLCJzdWIiOiIzMzBjMTVkMi1lNmYzLTQ2MmItYmNmMC1mMzEyNTQ0N2EwMTQiLCJ0aWQiOiI0ZDgyYWU4Ni0xNTlhLTQwMDQtOGMxOS1iZTcyNDAyZWJjYjkiLCJ1dGkiOiJaTXpzNllheWIwYXZwclAyQ3FfZEFBIiwidmVyIjoiMS4wIn0.XIcBuAi1C1vUCEYrwkHVfKGk3T1p5f1iLJIVXSDzOmuT9-u3xiCoycma8OxkGwQFcWhsWY9Bf0LWgD4HpHo36DRRjvEDwTXelI8STVUD101qP6cyhnvm4IZMKnzVdPElGmBNM57R0yX5o8ImtqoyEiF-pdNEQ7eUSWbMqNP19Z5zyg3zIKeEa1lVF-5L0tYeYNjNCjzvQ3tmyoH4ppgX2pRtdxw2oK86A4xW6qn7grS3Ah8_Gv3t_8Xa02z8BXAu3qFV_S7w3hEMr_sifbqiFFEKQi3LpwbCvuzNUFYHu8xAFM0sAvHEaFNdA1vv4Zav31q3cBMEw-Mw-PkSRmKy9w