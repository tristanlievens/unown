import * as data from './dataReaders'
import { Pokemon, Type, Ev, Move } from '../index'
import * as _ from 'lodash'

const findMove = (id: number): Move => {
  const moveRow = _.find(data.moves(), row => row.id === id)
  const type: Type = _.find(data.types(), row => row.id === moveRow.type_id)
  return _.assign<Move>({}, moveRow, { type: type })
}

const findProMove = (id: number): Move => (
  findMove(_.find(data.proMoves(), row => row.pro_move_id === id).move_id)
)

const typeEfficacy = (attType: Type, defType: Type):number => (
  _.find(data.typeEfficacy(), row => row.damage_type_id === attType.id && row.target_type_id === defType.id).damage_factor
)

const findPokemon = (id: number): Pokemon => {
  const pokemonRow = _.find(data.pokemons(), row => row.id === id)
  const types: Type[] = _.chain(data.pokemonTypes())
    .filter(row => row.pokemon_id === id)
    .map((pokemonTypeRow): Type => _.find(data.types(), row => row.id === pokemonTypeRow.type_id))
    .value()
  const evs: Ev[] = _.chain(data.pokemonStats())
    .filter(row => row.pokemon_id === id && row.effort !== 0)
    .map((pokemonStatsRow):Ev => {
       const identifier = _.find(data.stats(), row => row.id === pokemonStatsRow.stat_id)
                           .identifier
       return { stat: identifier, value: pokemonStatsRow.effort }
    })
    .value()

  return _.assign<Pokemon>({}, pokemonRow, {
    types: types,
    evs: evs,
  })
}

export {
  findMove,
  findProMove,
  typeEfficacy,
  findPokemon,
}
