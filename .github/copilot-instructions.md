# Arena•Go

- Projeto Angular standalone com rotas `/entrar` e `/perfil`.
- Login demonstrativo: `emily@email.com` / `123456`.
- AuthInterceptor adiciona Bearer a requisições internas, exceto ViaCEP.
- ErrorInterceptor redireciona para login em respostas 401.
- Projeto usa HttpClient, signals, Guards e componentes standalone.
