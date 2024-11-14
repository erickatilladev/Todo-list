// Seleciona os elementos HTML que vamos manipular
const button = document.querySelector('.button-add-task');  // Botão para adicionar nova tarefa
const input = document.querySelector('.input-task');  // Campo de entrada para digitar a tarefa
const listaCompleta = document.querySelector('.list-tasks');  // Lista onde as tarefas serão exibidas

// Declaração do array que vai armazenar as tarefas
let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa
function adicionarNovaTarefa() {
    if (input.value.trim() !== "") {  // Verifica se o campo de input não está vazio
        minhaListaDeItens.push({
            tarefa: input.value,  // Adiciona o texto da tarefa
            concluida: false  // Marca que a tarefa ainda não foi concluída
        });
        input.value = '';  // Limpa o campo de input após adicionar a tarefa
        atualizarLocalStorage();  // Atualiza o localStorage com a nova lista
        mostrarTarefas();  // Exibe as tarefas atualizadas
    }
}

// Função para exibir as tarefas na lista
function mostrarTarefas() {
    listaCompleta.innerHTML = '';  // Limpa a lista antes de renderizar

    // Itera sobre cada item na lista de tarefas e cria os elementos HTML correspondentes
    minhaListaDeItens.forEach((item, index) => {
        const li = document.createElement('li');  // Cria um novo item de lista
        li.classList.add('task');  // Adiciona a classe "task" ao item da lista
        if (item.concluida) li.classList.add('done');  // Se a tarefa estiver concluída, adiciona a classe "done"

        const checkImg = document.createElement('img');  // Cria uma imagem para marcar a tarefa como concluída
        checkImg.src = "./img/checked.png";  // Define a imagem
        checkImg.alt = "Check-na-tarefa";  // Texto alternativo da imagem
        checkImg.addEventListener('click', () => concluirTarefa(index));  // Adiciona um evento de click para marcar a tarefa

        const tarefaTexto = document.createElement('p');  // Cria um parágrafo com o texto da tarefa
        tarefaTexto.textContent = item.tarefa;

        const trashImg = document.createElement('img');  // Cria uma imagem para remover a tarefa
        trashImg.src = "./img/trash.png";  // Define a imagem do ícone de lixeira
        trashImg.alt = "Remover tarefa";  // Texto alternativo da imagem
        trashImg.addEventListener('click', () => deletarItem(index));  // Adiciona um evento de click para deletar a tarefa

        // Adiciona os elementos criados à lista
        li.appendChild(checkImg);
        li.appendChild(tarefaTexto);
        li.appendChild(trashImg);

        listaCompleta.appendChild(li);  // Adiciona o item da lista à lista completa
    });
}

// Função para marcar a tarefa como concluída ou não
function concluirTarefa(index) {
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida;  // Altera o estado da tarefa (concluída ou não)
    atualizarLocalStorage();  // Atualiza o localStorage com a nova lista
    mostrarTarefas();  // Atualiza a exibição das tarefas
}

// Função para deletar uma tarefa
function deletarItem(index) {
    minhaListaDeItens.splice(index, 1);  // Remove o item da lista baseado no índice
    atualizarLocalStorage();  // Atualiza o localStorage com a nova lista
    mostrarTarefas();  // Atualiza a exibição das tarefas
}

// Função para atualizar a lista de tarefas no localStorage
function atualizarLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));  // Armazena a lista no localStorage como string JSON
}

// Função para carregar as tarefas armazenadas no localStorage quando a página for recarregada
function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista');  // Obtém as tarefas do localStorage
    if (tarefasDoLocalStorage) {  // Verifica se há dados no localStorage
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);  // Converte a string JSON de volta para um array
        mostrarTarefas();  // Exibe as tarefas carregadas
    }
}

// Chama a função para recarregar as tarefas quando a página for carregada
recarregarTarefas();

// Adiciona um ouvinte de evento ao botão para adicionar nova tarefa
button.addEventListener('click', adicionarNovaTarefa);
