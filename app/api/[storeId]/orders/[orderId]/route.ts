import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { lable, imageUrl } = body

        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }
        if (!lable) {
            return new NextResponse("LABLE is required", { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse("imaegurl is required", { status: 400 })
        }
        if (!params.billboardId) {
            return new NextResponse("billboard Id is required", { status: 400 })
        }
        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const billboard = await prisma.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                lable,
                imageUrl

            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log(`[billboard_PATCH]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }



}

export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", { status: 400 })
        }
        const storeByuserId = await prisma.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByuserId) return new NextResponse("Unauthorized", { status: 403 })

        const store = await prisma.billboard.deleteMany({
            where: {
                id: params.billboardId

            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log(`[Billboard_delete]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}


export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {


        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", { status: 400 })
        }

        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId

            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log(`[Billboard_GET]`, error)
        return new NextResponse("Internal Error", { status: 500 })

    }

}
