import Vue from 'vue'

import "vue-select/dist/vue-select.css";
import '@/node_modules/@fortawesome/fontawesome-free/css/all.css';
import '@/node_modules/vue-ads-pagination/dist/vue-ads-pagination.css'
import QInput from '~/components/supports/QInput.vue'
import QInputPrice from '~/components/supports/QInputPrice.vue'
import QSelect from '~/components/supports/QSelect'
import QTextArea from '~/components/supports/QTextArea'
import UploadImage from '~/components/supports/UploadImage'
import AlertInformation from '~/components/supports/AlertInformation'
import QLoading from '~/components/supports/QLoading'

const components = { QInput, QInputPrice, QSelect, QTextArea, UploadImage, AlertInformation, QLoading }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})