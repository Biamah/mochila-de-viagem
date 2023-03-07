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

        // atualiza elemento no localstorage
        itens[existe.id] = itemAtual;
    } else {
        itemAtual.id = itens.length;

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

    // adiciona novo item a lista 
    lista.appendChild(novoItem);

}

function atualizaElemento (item) {
    // atualiza a quantidade dos itens de acordo com a última quantidade digitada
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}