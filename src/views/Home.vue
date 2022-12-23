<template>
  <main class="homePage">
    <!--<h3 v-if="user">hi, {{ user.username }}</h3>-->

    <div class="row">
      <div class="col-md-4">
        <form class="form-signin" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Your pet name" />
          </div>
          <div class="form-group" style="margin:0.5rem 0">
            <label>Animal Type</label>
            <select class="from-control" id="inlineFormCustomSelect" v-model="animalType">
              <option selected>Choose...</option>
              <option value="1">Mammal</option>
              <option value="2">Bird</option>
              <option value="3">Reptile</option>
              <option value="4">Amphibian</option>
              <option value="5">Fish</option>
              <option value="6">Insect</option>
            </select>
          </div>
          <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Sex</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked v-model="sex">
                  <label class="form-check-label" for="gridRadios1" style="color:var(--light)">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" v-model="sex">
                  <label class="form-check-label" for="gridRadios2"  style="color:var(--light)">
                    Female
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" v-model="sex">
                  <label class="form-check-label" for="gridRadios3"  style="color:var(--light)">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="form-group">
            <label>Species</label>
            <input type="text" class="form-control" v-model="species" placeholder="Your pet species"/>
          </div>
          <div class="form-group">
            <label>Race</label>
            <input type="text" class="form-control" v-model="race" placeholder="Your pet race" />
          </div>
          <div class="form-group">
            <label>Medical Desease</label>
            <input type="text" class="form-control" v-model="race" placeholder="Your pet race" />
          </div>
          <button class="btn btn-primary" style="margin:0.5rem 0; background-color:var(--dark-alt); border-color: var(--light);">Submit</button>
        </form>
      </div>
      <div class="col-md-4">
        <img src="../../public/images/oak.png" style="max-width:100%">

      </div>
      <div class="col-md-4 " >
        <div class="comicContainer">
        <!--<img src='../../public/images/comic_cloud.png" style="max-width:100%">-->
        <p class="pCloud">Hello! fill out the form on the side and find out what animalHouse has in store for you and your pet!</p>
        </div>
        </div>
    </div>
  </main>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'vueHome',
  computed:{
    ...mapGetters(['user'])
  },
  data(){
    return{
      name:'',
      animalType:'',
      sex:'',
      species:'',
      race:''
    }
  },
  methods:{
    handleSubmit(){

    }
  }

}
</script>

<style lang="scss" scoped>
.comicContainer{
  background-image: url("../../public/images/comic_cloud.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  .pCloud{
    padding: 5rem 3rem
  }
}
main{
  text-align: center;
  display:flex;
  flex-direction: column;
  font-size: 1rem;
  color:var(--dark);
}
form{
  text-align: left;
  width: 80%;
  background-color: var(--dark);
  padding: 1rem;
  border-radius: 1rem;
  color:var(--light);
  margin:0 auto
}
.col-md-6{;
  padding: 1rem 4rem;
}
.row{

}
.button{
  background-color: var(--dark-alt);
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  .material-icons, .text{
    color:var(--light);
  }
  .material-icons{
    font-size:7rem
  }
}
@media (max-width: 1024px) {

  .button{
    border-radius: 1.5rem;
    .material-icons{
      font-size: 2rem;
    }
  }
  .col-4{
    padding:0.4rem 0.9rem
  }
  form{
    width: 100%;
  }
  main{
    padding-left: 6rem;
  }
}
</style>