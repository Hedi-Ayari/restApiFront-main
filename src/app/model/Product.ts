import { Category } from "./category";

export interface Product {

    id_produit: number;
    lib: string;
    prix: number;
    qte: number;
    categorie: Category;
}
