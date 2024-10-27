import { useState, useEffect } from "react"
import { CubicBezierLine, Html } from "@react-three/drei"
import { useGesture } from "@use-gesture/react"
import { rad, state } from "@/global"

export function Setting(p) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [xy, setXY] = useState({ x: 0, y: 0 })
  const [show, setShow] = useState(true)
  useEffect(() => {
    var timeout
    window.addEventListener("resize", () => {
      setShow(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => setShow(true), 300)
    })
  }, [])

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y] }) => {
      event.stopPropagation()
      setXY({ x: x, y: -y })
    },
    onDragStart: () => {
      state.orbit.set(false)
    },
    onDragEnd: () => {
      state.orbit.set(true)
    },
  })

  return (
    <>
      <mesh
        {...bind()}
        scale-x={60}
        scale-y={60}
        scale-z={60}
        position-x={p["nposX"] + xy.x}
        position-y={p["nposY"] + xy.y}
        rotation-z={rad(90)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => setActive(!active)}
      >
        <capsuleGeometry args={[0.25, p.width, 10, 10]} />
        <meshStandardMaterial
          transparent={true}
          opacity={0.3}
          color={hovered ? "hotpink" : active ? "deeppink" : p.color}
        />
      </mesh>
      <CubicBezierLine
        start={[p["posX"] - 30, p["posY"], 0]}
        midA={[p["posX"] - 50, p["posY"], 0]}
        end={[p["nposX"] + xy.x + 45 - (1 - p.width) * 30, p["nposY"] + xy.y, 0]}
        midB={[p["nposX"] + xy.x + 80, p["nposY"] + xy.y, 0]}
        color='palevioletred'
        lineWidth={3}
      />
      {show && (
        <Html transform position-x={p["nposX"] + xy.x} position-y={p["nposY"] + xy.y} pointerEvents='none'>
          <p
            style={{
              padding: "200px",
              fontFamily: "Jura",
              userSelect: "none",
              fontSize: "810px",
              color: "rgb(199,21,133)",
            }}
          >
            {p.text}
          </p>
        </Html>
      )}
      {active &&
        p.branches?.map((branch, i) => {
          return (
            <Setting
              text={branch}
              width={0.15}
              posX={p["nposX"] + xy.x}
              posY={p["nposY"] + xy.y}
              nposX={p["nposX"] + xy.x - 90}
              nposY={p["nposY"] + xy.y + i * -50 + 50}
              color='orange'
              key={branch}
            />
          )
        })}
    </>
  )
}
