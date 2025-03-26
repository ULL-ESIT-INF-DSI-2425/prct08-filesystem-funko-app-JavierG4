export enum FunkoTipos {
  POP, POP_RIDES, VYNIL_SODA, VYNYL_GOLD
}

export enum FunkoGenero {
  ANIMACION, PELICULAS_TV, VIDEOJUEGOS, DEPORTES, MUSICA, ANIME
}

export interface Funko {
  id: number,
  nombre: string,
  desc: string,
  tipo: FunkoTipos,
  genero: FunkoGenero,
  franquicia: string,
  numero: number,
  exclusivo: boolean,
  caracteristicas: string
  valorMercado: number
}