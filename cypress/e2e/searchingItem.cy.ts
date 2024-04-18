/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can sorting results on listing page', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Sorting results', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getSearchInput().type('t-shirts')
        cy.get('li.ac_even').click()
        cy.get('div.breadcrumb').find('span').contains('Faded Short Sleeve T-shirts').should('be.visible')
    })
})

