import { Store } from "lucide-react";

export default function Logo({ size = 36 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Store size={size * 0.55} color="#fff" strokeWidth={2.2} />
    </div>
  );
}
