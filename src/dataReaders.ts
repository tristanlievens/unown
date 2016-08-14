import parse = require('csv-parse/lib/sync')
import { readFileSync } from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

const makeDataReader = <T>(filename: string): () => T[] => (
  _.memoize(() => {
    const csvString = readFileSync(path.join(__dirname, `../data/${filename}`), { encoding: 'UTF-8' })
    return _.map(parse(csvString, { columns: true }), row => (
      _.reduce(row, (acc, value, key) => {
        if (key === "identifier") acc[key] = value
        else if (/^is/.test(key)) acc[key] = (value === 1)
        else acc[key] = parseInt(value)
        return acc
      }, {} as T)
    ))
  })
)

interface PokemonRow {
  id: number
  identifier: string // name
  species_id: number
  height: number
  weight: number
  base_experience: number
  order: number
  is_default: boolean
}

export const pokemons = makeDataReader<PokemonRow>('pokemon.csv')

interface TypeRow {
  id: number
  identifier: string
  generation_id: number
  damage_class_id: number
}

export const types = makeDataReader<TypeRow>('types.csv')

interface StatsRow {
  id: number
  damage_class_id: number
  identifier: string
  is_battle_only: boolean
  game_index: number
}

export const stats = makeDataReader<StatsRow>('stats.csv') 

interface ProMove {
  pro_id: number
  move_id: number
}

export const proMoves = makeDataReader<ProMove>('pokemonRevolutionMoves.csv')

interface MoveRow {
  id: number
  identifier: string
  generation_id: number
  type_id: number
  power: number
  pp: number
  accuracy: number
  priority: number
  target_id: number
  damage_class_id: number
  effect_id: number
  effect_chance: number
  contest_type_id: number
  contest_effect_id: number
  super_contest_effect_id: number
}

export const moves = makeDataReader<MoveRow>('moves.csv') 

interface TypeEfficacyRow {
  damage_type_id: number
  target_type_id: number
  damage_factor: number
}

export const typeEfficacy = makeDataReader<TypeEfficacyRow>('typeEfficacy.csv') 

interface PokemonTypeRow {
  pokemon_id: number
  type_id: number
  slot: number
}

export const pokemonTypes = makeDataReader<PokemonTypeRow>('pokemonTypes.csv') 

interface PokemonStatsRow {
  pokemon_id: number
  stat_id: number
  base_stat: number
  effort: number
}

export const pokemonStats = makeDataReader<PokemonStatsRow>('pokemonStats.csv') 

interface MoveDamageClassRow {
  id: number
  identifier: string
}

export const moveDamageClasses = makeDataReader<MoveDamageClassRow>('moveDamageClasses.csv') 
