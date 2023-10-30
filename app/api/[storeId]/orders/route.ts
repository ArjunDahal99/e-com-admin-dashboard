import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        const body = await req.json()
        const { lable, imageUrl } = body

        if (!userId) {
            return new NextResponse("Unauthorized ", { status: 401 })
        }
        if (!lable) {
            return new NextResponse("Lable is required", { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse("Image Url is is required", { status: 400 })
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

        const billboard = await prismadb.billboard.create({
            data: {
                lable,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)



    } catch (error) {
        console.log(`[Billboard_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {


        if (!params.storeId) {
            return new NextResponse("StoreId  is is required", { status: 400 })
        }


        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log(`[Billboard_POST]`, error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}