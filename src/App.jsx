import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { View, OrbitControls, TransformControls } from "@react-three/drei"
import { div } from "@/global"

export default function App() {
  const creators = useRef()
  const blueprint = useRef()
  const visor = useRef()
  return (
    <>
      <div
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(0deg, #d9afd9 0%, #b9f5ff 100%)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "calc(100% - 4vw)",
            height: "calc(100% - 4vw)",
            gap: "2vw",
          }}
        >
          <div.Out />
          <div
            ref={visor}
            style={{
              position: "relative",
              height: "100%",
              flexGrow: 6,
              backgroundColor: "rgba(0,0,255,0.1)",
              borderRadius: "20px",
            }}
          ></div>
          <div
            ref={blueprint}
            style={{
              position: "relative",
              height: "100%",
              flexGrow: 10,
              backgroundColor: "rgba(0,0,255,0.1)",
              borderRadius: "20px",
            }}
          ></div>
          <div
            ref={creators}
            style={{
              position: "relative",
              height: "100%",
              flexBasis: "100px",
              backgroundColor: "rgba(0,0,255,0.1)",
              borderRadius: "20px",
            }}
          ></div>
        </div>
      </div>
      <Canvas onCreated={(state) => (state.gl.autoClear = false)} eventSource={window.root}>
        <Visor view={visor} />
        <Blueprint view={blueprint} />
        <Creators view={creators} />
      </Canvas>
    </>
  )
}

function Visor(p) {
  return (
    <View track={p.view}>
      <OrbitControls makeDefault />
      <pointLight position={[1, 1, 1]} intensity={1} />
      <pointLight position={[-1, -1, -1]} intensity={1} />
      <ambientLight />
      <Cube />
    </View>
  )
}
function Cube() {
  const mesh = useRef()
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <TransformControls mode='translate'>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
        }}
        name='cube'
        geometry={geomap["box"]}
        scale={2}
        ref={mesh}
      >
        <meshPhongMaterial color={"hotpink"} />
      </mesh>
    </TransformControls>
  )
}
import { MOUSE } from "three"
import { Instances } from "@react-three/drei"
import { state } from "@/global"
import { observer } from "@legendapp/state/react"
import { OrthographicCamera } from "@react-three/drei"
import { geomap } from "@/maps"
function Blueprint(p) {
  const array = []
  for (var key in geomap) array.push(<Insts2 geometry={geomap[key]} key={key} geostring={key}></Insts2>)
  return (
    <View track={p.view}>
      <Controls />
      <OrthographicCamera frustumCulled={false} makeDefault position={[0, 0, 1000]} />
      <ambientLight intensity={1} />
      <pointLight intensity={2} position={[-10000, 10000, 0]} />
      {array}
    </View>
  )
}
const Controls = observer(function Component() {
  const enabled = state.orbit.get()
  return (
    <OrbitControls
      enableDamping={false}
      enabled={enabled}
      mouseButtons={{
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
      }}
    />
  )
})
const Insts2 = observer(function Component(p) {
  return (
    <Instances frustumCulled={false} geometry={p.geometry}>
      <meshPhongMaterial />
      {state["blueprint"][p.geostring].get()}
    </Instances>
  )
})

function Creators(p) {
  const array = []
  for (var key in geomap) array.push(<Insts geometry={geomap[key]} key={key} geostring={key}></Insts>)
  return (
    <View track={p.view}>
      <OrthographicCamera makeDefault position={[0, 0, 200]} />
      <ambientLight intensity={1} />
      <pointLight intensity={2} position={[-10000, 10000, 0]} />
      {array}
    </View>
  )
}
const Insts = observer(function Component(p) {
  return <>{state["creators"][p.geostring].get()}</>
})
