<img src="http://cdn.bulbagarden.net/upload/thumb/7/77/201Unown.png/250px-201Unown.png" alt="Unown" align="right" />
# Unown
Node library to easily find information about pokemon data, based on data provided by [PokeApi](https://github.com/PokeAPI/pokeapi).

[![npm version](https://img.shields.io/npm/v/unown.svg?style=flat-square)](https://www.npmjs.com/package/unown)
[![npm downloads](https://img.shields.io/npm/dt/unown.svg?style=flat-square)](https://www.npmjs.com/package/unown)

## Installation
To install, simply run 
```bash
npm install --save unown
```

## Usage
Most of the usage is enforced by the typescript declaration. Currently there are 3 main methods implemented:
```
import * as unown from 'unown'

unown.findPokemon(1) // { id: 1, identifier: 'bulbasaur', ... }
unown.findMove(1)    // { id: 1, identifier: 'pound', type: { identifier: 'normal', ... } ... }

const bulba = unown.findPokemon(1)
const ember = unown.findMove(52)
unown.typeEfficacy(ember.type, bulba.types[0]) // fire, grass => 200
```
