<script lang="ts">
import styles from '../styles/TileDropdown.module.css';
import { PropType } from 'vue';
import { TILE_SIZE } from '../compile';
import { tiles, selectedEntity, selectedTile, ColoredTile, TexturedTile } from '../tiles';

export default {
    props: {
        tileDropdown: {
            type: Object as PropType<number[]>,
            required: true
        }
    },
    data() {
        return {
            active: false,
            styles,
            TILE_SIZE,
            parentHeight: 0,
            tiles
        }
    },
    methods: {
        tick() {
            this.parentHeight = (this.$el.parentElement as HTMLElement).clientHeight - 32;
            
            window.requestAnimationFrame(this.tick);
        },

        getOffsetLeft() {
            return this.$refs.thumbnail != null ? (this.$refs.thumbnail as HTMLDivElement).offsetLeft : 0;
        },

        selectTile(tile: number) {
            selectedEntity.player = false;
            selectedEntity.box = false;
            selectedTile.setTileId(tile);
        }
    },
    mounted() {
        window.requestAnimationFrame(this.tick);
    },
};
</script>
<template>
    <div class="vertical-divider" />
    <div
        v-if="(tiles[tileDropdown[0]] as ColoredTile).color != undefined"
        @click="active = !active"
        :style="{
            width: `${tiles[tileDropdown[0]].size.x * parentHeight}px`,
            height: `${tiles[tileDropdown[0]].size.y * parentHeight}px`,
            background: (tiles[tileDropdown[0]] as ColoredTile).color,
            marginLeft: `${tiles[tileDropdown[0]].offset.x * parentHeight}px`,
            marginTop: `${tiles[tileDropdown[0]].offset.y * parentHeight}px`,
            aspectRatio: `${tiles[tileDropdown[0]].size.x * parentHeight} / ${tiles[tileDropdown[0]].size.y * parentHeight}`,
            cursor: 'pointer'
        }"
        ref="thumbnail"
    />
    <img
        v-else
        @click="active = !active"
        :src="`/gng-level-editor/textures/${(tiles[tileDropdown[0]] as TexturedTile).texture}.png`"
        :style="{
            width: `${tiles[tileDropdown[0]].size.x * parentHeight}px`,
            height: `${tiles[tileDropdown[0]].size.y * parentHeight}px`,
            marginLeft: `${tiles[tileDropdown[0]].offset.x * parentHeight}px`,
            marginTop: `${tiles[tileDropdown[0]].offset.y * parentHeight}px`,
            aspectRatio: `${tiles[tileDropdown[0]].size.x * parentHeight} / ${tiles[tileDropdown[0]].size.y * parentHeight}`,
            cursor: 'pointer'
        }"
        :class="styles.img"
        ref="thumbnail"
    />
    <font-awesome-icon
        icon="fa-solid fa-caret-down"
        :class="styles.caret"
        @click="active = !active"
    />
    <dialog
        :open="active"
        :class="styles.dropdown"
        :style="{
            left: `${getOffsetLeft()}px`,
            top: `calc(${parentHeight}px + 2rem)`
        }"
    >
        <template v-for="item, index in tileDropdown">
            <div
                v-if="(tiles[item] as ColoredTile).color != undefined"
                :class="styles.img"
                :style="{
                    width: `${tiles[item].size.x * parentHeight}px`,
                    height: `${tiles[item].size.y * parentHeight}px`,
                    background: (tiles[item] as ColoredTile).color,
                    marginLeft: `${tiles[item].offset.x * parentHeight}px`,
                    marginTop: index == 0 ? `${tiles[item].offset.y * parentHeight}px` : `calc(${tiles[item].offset.y * parentHeight}px + 0.5rem)`,
                    aspectRatio: `${tiles[item].size.x * parentHeight} / ${tiles[item].size.y * parentHeight}`
                }"
                :title="tiles[item].tooltip"
                @click="selectTile(item)"
            />
            <img
                v-else
                :class="styles.img"
                :src="`/gng-level-editor/textures/${(tiles[item] as TexturedTile).texture}.png`"
                :style="{
                    width: `${tiles[item].size.x * parentHeight}px`,
                    height: `${tiles[item].size.y * parentHeight}px`,
                    marginLeft: `${tiles[item].offset.x * parentHeight}px`,
                    marginTop: index == 0 ? `${tiles[item].offset.y * parentHeight}px` : `calc(${tiles[item].offset.y * parentHeight}px + 0.5rem)`,
                    aspectRatio: `${tiles[item].size.x * parentHeight} / ${tiles[item].size.y * parentHeight}`
                }"
                :title="tiles[item].tooltip"
                @click="selectTile(item)"
            />
            <div
                v-if="index != tileDropdown.length - 1"
                class="horizontal-divider"
                :style="{
                    marginTop: `calc(${TILE_SIZE - tiles[item].offset.y}px + 0.5rem)`
                }"
            />
        </template>
    </dialog>
</template>
