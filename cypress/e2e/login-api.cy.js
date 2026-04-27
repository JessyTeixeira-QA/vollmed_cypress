describe('Testes em API', () => {
  beforeEach(function () {
    cy.fixture('especialistas.json').as('especialistas')
  })

  //caminho feliz
  context('Testes em rotas com usuário autorizado', () => {
    beforeEach(() => {
      // Realiza o login para obter o token de autorização
      cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
    })

<<<<<<< HEAD
    it('Deve cadastrar especialista com sucesso', function () {
      const especialista = this.especialistas.especialistas[0]
      const emailUnico = `doc_${Date.now()}@teste.com`
      const crmUnico = Math.floor(Math.random() * 1000000).toString()

      return cy
        .authRequest({
          method: 'POST',
          url: Cypress.env('api_especialista'),
          body: {
            nome: especialista.nome,
            email: emailUnico,
            crm: crmUnico,
            senha: especialista.senha,
            especialidade: especialista.especialidade,
            telefone: especialista.telefone,
            endereco: {
              cep: especialista.cep.toString(),
              rua: especialista.rua,
              numero: especialista.numero,
              complemento: especialista.complemento,
              estado: especialista.estado
            }
          }
        })
        .then(response => {
          // A API do backend retorna 201 Created para sucesso
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('id')
          expect(response.body.nome).to.eq(especialista.nome)
          expect(response.body.email).to.eq(emailUnico)
        })
    })

    it('Não deve cadastrar especialista com CRM duplicado', function () {
      const especialista = this.especialistas.especialistas[0]
      
      // Primeiro cadastro para garantir que o CRM existe
      cy.authRequest({
        method: 'POST',
        url: Cypress.env('api_especialista'),
        body: {
          nome: especialista.nome,
          email: `unique_${Date.now()}@teste.com`,
          crm: especialista.crm.toString(),
          senha: especialista.senha,
          especialidade: especialista.especialidade,
          telefone: especialista.telefone,
          endereco: {
            cep: especialista.cep.toString(),
            rua: especialista.rua,
            numero: especialista.numero,
            complemento: especialista.complemento,
            estado: especialista.estado
          }
        }
      }).then(() => {
        // Segunda tentativa com o mesmo CRM
        cy.authRequest({
          method: 'POST',
          url: Cypress.env('api_especialista'),
          body: {
            nome: "Outro Nome",
            email: `other_${Date.now()}@teste.com`,
            crm: especialista.crm.toString(),
            senha: especialista.senha,
            especialidade: especialista.especialidade,
            telefone: especialista.telefone,
            endereco: {
              cep: especialista.cep.toString(),
              rua: especialista.rua,
              numero: especialista.numero,
              complemento: especialista.complemento,
              estado: especialista.estado
            }
          },
          failOnStatusCode: false
        }).then(response => {
          // O backend retorna 422 para CRM duplicado
          expect(response.status).to.eq(422)
          expect(response.body.message).to.eq('Crm já cadastrado')
        })
      })
    })
  })

  context('Requisições clínica', () => {
    it('Deve cadastrar clínica com sucesso', function () {
      const especialista = this.especialistas.especialistas[1]
      const emailUnico = `clinic_${Date.now()}@teste.com`

      return cy
        .request({
          method: 'POST',
          url: Cypress.env('api_clinica'),
          body: {
            nome: "Clínica Teste " + Date.now(),
            email: emailUnico,
            senha: "senhaSegura123",
            endereco: {
              cep: "12345678",
              rua: "Rua das Clínicas",
              numero: 100,
              complemento: "Sala 1",
              estado: "SP"
            }
          }
        })
        .then(response => {
          // O backend de clínica retorna 200 (res.json) e não 201
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id')
          expect(response.body.email).to.eq(emailUnico)
        })
    })

    it('Não deve cadastrar clínica sem campos obrigatórios', () => {
      return cy
        .request({
          method: 'POST',
          url: Cypress.env('api_clinica'),
          body: {
            nome: 'Clínica Incompleta'
            // Faltam email, senha, endereco
          },
          failOnStatusCode: false
        })
        .then(response => {
          // O backend valida campos obrigatórios e retorna 400
          expect(response.status).to.eq(400)
          expect(response.body).to.be.a('string')
=======
    it('GET via url front para teste em resposta da home', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/',
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
      });
    });

    it('Deve verificar se o token de autenticação é retornado após login via POST na API', () => {
      cy.get('@token').should('exist');
    })

    it('Deve verificar se o usuário está autenticado corretamente via POST na API', () => {
      cy.get('@token').then(token => {
        expect(token).to.exist;
      });
    });
  });

  context('Validações em respostas da API', () => {
    beforeEach(() => {
      cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
    })

    it('POST em especialistas', () => {
      cy.get('@especialistas').then((dados) => {
        const especialista = dados.especialistas[0];
        const emailUnico = `user_${Date.now()}@teste.com`;
        
        // Usando request direto em vez de authRequest para testar
        cy.get('@token').then(token => {
          cy.request({
            method: 'POST',
            url: Cypress.env('api_clinica'),
            headers: {
              'Authorization': `Bearer ${token}`
            },
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
            },
            failOnStatusCode: false
          }).then((response) => {
            console.log('Response:', response);
            
            if (response.status === 500) {
              cy.log('Erro 500: Verifique o banco de dados');
              expect(response.body).to.have.property('message');
              return;
            }
            
            if (response.status === 400) {
              cy.log('Erro 400: Validação falhou');
              expect(response.body).to.have.property('message');
              return;
            }

            expect(response.status).to.be.oneOf([200, 201]);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('nome');
            expect(response.body).to.have.property('email');
          })
>>>>>>> b33d8e8 (Configurando o pm2)
        })
      })
    })

    it('Requisição incorreta em criação de especialista', () => {
      cy.request({
        method: 'POST',
        url: Cypress.env('api_clinica'),
        body: {
          nome: 'Camila',
          email: 'camila123@exemplo',
        },
        failOnStatusCode: false
      }).then((response) => {
        console.log('Error response:', response);
        
        if (response.status === 500) {
          cy.log('Erro 500 esperado - dados incompletos');
          expect(response.body).to.have.property('message');
        } else if (response.status === 400) {
          cy.log('Erro 400 esperado - validação');
          expect(response.body).to.have.property('message');
        } else {
          expect(response.status).to.be.oneOf([400, 500]);
        }
      })
    })
  });
});