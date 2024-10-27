import { useState, useEffect } from "react"

export function Div(p) {
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight)
  useEffect(() => {
    window.addEventListener("resize", () => setAspectRatio(window.innerWidth / window.innerHeight))
  }, [])
  const height = aspectRatio > 1 ? "100%" : "0%"
  const width = aspectRatio > 1 ? "0%" : "100%"
  return (
    <div
      ref={p.view}
      id={p.id}
      style={{
        height: height,
        width: width,
        flexGrow: p.flexGrow,
        flexBasis: p.flexBasis,
        backgroundColor: "rgba(0,0,255,0.1)",
        borderRadius: p.borderRadius,
        userSelect: "none",
      }}
    ></div>
  )
}
