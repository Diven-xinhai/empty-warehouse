export function isValidateMobile(phone: string): [boolean, string] {
  let result = true;
  let msg = "";
  var isPhone = /^1[3-9]\d{9}$/;
  if (phone) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        result = false;
      } else {
        msg = "手机号码格式不正确";
      }
    } else {
      msg = "手机号码长度不为11位";
    }
  } else {
    msg = "手机号码不能为空";
  }
  return [result, msg]
}