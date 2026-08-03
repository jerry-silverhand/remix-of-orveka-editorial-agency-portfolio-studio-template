import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { HeroContent, HeroItem, StaggerContainer, StaggerItem, FadeUp } from "@/components/ui/scroll-animation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, CheckCircle2, XCircle, Search, Eye } from "lucide-react";

type Status = "confirmada" | "pendiente" | "cancelada" | "completada";

interface Appointment {
  id: string;
  client: string;
  email: string;
  phone: string;
  service: string;
  price: number;
  date: string;
  time: string;
  status: Status;
}

const appointments: Appointment[] = [
  { id: "CIT-1042", client: "María Fernández", email: "maria@estudio.co", phone: "+56 9 1234 5678", service: "Sesión de descubrimiento", price: 120, date: "2026-08-04", time: "09:30", status: "confirmada" },
  { id: "CIT-1041", client: "Andrés Rojas", email: "andres@nova.io", phone: "+56 9 2345 6789", service: "Revisión de marca", price: 95, date: "2026-08-04", time: "11:00", status: "pendiente" },
  { id: "CIT-1040", client: "Lucía Herrera", email: "lucia@atelier.mx", phone: "+52 55 1234 5678", service: "Consultoría web", price: 150, date: "2026-08-05", time: "14:15", status: "confirmada" },
  { id: "CIT-1039", client: "Tomás Vidal", email: "tomas@vidal.cl", phone: "+56 9 3456 7890", service: "Sesión de descubrimiento", price: 120, date: "2026-08-06", time: "16:00", status: "cancelada" },
  { id: "CIT-1038", client: "Camila Duarte", email: "camila@duarte.pe", phone: "+51 999 123 456", service: "Estrategia de contenido", price: 80, date: "2026-08-07", time: "10:00", status: "pendiente" },
  { id: "CIT-1037", client: "Javier Peña", email: "javier@penastudio.es", phone: "+34 612 34 56 78", service: "Revisión de marca", price: 95, date: "2026-08-01", time: "12:30", status: "completada" },
  { id: "CIT-1036", client: "Sofía Márquez", email: "sofia@marquez.ar", phone: "+54 11 1234 5678", service: "Consultoría web", price: 150, date: "2026-07-30", time: "15:45", status: "completada" },
];

const statusStyles: Record<Status, string> = {
  confirmada: "bg-green-500/20 text-green-700 ring-1 ring-green-500/30",
  pendiente: "bg-yellow-500/20 text-yellow-700 ring-1 ring-yellow-500/30",
  cancelada: "bg-destructive/10 text-destructive",
  completada: "bg-muted text-muted-foreground",
};

const filters: Array<Status | "todas"> = ["todas", "pendiente", "confirmada", "completada", "cancelada"];

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const AdminAppointments = () => {
  const [filter, setFilter] = useState<Status | "todas">("todas");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((a) => {
      const matchesStatus = filter === "todas" || a.status === filter;
      const matchesQuery =
        !q ||
        a.client.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query]);

  const nextAppointment = useMemo(() => {
    const now = new Date().getTime();
    const upcoming = [...appointments]
      .map((a) => ({ ...a, ts: new Date(`${a.date}T${a.time}`).getTime() }))
      .filter((a) => a.ts >= now)
      .sort((a, b) => a.ts - b.ts);
    return upcoming[0] || appointments[0];
  }, []);

  const stats = [
    { label: "Citas totales", value: appointments.length, icon: CalendarDays },
    { label: "Pendientes", value: appointments.filter((a) => a.status === "pendiente").length, icon: Clock },
    { label: "Confirmadas", value: appointments.filter((a) => a.status === "confirmada").length, icon: CheckCircle2 },
    { label: "Canceladas", value: appointments.filter((a) => a.status === "cancelada").length, icon: XCircle },
  ];

  return (
    <AdminLayout title="General">
      <section className="py-12 md:py-16">
        <div className="container">
          <HeroContent className="max-w-2xl">
            <HeroItem>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Panel interno
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="text-4xl md:text-6xl tracking-tight font-normal">
                Administración de citas
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 text-lg text-muted-foreground">
                Consulta, filtra y gestiona las sesiones agendadas por tus clientes en un solo lugar.
              </p>
            </HeroItem>
          </HeroContent>
        </div>
      </section>

      <section className="pb-12">
        <div className="container">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-6 h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-4xl font-normal tracking-tight">{stat.value}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container">
          <FadeUp>
            <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 border-b border-border">
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <Button
                      key={f}
                      variant={filter === f ? "default" : "outline"}
                      size="sm"
                      className="rounded-full capitalize"
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </Button>
                  ))}
                </div>
                <div className="relative w-full lg:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar cliente, servicio o ID"
                    className="pl-9 rounded-full"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Cliente</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Teléfono</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Servicio</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Fecha</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Hora</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em]">Estado</TableHead>
                      <TableHead className="uppercase text-xs tracking-[0.15em] text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                          No hay citas que coincidan con tu búsqueda.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>
                            <p className="font-medium">{a.client}</p>
                            <p className="text-sm text-muted-foreground">{a.email}</p>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">{a.phone}</TableCell>
                          <TableCell>
                            <p className="text-muted-foreground">{a.service}</p>
                            <p className="text-sm font-medium text-muted-foreground">${a.price.toFixed(2)} USD</p>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">{formatDate(a.date)}</TableCell>
                          <TableCell className="whitespace-nowrap">{a.time}</TableCell>
                          <TableCell>
                            <Badge className={`rounded-full border-0 capitalize font-normal ${statusStyles[a.status]}`}>
                              {a.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="rounded-full gap-1.5">
                              <Eye className="h-3.5 w-3.5" />
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-full text-destructive hover:bg-red-600 hover:text-white">
                              Cancelar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminAppointments;