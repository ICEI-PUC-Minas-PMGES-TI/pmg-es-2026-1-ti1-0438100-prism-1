# Introdução

Informações básicas do projeto.

* **Projeto:** Guia-Beneficio
* **Repositório GitHub:** (https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0438100-prism-1.git)
* **Membros da equipe:**

  * [Theo Goulart Cardoso Vasconcelos](https://github.com/TheoGoulart333) 
  * [Daniel Heber de Souza Godinho](https://github.com/DETTRANN)
  * [Paulo César Silva Monteiro](https://github.com/PauloCesar0709)
  * [Lucas Gomes Esteves da Silva](https://github.com/LukasGom3s)
  * [Mateus Canuto Marques](https://github.com/MATEUSCANUTOPUC)
  * [Giovanni Oliveira Martins Rosa](https://github.com/Giovanni229-bit)
  * [Bernardo Alvim Fagundes de Andrade](https://github.com/beAndradeAf)
    
A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

Diante da dificuldade de centralização e simplificação das informações sobre direitos sociais, define-se o seguinte problema:

"Quais são os principais obstáculos informacionais que impedem os cidadãos brasileiros de identificarem e solicitarem os benefícios governamentais de forma autônoma?"

## Objetivos

Objetivo Geral:

Analisar e identificar as barreiras de acesso à informação sobre benefícios governamentais, visando compreender como facilitar o caminho entre o cidadão e seus direitos

Objetivos Específicos:

- Levantar os principais benefícios governamentais vigentes e seus requisitos básicos

- Identificar as maiores dúvidas e suposições da população em relação ao acesso a auxílios (através da Matriz CSD)

- Mapear os fluxos atuais de busca por informações governamentais e identificar pontos de fricção

- Propor diretrizes de organização de conteúdo que tornem as informações mais claras para o público-alvo

## Justificativa

A realização deste estudo justifica-se pela necessidade de democratizar o acesso à informação pública de natureza social. Para a sociedade, a relevância reside no potencial de reduzir a exclusão social causada pela desinformação, garantindo que direitos constitucionais sejam efetivamente exercidos. Do ponto de vista acadêmico e profissional para estudantes de tecnologia, o estudo permite explorar como o design de interface e a arquitetura de informação podem ser aplicados para resolver problemas sociais complexos, transformando dados brutos do governo em conhecimento útil e acessível para o cidadão comum

## Público-Alvo

### Mercado e Público-Alvo

#### 1. Mercado: GovTech e Tecnologia Social

A solução está inserida no ecossistema de **GovTechs** e inovação para o setor público. O foco primordial não é o lucro comercial direto, mas a eficiência na entrega de serviços públicos e o fortalecimento da cidadania

* **Cenário Atual:** Atualmente, o mercado é dominado por portais governamentais robustos (como o Gov.br), que, embora completos, são densos e burocráticos. Existe uma lacuna para soluções de **"última milha"** — ferramentas que traduzam essa complexidade para a linguagem do cidadão comum
* **Oportunidade:** Alta demanda por interfaces simplificadas que operem com fluidez em dispositivos móveis de baixo desempenho e sob conexões de internet instáveis

---

### 2. Perfil Detalhado dos Usuários

#### A. Conhecimentos Prévios e Alfabetização Informacional

* **Domínio de Termos:** O usuário típico desconhece o vocabulário administrativo (ex: *"cadastramento"*, *"deferimento"*, *"per capita"*). O seu conhecimento sobre direitos é fragmentado, baseado em fontes informais como rádio, TV ou boatos de redes sociais.
  
* **Barreira Linguística:** Existe dificuldade em interpretar textos longos ou instruções com múltiplos passos. A busca por informação é feita de forma direta e urgente (ex: *"como receber o auxílio gás"*)

#### B. Relação com a Tecnologia (Inclusão Digital)

* **Uso de Dispositivos:** O acesso é feito quase exclusivamente via dispositivos móveis. Trata-se de aparelhos, na sua maioria, de entrada ou gerações antigas, com limitações de memória e processamento
  
* **Comportamento Digital:** O usuário domina ferramentas visuais e de áudio (como o WhatsApp), mas sente-se intimidado por formulários complexos e interfaces que exigem login/senha ou múltiplos redirecionamentos
  
* **Custo de Conectividade:** A experiência é ditada pela disponibilidade de dados móveis. A solução deve ser leve para não consumir o plano de dados limitado do usuário

#### C. Relações Hierárquicas e Psicossociais

* **Posição de Vulnerabilidade:** O cidadão sente-se frequentemente numa posição de inferioridade perante o Estado. A burocracia é vista como um obstáculo intransponível, gerando frustração e desistência
  
* **Mediação Interpessoal (Rede de Apoio):** É comum a existência de uma hierarquia de apoio familiar. Idosos ou pessoas com baixa alfabetização digital dependem de um "mediador" (neto, vizinho ou agente comunitário). A ferramenta deve servir tanto ao beneficiário final quanto ao facilitador

---

### 3. Mapa de Stakeholders (Partes Interessadas)

O mapeamento abaixo descreve a rede de influência ao redor da solução:

#### **Stakeholders Primários (Usuários Diretos)**

* Cidadãos em situação de insegurança financeira
* Trabalhadores informais e rurais que buscam regularização
* Pessoas com Deficiência (PcD) e idosos que buscam auxílios específicos

#### **Stakeholders Secundários (Facilitadores)**

* **Assistentes Sociais (CRAS/CREAS):** Podem utilizar a aplicação como guia rápido nos seus atendimentos
* **Líderes Comunitários:** Replicam a informação em bairros periféricos e zonas rurais
* **Familiares:** Jovens que realizam a pesquisa para os mais velhos
* 
#### **Stakeholders Terciários (Provedores de Dados)**

* **Órgãos Governamentais (MDS, INSS, Caixa Econômica):** Instituições que detêm as regras, os dados e os fundos dos benefícios

---

### 4. Síntese do Público-Alvo

| Atributo | Descrição para o Projeto |
| :--- | :--- |
| **Escolaridade** | Fundamental incompleto a Médio. |
| **Principais Apps** | WhatsApp, Facebook, YouTube e Apps Bancários. |
| **Dificuldade Central** | Entender as regras para ter acesso ao direito. |
| **Expectativa** | Rapidez, clareza e segurança na informação. |
| **Relação com o Estado** | Desconfiança e sensação de burocracia excessiva. |


 - Pessoas idosas
 - Famílias de baixa renda
 - Trabalhadores informais
 - Pessoas desempregadas
 - Pessoas em vulnerabilidade social
 - Pessoas com deficiência
 - Trabalhadores rurais
 - Pessoas com baixa alfabetização digital

# Product Discovery

## Etapa de Entendimento

Nesta etapa, buscamos entender mais acerca do nosso tema, levantando certezas, dúvidas e suposicões sobre a temática.

![Matriz de alinhamento CSD](images/matriz-de-alinhamento.png)

## Etapa de Definição

### Personas e Mapas de Empatia

Este documento apresenta as personas identificadas no projeto, juntamente com seus respectivos mapas de empatia, representando os principais usuários da solução

---

#### Persona 1: Rafaela Silva Soares

![Rafaela](images/PERSONA-1.png)

**Idade:** 40 anos  
**Ocupação:** Trabalhadora Informal (Manicure)

##### Bio

Rafaela é uma trabalhadora informal que atua como manicure e busca estabilidade financeira para sustentar sua família. Utiliza o celular como principal ferramenta no dia a dia.

##### Objetivos

- Estabilidade financeira  
- Melhorar a vida dos filhos  
- Entender seus direitos  
- Organizar sua renda  

##### Dores

- Dificuldade com burocracia  
- Informações confusas  
- Falta de clareza sobre direitos  

##### Objetos e Lugares

- Smartphone Android  
- WhatsApp, Instagram, Google, YouTube  
- CRAS e postos da prefeitura  

---

##### Mapa de Empatia — Rafaela

###### Vê
- Pessoas em situação financeira semelhante  
- Conteúdos em redes sociais  
- Filas e burocracia  

###### Ouve

- Conselhos de vizinhos e familiares  
- Informações sobre benefícios  

###### Pensa e sente

- Preocupação financeira  
- Insegurança  
- Desejo de estabilidade  

###### Fala e faz

- Busca ajuda de conhecidos  
- Usa celular para aprender  
- Trabalha diariamente  

###### Dores

- Processos complicados  
- Falta de clareza  

###### Ganhos

- Segurança financeira  
- Autonomia  
- Facilidade no acesso à informação  

---

#### Persona 2: Sônia da Silva

![Sônia](images/PERSONA-2.png)

**Idade:** 78 anos  
**Ocupação:** Aposentada  

##### Bio
Sônia é aposentada e depende de sua renda para sobreviver. Possui dificuldade com tecnologia, mas deseja ser mais independente.

##### Objetivos

- Acessar aposentadoria com facilidade  
- Ter autonomia  
- Entender processos  

##### Dores

- Dificuldade com tecnologia  
- Dependência de terceiros  
- Sistemas complexos  

##### Objetos e Lugares

- Smartphone antigo  
- WhatsApp, Facebook  
- Lotérica, Caixa, postos de saúde  

---

##### Mapa de Empatia — Sônia

###### Vê

- Pessoas usando tecnologia com facilidade  
- Informações difíceis de entender  

###### Ouve

- Ajuda de filhos e netos  
- Informações sobre benefícios  

###### Pensa e sente

- Insegurança  
- Medo de errar  
- Desejo de independência  

###### Fala e faz

- Pede ajuda  
- Evita tecnologia  
- Resolve presencialmente  

###### Dores

- Processos difíceis  
- Falta de clareza  
- Dependência  

###### Ganhos

- Autonomia  
- Tranquilidade  
- Facilidade de uso  

---

#### Persona 3: Jailson Pereira

![Jailson](images/PERSONA-3.png)

**Idade:** 62 anos  
**Ocupação:** Agricultor  

##### Bio

Jailson é agricultor e prefere soluções práticas. Não tem familiaridade com tecnologia, mas precisa dela para acessar benefícios.

##### Objetivos
- Conseguir aposentadoria  
- Resolver problemas rapidamente  
- Comprar um lote  

##### Dores

- Dificuldade com tecnologia  
- Sistemas lentos  
- Processos longos  

##### Objetos e Lugares

- Smartphone antigo  
- Uso ocasional  
- TV, rádio  
- Ajuda de terceiros  

---

##### Mapa de Empatia — Jailson

###### Vê

- Falta de acesso fácil a serviços  
- Pessoas com mais facilidade digital  

###### Ouve

- Orientações de familiares  
- Informações sobre benefícios  

###### Pensa e sente

- Frustração com tecnologia  
- Desejo de praticidade  
- Cansaço do trabalho  

###### Fala e faz

- Prefere soluções diretas  
- Evita tecnologia  
- Busca ajuda quando necessário  

###### Dores

- Sistemas complexos  
- Demora  
- Falta de clareza  

###### Ganhos

- Rapidez  
- Simplicidade  
- Eficiência  
- Independência  

---

### Conclusão

As personas representam diferentes perfis de usuários que enfrentam dificuldades com tecnologia e acesso a serviços.  
Os mapas de empatia ajudam a compreender melhor suas necessidades, dores e expectativas, orientando o desenvolvimento de soluções mais acessíveis, simples e eficientes

---

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

---

### Acesso à Informação

| EU COMO... | QUERO/PRECISO... | PARA... |
|-----------|----------------|--------|
| Cidadã (Rafaela) | Consultar meus direitos e benefícios | Entender o que posso receber |
| Idosa (Sônia) | Ver informações de forma simples e clara | Não me confundir com termos difíceis |
| Trabalhador (Jailson) | Saber quais benefícios posso solicitar | Garantir minha aposentadoria |

---

### Usabilidade e Facilidade

| EU COMO... | QUERO/PRECISO... | PARA... |
|-----------|----------------|--------|
| Usuária com pouca experiência digital (Sônia) | Navegar com botões grandes e claros | Conseguir usar o sistema sem ajuda |
| Usuário com dificuldade tecnológica (Jailson) | Ter poucos passos para completar uma ação | Não perder tempo nem me frustrar |
| Usuária prática (Rafaela) | Resolver tudo rapidamente pelo celular | Economizar tempo no dia a dia |

---

### Processos e Solicitações

| EU COMO... | QUERO/PRECISO... | PARA... |
|-----------|----------------|--------|
| Cidadã (Rafaela) | Ver um passo a passo para solicitar benefícios | Não errar durante o processo |
| Idosa (Sônia) | Saber quais documentos preciso levar | Evitar sair de casa várias vezes |
| Trabalhador (Jailson) | Fazer solicitações de forma simples | Conseguir resolver sem depender de outros |

---

### Segurança e Confiança

| EU COMO... | QUERO/PRECISO... | PARA... |
|-----------|----------------|--------|
| Usuária insegura (Sônia) | Ter confirmação de que o sistema é seguro | Não ter medo de usar |
| Cidadã (Rafaela) | Saber que estou em um ambiente oficial | Confiar nas informações |
| Usuário cauteloso (Jailson) | Evitar cometer erros no sistema | Não ter prejuízos |

---

### Atualizações e Acompanhamento

| EU COMO... | QUERO/PRECISO... | PARA... |
|-----------|----------------|--------|
| Cidadã (Rafaela) | Receber atualizações sobre benefícios | Não perder prazos |
| Idosa (Sônia) | Ser avisada sobre etapas concluídas | Saber que deu tudo certo |
| Trabalhador (Jailson) | Acompanhar minhas solicitações | Ter controle do processo |

---

### Conclusão

As histórias de usuário refletem diretamente as necessidades reais das personas, garantindo que a solução desenvolvida seja acessível, eficiente e centrada no usuário 
O foco principal é reduzir a complexidade, aumentar a confiança e promover autonomia no uso da tecnologia

## Requisitos e Proposta de Valor

A seguir estão os requisitos funcionais e não funcionais definidos para a solução, seguidos pela proposta de valor que conecta estas funcionalidades às necessidades da nossa persona

---

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
|----|----------------------|-----------|
| RF-001 | Permitir que o usuário consulte seus benefícios disponíveis | ALTA |
| RF-002 | Exibir informações sobre benefícios de forma clara e simplificada | ALTA |
| RF-003 | Mostrar passo a passo para solicitação de benefícios | ALTA |
| RF-004 | Informar os documentos necessários para cada benefício | ALTA |
| RF-005 | Permitir que o usuário acompanhe o status de suas solicitações | MÉDIA |
| RF-006 | Enviar notificações sobre prazos e atualizações | MÉDIA |
| RF-007 | Disponibilizar uma interface com botões grandes e acessíveis | ALTA |
| RF-008 | Permitir navegação simples com poucas etapas | ALTA |
| RF-009 | Apresentar confirmação de segurança e confiabilidade da plataforma | ALTA |
| RF-010 | Permitir busca rápida por benefícios ou informações | MÉDIA |

---

### Requisitos Não Funcionais

| ID | Descrição do Requisito | Prioridade |
|----|----------------------|-----------|
| RNF-001 | O sistema deve ser responsivo para dispositivos móveis | ALTA |
| RNF-002 | O sistema deve ter interface simples e intuitiva | ALTA |
| RNF-003 | O tempo de resposta deve ser inferior a 3 segundos | MÉDIA |
| RNF-004 | O sistema deve garantir segurança dos dados do usuário | ALTA |
| RNF-005 | O sistema deve utilizar linguagem acessível (sem termos técnicos) | ALTA |
| RNF-006 | O sistema deve funcionar em smartphones de baixo desempenho | ALTA |
| RNF-007 | O sistema deve minimizar a quantidade de etapas para conclusão de tarefas | ALTA |
| RNF-008 | O sistema deve garantir alta disponibilidade (acesso contínuo) | MÉDIA |
| RNF-009 | O sistema deve ser compatível com navegadores modernos | MÉDIA |
| RNF-010 | O sistema deve fornecer feedback visual para ações do usuário | ALTA |

---

### Proposta de Valor 

Com base na análise da nossa persona **Rafaela Silva Soares**, estruturamos a nossa proposta de valor para garantir que a solução técnica resolva as dificuldades reais de acesso à informação

#### Visualização do Canvas

| Proposta de Valor 1 | Proposta de Valor 2 | Proposta de Valor 3 |
| :---: | :---: | :---: |
| ![PV 1](images/Proposta-de-valor-1.png) | ![PV 2](images/Proposta-de-valor-2.png) | ![PV 3](images/Proposta-de-valor-3.png) |

---

### Análise Estratégica

**Criadores de Ganhos**

* Autonomia Informacional: O cidadão entende os seus direitos sem depender de terceiros
* Segurança Jurídica: Informações verificadas que reduzem o medo de perder benefícios
* Agilidade: Redução de filas e deslocamentos desnecessários através de informação centralizada

**Aliviadores de Dores**

* Tradução de Linguagem: Substituição do "juridiquês" por termos do dia a dia
* Interface Assistiva: Botões grandes e fluxos simplificados para quem tem baixa alfabetização digital
* Apoio Visual: Passo a passo com ícones e cores que guiam a utilizadora sem erros

---

### Conclusão

Os requisitos e a proposta de valor foram definidos com foco na simplicidade, acessibilidade e eficiência. O objetivo central é garantir que utilizadores com baixa familiaridade tecnológica, como a **Rafaela Silva Soares**, consigam utilizar a plataforma com total autonomia, segurança e dignidade, eliminando as barreiras entre o cidadão e os seus direitos

# Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução

## Wireframes

### 1. Tela de Formulário (Perfil do Usuário)

Interface para captação de dados básicos e filtragem de benefícios

![Wireframe 1](images/wireframe-1.jpg)

### 2. Tela Inicial (Dashboard)

Exibição dos benefícios disponíveis com foco em leitura e acessibilidade

![Wireframe 2](images/wireframe-2.jpg)

### 3. Detalhes do Benefício

Página com informações sobre documentos, valores e exigências

![Wireframe 3](images/wireframe-3.jpg)

### 4. Listagem de Benefícios Futuros

Calendário e informações sobre auxílios que ainda serão liberados

![Wireframe 4](images/wireframe-4.jpg)

## User Flow

O diagrama abaixo ilustra o caminho que a Rafaela percorre desde a entrada no sistema até a descoberta dos locais de atendimento

![User Flow do Projeto](images/fluxograma-tiaw.jpg)

**Caminho Principal:**

1. Entrada no Formulário de Perfil
2. Visualização da Lista Personalizada (Home)
3. Seleção de um Benefício Específico
4. Consulta de Documentos e Locais de Atendimento

## Protótipo Interativo

O protótipo permite navegar pelas telas e validar a usabilidade da solução proposta no Figma

[Acesse o Protótipo Interativo aqui](https://marvelapp.com/prototype/1cgd0769/screen/98665964)

# Metodologia

## Ferramentas

Relação de ferramentas empregadas pelo grupo para garantir a colaboração e a qualidade técnica

| Ambiente                    | Plataforma   | Justificativa |
| --------------------------- | ------------ | ------------- |
| Processo de Design Thinking | Miro         | Centralização de brainstorms, Matriz CSD e Stakeholders. |
| Repositório de código       | GitHub       | Controle de versão e documentação (Wiki/README). |
| Design de Interface         | Figma        | Criação de wireframes de alta fidelidade e protótipo interativo. |
| Diagramação de Fluxo        | Lucidchart/Figma | Mapeamento da jornada do usuário e fluxo de telas. |
| Comunicação do Grupo        | WhatsApp/Teams | Alinhamento diário e reuniões de sprint. |

## Gerenciamento do Projeto

O grupo utiliza metodologias ágeis (Scrum/Kanban) para a organização das tarefas

* **Divisão de Papéis:**

    * **Scrum Master:** Responsável por remover impedimentos e organizar as cerimônias
    * **Product Owner:** Define as prioridades com base nas dores da persona Rafaela
    * **Equipe de Desenvolvimento:** Implementação técnica e design de interface

* **Processo:** As tarefas são gerenciadas via **GitHub Projects**, onde acompanhamos o status de cada requisito (Backlog, Em Andamento, Revisão e Concluído)


# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução

##### Funcionalidade 1 - Visualização e visualização dos benefícios

Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

* **Estrutura de dados:** [Benefícios](#estrutura-de-dados---beneficios)
* **Instruções de acesso:**
  * Abra o site
  * Clique pelo Menu ou pelo botão de navegação "Benefícios"
* **Tela da funcionalidade**:

![Tela de Visualizacão e Filtragem dos Benefícios](images/tela-visualizacao-beneficios.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

### Estrutura de Dados - Benefícios

Benefícios informados e suas informações essenciais

```json
  {
      "id": "BEN-001",
      "nome": "Bolsa Família",
      "categoria": "Alimentação",
      "descricao": "Auxílio mensal para famílias de baixa renda cadastradas em programas sociais.",
      "descricaoCompleta": "O Bolsa Família é um programa federal de transferência de renda que busca garantir a subsistência básica de famílias em situação de pobreza e extrema pobreza. Além do repasse financeiro, exige contrapartidas como a manutenção da frequência escolar das crianças e a atualização do cartão de vacinação, promovendo acesso à saúde e educação.",
      "valorBase": 600,
      "publicoAlvo": [
        "BAIXA_RENDA"
      ],
      "orgaoResponsavel": "Governo Federal",
      "requisitos": [
        "Inscrição ativa e atualizada no Cadastro Único (CadÚnico)",
        "Renda familiar per capita mensal de até R$ 218,00"
      ],
      "condicoes": [
        "Frequência escolar mínima de 60% para crianças de 4 a 5 anos",
        "Frequência escolar mínima de 75% para jovens de 6 a 18 anos",
        "Acompanhamento pré-natal para gestantes da família",
        "Acompanhamento do estado nutricional (peso e altura) de crianças menores de 7 anos",
        "Manter a carteira de vacinação de todos os membros menores de 18 anos atualizada"
      ],
      "documentos": [
        "CPF ou Título de Eleitor do Responsável Familiar",
        "Documento de identificação com foto de todos os membros da família",
        "Certidão de nascimento ou casamento dos dependentes",
        "Comprovante de residência atualizado",
        "Declaração de matrícula escolar recente das crianças e adolescentes"
      ]
    }
```
### Estrutura de Dados - Pontos de Atendimento

Pontos de atendimento localizados na regional de Belo Horizonte e suas informações

```json
  {
      "nome": "CRAS Novo Ouro Preto",
      "endereco": "R. Geraldina Cândida de Jesus, 92, Novo Ouro Preto, BH",
      "tipo": "CRAS",
      "lat": -19.87631558,
      "lon": -43.98799181,
      "atendimentos": 170,
      "telefone": " (31) 98221-0512",
      "horario": "Segunda a sexta, das 8h às 18h",
      "id": "JrZ396Dak5s"
    }
```

### Estrutura de Dados - Assistentes Sociais / Usuários

Registro das assistentes sociais, suas informacões, famílias que acompanha e os dados utilizados para login e para o perfil do sistema

```json
  {
    "id": "AS-001",
      "nome": "Fernanda Oliveira",
      "telefone": "(31) 98888-7777",
      "email": "fernanda.oliveira@assistencia.gov.br",
      "senha": "Fe223344",
      "imagem-assistente": "../../assets/images/assistentes/fernanda-oliveira.avif",
      "cras": "CRAS Centro Sul",
      "familias-assistidas": [
        {
          "id": "FAM-001"
        },
        {
          "id": "FAM-002"
        }
      ]
  }
```
### Estrutura de Dados - Famílias

Registro das famílias acompanhadas por um(a) assistente social, bem como suas informações gerais e de seus membros

```json
  {
    "idFamilia": "FAM-001",
      "nomeFamilia": "Família Dos Souzas",
      "fotoFamilia": "",
      "endereco": {
        "rua": "Rua das Flores",
        "numero": "120",
        "bairro": "Centro",
        "cidade": "Belo Horizonte",
        "estado": "MG",
        "cep": "30110-000"
      },
      "telefone": "(31) 99999-9999",
      "rendaFamiliar": 1850.5,
      "assistenteSocial": {
        "idAssistente": "AS-001"
      },
      "beneficiosFamiliares": [
        {
          "idBeneficio": "BEN-001",
          "nome": "Bolsa Família",
          "valor": 600
        },
        {
          "idBeneficio": "BEN-004",
          "nome": "Auxílio Gás",
          "valor": 110
        }
      ],
      "membros": [
        {
          "idPessoa": "PES-001",
          "nome": "Maria Aparecida Souza",
          "categoria": "Responsável",
          "dataNascimento": "1985-03-12",
          "imagem-membro": "",
          "parentesco": "Responsável Familiar",
          "escolaridade": "Ensino Médio Completo",
          "ocupacao": "Diarista",
          "beneficiosIndividuais": [
            {
              "idBeneficio": "BEN-003",
              "nome": "Tarifa Social de Energia",
              "valor": 80
            }
          ]
        },
        {
          "idPessoa": "PES-002",
          "nome": "João Pedro Souza",
          "categoria": "Dependente",
          "dataNascimento": "2012-08-20",
          "imagem-membro": "",
          "parentesco": "Filho",
          "escolaridade": "Ensino Fundamental",
          "ocupacao": "Estudante",
          "beneficiosIndividuais": []
        },
        {
          "idPessoa": "PES-003",
          "nome": "Ana Clara Souza",
          "categoria": "Dependente",
          "dataNascimento": "2018-11-02",
          "imagem-membro": "",
          "parentesco": "Filha",
          "escolaridade": "Educação Infantil",
          "ocupacao": "Estudante",
          "beneficiosIndividuais": [
            {
              "idBeneficio": "BEN-005",
              "nome": "Benefício Primeira Infância",
              "valor": 150
            }
          ]
        }
      ],
      "id": "j7KP2yAMNlI"
  }
```


## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Images**:


**Fonts:**

* Fontes - [https://fonts.google.com](https://fonts.google.com)

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/)
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/)


# Referências

As referências utilizadas no trabalho foram:

* BRASIL. Governo Federal. GOV.BR. Disponível em: https://www.gov.br/pt-br. Acesso em: 30 mar. 2026.
* BELO HORIZONTE. Prefeitura Municipal. Centros de Referência de Assistência Social (CRAS). Belo Horizonte: PBH, (2026). Disponível em: https://prefeitura.pbh.gov.br/assistencia-social/equipamentos/cras. Acesso em 04 abr.2026

