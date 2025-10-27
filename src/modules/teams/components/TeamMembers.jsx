import React from 'react';

export default function TeamMembers({ members = [] }) {
  if (!members.length) return <div className="team-members__empty">Sin miembros</div>;
  return (
    <ul className="team-members">
      {members.map(m => (
        <li key={m.id} className="team-members__item flex items-center gap-2">
          <img src={m.avatarUrl} alt={m.username} width={28} className="team-members__avatar rounded-full" />
          <span className="team-members__name">{m.username}</span>
          <span className="team-members__points text-sm text-gray-500">
            — {m.pointsBalance ?? 0}
          </span>
        </li>
      ))}
    </ul>
  );
}