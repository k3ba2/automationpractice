/// <reference types="cypress"/>
import { GetElement } from "../POM"
import { SettingPage } from "../POM/settingPage"
import * as data from "../fixtures/example.json"

const getEl = new GetElement()
const setting = new SettingPage()

describe('User can login to automationpractice', () => {
    beforeEach(() => {
        cy.visit('/')
    })
   
    it('Correct login', () => {
        setting.login(data.correctUser.login, data.correctUser.pass)
        cy.location('pathname').should('eq', '/index.php')
        cy.location('search').should('eq', '?controller=my-account')
    })
})

