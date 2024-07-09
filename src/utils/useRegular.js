const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
const regDate = /(0?[1-9]|[12][0-9]|3[01])[/\-.](0?[1-9]|1[012])[ /.-]/
const emailErr = reg.test('email')
const dateErr = regDate.test('date')
