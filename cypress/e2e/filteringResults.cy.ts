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
        getEl.getWomenCategory().contains('Women').click()

        getEl.getCategoryFilter().click()
	getEl.getEnabledFilters().should('be.visible')
	cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Categories Tops')
        cy.get('a[title="Cancel"]').click()

        getEl.getSizeFilter().click() 
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Size S')
        cy.get('a[title="Cancel"]').click() 

        getEl.getColorFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Color Orange')
        cy.get('a[title="Cancel"]').click()

        getEl.getPropertiesFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Properties Colorful Dress')
        cy.get('a[title="Cancel"]').click()

        getEl.getCompositionsFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Compositions Cotton')
        cy.get('a[title="Cancel"]').click()

        getEl.getStylesFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Styles Casual')
        cy.get('a[title="Cancel"]').click()

        getEl.getAvaibilityFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Availability In stock')
        cy.get('a[title="Cancel"]').click()

        getEl.getConditionFilter().click()
        getEl.getEnabledFilters().should('be.visible')
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Condition New')
        cy.get('a[title="Cancel"]').click()  
        
        getEl.getCategoryFilter().click()
        getEl.getSizeFilter().click() 
        getEl.getColorFilter().click()
        getEl.getCompositionsFilter().click()
        getEl.getStylesFilter().click()
        getEl.getAvaibilityFilter().click()
        getEl.getConditionFilter().click()
        cy.get('span.cat-name').should('be.visible').and('contain.text', 'Women > Condition New')  // DOKOŃCZYĆ
        cy.get('a[title="Cancel"]').click()  


        cy.get('#layered_price_range').invoke('text').as('noFiltersPrice')

        cy.get('a.ui-slider-handle').eq(0).then(el => {
                el[0].style.left = '25%'
        })

        cy.get('a.ui-slider-handle').eq(1).then(el => {
                el[0].style.left = '80%'
        })
        cy.wait(2000)
        cy.get('#layered_price_range').invoke('text').as('filtersPrice')

        cy.get('@noFiltersPrice').then(orginalPrice => {
                cy.get('#layered_price_range').invoke('text').then(changedPrice => {
                        expect(changedPrice).to.not.equal(orginalPrice)
                })
        })

 })
})
