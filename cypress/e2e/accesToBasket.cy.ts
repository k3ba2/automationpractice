/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can acces to basket', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Acces to basket', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getAddToBasketBtn().click()
        cy.location('search').should('eq', '?controller=order')
        cy.get('div.breadcrumb').should('contain.text', 'Your shopping cart')
    })
})

