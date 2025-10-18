import LeftSidebar from "../../components/admin/LeftSidebar";

export default function AdminSettings() {
  return (
    <div className="flex">
      <LeftSidebar />
      <main className="ml-60 mr-16 p-6 flex-1 min-h-screen bg-[#0a0a0a] text-white">
        <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
          Configuración del Panel
        </h1>

        <div className="bg-[#111] border border-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-gray-400">
            Aquí podrás ajustar configuraciones generales del panel de
            administración, integrar servicios externos o gestionar permisos.
          </p>

          <div className="mt-6 border-t border-gray-800 pt-6">
            <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
              Próximamente...
            </h2>
            <p className="text-gray-500">
              Esta sección está en desarrollo. Aquí podrás controlar opciones
              globales de Solates, como temas visuales, notificaciones y más.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
