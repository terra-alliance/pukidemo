import { useState } from "react"
import { geomap } from "@/maps"
import { user } from "@/global"

export function Creator(p) {
  const [hovered, setHover] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <mesh
      geometry={geomap[p.geostring]}
      position-x={p.positionX || 0}
      position-y={p.positionY || 0}
      rotation-x={p.rotationX || 0}
      rotation-y={p.rotationY || 0}
      rotation-z={p.rotationZ || 0}
      scale-x={p.scaleX || p.scale}
      scale-y={p.scaleY || p.scale}
      scale-z={p.scaleZ || p.scale}
      color={hovered ? "hotpink" : p.color}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {
        user
          .get(1)
          .get(count)
          .put({
            component: "primitive",
            geostring: p.geostring,
            positionX: 0,
            positionY: 0,
            rotationX: p.rotationX || 0,
            rotationY: p.rotationY || 0,
            rotationZ: p.rotationZ || 0,
            scaleX: p.scaleX || p.scale,
            scaleY: p.scaleY || p.scale,
            scaleZ: p.scaleZ || p.scale,
            scale: p.scale,
            color: p.color,
            count: count,
            view: "blueprint",
          })
        setCount(count + 1)
      }}
    >
      <meshPhongMaterial color={hovered ? "hotpink" : p.color} />
    </mesh>
  )
}

// function setGun({ p, count }) {}
