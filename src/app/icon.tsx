import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5px",
          padding: "5px",
        }}
      >
        {/* Piedra superior — más pequeña */}
        <div style={{ width: "45%", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.70)", display: "flex" }} />
        {/* Piedra media */}
        <div style={{ width: "70%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.88)", display: "flex" }} />
        {/* Piedra inferior — más ancha y sólida */}
        <div style={{ width: "92%", height: "7px", borderRadius: "3px", background: "#ffffff", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
