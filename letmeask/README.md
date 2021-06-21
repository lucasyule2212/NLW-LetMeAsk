# Diário de código-NLW ReactJS

Diário de código da trilha de ReactJS do evento NLW, promovido pela Rocketseat!

 - Tecnologias a serem usadas:	
	 - ReactJS
	 - Typescript
	 - Google Firebase

# Dia1 : 

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
		 

  

 
