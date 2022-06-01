<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr v-if="totalCheck > 0" class="bg-gray-300">
          <th v-if="withCheck" scope="col" class="text-left px-4 py-2.5 text-sm text-black">
            <input v-model="checkAll" type="checkbox" @change="changeCheckboxAll">
          </th>
          <th :colspan="(columns.length - topAction.length)" class="py-2.5 text-left text-sm text-black">
            {{ totalCheck }} item terpilih
          </th>
          <th v-for="ta in topAction" :key="ta.id" class="text-center-4 py-2.5 text-sm">
            <button class="font-medium text-sm text-white rounded py-1.5 px-3" :class="ta.color" @click="$emit('clickActionTop', ta.action, dataCheck)">
              {{ ta.text }}
            </button>
          </th>
        </tr>
        <tr v-if="totalCheck == 0">
          <th v-if="withCheck" class="text-left px-4 py-3 text-sm text-black-light">
            <input v-model="checkAll" type="checkbox" @change="changeCheckboxAll">
          </th>
          <th v-if="withNomor" scope="col" class="text-left px-4 py-2.5 text-sm text-black">
            No
          </th>
          <th v-for="col in columns" :key="col.key" class="py-3 px-2.5 text-sm text-black" :class="col.align === 'center' ? 'text-center':'text-left'" >
            {{ col.text }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, index) in contents" :key="index">
          <td v-if="withCheck" class="px-4 py-2">
            <div class="text-black">
              <input type="checkbox" :checked="row.isChecked" :disabled="row.isDisable" @change="changeCheckbox(row.id)">
            </div>
          </td>
          <td v-if="withNomor" class="px-4 py-2">
            <div class="text-black text-sm">{{index+1}}</div>
          </td>
          <td v-for="(col, indexColumn) in columns" :key="indexColumn" class="py-2 px-2.5">
            <div class="text-black text-sm capitalize" :class="col.align === 'center' ? 'text-center':'text-left'">
              {{row[col.key]}}
            </div>
            <div v-if="col.key === 'action'" class="text-center">
              <button v-for="act in actionContent" :key="act.id" class="text-xs py-1 px-2 text-white rounded mr-1" :disabled="row.isDisable" :class="row.isDisable ? 'btn-disable' : act.kls" @click="$emit('clickButton', act.id, row.id, row)">
                <i :class="act.icon"></i> {{act.btnText}}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SimpleTable',
  props: {
    withCheck: { type: Boolean, default: false },
    withNomor: { type: Boolean, default: false },
    columns: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    actionContent: { type: Array, default: () => [] },
    topAction: { type: Array, default: () => [] },
  },
  data() {
    return {
      contents: [] as any,
      checkAll: false,
      dataCheck: [] as any
    }
  },
  computed: {
    totalCheck(): number {
      const _this = this as any
      const total = _this?.contents?.filter((item: any) => item.isChecked).length
      if (total === 0) {
        _this.checkAll = false
      }
      return total || 0
    }
  },
  watch: {
    rows() {
      const _this = this as any
      if (Array.isArray(_this?.rows) && _this?.rows?.length > 0) {
        _this.contents = _this.rows
      }
    }
  },
  mounted() {
    const _this = this as any
    if (Array.isArray(_this?.rows) && _this?.rows?.length > 0) {
      _this.contents = _this.rows
    }
  },
  methods: {
    changeCheckboxAll() {
      const _this = this as any
      _this.dataCheck = []
      _this?.contents?.forEach((item: any) => {

        if(item.isDisable) {
          item.isChecked = false
          return
        }
        
        if(_this.checkAll) {
          item.isChecked = _this.checkAll
          _this.dataCheck.push(item)
        } else {
          item.isChecked = _this.checkAll
          _this.dataCheck = []
        }
      });
    },
    changeCheckbox(id: any) {
      const _this = this as any
      const itemIndex = _this?.contents?.findIndex((item: any) => item.id === id);
      if (itemIndex > -1) {
        const currentItem = _this?.contents[itemIndex]
        currentItem.isChecked = !currentItem.isChecked
        this.deleteArr(_this.dataCheck, currentItem)
      }
    },
    deleteArr(arr: any, item: any) {
      let i = arr.length;
      while (i--)
        if (arr[i] === item) {
          arr.splice(i, 1);
          return
        }
      arr.push(item)
    },
    showAction(id: any) {
      const _this = this as any
      _this?.contents?.forEach(function (value: any) {
        if (value.id !== id) {
          value.showAction = false
        }
      });

      const itemIndex = _this?.contents?.findIndex((item: any) => item.id === id);
      if (itemIndex > -1) {
        const currentItem = _this?.contents[itemIndex]
        currentItem.showAction = !currentItem.showAction
      }
    }
  }
}
</script>
