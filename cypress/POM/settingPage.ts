import { GetElement } from "./index"
import * as data from "../fixtures/example.json"
import { get } from "cypress/types/lodash"

const getEl = new GetElement()

export class SettingPage {
login(name, pass) {
    getEl.getSingInBtn().click()
    getEl.getEmailField().type(name)
    getEl.getPassField().type(pass)
    getEl.getLoginBtn().click()
 } 

 loginErrorMsg(msg) {
    cy.get('div.alert-danger').contains(msg)
 }
 
addToBasket() {
   getEl.getProductCart().then(el => {
      const rndm = Math.floor(Math.random() * el.length)
      el[rndm].click()
      cy.get('select[id="group_1"]').select('M') //zmienić po naprawie strony
      getEl.getAddToBasketOnProductCartBtn().click()
   })
 }


 sortList() {
   const sortOption = ['Price: Lowest first', 'Price: Highest first', 'Product Name: A to Z', 'Product Name: Z to A', 'In stock', 'Reference: Lowest first', 'Reference: Highest first']
   sortOption.forEach(el => {
      getEl.getSortByBtn().select(el)
      getEl.getSortByBtn().should('contain', el)
   })
 }

 fillFirstName(name) {
   getEl.getFirstNameField().clear().type(name)
 }

 fillLastName(name) {
   getEl.getLastNameField().clear().type(name)
 }

 fillAdresses(address) {
   getEl.getAdressesField().clear().type(address)
 }

 fillCity(city) {
   getEl.getCityField().clear().type(city)
 }

 selectState(state) {
   getEl.getStateField().select(state)
 }

 fillPostCode(code) {
  getEl.getPostCodefield().clear().type(code)
 }

 fillCountry(country) {
  getEl.getCountryField().select(country)
 }

 fillHomePhone(homePhone) {
  getEl.getHomePhoneField().clear().type(homePhone)
 }

 fillMobilePhone(mobilePhone) {
  getEl.getMobilePhoneField().clear().type(mobilePhone)
 }


}