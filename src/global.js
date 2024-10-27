localStorage.clear()

export function rad(deg) {
  return deg * (Math.PI / 180)
}

import tunnel from "tunnel-rat"
export const div = tunnel()

import Gun from "gun"
import "gun/lib/open"
import "gun/lib/not"
export const gun = Gun()
export const user = gun.get("user")

import { observable } from "@legendapp/state"

import { geomap } from "@/maps"
export const state = observable()
for (var key in geomap) {
  state.creators[key].set([])
  state.blueprint[key].set([])
}
import { compmap } from "@/maps"
import { createElement } from "react"
user
  .map()
  .map()
  .on((data, key) => {
    console.log(data)
    state[data.view][data.geostring].set((prev) => {
      return [
        ...prev.slice(0, key),
        createElement(compmap[data.component], {
          key: key,
          ...data,
        }),
        ...prev.slice(key + 1),
      ]
    })
  })

user.get(0, function (ack) {
  if (!ack.put) {
    user.get("0").put({
      0: {
        component: "creator",
        view: "creators",
        geostring: "box",
        positionX: 0,
        positionY: 400,
        rotationX: rad(45),
        rotationY: rad(45),
        scale: 45,
        color: "orange",
      },
      1: {
        component: "creator",
        view: "creators",
        geostring: "sphere",
        positionX: 0,
        positionY: 320,
        rotationX: rad(45),
        rotationY: rad(45),
        scale: 60,
        color: "orange",
      },
      2: {
        component: "creator",
        view: "creators",
        geostring: "cylinder",
        positionX: 0,
        positionY: 240,
        rotationX: rad(45),
        rotationY: rad(45),
        scaleY: 45,
        scale: 60,
        color: "orange",
      },
      3: {
        component: "creator",
        view: "creators",
        geostring: "cone",
        positionX: 0,
        positionY: 160,
        rotationX: rad(45),
        scale: 60,
        color: "orange",
      },
      4: {
        component: "creator",
        view: "creators",
        geostring: "pyramid",
        positionX: 0,
        positionY: 80,
        rotationX: rad(45),
        scale: 60,
        color: "orange",
      },
      5: {
        component: "creator",
        view: "creators",
        geostring: "torus",
        positionX: 0,
        positionY: -20,
        scale: 50,
        color: "orange",
      },
      6: {
        component: "creator",
        view: "creators",
        geostring: "capsule",
        positionX: 0,
        positionY: -100,
        rotationZ: rad(90),
        scale: 50,
        color: "orange",
      },
    })
  }
})
