const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

// lista de itens inicial
const itens = JSON.parse(localStorage.getItem('itens')) || [];
itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // pega nome e quantidade cadastrados no form
    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    // objeto item atual
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value,
    }
    
    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        // busca elemento correto e atualiza elemento no localstorage
        itens[intens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        // verifica o index correto de cada elemento
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        // cria elemento li na lista
        criaElemento(itemAtual);
    
        // adiciona item na lista
        itens.push(itemAtual);
    }

    // salva no localStorage
    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
});

function criaElemento (item) {
    // cria novo li e add classe
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    // cria elemento strong e atribui a ele a quantidade digitado pelo usuário
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    
    // cria novo item da lista com informações completas
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    // adiciona botão deletar
    novoItem.appendChild(botaoDeleta(item.id));

    // adiciona novo item a lista 
    lista.appendChild(novoItem);

}

function atualizaElemento (item) {
    // atualiza a quantidade dos itens de acordo com a última quantidade digitada
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento (tag, id) {
    tag.remove();

    // remover um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    // reescrever do localstorage
    localStorage.setItem('itens', JSON.stringify(itens));
}