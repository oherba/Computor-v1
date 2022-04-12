//take the user input
const polynomial = process.argv[2];
const splited_p = polynomial.replace(/-/g, '+-').split('=');

//sqrt function 
my_sqrt = function (x)
{
  function is_close_enough(guess,x)
  {
    let diff = 0;
    diff = guess*guess - x;
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
// get reduced form
let terms_objects = [];
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
// console.log(terms_objects);
terms_objects.forEach(e => {let tmp = 0;
  if (terms[e.exp])
    tmp = terms[e.exp];                          
  terms.splice(e.exp, 1, e.coef + tmp);
  });
console.log(terms);
let degree = terms.length-1;
process.stdout.write("Reduced form: ");
terms.forEach((e,index) => { 
  if(index !== 0 && e >= 0)
    process.stdout.write('+ ');
  (e < 0) ? process.stdout.write(`- ${-e}`) : process.stdout.write(`${e}`);
  process.stdout.write(` * X^${index} `);
});
console.log('= 0');
console.log(`Polynomial degree: ${degree}`);
if(degree > 2)
  console.log("The polynomial degree is strictly greater than 2, I can't solve.");
else if (degree === 1)
{
  console.log("The solution is:");
  console.log(-terms[0]/terms[1]);
}
else if (degree === 0)
{
  if (terms[0] === 0)
    console.log("Every real number is solution to the equation");
  else
    console.log("there is no solution");
}
else
{
  //calclulate the descriminant delta=b^2-4ac
  let descriminant = 0;
  descriminant = terms[1]*terms[1] - 4 * terms[0]*terms[2];
  // console.log("descriminant is   "+ descriminant);
  if (descriminant > 0)
  {
    let sqrt_descriminant;
    sqrt_descriminant = parseFloat(my_sqrt(descriminant).toFixed(5));
    console.log("Discriminant is strictly positive, the two solutions are:");
    //calculate the 2 solutions -b-+sqrt(Discriminant)/2a
    let sol1;
    let sol2;
    sol1 = (- terms[1] - sqrt_descriminant) / (2*terms[2]);
    sol2 = (- terms[1] + sqrt_descriminant) / (2*terms[2]);
    console.log(sol1.toFixed(6));
    console.log(sol2.toFixed(6));
  }
  else if (descriminant == 0)
  {
    console.log("Discriminant is zero, the solution is:");
    console.log((-terms[1] / (2 * terms[2])));
  }
  else
  {
    console.log("Discriminant is  strictly negative , the two solutions are:");
    console.log(-terms[1]/2*terms[2]+ " + " + parseFloat(my_sqrt(- descriminant).toFixed(5)/2*terms[2]) + "*i");
    console.log(-terms[1]/2*terms[2]+ " - " + parseFloat(my_sqrt(- descriminant).toFixed(5)/2*terms[2]) + "*i");
  }
}