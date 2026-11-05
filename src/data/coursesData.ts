import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'modulo_01_todo',
    slug: 'lista-de-tarefas-html-css-javascript',
    title: 'Módulo 01 — Construindo uma Aplicação de Lista de Tarefas',
    description: 'Aprenda os fundamentos essenciais de HTML5, CSS3 e JavaScript (ES6+) do zero, criando um gerenciador de tarefas completo, responsivo e com persistência de dados local.',
    level: 'Iniciante',
    category: 'Desenvolvimento Web Front-End',
    estimatedHours: 12,
    iconName: 'CheckSquare',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    modules: [
      {
        id: 'mod_1',
        courseId: 'modulo_01_todo',
        order: 1,
        title: 'Fundamentos Web & Aplicação To-Do',
        level: 'Iniciante',
        objective: 'Dominar HTML5 semântico, estilização com CSS3 Flexbox/Grid e lógica JavaScript DOM para criar uma aplicação completa com LocalStorage.',
        resultDescription: 'Uma aplicação web de lista de tarefas funcional, linda, adaptável a celulares e com salvamento automático no navegador.',
        lessons: [
          {
            id: 'mod1_aula1',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 1,
            title: 'Aula 1 — Introdução ao Desenvolvimento Web',
            objectives: [
              'Entender como a World Wide Web e o modelo cliente-servidor funcionam.',
              'Diferenciar claramente os papéis de HTML, CSS e JavaScript.',
              'Conhecer a estrutura fundamental de arquivos e criar o primeiro arquivo index.html.'
            ],
            introduction: 'Seja bem-vindo ao mundo da programação web! Nesta aula inicial, você entenderá como os sites funcionam nos bastidores e dará seus primeiros passos criando a estrutura que sustenta a internet.',
            contentMarkdown: `### 1. O que é Programação Web?
Programar é o ato de dar instruções claras e sequenciais para um computador executar tarefas. Na web, o navegador (como Google Chrome, Firefox ou Safari) atua como um intérprete que lê nossos arquivos de código e os transforma na interface visual e interativa que as pessoas utilizam.

### 2. Como Funciona a Internet? (Cliente e Servidor)
A internet opera no modelo **Cliente-Servidor**:
- **Cliente**: É o navegador no seu computador ou smartphone solicitando uma página.
- **Servidor**: É um computador potente e conectado 24/7 que guarda os arquivos do site e os envia ao cliente via protocolo HTTP/HTTPS.

### 3. A Tríade da Web: HTML, CSS e JavaScript
Imagine a construção de uma casa:
- **HTML (HyperText Markup Language)**: São os **tijolos e estruturas**. Define os títulos, parágrafos, imagens e botões.
- **CSS (Cascading Style Sheets)**: É a **pintura e decoração**. Define cores, fontes, alinhamentos e visual.
- **JavaScript**: É a **eletricidade e automação**. Faz o portão abrir ao apertar um botão, valida dados e traz vida à casa.

### 4. Estrutura do Seu Primeiro Documento HTML
Todo arquivo HTML inicia com a declaração \`<!DOCTYPE html>\`, seguida pelas tags \`<html>\`, \`<head>\` (onde ficam os metadados) e \`<body>\` (onde fica tudo visível na tela).`,
            lineByLineExplanation: [
              { line: '<!DOCTYPE html>', explanation: 'Informa ao navegador que este é um documento moderno escrito na versão HTML5.' },
              { line: '<html lang="pt-BR">', explanation: 'Elemento raiz que engloba todo o documento, definindo o idioma como Português do Brasil.' },
              { line: '<head>', explanation: 'Contém configurações técnicas, título da aba e links para estilos externos.' },
              { line: '<meta charset="UTF-8">', explanation: 'Garante suporte correto a acentos, ç e caracteres especiais da língua portuguesa.' },
              { line: '<body>', explanation: 'Corpo da página onde inserimos todos os elementos que o usuário verá e interagirá.' }
            ],
            starterCode: {
              html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu Primeiro Site CodePlay</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f4f6fb; }
    h1 { color: #6957E8; }
  </style>
</head>
<body>
  <h1>Olá, Mundo! 🚀</h1>
  <p>Estou aprendendo desenvolvimento web no CodePlay!</p>
</body>
</html>`,
              css: `/* Estilos adicionais */
p {
  color: #475569;
  font-size: 18px;
}`,
              js: `console.log("Bem-vindo ao CodePlay!");`
            },
            exercises: [
              {
                id: 'ex_mod1_a1_1',
                lessonId: 'mod1_aula1',
                title: 'Tríade do Desenvolvimento Web',
                description: 'Assinale a alternativa correta sobre a responsabilidade do HTML na web.',
                type: 'multiple_choice',
                points: 10,
                question: 'Qual é o papel principal da linguagem HTML na construção de páginas web?',
                options: [
                  { id: 'opt1', text: 'Adicionar animações 3D complexas e conexão com bancos de dados.', isCorrect: false },
                  { id: 'opt2', text: 'Definir a estrutura, conteúdo e marcação de elementos da página.', isCorrect: true },
                  { id: 'opt3', text: 'Estilizar as cores de fundo e margens dos elementos.', isCorrect: false },
                  { id: 'opt4', text: 'Executar scripts de inteligência artificial no servidor.', isCorrect: false }
                ],
                hint: 'Lembre-se da analogia da casa: o HTML representa a estrutura bruta e os tijolos.',
                commentedSolution: 'O HTML é responsável porestruturar o conteúdo (textos, botões, títulos), enquanto o CSS estiliza e o JavaScript adiciona interatividade.'
              },
              {
                id: 'ex_mod1_a1_2',
                lessonId: 'mod1_aula1',
                title: 'Completar o Esqueleto HTML5',
                description: 'Complete o código para definir a declaração correta do HTML5.',
                type: 'complete_code',
                points: 15,
                question: 'Escreva a tag que declara um documento HTML5 na primeira linha:',
                starterCode: '___ html>\n<html lang="pt-BR">\n  <body><h1>Teste</h1></body>\n</html>',
                correctAnswer: '<!DOCTYPE html>',
                hint: 'Começa com um sinal de menor, exclamação e a palavra DOCTYPE.',
                commentedSolution: 'A instrução <!DOCTYPE html> é indispensável para acionar o modo de renderização padrão moderno dos navegadores.'
              }
            ],
            summary: 'Nesta aula, você aprendeu o conceito de cliente-servidor, a diferença entre HTML, CSS e JavaScript e como estruturar o seu primeiro documento web validado.'
          },

          {
            id: 'mod1_aula2',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 2,
            title: 'Aula 2 — Estrutura HTML & Semântica',
            objectives: [
              'Dominar o uso de tags de texto, formulários e listas.',
              'Entender a importância da semântica HTML5 para acessibilidade e SEO.',
              'Montar a estrutura base da nossa aplicação de Lista de Tarefas.'
            ],
            introduction: 'Para construir aplicações profissionais, é fundamental utilizar as tags corretas para cada tipo de informação. Nesta aula, vamos criar a estrutura HTML completa da nossa aplicação de tarefas.',
            contentMarkdown: `### 1. Elementos e Tags HTML
Um elemento HTML é composto por uma **tag de abertura**, o **conteúdo** e uma **tag de fechamento**:
\`\`\`html
<h1 class="titulo">Minhas Tarefas</h1>
\`\`\`

### 2. Principais Tags de Conteúdo
- **Cabeçalhos (\`<h1>\` até \`<h6>\`)**: Hierarquia de títulos da página.
- **Parágrafos (\`<p>\`)**: Blocos de texto explicativo.
- **Listas Não Ordenadas (\`<ul>\`) e Itens (\`<li>\`)**: Perfeitos para exibir listas de tarefas!
- **Formulários (\`<form>\`), Inputs (\`<input>\`) e Botões (\`<button>\`)**: Para capturar a entrada do usuário.

### 3. HTML Semântico
Usar HTML semântico significa escolher tags baseadas no seu *significado real* em vez de usar apenas \`<div>\` para tudo. 
- \`<header>\`: Cabeçalho da página ou seção.
- \`<main>\`: Conteúdo principal exclusivo.
- \`<section>\`: Agrupamento temático de conteúdo.
- \`<footer>\`: Rodapé da página.

Benefícios: Acessibilidade para leitores de tela e melhor posicionamento nos buscadores (Google).`,
            lineByLineExplanation: [
              { line: '<main class="app-container">', explanation: 'Define a área principal da aplicação de tarefas.' },
              { line: '<form id="taskForm">', explanation: 'Formulário que agrupa o campo de texto e o botão de envio.' },
              { line: '<input type="text" placeholder="Digite uma tarefa...">', explanation: 'Campo de texto onde o usuário digita a nova tarefa.' },
              { line: '<button type="submit">Adicionar</button>', explanation: 'Botão que dispara o evento de envio do formulário.' },
              { line: '<ul id="taskList"></ul>', explanation: 'Lista onde os itens das tarefas serão inseridos dinamicamente.' }
            ],
            starterCode: {
              html: `<main class="container">
  <header>
    <h1>📝 Minha Lista de Tarefas</h1>
    <p>Organize seu dia de forma simples</p>
  </header>

  <form id="formAdicionar">
    <input type="text" id="campoTarefa" placeholder="O que você precisa fazer hoje?" required>
    <button type="submit">Adicionar Tarefa</button>
  </form>

  <section class="lista-section">
    <ul id="listaTarefas">
      <li>Estudar HTML5 Semântico</li>
      <li>Criar projeto no CodePlay</li>
    </ul>
  </section>
</main>`,
              css: `body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
.container { max-width: 500px; margin: 0 auto; background: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
h1 { color: #6957E8; margin-bottom: 4px; }
form { display: flex; gap: 8px; margin: 20px 0; }
input { flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
button { background: #6957E8; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; }`,
              js: `// Nesta aula focamos na marcação HTML!`
            },
            exercises: [
              {
                id: 'ex_mod1_a2_1',
                lessonId: 'mod1_aula2',
                title: 'HTML Semântico',
                description: 'Qual tag semântica deve envolver o conteúdo principal de uma aplicação web?',
                type: 'multiple_choice',
                points: 10,
                question: 'Para indicar o bloco principal de conteúdo único da página, devemos utilizar qual tag semântica?',
                options: [
                  { id: 'opt1', text: '<section>', isCorrect: false },
                  { id: 'opt2', text: '<main>', isCorrect: true },
                  { id: 'opt3', text: '<aside>', isCorrect: false },
                  { id: 'opt4', text: '<div>', isCorrect: false }
                ],
                hint: 'A palavra em inglês significa "principal".',
                commentedSolution: 'A tag <main> indica ao navegador e leitores de tela o conteúdo principal exclusivo do documento.'
              }
            ],
            summary: 'Você aprendeu a usar formulários, botões, inputs, listas não ordenadas e tags semânticas para construir a estrutura perfeita da Lista de Tarefas.'
          },

          {
            id: 'mod1_aula3',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 3,
            title: 'Aula 3 — CSS3 na Prática & Layout Flexbox',
            objectives: [
              'Dominar seletores, classes, IDs e o modelo de caixa (Box Model).',
              'Utilizar o CSS Flexbox para alinhar elementos perfeitamente.',
              'Aplicar estilos modernos e elegantes na nossa Lista de Tarefas.'
            ],
            introduction: 'O HTML sozinho cria apenas um documento sem graça. O CSS é onde a mágica visual acontece! Vamos transformar nossa estrutura em uma interface moderna com tons de roxo (#6957E8), cantos arredondados e sombras suaves.',
            contentMarkdown: `### 1. Seletores CSS e Especificidade
- **Seletor de Tag**: \`h1 { color: purple; }\` (afeta todos os h1).
- **Seletor de Classe**: \`.btn-primary { background: #6957E8; }\` (reutilizável em múltiplos elementos).
- **Seletor de ID**: \`#formTarefa { display: flex; }\` (único na página).

### 2. O Modelo de Caixa (Box Model)
Todo elemento na web é uma caixa retangular composta por:
- **Content**: O conteúdo real (texto/imagem).
- **Padding**: O espaçamento *interno* entre o conteúdo e a borda.
- **Border**: A linha da borda em volta da caixa.
- **Margin**: O espaçamento *externo* entre a caixa e outros elementos.

### 3. Dominando o Flexbox
O Flexbox torna o alinhamento de elementos simples e intuitivo:
\`\`\`css
.container-flex {
  display: flex;
  justify-content: space-between; /* Alinhamento no eixo principal (horizontal) */
  align-items: center;            /* Alinhamento no eixo cruzado (vertical) */
  gap: 12px;                      /* Espaço entre os elementos filhos */
}
\`\`\`

### 4. Cores da Identidade CodePlay
Usaremos a paleta oficial:
- Roxo Principal: \`#6957E8\`
- Fundo Claro: \`#F7F8FC\`
- Texto Escuro: \`#202433\`
- Verde Sucesso: \`#19B98B\``,
            lineByLineExplanation: [
              { line: 'box-sizing: border-box;', explanation: 'Faz com que padding e bordas façam parte do tamanho total da caixa, evitando quebras incomodas de layout.' },
              { line: 'display: flex;', explanation: 'Ativa o modo de layout flexível no elemento pai.' },
              { line: 'justify-content: space-between;', explanation: 'Distribui os itens colocando espaço igual entre eles.' },
              { line: 'border-radius: 12px;', explanation: 'Arredonda os cantos da caixa com um raio de 12 pixels.' },
              { line: 'box-shadow: 0 10px 25px -5px rgba(105,87,232,0.1);', explanation: 'Cria uma sombra suave roxa dando sensação de elevação moderna.' }
            ],
            starterCode: {
              html: `<div class="card">
  <div class="card-header">
    <h2>Minha Lista de Tarefas</h2>
    <span class="badge">0 concluidas</span>
  </div>
  <div class="input-group">
    <input type="text" placeholder="Adicionar nova tarefa...">
    <button class="btn">Adicionar</button>
  </div>
  <ul class="task-list">
    <li class="task-item">
      <span>Aprender Flexbox no CSS3</span>
      <button class="btn-delete">✖</button>
    </li>
  </ul>
</div>`,
              css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: #F7F8FC; padding: 40px; display: flex; justify-content: center; }

.card {
  background: #FFFFFF;
  width: 100%;
  max-width: 480px;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(32, 36, 51, 0.08);
  border: 1px solid #E2E8F0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h2 { color: #202433; font-size: 20px; font-weight: 600; }
.badge { background: #6957E815; color: #6957E8; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }

.input-group { display: flex; gap: 10px; margin-bottom: 20px; }
input { flex: 1; padding: 12px 16px; border: 1.5px solid #E2E8F0; border-radius: 10px; outline: none; transition: 0.2s; }
input:focus { border-color: #6957E8; box-shadow: 0 0 0 3px rgba(105, 87, 232, 0.15); }

.btn { background: #6957E8; color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn:hover { background: #5140C7; }

.task-list { list-style: none; }
.task-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #F8FAFC; border-radius: 10px; margin-bottom: 8px; border: 1px solid #F1F5F9; }
.btn-delete { background: transparent; border: none; color: #EF4444; cursor: pointer; font-size: 14px; }`,
              js: `// Teste alterar os valores no CSS para ver a alteração ao vivo!`
            },
            exercises: [
              {
                id: 'ex_mod1_a3_1',
                lessonId: 'mod1_aula3',
                title: 'Alinhamento Flexbox',
                description: 'Qual propriedade do Flexbox alinha os elementos no eixo principal horizontal?',
                type: 'multiple_choice',
                points: 10,
                question: 'Para distribuir o espaço entre os elementos horizontalmente em um container flex, usamos:',
                options: [
                  { id: 'opt1', text: 'align-items', isCorrect: false },
                  { id: 'opt2', text: 'justify-content', isCorrect: true },
                  { id: 'opt3', text: 'flex-direction', isCorrect: false },
                  { id: 'opt4', text: 'text-align', isCorrect: false }
                ],
                hint: 'A propriedade significa "justificar conteúdo".',
                commentedSolution: 'O justify-content controla o alinhamento ao longo do eixo principal (por padrão horizontal).'
              }
            ],
            summary: 'Nesta aula, você aprendeu seletores CSS, o Box Model, como alinhar com Flexbox e como aplicar cores e sombras profissionais na interface.'
          },

          {
            id: 'mod1_aula4',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 4,
            title: 'Aula 4 — JavaScript & Manipulação do DOM',
            objectives: [
              'Entender variáveis (const, let), funções e escopo.',
              'Aprender a selecionar elementos HTML com document.querySelector.',
              'Adicionar escutadores de eventos (addEventListener) para capturar o clique e criar novas tarefas.'
            ],
            introduction: 'Agora vamos dar vida à nossa aplicação! Com o JavaScript, vamos escutar quando o usuário clicar no botão e criar dinamicamente novos elementos na lista.',
            contentMarkdown: `### 1. Variáveis e Tipos de Dados
- \`const\`: Para valores imutáveis ou referências fixas (como elementos do DOM).
- \`let\`: Para variáveis que mudam de valor ao longo do tempo (como contadores).

\`\`\`javascript
const nomeApp = "CodePlay To-Do";
let tarefasConcluidas = 0;
\`\`\`

### 2. O que é o DOM (Document Object Model)?
O DOM é uma árvore de objetos criada pelo navegador para representar seu documento HTML. Através do JavaScript, podemos ler, modificar, adicionar e remover qualquer elemento da tela!

### 3. Selecionando Elementos
\`\`\`javascript
const form = document.querySelector("#formAdicionar");
const input = document.querySelector("#campoTarefa");
const lista = document.querySelector("#listaTarefas");
\`\`\`

### 4. Escutando Eventos com \`addEventListener\`
\`\`\`javascript
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o recarregamento padrão da página!
  
  const texto = input.value.trim();
  if (texto !== "") {
    adicionarNovaTarefa(texto);
    input.value = ""; // Limpa o campo
  }
});
\`\`\``,
            lineByLineExplanation: [
              { line: 'event.preventDefault();', explanation: 'Evita que o navegador recarregue a página ao enviar o formulário, permitindo que o JavaScript controle a ação.' },
              { line: 'document.createElement("li");', explanation: 'Cria um novo elemento <li> em memória, ainda não inserido na tela.' },
              { line: 'novoItem.textContent = texto;', explanation: 'Define com segurança o texto contido dentro do item da lista.' },
              { line: 'lista.appendChild(novoItem);', explanation: 'Insere o novo item <li> como filho dentro da <ul> na tela do usuário.' }
            ],
            starterCode: {
              html: `<div class="card">
  <h2>Adicionar Tarefa com JS</h2>
  <form id="formTarefa">
    <input type="text" id="inputTexto" placeholder="Nova tarefa...">
    <button type="submit">Criar</button>
  </form>
  <ul id="listaContainer">
    <li>Exemplo de tarefa inicial</li>
  </ul>
</div>`,
              css: `body { font-family: sans-serif; padding: 20px; background: #F7F8FC; }
.card { max-width: 400px; margin: 0 auto; background: white; padding: 20px; border-radius: 12px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; }
button { background: #6957E8; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: 10px; background: #f1f5f9; margin-bottom: 6px; border-radius: 6px; display: flex; justify-content: space-between; }`,
              js: `const form = document.getElementById('formTarefa');
const input = document.getElementById('inputTexto');
const lista = document.getElementById('listaContainer');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement('li');
  li.textContent = texto;
  
  lista.appendChild(li);
  input.value = '';
});`
            },
            exercises: [
              {
                id: 'ex_mod1_a4_1',
                lessonId: 'mod1_aula4',
                title: 'Impedir Recarregamento',
                description: 'Qual método deve ser chamado no evento de formulário para evitar que a página recarregue ao submeter?',
                type: 'multiple_choice',
                points: 10,
                question: 'Para evitar o recarregamento do formulário no evento submit, usamos:',
                options: [
                  { id: 'opt1', text: 'event.stop();', isCorrect: false },
                  { id: 'opt2', text: 'event.preventDefault();', isCorrect: true },
                  { id: 'opt3', text: 'event.cancel();', isCorrect: false },
                  { id: 'opt4', text: 'return false;', isCorrect: false }
                ],
                hint: 'Traduzido como "prevenir o comportamento padrão".',
                commentedSolution: 'O event.preventDefault() previne o comportamento padrão do navegador de enviar os dados do formulário via requisição HTTP tradicional.'
              }
            ],
            summary: 'Você aprendeu como capturar elementos do DOM, escutar o envio de formulários e criar dinamicamente novos elementos HTML usando JavaScript puro.'
          },

          {
            id: 'mod1_aula5',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 5,
            title: 'Aula 5 — Recursos Avançados & LocalStorage',
            objectives: [
              'Implementar as ações de concluir, remover e filtrar tarefas.',
              'Trabalhar com Arrays e Métodos modernos (map, filter, forEach).',
              'Persistir os dados no navegador usando a API LocalStorage.'
            ],
            introduction: 'Nesta aula, transformaremos o script básico em um sistema robusto: o usuário poderá marcar tarefas como concluídas, excluí-las e, mais importante, as tarefas não sumirão quando ele fechar a aba!',
            contentMarkdown: `### 1. Trabalhando com Objetos e Arrays de Tarefas
Em vez de manipular apenas o HTML solto, mantemos uma **lista de objetos JavaScript** que representa o estado da aplicação:
\`\`\`javascript
let tarefas = [
  { id: 1, texto: "Estudar JS", concluida: false },
  { id: 2, texto: "Criar app CodePlay", concluida: true }
];
\`\`\`

### 2. A API LocalStorage
O \`localStorage\` permite salvar dados chave-valor no navegador que persistem mesmo após reiniciar a máquina!
- **Salvar**: \`localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));\`
- **Ler**: \`const dados = JSON.parse(localStorage.getItem('minhasTarefas')) || [];\`

### 3. Marcar Concluída e Remover
Utilizamos a delegação de eventos para identificar qual botão de tarefa foi clicado através de atributos \`data-id\`.`,
            lineByLineExplanation: [
              { line: 'JSON.stringify(tarefas);', explanation: 'Converte a lista de objetos JS em uma string formatada em JSON para permitir o armazenamento no LocalStorage.' },
              { line: 'JSON.parse(dadosGuardados);', explanation: 'Converte a string JSON lida de volta em objetos e arrays navegáveis em JS.' },
              { line: 'tarefas.filter(t => t.id !== idExcluir);', explanation: 'Cria um novo array mantendo apenas as tarefas cujo ID é diferente do ID a ser removido.' }
            ],
            starterCode: {
              html: `<div class="card">
  <h2>Lista com Armazenamento Local</h2>
  <div class="stats">
    <span>Tarefas: <strong id="totalCount">0</strong></span>
    <span>Concluídas: <strong id="doneCount">0</strong></span>
  </div>
  <form id="taskForm">
    <input type="text" id="taskInput" placeholder="Nova tarefa...">
    <button type="submit">Salvar</button>
  </form>
  <ul id="tasksUl"></ul>
</div>`,
              css: `body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
.card { max-width: 440px; margin: 0 auto; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.stats { display: flex; justify-content: space-between; margin-bottom: 12px; color: #64748b; font-size: 14px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
button { background: #6957E8; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: 12px; background: #f1f5f9; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
li.done span { text-decoration: line-through; color: #94a3b8; }
.btn-check { color: #19B98B; background: none; border: none; cursor: pointer; font-size: 16px; margin-right: 8px; }
.btn-del { color: #ef4444; background: none; border: none; cursor: pointer; }`,
              js: `let tarefas = JSON.parse(localStorage.getItem('codeplay_todos')) || [];

const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const ul = document.getElementById('tasksUl');

function renderizar() {
  ul.innerHTML = '';
  let concluidas = 0;
  
  tarefas.forEach((t, index) => {
    if (t.conclutiva) concluidas++;
    const li = document.createElement('li');
    if (t.conclutiva) li.classList.add('done');
    
    li.innerHTML = \`
      <div>
        <button class="btn-check" onclick="alternar(\${index})">\${t.conclutiva ? '✓' : '○'}</button>
        <span>\${t.texto}</span>
      </div>
      <button class="btn-del" onclick="excluir(\${index})">✕</button>
    \`;
    ul.appendChild(li);
  });
  
  document.getElementById('totalCount').textContent = tarefas.length;
  document.getElementById('doneCount').textContent = concluidas;
  localStorage.setItem('codeplay_todos', JSON.stringify(tarefas));
}

window.alternar = function(idx) {
  tarefas[idx].conclutiva = !tarefas[idx].conclutiva;
  renderizar();
};

window.excluir = function(idx) {
  tarefas.splice(idx, 1);
  renderizar();
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  tarefas.push({ texto: val, conclutiva: false });
  input.value = '';
  renderizar();
});

renderizar();`
            },
            exercises: [
              {
                id: 'ex_mod1_a5_1',
                lessonId: 'mod1_aula5',
                title: 'Persistência no LocalStorage',
                description: 'Qual função converte um objeto JavaScript em texto JSON antes de salvar no localStorage?',
                type: 'multiple_choice',
                points: 15,
                question: 'Qual comando deve ser usado para converter um array de tarefas em string para salvar no localStorage?',
                options: [
                  { id: 'opt1', text: 'JSON.stringify(tarefas)', isCorrect: true },
                  { id: 'opt2', text: 'JSON.parse(tarefas)', isCorrect: false },
                  { id: 'opt3', text: 'tarefas.toString()', isCorrect: false },
                  { id: 'opt4', text: 'LocalStorage.serialize(tarefas)', isCorrect: false }
                ],
                hint: 'Stringify vem de "tornar string".',
                commentedSolution: 'JSON.stringify() serializa estruturas de dados complexas em formato de texto aceito pelo LocalStorage.'
              }
            ],
            summary: 'Você dominou o ciclo completo de CRUD (Criar, Ler, Atualizar e Deletar) dados com armazenamento local no navegador.'
          },

          {
            id: 'mod1_aula6',
            moduleId: 'mod_1',
            courseId: 'modulo_01_todo',
            order: 6,
            title: 'Aula 6 — Finalização do Projeto Lista de Tarefas',
            objectives: [
              'Revisar e organizar o código fonte em padrões limpos.',
              'Adicionar filtros por estado (Todas, Pendentes, Concluídas).',
              'Testar e validar a aplicação completa responsiva.'
            ],
            introduction: 'Parabéns! Chegamos à aula final do Módulo 01. Vamos unir todas as peças, aplicar polimento visual avançado e finalizar a aplicação completa que você poderá incluir no seu portfólio.',
            contentMarkdown: `### 1. Checklist de Qualidade do Projeto
1. **HTML**: Código limpo, semântico com leitores de tela e marcação correta.
2. **CSS**: Responsivo (adaptado para celulares), com transições suaves e estados hover em botões.
3. **JS**: Funções com responsabilidade única, salvamento automático e tratamento para entradas vazias.

### 2. Projeto Final Completo
Edite e execute o código abaixo no Laboratório Integrado para ver a versão completa final de produção com filtros ativos e contadores automáticos!`,
            starterCode: {
              html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CodePlay To-Do Master</title>
</head>
<body>
  <div class="app-card">
    <header class="app-header">
      <div class="logo">
        <span class="icon">✨</span>
        <h2>CodeTask</h2>
      </div>
      <span class="badge" id="badgeStreak">🔥 4 dias seguidos</span>
    </header>

    <div class="progress-bar-container">
      <div class="progress-bar" id="progressBar"></div>
    </div>

    <form id="todoForm" class="todo-form">
      <input type="text" id="todoInput" placeholder="O que você deseja conquistar hoje?" required autofocus>
      <button type="submit" class="btn-add">Adicionar</button>
    </form>

    <div class="filter-tabs">
      <button class="tab active" data-filter="all">Todas (<span id="cntAll">0</span>)</button>
      <button class="tab" data-filter="active">Pendentes (<span id="cntActive">0</span>)</button>
      <button class="tab" data-filter="completed">Concluídas (<span id="cntDone">0</span>)</button>
    </div>

    <ul id="todoList" class="todo-list"></ul>
  </div>
</body>
</html>`,
              css: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Poppins', sans-serif;
  background: #F7F8FC;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.app-card {
  background: #FFFFFF;
  width: 100%;
  max-width: 460px;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 15px 35px rgba(32, 36, 51, 0.08);
  border: 1px solid #E2E8F0;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logo { display: flex; align-items: center; gap: 8px; }
.logo h2 { font-size: 20px; color: #202433; font-weight: 700; }
.badge { background: #FFF7ED; color: #EA580C; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; border: 1px solid #FFEDD5; }

.progress-bar-container { background: #F1F5F9; height: 6px; border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
.progress-bar { background: #19B98B; height: 100%; width: 0%; transition: width 0.3s ease; }

.todo-form { display: flex; gap: 8px; margin-bottom: 20px; }
.todo-form input {
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}
.todo-form input:focus { border-color: #6957E8; box-shadow: 0 0 0 3px rgba(105, 87, 232, 0.12); }

.btn-add {
  background: #6957E8;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}
.btn-add:hover { background: #5140C7; }

.filter-tabs { display: flex; gap: 6px; background: #F8FAFC; padding: 4px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #E2E8F0; }
.tab { flex: 1; background: transparent; border: none; padding: 8px; font-size: 12px; font-weight: 600; color: #64748B; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.tab.active { background: white; color: #6957E8; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

.todo-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 12px;
  border: 1px solid #F1F5F9;
  transition: 0.2s;
}
.todo-item:hover { border-color: #CBD5E1; }
.todo-item.completed span { text-decoration: line-through; color: #94A3B8; }

.left-group { display: flex; align-items: center; gap: 12px; }
.checkbox { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #CBD5E1; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: 0.2s; }
.todo-item.completed .checkbox { background: #19B98B; border-color: #19B98B; color: white; }

.btn-delete { background: none; border: none; color: #94A3B8; cursor: pointer; font-size: 16px; transition: 0.2s; }
.btn-delete:hover { color: #EF4444; }`,
              js: `let todos = JSON.parse(localStorage.getItem('codetask_final')) || [
  { id: 1, text: 'Aprender HTML5 Semântico', done: true },
  { id: 2, text: 'Estilizar com CSS Flexbox', done: true },
  { id: 3, text: 'Manipular DOM com JavaScript', done: false }
];
let activeFilter = 'all';

const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');
const tabs = document.querySelectorAll('.tab');

function render() {
  list.innerHTML = '';
  
  const filtered = todos.filter(t => {
    if (activeFilter === 'active') return !t.done;
    if (activeFilter === 'completed') return t.done;
    return true;
  });

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = \`todo-item \${t.done ? 'completed' : ''}\`;
    li.innerHTML = \`
      <div class="left-group">
        <div class="checkbox" onclick="toggle(\${t.id})">\${t.done ? '✓' : ''}</div>
        <span>\${t.text}</span>
      </div>
      <button class="btn-delete" onclick="removeTodo(\${t.id})">✕</button>
    \`;
    list.appendChild(li);
  });

  const doneCount = todos.filter(t => t.done).length;
  document.getElementById('cntAll').textContent = todos.length;
  document.getElementById('cntActive').textContent = todos.length - doneCount;
  document.getElementById('cntDone').textContent = doneCount;
  
  const pct = todos.length > 0 ? (doneCount / todos.length) * 100 : 0;
  document.getElementById('progressBar').style.width = \`\${pct}%\`;

  localStorage.setItem('codetask_final', JSON.stringify(todos));
}

window.toggle = function(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
};

window.removeTodo = function(id) {
  todos = todos.filter(t => t.id !== id);
  render();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  input.value = '';
  render();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.getAttribute('data-filter');
    render();
  });
});

render();`
            },
            exercises: [
              {
                id: 'ex_mod1_a6_1',
                lessonId: 'mod1_aula6',
                title: 'Desafio Final Módulo 01',
                description: 'Verifique seu conhecimento no ciclo de vida completo da aplicação.',
                type: 'practical_challenge',
                points: 20,
                question: 'No código acima, adicione uma funcionalidade onde clicar duas vezes na tarefa edita seu nome usando prompt().',
                starterCode: '// Dica: use o evento dblclick no elemento span',
                hint: 'li.addEventListener("dblclick", () => { ... })',
                commentedSolution: 'Parabéns por concluir o Módulo 01! Agora você pode gerar seu certificado de conclusão deste módulo!'
              }
            ],
            summary: 'Você desenvolveu uma aplicação profissional de Lista de Tarefas completa do zero ao deploy!'
          }
        ]
      }
    ]
  },

  {
    id: 'modulo_02_landing_page',
    slug: 'landing-page-profissional',
    title: 'Módulo 02 — Desenvolvendo uma Landing Page Profissional',
    description: 'Aprenda a planejar e desenvolver páginas de alta conversão para empresas e produtos, utilizando CSS Grid moderno, imagens responsivas, formulários com validação e SEO.',
    level: 'Intermediário',
    category: 'Desenvolvimento Web Front-End',
    estimatedHours: 10,
    iconName: 'Layout',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    modules: [
      {
        id: 'mod_2',
        courseId: 'modulo_02_landing_page',
        order: 1,
        title: 'Design, Estrutura e Conversão',
        level: 'Intermediário',
        objective: 'Criar landing pages modernas adaptáveis a qualquer tela com seções de Hero, Benefícios, Depoimentos, Validação de Formulário e Integração WhatsApp.',
        resultDescription: 'Uma Landing Page comercial completa pronta para capturar leads de negócios reais.',
        lessons: [
          {
            id: 'mod2_aula1',
            moduleId: 'mod_2',
            courseId: 'modulo_02_landing_page',
            order: 1,
            title: 'Aula 1 — Planejamento & Hierarquia Visual',
            objectives: [
              'Entender os princípios fundamentais de uma Landing Page de alta conversão.',
              'Definir a hierarquia de títulos, Hero Section e Chamada para Ação (CTA).',
              'Construir a estrutura semântica das seções de navegação.'
            ],
            introduction: 'Uma Landing Page tem um único objetivo principal: converter visitantes em clientes ou leads. Nesta aula, planejaremos a arquitetura visual perfeita.',
            contentMarkdown: `### 1. Anatomia de uma Landing Page Comercial
- **Cabeçalho (Header)**: Logotipo e menu de navegação rápido.
- **Hero Section**: A primeira dobra visual com título impactante, subtítulo convincente, imagem/ilustração de destaque e o botão de ação principal (CTA).
- **Seção de Recursos e Benefícios**: Grid apresentando os diferenciais.
- **Prova Social**: Depoimentos reais de clientes satisfeitos.
- **Formulário de Conversão**: Formulário limpo e direto.
- **Rodapé (Footer)**: Direitos autorais e links de políticas.`,
            starterCode: {
              html: `<header class="navbar">
  <div class="logo">TechPulse</div>
  <nav>
    <a href="#beneficios">Benefícios</a>
    <a href="#depoimentos">Depoimentos</a>
    <a href="#contato" class="btn-nav">Falar com Consultor</a>
  </nav>
</header>

<section class="hero">
  <div class="hero-text">
    <h1>Transforme a Gestão da sua Empresa com IA</h1>
    <p>Aumente a produtividade da sua equipe em até 300% com nossa plataforma automatizada de inteligência artificial.</p>
    <div class="cta-group">
      <a href="#contato" class="btn-primary">Começar Teste Grátis</a>
      <a href="#demo" class="btn-secondary">Ver Demonstração</a>
    </div>
  </div>
</section>`,
              css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: #0F172A; color: white; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 8%; border-b: 1px solid #1E293B; }
.logo { font-size: 22px; font-weight: 700; color: #6957E8; }
nav { display: flex; gap: 20px; align-items: center; }
nav a { color: #94A3B8; text-decoration: none; font-size: 14px; }
.btn-nav { background: #6957E8; color: white !important; padding: 8px 16px; border-radius: 8px; }
.hero { padding: 80px 8%; max-width: 800px; }
.hero h1 { font-size: 42px; margin-bottom: 16px; line-height: 1.2; }
.hero p { font-size: 18px; color: #94A3B8; margin-bottom: 30px; }
.cta-group { display: flex; gap: 16px; }
.btn-primary { background: #6957E8; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; }
.btn-secondary { border: 1px solid #334155; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; }`,
              js: `console.log("Landing Page inicializada");`
            },
            exercises: [
              {
                id: 'ex_mod2_a1_1',
                lessonId: 'mod2_aula1',
                title: 'Conceito de CTA',
                description: 'O que significa a sigla CTA no desenvolvimento de landing pages?',
                type: 'multiple_choice',
                points: 10,
                question: 'A sigla CTA significa:',
                options: [
                  { id: 'opt1', text: 'Call to Action (Chamada para Ação)', isCorrect: true },
                  { id: 'opt2', text: 'Cascading Target Area', isCorrect: false },
                  { id: 'opt3', text: 'Central Technical Architecture', isCorrect: false }
                ],
                hint: 'É o botão principal que convida o usuário a realizar a conversão.',
                commentedSolution: 'Call to Action é o elemento visual projetado para levar o visitante a executar uma ação direta (como assinar, comprar ou baixar).'
              }
            ],
            summary: 'Aprendeu a arquitetar a estrutura de atração e retenção visual para uma Landing Page de alta performance.'
          },

          {
            id: 'mod2_aula2',
            moduleId: 'mod_2',
            courseId: 'modulo_02_landing_page',
            order: 2,
            title: 'Aula 2 — Layout CSS Grid & Cards de Benefícios',
            objectives: [
              'Dominar a criação de grids responsivos sem necessidade de media queries complexas usando repeat(auto-fit, minmax()).',
              'Estilizar cards de produtos, serviços e depoimentos de clientes.',
              'Criar efeitos de animação e foco ao passar o mouse (hover).'
            ],
            introduction: 'Nesta aula, usaremos CSS Grid para criar a seção de benefícios e os cards de depoimentos com layout fluido para mobile e desktop.',
            contentMarkdown: `### CSS Grid Moderno e Responsivo
O segredo para criar grids inteligentes sem dezenas de media queries é a fórmula \`minmax\`:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
\`\`\`
Essa regra instrui o navegador a colocar quantos cards de no mínimo 280px couberem na largura da tela, ajustando-se automaticamente!`,
            starterCode: {
              html: `<section class="features">
  <h2>Por que escolher o CodePlay?</h2>
  <div class="grid">
    <div class="card">
      <div class="icon">🚀</div>
      <h3>Projetos Reais</h3>
      <p>Aprenda criando código de verdade sem ficar preso em teoria pura.</p>
    </div>
    <div class="card">
      <div class="icon">⚡</div>
      <h3>Feedback Instantâneo</h3>
      <p>Execute seu código HTML, CSS e JS direto no laboratório com visualização em tempo real.</p>
    </div>
    <div class="card">
      <div class="icon">🎓</div>
      <h3>Certificados Válidos</h3>
      <p>Emita seus certificados com código único de validação ao concluir os módulos.</p>
    </div>
  </div>
</section>`,
              css: `body { font-family: sans-serif; background: #f8fafc; padding: 40px; }
.features h2 { text-align: center; color: #202433; margin-bottom: 30px; font-size: 28px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto; }
.card { background: white; padding: 28px; border-radius: 16px; border: 1px solid #e2e8f0; transition: transform 0.2s, box-shadow 0.2s; }
.card:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(105,87,232,0.12); border-color: #6957E8; }
.icon { font-size: 32px; margin-bottom: 12px; }
.card h3 { color: #202433; margin-bottom: 8px; }
.card p { color: #64748b; font-size: 14px; line-height: 1.5; }`,
              js: `// Passe o mouse sobre os cards!`
            },
            exercises: [
              {
                id: 'ex_mod2_a2_1',
                lessonId: 'mod2_aula2',
                title: 'CSS Grid Auto-Fit',
                description: 'Qual comando CSS Grid gera colunas responsivas automáticas?',
                type: 'multiple_choice',
                points: 15,
                question: 'Para criar colunas que se adaptam dinamicamente à largura da tela sem media queries, usamos:',
                options: [
                  { id: 'opt1', text: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));', isCorrect: true },
                  { id: 'opt2', text: 'display: flex-grid;', isCorrect: false },
                  { id: 'opt3', text: 'grid-columns: 3;', isCorrect: false }
                ],
                hint: 'Combina repeat(), auto-fit e minmax().',
                commentedSolution: 'O repeat(auto-fit, minmax(min, max)) é o padrão ouro moderno para grids responsivos.'
              }
            ],
            summary: 'Aprendeu a dominar CSS Grid e efeitos visuais interativos para apresentar benefícios e produtos.'
          },

          {
            id: 'mod2_aula3',
            moduleId: 'mod_2',
            courseId: 'modulo_02_landing_page',
            order: 3,
            title: 'Aula 3 — Formulários, Validação & Integração WhatsApp',
            objectives: [
              'Criar formulários de contato com validação nativa e via JS.',
              'Gerar links dinâmicos para enviar mensagem direta no WhatsApp.',
              'Adicionar Meta Tags SEO para redes sociais.'
            ],
            introduction: 'Nesta aula final do Módulo 02, integraremos o formulário de conversão com a API direta do WhatsApp para que o visitante envie uma mensagem pré-formatada para a equipe comercial!',
            contentMarkdown: `### Integração Direta com WhatsApp
Podemos disparar conversas no WhatsApp utilizando a URL padrão:
\`\`\`javascript
const numero = "5511999999999";
const mensagem = encodeURIComponent("Olá! Gostaria de mais informações sobre o produto.");
const url = \`https://api.whatsapp.com/send?phone=\${numero}&text=\${mensagem}\`;
window.open(url, '_blank');
\`\`\``,
            starterCode: {
              html: `<div class="form-card">
  <h2>Fale com Nosso Consultor</h2>
  <form id="contactForm">
    <label>Seu Nome:</label>
    <input type="text" id="nome" placeholder="Ex: Maria Oliveira" required>

    <label>Seu E-mail:</label>
    <input type="email" id="email" placeholder="maria@email.com" required>

    <label>Interesse:</label>
    <select id="opcao">
      <option value="Plano Individual">Plano Individual</option>
      <option value="Plano Para Equipes">Plano Para Equipes</option>
    </select>

    <button type="submit">Enviar pelo WhatsApp 🚀</button>
  </form>
</div>`,
              css: `body { font-family: sans-serif; background: #0F172A; color: white; padding: 40px; display: flex; justify-content: center; }
.form-card { background: #1E293B; padding: 32px; border-radius: 16px; width: 100%; max-width: 440px; border: 1px solid #334155; }
h2 { margin-bottom: 20px; color: #6957E8; font-size: 22px; }
label { display: block; font-size: 13px; color: #94A3B8; margin-bottom: 6px; }
input, select { width: 100%; padding: 12px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: white; margin-bottom: 16px; }
button { width: 100%; background: #19B98B; color: white; border: none; padding: 14px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; }
button:hover { background: #149670; }`,
              js: `document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const opcao = document.getElementById('opcao').value;
  
  const texto = \`Olá! Meu nome é \${nome} e tenho interesse no \${opcao} do CodePlay.\`;
  const url = \`https://api.whatsapp.com/send?phone=5511999999999&text=\${encodeURIComponent(texto)}\`;
  
  alert("Redirecionando para o WhatsApp:\\n" + texto);
  window.open(url, '_blank');
});`
            },
            exercises: [
              {
                id: 'ex_mod2_a3_1',
                lessonId: 'mod2_aula3',
                title: 'Codificação de URLs',
                description: 'Qual função JS é usada para codificar espaços e acentos em parâmetros de URL?',
                type: 'multiple_choice',
                points: 15,
                question: 'Para formatar textos com acentos e espaços em URLs do WhatsApp, usamos:',
                options: [
                  { id: 'opt1', text: 'encodeURIComponent(texto)', isCorrect: true },
                  { id: 'opt2', text: 'URL.format(texto)', isCorrect: false },
                  { id: 'opt3', text: 'escapeString(texto)', isCorrect: false }
                ],
                hint: 'Formata componentes URI de forma segura.',
                commentedSolution: 'encodeURIComponent garante que caracteres especiais como espaços, acentos e quebras de linha sejam codificados corretamente para a web.'
              }
            ],
            summary: 'Concluiu o Módulo 02 desenvolvendo uma Landing Page profissional com captura e envio direto via WhatsApp!'
          }
        ]
      }
    ]
  },

  {
    id: 'modulo_03_clinica_medica',
    slug: 'site-clinica-medica',
    title: 'Módulo 03 — Site Completo para uma Clínica Médica',
    description: 'Desenvolva um portal institucional completo e robusto para uma clínica médica fictícia, incluindo menu responsivo, agendamento de consultas, especialidades, FAQs acessíveis e normas de LGPD.',
    level: 'Avançado',
    category: 'Desenvolvimento Web Full-Stack Front-End',
    estimatedHours: 15,
    iconName: 'Activity',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
    modules: [
      {
        id: 'mod_3',
        courseId: 'modulo_03_clinica_medica',
        order: 1,
        title: 'Arquitetura de Sites Institucionais Completa',
        level: 'Avançado',
        objective: 'Desenvolver um portal médico completo com navegação entre seções, cards de especialistas, agendamento interativo de consultas, galeria e LGPD.',
        resultDescription: 'Um site institucional completo de alto padrão pronto para clínicas e organizações de saúde.',
        lessons: [
          {
            id: 'mod3_aula1',
            moduleId: 'mod_3',
            courseId: 'modulo_03_clinica_medica',
            order: 1,
            title: 'Aula 1 — Planejamento Institucional & Menu Responsivo',
            objectives: [
              'Estruturar portais multipáginas/multiseções com navegação suave (smooth scroll).',
              'Criar um menu de navegação hambúrguer totalmente responsivo para dispositivos móveis.',
              'Desenvolver o banner principal de boas-vindas com foco em confiança e saúde.'
            ],
            introduction: 'Sites institucionais para a área da saúde exigem sobriedade, cores calmas (tons azuis/esmeralda), excelente acessibilidade e navegação fluida em celulares.',
            contentMarkdown: `### 1. Princípios de UX para Saúde
- **Confiança e Transparência**: Apresentar corpo clínico com dados claros e registro profissional fictício.
- **Navegação Sem Frustração**: Acesso imediato a contatos de urgência e botão de agendamento de consulta em destaque.
- **Acessibilidade (WCAG)**: Contraste adequado e texto legível.`,
            starterCode: {
              html: `<header class="header">
  <div class="logo">🏥 Clínica VitaSaúde</div>
  <button class="menu-toggle" id="menuToggle">☰</button>
  <nav class="nav-menu" id="navMenu">
    <a href="#sobre">Sobre Nós</a>
    <a href="#especialidades">Especialidades</a>
    <a href="#equipe">Corpo Médico</a>
    <a href="#agendamento" class="btn-agendar">Agendar Consulta</a>
  </nav>
</header>

<section class="hero-clinica">
  <h1>Cuidando da sua saúde com excelência e humanização</h1>
  <p>Atendimento médico especializado com estrutura moderna e equipamentos de última geração.</p>
</section>`,
              css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: #F8FAFC; color: #1E293B; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 16px 8%; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); sticky; top: 0; z-index: 100; }
.logo { font-weight: 700; font-size: 20px; color: #0284C7; }
.nav-menu { display: flex; gap: 24px; align-items: center; }
.nav-menu a { text-decoration: none; color: #64748B; font-weight: 500; }
.btn-agendar { background: #0284C7; color: white !important; padding: 10px 20px; border-radius: 8px; }
.menu-toggle { display: none; background: none; border: none; font-size: 24px; cursor: pointer; }
.hero-clinica { background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); color: white; padding: 80px 8%; text-align: center; }
.hero-clinica h1 { font-size: 36px; margin-bottom: 16px; }

@media (max-width: 768px) {
  .menu-toggle { display: block; }
  .nav-menu { display: none; flex-direction: column; width: 100%; position: absolute; top: 60px; left: 0; background: white; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
  .nav-menu.active { display: flex; }
}`,
              js: `document.getElementById('menuToggle').addEventListener('click', function() {
  document.getElementById('navMenu').classList.toggle('active');
});`
            },
            exercises: [
              {
                id: 'ex_mod3_a1_1',
                lessonId: 'mod3_aula1',
                title: 'Navegação Responsiva',
                description: 'Qual classe JS costuma ser alternada com classList.toggle para abrir o menu mobile?',
                type: 'multiple_choice',
                points: 10,
                question: 'No código do menu hambúrguer, o método classList.toggle("active") é responsável por:',
                options: [
                  { id: 'opt1', text: 'Adicionar ou remover a classe "active" que altera o display do menu no CSS.', isCorrect: true },
                  { id: 'opt2', text: 'Excluir o menu do DOM permanentemente.', isCorrect: false },
                  { id: 'opt3', text: 'Recarregar os scripts da página.', isCorrect: false }
                ],
                hint: 'Alterna a presença de uma classe CSS.',
                commentedSolution: 'O método toggle insere a classe se ela não existir e remove se ela já estiver presente.'
              }
            ],
            summary: 'Desenvolveu a estrutura de navegação responsiva profissional para sites institucionais de saúde.'
          },

          {
            id: 'mod3_aula2',
            moduleId: 'mod_3',
            courseId: 'modulo_03_clinica_medica',
            order: 2,
            title: 'Aula 2 — Seções de Especialidades & Perguntas Frequentes (Accordion)',
            objectives: [
              'Desenvolver cards interativos para Cardiologia, Pediatria, Ortopedia e Dermatologia.',
              'Criar um componente accordion funcional para Perguntas Frequentes (FAQ).',
              'Montar a seção de galeria de fotos e convênios atendidos.'
            ],
            introduction: 'Nesta aula, construir os componentes interativos do portal: o catálogo de especialidades e o accordion expansível de dúvidas frequentes.',
            contentMarkdown: `### Accordions Acessíveis com JavaScript
Um accordion permite expandir e recolher respostas ao clicar na pergunta:
\`\`\`javascript
const accItems = document.querySelectorAll(".accordion-header");
accItems.forEach(item => {
  item.addEventListener("click", () => {
    item.nextElementSibling.classList.toggle("open");
  });
});
\`\`\``,
            starterCode: {
              html: `<section class="faq-section">
  <h2>Perguntas Frequentes</h2>
  <div class="accordion">
    <div class="item">
      <button class="acc-btn">Quais convênios médicos são aceitos? <span>+</span></button>
      <div class="acc-content">
        <p>Atendemos Bradesco Saúde, SulAmérica, Unimed, Amil e consultas particulares com reembolso.</p>
      </div>
    </div>
    <div class="item">
      <button class="acc-btn">Como funciona o agendamento de exames? <span>+</span></button>
      <div class="acc-content">
        <p>Você pode agendar diretamente pelo formulário online nesta página ou enviando mensagem no nosso WhatsApp.</p>
      </div>
    </div>
  </div>
</section>`,
              css: `body { font-family: sans-serif; background: #f8fafc; padding: 40px; }
.faq-section { max-width: 600px; margin: 0 auto; }
.faq-section h2 { color: #0284c7; margin-bottom: 20px; }
.accordion { border: 1px solid #e2e8f0; border-radius: 12px; background: white; overflow: hidden; }
.acc-btn { width: 100%; text-align: left; padding: 16px 20px; background: white; border: none; border-bottom: 1px solid #e2e8f0; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; color: #1e293b; }
.acc-content { padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; background: #f8fafc; }
.acc-content.open { padding: 16px 20px; max-height: 200px; }`,
              js: `document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('open');
    btn.querySelector('span').textContent = content.classList.contains('open') ? '−' : '+';
  });
});`
            },
            exercises: [
              {
                id: 'ex_mod3_a2_1',
                lessonId: 'mod3_aula2',
                title: 'Componente Accordion',
                description: 'Qual propriedade CSS é animada para criar o efeito de deslizamento no accordion?',
                type: 'multiple_choice',
                points: 15,
                question: 'Para expandir suavemente o conteúdo de uma resposta no accordion, alteramos:',
                options: [
                  { id: 'opt1', text: 'max-height (altura máxima com transição)', isCorrect: true },
                  { id: 'opt2', text: 'font-size', isCorrect: false },
                  { id: 'opt3', text: 'border-width', isCorrect: false }
                ],
                hint: 'Controla a altura contida do bloco.',
                commentedSolution: 'Animar a propriedade max-height aliada a overflow: hidden permite expansão suave sem sobressaltos no layout.'
              }
            ],
            summary: 'Aprendeu a programar accordions interativos e componentes de perguntas frequentes para portais corporativos.'
          },

          {
            id: 'mod3_aula3',
            moduleId: 'mod_3',
            courseId: 'modulo_03_clinica_medica',
            order: 3,
            title: 'Aula 3 — Agendamento de Consultas & LGPD Compliance',
            objectives: [
              'Desenvolver o formulário completo de agendamento de consulta com seleção de médico e data.',
              'Inserir o aviso e caixa de consentimento de LGPD (Lei Geral de Proteção de Dados).',
              'Validar todas as etapas e simular a confirmação de agendamento com aviso de sucesso.'
            ],
            introduction: 'Nesta aula final, construiremos o módulo de agendamento online com termo de consentimento LGPD obrigatório antes da transmissão dos dados.',
            contentMarkdown: `### Conformidade com a LGPD
Na coleta de dados de saúde (considerados dados sensíveis pela lei brasileira), é indispensável:
1. Apresentar o propósito claro da coleta.
2. Exigir o consentimento explícito do usuário através de um checkbox obrigatório.
3. Disponibilizar a Política de Privacidade.`,
            starterCode: {
              html: `<div class="agendamento-card">
  <h2>📅 Agendamento de Consulta Médica</h2>
  <form id="formConsulta">
    <div class="field">
      <label>Nome do Paciente:</label>
      <input type="text" id="paciente" placeholder="Seu nome completo" required>
    </div>

    <div class="field">
      <label>Especialidade:</label>
      <select id="especialidadeSelect">
        <option value="Cardiologia">Cardiologia - Dr. Roberto</option>
        <option value="Pediatria">Pediatria - Dra. Fernanda</option>
        <option value="Dermatologia">Dermatologia - Dr. Lucas</option>
      </select>
    </div>

    <div class="field">
      <label>Data Pretendida:</label>
      <input type="date" id="dataConsulta" required>
    </div>

    <div class="lgpd-box">
      <input type="checkbox" id="lgpdCheck" required>
      <label for="lgpdCheck">Concordo com a coleta de dados exclusivamente para fins de agendamento em conformidade com a LGPD.</label>
    </div>

    <button type="submit" class="btn-confirmar">Confirmar Agendamento</button>
  </form>
  <div id="mensagemSucesso" class="hidden">
    ✅ Agendamento pré-confirmado com sucesso! Em breve entraremos em contato.
  </div>
</div>`,
              css: `body { font-family: sans-serif; background: #f0fdf4; padding: 40px; display: flex; justify-content: center; }
.agendamento-card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #bbf7d0; max-width: 480px; width: 100%; box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
h2 { color: #166534; font-size: 20px; margin-bottom: 20px; }
.field { margin-bottom: 16px; }
label { display: block; font-size: 13px; color: #374151; margin-bottom: 6px; }
input, select { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; }
.lgpd-box { display: flex; gap: 10px; font-size: 12px; color: #4b5563; margin-bottom: 20px; background: #f9fafb; padding: 12px; border-radius: 8px; }
.lgpd-box input { width: auto; }
.btn-confirmar { width: 100%; background: #16a34a; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.hidden { display: none; }
#mensagemSucesso { margin-top: 16px; padding: 14px; background: #dcfce7; color: #15803d; border-radius: 8px; font-weight: 500; font-size: 14px; }`,
              js: `document.getElementById('formConsulta').addEventListener('submit', function(e) {
  e.preventDefault();
  const paciente = document.getElementById('paciente').value;
  const esp = document.getElementById('especialidadeSelect').value;
  const data = document.getElementById('dataConsulta').value;

  document.getElementById('mensagemSucesso').classList.remove('hidden');
  document.getElementById('formConsulta').reset();
});`
            },
            exercises: [
              {
                id: 'ex_mod3_a3_1',
                lessonId: 'mod3_aula3',
                title: 'Conformidade LGPD',
                description: 'Por que o consentimento do usuário é fundamental em formulários de saúde?',
                type: 'multiple_choice',
                points: 20,
                question: 'Na LGPD, dados de saúde são classificados como:',
                options: [
                  { id: 'opt1', text: 'Dados Pessoais Sensíveis, exigindo consentimento explícito.', isCorrect: true },
                  { id: 'opt2', text: 'Dados Públicos irrestritos.', isCorrect: false },
                  { id: 'opt3', text: 'Dados Comerciais de livre uso.', isCorrect: false }
                ],
                hint: 'Envolve a saúde física e histórico do cidadão.',
                commentedSolution: 'Informações médicas e clínicas são dados pessoais sensíveis segundo a legislação vigente no Brasil.'
              }
            ],
            summary: 'Parabéns! Você concluiu todos os 3 módulos da CodePlay, dominando o desenvolvimento web do zero ao portal avançado!'
          }
        ]
      }
    ]
  }
];
