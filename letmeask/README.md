# Diário de código-NLW ReactJS

Diário de código da trilha de ReactJS do evento NLW, promovido pela Rocketseat!

 - Tecnologias a serem usadas:	
	 - ReactJS
	 - Typescript
	 - Google Firebase
	 - SASS

# Dia 1 : 

 - Iniciando o projeto entendendo o **fluxo de um SPA** através de FlowCharts:
	- [FlowChart SPA](https://whimsical.com/fluxo-spa-single-page-app-EiEQvGFrXsRczjjKJdYEPV)
	- SPA => Single-Page-Application
	- Front-end apenas responsável por pedir dados ao Back, estilizar e passar para o usuário.
	- Back-end apenas responsável por enviar os DADOS necessários para o Front, muito mais leve que enviar um HTML já construído!	 
			 

 - **Iniciando o APP**:
	- Criando o projeto =>`yarn create react-app letmeask --template typescript`.
	- Limpei as pastas iniciais para tirar arquivos que nao interessam nesse primeiro momento.
	- Criei a pasta **components**, para armazenar os React Components.
	- -----
	- No **Firebase**:
	- Criei o serviço de Authentication(Google Auth) e Realtime Database.
	- Copiei a configuraçao do SDK para colar no arquivo de config no projeto.
	- -----
	- Instalei o SDK do Firebase com `yarn add firebase`. 
	- Criei a pasta ***services***, para armazenar configuraçoes de serviços externos(APIs,Firebase).
	- Criei o arquivo ***.env.local*** para setar as variáveis de ambiente(proteger infos importantes do código, como algumas keys do SDK do firebase. 
	- **OBS**: No create react-app as variáveis de ambiente devem ser iniciadas com *REACT_APP*.
		 
 - **React** (Conceitos):
	- ***Components***: Pedaços isolados de código (Funçoes),  que retornam HTML descrito em JSX. 
	- ***Props***: Informaçoes que podemos passar para componentes, para que estes possam alterar seu funcionamento.
	- ***States***: Sao informaçoes mantidas por um React component! Infos que **podem ser alteradas** pelo uso do usuário na aplicaçao.
		 
 - **Google Firebase**:
	- BaaS (Back-end as a Service).
	- Fornece uma estrutura de Back-end já pronta para uso.
	- Utilizaremos: Authentication, Banco de Dados (SGBD).		 
---
 
# Dia 2 : 

 - Iniciando o projeto com `yarn start`.
 - Import da pasta de imagens utilizadas no projeto na pasta ***assets***.
 - Criaçao do componente **Home**, uma Page.  	
 - **SASS**:
 	-  Install do SASS com `yarn add node-sass@5.0.0`, instalando a versao 5 especificamente.
	- Pré-processador CSS.
	- Defini estilos globais.
	- Defini estilos da ***page de authentication.***
	- Defini estilos da ***page create room***
	
 - Criação do componente **Button** (Reutilizável em várias partes do código).
 	- Ao criar o ***btn***, importei a tipagem ***ButtonHTMLAttributes***, que permite acessar/referenciar em todos os possíveis atributos de um componente button.
 - Criação do componente **NewRoom**, uma Page, reutilizando o template da Page **Home**.

  - **ROTEAMENTO**:
  	- Install do React-router-dom com `yarn add react-router-dom`.
  	- Permite criar links entre cada Page do App, utilizando componentes React.
	- Dessa forma mantemos o conceito de SPA, sem dar refresh na página quando trocamos de Page.
	- Instalei as tipagens com `yarn add @types/react-router-dom -D`, como dependencia de Desenvolvimento.
	- Criei as rotas para as Pages **Home** e **NewRoom** especificando o *path* de cada uma.
	- Utilizei o React **Hook** ***useHistory***, para linkar a Page **Home** à **NewRoom** 
	- **OBS**: O ***useHistory***, permite que o App tenha acesso e controle sobre o histórico de navegaçao do App, logo, ao utilizar esse Hook para linkar Pages, além do link, esta Page estará disponível para usar os comandos do navegador de voltar/suceder entre Pages.
	- Utilizei o componente ***Link*** para linkar a Page **NewRoom** à **Home** (Para voltar à Page **Home**).
 - **AUTENTICAÇAO**:
	- No **Home**, importei os métodos do Firebase já criados e implementei a funçao ***handleCreateRoom*** (*obs:essa funçao será refatorada mais a frente!*) para fazer a autenticaçao do usuário antes de passar para a Page de criaçao de sala.
	- Com a autenticaçao criada, é preciso gerenciar se o usuário está logado em cada Tela que requer essa informaçao.
	- A funçao de autenticaçao retorna um objeto, assim que esta é concluída, e com ele é possivel gerenciar em cada tela se o usuário está logado. 
	- Fiz isso com o uso de **ContextAPI**, que permite a troca/persistencia de informaçoes entre componentes React.
	
 - **CONTEXT API**:
	- **Contextos**=>Formas de **compartilhar informaçoes** entre componentes React.
		- Primeiramente instanciei o *context* com o método ***createContext***, que recebe como parametro o tipo da informaçao.
		- Em seguida declarei o React Component **<Context.Provider>** de modo que todos os ***children*** dentro dele tem acesso à informaçao que desejo passar.
		- O **<Context.Provider>** recebe uma propriedade "*value*", é nela que a informaçao é passada.
		- Para gerenciar a info de autenticaçao, criei um **State** no arquivo App e passei o objeto ***{state,setState}*** para o *context*,dessa forma é possível MODIFICAR e UTILIZAR esse **State** em qualquer lugar que esse *context* esteja sendo usado.
		- Nos components que desejo receber e utilizar essa informaçao, utilizei o **Hook** ***useContext***, que recebe como parametro o *context* desejado.
		- Refatorei a funçao que faz a autenticaçao, utilizando o **State** criado.
		- Alterei o value do *context* para receber o user já logado (No caso de ter logado na página inicial) e a funçao de login.
 - Para persistir a sessao do usuário, se a tela for resetada(por exemplo), utilizei o **Hook** ***useEffect***, que é um Hook de disparo de funcionalidades sempre que algo mudar (carregamento de tela, mudança de algum state,etc).
 - Separei a implementaçao do *context* de autenticaçao em um arquivo em separado.
 - Criei a pasta **Hooks**, para criar um Hook customizado, evitando importaçoes desnecessárias.
 - Criei o Hook ***useAuth*** que cria o *context* de autenticaçao separadamente (clean code).

 ---
 # Dia 3 : 

## Setando Fluxo para  criar **Nova Sala**
 -  Iniciei criando o **State** **newRoom** dentro do component ***NewRoom***, esse State vai gerenciar a criaçao de novas salas.
 - No *input* do form, coloquei o *event listener* **onChange**, que é ativado sempre que a mudança no input e passei como parametros uma funçao que passa o valor do *event* para a funçao que vai tratar de criar uma nova sala no **RealtimeDatabase**.
 - Criei a funçao **handleCreateNewRoom**, que recebe o event passado pelo input
		 - **OBS**: Usei o ***event.preventDefault()*** para evitar que o formulário recarregue a página.
		 
 - **RealtimeDatabase**:
 	- Utilizei o método ***database.ref*** para definir uma *"collection"* de **rooms** e setei uma variável referenciando essa collection para ser usado posteriormente.
	- Com o método ***push***, defini os dados que cada **room** vai receber ao ser criado.
	-  Defini um redirect com **history.push** na funçao **handleCreateNewRoom**.
	- Isso significa que quando a funçao finalizar e a sala estiver criada, o usuário será redirecionado **automaticamente** para a sala.
		
 - Setei o push para a rota  **"/rooms/:id"** e recebi  o "**id**" da sala com pegando a propriedade "**key**" da sala que acabou de ser criada.
## Setando Fluxo para **entrar em sala existente**
 - Defini o State **roomCode**, para gerenciar o **id** da room que o usuário quer entrar.
 - No componente **Home**, defini o event listener **onSubmit** do form para chamar a funçao **handleJoinRoom**.
 - Criei a funçao **handleJoinRoom** , que vai tratar de redirecionar o usuário para alguma sala dado o **id** da sala.
	- **OBS**: Usei o ***event.preventDefault()*** para evitar que o formulário recarregue a página.
 - No *input* do form, coloquei o *event listener* **onChange**, que é ativado sempre que a mudança no input e passei como parametros uma funçao que passa o valor do *event* para a funçao que vai tratar de redirecionar o user para a sala desejada.
 - **RealtimeDatabase**:
	- Utilizei o método ***database.ref*** passando a referencia "**/rooms/id**" para buscar o objeto **room** desejado no database. Completando com o método **get**, que vai pegar todos os dados daquela **room**.
	- Com o método ***push***, defini os dados que cada **room** vai receber ao ser criado.
	-  Defini um redirect com **history.push** na funçao **handleCreateNewRoom**.
	- Isso significa que quando a funçao finalizar e a sala estiver criada, o usuário será redirecionado **automaticamente** para a sala.
	- **NO GERENCIADOR DO FIREBASE:**				 
		- Setei as regras de autorizaçao no console do firebase (na parte de **regras**).
---
 - Criei o React component **Room** e setei a rota como **"/rooms/:id"**.
 - Importei o **Switch**, componente do react-router-dom que nao deixa duas rotas serem chamadas ao mesmo tempo (evita conflito de rotas).
 - Envolvi as Rotas com o Switch.
 - Estilizei o component **Room**.
 - Criei o component **RoomCode** que mostra o código da sala e possui uma funçao no **onClick** do button que copia o código.
	- Essa funçao é da API da Web, "**navigator.clipboard.writeText**".
 - Como o **id** da sala está sendo passado como parametro na URL, utilizei o Hook **useParams** do react-router-dom, para pegar o id e passei para o **RoomCode** como props.
 - Para criar a funcionalidade de mandar uma **Nova Pergunta**, iniciei criando um State e uma *async function*, que vai gerenciar isso(**newQuestion**).
 - Essa manipulaçao funcionou semelhante ao handle de **criar uma sala** (ver mais acima). 
 - Modifiquei o comportamento do footer do formulário (se logado, mostra **nome** e **avatar** do user, se nao, **pede para logar**) e estilizei essa parte.
  - Declarei um hook **useEffect** no component Room para começar a tratar do consumo de perguntas vindas do database.
 - Dentro do Hook, usei dos métodos do Firebase para pegar o "object" dentro da "collection" de acordo com o ID da rooom.
	- **OBS**:Foi utilizado o método "**on()**", que funciona como um **listener**, **sempre** que algum dado for alterado/inserido/removido , ele irá executar o bloco de código que vai consumir as questions dentro do database.
 - **OBS**: No useEffect, dentro do "listener" => **[ ]**, declarei o roomID, dessa forma, o useEffect terá como gatilho a mudança do ID da sala, que significa que pra cada sala que o usuário entrar, o useEffect irá carregar os dados relativos daquela sala.
 - As questions sao retornadas como Object, o que nao é intertessante para oq queremos. Entao utilizei o método **Object.entries** que quando recebe um Object, retorna um array com outros arrays dentro (Matriz) no formato **["key" , "value"]**.
 - Declarei o type das **questions**.
 - Após dar **parse** nas questions vindas do firebase de **Object =>Array**, com o método **map()** (para cada elemento do array executa alguma açao) retornei os dados para a variável que guarda o array de questions.
 - Declarei um State de questions, que será um Array de questions, e declarei o Type desse array.
 - Agora, para consumir esses dados em tela, criei mais um State, que vai gerenciar o Title da Room, e para colocar em tela, só chamar esses **States(questions e title)** nos campos necessários do return do React Component Room.
  
# Dia 4: 

 - Iniciei criando o component **Question** , as questoes que serao renderizadas na tela de **Room**.
 - Defini o **type** (Tipagem) das questions.
 - No component **Question**, existe uma div vazia, que vai receber os **controles de perguntas** (Admin e User sao diferentes).
 - Defini os styles do component **Question**.
 - No object **Room**,  na parte reservada para o render das perguntas, utilizei o étodo **Map**, pra percorrer o array de questions, e passe como return o object **Question** com o **props** *content* e *author*.
	- OBS: Passar prop "**key**" em cada question!
 - Criei o Hook **useRoom**, para deixar o app mais modularizado, dessa forma, todas as açoes relativos a salas, seja ela admin ou nao, ficam em um só lugar. 
 - Transferi tudo relativo à **Room genérica** para o **useRoom**.
 - Criei o component **AdminRoom**, que vai renderizar a visao do Admin de cada sala. É basicamente uma cópia do component **Room**, com alguns elementos diferindo.
	- Um desses elementos é o botao de "**encerrar sala**",  que utilizei o mesmo botao que já havia sido feito como component.
	- Esse button recebeu a propriedade "**isOutlined**", que faz com que ele mude de estilo a depender se estiver com essa propriedade ou nao!
 - No component **Room** (Sala visao users), criei o botao de Like da pergunta.
	- Para isso, passei a construçao do botao dentro das tags da Question, e recebi no component Question como o elemento **children**.
	- Também tive que definir a **tipagem** do elemento children, no caso importando o type ***ReactNode***, que tipa coisas do tipo JSX.
 - Estilizei o botao de like.
 - Criei a funçao que trata dos click de like de cada question.
	- Essa funçao vai **contabilizar cada clique** e mandar para o obj question.
	- Usei o método **database.ref** para setar também qual user deu o like, para depois contar.
	- No Hook que lida com o consumo das questions do database, utilizei "**Object.values(value.likes??{}).length**", para pegar o número de likes de uma determinada question e setei o type da question novamente para aceitar uma nova propriedade de likes.
	- Criei uma nova propriedade para a question, que sera vista pelo user que está dando os likes, a "**hasLiked**". Dessa forma eu posso alterar o visual quando uma pergunta já tiver recebido o like.
	- Chequei se o usuário já deu like em uma pergunta com: `Object.values(value.likes??{}).some(like=>like.authorId===user?.id)`.
	- No Room, renderizei os likes com `{userQuestion.likeCount>0&&<span>{userQuestion.likeCount}</span>}` 
	- O button de link recebe um **onClick** que trata da funçao de dar like, com o seguinte funcionamento: Se o user der like, ele vai enviar para o database o userId que deu like naquela question e se ele tirar o like, a funçao vai buscar no database o userId que retirou o like e remover ele do likeCount.
 - Criei o botao de **deletar pergunta** na view de Admin e setei a funçao que vai tratar o delete da pergunta no database.
 - Ao receber confirmaçao do delete, deletei a pergunta do database com `database.ref(rooms/${roomID}/questions/${questionId}).remove()` 
 - Criei a funçao de encerramento de sala, que recebe a referencia da sala no database e adiciona um campo com a data de encerramento da sala. Após isso o Admin e Users sao redirecionados para a página inicial do App.
 - No **Home** , inclui a verificaçao se a sala possui a data de término, se sim, a sala ficara inacessível e o usuário receberá uma mensagem. 

# Dia 5:

 - Adicionei os botoes de marcar a pergunta como: Respondida ou Destacada, basicamente clonando o button de deletar a pergunta.
 - Setei a lógica de booleanos de cada botao , **isAnswered** e **isHighlighted** no component **Question**.
 - A pergunta vai receber estilizaçoes diferentes de acordo com qual botao é clicado, entao para isso, declarei 2 classnames (***answered*** e ***highlighted***) que ao acionar o respectivo botao, adiciona alguma dessas classNames ao elemento.
 - Adicionei condicionais para o aparecimento dos botoes de Highlight e Answered =>
	- Esses botoes só irao aparecer se a pergunta estiver com **isAnswered** como ***false***.
	- Semelhante a esse comportamento, o botao de **like** da visao de user, só deve aparecer se a pergunta estiver com **isAnswered** como ***false***.
	- Estilizei o ***hover*** dos botoes.
	- Adicionei funcionalidade de dar **toggle** entre a prop ***isHighlighted***;

## Implementações Extra:
 - [x]  Theme toggle.
 - [x] Room Relevant question.
		 - Funcionalidade que observa os likes de todas as perguntas da sala.
		 - Quando uma pergunta chega num limite predefinido, essa pergunta é tida como relevante e a sala recebe uma mensagem. 
 - [x] Remove room modal.
	- Iniciei instalando um pacote de modal, com `yarn add react-modal` 
	- Configurei o ***style inline*** do **modal** e da div de botões.
	- Adicionei mais 2 styles para o elemento ***Button***, o **isMuted** e o **isDanger**.
	- Setei o botão no modal para chamar a função que encerra a sala.
 - [x] Ended room modal.
	- Com o react-modal, reutilizei o código do ***Remove room modal***, de maneira que quando a função *handleJoinRoom* verifica que a sala não existe/foi encerrada , o modal aparece comunicando o usuário.
 - [x] "No questions" picture.
	- Criei um State para gerenciar a quantidade de perguntas que existem no momento.
	- Se menor que 1, então cada visão (User ou Admin) vai ver uma mensagem que não existem perguntas feitas.
	- Se maior/igual a um, então as perguntas são exibidas.
	- Para verificar quando uma pergunta é inserida, utilizei o Hook **useEffect** com listener para o length do array de perguntas.
 - [x] Create room -> Admin route
	- Apenas alterei a rota para quando o usuário criar a sala ir direto para a visão de Admin.

 - ## **Hosting**:
 - Inciei instalando o Firebase CLI com `npm install -g firebase-tools` 
 - Inicializei o projeto com `firebase login`.
 - Após isso segui o passo a passo do `firebase init`.
 - Por último fiz o build do projeto com `yarn build`.
 - E por fim o deploy com `firebase deploy`.

		 
 
