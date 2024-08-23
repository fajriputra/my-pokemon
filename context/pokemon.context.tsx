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
  favorites: Array<IPokemonAllData>;
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
  onAddFavorite: (pokemon: IPokemonAllData) => void;
  onDeleteFavorite: (pokemon: IPokemonAllData) => void;
} | null>(null);

// Actions
const LOADING = "LOADING";
const GET_ALL_POKEMON = "GET_ALL_POKEMON";
const GET_ALL_TYPES = "GET_ALL_TYPES";
const GET_POKEMON = "GET_POKEMON";
const NEXT = "NEXT";
const ADD_FAVORITE = "ADD_FAVORITE";
const DELETE_FAVORITE = "DELETE_FAVORITE";

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

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (pokemon) => pokemon.id !== action.payload.id
        ),
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
    favorites: [],
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

  const onAddFavorite = (pokemon: IPokemonAllData) => {
    dispatch({ type: ADD_FAVORITE, payload: pokemon });
  };

  const onDeleteFavorite = (pokemon: IPokemonAllData) => {
    dispatch({ type: DELETE_FAVORITE, payload: pokemon });
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
        onAddFavorite,
        onDeleteFavorite,
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
