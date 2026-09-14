export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }
  
    try {
      const token = process.env.VC_TOKEN;
      const projectId = process.env.VC_PROJECT_ID;
      const teamId = process.env.VC_TEAM_ID;
  
      if (!token) {
        return res.status(500).json({
          error: "VC_TOKEN is missing",
        });
      }
  
      if (!projectId) {
        return res.status(500).json({
          error: "VC_PROJECT_ID is missing",
        });
      }
  
      const params = new URLSearchParams();
  
      params.set("projectId", projectId);
  
      if (teamId) {
        params.set("teamId", teamId);
      }
  
      const url = `https://api.vercel.com/v1/query/web-analytics/visits/count?${params.toString()}`;
  
      const response = await fetch(url, {
        method: "GET",
  
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
  
        console.error("Vercel Analytics API Error:", errorText);
  
        return res.status(response.status).json({
          error: "Failed to get visitor analytics",
          details: errorText,
        });
      }
  
      const data = await response.json();
  
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
  
      return res.status(200).json({
        pageviews: data?.data?.pageviews ?? 0,
        visitors: data?.data?.visitors ?? 0,
      });
    } catch (error) {
      console.error("Visitor API Error:", error);
  
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }