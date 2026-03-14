export interface Label {
    id: string;
    name: string;
    color: string;
}

export const LABEL_COLORS = [
    "#E53E3E", "#DD6B20", "#D69E2E", "#38A169",
    "#319795", "#3182CE", "#5A67D8", "#805AD5",
    "#B24F9F", "#D47EC3", "#6945CA", "#727272",
] as const;
