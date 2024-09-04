const { expect } = require('@playwright/test')

export class Login {
    constructor(page) {
        this.page = page
    }

    async do(email, password, username) {
        await this.visit()
        await this.submit(email, password)
        await this.isLoggedIn(username)
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        //await this.page.locator('//button[text()="Entrar"]').click()

        await this.page.getByText('Entrar').click()
    }

    // async alertEmailHaveText(text){
    //     const alert = alert.page.locator('.email-alert')
    //     await expect(alert).toHaveText(text)
    // }

    // async alertPasswordHaveText(text){
    //     const alert = alert.page.locator('.email-alert')
    //     await expect(alert).toHaveText(text)
    // }


    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(username) {
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
        // await this.page.waitForLoadState('networkidle')
        // await expect(this.page).toHaveURL(/.*admin/)
        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }
}
