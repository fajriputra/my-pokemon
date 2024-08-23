"use client";

import { IPokemonAllData } from "@/types/pokemon.type";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
  Dispatch,
} from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface State {
  allPokemon: Pokemon[];
  types: Pokemon[];
  pokemon: Partial<IPokemonAllData>;
  next: string;
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

// Create context with proper typing
const GlobalContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
  allPokemonData: Array<IPokemonAllData>;
  next: () => Promise<void>;
} | null>(null);

// Actions
const LOADING = "LOADING";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_TYPES = "GET_ALL_TYPES";
const GET_POKEMON = "GET_POKEMON";
const NEXT = "NEXT";

// Reducer with typed state and actions
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };

    case GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        loading: false,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload.results,
        loading: false,
      };

    case GET_POKEMON:
      return { ...state, pokemon: action.payload, loading: false };

    case NEXT:
      return {
        ...state,
        allPokemon: [...state.allPokemon, ...action.payload.results],
        next: action.payload.next,
        loading: false,
      };

    default:
      return state;
  }
};

interface IGlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = (props: IGlobalProviderProps) => {
  const baseUrl = "https://pokeapi.co/api/v2/";

  const initialState: State = {
    allPokemon: [],
    pokemon: {},
    types: [],
    next: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState<IPokemonAllData[]>([]);

  const allPokemon = async () => {
    dispatch({ type: LOADING });

    const res = await fetch(`${baseUrl}pokemon?limit=10`);
    const data = await res.json();
    dispatch({ type: GET_ALL_POKEMON, payload: data });

    const allPokemonData = [];

    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }

    setAllPokemonData(allPokemonData);
  };

  const getPokemonTypes = async () => {
    dispatch({ type: "LOADING" });

    const res = await fetch(`${baseUrl}type`);
    const data = await res.json();

    dispatch({ type: "GET_ALL_TYPES", payload: data });
  };

  const next = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(state.next);
    const data = await res.json();
    dispatch({ type: NEXT, payload: data });

    const newPokemonDataPromises = data.results.map(
      async (pokemon: Pokemon) => {
        const pokemonRes = await fetch(pokemon.url);
        return pokemonRes.json();
      }
    );

    const newPokemonData = await Promise.all(newPokemonDataPromises);
    setAllPokemonData([...allPokemonData, ...newPokemonData]);
  };

  useEffect(() => {
    getPokemonTypes();
    allPokemon();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        allPokemonData,
        next,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
