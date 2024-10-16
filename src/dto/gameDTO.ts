import { consoleDTO } from "./consoleDTO";

export interface gameDTO {
  id?: number;
  title: string;
  console?: consoleDTO;
}

export interface addGameDTO {
    title: string;
    consoleId: number;
}

export interface editGameDTO {
  id: number;
  title?: string;
  consoleId?: number;
}