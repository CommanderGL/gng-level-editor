import { app } from './main';
import levelShell from './shells/levelShell.hpp?raw';
import levelsShell from './shells/levelsShell.hpp?raw';

import { entityPos, levels, selectedEntity, selectedLevel, setEntityPos, setLevels } from './tiles';

export const downloadFile = (filename: string, content: string, mime: string) => {
    const tmpLink = document.createElement('a');

    tmpLink.href = `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
    tmpLink.download = filename;
    tmpLink.hidden = true;

    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
};

const SCREEN_START_X = 187;
const TILE_SIZE = 32;

export const compile = () => {
    let compiledLevels = "";

    levels.forEach((level, index) => {
        let levelOut = levelShell;
        levelOut = levelOut.replace('$PLAYER_X', JSON.stringify(entityPos[index].player.x * TILE_SIZE + SCREEN_START_X));
        levelOut = levelOut.replace('$PLAYER_Y', JSON.stringify(entityPos[index].player.y * TILE_SIZE));
        levelOut = levelOut.replace('$BOX_X', JSON.stringify(entityPos[index].box.x * TILE_SIZE + SCREEN_START_X));
        levelOut = levelOut.replace('$BOX_Y', JSON.stringify(entityPos[index].box.y * TILE_SIZE));
        levelOut = levelOut.replace('$LEVEL_DATA', level.toString());

        compiledLevels += levelOut;
        if (index != levels.length - 1) compiledLevels += ',';
    });

    let levelsOut = levelsShell;
    levelsOut = levelsOut.replace('$LEVELS', compiledLevels);

    downloadFile('levels.hpp', levelsOut, 'text/x-h');
};

export const save = () => {
    const savedData = {
        levels,
        entityPos
    };

    downloadFile('levels.json', JSON.stringify(savedData), 'application/json');
};

type LoadedType = {
    levels: number[][],
    entityPos: {
        player: {
            x: number,
            y: number
        },
        box: {
            x: number,
            y: number
        }
    }[]
};

export const load = () => {
    const tmpInput = document.createElement('input');
    tmpInput.type = 'file';
    tmpInput.hidden = true;

    document.body.appendChild(tmpInput);
    tmpInput.click();
    document.body.removeChild(tmpInput);

    tmpInput.addEventListener('change', () => {
        const reader = new FileReader();
        reader.addEventListener('load', e => {
            const loaded: LoadedType = JSON.parse(e.target?.result as string);

            setLevels(loaded.levels);
            setEntityPos(loaded.entityPos);

            selectedLevel.index = 0;
            selectedEntity.player = false;
            selectedEntity.box = false;
            (app.$refs.editor as any).$refs.grid.$refs.tile.forEach((tile: any, index: number) => {
                tile.updateId(levels[selectedLevel.index][index]);
            });
        });
        reader.readAsText((tmpInput.files as FileList)[0]);
    });
};