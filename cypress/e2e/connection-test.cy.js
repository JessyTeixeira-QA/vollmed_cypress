describe('Teste de Conexão com API', () => {
  it('Deve conectar ao servidor da API', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/',
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Response:', response)
      expect(response.status).to.eq(200)
      expect(response.body).to.include('Vollmed Servidor está rodando')
    })
  })

  it('Deve fazer login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/auth/login',
      body: {
        email: 'clinica@gmail.com',
        senha: '4321'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Login response:', response)
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body.auth).to.be.true
    })
  })

  it('Deve acessar endpoint da clínica com token', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/auth/login',
      body: {
        email: 'clinica@gmail.com',
        senha: '4321'
      }
    }).then((loginResponse) => {
      const token = loginResponse.body.token
      
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/clinica',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          nome: 'Teste',
          email: `test_${Date.now()}@teste.com`,
          senha: '123456',
          endereco: {
            cep: 12345678,
            rua: 'Rua Teste',
            numero: 123,
            complemento: 'apto 1',
            estado: 'SP'
          }
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Clínica response:', response)
        expect(response.status).to.be.oneOf([200, 201])
        expect(response.body).to.have.property('id')
      })
    })
  })
})
