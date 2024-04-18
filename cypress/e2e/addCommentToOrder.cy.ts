/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can comment add to order', () => {
	beforeEach(() => {
		cy.visit('/')
	});
	it('Add comment', () => {
		setting.login(data.correctUser.login, data.correctUser.pass)
		getEl.getOrderHistoryBtn().click()
		cy.get('td.history_link').eq(0).click()
		cy.get('td[class="bold"]')
			.invoke('text')
			.then((el) => {
				const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
				cy.wrap(cleanText).as('product')
			});

		cy.get('@product').then((el) => {
			getEl.getSelectProductBtn().select(el.toString())
		})

		cy.get('textarea[class="form-control"]').type('Testowy komentarz')
		getEl.getSendCommentBtn().click()
		cy.wait(5000)
		cy.get('p.alert-success').should('be.visible').and('contain.text', 'Message successfully sent')
	})
})
