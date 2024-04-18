/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can acces to product cart', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Acces to product cart', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().contains('Women').click()
        getEl.getProductCart().eq(0).click()
        cy.location('search').should('eq', '?id_product=1&controller=product')
        cy.get('#product_reference').should('be.visible')
        cy.get('#product_condition').should('be.visible')
        cy.get('#short_description_block').should('be.visible')
    })
})

