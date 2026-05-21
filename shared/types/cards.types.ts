import type { CategoryDTO } from "./categories.types";

// ~/types/card.ts
export interface CardDTO {
  id: string;
  front: string;
  back: string;
  category: CategoryDTO;
}
