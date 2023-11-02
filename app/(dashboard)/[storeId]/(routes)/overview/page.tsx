import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { Overview } from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}
const OverviewPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className=" mt-20">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphRevenue} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
