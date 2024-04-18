/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User subscription to newsletter', () => {
	beforeEach(() => {
		cy.visit('/')
	})
    it("Subscription to newsletter", () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getNewsletterInput().type('jan.testowy123@test.pl')
        getEl.getNewsletterBtn().click()
        cy.get('p.alert-success').should('be.visible').and('contain.text', 'Newsletter : You have successfully subscribed to this newsletter.')
    })
})
