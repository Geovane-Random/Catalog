# Catálogo de Produtos Interativo

Este projeto é uma aplicação web de catálogo de produtos, desenvolvida com React. A interface permite que os usuários naveguem por uma lista de itens, selecionem variações (como tamanho) e quantidades, e, ao final, montem uma mensagem de orçamento para ser enviada diretamente via WhatsApp.

## ✨ Funcionalidades

*   **Grade de Produtos Responsiva**: Os produtos são exibidos em uma grade que se adapta a diferentes tamanhos de tela (celular, tablet e desktop).
*   **Seleção de Itens**: Ao clicar em "Selecionar", um modal é aberto para que o usuário escolha o tamanho e a quantidade desejada do produto.
*   **Agrupamento de Itens**: Se um mesmo item (com o mesmo tamanho) for adicionado novamente, a quantidade é somada ao item já existente no pedido.
*   **Revisão do Pedido**: Um modal de "carrinho" permite ao usuário revisar todos os itens selecionados antes de enviar.
*   **Edição e Remoção**: Na tela de revisão, é possível alterar a quantidade de cada item ou removê-lo completamente do pedido.
*   **Integração com WhatsApp**: Com um clique, uma nova aba é aberta com uma mensagem pré-formatada contendo todos os itens do pedido, pronta para ser enviada para o número de contato da empresa.

## 🚀 Tecnologias Utilizadas

*   **React.js**: Biblioteca JavaScript para construir a interface de usuário.
*   **React Hooks**: (`useState`, `useEffect`) para gerenciamento de estado e ciclo de vida dos componentes.
*   **CSS3**: Para estilização, utilizando Flexbox e Grid Layout para criar uma interface moderna e responsiva.
*   **HTML5**: Estrutura semântica da aplicação.
*   **JavaScript (ES6+)**: Lógica principal da aplicação.

## ⚙️ Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até o diretório do projeto**
    ```bash
    cd Catalog
    ```

3.  **Instale as dependências**
    ```bash
    npm install
    ```

4.  **Inicie a aplicação**
    ```bash
    npm start
    ```

A aplicação estará disponível em `http://localhost:3000` no seu navegador.
