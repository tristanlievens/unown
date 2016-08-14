interface Ev {
  stat: string
  value: number
}

interface Pokemon {
  id: number
  identifier: string
  types: Type[]
  evs: Ev[]
}

interface Type {
  id: number,
  identifier: string
}

interface Move {
  id: number
  identifier: string
  power: number
  pp: number
  accuracy: number
  priority: number
  type: Type
}

export { Ev, Pokemon, Type, Move }

declare const findMove: (id: number) => Move
declare const findProMove: (id: number) => Move
declare const typeEfficacy: (attType: Type, defType: Type) => number
declare const findPokemon: (id: number) => Pokemon

export { findMove, findProMove, typeEfficacy, findPokemon }