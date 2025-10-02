export default async function handler(req, res) {
  try {
    const targetUrl = req.query.url
    if (!targetUrl) {
      return res.status(400).json({ error: "Missing ?url param" })
    }

    // fetch dari desustream (atau link lain)
    const response = await fetch(targetUrl, { redirect: "follow" })

    // kalau mau dapetin URL final setelah redirect
    const finalUrl = response.url

    res.status(200).json({
      finalUrl,
      embedUrl: extractKrakenEmbed(finalUrl),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// fungsi bantu: ambil ID kraken
function extractKrakenEmbed(url) {
  const match = url.match(/krakenfiles\.com\/view\/([^/]+)/)
  if (match) {
    return `https://krakenfiles.com/embed-video/${match[1]}`
  }
  return null
}
