/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can delete to saved adresses', () => {
	beforeEach(() => {
		cy.visit('/')
	})
    it("Delete adresses", () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getMyAdressesBtn().click()
        getEl.getDeleteAdressesBtn().click()
        cy.on('window:confirm', alert => {
            expect(alert).contain('Are you sure?')
        })
        cy.get('p.alert-warning').should('contain.text', 'No addresses are available.')
    })
})
