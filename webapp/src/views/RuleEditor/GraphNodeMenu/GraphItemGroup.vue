<template>
    <div class="graphItemGroup">
        <div class="graphItemGroupLabel" :style="{'background-color' : group.color}">
            {{ group.name }} 
        </div>

        <div class="graphItemGroupContent">
            <div 
                class="graphItemNode" 
                v-for="item in filterItems" 
                :key="item.id" 
                :id="'popover-target-' + group.id + '_' + item.id"
                @dragstart="onDragStart($event, item)"
                draggable 
            >
                <b-icon :icon="item.data.icon" variant="dark"></b-icon>
            </div>
            <b-popover v-for="item in filterItems" :key="group.id + '_' + item.id" :target="'popover-target-' + group.id + '_' + item.id" triggers="hover" placement="top">
                <template #title>{{ item.data.name }}</template>
                {{ item.data.description }}
            </b-popover>
        
        </div>
    </div>
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

export default {
    name: "GraphItemGroup",
    
    props : ["search", "group"],

    methods: {
        onDragStart(event, node) {
            event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
            event.dataTransfer.effectAllowed = 'move';
        }
    },

    mounted() {

    },

    computed: {
        filterItems() {
            let items = this.group.items;
            return items.filter(dataObj => {
                return dataObj.data.name.toLowerCase().includes(this.search.toLowerCase())
            });
        }
    },
    
    components: {

    }
}
</script>

<style scoped>
.graphItemGroup {
    margin: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
}

.graphItemGroupContent {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.graphItemGroupLabel {
    margin: 5px;
    background-color: lightcyan;
    text-align: center;
}

.graphItemNode{
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
    margin: 5px;
    height: 45px;
    width: 45px;

    border: 1px solid gray;
    background-color: whitesmoke;
}

.graphItemNode:hover{
    border: 2px solid gray;
    background-color: lightgray;
}

.collapseMenu {
    display: flex;
    flex-direction: row;

    justify-content: flex-start;
}
</style>
