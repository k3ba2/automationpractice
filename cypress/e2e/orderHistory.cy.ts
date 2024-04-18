/// <reference types="cypress"/>
import { contains } from 'cypress/types/jquery'
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'
import { should } from 'chai'

const getEl = new GetElement()
const setting = new SettingPage()

describe('Order history check', () => {
	beforeEach(() => {
		cy.visit('/')
	})
    it("Order history", () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        getEl.getOrderHistoryBtn().click()
        cy.get('h1.page-heading').should('be.visible').and('contain.text', "Order history")

        cy.get('td.history_link').eq(0).find('a').should('be.visible').invoke('text').then(el => {
               const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
               cy.wrap(cleanText).as('orderNumber')
        })
        
        cy.get('td.history_date').eq(0).should('be.visible').invoke('text').then(el => {
               const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
               cy.wrap(cleanText).as('orderDate')
        })

        cy.get('td.history_price').eq(0).should('be.visible').invoke('text').then(el => {
               const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
               cy.wrap(cleanText).as('orderPrice')
        })

        cy.get('td.history_state').eq(0).should('be.visible').invoke('text').then(el => {
               const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
               cy.wrap(cleanText).as('paymentStatus')
        })

        cy.get('span.footable-toggle').eq(0).click()
        cy.get('div.footable-row-detail-value').find('a').eq(0).click()

        cy.get('@orderNumber').then(number => {
            cy.get('p.dark').find('strong').should('contain.text', number)
        })

        cy.get('@orderDate').then(date => {
            cy.get('td.step-by-step-date').should('contain.text', date)
        })

        cy.get('@orderPrice').then(price => {
            cy.get('tr.totalprice').find('span.price').should('contain.text', price)
        })

        cy.get('@paymentStatus').then(status => {
            cy.get('div.table_block').find('span.label').should('contain.text', status)
        })

        cy.get('h3.page-subheading').contains('Delivery address (My address)').should('be.visible')
        cy.get('h3.page-subheading').contains('Invoice address (My address)').should('be.visible')
    })
})
