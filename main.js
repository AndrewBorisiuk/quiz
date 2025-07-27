let questions=document.querySelector(".qe")
let answer_items = document.querySelectorAll('.answer p')
let begining=document.querySelector(".begining")
let title=document.querySelector(".title")
let start=document.querySelector(".start")
let main=document.querySelector(".main")
function randint(min,max){
    return Math.round(Math.random() * (max - min) + min)
}
let signs = ['+','-','*','/']
function getRandomSign() {
    return signs[randint(0, 3)]
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
let prev = false
let cookies = document.cookie.split('; ')
for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0] == 'numbers_score') {
        prev = cookies[i].split('=')[1]
          title.innerHTML = prev
    }
}
class QuestionItem  {
    constructor() {
        let a = randint(1, 10)
        let b = randint(1, 10)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') { this.correct = a + b }
        else if (sign == '-') { this.correct = a - b }
        else if (sign == '*') { this.correct = a * b }
        else if (sign == '/') { this.correct = a / b }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shuffle(this.answers)
    }
    display () {
            questions.innerHTML = this.question
       
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_items[i].innerHTML = this.answers[i]
        }
    }
}
let answers_geted = 0;
let answers_correct = 0;
let current = new QuestionItem()
current.display()

for (let i = 0; i < answer_items.length; i += 1) {
    answer_items[i].addEventListener('click', function() {
        if (answer_items[i].innerHTML == current.correct) {
            console.log("Правильно")
            answers_correct = answers_correct+1
            answer_items[i].style.background = '#3aff00'
              anime({
                targets: answer_items[i],
                background: '#D5DF65',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            console.log("Неправильно")
            answer_items[i].style.background = '#ff000e'
              anime({
                targets: answer_items[i],
                background: '#D5DF65',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        answers_geted = answers_geted+1
        current = new QuestionItem()
current.display()
        }
)}
function ran_timer(){
setTimeout(function(){
   let new_cookie = `numbers_score=Минулого разу ви дали ${answers_correct} правильних відповідей із ${answers_geted}; max-age=10000000000`
        document.cookie = new_cookie 
    title.innerHTML = `Ви дали ${answers_correct} правильних відповідей із ${answers_geted}.`
    main.style.display="none"
    begining.style.display="flex"
},10000)
}
start.addEventListener("click",function(){
   main.style.display = 'flex'
   begining.style.display = 'none'
   ran_timer()
})
