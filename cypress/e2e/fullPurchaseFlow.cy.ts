/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('Full purchase flow', () => {
	beforeEach(() => {
		cy.visit('/')
	})
    it("Purchase flow", () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getWomenCategory().click()
        setting.addToBasket()
        getEl.getProceedBtn().click()
        getEl.getProceedBtn2().click()
        setting.fillFirstName('Jan')
        setting.fillLastName('Nowak')
        setting.fillAdresses('Piękna 8')
        setting.fillCity('Warszawa')
        setting.selectState('Arizona')
        setting.fillPostCode('22222')
        setting.fillCountry('United States')
        setting.fillHomePhone('123456789')
        setting.fillMobilePhone('123123123')
        getEl.getSaveBtn().click()
        getEl.getProceedBtn3().click()
        getEl.getCheckbox().check()
        getEl.getProceedBtn4().click()
        cy.get('a.bankwire').click()
        getEl.getConfirmBtn().click()
        cy.get('p.alert-success').should('be.visible').and('contain.text', 'Your order on My Shop is complete.')
    })
})
