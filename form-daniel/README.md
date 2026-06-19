## Configuracao e execucao do formulario

Este projeto funciona diretamente no navegador e usa apenas LocalStorage para
guardar rascunhos e envios.

### Como abrir

Abra o arquivo abaixo no navegador:

```text
form-daniel/form.html
```

### Como testar o fluxo

1. Abrir `form-daniel/form.html`.
2. Preencher o formulario.
3. Clicar em `Enviar` na ultima etapa.
4. Atualizar a pagina e confirmar que os dados continuam salvos no navegador.

### Armazenamento local

Os dados sao salvos no LocalStorage do navegador:

- `form-daniel-wizard-draft`: rascunho do formulario em andamento.
- `form-daniel-submissions`: envios finalizados.

Para apagar os dados do navegador, limpe o armazenamento local do site nas
ferramentas do navegador.

### Arquivos principais

- `form-daniel/form.html`: estrutura do formulario.
- `form-daniel/form.js`: navegacao por etapas, validacao, rascunho e envio para LocalStorage.
- `form-daniel/form.css`: estilos do formulario.
