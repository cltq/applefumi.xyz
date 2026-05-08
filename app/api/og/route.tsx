import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            fontFamily: '"Chakra Petch", sans-serif',
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid background effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              opacity: 0.5,
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
              zIndex: 1,
              maxWidth: "900px",
            }}
          >
            {/* Main heading */}
            <div
              style={{
                fontSize: "72px",
                fontWeight: "600",
                color: "white",
                textShadow: "0 0 30px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.4)",
                letterSpacing: "-1px",
              }}
            >
              Welcome! ยินดีต้อนรับ!
            </div>

            {/* Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  color: "#e4e4e7",
                  fontWeight: "400",
                  lineHeight: "1.4",
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                }}
              >
                Welcome to my personal website!
              </div>
              <div
                style={{
                  fontSize: "32px",
                  color: "#a1a1a1",
                  fontWeight: "400",
                  lineHeight: "1.4",
                }}
              >
                เว็บไซต์ส่วนตัวของฉัน
              </div>
            </div>

            {/* Bio link */}
            <div
              style={{
                fontSize: "24px",
                color: "#3b82f6",
                marginTop: "16px",
                fontWeight: "500",
              }}
            >
              Visit my bio: fumi
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
