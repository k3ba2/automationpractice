/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can add product to basket', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Add product to basket', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().contains('Women').click()
        setting.addToBasket()
        getEl.getProceedBtn().click()
        cy.get('#summary_products_quantity').should('have.text', '1 product')
    })
})

