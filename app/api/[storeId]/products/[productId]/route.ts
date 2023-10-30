import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { name,
            images,
            price,
            categoryId,
            isFeature,
            isArchived,
            sizeId,
            colorId } = body

        if (!userId) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }


        if (!params.storeId) {
            return new NextResponse("StoreId  is is required", { status: 400 })
        }

        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId

            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        await prisma.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isArchived,
                isFeature

            }
        })
        const product = await prisma.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                },
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log(`[product_PATCH]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }



}

export async function DELETE(
    req: Request,
    { params }: { params: { productId: string, storeId: string } }
) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }

        if (!params.productId) {
            return new NextResponse("product Id is required", { status: 400 })
        }
        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const store = await prisma.product.deleteMany({
            where: {
                id: params.productId

            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log(`[product_delete]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}


export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {


        if (!params.productId) {
            return new NextResponse("product Id is required", { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                color: true,
                size: true,
                category: true
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log(`[product_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}
