import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// 初始化数据库
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {

    const passwordAllen = await bcrypt.hash('password-Allen', roundsOfHashing);
    const passwordLucy = await bcrypt.hash('password-Lucy', roundsOfHashing);

    //创建2个测试用户
    const user1 = await prisma.user.upsert({
        where: { email: '111@163.com' },
        update: {
            password: passwordAllen,
        },
        create: {
            email: '111@163.com',
            password: passwordAllen,
            name: 'Allen',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: '222@163.com' },
        update: {
            password: passwordLucy,
        },
        create: {
            email: '222@163.com',
            password: passwordLucy,
            name: 'Lucy',
        },
    });


    //创建2个测试商品
    const commodity1 = await prisma.product.upsert({
        where: { name: 'apple' },
        update: {},
        create: {
            name: 'apple',
            price: 6999.99,
            description: 'apple phone',
            number: 30,
        },
    });
    const commodity2 = await prisma.product.upsert({
        where: { name: 'xiaomi' },
        update: {},
        create: {
            name: 'xiaomi',
            price: 4999.99,
            description: 'xiaomi phone',
            number: 20,
        },
    })
    //创建2个测试分类
    const category1 = await prisma.category.upsert({
        where: { name: "phone" },
        update: {},
        create: {
            name: "phone",
        }
    });

    const category2 = await prisma.category.upsert({
        where: { name: "clothing" },
        update: {},
        create: {
            name: "clothing",
        }
    });
    console.log(user1, user2, commodity1, commodity2, category1, category2);

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })