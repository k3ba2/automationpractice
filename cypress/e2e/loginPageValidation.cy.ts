/// <reference types="cypress"/>
import { GetElement } from '../POM'
import { SettingPage } from '../POM/settingPage'
import * as data from '../fixtures/example.json'

const getEl = new GetElement()
const setting = new SettingPage()

describe('Login and password field validation', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	Object.values(data.invalidUser).forEach((users) => {
		it(`${users.case}`, () => {
			setting.login(users.login, users.pass)
			setting.loginErrorMsg(users.msg)
		})
	})
})
