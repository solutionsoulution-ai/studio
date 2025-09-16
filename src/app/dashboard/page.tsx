
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import DashboardClientPage from "@/components/dashboard/dashboard-client-page";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <SiteHeader />
      <main className="flex-1">
        <DashboardClientPage />
      </main>
      <SiteFooter />
    </div>
  );
}
