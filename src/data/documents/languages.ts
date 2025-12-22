
export type Language = "fr" | "en" | "de" | "es" | "pt" | "it" | "lt";

export type Clauses = {
    [key in Language]?: any;
}

    