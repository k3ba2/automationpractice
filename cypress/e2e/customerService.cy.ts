/// <reference types="cypress"/>
import { GetElement } from '../POM';
import { SettingPage } from '../POM/settingPage';
import * as data from '../fixtures/example.json';

const getEl = new GetElement();
const setting = new SettingPage();

describe('User can send message to customer service', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('Send message to customer service', () => {
		setting.login(data.correctUser.login, data.correctUser.pass);
		getEl.getOrderHistoryBtn().click();

		cy.get('td.history_link')
			.eq(0).find('a').invoke('text').then((el) => {
				const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
				cy.wrap(cleanText).as('orderNumber')
			})

		cy.get('td.history_date').eq(0).invoke('text').then(el => {
			const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
				cy.wrap(cleanText).as('orderDate')
		})

		cy.get('span.footable-toggle').eq(0).click()
        cy.get('div.footable-row-detail-value').find('a').eq(0).click()

		cy.get('#order-detail-content').within(() => {
			cy.get('td.bold').children().invoke('text').then(el => {
				const cleanText = el.replace(/^[\n\t]+|[\n\t]+$/g, '')
				cy.wrap(cleanText).as('product')
			})
		})

		getEl.getContactUsBtn().click()
		cy.get('h1.page-heading')
			.should('be.visible')
			.and('contain.text', 'Customer service - Contact us')
		cy.get('#id_contact').select('Customer service')
		getEl.getEmailField().clear().type(data.correctUser.login)
		
		cy.get('@orderNumber').then(number => {
			cy.get('@orderDate').then(date => {
				cy.get('[name="id_order"]').select(number + ' ' + '-' + ' ' + date)
			})
		})

		cy.get('@product').then(product => {
			cy.get('#3001_order_products').select(product)
		})

		cy.get('#message').type('test')
		getEl.getSendCommentBtn().click()
		cy.get('p.alert-success').should('be.visible').and('contain.text', 'Your message has been successfully sent to our team.')
	})
})
