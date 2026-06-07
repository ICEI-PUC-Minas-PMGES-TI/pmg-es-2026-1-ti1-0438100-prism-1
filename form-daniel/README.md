## Configuração e execução do ambiente

Este tutorial explica como rodar o projeto localmente e testar o fluxo do formulario.

### Abrir o terminal na raiz do projeto

No terminal, entre na pasta principal do projeto:

```powershell
cd C:\Users\Danie\Desktop\FrontEnd\FormPrism\pmg-es-2026-1-ti1-0438100-prism-1
```

### Instalar as dependencias

Execute este comando uma vez, caso as dependencias ainda nao estejam instaladas:

```powershell
npm install
```

### Iniciar o projeto

Execute:

```powershell
npm run start
```

Esse comando inicia dois servidores ao mesmo tempo:

- Frontend: `http://localhost:3000`
- API JSON Server: `http://localhost:3001`




### Passo a passo

1. Rodar `npm run start`.
2. Abrir `http://localhost:3000/form-daniel/form.html`.
3. Preencher o formulario.
4. Clicar em `Enviar` na ultima etapa.
5. Conferir a mensagem de sucesso.
6. Abrir `http://localhost:3000/submissions.html`.
7. Verificar se o envio aparece na tabela.
8. Abrir `http://localhost:3001/submissions`.
9. Confirmar que o mesmo envio aparece na API.

### Problemas comuns

Se a pagina de envios nao carregar dados, confira se a API esta rodando:

```text
http://localhost:3001/submissions
```

Se essa URL nao abrir, pare o terminal com `Ctrl + C` e rode novamente:

```powershell
npm run start
```

Se as portas `3000` ou `3001` estiverem ocupadas, o script `prestart` tenta libera-las automaticamente usando `kill-port`.

### Arquivos principais

- `form-daniel/form.html`: estrutura do formulario.
- `form-daniel/form.js`: navegacao por etapas, validacao e envio para a API.
- `form-daniel/form.css`: estilos do formulario.
- `submissions.html`: pagina que mostra os envios.
- `submissions.js`: busca os envios em `http://localhost:3001/submissions`.
- `db.json`: arquivo onde o JSON Server salva os dados.
