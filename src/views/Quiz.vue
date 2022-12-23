<template>
  <main class="container quizPage">

    <div v-if="!isHidden" class="container startQuiz">
      <h1 class="pageTitle">AnimalQuiz</h1>
      <div class="container startContainer">
        <p>Test your animal knowledge with this tricky true or false quiz!</p>
        <p v-if="!user">Attention! Since you are not logged in, your score will not be saved.</p>
        <button @click="toggle" class="buttonStart">start</button>
      </div>
    </div>

    <div v-if="isHidden" class="container questionContainer">
      <!--<Question :question="[question, imgUrl]"/>-->
      <img :src="imgUrl" class="questionImg">
      <p>{{question}}</p>


      <div class="optionsContainer">
        <button :disabled="isDisabled" :class="vero" @click="answeredTrue" type="button" class="optionButton">true</button>
        <button :disabled="isDisabled" :class="falso" @click="answeredFalse" class="optionButton">false</button>
      </div>

      <button v-if="answered" class="next" @click="nextAnimal">next</button>

      <div v-if="OpenClose" class="modal fade show" style="display:block" tabindex="-1" aria-labelledby="wrongAnswer" aria-modal="true" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Whoops!</h5>
              <button type="button" class="btn-close" @click="OpenCloseFun" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <slot>
                <p>Wrong answer.. This is your score: {{score}}</p>
              </slot>
            </div>
            <div class="modal-footer">
              <button type="button"  @click="OpenCloseFun_Toggle" :class="'btn btn-success'">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import axios from "axios";
import createQuestion from "@/features/createQuestion";
import {mapGetters} from "vuex";
export default{
  name: 'vueQuiz',
  data(){
    return {

      //toggle startButton and question
      isHidden:false,
      twoAnimals:'',
      imgUrl:'',
      answer:'',
      question:'',
      animal:'',
      isDisabled:false,
      score:0,
      vero:'',
      falso:'',

      //if the user answered correctly
      answered:null,

      //open/close the modal
      OpenClose:false
    }
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
    async setQuestion(){
      //api request of two animal from
      this.twoAnimals=await axios.get('http://localhost:8000/quiz/size/2', {
        headers:{
          'Access-Control-Allow-Origin': "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      })
          .then((response)=>{
            const animalOne = response.data[0]
            const animalTwo = response.data[1]
            console.log(response)
            return{
              animalOne,
              animalTwo
            }
          }).catch(error=>{
            return console.log(error)
          })

      //set the img
      this.imgUrl=this.twoAnimals.animalOne.img

      //set the question
      const par = Math.floor(Math.random() * 10)
      if ((this.twoAnimals.animalOne.id === this.twoAnimals.animalTwo) || (Math.floor(Math.random() * 2) % 2 === 0)) {
        this.animal= this.twoAnimals.animalOne
      }else{
        this.animal= this.twoAnimals.animalTwo
      }

      //create the question
      [this.question, this.answer]=createQuestion(this.twoAnimals.animalOne, this.animal, par)
      console.log('question: ',this.question)
      console.log('answer', this.answer)
    },
    toggle(){
      if(this.isHidden === false) {
        this.isHidden=true
        this.setQuestion()
      }
      else {
        this.isHidden=false
      }
      if(this.answered===false) {
        this.answered = null
        this.isDisabled = false
        this.vero = ""
        this.falso = ""
        this.score = 0
        this.setQuestion()
      }

    },
    answeredTrue(){
      if(this.answer===true){
        this.vero='correct'
        this.answered=true
        this.score=this.score+1
      }
      if(this.answer===false){
        this.vero='incorrect'
        this.answered=false
        this.OpenCloseFun()
      }
      console.log(this.vero)
      this.isDisabled=true
      console.log(this.score)
    },
    answeredFalse(){
      if(this.answer===false){
        this.falso='correct'
        this.answered=true
        this.score=this.score+1
      }
      if(this.answer===true){
        this.falso='incorrect'
        this.answered=false
        this.OpenCloseFun()
      }
      console.log(this.falso)
      this.isDisabled=true
    },
    nextAnimal(){
      this.answered=null
      this.isDisabled=false
      this.correctAnswer=null
      this.vero=""
      this.falso=""
      this.setQuestion()
    },
    async OpenCloseFun(){
      /*
      if(this.user && this.user.score<this.score){
        await axios.post(`https://site212224.tw.cs.unibo.it/user/username/${localStorage.getItem('username')}`,{
          score:this.score
        })
      }
      */
      this.OpenClose=!this.OpenClose;
    },
    OpenCloseFun_Toggle(){
      this.toggle()
      this.OpenCloseFun();
    }
  },
}
</script>

<style lang="scss">
.quizPage{
  color: black;
  font-size: 150%;
}
.startQuiz{
  margin: 0 auto;
  text-align:center;
  h1{
    padding-bottom: 40px;
  }
}
.optionsContainer{
  display: flex;
  justify-content: space-evenly;
}
.questionContainer{
  color:white;
  width: 70%;
  height: 90%;
  margin: auto auto;
  background-color: var(--dark-alt);
  border-radius: 20px;
  padding:40px;
  .correct{
    background-color: green;
    border:1px solid var(--primary) !important;
    font-weight:bold;
    color:white
  }
  .incorrect {
    border: 1px solid var(--primary) !important;
    font-weight: bold;
    color: white;
    background-color: red;
  }
}
.buttonStart{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  margin: 0 auto;
}
.optionButton{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  margin: 0 auto;
}
.questionImg{
  width: 100%;
  height: 80%;
  object-fit: contain;
  margin-bottom:10px;
}
.startContainer{
  width: 70%;
  height: 90%;
  margin: auto auto;
  background-color: var(--dark-alt);
  border-radius: 20px;
  padding:40px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}
.next{
  background-color: white;
  border: none;
  color: var(--dark-alt);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline;
  font-size: 125%;
  width:40%;
  border-radius: 20px;
  position:relative;
  top:-250px
}
@media (max-width: 768px) {
  .startContainer{
    width: 100%;
  }
  .questionContainer{
    width: 100%;
  }
  .buttonStart{
    width: 70%;
  }
  .optionButton{
    width: 70%;
  }
}
</style>