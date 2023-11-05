<script lang="ts">
import styles from '../styles/Editor.module.css';
import Grid from './Grid.vue';
import LevelSelector from './LevelSelector.vue';
import { tileColors, selectedTile, selectedEntity } from '../tiles'
import { compile, save, load } from '../compile';

export default {
    data() {
        return {
            styles,
            tileColors,
            selectedTile
        };
    },
    methods: {
        onDown() {
            selectedTile.setDrawing(true);
        },
        selectEntity(entity: 'player' | 'box') {
            selectedEntity.player = false;
            selectedEntity.box = false;

            selectedEntity[entity] = true;
        },
        selectTile(tile: number) {
            selectedEntity.player = false;
            selectedEntity.box = false;
            selectedTile.setTileId(tile);
        },
        onResize() {
            const elem = this.$refs.editor as HTMLDivElement;
            const rect = elem.getBoundingClientRect();
            if (rect.y + rect.height > window.screen.height) {
                elem.style.height = "75vh";
                return;
            }
            elem.style.height = "";
        },
        compile,
        save,
        load
    },
    components: {
        Grid,
        LevelSelector
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
};
</script>
<template>
    <div :class="styles.tileSelect">
        <div style="background: #0079f1;" @click="selectEntity('player')"></div>
        <div style="background: #d3b083;" @click="selectEntity('box')"></div>
        <div v-for="tileColor in tileColors" :style="`background: ${tileColor};`" @click="selectTile(tileColors.indexOf(tileColor))"></div>
    </div>
    <div :class="styles.fileActions">
        <button @click="compile">Export</button>
        <button @click="save">Save</button>
        <button @click="load">Load</button>
        <LevelSelector />
    </div>
    <div :class="styles.editor" @mousedown="onDown" @mouseup="selectedTile.setDrawing(false)" @mouseleave="selectedTile.setDrawing(false)" ref="editor">
        <Grid ref="grid" />
    </div>
</template>