import axios from 'axios'
function findPets() {
            return axios.get(petstore.swagger.io/api/pets);
          }
function addPet() {
            return axios.post(petstore.swagger.io/api/pets, {body: 1})
          }
function findPetById() {
            return axios.get(petstore.swagger.io/api/pets/{id});
          }
function deletePet() {
            return axios.delete(petstore.swagger.io/api/pets/{id}, {body: 1})
          }