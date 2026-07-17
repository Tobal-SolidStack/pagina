import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0ea5e9 100%)",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Círculos decorativos */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: 300,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />

        {/* Logo / nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "auto" }}>
          {/* Icono mini */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              padding: "10px",
            }}
          >
            <div style={{ width: "45%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.60)", display: "flex" }} />
            <div style={{ width: "70%", height: "7px", borderRadius: "3px", background: "rgba(255,255,255,0.82)", display: "flex" }} />
            <div style={{ width: "92%", height: "9px", borderRadius: "3px", background: "#ffffff", display: "flex" }} />
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            SolidStack
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 48 }}>
          <p
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Tu página web lista
          </p>
          <p
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            en 48 horas
          </p>
        </div>

        {/* Sub */}
        <p
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          Desde $49.990/mes · Hosting, dominio y actualizaciones incluidos
        </p>

        {/* CTA badge */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "white",
              color: "#1d4ed8",
              borderRadius: "9999px",
              padding: "12px 28px",
              fontSize: 22,
              fontWeight: 700,
              display: "flex",
            }}
          >
            solidstack.cl
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
