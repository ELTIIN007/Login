# Arena•Go

- Projeto Angular standalone com rotas `/entrar` e `/perfil`.
- Login demonstrativo usa e-mail válido e senha com pelo menos 6 caracteres informados pelo usuário.
- AuthInterceptor adiciona Bearer a requisições internas, exceto ViaCEP.
- ErrorInterceptor redireciona para login em respostas 401.
- Projeto usa HttpClient, signals, Guards e componentes standalone.
