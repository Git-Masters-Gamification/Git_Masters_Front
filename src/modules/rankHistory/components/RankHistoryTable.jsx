// src/modules/rankHistory/components/RankHistoryTable.jsx
import React from "react";

export default function RankHistoryTable({ history }) {
  if (!Array.isArray(history) || history.length === 0) {
    return (
      <p className="text-gray-400 italic text-center mt-6">
        Sin historial disponible.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow-lg border border-slate-700">
      <table className="min-w-full bg-slate-800 text-white rounded-lg">
        <thead>
          <tr className="bg-slate-700 text-left text-sm uppercase tracking-wider text-cyan-300">
            <th className="px-4 py-3">Mes</th>
            <th className="px-4 py-3">Año</th>
            <th className="px-4 py-3">Nivel</th>
            <th className="px-4 py-3">Rango</th>
            <th className="px-4 py-3">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr
              key={item.id || `${item.month}-${item.year}`}
              className="border-b border-slate-700 hover:bg-slate-700/50 transition duration-150"
            >
              <td className="px-4 py-3 capitalize">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString("es-ES", { month: "long" })
                  : (item.month ? `Mes ${item.month}` : "—")
                }
              </td>

              <td className="px-4 py-3">{item.year ?? "—"}</td>
              <td className="px-4 py-3">{item.level ?? "—"}</td>

              <td className="px-4 py-3 text-cyan-400 font-medium flex items-center gap-2">
                {/* Usa rankName y rankColor que devuelve tu backend */}
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.rankColor || "#6A737D" }}
                  aria-hidden="true"
                />
                <span>{item.rankName || "Sin rango"}</span>
              </td>

              <td className="px-4 py-3">{item.points ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}