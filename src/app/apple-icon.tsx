import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#fff" />
          <path d="M10 21.5c5 0 3.5-11 12-11" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="10" cy="21.5" r="3.1" fill="#0a0a0a" />
          <circle cx="22" cy="10.5" r="3.1" fill="#3b7bff" />
        </svg>
      </div>
    ),
    size,
  );
}
