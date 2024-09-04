const { expect } = require('@playwright/test')

// export class Toast {

//     constructor(page) {
//         this.page = page
//     }

//     async containText(message) {
//         const toast = this.page.locator('.toast')

//         await expect(toast).toContainText(message)
//         await expect(toast).toBeHidden({ timeout: 5000 })
//     }
// }

export class Popup {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const element = this.page.locator('.swal2-html-container')

        await expect(element).toHaveText(message)
    }
}