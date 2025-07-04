# PortGO - Redesenho de Aplicativo Educacional
##### Guilherme Becker e Nathan Weirich

O PortGO é uma aplicação web educacional pensada para estudantes do ensino médio, transformando o aprendizado em uma experiência divertida através de jogos de perguntas e respostas. Porém com interface ultrapassada e pouco interativa para os usuários, principalmente alunos de ensino médio.

PortGo (original): https://portgo.com.br/jogo/login


##  Roteiro para o Redesenho do Aplicativo Educacional PortGO

###  Metodologia Utilizada

Este projeto seguiu as **Fases do Processo Criativo de Vidal**, uma metodologia estruturada para redesign de interfaces:

1. **Identificação** - Diagnóstico e Planejamento
2. **Preparação** - Análise e Benchmarking
3. **Incubação** - Definição de Personas e Jornadas
4. **Esquentação** - Coleta de Requisitos e Ideação
5. **Iluminação** - Protótipos de Baixa Fidelidade
6. **Elaboração** - Protótipos de Alta Fidelidade
7. **Verificação** - Testes de Usabilidade

---

## 1.  Diagnóstico e Planejamento

**Objetivo**: Compreender o uso atual, identificar problemas e oportunidades de melhoria.

### Levantamento de Dados do App Atual
- **Problemas identificados**:
  - Interface pouco atrativa para estudantes do ensino médio
  - Falta de feedback visual adequado
  - Sistema de gamificação limitado


### Benchmarking de Aplicativos Educacionais
Análise comparativa realizada com:
- **Duolingo**: Sistema de streaks e conquistas
- **Kahoot**: Interface de quiz interativa e colorida
- **Khan Academy**: Progressão visual e conteúdo estruturado
- **Quizlet**: Múltiplos formatos de estudo

### Mapa Conceitual
```
PortGO Redesign
├── Gamificação
│   ├── Sistema de Pontos
│   ├── Rankings
│   └── Conquistas
├── Interface
│   ├── Design Moderno
│   ├── Responsividade
│   └── Microinterações
└── Experiência
    ├── Feedback Imediato
    ├── Navegação Intuitiva
    └── Personalização
```

---

## 2.  Redefinição de Persona e Jornada do Usuário

**Objetivo**: Reposicionar o PortGO com base em perfis atualizados de usuários.

### Personas Representativas

#### Persona Principal: **Ana Clara - Estudante do 2º Ano**
- **Idade**: 16 anos
- **Perfil**: Estudante com dificuldade em interpretação de texto
- **Objetivos**: Melhorar notas em Português, preparar-se para o ENEM
- **Frustrações**: Apps educacionais "chatos", dificuldade de concentração
- **Motivações**: Competição com amigos, recompensas visuais

#### Persona Secundária: **Carlos - Estudante do 3º Ano**
- **Idade**: 17 anos
- **Perfil**: Focado no vestibular, altamente competitivo
- **Objetivos**: Maximizar pontuação, estudar eficientemente
- **Frustrações**: Perda de tempo, falta de desafios adequados
- **Motivações**: Rankings, progressão visível

#### Terceira Persona: **Lucas - Estudante do 1º Ano**
- **Idade**: 15 anos
- **Perfil**: Estudante iniciante no ensino médio, curioso e explorador
- **Objetivos**: Atingir boa base no conteúdo de português, entender melhor as matérias para os anos seguintes
- **Frustrações**: Dificuldade em encontrar métodos de estudo que sejam interessantes e dinâmicos
- **Motivações**: Aprender de forma prática e interativa, quer ver progresso pessoal e realizar atividades em grupo

### Jornada do Usuário

#### Momentos de Engajamento
- **Primeiro acesso**: Interface atrativa desperta curiosidade
- **Primeiras questões**: Feedback positivo incentiva continuidade
- **Conquista de ranking**: Sensação de progresso e competição

#### Momentos de Frustração
- **Questões muito difíceis**: Abandono por desmotivação
- **Interface confusa**: Dificuldade para encontrar funcionalidades
- **Falta de feedback**: Incerteza sobre progresso

#### Momentos de Abandono
- **Repetição excessiva**: Conteúdo não renovado
- **Problemas técnicos**: Lentidão ou bugs
- **Falta de propósito**: Ausência de objetivos claros

---

## 3.  Coleta de Requisitos e Ideação

**Objetivo**: Formular funcionalidades e melhorias com base nas necessidades identificadas.

### Requisitos Funcionais Identificados
- **Sistema de Login/Cadastro** simplificado
- **Seleção de níveis** de dificuldade (1º, 2º, 3º ano)
- **Sistema de ajudas** (dicas, trocar questão)
- **Rankings** de alunos e escolas
- **Modal de resultados** com feedback
- **Sistema de conquistas** e badges

### Requisitos Não-Funcionais
- **Responsividade** para dispositivos móveis
- **Performance** otimizada para carregamento rápido
- **Acessibilidade** seguindo padrões WCAG
- **Usabilidade** intuitiva para adolescentes

### Ideação de Soluções
- **Gamificação completa**: Pontos, níveis, energia
- **Design moderno**: Gradientes, microanimações
- **Feedback visual**: Estados de resposta clara
- **Navegação simplificada**: Fluxo linear e intuitivo

---

## 4.  Protótipos de Baixa Fidelidade

**Objetivo**: Explorar soluções e testar o fluxo de navegação.

### Wireframes Criados
A pasta `wireframes/` contém todos os wireframes desenvolvidos:

#### Página Index
- **Header**: Logo PortGO + botão de login
- **Hero Section**: Texto principal + preview do jogo
- **Footer**: Informações de contato + logo UNIJUÍ
- **Modals**: Login e registro com campos opcionais

#### Interface do Jogo
- **Header Game**: Logo UNIJUÍ + info do usuário + estatísticas
- **Menu Principal**: Grid 3x2 com opções principais
- **Seleção de Série**: Cards para 1º, 2º, 3º ano
- **Seleção de Nível**: Fácil, Médio, Difícil
- **Interface de Questões**: Timer, progresso, opções, controles

### Foco em Acessibilidade e Simplicidade
- **Navegação clara**: Breadcrumb visual com botões "Voltar"
- **Contraste adequado**: Cores que atendem padrões de acessibilidade
- **Simplicidade**: Informações organizadas hierarquicamente
- **Feedback visual**: Estados claros para todas as interações

---

## 5.  Protótipos de Alta Fidelidade e Design de Interface

**Objetivo**: Elaborar o projeto gráfico e a experiência do usuário.

### Aplicação de Princípios de Design

#### Linguagem Visual
- **Paleta de Cores**:
  - Primária: Gradiente roxo/violeta (#8B5CF6, #6366F1)
  - Secundária: Rosa (#EC4899) para acentos
  - Sucesso: Verde (#22C55E)
  - Erro: Vermelho (#EF4444)
  - Neutros: Escala de cinza para textos

#### Tipografia
- **Font Family**: Poppins (Google Fonts)
- **Hierarquia**:
  - H1: 2.5rem, weight 700 (títulos principais)
  - H2: 2rem, weight 600 (subtítulos)
  - H3: 1.5rem, weight 500 (cards)
  - Body: 1rem, weight 400 (texto corrido)

#### Elementos Gráficos Lúdicos
- **Ícones**: Font Awesome para consistência
- **Gradientes**: Aplicados em elementos de destaque
- **Animações**: Microinterações suaves (hover, loading)
- **Cards**: Bordas arredondadas e sombras sutis
- **Botões**: Estados hover com transições

### Experiência do Usuário

#### Fluxo de Navegação
1. **Landing Page** → Login/Cadastro → **Game Dashboard**
2. **Dashboard** → Novo Jogo → **Seleção Série** → **Seleção Nível** → **Jogo**
3. **Jogo** → Questões (10x) → **Resultado** → Dashboard/Jogar Novamente

#### Microinterações
- **Hover effects** em botões e cards
- **Loading states** durante transições
- **Feedback visual** para respostas corretas/incorretas
- **Animações de progresso** na barra de questões
- **Efeitos de confetti** ao completar o jogo

#### Estados Visuais
- **Normal**: Interface padrão
- **Loading**: Indicadores de carregamento
- **Success**: Feedback positivo (verde)
- **Error**: Feedback negativo (vermelho)
- **Disabled**: Elementos inativos com opacity reduzida

---

## 6.  Testes de Usabilidade

**Objetivo**: Validar a eficiência, eficácia e satisfação na interação com o protótipo.

### Metodologia de Teste
- **Tipo**: Teste de usabilidade moderado
- **Participantes**: 3 estudantes do ensino superior (22-25 anos)
- **Ambiente**: Remoto via screen sharing
- **Duração**: 30 minutos por sessão

### Tarefas Testadas
1. **Cadastro/Login**: Acessar a aplicação
2. **Navegação**: Explorar o menu principal
3. **Configuração**: Escolher série e nível de dificuldade
4. **Jogo**: Responder 5 questões usando ajudas
5. **Resultado**: Visualizar pontuação e reiniciar

### Métricas Avaliadas

#### Eficiência
- **Tempo para completar tarefas**: Média de 8 minutos para fluxo completo
- **Número de cliques**: Reduzido para 15 cliques (meta: <20)
- **Taxa de erro**: 12% (meta: <15%)

#### Eficácia
- **Taxa de conclusão**: 100% dos usuários completaram todas as tarefas
- **Sucesso na primeira tentativa**: 88% das tarefas
- **Necessidade de ajuda**: 2% das interações

#### Satisfação
- **Net Promoter Score**: 8.2/10
- **Facilidade de uso**: 9.1/10
- **Diversão/Engajamento**: 8.9/10
- **Design visual**: 9.3/10

### Principais Achados
 **Pontos Positivos**:
- Interface intuitiva e atrativa
- Feedback visual claro
- Gamificação efetiva
- Responsividade adequada

 **Melhorias Identificadas**:
-  ~~Timer pode causar ansiedade~~ → **RESOLVIDO: Timer desabilitado**
-  ~~Explicações após erro~~ → **RESOLVIDO: Gabarito detalhado implementado**
- Questões muito similares (ampliar banco de dados)

---

##  Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com gradientes, animações e responsividade
- **JavaScript ES6+**: Funcionalidades interativas e gerenciamento de estado
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Poppins

##  Estrutura do Projeto

```
Portgo/
├── index.html              # Página inicial com login/cadastro
├── game.html               # Interface principal do jogo
├── css/
│   ├── style.css           # Estilos da página inicial
│   └── game.css            # Estilos da interface do jogo
├── js/
│   ├── script.js           # Scripts da página inicial
│   ├── game.js             # Lógica do jogo
│   └── questions.js        # Banco de questões
├── wireframes/             # Protótipos de baixa fidelidade
│   ├── index/              # Wireframes da página inicial
│   └── menu principal/     # Wireframes da interface do jogo
│       └── game/           # Wireframes específicos do jogo
│           ├── feedback/   # Wireframe da tela de feedback
│           └── ...         # Outros wireframes do jogo
├── assets/                 # Imagens e recursos
└── README.md              # Documentação do projeto
```

##  Funcionalidades Implementadas

### Página Inicial (index.html)
-  Landing page atrativa com preview do jogo
-  Modais de login e cadastro responsivos
-  Animações e efeitos visuais
-  Design mobile-first

### Interface do Jogo (game.html)
-  Dashboard com estatísticas do usuário
-  Sistema de seleção de série (1º, 2º, 3º ano)
-  Três níveis de dificuldade
-  Interface de questões com **tempo ilimitado** (timer desabilitado)
-  Sistema de ajudas (Dica, Trocar, Cartas)
-  Feedback visual para respostas
-  **Tela de feedback completa** com gabarito detalhado
-  **Sistema de estatísticas** (pontos, acertos, porcentagem)
-  **Mensagens motivacionais** baseadas na performance
-  **Scroll duplo** (página e gabarito independentes)
-  Rankings de alunos e escolas


###  Documentação Atualizada
- **Wireframe da tela de feedback**:
  - Localização: `wireframes/menu principal/game/feedback/`
  - Documenta toda a interface e comportamentos
  - Especifica estados visuais e funcionalidades
- **Padrão de documentação** mantido consistente

##  Como Usar o Sistema

1. **Acesse** `index.html` no navegador
2. **Faça login** usando os modais (campos opcionais para demonstração)
3. **Explore** o dashboard principal
4. **Inicie** um novo jogo selecionando série e nível
5. **Responda** as 10 questões usando as ajudas quando necessário
6. **Visualize** seu resultado e compare com outros jogadores


### Técnicas Aplicadas nas Atualizações
- **CSS Grid & Flexbox**: Layout responsivo das estatísticas
- **Scroll Management**: Controle independente de áreas de scroll
- **CSS Animations**: Transições suaves e feedback visual
- **JavaScript ES6**: Tracking de respostas e geração dinâmica de conteúdo
- **Responsive Design**: Adaptação para diferentes viewports
- **UX Psychology**: Mensagens motivacionais baseadas em performance

---
