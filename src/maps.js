import {
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  ConeGeometry,
  OctahedronGeometry,
  TorusGeometry,
  IcosahedronGeometry,
  CapsuleGeometry,
} from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"

export const geomap = {
  box: new BoxGeometry(),
  sphere: new SphereGeometry(0.5),
  cylinder: new CylinderGeometry(0.5, 0.5),
  cone: new ConeGeometry(0.5),
  pyramid: new ConeGeometry(0.5, 1, 4),
  torus: new TorusGeometry(0.4, 0.2),
  octahedron: new OctahedronGeometry(0.5),
  icosahedron: new IcosahedronGeometry(0.5),
  roundedbox: new RoundedBoxGeometry(),
  capsule: new CapsuleGeometry(0.25, 0.5, 8, 16),
}

import {
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  MeshNormalMaterial,
} from "three"

export const matmap = {}
matmap["basic"] = new MeshBasicMaterial()
matmap["phong"] = new MeshPhongMaterial()
matmap["standard"] = new MeshStandardMaterial()
matmap["physical"] = new MeshPhysicalMaterial()
matmap["normal"] = new MeshNormalMaterial()

import { Creator } from "@/components/Creator"
import { Primitive } from "@/components/Primitive"

export const compmap = {
  creator: Creator,
  primitive: Primitive,
}
