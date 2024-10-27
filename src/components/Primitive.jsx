import { useState } from "react"
import { Instance } from "@react-three/drei"
import { useGesture } from "@use-gesture/react"
import { Setting } from "./Setting"
import { state } from "@/global"
// import { user } from "@/global"

export function Primitive(p) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(p.active || false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [distance, setDistance] = useState()

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y], distance: [dx, dy] }) => {
      event.stopPropagation()
      setOffset({ x: x, y: -y })
      setDistance(dx + dy)
    },
    onDragStart: () => {
      state.orbit.set(false)
    },
    onDragEnd: () => {
      state.orbit.set(true)
      // setGun({ p: p, offset: offset })
    },
  })

  return (
    <>
      <Instance
        {...bind()}
        position-x={p.positionX + offset.x}
        position-y={p.positionY + offset.y}
        rotation-x={p.rotationX || 0}
        rotation-y={p.rotationY || 0}
        rotation-z={p.rotationZ || 0}
        scale-x={p.scaleX || p.scale}
        scale-y={p.scaleY || p.scale}
        scale-z={p.scaleZ || p.scale}
        color={hovered ? "hotpink" : active ? "deeppink" : p.color}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={(e) => {
          e.stopPropagation()
          if (distance < 5) {
            setActive(!active)
            // user.get(p.geostring).get(p.keyvalue).get("active").put(!active)
          }
        }}
      />
      {active && (
        <>
          <Setting
            {...p}
            text='position'
            width={1}
            posX={p.positionX + offset.x}
            posY={p.positionY + offset.y}
            nposX={p.positionX + offset.x - 100}
            nposY={p.positionY + offset.y + 50}
            branches={["x", "y", "z"]}
          />
          <Setting
            {...p}
            text='rotation'
            width={1}
            posX={p.positionX + offset.x}
            posY={p.positionY + offset.y}
            nposX={p.positionX + offset.x - 100}
            nposY={p.positionY + offset.y + 0}
            branches={["x", "y", "z"]}
          />
          <Setting
            {...p}
            text='scale'
            width={0.6}
            posX={p.positionX + offset.x}
            posY={p.positionY + offset.y}
            nposX={p.positionX + offset.x - 100}
            nposY={p.positionY + offset.y - 50}
            branches={["x", "y", "z"]}
          />
          <Setting
            {...p}
            text='color'
            width={0.6}
            posX={p.positionX + offset.x}
            posY={p.positionY + offset.y}
            nposX={p.positionX + offset.x - 100}
            nposY={p.positionY + offset.y - 100}
          />
        </>
      )}
    </>
  )
}

// function setGun({ p, offset }) {
//   user
//     .get(p.geostring)
//     .get(p.keyvalue)
//     .put({
//       component: "Primitive",
//       geostring: p.geostring,
//       positionX: p.positionX + offset.x,
//       positionY: p.positionY + offset.y,
//       rotationX: p.rotationX,
//       rotationY: p.rotationY,
//       scaleX: p.scaleX || p.scale,
//       scaleY: p.scaleY || p.scale,
//       scaleZ: p.scaleZ || p.scale,
//       color: p.color,
//       key: p.keyvalue,
//     })
// }
