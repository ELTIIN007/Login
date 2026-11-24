# Arena•Go

Sistema demonstrativo de compra de ingressos para jogos de futebol desenvolvido com Angular standalone.

## Funcionalidades

- Login em `/entrar` com `emily@email.com` / `123456`
- Perfil e catálogo em `/perfil`
- Seleção de jogo, quantidade e cálculo do total
- Confirmação visual da compra
- Consulta de CEP com ViaCEP
- Interceptor de autenticação Bearer
- Interceptor de erro 401 com retorno ao login
- Guard para proteger o perfil

## Executar

```bash
npm install
npm start
```

Acesse `http://localhost:4200/`.

## Validar

```bash
npm test -- --watch=false
npm run build
```
