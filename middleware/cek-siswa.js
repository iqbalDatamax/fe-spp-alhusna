export default function ({ store, redirect }) {
  if (store?.state?.auth?.user?.peran !== 'siswa') {
    return redirect('/')
  }
}