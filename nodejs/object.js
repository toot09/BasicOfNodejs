// array
var members = ['egoing', 'k8805', 'hoya'];
var i = 0;
while(i < members.length) {
    console.log(`array loop ${members[i++]}`);
}
// Dictionary 초기화
var roles = {
    'programmer' : 'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}
// Dict 추가
roles['teacher'] = 'hasj'
// Dict value 변경
roles['programmer'] = 'ujone'

// 찍어보자
for(var key in roles) {
    console.log(`key => ${key} / value => ${roles[key]}`);
}