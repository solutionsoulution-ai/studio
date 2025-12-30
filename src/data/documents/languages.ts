
export type Language = "fr" | "en" | "de" | "es" | "pt" | "it" | "lt" | "nl";

export type Clauses = {
    [key in Language]?: any;
}
