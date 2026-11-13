import { ImageResponse } from "next/og";

export const alt = "LAST WORDS | NASA Space Apps Challenge 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 80,
          background: "#04060B",
          color: "#E8ECF4",
          border: "4px solid rgba(255, 176, 32, 0.4)",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#FFB020",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontFamily: "monospace",
              color: "#FFB020",
              letterSpacing: 4,
            }}
          >
            NASA SPACE APPS CHALLENGE 2026 // HISTORICAL TELEMETRY
          </div>
        </div>

        {/* Center Title and Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -2,
              color: "#FFFFFF",
            }}
          >
            LAST WORDS
          </div>
          <div
            style={{
              fontSize: 32,
              maxWidth: 950,
              lineHeight: 1.4,
              color: "#8A93A8",
            }}
          >
            &ldquo;Every machine NASA left behind said something before it went quiet.&rdquo;
          </div>
        </div>

        {/* Bottom Destination Chips */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              border: "1px solid rgba(201, 209, 220, 0.4)",
              background: "rgba(201, 209, 220, 0.1)",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#C9D1DC",
            }}
          >
            MOON (SURVEYOR 3 • ALSEP • RETROREFLECTOR)
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              border: "1px solid rgba(228, 87, 46, 0.4)",
              background: "rgba(228, 87, 46, 0.1)",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#E4572E",
            }}
          >
            MARS (OPPORTUNITY • INSIGHT • INGENUITY)
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              border: "1px solid rgba(142, 124, 255, 0.4)",
              background: "rgba(142, 124, 255, 0.1)",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#8E7CFF",
            }}
          >
            DEEP SPACE (PIONEER 10 • VOYAGER 1)
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
