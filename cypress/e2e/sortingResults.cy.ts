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
		setting.sortList()
	})
})
