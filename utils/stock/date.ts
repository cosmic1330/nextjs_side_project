export function checkDate():void{
    var day1 = new Date();
day1.setTime(day1.getTime()-24*60*60*1000);
    let week = DateFormate("yyyy-M-d h:m:s.S",day1);
    // if(week<6){
    //     // 比九點早
    //     // 週一且比九點早
    //     // 正常處理
    // }else{
    //     // 超過天數
    //     // 
    // }
    console.log(week);
    
}
checkDate()

export function DateFormate(fmt, date):string{
    var o = {
        "M+": date.getMonth() + 1<10? '0'+(date.getMonth() + 1):date.getMonth(), //月份
        "d+": date.getDate()<10?'0'+date.getDate():date.getDate(), //日
        "h+": date.getHours()<10?'0'+date.getHours():date.getHours(), //小时
        "m+": date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(), //分
        "s+": date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}