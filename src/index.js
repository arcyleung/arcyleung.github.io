import ReactDOM from "react-dom"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import usePromise from "react-promise-suspense"
import { HTML } from "drei"
import lerp from "lerp"
import "./styles.css"
import { Vector3 } from "three"

// Scrolling controls
var mouseX = 0, mouseY = 0, percentage=0;
var windowHalfX = window.outerWidth / 2;
var windowHalfY = window.outerHeight / 2;
const maxHeight = window.outerHeight;
var touchStartY = 0;
let _event = {
  y: 0,
  deltaY: 0
};

function Dodecahedron({ time, ...props }) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // In here it could load textures, images, triangulate textgeometry, etc
  // The line below produces a fake load, emulating loading assets/set-up processing
  usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
  // React will bail out until the suspense is lifted, then it renders the view
  return (
    <mesh {...props}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      onClick={e => setActive(!active)}>

      <dodecahedronBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" roughness={0.75} emissive="#404057" color={hovered ? 'hotpink' : 'orange'} />
      <HTML scaleFactor={10}>
        <div class="content">
          WEED <br />
          {time} oz
        </div>
      </HTML>
    </mesh>
  )
}

function Panel({ time, ...props }) {
  const { viewport } = useThree()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // In here it could load textures, images, triangulate textgeometry, etc
  // The line below produces a fake load, emulating loading assets/set-up processing
  usePromise(ms => new Promise(res => setTimeout(res, ms)), [time])
  // React will bail out until the suspense is lifted, then it renders the view
  return (
    <mesh {...props}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      onClick={e => setActive(!active)}
      scale={[viewport.width * 0.9 /10, viewport.height* 0.9 /10, 1]}>

      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" roughness={0.75} emissive="#404057" color={hovered ? 'red' : 'white'} />
      <HTML scaleFactor={props.scaleFactor}>
        <div class="content">
          WEED <br />
          {time} oz
        </div>
      </HTML>
    </mesh>
  )
}

function Content() {
  const ref = useRef();
  const cameraFront = new Vector3(0,0,0);
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  useFrame(state => {
    cameraFront.y = percentage;
    percentage = lerp(percentage, _event.y, .07);
    state.camera.position.x = lerp(cameraFront.x, (mouseX) * 0.0025 + cameraFront.x, 0.07);
    state.camera.position.y = lerp(cameraFront.y, cameraFront.y + (mouseY * 0.0025), 0.07);
    state.camera.lookAt(cameraFront);
    state.camera.updateProjectionMatrix();
  });
  return (
    <group ref={ref}>
      <Panel time={1} position={[0, 0, 0]} scaleFactor={10} />
      <Panel time={2} position={[0, -2, -3]} scaleFactor={10}/>
      <Panel time={3} position={[2, 0, 0]} scaleFactor={10}/>
    </group>
  )
}

const Startup = () => {
  const { camera } = useThree()
  const ref = useRef()
  // Zooms the cam from 100 to 7. Since it's inside the Suspense boundary, it will
  // start doing that once everything's loaded/processed :]
  useFrame(() => {
    ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.01)
    camera.position.z = lerp(camera.position.z, 10, 0.1)
    camera.updateProjectionMatrix()
  })
  return (
    <mesh ref={ref} position={[0, 0, 4]} scale={[100, 100, 1]}>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="#0e0e0f" transparent opacity={1} />
    </mesh>
  )
}

const Fallback = () => (
  <HTML>
    <div class="loading">Initializing Startup Sequence</div>
  </HTML>
)

function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

function onWheel(e) {
  var evt = _event;
  console.log(evt)
  evt.deltaY = Math.sign(e.wheelDeltaY || e.deltaY * -1);
  // reduce by half the delta amount otherwise it scroll too fast (in a other way we could increase the height of the container too)
  scroll(e);
};

function scroll(e) {
  var evt = _event;
  // limit scroll top
  if ((evt.y + evt.deltaY) > 0) {
    // console.log("hit top")
    evt.y = 0;
    // limit scroll bottom
  } else if ((evt.y + evt.deltaY) < -maxHeight) {
    // console.log("hit bottom")
    evt.y = -maxHeight;
  } else {
    // console.log("scrolling")
    evt.y += evt.deltaY;
  }
}

function onTouchStart(e) {
  var t = (e.targetTouches) ? e.targetTouches[0] : e;
  touchStartY = t.pageY;
}

function onTouchMove(e) {
  e.preventDefault();
  var evt = _event;
  var t = (e.targetTouches) ? e.targetTouches[0] : e;
  // the multiply factor on mobile must be about 10x the factor applied on the wheel
  evt.deltaY = (t.pageY - touchStartY) * 0.05;
  touchStartY = t.pageY;
  scroll(e)
}

ReactDOM.render(
  <Canvas
    concurrent
    gl={{ antialias: true }}
    style={{ background: "#0e0e0f" }}
    camera={{ position: [0, 0, 100] }}
    onMouseMove={onMouseMove}
    onWheel={onWheel}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}>
    <pointLight color="indianred" />
    <pointLight position={[10, 10, -10]} color="orange" />
    <pointLight position={[-10, -10, 10]} color="lightblue" />
    <Suspense fallback={<Fallback />}>
      <Content />
      <Startup />
    </Suspense>
  </Canvas>,
  document.getElementById("root")
)
