import { useLocation } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminNavItems } from "@/components/admin/AdminSidebar";

const AdminSection = () => {
  const { pathname } = useLocation();
  const item = adminNavItems.find((i) => i.url === pathname);
  const title = item?.title ?? "Sección";

  return (
    <AdminLayout title={title}>
      <section className="py-16 md:py-20">
        <div className="container">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Panel interno
          </p>
          <h1 className="text-4xl md:text-5xl tracking-tight font-normal">{title}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Esta sección aún no tiene contenido. Dime qué necesitas aquí y la construimos.
          </p>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminSection;