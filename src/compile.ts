import levelShell from './shells/levelShell.hpp?raw';
import levelsShell from './shells/levelsShell.hpp?raw';

import { entityPos, levels } from './tiles';

export const downloadFile = (filename: string, content: string) => {
    const tmpLink = document.createElement('a');

    tmpLink.href = `data:text/x-h;charset=utf-8,${encodeURIComponent(content)}`;
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

    downloadFile('levels.hpp', levelsOut);
};

export const exportLevels = () => {
    compile();
};