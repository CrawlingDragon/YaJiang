// 获取url的特定参数的值
export function getUrlQuery(key: string) {
  const query = window.location.search.substring(1);
  const queryArr = query.split('&');
  for (let i = 0; i < queryArr.length; i++) {
    const r = queryArr[i].split('=');
    if (r[0] === key) {
      return r[1];
    }
  }
  return false;
}
// 申请会员的身份证验证
export function isCardNo(num: any) {
  num = num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    return false;
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  var len, re;
  len = num.length;
  var bCorrectDay;
  var arrSplit;
  var dtmBirth;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    arrSplit = num.match(re);

    //检查生日日期是否正确
    dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);

    bCorrectDay =
      dtmBirth.getYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4]);
    if (!bCorrectDay) {
      return false;
    } else {
      //将15位身份证转成18位
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        i;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      num += arrCh[nTemp % 11];
      return true;
    }
  } else if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    arrSplit = num.match(re);

    //检查生日日期是否正确
    var xx = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    bCorrectDay =
      xx.getFullYear() == Number(arrSplit[2]) &&
      xx.getMonth() + 1 == Number(arrSplit[3]) &&
      xx.getDate() == Number(arrSplit[4]);
    if (!bCorrectDay) {
      return false;
    } else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum;
      arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      nTemp = 0;

      for (var x = 0; x < 17; x++) {
        nTemp += num.substr(x, 1) * arrInt[x];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        return false;
      }
      return true;
    }
  }
  return false;
}
export function formatDate(date: any) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return year + '-' + month + '-' + day;
}

//比较时间的大小
export function nextTimeIsBig(d1: any, d2: any) {
  let t1 = d1.getTime();
  let t2 = d2.getTime();
  if (t1 > t2) {
    // console.log('true', true);
    return true;
  } else {
    return false;
  }
}

// 当前时间往前一个月
export function isAgoOneMonth() {
  let Today = new Date();
  let beforeMonth = new Date(Today.getFullYear(), Today.getMonth() - 1, Today.getDate());
  console.log('beforeMonth', beforeMonth);
  return beforeMonth;
}
