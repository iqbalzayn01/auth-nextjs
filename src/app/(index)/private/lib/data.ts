import prisma from '@/lib/prisma';

export async function getAllProduct() {
  try {
    const res = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await prisma.product.findUnique({
      where: { id: id },
    });

    return res;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}
