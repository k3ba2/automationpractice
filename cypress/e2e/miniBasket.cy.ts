/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('Check if minibasket is working properly', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('Minibasket', () => {
		setting.login(data.correctUser.login, data.correctUser.pass)
		getEl.getWomenCategory().contains('Women').click()
		setting.addToBasket()
		cy.get('span[id="layer_cart_product_price"]').invoke('text').as('productPrice')
        cy.get('span[id="layer_cart_product_title"]').invoke('text').as('productTitle')
        cy.get('[id="uniform-group_1"]').find('span').invoke('text').as('productSize')
		getEl.getContShoppingBtn().click()
        cy.get('a[title="View my shopping cart"]').realHover()

        cy.get('@productPrice').then(price => {
            cy.get('span.price').eq(0).should('be.visible').and('contain.text', price)
        })

        cy.get('@productTitle').then(title => {
            cy.get('div.product-name').find('a').invoke('attr', 'title').should('equal', title)
            
        })

        cy.get('@productSize').then(size => {
            cy.get('div.product-atributes').find('a').should('be.visible').and('contain.text', size)
        })
  
        getEl.getDeleteBtn().click()
        cy.get('a[title="View my shopping cart"]').realHover().should('contain.text', 'empty')
	})
})
