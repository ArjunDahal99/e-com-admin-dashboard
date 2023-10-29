import format from "date-fns/format";
import { BillboardClient } from "./components/client";
import prisma from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
    id: item.id,
    lable: item.lable,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8  pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardsPage;
