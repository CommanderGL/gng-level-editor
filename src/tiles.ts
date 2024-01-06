import { reactive } from "vue";

/* export const tileColors = [
    "#5c58a3",
    "#696783",
    "#3b8a3f",

];

export const tileTooltips = [
    "Air",
    "Wall",
    "Goal"
] */


export type Vector2 = {
    x: number,
    y: number
};

export type Tile = {
    color: string,
    tooltip: string,
    size: Vector2,
    offset: Vector2
};

export const tiles: Tile[] = [
    {
        color: "#5c58a3",
        tooltip: "Air",
        size: {
            x: 1,
            y: 1
        },
        offset: {
            x: 0,
            y: 0
        }
    },
    {
        color: "#696783",
        tooltip: "Wall",
        size: {
            x: 1,
            y: 1
        },
        offset: {
            x: 0,
            y: 0
        }
    },
    {
        color: "#3b8a3f",
        tooltip: "Goal",
        size: {
            x: 1,
            y: 1
        },
        offset: {
            x: 0,
            y: 0
        }
    },

    {
        color: "#696783",
        tooltip: "Half Wall - Left",
        size: {
            x: 0.5,
            y: 1
        },
        offset: {
            x: 0,
            y: 0
        }
    },
    {
        color: "#696783",
        tooltip: "Half Wall - Right",
        size: {
            x: 0.5,
            y: 1
        },
        offset: {
            x: 0.5,
            y: 0
        }
    },
    {
        color: "#696783",
        tooltip: "Half Wall - Top",
        size: {
            x: 1,
            y: 0.5
        },
        offset: {
            x: 0,
            y: 0
        }
    },
    {
        color: "#696783",
        tooltip: "Half Wall - Bottom",
        size: {
            x: 1,
            y: 0.5
        },
        offset: {
            x: 0,
            y: 0.5
        }
    }
];

export const tileDropdowns: number[][] = [
    [
        3,
        4,
        5,
        6
    ]
];

export const dropDownContainsTile = (tile: number) => {
    let contains = false;

    tileDropdowns.forEach(dropDown => contains = dropDown.includes(tile) ? true : contains);

    return contains;
};

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
    player: Vector2,
    box: Vector2
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