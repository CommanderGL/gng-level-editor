<script lang="ts">
import styles from '../styles/LevelSelector.module.css';
import { levels, selectedEntity, selectedLevel } from '../tiles';

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

            selectedEntity.player = false;
            selectedEntity.box = false;
            (this.$parent?.$refs.grid as any).$refs.tile.forEach((tile: any, index: number) => {
                tile.updateId(levels[selectedLevel.index][index]);
            });
        },
        onLevelChange(e: Event) {
            this.setLevel((e.target as HTMLInputElement).valueAsNumber);
        }
    }
};
</script>
<template>
    <div :class="styles.levelSelector">
        <button :class="styles.btn" @click="setLevel(selectedLevel.index - 1)">
            <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
        <input type="number" :value="selectedLevel.index" :class="styles.in" @change="onLevelChange" />
        <button :class="styles.btn" @click="setLevel(selectedLevel.index + 1)">
            <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
    </div>
</template>