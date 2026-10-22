import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MzansiSite — Turn WhatsApp into your online storefront";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          backgroundColor: "#f3edde",
          color: "#11130c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>
          MzansiSite
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.0, marginTop: 12, textTransform: "uppercase" }}>
          Your WhatsApp is
          <br />
          a business.
          <br />
          <span style={{ color: "#ff4d00" }}>Give it a storefront.</span>
        </div>
        <div style={{ fontSize: 20, marginTop: 16, opacity: 0.7 }}>
          Services, prices, location and WhatsApp booking — R149.99/m — mzansisite.co.za
        </div>
      </div>
    ),
    { ...size }
  );
}
