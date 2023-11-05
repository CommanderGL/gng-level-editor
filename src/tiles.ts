import { reactive } from "vue";

export const tileColors = [
    "#5c58a3",
    "#696783",
    "#3b8a3f"
];

export const levels = reactive([
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
]);

export const setLevels = (newLevels: number[][]) => {
    for (let _ = -1; _ < levels.length; _++) {
        levels.pop();
    }
    newLevels.forEach(newLevel => {
        levels.push(newLevel);
    })
};

export const selectedLevel = reactive({
    index: 0
});

export const selectedTile = reactive({
    tileId: 0,
    drawing: false,
    setTileId(tileId: number) {
        this.tileId = tileId;
    },
    setDrawing(drawing: boolean) {
        this.drawing = drawing;
    }
});

export const entityPos = reactive([
    {
        player: { x: 1, y: 1 },
        box: { x: 13, y: 13 }
    }
]);

export const setEntityPos = (newEntityPoss: {
    player: {
        x: number,
        y: number
    },
    box: {
        x: number,
        y: number
    }
}[]) => {
    for (let _ = -1; _ < entityPos.length; _++) {
        entityPos.pop();
    }
    newEntityPoss.forEach(newEntityPos => {
        entityPos.push(newEntityPos);
    })
};

export const selectedEntity = reactive({
    player: false,
    box: false
});