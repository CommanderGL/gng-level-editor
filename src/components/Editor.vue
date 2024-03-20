<script lang="ts">
import styles from '../styles/Editor.module.css';
import Grid from './Grid.vue';
import LevelSelector from './LevelSelector.vue';
import { tiles, selectedTile, selectedEntity, tileDropdowns, dropDownContainsTile, ColoredTile, TexturedTile } from '../tiles'
import { compile, save, load } from '../compile';
import TileDropdown from './TileDropdown.vue';

export default {
    data() {
        return {
            styles,
            tiles,
            selectedTile,
            tileDropdowns
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
        load,
        dropDownContainsTile
    },
    components: {
        Grid,
        LevelSelector,
        TileDropdown
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
};
</script>
<template>
    <div :class="styles.tileSelect">
        <div style="background: #0079f1;" @click="selectEntity('player')" title="Player" />
        <div class="vertical-divider" />
        <div style="background: #d3b083;" @click="selectEntity('box')" title="Box" />
        <template v-for="tile, index in tiles">
            <template v-if="!dropDownContainsTile(index)">
                <div class="vertical-divider" />
                <div>
                    <div
                        :style="{
                            background: (tile as ColoredTile).color != undefined ? (tile as ColoredTile).color : `url(/gng-level-editor/textures/${(tile as TexturedTile).texture}.png)`,
                            backgroundSize: 'cover',
                            aspectRatio: `${tile.size.x} / ${tile.size.y}`,
                            height: `${tile.size.y * 100}%`,
                            left: `calc(${tile.offset.x} * 6rem)`,
                            top: `calc(${tile.offset.y} * 6rem)`
                        }"
                        @click="selectTile(index)"
                        :title="tile.tooltip"
                    />
                </div>
            </template>
        </template>
        
        <TileDropdown v-for="tileDropdown in tileDropdowns" :tile-dropdown="tileDropdown" />
    </div>
    <div :class="styles.fileActions">
        <button @click="compile" title="Export to hpp file.">Export</button>
        <button @click="save" title="Save to json file.">Save</button>
        <button @click="load" title="Load previously saved json file.">Load</button>
        <div class="vertical-divider" />
        <LevelSelector />
    </div>
    <div :class="styles.editor" @mousedown="onDown" @mouseup="selectedTile.setDrawing(false)" @mouseleave="selectedTile.setDrawing(false)" ref="editor">
        <Grid ref="grid" />
    </div>
</template>
