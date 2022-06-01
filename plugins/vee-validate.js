import { extend } from "vee-validate";
import { required, alpha, email, numeric, min, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Inputan tidak boleh kosong"
});

extend("alpha", {
  ...alpha,
  message: "Inputan harus huruf"
});

extend('email', {
  ...email,
  message: 'Format email salah...'
});

extend('numeric', {
  ...numeric,
  message: 'Inputan harus angka'
});

extend('min', {
  ...min,
  message: 'Isi minimal 4 karakter'
});

extend('max', {
  ...max,
  message: 'Isi minimal 4 karakter'
});