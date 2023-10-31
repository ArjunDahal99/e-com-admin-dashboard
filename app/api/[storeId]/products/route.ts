import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
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
            return new NextResponse("Unauthenticated", { status: 403 });
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

        const storeByuserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isArchived,
                isFeature,
                colorId,
                storeId: params.storeId,
                sizeId,
                categoryId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => (image))
                        ]
                    }
                }

            }
        })

        return NextResponse.json(product)



    } catch (error) {
        console.log(`[Product_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {


        const { searchParams } = new URL(req.url)
        console.log(searchParams)

        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured") || undefined
        console.log(isFeatured)
        if (!params.storeId) {
            return new NextResponse("StoreId  is is required", { status: 400 })
        }

        const product = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeature: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                category: true,
                images: true,
                color: true,
                size: true
            },
            orderBy: {
                createdAt: 'desc'
            }


        })


        return NextResponse.json(product)

    } catch (error) {
        console.log(`[Products_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}