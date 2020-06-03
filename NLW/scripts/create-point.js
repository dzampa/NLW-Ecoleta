function populeteUFs(){
    const UFselect =document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {

        for(state of states){
            UFselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    });
}

populeteUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput =document.querySelector("[name=state]")

    const ufValue = event.target.value; 
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cityes => {
        for(city of cityes){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    });

}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities);

//itens de coleta
//pegar todos os li's
const itensCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensCollect) {
    item.addEventListener("click",handleSelecteditem)
}

const colletedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelecteditem(event){
    //adconar ou remover classe com javascript
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar itens selecionados,se sim 
    //obter itens
    const alreadySelected = selectedItems.findIndex(item => item === itemId)
    //se já selecionado tirar da selecao
    if( alreadySelected >= 0 ){
        const filteredItems = selectedItems.filter(item => item !== itemId)
        
        selectedItems = filteredItems
    }else {
        //se nao add a selecao
        selectedItems.push(itemId)
    }
    //atualiz campo itens selecionado
    colletedItems.value = selectedItems
}