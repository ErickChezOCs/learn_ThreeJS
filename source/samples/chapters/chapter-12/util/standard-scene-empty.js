import { initScene } from '../../../bootstrap/bootstrap'
import { intializeRendererControls } from '../../../controls/renderer-control'

import GUI from 'lil-gui'
import { initializeSceneControls } from '../../../controls/scene-controls'
import * as THREE from 'three'

export const bootstrapMeshScene = async ({ provideGui, backgroundColor, addControls, animate, initializeScene }) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const gui = new GUI()

  const init = async () => {
    initScene(props)(({ scene, camera, renderer }) => {
      console.log(scene, camera, renderer)

      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2

      if (initializeScene) initializeScene(scene)
      intializeRendererControls(gui, renderer)
      initializeSceneControls(gui, scene, false)

      if (provideGui) provideGui(gui)
      if (addControls) {
        addControls(camera, renderer, scene, gui)
      }

      animate(renderer, scene, camera)
    })
  }

  init().then()
}
