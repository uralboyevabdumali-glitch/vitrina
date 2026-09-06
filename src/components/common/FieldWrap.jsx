export default function FieldWrap({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-500" />
      {children}
    </div>
  );
}
