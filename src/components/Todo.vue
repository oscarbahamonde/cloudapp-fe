<template>
<div v-if="todos.length">
<Icon icon="mdi-delete" @click="todos=[]" />
</div>
<input type="text" v-model="todo" @keyup.enter="addTodo" />

<ul>
  <li v-for="todo in todos" m-4 bg-teal-500 text-white w-64 p-4 rounded shadow-gray-500 shadow-md >
    <Icon text-xs icon="mdi-delete" @click="removeTodo(todo)" />
    <div><h1>{{ todo.text }}</h1>
    <div row>
    <div v-if="!todo.date">
    <input type="date" v-model="todo.dueDate" @keyup.enter="todo.dueDate = $event.target.value" :class="todo.dueDate ? 'hidden' : 'bg-white'" />
    </div>
    <span>{{ todo.dueDate }}</span>
    <Icon v-if="todo.dueDate" text-xs mx-1 icon="mdi-delete" @click="todo.dueDate=null" />
    </div>
    </div>
    </li>
</ul>


</template>
<style>
input {
    @apply bg-gray-200;
    @apply border-2 border-teal-500 rounded-lg m-4;
}
</style>
<script setup lang="ts">

    const todos = ref([])
    const todo = ref('')

    const addTodo = () => {
        todos.value.push({
            text: todo.value
        })
        todo.value = ''
    }


    const removeTodo = (todo) => {
        todos.value = todos.value.filter(t => t !== todo)
    }


</script>