const cmp = ['h-found', 'h-video', 'h-mine', 'h-cloud']
const gotCmp = () => {
  let obj = {}

  cmp.forEach(item => {
    obj = {
      ...obj,
      [item]: require('@/components/' + item).default
    }
  })

  return obj
}

export default gotCmp()
