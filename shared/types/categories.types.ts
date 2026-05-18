import type { CardDTO } from "./cards.types";

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  cards: string[];
}
