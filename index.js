let response;
let result;
let score = 0;
let i =0;
let total = 8
let next  =async _=>{
    try{
response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
result = await response.json()
result = result.results
let question = result[i].question
let answer = result[i].correct_answer
let wrong = result[i].incorrect_answers

if(i >= total){
    document.getElementById('main').innerHTML = ` <div class="align-items-center">
    <p class="question h3 text-white bg-dark p-3 font-weight-bold">${question}<p class="text-right font-weight-normal"> ${i}/${total} </p></p>
    
    <ul class="answers text-info h4 p-3 font-weight-bold">
    
    <input type="radio" checked name="q1" value="${wrong[0]}" id="q1a"><label for="q1a" class="p-2 " >${wrong[0]}</label><br />
    
        <input type="radio" name="q1" value="${answer}" id="q1b"><label for="q1b" class="p-2">${answer}</label><br />
    
        <input type="radio" name="q1" value="${wrong[1]}" id="q1c"><label for="q1c" class="p-2">${wrong[1]}</label><br />
    
        <input type="radio" name="q1" value="${wrong[2]}" id="q1d"><label for="q1d" class="p-2">${wrong[2]}</label><br />
    
    </ul>
    
    <div>
        <button type="button" name="next" id="next" class="btn btn-danger btn-lg btn-block font-weight-bold " onclick="finish()">finish</button>
    </div>
    </div>`

}
else {
document.getElementById('main').innerHTML = ` <div class="align-items-center">
<p class="question h3 text-white bg-dark p-3 font-weight-bold">${question}<p class="text-right font-weight-normal"> ${i}/${total} </p></p>

<ul class="answers text-info h4 p-3 font-weight-bold">

<input type="radio" checked name="q1" value="${wrong[0]}" id="q1a"><label for="q1a" class="p-2 " >${wrong[0]}</label><br />

    <input type="radio" name="q1" value="${answer}" id="q1b"><label for="q1b" class="p-2">${answer}</label><br />

    <input type="radio" name="q1" value="${wrong[1]}" id="q1c"><label for="q1c" class="p-2">${wrong[1]}</label><br />

    <input type="radio" name="q1" value="${wrong[2]}" id="q1d"><label for="q1d" class="p-2">${wrong[2]}</label><br />

</ul>

<div>
    <button type="button" name="next" id="next" class="btn btn-primary btn-lg btn-block font-weight-bold " onclick="next()">next</button>
</div>
</div>`

if(document.querySelector("input[name=q1]:checked").value === answer){
    score +=5;
}

i++;


}
// console.log(document.querySelector("input[name=q1]:checked").value)
// console.log(i)

}

// console.log(result)
// for (let arr of result.results){
// let question = arr.question
catch(err){
    console.log(err)
}
}

let finish = _=>{

    document.getElementById('main').innerHTML = ` <div class="align-items-center">
<p class="question h3 text-white bg-info p-3 font-weight-bold  text-center">Your score is ${score} out of ${total*5}<span class="ml-5 font-weight-normal"></span></p>
    `

}




