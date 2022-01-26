export const getAttrKeys = function (attrs) {
  let dataAttr = {}
  for (let i = 0; i < attrs.length; i++) {
      let item = attrs[i]
      let temp = {
        key: item.name,
        value: item.value
      }
      dataAttr[temp.key] = temp.value
  }
  return dataAttr
}

let fixEvent = function (e) {
  if (!e.target) {
    e.target = e.srcElement
    e.pageX = e.x
    e.pageY = e.y
  }
  if (/mouseover/i.test(e.type) && !e.relatedTarget) {
    e.relatedTarget = e.fromElement
  } else if (/mouseout/i.test(e.type) && !e.relatedTarget) {
    e.relatedTarget = e.toElement
  }
  return e
}

export const eventAgent = (evt, func) => {
  const evt1 = fixEvent(evt)
  const actEl = evt1.currentTarget
  let el = evt1.target, actionType, isFind, attr
  while (el && el !== actEl) {
    actionType = el.getAttribute('event-agent') || ''
    actionType = actionType.trim().toLowerCase().split(',')
    if (actionType.indexOf(evt1.type.toLowerCase()) !== -1) {
      attr = getAttrKeys(el.attributes)
      isFind = true
      break
    }
    el = el.parentNode
  }
  isFind && func && func(el, attr)
}