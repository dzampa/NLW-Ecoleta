function populeteUFs(){
    const UFselect =document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
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

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json())
    .then(cityes => {

        for(city of cityes){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    });

}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities);