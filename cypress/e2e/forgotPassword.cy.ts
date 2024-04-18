/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can reset password', () => {
	beforeEach(() => {
		cy.visit('/')
	})
	it('Reset password', () => {
        getEl.getSingInBtn().click()
		cy.get('a[title="Recover your forgotten password"]').click()
		getEl.getEmailField().type(data.correctUser.login)
		getEl.getConfirmBtn().click()
		cy.get('p.alert-success')
			.should('be.visible')
			.and(
				'contain.text',
				'A confirmation email has been sent to your address: jan.testowy123@test.pl'
			)
	})
})
