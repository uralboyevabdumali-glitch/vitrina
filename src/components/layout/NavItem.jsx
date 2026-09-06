export default function NavItem({ item, active, onClick, badge }) {
  const Icon = item.icon;
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
          active
            ? "bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 text-white"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
        }`}
      >
        <span className="flex items-center gap-2.5">
          <Icon size={17} />
          {item.label}
        </span>
        {badge > 0 && (
          <span
            className={`text-[11px] rounded-full px-1.5 py-0.5 ${
              active ? "bg-white/20" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}
