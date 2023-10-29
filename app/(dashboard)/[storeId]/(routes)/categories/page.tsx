import format from "date-fns/format";
import { CategoryClient } from "./components/client";
import prisma from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categoties = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categoties.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLable: item.billboard.lable,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8  pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
