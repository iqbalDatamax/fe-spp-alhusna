<template>
  <div>
    <modal name="modalFile" :width="480" height="auto" :scrollable="true">
      <div class="p-4">
        <div class="flex justify-between border-b pb-3 mb-3">
          <h3 class="text-black font-semibold text-h4">Pilih File</h3>
          <i class="fas fa-times cursor-pointer" @click="handleClickModal('close')"></i>
        </div>

        <div class="mt-3">
          <label v-if="!file.name" v-cloak class="cursor-pointer border-2 border-dashed flex flex-col items-center justify-center rounded-lg h-32" @dragover.prevent="onUploadDragoverEvent($event)" @drop.prevent="onUploadDropEvent($event)">
            <p class="text-sm text-center text-blk font-semibold">Drag & Drop Untuk Upload</p>
            <div class=" text-center cursor-pointer group">
              <p class="text-primary text-sm">atau klik untuk mencari file</p>
            </div>
            <input :key="keyFile" ref="file" type="file" accept=".xlsx, .xls" class="hidden" @change="handleFileUpload()" />
          </label>

          <div v-if="file.name" class="bg-white shadow overflow-hidden border border-gray-300 my-2 rounded-md">
            <div class="px-4 py-1">
              <div class="flex items-center justify-between">
                <div class="text-sm text-black font-semibold truncate">
                  {{file.name}}
                </div>
                <div class="border bg-red-200 rounded-full text-xs" @click="removeFile()">
                  <i class="fas fa-times cursor-pointer text-red-700 px-1 pt-0.5"></i>
                </div>
              </div>
              <!-- progress bar -->
              <div class="mt-2 h-1 relative rounded-full overflow-hidden">
                <div class="w-full h-full bg-gray-200 absolute"></div>
                <div class="h-full bg-primary relative w-0" :style="{width: `${percentage}%`}"></div>
              </div>
              <p class="text-xs mt-2">{{percentage}}% selesai</p>
            </div>
          </div>
        </div>

        <div class="flex my-3 border-t pt-3 justify-end gap-3">
          <button class="btn-secondary" @click="handleClickModal('close')"> Cancel </button>
          <button class="w-2/6" :class="!file.name ? 'btn-disable': 'btn-primary'" :disabled="!file.name" @click="handleClickModal('submit')"> Submit </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      pageX: 0,
      pageY: 0,
      uploadDragoverTracking: false,
      uploadDragoverEvent: false,
      percentage: 100,
      keyFile: 'xxxyyyzzz',
      file: {} as any
    }
  },
  methods: {
    handleClickModal(menu:any) {
      const _this = this as any
      if(menu === 'close') {
        _this.$modal.hide('modalFile')
      } else if (menu === 'submit') {
        _this.$emit('clickModal', 'file', this.file)
      }
    },
    handleFileUpload() {
      const rand = (Math.random() + 1).toString(36).substring(7);
      const _this = this as any
      this.keyFile = rand
      const uploadFiles = _this.$refs.file.files;
      if (!uploadFiles) return;
      this.file = uploadFiles[0]
    },
    onUploadDragoverEvent(e: any) {
      this.uploadDragoverEvent = true;
      this.uploadDragoverTracking = true;
      this.pageX = e.pageX;
      this.pageY = e.pageY;
    },
    onUploadDropEvent(e: any) {
      this.uploadDragoverEvent = false;
      this.uploadDragoverTracking = false;
      this.pageX = 0;
      this.pageY = 0;
      this.droppedFiles(e)
    },
    droppedFiles(e: any) {
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      this.file = droppedFiles[0]
    },
    droppedFileValidator() {
      return false;
    },
    removeFile() {
      this.file = {}
    }
  }
})
</script> 