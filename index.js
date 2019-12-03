let response;
let result;
let score = 0;
let i = 0;
let total = 9
let answer;
let next = _ => {

    if (i === 0) {

        (_ => {
            var twoMinutes = 60 * 2,
                display = document.querySelector('#timer');
            startTimer(twoMinutes, display);
            console.log(display)
        })();
        
    }
    else if (document.querySelector('#timer').textContent == '00:00') {
        Swal.fire('Your time is  up!');
        finish()

    }

    try {
        if (i >= 1) {
            if ($('input[name="q1"]:checked').length == 0) {
                return false;
            }
        }

        setTimeout(async function () {
            response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            result = await response.json()
            result = result.results
            let question = result[i].question
            answer = result[i].correct_answer
            let wrong = result[i].incorrect_answers
            wrong.push(answer)
            var numbers = [0, 1, 2, 3];

            function shuffle(o) {
                for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            };

            var random = shuffle(numbers);


            if (i >= total) {

                document.getElementById('main').innerHTML = ` <div class="align-items-center jumbotron">
                <p class="question h3 text-white bg-dark p-3 font-weight-bold">${question}<p class="text-right font-weight-normal"> ${i}/${total} </p></p>
                
                <ul class="answers text-info h4 p-3 font-weight-bold" >
        
        <input type="radio" name="q1" value="${wrong[random[3]]}" id="q1a"><label for="q1a" class="p-2 " >${wrong[random[3]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[2]]}" id="q1b"><label for="q1b" class="p-2">${wrong[random[2]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[1]]}" id="q1c"><label for="q1c" class="p-2">${wrong[random[1]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[0]]}" id="q1d"><label for="q1d" class="p-2">${wrong[random[0]]}</label><br />
        
        </ul>
                
                <div>
                <button type="button" name="next" id="next" class="btn btn-danger btn-lg btn-block font-weight-bold " onclick="check() , finish()">finish</button>
        </div>
        </div>`

            }
            else {

                document.getElementById('main').innerHTML = ` <div class="align-items-center jumbotron">
        <p class="question h3 text-white bg-dark p-3 font-weight-bold">${question}<p class="text-right font-weight-normal"> ${i}/${total} </p></p>
        
        <ul class="answers text-info h4 p-3 font-weight-bold" >
        
        <input type="radio" name="q1" value="${wrong[random[3]]}" id="q1a"><label for="q1a" class="p-2 " >${wrong[random[3]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[2]]}" id="q1b"><label for="q1b" class="p-2">${wrong[random[2]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[1]]}" id="q1c"><label for="q1c" class="p-2">${wrong[random[1]]}</label><br />
        
        <input type="radio" name="q1" value="${wrong[random[0]]}" id="q1d"><label for="q1d" class="p-2">${wrong[random[0]]}</label><br />
        
        </ul>
        
        <div>
        <button type="button" name="next" id="next" class="btn btn-primary btn-lg btn-block font-weight-bold submit" onclick="check(), next() ">next</button>
        </div>
        </div>`

                i++;

            }
        }, 100);

        document.getElementById('main').innerHTML = `<div class="d-flex justify-content-center mt-5 "><div class=" loader"></div></div></br><p class="d-flex justify-content-center text-info">please wait...</p>`



    }

    // console.log(result)
    // for (let arr of result.results){
    // let question = arr.question
    catch (err) {
        console.log(err)
    }
}

let finish = _ => {
    let perc = (score * 100) / (total * 5);
    perc = Math.round(perc)
    if ($('input[name="q1"]:checked').length == 0) {
        return false;
    }
    if (perc >= 50) {
        document.getElementById('main').innerHTML = ` <div class="align-items-center">
        <p class="question h3 text-white bg-success p-3 font-weight-bold  text-center"><span>Passed</span></br>Your score is ${score} out of ${total * 5}
        </br>Percentage : ${perc}%<span class="ml-5 font-weight-normal"></span></p>
        `}
    else {
        document.getElementById('main').innerHTML = ` <div class="align-items-center">
            <p class="question h3 text-white bg-danger p-3 font-weight-bold  text-center"><span>Failed </span></br>Your score is ${score} out of ${total * 5}</br>
            Percentage : ${perc}<span class="ml-5 font-weight-normal"></span></p>
            `

    }
    document.getElementById('end').innerHTML = ''
}

let check = _ => {
    if ($('input[name="q1"]:checked').length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You forgot to select a option!',
            // footer: '<a href>Why do I have this issue?</a>'
        })
        return false;
    }

    // console.log(document.querySelector("input[name=q1]:checked").value)
    else if (document.querySelector("input[name=q1]:checked").value === answer) {
        score = score + 5;
    }
    // console.log(score)

}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }

    }, 1000);
}


