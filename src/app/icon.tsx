import { ImageResponse } from "next/og";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="33,29.5 67,46.5 67,70.5 33,53.5" fill="#2563EB" />
          <polygon points="10,2 34,14 34,70 10,58" fill="#3B82F6" />
          <polygon points="66,30 90,42 90,98 66,86" fill="#3B82F6" />
        </svg>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}