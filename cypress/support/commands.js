// Comando para realizar login via interface gráfica (UI) utilizando cy.session para persistir a sessão
Cypress.Commands.add('login', (email, senha) => {
  cy.session([email, senha], () => {
    cy.visit('/login')
    cy.get('[data-test="inputLoginEmail"]').type(email)
    // O log: false evita que a senha apareça nos logs do Cypress
    cy.get('[data-test="inputLoginSenha"]').type(senha, { log: false })
    cy.get('[data-test="botaoTeste"]').should('be.visible').click()
    // Valida se o login foi bem sucedido verificando a URL
    cy.location('pathname').should('eq', '/dashboard')
  })
})

// Comando para preencher o formulário de cadastro de um novo especialista no dashboard
Cypress.Commands.add(
  'cadastraEspecialista',
  (
    nome,
    email,
    senha,
    especialidade,
    crm,
    imagem,
    cep,
    rua,
    numero,
    complemento,
    estado
  ) => {
    cy.visit('/dashboard')
    cy.contains('Cadastrar especialista').should('be.visible').click()
    cy.get('[data-test="inputEspecialistaNome"]').type(nome)
    cy.get('[data-test="inputEspecialistaEmail"]').type(email)
    cy.get('[data-test="inputEspecialistaSenha"]').type(senha)
    cy.get('[data-test="inputEspecialistaSenhaVerificada"]').type(senha)
    cy.get('[data-test="inputEspecialistaEspecialidade"]').type(especialidade)
    cy.get('[data-test="inputEspecialistaCRM"]').type(crm)
    cy.get('[data-test="inputEspecialistaImagem"]').type(imagem)
    cy.get('[data-test="inputEspecialistaCEP"]').type(cep)
    cy.get('[data-test="inputEspecialistaRua"]').type(rua)
    cy.get('[data-test="inputEspecialistaNumero"]').type(numero)
    cy.get('[data-test="inputEspecialistaComplemento"]').type(complemento)
    cy.get('[data-test="inputEspecialistaEstado"]').type(estado)
  }
)

// Comando para realizar login diretamente via API e armazenar o token de autenticação
Cypress.Commands.add('loginApi', (email, senha) => {
  return cy
    .request({
      method: 'POST',
      url: Cypress.env('api_login'),
      body: {
        email,
        senha
      },
      failOnStatusCode: false // 🔑 evita quebra automática
    })
    .then(response => {
      console.log('Login response:', response)

      // ✅ valida status primeiro
      expect(response.status).to.eq(
        200,
        `Erro no login: status ${response.status}`
      )

      // ✅ valida existência do body
      expect(response.body).to.exist

      // ✅ valida token com segurança
      expect(response.body).to.have.property('token')
      expect(response.body.token).to.be.a('string').and.not.be.empty

      const token = response.body.token

      // ✅ salva como alias
      cy.wrap(token).as('token')

      // ✅ salva no env (mais confiável para API)
      Cypress.env('token', token)

      // ✅ header padrão
      Cypress.env('authHeader', {
        Authorization: `Bearer ${token}`
      })

      // ⚠️ opcional (use só se tiver frontend envolvido)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token)
      }
    })
})
// Comando utilitário para fazer requisições autenticadas usando o token armazenado
Cypress.Commands.add('authRequest', options => {
  return cy.get('@token').then(token => {
    const requestOptions = {
      method: options.method,
      url: options.url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: options.body,
      failOnStatusCode: options.failOnStatusCode ?? false
    }

    // 🔑 RETORNO AQUI
    return cy.request(requestOptions)
  })
})
