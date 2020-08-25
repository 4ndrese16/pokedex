const pokeInfoDisplay = document.querySelector('.pokeMain')
const searchPoke = document.getElementById('srchPoke')
const pokeTypes = document.querySelector('pokeType')

document.getElementById('srchButton').addEventListener("click", () => {
    let query = searchPoke.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => response.json())
        .then(data => fetchPokeData(data))

    const fetchPokeData = pokeData => {

        console.log(pokeData)

        pokeInfoDisplay.innerHTML = `
        <h3 class="pokeName">${pokeData.name}</h3>
        <h3 class="pokeNumber">#${pokeData.id}</h3>
        <img src="${pokeData.sprites.front_default}">
        <span class="normalForm">Normal Form</span>
        <img src="${pokeData.sprites.front_shiny}"
        <span class="shinyForm">Shiny Form</span>
        <ul class="pokeType"></ul>
        `
        
        for (tipo of pokeData.types) {
            
            const typeList = document.createElement('li')
            typeList.textContent = tipo.type.name
            pokeTypes.insertAdjacentElement("beforebegin", typeList)
        }

    }

})



















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
