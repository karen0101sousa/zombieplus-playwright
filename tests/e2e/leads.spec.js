const { test, expect } = require('../support/export')
const { faker } = require('@faker-js/faker')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  // Localizados XPath: await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  // /texto/ estratégia de substring do playwright

  // Estratégia para pegar o html do modal flutuante
  // await page.getByText('seus dados conosco').click()
  // const content = await page.content()
  // console.log(content)
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)
})

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
})

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Fernando Papito', 'papito.com.br')

  await page.leads.alertHaveText('Email incorreto')
})

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'papito@yahoo.com.br')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Fernando Papito', '')

  await page.leads.alertHaveText('Campo obrigatório')
})

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})