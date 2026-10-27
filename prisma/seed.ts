import { PrismaClient } from '@prisma/client'

import { createHashPassword } from '../src/utils/create-hash-password'

const prisma = new PrismaClient()

export const users = [{ email: 'john@doe.com', name: 'John Doe' }]

async function main() {
  const hashPassword = await createHashPassword('safesecure')

  // Create users
  await prisma.user.createMany({
    data: users.map((user) => ({ ...user, password_hash: hashPassword })),
    skipDuplicates: true,
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
