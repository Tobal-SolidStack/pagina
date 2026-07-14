import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
          padding: "3px",
        }}
      >
        {/* Barra superior — más angosta, más transparente */}
        <div style={{ width: "55%", height: "6px", borderRadius: "3px", background: "rgba(37,99,235,0.50)", display: "flex" }} />
        {/* Barra media */}
        <div style={{ width: "75%", height: "7px", borderRadius: "3px", background: "rgba(37,99,235,0.78)", display: "flex" }} />
        {/* Barra inferior — ancho completo, sólido */}
        <div style={{ width: "100%", height: "8px", borderRadius: "3px", background: "#2563eb", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
