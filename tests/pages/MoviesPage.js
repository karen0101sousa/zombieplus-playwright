const { expect } = require('@playwright/test')

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(movie) {
        await this.goForm()

        //await this.page.locator('#title').fill(title)

        await this.page.getByLabel('Titulo do filme').fill(movie.title)

        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()
        // const html = await this.page.content()
        // console.log(html) -> estratégia para pegar o html da lista na interface gráfica
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click()

        await this.submit()
    }
    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
}
