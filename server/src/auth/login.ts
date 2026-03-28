import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { Autenticaveis } from './authEntity.js'

import { AppDataSource } from '../data-source.js'
import { decryptPassword } from '../utils/senhaUtils.js'
import { AppError } from '../error/ErrorHandler.js'

console.log('SECRET:', process.env.SECRET)
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body

  const autenticavel = await AppDataSource.manager.findOne(Autenticaveis, {
    select: ['id', 'rota', 'role', 'senha'],
    where: { email }
  })
  console.log('Resultado do banco:', autenticavel)

    if (autenticavel == null) {
      throw new AppError('Não encontrado!', 404)
    } else {
      const { id, rota, role, senha: senhaAuth } = autenticavel
      const senhaCorrespondente = decryptPassword(senhaAuth)

      if (senha !== senhaCorrespondente) {
        throw new AppError('Senha incorreta!', 401)
      }

      //process.env.SECRET
      const token = jwt.sign({ id, role }, process.env.SECRET, {
        expiresIn: 86400
      }) // expira em 24 horas

    res.status(200).json({
      auth: true,
      token,
      rota
    })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ auth: false, token: null })
}


export default { login, logout }