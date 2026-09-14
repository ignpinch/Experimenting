export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      return res.status(500).json({
        error: "Redis environment variables are missing",
      });
    }

    const cleanUrl = redisUrl.replace(/\/$/, "");

    const response = await fetch(
      `${cleanUrl}/incr/visitor_count`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${redisToken}`,
        },

        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Upstash error:", errorText);

      return res.status(500).json({
        error: "Unable to update visitor counter",
      });
    }

    const data = await response.json();

    const visitors = Number(data.result) || 0;

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    return res.status(200).json({
      visitors: visitors,
    });
  } catch (error) {
    console.error("Visitor counter error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
