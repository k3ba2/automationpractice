/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can acces to all product category', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Acces to all product category', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().realHover().should('be.visible')
        cy.get('li.sfHover').find('a').contains('Tops')
        cy.get('li.sfHover').find('ul').contains('T-shirts').and('be.visible')
        cy.get('li.sfHover').find('ul').contains('Blouses').and('be.visible')

        getEl.getDressesCategory().realHover().should('be.visible')
        cy.get('li.sfHover').find('ul').contains('Casual Dresses').and('be.visible')
        cy.get('li.sfHover').find('ul').contains('Evening Dresses').and('be.visible')
        cy.get('li.sfHover').find('ul').contains('Summer Dresses').and('be.visible')

        getEl.getTshirtsCategory().should('be.visible')
    })
})

