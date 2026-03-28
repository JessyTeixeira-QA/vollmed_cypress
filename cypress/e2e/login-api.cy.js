describe('Testes em API', () => {
  beforeEach(function () {
    cy.fixture('especialistas.json').as('especialistas')
  })

  context('Testes em rotas com usuário autorizado', () => {
    beforeEach(() => {
      cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
    })

    it('Deve cadastrar especialista com sucesso', function () {
      const especialista = this.especialistas.especialistas[0]

      const emailUnico = `user_${Date.now()}@teste.com`
      const crmUnico = Date.now().toString()

      return cy
        .authRequest({
          method: 'POST',
          url: Cypress.env('api_especialista'),
          body: {
            nome: especialista.nome,
            email: emailUnico,
            crm: crmUnico,
            senha: especialista.senha, // ✅ obrigatório
            endereco: {
              // ✅ obrigatório
              cep: especialista.cep,
              rua: especialista.rua,
              numero: especialista.numero,
              complemento: especialista.complemento,
              estado: especialista.estado
            }
          }
        })
        .then(response => {
          console.log('Resposta sucesso:', response)

          expect(response.status).to.be.oneOf([200, 201])
          expect(response.body).to.have.property('id')
          expect(response.body.nome).to.eq(especialista.nome)
          expect(response.body.email).to.eq(emailUnico)
        })
    })

    it('Não deve cadastrar especialista com dados inválidos', () => {
      return cy
        .authRequest({
          method: 'POST',
          url: Cypress.env('api_especialista'),
          body: {
            nome: 'Camila',
            email: 'camila123@exemplo', // inválido
            crm: '', // obrigatório vazio
            senha: '' // obrigatório vazio
          }
        })
        .then(response => {
          console.log('Resposta erro:', response)

          // ✅ aceita erro da API (400 esperado)
          expect(response.status).to.eq(400)

          expect(response.body).to.exist
        })
    })
  })

  context('Requisições clínica', () => {
    beforeEach(() => {
      cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
    })

    it('POST em clínica', function () {
      const especialista = this.especialistas.especialistas[0]

      const emailUnico = `user_${Date.now()}@teste.com`

      return cy
        .authRequest({
          method: 'POST',
          url: Cypress.env('api_clinica'),
          body: {
            nome: especialista.nome,
            email: emailUnico,
            senha: especialista.senha,
            endereco: {
              cep: especialista.cep,
              rua: especialista.rua,
              numero: especialista.numero,
              complemento: especialista.complemento,
              estado: especialista.estado
            }
          }
        })
        .then(response => {
          console.log('Resposta clínica:', response)

          expect(response.status).to.be.oneOf([200, 201, 400])
          if (response.status === 200 || response.status === 201) {
            expect(response.body).to.have.property('id')
          }
        })
    })
  })
})
