# Arena•Go

Sistema demonstrativo de compra de ingressos para jogos de futebol desenvolvido com Angular standalone.

## Funcionalidades

- Login em `/entrar` com e-mail válido e senha com pelo menos 6 caracteres
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
