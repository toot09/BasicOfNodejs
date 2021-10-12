var members = ['egoing', 'k8805', 'hoya'];
var i = 0;
while(i < members.length) {
    console.log(`array loop ${members[i++]}`);
}

var roles = {
    'programmer' : 'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}

for(var key in roles) {
    console.log(`key => ${key} / value => ${roles[key]}`);
}