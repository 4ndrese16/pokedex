const pokeInfoDisplay = document.querySelector('.pokeMainInfo')
const searchPokeInput = document.getElementById('srchPokeInput')
const searchButton = document.getElementById('srchButton')


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



















// fetch('https://pokeapi.co/api/v2/pokemon/567')
//     .then(res => {
//          return res.json() })

//     .then(data => {
//         let element = document.querySelector('.pokedex');
//      element.innerHTML = `${data.name}`

//      console.log(data)
//      });

// let url = " https://pokeapi.co/api/v2/pokemon?limit=807&offset=0";

// fetch(url)
//     .then(response => response.json())
//     // .then(data => {
//     //     for(nombres of data.results){
//     //         const list = document.querySelector('.pokedex-list')
//     //         list.innerHTML = `<div>${nombres.name}</div>`
//     //         // list.textContent = `${nombres.name}`
//     //         // document.querySelector('.pokedex-list').insertAdjacentHTML("beforeend", list)
//     //         console.log(nombres.name)
//     //     };


//     // })
//     .then(data => {
//         results.forEach(name => {
//             const pokeName = document.createElement('div')
//             pokeName.textContent = results.name 
//             document.querySelector('.pokedex-list').insertAdjacentHTML("beforeend", pokeName)

//     })
//     console.log(data.results.name)
//     })
