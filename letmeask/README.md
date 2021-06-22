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
 - Criei o Hook ***useAuth*** que cria o *context* de autenticaçao separadamente (clean code)
  

 
