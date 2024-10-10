import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console?: ConsoleDTO;
}

export interface AddGame {
    title: string;
    consoleId: number;
}

export interface EditGame {
  id: number;
  title?: string;
  consoleId?: number;
}