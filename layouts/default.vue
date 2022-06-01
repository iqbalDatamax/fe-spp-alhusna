<template>
  <div class="flex bg-gray-100">
    <side-bar v-if="toggleSide" />
    <nav-bar @clickNavBar="handleClick" />
    <div class="mt-16 w-full h-full">
      <Nuxt />
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutDefault',
  components: {
    SideBar: () => import('@/components/features/public/sidebar/SideBar.vue'),
    NavBar: () => import('@/components/features/public/navbar/NavBar.vue')
  },
  data() {
    return {
      toggleSide: true
    }
  },
  async mounted() {

  },
  methods: {
    handleClick() {
      this.toggleSide = !this.toggleSide
    }
  }
};
</script>

