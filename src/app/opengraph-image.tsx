import { ImageResponse } from "next/og";

export const alt = "Math Mentors: student-written math resources";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A catalog card on the site's ground: heading row, red rule, ruled lines.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#e6e9e4", padding: 70 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#fbfcfa",
            border: "2px solid #c9cec6",
            borderRadius: 6,
            color: "#1b2232",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", padding: "40px 56px 22px", borderBottom: "3px solid #c4302b" }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>Math Mentors</div>
            <div style={{ fontSize: 30, fontFamily: "monospace", color: "#5f6878", alignSelf: "flex-end" }}>math-mentors.org</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "30px 56px 0" }}>
            <div style={{ fontSize: 40, color: "#48526a", paddingBottom: 24, borderBottom: "2px solid #cfdbe9" }}>
              Student-written math resources
            </div>
            <div style={{ fontSize: 32, color: "#48526a", padding: "22px 0", borderBottom: "2px solid #cfdbe9", fontFamily: "monospace" }}>
              Course Guides · Problem Spotlights · Short Notes
            </div>
            <div style={{ height: 70, borderBottom: "2px solid #cfdbe9" }} />
          </div>
        </div>
      </div>
    ),
    size
  );
}
