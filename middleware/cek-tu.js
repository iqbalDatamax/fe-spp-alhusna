export default function ({ store, redirect }) {
  const peran = store?.state?.auth?.user?.peran
  if (['admin', 'super-admin'].includes(!peran)) {
    return redirect('/home-siswa')
  }
}