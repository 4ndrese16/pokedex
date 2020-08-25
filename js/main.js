const pokeInfoDisplay = document.querySelector('.pokeMainInfo')
const searchPokeInput = document.getElementById('srchPokeInput')
const searchButton = document.getElementById('srchButton')
const pkdxList = document.querySelector('.pokedexList')

const search = () => {
    let query = searchPokeInput.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => response.json())
        .then(data => fetchPokeData(data))

    const fetchPokeData = pokeData => {

        console.log(pokeData)

        pokeInfoDisplay.innerHTML = `
        <span class="pokeName">${pokeData.name}</span>
        <span class="pokeNumber">#${pokeData.id}</span>
        <div class="pokeForms">
        <div class="normalForm">
        <span>Normal Form</span><br>
        <img src="${pokeData.sprites.front_default}">
        </div>
        <div class="shinyForm">
        <span>Shiny Form</span><br>
        <img src="${pokeData.sprites.front_shiny}">     
        </div>
        </div>
        <div class="pokeType"></div>
        <div class="pokeAbility"></div>
        `
        const pokeTypes = document.querySelector('.pokeType')

        const dataTypes = pokeData['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];

        if (dataSecondType) {
            pokeTypes.innerHTML = `
            <span>Types:</span>
            <span class="types">${dataFirstType.type.name}</span>
            <span class="types">${dataSecondType.type.name}</span>
            `
        } else {
            pokeTypes.innerHTML = `
            <span>Type:</span>
            <span class="types">${dataFirstType.type.name}</span>
            `
        }

        const pokeAbilities = document.querySelector('.pokeAbility')

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
            <div class="hiddenAbility">
            <span>Hidden Ability:</span>
            <span class="ability">${dataAbiliyThree.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        } else if (dataAbiliyTwo) {
            pokeAbilities.innerHTML =`
            <div class="abilities">
            <span>Ability:</span>
            <span class="ability">${dataAbiliyOne.ability.name.replace(/-/g, ' ')}</span>
            </div>
            <div class="hiddenAbility">
            <span>Hidden Ability:</span>
            <span class="ability">${dataAbiliyTwo.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        } else {
            pokeAbilities.innerHTML =`
            <div class="abilities">
            <span>Ability:</span>
            <span class="ability">${dataAbiliyOne.ability.name.replace(/-/g, ' ')}</span>
            </div>
            `
        }
        
    }

}

const searchWithKey = event => {
    if (event.key === "Enter") {
        search()
    }
}

searchButton.addEventListener('click', search)
searchPokeInput.addEventListener('keydown', searchWithKey)

let url = " https://pokeapi.co/api/v2/pokemon?limit=807&offset=0";

fetch(url)

fetch(url)
    .then(response => response.json())
    .then(data => fetchPokeList(data))

const fetchPokeList = pokeListData => {

    for(listName of pokeListData.results) {
        console.log(listName.name)
            // let listItem = document.createElement('li')
            // listItem.textContent = `${listName.name}`
            // pkdxList.insertAdjacentHTML('afterbegin', listItem)                   
    }

    
}
