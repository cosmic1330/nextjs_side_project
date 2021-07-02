var exec = require('child_process').exec;

//先發第一個環節碼100，等待返回正確資料再進行傳送下一個碼
execCmd();

//該方法用於命令列執行python命令 類似於:  python py_test.py arg1
//這樣在python中就可以接受傳遞過去的引數
function execCmd() {
    exec('python index2.py', function (error, result, res) {
        console.log(result)
    });
}