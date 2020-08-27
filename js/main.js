const pokeInfoDisplay = document.querySelector('.poke-main-info')
const searchPokeInput = document.getElementById('srch-poke-input')
const searchButton = document.getElementById('srch-button')
const pkdxList = document.querySelector('.pokedex-list')
let url = " https://pokeapi.co/api/v2/pokemon?limit=807&offset=0";


fetch(url)
    .then(response => response.json())
    .then(data => fetchPokeList(data))

const fetchPokeList = pokeListData => {

    for (pokemon of pokeListData.results) {
        // console.log(pokemon.name)
        let listItem = document.createElement('li');
        listItem.textContent = `${pokemon.name}`;
        listItem.id = pokemon.name;
        listItem.classList.add(`poke-list-item`)
        pkdxList.insertAdjacentElement('beforeend', listItem);
    }

    const pokeListItem = document.getElementsByClassName('poke-list-item')
    const pokeListArr = Array.from(pokeListItem)
    for (pokemonDOM of pokeListArr) {
        pokemonDOM.addEventListener('click', search)
    }

}

const search = event => {
    
    let query = searchPokeInput.value

    if(event) {
        if(event.target.id !== "srch-button") {
            query = event.target.id;
        }
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => response.json())
        .then(data => fetchPokeData(data))

    const fetchPokeData = pokeData => {

        // console.log(pokeData)

        pokeInfoDisplay.innerHTML = `
        <span class="poke-name">${pokeData.name}</span>
        <span class="poke-number">#${pokeData.id}</span>
        <div class="poke-forms">
            <div class="normal-form">
                <span>Normal Form</span><br>
                <img src="${pokeData.sprites.front_default}">
            </div>
            <div class="shiny-form">
                <span>Shiny Form</span><br>
                <img src="${pokeData.sprites.front_shiny}">     
            </div>
        </div>
        <div class="poke-type"></div>
        <div class="poke-ability"></div>
        `
        const pokeTypes = document.querySelector('.poke-type')

        const dataTypes = pokeData['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];

        if (dataSecondType) {

            const firstType = dataFirstType.type.name;
            const secondType = dataSecondType.type.name;

            pokeTypes.innerHTML = `
            <span>Types:</span>
            <span class="types ${firstType}">${firstType}</span>
            <span class="types ${secondType}">${secondType}</span>
            `
        } else {

            const firstType = dataFirstType.type.name;

            pokeTypes.innerHTML = `
            <span>Type:</span>
            <span class="types ${firstType}">${firstType}</span>
            `
        }
        
        const pokeAbilities = document.querySelector('.poke-ability')
        const dataAbilities = pokeData['abilities']       
        const dataAbiliyOne = dataAbilities[0]
        const dataAbiliyTwo = dataAbilities[1]
        const dataAbiliyThree = dataAbilities[2]


        if (dataAbiliyThree) {
            pokeAbilities.innerHTML = `
            <div class="abilities">
                <span>Abilities:</span>
                <span class="ability">${dataAbiliyOne.ability.name.replace(/-/g, ' ')}</span>
                <span class="ability">${dataAbiliyTwo.ability.name.replace(/-/g, ' ')}</span>
            </div>
            <div class="hidden-ability">
                <span>Hidden Ability:</span>
                <span class="ability">${dataAbiliyThree.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        } else if (dataAbiliyTwo) {
            pokeAbilities.innerHTML = `
            <div class="abilities">
                <span>Ability:</span>
                <span class="ability">${dataAbiliyOne.ability.name.replace(/-/g, ' ')}</span>
            </div>
            <div class="hidden-ability">
                <span>Hidden Ability:</span>
                <span class="ability">${dataAbiliyTwo.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        } else {
            pokeAbilities.innerHTML = `
            <div class="abilities">
                <span>Ability:</span>
                <span class="ability">${dataAbiliyOne.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        }
     
        // let abilitiesDOM = {
        //     ability: [],
        //     hiddenAbility: []
        // }
        // for(dataAbilty of dataAbilities) {
        //     if(!dataAbility.is_hidden) {
        //         abilitiesDOM.ability.push(`<span class="ability">${dataAbility.ability.name.replace(/-/g, ' ')}</span>`)
        //     } else {
        //         abilitiesDOM.hiddenAbility.push(`<span class="ability">${dataAbility.ability.name.replace(/-/g, ' ')}</span>`)
        //     }
        // }
        
        // pokeAbilities.innerHTML = `
        //     <div class="abilities">
        //         <span>Abilities:</span>
        //         ${abilitiesDOM.ability.join(' ')}
        //     </div>
        //     <div class="hiddenAbility ${ abilitiesDOM.hiddenAbility.length > 0 ? "" : "hidden"}">
        //         <span>Hidden Ability:</span>
        //         ${abilitiesDOM.hiddenAbility.join(' ')}
        //     </div>     
        //     `  
    }

    pokeInfoDisplay.style.opacity = "1"

}

const searchWithKey = event => {
    if (event.key === "Enter") {
        search()
    }
}

searchButton.addEventListener('click', search)
searchPokeInput.addEventListener('keydown', searchWithKey)


