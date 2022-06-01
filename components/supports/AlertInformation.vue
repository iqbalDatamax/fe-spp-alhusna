<template>
  <div>
    <modal name="alertModal" height="auto" :width="350">
      <div class="flex items-center justify-center mt-6">
        <div v-if="type === 'success'" class="svg-box">
          <svg class="circular green-stroke">
            <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10" />
          </svg>
          <svg class="checkmark green-stroke">
            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
              <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53" />
            </g>
          </svg>
        </div>

        <div v-else-if="type === 'error'" class="svg-box">
          <svg class="circular red-stroke">
            <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10" />
          </svg>
          <svg class="cross red-stroke">
            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
              <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none" />
            </g>
            <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
              <path class="second-line" d="M634.087,300.805L673.361,261.53" />
            </g>
          </svg>
        </div>

        <div v-else-if="type === 'warning'" class="svg-box">
          <svg class="circular yellow-stroke">
            <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10" />
          </svg>
          <svg class="alert-sign yellow-stroke">
            <g transform="matrix(1,0,0,1,-615.516,-257.346)">
              <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                <path class="line" d="M634.087,300.805L673.361,261.53" fill="none" />
              </g>
              <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                <circle class="dot" cx="621.52" cy="316.126" r="1.318" />
              </g>
            </g>
          </svg>
        </div>

        <div v-else class="">
          <svg class="h-28 w-28 text-blue-400 animate-pulse" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
          </svg>
        </div>
      </div>
      <!-- title and text -->
      <div class="text-blk px-4">
        <p v-if="title" class="font-bold text-center text-lg mx-2 capitalize">{{title}}</p>
        <p v-if="text" class="text-center text-sm mx-2 mt-2 capitalize">{{text}}</p>
        <div v-if="type === 'confirm'" class="flex justify-between gap-2 my-5">
          <button class="w-full px-4 py-2 text-white text-sm bg-danger outline-none rounded" @click="hide">Tidak</button>
          <button class="w-full px-4 py-2 text-white text-sm bg-primary outline-none rounded" @click="$emit('clickConfirm', id, act)">Oke</button>
        </div>
        <div v-else class="flex justify-center my-5">
          <button class="w-1/2 px-4 py-2 text-grn border border-grn text-sm bg-white outline-none rounded" @click="hide">OK</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: { type: String, default: 'success', validator: (item) => ['success', 'error', 'warning', 'confirm'].includes(item) },
    title: { type: String, default: null },
    text: { type: String, default: null },
    id: { type: [String, Number], default: null },
    act: { type: String, default: null },
  },
  methods: {
    hide() {
      const _this = this as any
      _this.$modal.hide('alertModal')
    },
  }
})
</script> 