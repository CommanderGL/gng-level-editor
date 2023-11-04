#include <array>
#include "gameobjects/tiles/base/tileGrid.hpp"
#include "utils.h"

extern void reset();

extern const int SCREEN_WIDTH;
extern const int SCREEN_HEIGHT;
extern const float TILE_SIZE;
extern const int SCREEN_START_X;
extern const int SCREEN_END_X;

#ifndef LEVELS_HEADER_DEFINED
#define LEVELS_HEADER_DEFINED

class Level {
    public:
        TileGrid* tileGrid;
        Vector2 playerPos;
        Vector2 boxPos;

        Level(Vector2 defaultPlayerPos, Vector2 defaultBoxPos, std::array<int, 255> tiles) {
            playerPos = defaultPlayerPos;
            boxPos = defaultBoxPos;
            tileGrid = new TileGrid(tiles);
        }
};

Level* levels[]={$LEVELS};

int currentLevelIndex = 0;
Level* currentLevel = levels[currentLevelIndex];

void setLevel(int levelIndex) {
    currentLevelIndex = levelIndex;
    currentLevel = levels[levelIndex];
    reset();
}

void nextLevel() {
    setLevel(currentLevelIndex + 1);
}
#endif