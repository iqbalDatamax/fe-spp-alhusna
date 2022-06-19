export default function ({ store, redirect }) {
  if (store?.state?.auth?.user?.peran !== 'super-admin') {
    return redirect('/')
  }
}