const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = e.target.elements['nome'].value;
    const quantidade = e.target.elements['quantidade'].value;

    criaElemento(nome, quantidade);
});

function criaElemento (nome, quantidade) {
    // cria novo li e add classe
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    // cria elemento strong e atribui a ele a quantidade digitado pelo usuário
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;
    
    // cria novo item da lista com informações completas
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    // adiciona novo item a lista 
    lista.appendChild(novoItem);
}