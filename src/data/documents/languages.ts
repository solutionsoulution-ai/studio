
export type Language = "fr" | "en" | "de" | "es" | "pt" | "it";

export type Clauses = {
    [key in Language]?: any;
}

    