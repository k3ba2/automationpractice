/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can remove product from basket', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Remove product from basket', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().click()
        setting.addToBasket()
        getEl.getProceedBtn().click()
        cy.get('#summary_products_quantity').should('have.text', '1 product')
        getEl.getRemoveFromCartBtn().click()
        cy.get('p.alert-warning').should('contain.text', 'Your shopping cart is empty.')
    })
})

