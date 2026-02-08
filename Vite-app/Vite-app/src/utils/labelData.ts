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

export const mockLabels: Label[] = [
    { id: "label-1", name: "Bug", color: "#E53E3E" },
    { id: "label-2", name: "Feature", color: "#38A169" },
    { id: "label-3", name: "Enhancement", color: "#3182CE" },
    { id: "label-4", name: "Documentation", color: "#805AD5" },
    { id: "label-5", name: "Design", color: "#D47EC3" },
];
