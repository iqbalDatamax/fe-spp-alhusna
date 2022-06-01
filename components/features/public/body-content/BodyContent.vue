<template>
  <div>
    <div class="bg-gradient-to-r from-primary to-blue-400 h-40 w-full p-2">
      <div class="flex flex-row items-center text-white text-3xl ml-4 mt-3.5">
        <i :class="icon"></i>
        <h1 class="capitalize ml-4">{{title}}</h1>
      </div>
    </div>
    <div class="px-4 z-10 -mt-20">
      <div class="w-full shadow-lg p-3 rounded bg-white">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBOdy',
  props: {
    icon: {type: String, default: null},
    title: {type: String, default: 'title'}
  }
}
</script>