//take the user input
const polynomial = process.argv[2];
const splited_p = polynomial.replace(/-/g, '+-').split('=');

//sqrt function 
my_sqrt = function (x)
{
  function is_close_enough(guess,x)
  {
    console.log(guess);
    let diff = 0;
    diff = guess*guess - x;
    console.log("diff   " + diff);
    if (diff < 0)
      diff = diff * -1;
    return diff <= 0.001;
  }
  function improve(guess,x)
  {
    return (guess+ x/guess)/2;
  }
  function sqrt_iterations(guess, x)
  {
    return is_close_enough(guess,x) ? guess : sqrt_iterations(improve(guess, x), x);
  }
  return sqrt_iterations(1,x);
}
console.log(my_sqrt(9));
// get reduced form
/**let terms_objects = [];
let terms = [];
template = function (elem, signed) {
  return {
    coef: elem[0] * signed,
    exp: elem[1].split('^')[1]
  }
}
let termss_p1 = splited_p[0].split('+');
let termss_p2 = splited_p[1].split('+');
termss_p1 = termss_p1.map(x => x = x.replace(/\s/g, ''));
termss_p2 = termss_p2.map(x => x = x.replace(/\s/g, ''));
termss_p1.forEach(element => {terms_objects.push(template(element.split('*'),1))});
termss_p2.forEach(element => {terms_objects.push(template(element.split('*'),-1))});
console.log(terms_objects);
terms_objects.forEach(e => {let tmp = 0;
  if (terms[e.exp])
    tmp = terms[e.exp];                          
  terms.splice(e.exp, 1, e.coef + tmp);
  });
console.log(terms);
process.stdout.write("Reduced form: ");
terms.forEach((e,index) => { 
  if(index !== 0 && e >= 0)
    process.stdout.write('+ ');
  (e < 0) ? process.stdout.write(`- ${-e}`) : process.stdout.write(`${e}`);
  process.stdout.write(` * X^${index} `);
});
console.log('= 0');
console.log(`Polynomial degree: ${terms.length-1}`);
if(terms.length-1 > 2)
  console.log("The polynomial degree is strictly greater than 2, I can't solve.");
else
{
  //calclulate the descriminant delta=b^2-4ac
  let delta = 2;
   delta = terms[1]*terms[1] - 4 * terms[0]*terms[2];
  console.log("dddd   "+ delta);
}
// console.log("Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0");*/