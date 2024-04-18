/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can add first adresses', () => {
	beforeEach(() => {
		cy.visit('/')
	})
    it("Add adresses", () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getFirstAdressesBtn().click()
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
        cy.get('ul.last_item').should('be.visible').and('contain.text', 'My address')
    })
})
