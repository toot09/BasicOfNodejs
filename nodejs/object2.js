
// 함수 정의 및 호출
function f1() {
    console.log("함수1");
}
f1();

// 함수 변수화 및 호출
var f = function(){
    console.log("함수2");
}
f();

// 함수 배열화 및 호출
var a = [f];
a[0]();

// 함수 Dictionary화 및 호출
var o = {
    func:f
}
o.func();