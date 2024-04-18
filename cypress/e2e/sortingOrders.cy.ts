/// <reference types="cypress"/>
import { get, set } from 'cypress/types/lodash'
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can filtering results on order history page', () => {
	beforeEach(() => {
		cy.visit('/')
	})
	it('Filering results', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
		getEl.getOrderHistoryBtn().click()
		cy.get('th.footable-sortable').contains('Date').click()
        cy.get('tr.first_item ').first()
        cy.get('th.footable-sortable').contains('Date').click()
        cy.get('tr.last_item').first()


        cy.get('th.footable-sortable').contains('Total price').click()
        cy.get('td.history_price').first().children().invoke('text').then(el => {
            const cleanText = parseFloat(el.replace(/[^\d.-]/g, ''))
            cy.wrap(cleanText).as('ascPrice')
        })

        cy.get('td.history_price').last().children().invoke('text').then(el => {
            const cleanText = parseFloat(el.replace(/[^\d.-]/g, '')) 
            cy.wrap(cleanText).as('descPrice')
        })

        cy.get('@ascPrice').then(ascEl => {
            cy.get('@descPrice').then(descEl => {
                expect(descEl).to.be.gt(ascEl)
            })
        })

        cy.get('th.footable-sortable').contains('Total price').click()
        cy.get('@ascPrice').then(ascEl => {
            cy.get('@descPrice').then(descEl => {
                expect(ascEl).to.be.lt(descEl)
            })
        })

        
        cy.get('th.footable-sortable').contains('Status').click()
        cy.get('td.history_state').first().should('contain.text', 'Awaiting cheque payment')
        cy.get('th.footable-sortable').contains('Status').click()
        cy.get('td.history_state').first().should('contain.text', 'Awaiting bank wire payment')
	})
})
