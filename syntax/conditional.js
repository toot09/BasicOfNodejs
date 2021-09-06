//console.log(process.argv[3]);
pa = process.argv;
var input1 = pa[2];
var input2 = pa[3];

if(input1%2 == 0) console.log("짝수임");
if(input1%2 == 1) console.log("홀수임");