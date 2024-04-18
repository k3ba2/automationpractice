/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can add more product to basket', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Add more product to basket', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().contains('Women').click()
        setting.addToBasket()
        getEl.getContShoppingBtn().click()
        getEl.getDressesCategory().contains('Women').click()
        setting.addToBasket()
        getEl.getProceedBtn().click()
        cy.get('#summary_products_quantity').should('have.text', '2 products')
    })
})

