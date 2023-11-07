<script lang="ts">
import styles from '../styles/LevelSelector.module.css';
import { entityPos, levels, selectedEntity, selectedLevel } from '../tiles';

export default {
    data() {
        return {
            styles,
            selectedLevel
        };
    },
    methods: {
        setLevel(level: number) {
            if (level < 0 || level > levels.length - 1) return;

            selectedLevel.index = level;

            // Update Level
            selectedEntity.player = false;
            selectedEntity.box = false;
            (this.$parent?.$refs.grid as any).$refs.tile.forEach((tile: any, index: number) => {
                tile.updateId(levels[selectedLevel.index][index]);
            });
        },
        onLevelChange(e: Event) {
            const input = e.target as HTMLInputElement;

            if (input.valueAsNumber < 0 || input.valueAsNumber > levels.length - 1) input.valueAsNumber = selectedLevel.index;
            this.setLevel(input.valueAsNumber);
        },
        newLevel() {
            levels.push(new Array(15 * 15).fill(0));
            entityPos.push({
                player: {
                    x: 1,
                    y: 1
                },
                box: {
                    x: 13,
                    y: 13
                }
            });

            this.setLevel(levels.length - 1);
        },
        removeLevel() {
            if (!window.confirm("Are you sure you want to remove this level?"))
                return;

            if (levels.length <= 1) {
                levels[0] = new Array(15 * 15).fill(0);
                entityPos[0] = {
                    player: {
                        x: 1,
                        y: 1
                    },
                    box: {
                        x: 13,
                        y: 13
                    }
                };

                // Update Level
                selectedEntity.player = false;
                selectedEntity.box = false;
                (this.$parent?.$refs.grid as any).$refs.tile.forEach((tile: any, index: number) => {
                    tile.updateId(levels[selectedLevel.index][index]);
                });
                
                return;
            }

            levels.splice(selectedLevel.index, 1);
            entityPos.splice(selectedLevel.index, 1);

            this.setLevel(selectedLevel.index - 1);
        }
    }
};
</script>
<template>
    <div :class="styles.levelSelector">
        <button @click="newLevel" title="Create a new level.">New Level</button>
        <button @click="removeLevel" title="Remove the current level.">Remove Level</button>
        <div class="divider" />
        <button :class="styles.btn" @click="setLevel(selectedLevel.index - 1)" title="Switch to the previous level.">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </button>
        <input
            type="number"
            :value="selectedLevel.index"
            :class="styles.in"
            @change="onLevelChange"
            title="The current selected level."
        />
        <button :class="styles.btn" @click="setLevel(selectedLevel.index + 1)" title="Switch to the next level.">
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </button>
    </div>
</template>