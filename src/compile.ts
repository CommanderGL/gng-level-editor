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

export const compile = () => {
    let compiledLevels = "";

    levels.forEach((level, index) => {
        let levelOut = levelShell;
        levelOut = levelOut.replace('$PLAYER_X', JSON.stringify(entityPos[index].player.x));
        levelOut = levelOut.replace('$PLAYER_Y', JSON.stringify(entityPos[index].player.y));
        levelOut = levelOut.replace('$BOX_X', JSON.stringify(entityPos[index].box.x));
        levelOut = levelOut.replace('$BOX_Y', JSON.stringify(entityPos[index].box.y));
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