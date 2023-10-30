

import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"







export async function GET(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {


        if (!params.sizeId) {
            return new NextResponse("Size Id is required", { status: 400 })
        }

        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId

            }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log(`[Size_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}















export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { name, value } = body

        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if (!value) {
            return new NextResponse("Value is required", { status: 400 })
        }
        if (!params.sizeId) {
            return new NextResponse("Size Id is required", { status: 400 })
        }
        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const size = await prisma.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value

            }
        })

        return NextResponse.json(size)
    } catch (error) {
        console.log(`[Size_PATCH]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }



}

export async function DELETE(
    req: Request,
    { params }: { params: { sizeId: string, storeId: string } }
) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }

        if (!params.sizeId) {
            return new NextResponse("Size Id is required", { status: 400 })
        }
        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const store = await prisma.size.deleteMany({
            where: {
                id: params.sizeId

            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log(`[Size_delete]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}


